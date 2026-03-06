export interface Holiday {
    tanggal: string;
    keterangan: string;
    is_cuti: boolean;
}

const holidaysCache: Record<number, Record<string, string[]>> = {};

/** Save holidays to both in-memory cache and localStorage */
function cacheHolidays(year: number, data: Record<string, string[]>) {
    holidaysCache[year] = data;
    try { localStorage.setItem(`kb_holidays_${year}`, JSON.stringify(data)); } catch (e) { /* quota or unavailable */ }
}

/**
 * Fetch Indonesian national holidays from public API
 * Returns a map of YYYY-MM-DD to an array of holiday names
 */
export async function getNationalHolidays(year: number): Promise<Record<string, string[]>> {
    // 1. Check in-memory cache
    if (holidaysCache[year]) {
        return holidaysCache[year];
    }

    // 2. Check localStorage cache
    try {
        const stored = localStorage.getItem(`kb_holidays_${year}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            holidaysCache[year] = parsed;
            return parsed;
        }
    } catch (e) { /* localStorage unavailable, continue */ }

    try {
        let data: Holiday[] = [];
        let apiFailed = false;

        try {
            // Add a timeout to prevent hanging the app if the Vercel app is sleeping/frozen
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const response = await fetch(`https://dayoffapi.vercel.app/api?year=${year}`, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json'
                }
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                console.warn(`[Holidays HTTP Error] ${response.status}`);
                apiFailed = true;
            } else {
                data = await response.json();
            }
        } catch (fetchError) {
            console.warn(`[Holidays Fetch/CORS Error] Fallback triggered.`, fetchError);
            apiFailed = true;
        }

        // If API fails or returns no data for current years, use fallback
        if (apiFailed || (!data || data.length === 0 || (data as any).hasOwnProperty('error'))) {
            throw new Error('API failed or CORS blocked, triggering fallback');
        }

        const holidayMap: Record<string, string[]> = {};

        data.forEach(holiday => {
            // API returns tanggal in format YYYY-MM-DD
            if (!holidayMap[holiday.tanggal]) {
                holidayMap[holiday.tanggal] = [];
            }

            let name = holiday.keterangan;
            if (holiday.is_cuti) {
                name = `Cuti Bersama: ${name}`;
            }

            if (!holidayMap[holiday.tanggal].includes(name)) {
                holidayMap[holiday.tanggal].push(name);
            }
        });

        cacheHolidays(year, holidayMap);
        return holidayMap;
    } catch (error) {
        console.error(`Error fetching holidays for ${year}:`, error);

        if (year === 2024) {
            const fallback2024: Record<string, string[]> = {
                '2024-01-01': ['Tahun Baru 2024 Masehi'],
                '2024-02-08': ['Isra Mikraj Nabi Muhammad SAW'],
                '2024-02-09': ['Cuti Bersama Isra Mikraj'],
                '2024-02-10': ['Tahun Baru Imlek 2575 Kongzili'],
                '2024-03-11': ['Hari Raya Nyepi Tahun Baru Saka 1946'],
                '2024-03-12': ['Cuti Bersama Nyepi'],
                '2024-03-29': ['Wafat Yesus Kristus'],
                '2024-03-31': ['Hari Paskah'],
                '2024-04-08': ['Cuti Bersama Idul Fitri'],
                '2024-04-09': ['Cuti Bersama Idul Fitri'],
                '2024-04-10': ['Hari Raya Idul Fitri 1445 Hijriah'],
                '2024-04-11': ['Hari Raya Idul Fitri 1445 Hijriah'],
                '2024-04-12': ['Cuti Bersama Idul Fitri'],
                '2024-04-15': ['Cuti Bersama Idul Fitri'],
                '2024-05-01': ['Hari Buruh Internasional'],
                '2024-05-09': ['Kenaikan Yesus Kristus'],
                '2024-05-10': ['Cuti Bersama Kenaikan Yesus Kristus'],
                '2024-05-23': ['Hari Raya Waisak 2568 BE'],
                '2024-05-24': ['Cuti Bersama Waisak'],
                '2024-06-01': ['Hari Lahir Pancasila'],
                '2024-06-17': ['Hari Raya Idul Adha 1445 Hijriah'],
                '2024-06-18': ['Cuti Bersama Idul Adha'],
                '2024-07-07': ['Tahun Baru Islam 1446 Hijriah'],
                '2024-08-17': ['Hari Kemerdekaan Republik Indonesia'],
                '2024-09-16': ['Maulid Nabi Muhammad SAW'],
                '2024-12-25': ['Hari Raya Natal'],
                '2024-12-26': ['Cuti Bersama Natal']
            };
            cacheHolidays(year, fallback2024);
            return fallback2024;
        }

        if (year === 2025) {
            const fallback2025: Record<string, string[]> = {
                '2025-01-01': ['Tahun Baru 2025 Masehi'],
                '2025-01-27': ['Isra Mikraj Nabi Muhammad SAW'],
                '2025-01-28': ['Cuti Bersama Tahun Baru Imlek'],
                '2025-01-29': ['Tahun Baru Imlek 2576 Kongzili'],
                '2025-03-28': ['Cuti Bersama Nyepi'],
                '2025-03-29': ['Hari Raya Nyepi Tahun Baru Saka 1947'],
                '2025-03-31': ['Cuti Bersama Idul Fitri 1446 Hijriah'],
                '2025-04-01': ['Hari Raya Idul Fitri 1446 Hijriah'],
                '2025-04-02': ['Hari Raya Idul Fitri 1446 Hijriah'],
                '2025-04-03': ['Cuti Bersama Idul Fitri 1446 Hijriah'],
                '2025-04-04': ['Cuti Bersama Idul Fitri 1446 Hijriah'],
                '2025-04-07': ['Cuti Bersama Idul Fitri 1446 Hijriah'],
                '2025-04-18': ['Wafat Yesus Kristus'],
                '2025-04-20': ['Hari Paskah'],
                '2025-05-01': ['Hari Buruh Internasional'],
                '2025-05-12': ['Hari Raya Waisak 2569 BE'],
                '2025-05-13': ['Cuti Bersama Waisak'],
                '2025-05-29': ['Kenaikan Yesus Kristus'],
                '2025-05-30': ['Cuti Bersama Kenaikan Yesus Kristus'],
                '2025-06-01': ['Hari Lahir Pancasila'],
                '2025-06-06': ['Hari Raya Idul Adha 1446 Hijriah'],
                '2025-06-09': ['Cuti Bersama Idul Adha'],
                '2025-06-26': ['Tahun Baru Islam 1447 Hijriah'],
                '2025-08-17': ['Hari Kemerdekaan Republik Indonesia'],
                '2025-09-05': ['Maulid Nabi Muhammad SAW'],
                '2025-12-25': ['Hari Raya Natal'],
                '2025-12-26': ['Cuti Bersama Natal']
            };
            cacheHolidays(year, fallback2025);
            return fallback2025;
        }

        if (year === 2026) {
            const fallback2026: Record<string, string[]> = {
                '2026-01-01': ['Tahun Baru 2026 Masehi'],
                '2026-02-13': ['Isra Mikraj Nabi Muhammad SAW'],
                '2026-02-17': ['Tahun Baru Imlek 2577 Kongzili'],
                '2026-03-19': ['Hari Raya Nyepi Tahun Baru Saka 1948'],
                '2026-03-20': ['Hari Raya Idul Fitri 1447 H'],
                '2026-03-21': ['Hari Raya Idul Fitri 1447 H'],
                '2026-04-03': ['Wafat Yesus Kristus'],
                '2026-05-01': ['Hari Buruh Internasional'],
                '2026-05-14': ['Kenaikan Yesus Kristus'],
                '2026-05-27': ['Hari Raya Idul Adha 1447 H'],
                '2026-05-31': ['Hari Lahir Pancasila'],
                '2026-06-16': ['Tahun Baru Islam 1448 H'],
                '2026-08-17': ['Hari Kemerdekaan Republik Indonesia'],
                '2026-08-27': ['Maulid Nabi Muhammad SAW'],
                '2026-12-25': ['Hari Raya Natal']
            };
            cacheHolidays(year, fallback2026);
            return fallback2026;
        }

        return {};
    }
}
