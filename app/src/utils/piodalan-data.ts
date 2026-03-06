import type { BaliDate } from '@/types/bali-calendar';

export interface PiodalanEntry {
    wewaran: string;
    pura: string[];
}

// Stores dynamically loaded piodalan data from the backend API
let piodalanPawukon: Record<string, string[]> = {};
let piodalanPurnama: Record<string, string[]> = {};
let piodalanTilem: Record<string, string[]> = {};

/**
 * Fetch pura data from the backend and populate the Piodalan caches.
 * Should be called once on application startup.
 */
export async function loadPiodalanData() {
    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
        const res = await fetch(`${API_URL}/pura`);
        if (!res.ok) return;

        const puraList = await res.json();

        const newPawukon: Record<string, string[]> = {};
        const newPurnama: Record<string, string[]> = {};
        const newTilem: Record<string, string[]> = {};

        puraList.forEach((pura: any) => {
            const name = pura.alias ? `${pura.nama} (${pura.alias})` : pura.nama;

            if (pura.piodalanTipe === 'pawukon' && pura.piodalanSaptawara && pura.piodalanPancawara && pura.piodalanWuku) {
                const key = `${pura.piodalanSaptawara} ${pura.piodalanPancawara} ${pura.piodalanWuku}`;
                if (!newPawukon[key]) newPawukon[key] = [];
                newPawukon[key].push(name);
            } else if (pura.piodalanTipe === 'purnama' && pura.piodalanSasih) {
                if (!newPurnama[pura.piodalanSasih]) newPurnama[pura.piodalanSasih] = [];
                newPurnama[pura.piodalanSasih].push(name);
            } else if (pura.piodalanTipe === 'tilem' && pura.piodalanSasih) {
                if (!newTilem[pura.piodalanSasih]) newTilem[pura.piodalanSasih] = [];
                newTilem[pura.piodalanSasih].push(name);
            }
        });

        piodalanPawukon = newPawukon;
        piodalanPurnama = newPurnama;
        piodalanTilem = newTilem;
    } catch (err) {
        console.error('Failed to load dynamic piodalan data:', err);
    }
}

/**
 * Normalize saptawara name from full format to short
 * e.g., "Redite (Minggu)" -> "Redite"
 */
function getSaptawaraShort(saptawaraName: string): string {
    return saptawaraName.split(' (')[0];
}

/**
 * Normalize pancawara name
 */
function getPancawaraKey(pancawaraName: string): string {
    return pancawaraName;
}

/**
 * Generate the piodalan lookup key from a BaliDate
 */
function getPiodalanKey(baliDate: BaliDate): string {
    const sapta = getSaptawaraShort(baliDate.saptawara.name);
    const panca = getPancawaraKey(baliDate.pancawara.name);
    const wuku = baliDate.wuku.name;
    return `${sapta} ${panca} ${wuku}`;
}

/**
 * Get piodalan entries for a given BaliDate
 * Returns list of pura names or empty array.
 * Includes Pawukon, Purnama, and Tilem based Piodalan.
 */
export function getPiodalan(baliDate: BaliDate): string[] {
    const results: string[] = [];

    // Check Pawukon Piodalan
    const pawukonKey = getPiodalanKey(baliDate);
    if (piodalanPawukon[pawukonKey]) {
        results.push(...piodalanPawukon[pawukonKey]);
    }

    // Check Purnama / Tilem Piodalan
    if (baliDate.purnamaTilem) {
        const sasihName = baliDate.sasih.name; // e.g., "Sasih Kasa"
        const sasihPrefix = sasihName.replace('Sasih ', ''); // "Kasa"

        if (baliDate.purnamaTilem.type === 'Purnama') {
            const matchingSasih = Object.keys(piodalanPurnama).find(k => k.startsWith(sasihPrefix));
            if (matchingSasih && piodalanPurnama[matchingSasih]) {
                results.push(...piodalanPurnama[matchingSasih]);
            }
        } else if (baliDate.purnamaTilem.type === 'Tilem') {
            const matchingSasih = Object.keys(piodalanTilem).find(k => k.startsWith(sasihPrefix));
            if (matchingSasih && piodalanTilem[matchingSasih]) {
                results.push(...piodalanTilem[matchingSasih]);
            }
        }
    }

    return results;
}

/**
 * Get the wewaran label for piodalan display
 */
export function getPiodalanWewaran(baliDate: BaliDate): string {
    return getPiodalanKey(baliDate);
}
