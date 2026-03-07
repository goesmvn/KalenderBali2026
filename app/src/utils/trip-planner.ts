import { getBaliDate } from './bali-calendar';

export interface BaseEvent {
    date: string; // YYYY-MM-DD
    name: string;
    type: 'holiday' | 'weekend' | 'cuti_bersama' | 'bali_ceremony';
}

export interface RecommendedTrip {
    startDate: string;
    endDate: string;
    totalDays: number;
    requiredLeaveDays: number;
    leaveDates: string[];
    events: BaseEvent[];
    ceremonies: BaseEvent[];
}

// Cuti Bersama mapping (example)
const cutiBersama: Record<string, string[]> = {
    '2026-03-20': ['Cuti Bersama Hari Raya Nyepi Tahun Baru Saka 1948'],
    '2026-04-06': ['Cuti Bersama Idul Fitri 1447 Hijriah'],
    '2026-04-07': ['Cuti Bersama Idul Fitri 1447 Hijriah'],
    '2026-04-08': ['Cuti Bersama Idul Fitri 1447 Hijriah'],
    '2026-05-15': ['Cuti Bersama Kenaikan Yesus Kristus'],
    '2026-06-01': ['Hari Lahir Pancasila'], // Normally holiday, included here for clustering
    '2026-12-24': ['Cuti Bersama Hari Raya Natal']
};

function isWeekend(dateStr: string): boolean {
    const d = new Date(dateStr);
    const day = d.getDay();
    return day === 0 || day === 6;
}

function getNextDate(startDate: string, daysToAdd: number): string {
    const d = new Date(startDate);
    d.setDate(d.getDate() + daysToAdd);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

export function findLongWeekends(holidays: Record<string, string[]>, year: number): RecommendedTrip[] {
    const recommendations: RecommendedTrip[] = [];

    // Map of date string to events
    const dayMap: Record<string, BaseEvent[]> = {};

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // 1. Gather all free days
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

        const events: BaseEvent[] = [];
        if (holidays[dateStr] && holidays[dateStr].length > 0) {
            events.push({ date: dateStr, name: holidays[dateStr][0], type: 'holiday' });
        }
        if (cutiBersama[dateStr]) {
            events.push({ date: dateStr, name: cutiBersama[dateStr][0], type: 'cuti_bersama' });
        }
        if (isWeekend(dateStr)) {
            events.push({ date: dateStr, name: 'Akhir Pekan', type: 'weekend' });
        }

        if (events.length > 0) {
            dayMap[dateStr] = events;
        }
    }

    // Convert keys to sorted array
    const sortedDates = Object.keys(dayMap).sort();
    if (sortedDates.length === 0) return [];

    // 2. Cluster algorithm
    const clusters: Array<{ dates: string[], leaveDates: string[] }> = [];

    let currentCluster: { dates: string[], leaveDates: string[] } = {
        dates: [sortedDates[0]],
        leaveDates: []
    };

    for (let i = 1; i < sortedDates.length; i++) {
        const dateStr = sortedDates[i];
        const lastDateInCluster = currentCluster.dates[currentCluster.dates.length - 1];

        const d1 = new Date(lastDateInCluster);
        const d2 = new Date(dateStr);
        const diffDays = Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
            currentCluster.dates.push(dateStr);
        } else if (diffDays <= 3 && currentCluster.leaveDates.length + (diffDays - 1) <= 2) {
            // Can bridge the gap
            for (let gap = 1; gap < diffDays; gap++) {
                currentCluster.leaveDates.push(getNextDate(lastDateInCluster, gap));
            }
            currentCluster.dates.push(dateStr);
        } else {
            // Break cluster
            if (currentCluster.dates.length + currentCluster.leaveDates.length >= 4) {
                clusters.push(currentCluster);
            }
            currentCluster = { dates: [dateStr], leaveDates: [] };
        }
    }
    if (currentCluster.dates.length + currentCluster.leaveDates.length >= 4) {
        clusters.push(currentCluster);
    }

    // 3. Format into RecommendedTrip
    clusters.forEach(cluster => {
        // Collect primary events for display (prioritize non-weekend)
        const events: BaseEvent[] = [];
        cluster.dates.forEach(d => {
            const dayEvents = dayMap[d];
            const primaryEvent = dayEvents.find(e => e.type === 'holiday' || e.type === 'cuti_bersama') || dayEvents[0];
            events.push(primaryEvent);
        });

        const start = new Date(cluster.dates[0]);
        // Also consider leaf dates (sometimes gap is at the end? no, gap is only interior)
        const end = new Date(cluster.dates[cluster.dates.length - 1]);

        const ceremonies: BaseEvent[] = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const baliDate = getBaliDate(d);
            const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

            if (baliDate.purnamaTilem && (baliDate.purnamaTilem.type === 'Purnama' || baliDate.purnamaTilem.type === 'Tilem')) {
                ceremonies.push({ date: dateStr, name: baliDate.purnamaTilem.type, type: 'bali_ceremony' });
            }
            if (baliDate.wuku.name === 'Dungulan' && baliDate.saptawara.name === 'Buda (Rabu)' && baliDate.pancawara.name === 'Kliwon') {
                ceremonies.push({ date: dateStr, name: 'Galungan', type: 'bali_ceremony' });
            }
            if (baliDate.wuku.name === 'Kuningan' && baliDate.saptawara.name === 'Saniscara (Sabtu)' && baliDate.pancawara.name === 'Kliwon') {
                ceremonies.push({ date: dateStr, name: 'Kuningan', type: 'bali_ceremony' });
            }
        }

        recommendations.push({
            startDate: cluster.dates[0],
            endDate: cluster.dates[cluster.dates.length - 1],
            totalDays: cluster.dates.length + cluster.leaveDates.length,
            requiredLeaveDays: cluster.leaveDates.length,
            leaveDates: cluster.leaveDates,
            events,
            ceremonies
        });
    });

    // Deduplicate effectively identical trips that might have overlapped
    // (though our algorithm is greedy so it usually produces non-overlapping)

    recommendations.sort((a, b) => {
        if (b.totalDays !== a.totalDays) return b.totalDays - a.totalDays;
        return a.requiredLeaveDays - b.requiredLeaveDays;
    });

    return recommendations;
}
