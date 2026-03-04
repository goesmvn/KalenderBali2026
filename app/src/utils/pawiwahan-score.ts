import type { BaliDate } from '../types/bali-calendar';
import { calculateDewasaAyu } from './dewasa-ayu';

export interface YadnyaScoreResult {
    score: number;
    goodMatches: Array<{ name: string; description: string; tags?: string[] }>;
    badMatches: Array<{ name: string; description: string; tags?: string[]; warningType?: 'larangan_mutlak' | 'peringatan' | 'rangda_tiga' | 'tanpa_guru' }>;
    isHariUtama?: boolean;
}

export function calculatePawiwahanScore(baliDate: BaliDate): YadnyaScoreResult {
    const goodMatches: any[] = [];
    const badMatches: any[] = [];
    let score = 0;
    let isHariUtama = false;

    const saptawara = baliDate.saptawara.name;
    const pancawara = baliDate.pancawara.name.split(' ')[0]; // Handle 'Paing (P)' if any
    const penanggalStatus = baliDate.penanggalPangelong?.status;
    const penanggalDay = baliDate.penanggalPangelong?.day;
    const wuku = baliDate.wuku.name;

    // 1. Cek Hari Utama Pawiwahan (Override semua)
    if (saptawara === 'Budha' && pancawara === 'Paing' && penanggalStatus === 'Penanggal' && penanggalDay === 5) {
        isHariUtama = true;
        goodMatches.push({ name: 'Panca Merta (Hari Utama)', description: 'Membawa keselamatan dan panjang umur.' });
    } else if (saptawara === 'Saniscara' && pancawara === 'Paing' && penanggalStatus === 'Penanggal' && penanggalDay === 10) {
        isHariUtama = true;
        goodMatches.push({ name: 'Sada Merta (Hari Utama)', description: 'Pasangan langgeng dan sejahtera.' });
    } else if (saptawara === 'Wraspati' && pancawara === 'Wage' && penanggalStatus === 'Penanggal' && penanggalDay === 3) {
        isHariUtama = true;
        goodMatches.push({ name: 'Merta Sedana (Hari Utama)', description: 'Rumah tangga mapan, rejeki lancar, dan keturunan baik.' });
    } else if (saptawara === 'Sukra' && pancawara === 'Paing' && penanggalStatus === 'Penanggal' && penanggalDay === 10) {
        isHariUtama = true;
        goodMatches.push({ name: 'Dasa Amertha (Hari Utama)', description: 'Murah sandang pangan, keluarga harmonis, sejahtera lahir batin.' });
    }

    // Jika Hari Utama, langsung return 100% dan abaikan larangan lainnya
    if (isHariUtama) {
        return { score: 100, goodMatches, badMatches, isHariUtama: true };
    }

    // 2. Cek Larangan Mutlak Pangelong
    if (penanggalStatus === 'Pangelong') {
        badMatches.push({
            name: 'Pangelong (Bulan Susut/Mati)',
            description: 'Sebaiknya dihindari mutlak untuk pawiwahan karena dipercaya membawa duka, sakit, atau kesengsaraan.',
            warningType: 'larangan_mutlak'
        });
    } else if (penanggalStatus === 'Penanggal' && [6, 8, 9, 12, 14, 15].includes(penanggalDay || 0)) {
        // Penanggal kurang baik berdasarkan pakem
        badMatches.push({
            name: `Penanggal ${penanggalDay} (Kurang Baik)`,
            description: 'Penanggal yang dinilai kurang baik berdasarkan pakem lontar untuk pawiwahan.',
            warningType: 'peringatan'
        });
    }

    // 3. Cek Wuku Rangda Tiga
    const rangdaTiga = ['Wariga', 'Warigadean', 'Pujut', 'Pahang', 'Menail', 'Prangbakat'];
    if (rangdaTiga.includes(wuku)) {
        badMatches.push({
            name: `Wuku Rangda Tiga (${wuku})`,
            description: 'Wuku pantangan untuk Pawiwahan. Dipercaya mendatangkan sakit, kesengsaraan, hingga balu (janda/duda).',
            warningType: 'rangda_tiga'
        });
    }

    // 4. Cek Wuku Tanpa Guru
    const tanpaGuru = ['Gumbreg', 'Kuningan', 'Kelawu', 'Medangkungan'];
    if (tanpaGuru.includes(wuku)) {
        badMatches.push({
            name: `Wuku Tanpa Guru (${wuku})`,
            description: 'Menyebabkan sulit memperoleh ilmu dan keturunan dalam berumah tangga.',
            warningType: 'tanpa_guru'
        });
    }

    // 5. Cek Wuku Was Panganten
    const isWasPangantenTolu = wuku === 'Tolu' && ((saptawara === 'Redite' && pancawara === 'Kliwon') || (saptawara === 'Sukra' && pancawara === 'Pon'));
    const isWasPangantenDungulan = wuku === 'Dungulan' && ((saptawara === 'Redite' && pancawara === 'Wage') || (saptawara === 'Saniscara' && pancawara === 'Kliwon'));
    const isWasPangantenMenail = wuku === 'Menail' && ((saptawara === 'Redite' && pancawara === 'Umanis') || (saptawara === 'Saniscara' && pancawara === 'Paing'));
    const isWasPangantenDukut = wuku === 'Dukut' && ((saptawara === 'Redite' && pancawara === 'Pon') || (saptawara === 'Saniscara' && pancawara === 'Wage'));

    if (isWasPangantenTolu || isWasPangantenDungulan || isWasPangantenMenail || isWasPangantenDukut) {
        badMatches.push({
            name: `Was Panganten (${saptawara} ${pancawara} ${wuku})`,
            description: 'Hari pantangan mutlak untuk Pawiwahan (Menikah).',
            warningType: 'larangan_mutlak'
        });
    }

    // 6. Cek Ala Ayuning Dewasa standard (general Manusa Yadnya)
    const dewasaAyuList = calculateDewasaAyu(baliDate);
    for (const dewasa of dewasaAyuList) {
        if (dewasa.tags.includes('Manusa Yadnya')) {
            goodMatches.push(dewasa);
        }
        // Cek larangan spesifik Manusa Yadnya atau Larangan Umum
        const isLaranganSpesifik = dewasa.tags.includes('Larangan Manusa Yadnya');
        const isLaranganUmum = dewasa.tags.includes('Larangan Umum');

        if (isLaranganSpesifik || isLaranganUmum) {
            badMatches.push(dewasa);
        }
    }

    // Kalkulasi Skor
    if (badMatches.some(b => b.warningType === 'larangan_mutlak' || b.warningType === 'rangda_tiga')) {
        score = 0; // Nilai hancur jika ada larangan mutlak atau rangda tiga
    } else if (goodMatches.length === 0 && badMatches.length === 0) {
        score = 0; // Netral
    } else if (goodMatches.length > 0 && badMatches.length === 0) {
        score = 90; // Sangat Baik (tidak 100 karena 100 khusus Hari Utama)
    } else if (goodMatches.length === 0 && badMatches.length > 0) {
        score = 0; // Buruk
    } else {
        // Campuran
        score = Math.round((goodMatches.length / (goodMatches.length + badMatches.length)) * 100);
        if (score >= 90) score = 89; // Ensure it doesn't reach the "Very Good" threshold if there are bad matches
    }

    return {
        score,
        goodMatches,
        badMatches,
        isHariUtama: false
    };
}
