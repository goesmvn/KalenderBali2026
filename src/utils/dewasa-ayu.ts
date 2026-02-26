import type { BaliDate } from '../types/bali-calendar';
import { alaAyuningData, type AlaAyuningDewasa } from './dewasa-ayu-data';

/**
 * Normalisasi string untuk pencocokan (menghilangkan spasi ekstra, huruf kecil semua)
 */
function normalize(str: string): string {
    return str.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Memecah kalimat kondisi dari referensi (misal: "Soma Wage Penanggal 1")
 * Menjadi array token terpisah untuk dicocokkan dengan properti BaliDate.
 */
function evaluateCondition(condition: string, baliDate: BaliDate): boolean {
    if (!condition) return false;

    const target = normalize(condition);
    let isMatch = true;

    // 1. Ekstrak Wewaran (Saptawara, Pancawara, Triwara, dll) dan Wuku
    const saptawara = normalize(baliDate.saptawara.name.split(' (')[0]); // "Soma", "Redite", dsb
    const pancawara = normalize(baliDate.pancawara.name); // "Umanis", "Paing", "Pon", "Wage", "Kliwon" / "Keliwon"
    const triwara = normalize(baliDate.triwara.name.split(' (')[0]); // "Pasah", "Beteng", "Kajeng"
    const wuku = normalize(baliDate.wuku.name); // "Sinta", "Landep", dsb

    // 2. Ekstrak Fase Bulan (Penanggal / Pangelong / Purnama / Tilem)
    const isPurnama = target.includes('purnama');
    const isTilem = target.includes('tilem');

    // Karena penanggal/pangelong diekstrak dengan angka, misal "penanggal 1"
    const hasPenanggal = target.includes('penanggal');
    const hasPangelong = target.includes('pangelong');

    // Ekstrak angka jika ada (1-15)
    const numberMatch = target.match(/\b([1-9]|1[0-5])\b/);
    const targetDay = numberMatch ? parseInt(numberMatch[1], 10) : null;

    // -- Cek spesifik untuk purnama / tilem
    if (isPurnama) {
        if (!baliDate.purnamaTilem || baliDate.purnamaTilem.name !== 'Purnama') isMatch = false;
    }
    if (isTilem) {
        if (!baliDate.purnamaTilem || baliDate.purnamaTilem.name !== 'Tilem') isMatch = false;
    }

    // -- Cek siklus lunar dengan hari (Penanggal 1, Pangelong 6, dst)
    if (hasPenanggal) {
        if (!baliDate.penanggalPangelong || baliDate.penanggalPangelong.status !== 'Penanggal') isMatch = false;
        if (targetDay !== null && baliDate.penanggalPangelong?.day !== targetDay) isMatch = false;
    }

    if (hasPangelong) {
        if (!baliDate.penanggalPangelong || baliDate.penanggalPangelong.status !== 'Pangelong') isMatch = false;
        if (targetDay !== null && baliDate.penanggalPangelong?.day !== targetDay) isMatch = false;
    }

    // -- Cek Wewaran Spesifik (Soma, Wage, dsb)
    // Periksa apakah nama wewaran/wuku spesifik ada di target, jika ya, hari ini harus cocok
    if (target.includes('redite') && saptawara !== 'redite') isMatch = false;
    if (target.includes('soma') && saptawara !== 'soma') isMatch = false;
    if (target.includes('anggara') && saptawara !== 'anggara') isMatch = false;
    if (target.includes('buda') && saptawara !== 'buda') isMatch = false;
    if (target.includes('wraspati') && saptawara !== 'wraspati') isMatch = false;
    if (target.includes('sukra') && saptawara !== 'sukra') isMatch = false;
    if (target.includes('saniscara') && saptawara !== 'saniscara') isMatch = false;

    if (target.includes('umanis') && pancawara !== 'umanis') isMatch = false;
    if (target.includes('paing') && pancawara !== 'paing') isMatch = false;
    if (target.includes('pon') && pancawara !== 'pon') isMatch = false;
    if (target.includes('wage') && pancawara !== 'wage') isMatch = false;
    if ((target.includes('kliwon') || target.includes('keliwon')) && pancawara !== 'kliwon') isMatch = false;

    if (target.includes('pasah') && triwara !== 'pasah') isMatch = false;
    if (target.includes('beteng') && triwara !== 'beteng') isMatch = false;
    if (target.includes('kajeng') && triwara !== 'kajeng') isMatch = false;

    // -- Cek Wuku (hanya jika target menyebut wuku)
    const wukus = ['sinta', 'landep', 'ukir', 'kulantir', 'tolu', 'gumbreg', 'wariga', 'warigadean', 'julungwangi', 'sungsang', 'dunggulan', 'kuningan', 'langkir', 'medangsia', 'pujut', 'pahang', 'krulut', 'merakih', 'tambir', 'medangkungan', 'matal', 'uye', 'menail', 'prangbakat', 'bala', 'ugu', 'wayang', 'kulawu', 'dukut', 'watugunung'];
    for (const w of wukus) {
        // Exact match for wuku name to avoid partial like 'kuningan' vs something else
        const regex = new RegExp(`\\b${w}\\b`);
        if (regex.test(target) && wuku !== w) isMatch = false;
    }

    // -- Cek Sasih (Kasa, Karo, dll)
    // Format sasih di BaliDate: "Sasih Kasa (Srawana)"
    const sasihRaw = normalize(baliDate.sasih.name);
    const sasihs = ['kasa', 'karo', 'katiga', 'kapat', 'kalima', 'kanem', 'kapitu', 'kawalu', 'kasanga', 'kedasa', 'dresta', 'sadha'];
    for (const s of sasihs) {
        if (new RegExp(`\\b${s}\\b`).test(target) && !sasihRaw.includes(`sasih ${s}`)) isMatch = false;
    }

    return isMatch;
}

/**
 * Menghitung dan memberikan array Ala Ayuning Dewasa pada tanggal tertentu
 */
export function calculateDewasaAyu(baliDate: BaliDate): AlaAyuningDewasa[] {
    const activeDewasaAyu: AlaAyuningDewasa[] = [];

    for (const rule of alaAyuningData) {
        if (!rule.conditions || rule.conditions.length === 0) continue;

        // Satu rule bisa punya banyak conditions (misal: "Soma Wage Penanggal 1", "Buda Pon Penanggal 10")
        // Evaluasi adalah OR, jika salah satu cocok, maka rule dianggap aktif.
        const isRuleActive = rule.conditions.some(condition => evaluateCondition(condition, baliDate));

        if (isRuleActive) {
            activeDewasaAyu.push(rule);
        }
    }

    return activeDewasaAyu;
}
