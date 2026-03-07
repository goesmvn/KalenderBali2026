import { getBaliDate, BALI_HOLIDAYS } from './bali-calendar';
import { getNationalHolidays } from './holidays';

interface CalendarEvent {
    date: Date;
    title: string;
    category: 'bali' | 'national' | 'purnama' | 'tilem';
    description?: string;
}

/**
 * Collect all Bali calendar events for a given year
 */
export function collectBaliEvents(year: number): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const date = new Date(d);
        const baliDate = getBaliDate(date);

        // Bali ceremony events
        for (const evt of baliDate.events) {
            const isBaliHoliday = BALI_HOLIDAYS.includes(evt);
            events.push({
                date,
                title: evt,
                category: 'bali',
                description: isBaliHoliday
                    ? `${evt} — Hari Raya Bali\nWuku: ${baliDate.wuku.name}\nSaptawara: ${baliDate.saptawara.name}\nPancawara: ${baliDate.pancawara.name}`
                    : `${evt}\nWuku: ${baliDate.wuku.name}`
            });
        }

        // Purnama / Tilem
        if (baliDate.purnamaTilem) {
            const type = baliDate.purnamaTilem.type;
            const sasih = baliDate.sasih.name;
            events.push({
                date,
                title: `${type} (${sasih})`,
                category: type === 'Purnama' ? 'purnama' : 'tilem',
                description: `${type} — ${sasih}\nMomen spiritual untuk sembahyang dan meditasi.`
            });
        }
    }

    return events;
}

/**
 * Collect national holidays for a given year (async)
 */
export async function collectNationalHolidays(year: number): Promise<CalendarEvent[]> {
    const holidays = await getNationalHolidays(year);
    const events: CalendarEvent[] = [];

    for (const [dateStr, names] of Object.entries(holidays)) {
        const [y, m, d] = dateStr.split('-').map(Number);
        const date = new Date(y, m - 1, d);
        for (const name of names) {
            events.push({
                date,
                title: name,
                category: 'national',
                description: `${name} — Libur Nasional Indonesia`
            });
        }
    }

    return events;
}

function formatICSDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

function escapeICS(str: string): string {
    return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function generateUID(date: Date, title: string): string {
    const hash = `${date.getTime()}-${title}`.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    return `kb-${Math.abs(hash)}@kalenderbali.id`;
}

/**
 * Generate an ICS file string from calendar events
 */
export function generateICS(events: CalendarEvent[], calendarName: string = 'Kalender Bali'): string {
    const now = new Date();
    const timestamp = `${formatICSDate(now)}T${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}00Z`;

    let ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//KalenderBali.id//Kalender Bali//ID',
        `X-WR-CALNAME:${calendarName}`,
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH'
    ];

    for (const event of events) {
        const dateStr = formatICSDate(event.date);
        const nextDay = new Date(event.date);
        nextDay.setDate(nextDay.getDate() + 1);
        const endDateStr = formatICSDate(nextDay);

        ics.push(
            'BEGIN:VEVENT',
            `UID:${generateUID(event.date, event.title)}`,
            `DTSTAMP:${timestamp}`,
            `DTSTART;VALUE=DATE:${dateStr}`,
            `DTEND;VALUE=DATE:${endDateStr}`,
            `SUMMARY:${escapeICS(event.title)}`,
            event.description ? `DESCRIPTION:${escapeICS(event.description)}` : '',
            `CATEGORIES:${event.category === 'national' ? 'Libur Nasional' : event.category === 'purnama' ? 'Purnama' : event.category === 'tilem' ? 'Tilem' : 'Hari Raya Bali'}`,
            'TRANSP:TRANSPARENT',
            'END:VEVENT'
        );
    }

    ics.push('END:VCALENDAR');
    return ics.filter(line => line !== '').join('\r\n');
}

/**
 * Trigger download of an ICS file
 */
export function downloadICS(icsContent: string, filename: string = 'kalender-bali.ics') {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
