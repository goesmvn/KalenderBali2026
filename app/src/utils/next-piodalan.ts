import { getBaliDate } from './bali-calendar';
import type { BaliDate } from '@/types/bali-calendar';

export interface PuraBase {
    id?: number;
    nama: string;
    alias?: string;
    kategori: string;
    kabupaten: string;
    kecamatan?: string;
    desa?: string;
    alamat?: string;
    piodalanTipe?: 'pawukon' | 'purnama' | 'tilem' | null;
    piodalanSaptawara?: string | null;
    piodalanPancawara?: string | null;
    piodalanWuku?: string | null;
    piodalanSasih?: string | null;
    catatanPiodalan?: string | null;
    fotoUrl?: string | null;
    deskripsi?: string | null;
}

function getSaptawaraShort(saptawaraName: string): string {
    return saptawaraName.split(' (')[0];
}

/**
 * Finds the next piodalan date for a given pura.
 * Searches up to ~384 days (max cycle of Balinese calendar systems).
 */
export function findNextPiodalan(pura: PuraBase, startDate: Date = new Date()): Date | null {
    if (!pura.piodalanTipe) return null;

    const current = new Date(startDate);
    current.setHours(0, 0, 0, 0);

    for (let i = 0; i < 400; i++) {
        const testDate = new Date(current);
        testDate.setDate(current.getDate() + i);

        const baliDate = getBaliDate(testDate);

        if (pura.piodalanTipe === 'pawukon') {
            const saptaMatch = !pura.piodalanSaptawara || getSaptawaraShort(baliDate.saptawara.name) === pura.piodalanSaptawara;
            const pancaMatch = !pura.piodalanPancawara || baliDate.pancawara.name === pura.piodalanPancawara;
            const wukuMatch = !pura.piodalanWuku || baliDate.wuku.name === pura.piodalanWuku;

            if (saptaMatch && pancaMatch && wukuMatch) {
                return testDate;
            }
        }
        else if (pura.piodalanTipe === 'purnama' || pura.piodalanTipe === 'tilem') {
            const isExpectedType = baliDate.purnamaTilem && baliDate.purnamaTilem.type.toLowerCase() === pura.piodalanTipe;
            const sasihPrefix = baliDate.sasih.name.replace('Sasih ', '');
            const sasihMatch = !pura.piodalanSasih || sasihPrefix.startsWith(pura.piodalanSasih);

            if (isExpectedType && sasihMatch) {
                return testDate;
            }
        }
    }

    return null;
}
