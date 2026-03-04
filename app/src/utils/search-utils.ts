import { getBaliDate } from '@/utils/bali-calendar';
import type { BaliDate } from '@/types/bali-calendar';

export type SearchType = 'otonan' | 'purnama' | 'tilem' | 'kajengkliwon' | 'ingkel' | 'galungan' | 'kuningan' | 'tumpek' | 'nyepi' | 'anggarakasih' | 'budacemeng';

export interface SearchResult {
    date: Date;
    baliDate: BaliDate;
    label: string;
}

export interface SearchParams {
    type: SearchType;
    saptawara?: string;
    pancawara?: string;
    wuku?: string;
    ingkel?: string;
    startDate: Date;
    targetYear?: number;
}

/**
 * Perform a forward search from a given start date to find occurrences of specific Balinese calendar features.
 */
export function searchBaliCalendar(params: SearchParams, limit: number = 3): SearchResult[] {
    const results: SearchResult[] = [];
    const isYearSearch = params.targetYear !== undefined;
    const currentSearchDate = isYearSearch ? new Date(params.targetYear!, 0, 1) : new Date(params.startDate);
    // Optional: Reset time to midnight to avoid issues with timezones across days
    currentSearchDate.setHours(0, 0, 0, 0);

    const maxDaysToSearch = isYearSearch ? 366 : 400; // Nyepi is ~354 days apart, use 400 to be safe

    for (let i = 0; i < maxDaysToSearch; i++) {
        if (isYearSearch && currentSearchDate.getFullYear() !== params.targetYear) {
            break; // Finished searching the year
        }

        const baliDate = getBaliDate(currentSearchDate);
        let isMatch = false;
        let label = '';

        switch (params.type) {
            case 'otonan':
                if (
                    (!params.saptawara || baliDate.saptawara.name.includes(params.saptawara)) &&
                    (!params.pancawara || baliDate.pancawara.name.includes(params.pancawara)) &&
                    (!params.wuku || baliDate.wuku.name === params.wuku)
                ) {
                    isMatch = true;
                    label = `Otonan: ${baliDate.saptawara.name.split(' ')[0]} ${baliDate.pancawara.name.split(' ')[0]} ${baliDate.wuku.name}`;
                }
                break;

            case 'purnama':
                if (baliDate.purnamaTilem?.type === 'Purnama') {
                    isMatch = true;
                    label = `Purnama ${baliDate.sasih.name.split(' ')[1]}`;
                }
                break;

            case 'tilem':
                if (baliDate.purnamaTilem?.type === 'Tilem') {
                    isMatch = true;
                    label = `Tilem ${baliDate.sasih.name.split(' ')[1]}`;
                }
                break;

            case 'kajengkliwon':
                if (baliDate.triwara.name.includes('Kajeng') && baliDate.pancawara.name.includes('Kliwon')) {
                    isMatch = true;
                    // Enyitan (Pangelong) or Pemelastali (Penanggal)? For simplicity, just exact feature:
                    label = `Kajeng Kliwon (${baliDate.penanggalPangelong?.status === 'Penanggal' ? 'Enyitan' : 'Uwudan'})`;
                }
                break;

            case 'ingkel':
                if (params.ingkel && baliDate.ingkel === params.ingkel) {
                    isMatch = true;
                    label = `Ingkel ${baliDate.ingkel}`;
                }
                break;

            case 'galungan':
                if (baliDate.events.includes('Hari Raya Galungan')) {
                    isMatch = true;
                    label = 'Hari Raya Galungan';
                }
                break;

            case 'kuningan':
                if (baliDate.events.includes('Hari Raya Kuningan') || (baliDate.wuku.name === 'Kuningan' && baliDate.saptawara.name.includes('Saniscara') && baliDate.pancawara.name === 'Kliwon')) {
                    isMatch = true;
                    label = 'Hari Raya Kuningan';
                }
                break;

            case 'nyepi':
                if (baliDate.events.includes('Hari Raya Nyepi')) {
                    isMatch = true;
                    label = 'Hari Raya Nyepi (Tahun Baru Saka)';
                }
                break;

            case 'tumpek': {
                // Check if any event has "Tumpek"
                const tumpekEvent = baliDate.events.find(e => e.includes('Tumpek'));
                if (tumpekEvent) {
                    isMatch = true;
                    label = tumpekEvent;
                }
                break;
            }

            case 'anggarakasih':
                if (baliDate.saptawara.name === 'Anggara' && baliDate.pancawara.name === 'Kliwon') {
                    isMatch = true;
                    label = `Anggara Kasih ${baliDate.wuku.name}`;
                }
                break;

            case 'budacemeng':
                if (baliDate.saptawara.name === 'Buda' && baliDate.pancawara.name === 'Wage') {
                    isMatch = true;
                    label = `Buda Cemeng ${baliDate.wuku.name}`;
                }
                break;
        }

        if (isMatch) {
            results.push({
                date: new Date(currentSearchDate),
                baliDate,
                label,
            });

            if (!isYearSearch && results.length >= limit) {
                break;
            }
        }

        // Next day
        currentSearchDate.setDate(currentSearchDate.getDate() + 1);
    }

    return results;
}
