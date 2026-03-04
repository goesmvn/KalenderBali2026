import type { BaliDate } from '../types/bali-calendar';
import { calculateDewasaAyu } from './dewasa-ayu';
import { calculatePadewasanUrip } from './wewaran-urip';

export interface KelahiranScoreResult {
    score: number;
    goodMatches: Array<{ name: string; description: string; tags?: string[] }>;
    badMatches: Array<{ name: string; description: string; tags?: string[]; warningType?: string }>;
    tanggalCantikLabel?: string;
    uripHarmonyLabel?: string;
    uripHarmonyScore?: number;
}

/**
 * Checks if a given date string (YYYY-MM-DD or DD-MM) is a "Tanggal Cantik"
 */
function checkTanggalCantik(date: Date): { isCantik: boolean, label: string } {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    // Pad with zero
    const dd = d.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const yy = y.toString().substring(2); // e.g 26

    // 1. Same Day and Month (e.g., 04-04, 12-12)
    if (d === m) {
        return { isCantik: true, label: `Tanggal Cantik Kembar (${dd}-${mm})` };
    }

    // 2. Sequential (e.g., 1-2-3, 04-05-06)
    if (d === m - 1 && Number(yy) === m + 1) { // 04-05-06
        return { isCantik: true, label: `Tanggal Sekuensial (${dd}-${mm}-${yy})` };
    }

    // 3. Mirror/Palindrome pattern simple (if day and month mirror year ending, e.g. 26-02-2026)
    const ddmmyy = `${dd}${mm}${yy}`;
    const reversed = ddmmyy.split('').reverse().join('');
    if (ddmmyy === reversed) {
        return { isCantik: true, label: `Tanggal Palindrom (${dd}-${mm}-${yy})` };
    }

    return { isCantik: false, label: '' };
}

/**
 * Calculates the harmony score between parents and child using traditional Urip summation
 * Returns Sri (1), Laba (2), Jaya (3), Menala (4), or Bumi (5/0)
 */
function calculateUripHarmony(ayah: { saptawara: string, pancawara: string }, ibu: { saptawara: string, pancawara: string }, anak: { saptawara: string, pancawara: string }): { label: string, harmonyValue: number } {
    const ayahUrip = ayah.saptawara ? calculatePadewasanUrip(ayah.saptawara, ayah.pancawara) : 0;
    const ibuUrip = ibu.saptawara ? calculatePadewasanUrip(ibu.saptawara, ibu.pancawara) : 0;
    const anakUrip = calculatePadewasanUrip(anak.saptawara, anak.pancawara);

    if (ayahUrip === 0 && ibuUrip === 0) {
        return { label: '', harmonyValue: -1 }; // No parents provided
    }

    const totalUrip = ayahUrip + ibuUrip + anakUrip;
    const remainder = totalUrip % 5;

    switch (remainder) {
        case 1: return { label: 'Sri (Pertanian/Kemakmuran)', harmonyValue: 5 }; // Excellent
        case 2: return { label: 'Laba (Keuntungan/Kelebihan)', harmonyValue: 4 }; // Very Good
        case 3: return { label: 'Jaya (Kejayaan/Kesuksesan)', harmonyValue: 3 }; // Good
        case 4: return { label: 'Menala (Kesedihan/Sakit)', harmonyValue: -2 }; // Bad
        case 0: return { label: 'Bumi (Kehancuran/Tanah)', harmonyValue: -5 }; // Very Bad
        default: return { label: 'Netral', harmonyValue: 0 };
    }
}


export function calculateKelahiranScore(
    baliDate: BaliDate,
    targetDate: Date,
    ayahOtonan?: { saptawara: string, pancawara: string },
    ibuOtonan?: { saptawara: string, pancawara: string }
): KelahiranScoreResult {
    const goodMatches: any[] = [];
    const badMatches: any[] = [];
    let score = 0;

    // 1. Manusa Yadnya standard scoring logic (similar to general filter)
    const dewasaAyuList = calculateDewasaAyu(baliDate);
    for (const dewasa of dewasaAyuList) {
        if (dewasa.tags.includes('Manusa Yadnya') || dewasa.tags.includes('Kesehatan')) {
            goodMatches.push(dewasa);
        }

        // Cek larangan spesifik kelahiran/Manusa Yadnya
        if (dewasa.tags.includes('Larangan Manusa Yadnya') || dewasa.tags.includes('Larangan Umum')) {
            badMatches.push(dewasa);
        }
    }

    // Evaluasi dasar Manusa Yadnya
    let baseScore = 50; // Neutral starting score
    if (badMatches.length > 0) {
        baseScore -= badMatches.length * 15;
    }
    if (goodMatches.length > 0) {
        baseScore += goodMatches.length * 10;
    }

    // Pangelong constraint (biasanya dihindari untuk kelahiran sesar)
    if (baliDate.penanggalPangelong?.status === 'Pangelong') {
        badMatches.push({
            name: 'Pangelong (Bulan Susut)',
            description: 'Hari Pangelong sering dihindari untuk mencari hari baik memulai kehidupan jika ada pilihan (meski kelahiran alami tak bisa ditolak).',
            warningType: 'peringatan'
        });
        baseScore -= 20;
    }

    // 2. Cek Tanggal Cantik (Bonus Points)
    const cantikStatus = checkTanggalCantik(targetDate);
    if (cantikStatus.isCantik) {
        goodMatches.push({
            name: cantikStatus.label,
            description: 'Tanggal estetis (Tanggal Cantik) yang sangat mudah diingat.',
        });
        baseScore += 30; // High bonus for aesthetically pleasing dates
    }

    // 3. Cek Urip Harmony dengan Orang Tua (Bonus/Penalty)
    let uripLabel = undefined;
    let uripScore = 0;

    // Only calculate if at least one parent's otonan is somewhat provided
    if ((ayahOtonan && ayahOtonan.saptawara) || (ibuOtonan && ibuOtonan.saptawara)) {
        const harmony = calculateUripHarmony(
            ayahOtonan || { saptawara: '', pancawara: '' },
            ibuOtonan || { saptawara: '', pancawara: '' },
            { saptawara: baliDate.saptawara.name, pancawara: baliDate.pancawara.name.split(' ')[0] }
        );

        if (harmony.harmonyValue > 0) {
            goodMatches.push({
                name: `Urip Harmonis: ${harmony.label}`,
                description: 'Kombinasi numerologi Urip antara anak dan orangtua menunjukan energi positif yang selaras.'
            });
            baseScore += harmony.harmonyValue * 5; // e.g. Sri(+25), Laba(+20), Jaya(+15)
        } else if (harmony.harmonyValue < 0) {
            badMatches.push({
                name: `Urip Bentrok: ${harmony.label}`,
                description: 'Kombinasi numerologi Urip anak dan orangtua memiliki potensi ketidakselarasan energi.',
                warningType: 'peringatan_urip'
            });
            baseScore += harmony.harmonyValue * 5; // e.g. Menala(-10), Bumi(-25)
        }

        uripLabel = harmony.label;
        uripScore = harmony.harmonyValue;
    }

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, baseScore));

    return {
        score,
        goodMatches,
        badMatches,
        tanggalCantikLabel: cantikStatus.isCantik ? cantikStatus.label : undefined,
        uripHarmonyLabel: uripLabel,
        uripHarmonyScore: uripScore
    };
}
