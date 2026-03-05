/**
 * Data Piodalan — Hari Perayaan/Ulang Tahun Pura & Merajan
 * Sumber: kalenderbali.com/piodalan
 * 
 * Piodalan berbasis Pawukon (210 hari) ditentukan oleh kombinasi:
 *   Saptawara + Pancawara + Wuku
 * Piodalan berbasis Purnama/Tilem mengikuti siklus lunar (Sasih)
 */

import type { BaliDate } from '@/types/bali-calendar';

export interface PiodalanEntry {
    wewaran: string;       // Key: "Saptawara Pancawara Wuku" e.g. "Buda Kliwon Pahang"
    pura: string[];        // List of pura names
}

/**
 * Piodalan berbasis Pawukon — berulang setiap 210 hari
 * Key format: "SaptawaraShort PancawaraName WukuName"
 * Saptawara short: Redite, Soma, Anggara, Buda, Wraspati, Sukra, Saniscara
 */
const piodalanPawukon: Record<string, string[]> = {
    // === WUKU SINTA ===
    'Buda Kliwon Sinta': [
        'Pura Laban Sindu Jiwa Kedewatan Ubud',
        'Pura Kehen Bangli',
        'Pura Wirabuana Magelang',
        'Pura Gadung Pengiasan Dauh Puri Denpasar',
        'Pura Pasek Gelgel Buruan Kaja Tabanan',
        'Pura Masceti Selasih Sanding Tampak Siring',
        'Pura Luhur Giri Selaka Alas Purwo Banyuwangi',
        'Pura Sada Gaduh Kaba-Kaba Tabanan',
    ],

    // === WUKU LANDEP ===
    'Saniscara Kliwon Landep': [
        'Pura Pasek Gelgel Pedungan Denpasar',
        'Pura Agung Pasek Tangun Titi Tabanan',
        'Pura Agung Pasek Silamadeg Tabanan',
        'Pura Pasek Tangkas Kediri Tabanan',
        'Pura Kerta Banyuning Barat Buleleng',
        'Pura Dalem Tenggaling Sengguan Singapadu',
        'Pura Kawitan Arya Wang Bang Pinatih Singaraja',
        'Pura Penataran Pande Kusamba Klungkung',
        'Pura Agung Tirta Bhuana Bekasi',
    ],

    // === WUKU UKIR ===
    'Redite Umanis Ukir': [
        'Sangah Gede Dukuh Segening Tegal Tugu Gianyar',
    ],
    'Buda Wage Ukir': [
        'Pura Pasar Agung Besakih',
        'Pura Pasek Bendesa Pasar Badung Legian Kuta',
        'Pura Gede Gunung Agung Dukuh Munggu Badung',
        'Pura Puseh/Desa Bebalang Bangli',
        'Pura Kekeran Langit Sading Mengwi',
    ],

    // === WUKU KULANTIR ===
    'Anggara Kliwon Kulantir': [
        'Pura Penataran Tangkas Sukawati',
        'Pura Dalem Lagan Bebalang Bangli',
        'Pura Puseh Lembeng Ketewel Sukawati',
        'Pura Pasek Gelgel Penulisan Kerambitan Tabanan',
        'Pura Gaduh Sanding',
        'Pura Dalem Gandamayu Klungkung',
        'Pura Sanghyang Tegal Taro Kaja Tegalalang',
    ],
    'Buda Umanis Kulantir': [
        'Pura Pasek Tangkas Kaler Tabanan',
        'Pura Gaduh Benoh Ubung Denpasar',
    ],

    // === WUKU TOLU ===
    'Redite Kliwon Tolu': [
        'Pura Dalem Alas Harum Kaba-kaba Tabanan',
    ],
    'Soma Umanis Tolu': [
        'Pura Puseh/Balai Agung Ubung Kupang Penebel Tabanan',
        'Pura Kawitan Sakula Gotra Kaba-kaba Tabanan',
        'Pura Bhujangga Rsi Tambak Bayuh',
        'Pura Paibon Tangkas Kori Agung Lembongan Nusa Penida',
        'Pura Batu Madeg Besakih',
        'Pura Penataran Agung Penatih',
    ],
    'Buda Pon Tolu': [
        'Pura Catur Buwana Sanding Tampaksiring',
    ],
    'Wraspati Wage Tolu': [
        'Pura Peninjoan Besakih',
    ],

    // === WUKU GUMBREG ===
    'Buda Kliwon Gumbreg': [
        'Pura Pasek Gelgel Kukuh Marga Tabanan',
        'Pura Pasek Gelgel Dukuh Selemadeg Tabanan',
        'Pura Puseh/Desa Guwang Sukawati',
        'Merajan Pasek Ketewel',
        'Pura Dalem Setra Batu Nunggul Nusa Penida',
    ],

    // === WUKU WARIGA ===
    'Saniscara Kliwon Wariga': [
        'Pura Pasek Gelgel Br Tengah Buleleng',
        'Pura Dalem Pemuteran Jelantik Tojan Klungkung',
        'Pura Pedarmaan Bhujangga Waisnawa Besakih',
        'Pura Taman Sari Gunungsari Penebel Tabanan',
        'Pura Dalem Tarukan Bebalang Bangli',
        'Pura Benua Kangin Besakih',
    ],
    'Buda Paing Wariga': [
        'Merajan Pasek Gaduh Kayubihi Bangli',
    ],

    // === WUKU WARIGADEAN ===
    'Saniscara Kliwon Warigadean': [
        'Pura Puseh/Desa Batuan Sukawati',
        'Pura Pasek Bendesa Kekeran Mengwi',
        'Pura Manik Mas Besakih',
    ],
    'Buda Wage Warigadean': [
        'Pura Kepisah Sumerta Denpasar',
        'Pura Pasek Gelgel Gerih Abiansemal',
        'Pura Puncaksari Penarukan Peninjoan Bangli',
        'Pura Bangun Sakti Besakih',
        'Pura Antegsari Kaba-Kaba Tabanan',
    ],
    'Sukra Umanis Warigadean': [
        'Odalan Ida Ratu Penataran Agung Besakih',
        'Odalan Ida Ratu Puraus Merajan Salonding Besakih',
    ],

    // === WUKU JULUNGWANGI ===
    'Redite Pon Julungwangi': [
        'Pura Panti Pasek Gelgel Gobleg Singaraja',
    ],
    'Anggara Kliwon Julungwangi': [
        'Pura Tirtaharum Tegalwangi Bangli',
        'Pura Pasek Tohjiwa Wanasari Tabanan',
        'Pura Pasek Tangguntiti Jakatebel Tabanan',
        'Pura Pasek Bendesa Sangsit Buleleng',
        'Pura Dalem Waturenggong Taro Tegalalang',
        'Pura Pasek Gelgel Tulikup',
    ],
    'Buda Umanis Julungwangi': [
        'Pura Penetaran Gana Bebalang Bangli',
        'Pura Dalem Gede Banjar Pande Bangli',
        'Pura Puncaksari Sangeh Abiansemal',
        'Pura Dadia Agung Pasek Sanak Sapta Resi Sidan Gianyar',
        'Pura Puseh Penegil Darma Kubutambahan Singaraja',
    ],

    // === WUKU SUNGSANG ===
    'Wraspati Wage Sungsang': [
        'Pura Kawitan Tangkas Kori Agung Tangkas Klungkung',
        'Odalan Ida Ratu Mas Penataran Agung Besakih',
    ],

    // === WUKU DUNGULAN ===
    'Buda Kliwon Dungulan': [
        'Pura Wakika Kupang NTT',
        'Pura Agung Girinatha Sumbawa NTB',
        'Pura Dukuh Sakti Kediri Tabanan',
        'Pura Mustika Dharma Jakarta Timur',
    ],
    'Wraspati Umanis Dungulan': [
        'Pura Watukaru Tabanan',
        'Pura Lempuyang Luhur Karangasem',
        'Pura Kentel Gumi Klungkung',
        'Pura Pasek Gaduh Umadesa Kediri Tabanan',
        'Pura Pasek Kubayan Wangaya Gede Tabanan',
    ],
    'Sukra Paing Dungulan': [
        'Pura Ulun Suwi Jimbaran Badung',
        'Pura Luhur Cemenggon Sukawati',
        'Pura Pasek Ubung Denpasar',
    ],
    'Saniscara Pon Dungulan': [
        'Pura Segara Jembrana',
        'Pura Dalem Gede Losan Klungkung',
    ],

    // === WUKU KUNINGAN ===
    'Soma Kliwon Kuningan': [
        'Pura Dasar Gelgel Klungkung',
        'Pura Pasek Tohjiwa Selemadeg Tabanan',
        'Pura Panti Pasek Gelgel Pelapuhan Buleleng',
    ],
    'Saniscara Kliwon Kuningan': [
        'Pura Taman Pule Mas Ubud',
        'Pura Ularan Takmung Klungkung',
        'Pura Bukitjati Bangli',
        'Pura Sadha Kapal',
        'Pura Sakenan Serangan',
        'Pura Dalem Sanding Tampaksiring',
        'Pura Agung Blambangan Banyuwangi',
        'Pura Dalem Guwang Sukawati',
        'Pura Pekendungan Kediri Tabanan',
    ],

    // === WUKU LANGKIR ===
    'Buda Wage Langkir': [
        'Pura Tanah Lot Tabanan',
        'Pura Bucabe Mas Ubud',
        'Pura Puseh Ganggang Batuan',
        'Pura Masceti Sanding Tampaksiring',
        'Pura Dalem Bangun Sakti Kapal',
    ],

    // === WUKU MEDANGSIA ===
    'Redite Pon Medangsia': [
        'Pura Agung Pentilan Kesiman Denpasar',
        'Pura Pasek Tohjiwa Kerambitan Tabanan',
    ],
    'Soma Wage Medangsia': [
        'Pura Nataran Getas Blahbatuh',
        'Merajan Pasek Gelgel Aan Klungkung',
    ],
    'Anggara Kliwon Medangsia': [
        'Pura Luwur Uluwatu Pecatu',
        'Pura Penataran Agung Singakerta Ubud',
        'Pura Andakasa Karangasem',
        'Pura Gua Lawah Klungkung',
        'Pura Taman Ayun Mengwi',
        'Pura Pusering Jagat Pejeng Tampaksiring',
        'Pura Geria Sakti Tulikup Gianyar',
        'Pura Dalem Senapati Bebalang Bangli',
        'Pura Dalem Dauh Ubud',
    ],
    'Buda Umanis Medangsia': [
        'Pura Gede Perancak Jembrana',
        'Pura Dalem Dauma Batuan Sukawati',
        'Pura Dalem Sukehet Klungkung',
        'Pura Taman Tegalalang',
        'Pura Sahab Nusa Penida',
        'Pura Desa Sanding Tampaksiring',
    ],
    'Wraspati Paing Medangsia': [
        'Pura Ulun Swi Kediri Tabanan',
    ],

    // === WUKU PUJUD ===
    'Redite Kliwon Pujud': [
        'Merajan Pasek Tohjiwa Kekeran Mengwi',
    ],

    // === WUKU PAHANG ===
    'Anggara Wage Pahang': [
        'Pura Batu Madeg (Meru Tumpang Sanga) Besakih',
    ],
    'Buda Kliwon Pahang': [
        'Pura Luhur Puncak Padang Dawa Baturiti Tabanan',
        'Pura Silayukti Padangbai Karangasem',
        'Pura Penataran Batuyang Batubulan',
        'Pura Desa Lembeng Ketewel Sukawati',
        'Pura Kawitan Dalem Sukawati Gianyar',
        'Pura Sadha Kapal',
        'Pura Puseh Bebandem Karangasem',
        'Pura Sad Kahyangan Batu Medahu Nusa Penida',
        'Pura Penataran Agung Sukawati',
        'Pura Batur Sari Ubud',
    ],

    // === WUKU KRULUT ===
    'Soma Kliwon Krulut': [
        'Pura Pasek Gelgel Kekeran Mengwi Badung',
    ],

    // === WUKU MRAKIH (MERAKIH) ===
    'Redite Umanis Mrakih': [
        'Pura Parangan Tengah Ceningan Kangin Lembongan Nusa Penida',
        'Pura Dalem Celuk Sukawati Gianyar',
    ],
    'Buda Wage Mrakih': [
        'Pura Bendesa Mas Kepisah Pedungan Denpasar',
        'Pura Natih Batubulan',
        'Pura Puseh/Desa Silakarang Singapadu',
        'Pura Dalem Petitenget Kerobokan Kuta',
        'Pura Dalem Pulasari Samplangan Gianyar',
        'Pura Pasek Lumintang Denpasar',
        'Pura Pasar Agung Kaba-kaba Tabanan',
    ],

    // === WUKU TAMBIR ===
    'Anggara Kliwon Tambir': [
        'Pura Dalem Puri Batuan Sukawati',
        'Pura Dalem Kediri Silakarang Singapadu',
        'Pura Dalem Sukawati',
        'Pura Dalem Singakerta Ubud',
        'Pura Dalem Lembeng Ketewel Sukawati',
        'Pura Paibon Pasek Tangkas Peliatan Ubud',
        'Pura Puseh Ngukuhin Keramas Gianyar',
        'Pura Karang Buncing Blahbatuh',
        'Pura Dalem Bubunan Seririt Buleleng',
        'Pura Desa Badung Denpasar',
        'Pura Selukat Keramas Blahbatuh Gianyar',
        'Pura Waturenggong Taro',
        'Pura Dalem Bentuyung Ubud',
        'Pura Puseh Ubud',
        'Pura Dalem Peliatan Ubud',
    ],
    'Buda Umanis Tambir': [
        'Pura Sari Bankar Titih Kapal',
    ],

    // === WUKU MATAL ===
    'Buda Kliwon Matal': [
        'Pura Puseh/Desa Sukawati',
        'Merajan Agung Batuyang Batubulan',
        'Pura Pasek Gelgel Bebetin Sawan Buleleng',
        'Pura Maspahit Sesetan Denpasar',
        'Pura Pasek Bendesa Manik Mas Tegalalang',
        'Pura Panti Pasek Gaduh Sesetan',
        'Pura Pedarman Arya Kanuruhan Besakih',
    ],

    // === WUKU UYE ===
    'Saniscara Kliwon Uye': [
        'Pura Puseh/Desa Kota Gianyar',
        'Pura Luhur Dalem Sagening Kediri Tabanan',
        'Merajan Pasek Gelgel Tegal Gede Badung',
    ],

    // === WUKU MENAIL ===
    'Buda Wage Menail': [
        'Pura Dalem Tarukan Cemenggaon Sukawati',
        'Pura Penataran Dalem Ketut Pejeng Kaja Gianyar',
        'Pura Puseh Menakaji Peninjoan Bangli',
        'Merajan Agung Blangsinga Blahbatuh',
        'Pura Kawitan Gusti Agung Blangsinga',
        'Pura Kawitan Gusti Celuk Kapal Mengwi',
    ],

    // === WUKU PRANGBAKAT ===
    'Anggara Kliwon Prangbakat': [
        'Pura Bukit Buluh Gunaksa Klungkung',
        'Pura Tirta Sudamala Bebalang Bangli',
        'Pura Paibon Pasek Bendesa Sangsit Buleleng',
        'Pura Pasek Gelgel Pangi Dawan Klungkung',
        'Pura Gunung Tengsong Lombok',
        'Pura Dalem Benawah Gianyar',
        'Pura Dalem Bitra Gianyar',
        'Pura Dalem Banyuning Timur Buleleng',
        'Pura Tengah Padang Tegalalang',
        'Pura Kawitan Tangkas Kori Agung Denpasar',
        'Pura Hyangaluh/Jenggala Besakih',
        'Pura Tengkulak Tulikup Gianyar',
        'Pura Penataran Badung Ogang Sidemen',
    ],
    'Buda Umanis Prangbakat': [
        'Pura Rambut Siwi Jembrana',
        'Pura Batu Bolong Canggu Kuta',
        'Pura Pasek Marga Klaci Tabanan',
        'Pura Agung Pasek Dauh Waru Jembrana',
        'Pura Desa Banyuning Buleleng',
        'Pura Puncak Mundi Nusa Penida',
        'Pura Dadi Agung Pasek Bendesa Dukuh Manuaba Tegalalang',
    ],

    // === WUKU UGU ===
    'Buda Kliwon Ugu': [
        'Pura Dalem Tarukan Pulasari Peninjoan Bangli',
        'Pura Pasek Gelgel Boading Kaba-kaba Tabanan',
        'Pura Pemayun Banyuning Tengah Buleleng',
        'Pura Desa KT Bubunan Seririt Buleleng',
        'Pura Agung Gunung Raung Taro Kaja Tegalalang',
        'Merajan Pasek Dangka Bungbungan',
    ],

    // === WUKU WAYANG ===
    'Saniscara Kliwon Wayang': [
        'Pura Majapahit Jembrana',
        'Pura Panti Gelgel Pengembungan Sesetan Denpasar',
        'Pura Pedarmaan Dalem Sukawati Besakih',
        'Pura Pedarmaan Mengwi Besakih',
        'Pura Pedarmaan Kaba-kaba Besakih',
        'Pura Dadia Agung Pasek Gelgel Pegatepan Klungkung',
        'Pura Penataran Giri Purwa Banyuwangi',
        'Pura Agung Jati Pramana Cirebon',
    ],

    // === WUKU KLAWU ===
    'Buda Wage Klawu': [
        'Pura Penataran Agung Teluk Padang Karangasem',
        'Pura Melanting Camenggaon Sukawati',
        'Pura Penataran Ped Nusa Penida',
        'Pura Goa Besakih',
        'Pura Basukian Besakih',
        'Pura Masceti Tegeh Mancawarna Sanding Tampaksiring',
        'Pura Penataran Batu Lepang Kamasan Klungkung',
    ],

    // === WUKU DUKUT ===
    'Anggara Kliwon Dukut': [
        'Pura Dalem Batuyang Batubulan',
        'Pura Pasek Gelgel Mengening Kediri Tabanan',
        'Pura Puser Jagat Dalem Dukut Nusa Penida',
    ],
    'Buda Umanis Dukut': [
        'Pura Agung Pasek Gelgel Sibang Kaja Abiansemal',
        'Pura Dalem Samplangan Gianyar',
    ],

    // === WUKU WATUGUNUNG ===
    'Saniscara Umanis Watugunung': [
        'Pura Pasek Tangkas Gempinis Tabanan',
        'Pura Watugunung Bima',
        'Pura Agung Jagatkarana Surabaya',
        'Pura Aditya Jaya Jakarta Timur',
        'Pura Pemaksan Banyuning Timur Buleleng',
        'Pura Agung Santi Bhuana Brugelette Belgia',
        'Pura Giri Jaya Natha Balikpapan',
    ],

    // === SPECIAL: Some Ribek ===
    'Soma Umanis Sinta': [
        'Pura Jati Jembrana',
        'Pura Kawitan Batugaing Bangli',
        'Pura Tirta Wening Surabaya',
    ],
};

/**
 * Normalize saptawara name from full format to short
 * e.g., "Redite (Minggu)" -> "Redite"
 */
function getSaptawaraShort(saptawaraName: string): string {
    return saptawaraName.split(' (')[0];
}

/**
 * Normalize pancawara name
 * In the data "Kliwon" is used, matching our pancawaraData
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
 * Returns list of pura names or empty array
 */
export function getPiodalan(baliDate: BaliDate): string[] {
    const key = getPiodalanKey(baliDate);
    return piodalanPawukon[key] || [];
}

/**
 * Get the wewaran label for piodalan display
 */
export function getPiodalanWewaran(baliDate: BaliDate): string {
    return getPiodalanKey(baliDate);
}
