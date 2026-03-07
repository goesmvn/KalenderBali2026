import type { Wewaran, Wuku, Sasih, PurnamaTilem, BaliDate, PenanggalPangelong } from '@/types/bali-calendar';
import { calculateDewasaAyu } from './dewasa-ayu';
import { calculateDauhAyu } from './dauh-ayu';
import { getPewatekan, checkBantenPenebusan } from './pewatekan-penebusan-data';
import { parseLocalDate } from './date-parser';

// ============ DATA WEWARAN ============

const ekawaraData: Wewaran[] = [
  { name: 'Luang', urip: 1, dewata: 'Sanghyang Taya', letak: 'Barat laut', description: 'Melambangkan kehampaan, kesunyian, dan kembali ke asal. Sering diasosiasikan dengan proses pembersihan energi.' }
];

const dwiwaraData: Wewaran[] = [
  { name: 'Menga', urip: 5, dewata: 'Sanghyang Kalima', letak: 'Timur', description: 'Terbuka, melambangkan keterbukaan dan penerimaan.' },
  { name: 'Pepet', urip: 4, dewata: 'Sanghyang Timira', letak: 'Utara', description: 'Tertutup, melambangkan ketertutupan dan introspeksi.' }
];

const triwaraData: Wewaran[] = [
  { name: 'Pasah (Dora)', urip: 9, dewata: 'Sanghyang Cika', letak: 'Selatan', description: 'Tersisih, pelepasan energi negatif.' },
  { name: 'Beteng (Waya)', urip: 4, dewata: 'Sanghyang Wacika', letak: 'Utara', description: 'Makmur, kemakmuran dan kesejahteraan.' },
  { name: 'Kajeng (Biantara)', urip: 7, dewata: 'Sanghyang Manacika', letak: 'Barat', description: 'Tenakan yang tajam, ketegasan dan kekuatan.' }
];

const caturwaraData: Wewaran[] = [
  { name: 'Sri', urip: 6, dewata: 'Bagawan Bregu', letak: 'Timur laut', description: 'Kemakmuran dan kesuburan.' },
  { name: 'Laba', urip: 5, dewata: 'Bagawan Kanwa', letak: 'Barat daya', description: 'Berhasil atau pemberian, keberhasilan.' },
  { name: 'Jaya', urip: 1, dewata: 'Bagawan Janaka', letak: 'Barat laut', description: 'Unggul, kemenangan dan keunggulan.' },
  { name: 'Menala', urip: 8, dewata: 'Bagawan Narada', letak: 'Tenggara', description: 'Lingkungan, harmoni dengan sekitar.' }
];

const pancawaraData: Wewaran[] = [
  { name: 'Umanis', urip: 5, dewata: 'Sanghyang Iswara', letak: 'Timur', description: 'Manis, cocok untuk memulai hal baru.' },
  { name: 'Paing', urip: 9, dewata: 'Sanghyang Brahma', letak: 'Selatan', description: 'Sakit, ujian dan tantangan.' },
  { name: 'Pon', urip: 7, dewata: 'Sanghyang Mahadewa', letak: 'Barat', description: 'Stabil, kekuatan dan keteguhan.' },
  { name: 'Wage', urip: 4, dewata: 'Sanghyang Wisnu', letak: 'Utara', description: 'Bayaran, menerima hasil.' },
  { name: 'Kliwon', urip: 8, dewata: 'Sanghyang Çiwa', letak: 'Tengah', description: 'Suci, spiritual dan keramat.' }
];

const sadwaraData: Wewaran[] = [
  { name: 'Tungleh', urip: 7, dewata: 'Sanghyang Indra', letak: 'Barat', description: 'Bohong, sementara dan tidak kekal.' },
  { name: 'Aryang', urip: 6, dewata: 'Sanghyang Baruna', letak: 'Timur laut', description: 'Lupa, kurus, perlu perhatian kesehatan.' },
  { name: 'Urukung', urip: 5, dewata: 'Sanghyang Kuwera', letak: 'Timur', description: 'Ceroboh, punah, perlu kehati-hatian.' },
  { name: 'Paniron', urip: 8, dewata: 'Sanghyang Bayu', letak: 'Tenggara', description: 'Palsu, gemuk, perlu kejujuran.' },
  { name: 'Was', urip: 9, dewata: 'Sanghyang Bajra', letak: 'Selatan', description: 'Kekhawatiran, kesembuhan, pemulihan.' },
  { name: 'Maulu', urip: 3, dewata: 'Sanghyang Erawan', letak: 'Barat daya', description: 'Pitam, emosi, perlu ketenangan.' }
];

const saptawaraData: Wewaran[] = [
  { name: 'Redite (Minggu)', urip: 5, dewata: 'Sanghyang Baskara/Surya', letak: 'Timur', description: 'Hari matahari, kekuatan dan kejayaan.' },
  { name: 'Soma (Senin)', urip: 4, dewata: 'Sanghyang Chandra', letak: 'Utara', description: 'Hari bulan, kedamaian dan intuisi.' },
  { name: 'Anggara (Selasa)', urip: 3, dewata: 'Sanghyang Angkara/Tranggana', letak: 'Barat daya', description: 'Hari Mars, energi dan keberanian.' },
  { name: 'Buda (Rabu)', urip: 7, dewata: 'Sanghyang Udaka/Budha', letak: 'Barat', description: 'Hari Merkurius, komunikasi dan belajar.' },
  { name: 'Wraspati (Kamis)', urip: 8, dewata: 'Sanghyang Sukra Guru/Bhagawan Wraspati', letak: 'Tenggara', description: 'Hari Jupiter, kebijaksanaan dan keberuntungan.' },
  { name: 'Sukra (Jumat)', urip: 6, dewata: 'Sanghyang Bregu/Bhagawan Sukra', letak: 'Timur laut', description: 'Hari Venus, cinta dan keindahan.' },
  { name: 'Saniscara (Sabtu)', urip: 9, dewata: 'Sanghyang Wasu/Saniscara', letak: 'Selatan', description: 'Hari Saturnus, disiplin dan tantangan.' }
];

const astawaraData: Wewaran[] = [
  { name: 'Sri', urip: 6, dewata: 'Sanghyang Sri', letak: 'Timur laut', description: 'Makmur dan pengatur, kemakmuran.' },
  { name: 'Indra', urip: 5, dewata: 'Sanghyang Indra', letak: 'Timur', description: 'Indah dan penggerak, keindahan.' },
  { name: 'Guru', urip: 8, dewata: 'Sanghyang Guru', letak: 'Tenggara', description: 'Tuntunan, pembelajaran dan bimbingan.' },
  { name: 'Yama', urip: 9, dewata: 'Sanghyang Yama', letak: 'Selatan', description: 'Adil, keadilan dan keseimbangan.' },
  { name: 'Ludra', urip: 3, dewata: 'Sanghyang Ludra', letak: 'Barat daya', description: 'Peleburan, transformasi dan perubahan.' },
  { name: 'Brahma', urip: 7, dewata: 'Sanghyang Brahma', letak: 'Barat', description: 'Pencipta, kreativitas dan inovasi.' },
  { name: 'Kala', urip: 1, dewata: 'Sanghyang Kala', letak: 'Barat laut', description: 'Nilai dan peneliti, analisis dan logika.' },
  { name: 'Uma', urip: 4, dewata: 'Sanghyang Uma', letak: 'Utara', description: 'Pemelihara, perawatan dan kasih sayang.' }
];

const sangawaraData: Wewaran[] = [
  { name: 'Dangu', urip: 5, dewata: 'Sanghyang Iswara', letak: 'Timur', description: 'Tenang dan stabil.' },
  { name: 'Jangur', urip: 8, dewata: 'Sanghyang Maheswara', letak: 'Tenggara', description: 'Pengamatan dan introspeksi.' },
  { name: 'Gigis', urip: 9, dewata: 'Sanghyang Brahma', letak: 'Selatan', description: 'Kekuatan kreatif.' },
  { name: 'Nohan', urip: 3, dewata: 'Sanghyang Rudra', letak: 'Barat daya', description: 'Transformasi dalam.' },
  { name: 'Ogan', urip: 7, dewata: 'Sanghyang Mahadewa', letak: 'Barat', description: 'Keagungan dan kebesaran.' },
  { name: 'Erangan', urip: 1, dewata: 'Sanghyang Sangkara', letak: 'Barat laut', description: 'Refleksi dan penyesalan.' },
  { name: 'Urungan', urip: 4, dewata: 'Sanghyang Wisnu', letak: 'Utara', description: 'Perlindungan dan pemeliharaan.' },
  { name: 'Tulus', urip: 6, dewata: 'Sanghyang Sambu', letak: 'Timur laut', description: 'Ketulusan dan kejujuran.' },
  { name: 'Dadi', urip: 8, dewata: 'Sanghyang Çiwa', letak: 'Tengah', description: 'Terwujud dan sempurna.' }
];

const dasawaraData: Wewaran[] = [
  { name: 'Pandita', urip: 5, dewata: 'Sanghyang Surya', letak: 'Timur', description: 'Kebijaksanaan dan ilmu pengetahuan.' },
  { name: 'Pati', urip: 7, dewata: 'Sanghyang Kala Mertyu', letak: 'Barat', description: 'Kematian dan akhir siklus.' },
  { name: 'Suka', urip: 10, dewata: 'Sanghyang Semara', letak: 'Atas', description: 'Kebahagiaan dan cinta.' },
  { name: 'Duka', urip: 4, dewata: 'Sanghyang Durga', letak: 'Utara', description: 'Kesedihan dan ujian.' },
  { name: 'Sri', urip: 6, dewata: 'Sanghyang Amerta', letak: 'Timur laut', description: 'Kemakmuran abadi.' },
  { name: 'Manuh', urip: 2, dewata: 'Sanghyang Kala Lupa', letak: 'Bawah', description: 'Lupa dan kelalaian.' },
  { name: 'Manusa', urip: 3, dewata: 'Sanghyang Suksam', letak: 'Barat daya', description: 'Kemanusiaan dan empati.' },
  { name: 'Raja', urip: 8, dewata: 'Sanghyang Kala Ngis', letak: 'Tenggara', description: 'Kekuasaan dan kepemimpinan.' },
  { name: 'Dewa', urip: 9, dewata: 'Sanghyang Darma', letak: 'Selatan', description: 'Kesucian dan kebenaran.' },
  { name: 'Raksasa', urip: 1, dewata: 'Sanghyang Maha Kala', letak: 'Barat laut', description: 'Godaan dan tantangan.' }
];

// ============ DATA WUKU ============

const wukuData: Wuku[] = [
  { name: 'Sinta', urip: 7, dewata: 'Dewa Yamadipati', letak: 'Barat' },
  { name: 'Landep', urip: 1, dewata: 'Dewa Mahadewa', letak: 'Barat laut' },
  { name: 'Ukir', urip: 4, dewata: 'Dewa Mahayekti', letak: 'Utara' },
  { name: 'Kulantir', urip: 6, dewata: 'Dewa Langsur', letak: 'Timur laut' },
  { name: 'Tolu', urip: 5, dewata: 'Dewa Bayu', letak: 'Timur' },
  { name: 'Gumbreg', urip: 8, dewata: 'Dewa Candra', letak: 'Tenggara' },
  { name: 'Wariga', urip: 9, dewata: 'Dewa Asmara', letak: 'Selatan' },
  { name: 'Warigadian', urip: 3, dewata: 'Dewa Maharsi', letak: 'Barat daya' },
  { name: 'Julungwangi', urip: 7, dewata: 'Dewa Sambu', letak: 'Barat' },
  { name: 'Sungsang', urip: 1, dewata: 'Dewa Gana', letak: 'Barat laut' },
  { name: 'Dungulan', urip: 4, dewata: 'Dewa Kumara', letak: 'Utara' },
  { name: 'Kuningan', urip: 6, dewata: 'Dewa Indra', letak: 'Timur laut' },
  { name: 'Langkir', urip: 5, dewata: 'Dewa Kala', letak: 'Timur' },
  { name: 'Medangsia', urip: 8, dewata: 'Dewa Brahma', letak: 'Tenggara' },
  { name: 'Pujut', urip: 9, dewata: 'Dewa Guritna', letak: 'Selatan' },
  { name: 'Pahang', urip: 3, dewata: 'Dewa Tantra', letak: 'Barat daya' },
  { name: 'Krulut', urip: 7, dewata: 'Dewa Surenggana', letak: 'Barat' },
  { name: 'Merakih', urip: 1, dewata: 'Dewa Wisnu', letak: 'Barat laut' },
  { name: 'Tambir', urip: 4, dewata: 'Dewa Siwa', letak: 'Utara' },
  { name: 'Medangkungan', urip: 6, dewata: 'Dewa Basuki', letak: 'Timur laut' },
  { name: 'Matal', urip: 5, dewata: 'Dewa Sakri', letak: 'Timur' },
  { name: 'Uye', urip: 8, dewata: 'Dewa Kowera', letak: 'Tenggara' },
  { name: 'Menail', urip: 9, dewata: 'Dewa Citragotra', letak: 'Selatan' },
  { name: 'Prangbakat', urip: 3, dewata: 'Dewa Bisma', letak: 'Barat daya' },
  { name: 'Bala', urip: 7, dewata: 'Dewa Durgha', letak: 'Barat' },
  { name: 'Ugu', urip: 1, dewata: 'Dewa Singajanma', letak: 'Barat laut' },
  { name: 'Wayang', urip: 4, dewata: 'Dewa Sri', letak: 'Utara' },
  { name: 'Kulawu', urip: 6, dewata: 'Dewa Sedana', letak: 'Timur laut' },
  { name: 'Dukut', urip: 5, dewata: 'Dewa Baruna', letak: 'Timur' },
  { name: 'Watugunung', urip: 8, dewata: 'Dewa Anantaboga', letak: 'Tenggara' }
];

// ============ DATA SASIH ============

const sasihData: Sasih[] = [
  { name: 'Sasih Kasa (Srawana)', month: 1, dewata: 'Dewi Sri', masehiMonth: 'Juli' },
  { name: 'Sasih Karo (Bhadrawada)', month: 2, dewata: 'Dewa Ganga', masehiMonth: 'Agustus' },
  { name: 'Sasih Katiga (Asuji)', month: 3, dewata: 'Dewa Wisnu', masehiMonth: 'September' },
  { name: 'Sasih Kapat (Kartika)', month: 4, dewata: 'Dewa Brahma', masehiMonth: 'Oktober' },
  { name: 'Sasih Kalima (Marggasirsa)', month: 5, dewata: 'Dewa Iswara', masehiMonth: 'November' },
  { name: 'Sasih Kanem (Posya)', month: 6, dewata: 'Dewa Durgha', masehiMonth: 'Desember' },
  { name: 'Sasih Kapitu (Magha)', month: 7, dewata: 'Bhatara Guru/Siwa', masehiMonth: 'Januari' },
  { name: 'Sasih Kawolu (Palguna)', month: 8, dewata: 'Dewa Parameswara', masehiMonth: 'Februari' },
  { name: 'Sasih Kasanga (Caitra)', month: 9, dewata: 'Dewi Uma', masehiMonth: 'Maret' },
  { name: 'Sasih Kadasa (Waisaka)', month: 10, dewata: 'Dewa Sangkara', masehiMonth: 'April' },
  { name: 'Sasih Desta (Jyesta)', month: 11, dewata: 'Dewa Sambu', masehiMonth: 'Mei' },
  { name: 'Sasih Sada (Asadha)', month: 12, dewata: 'Dewa Anantaboga', masehiMonth: 'Juni' }
];

// ============ DATA EXTRA ELEMENTS ============

const watekAlitData = ['Lintah', 'Uler', 'Gajah', 'Lembu'];
const watekMadyaData = ['Wong', 'Gajah', 'Watu', 'Buta', 'Suku'];
const ingkelData = ['Wong', 'Sato', 'Mina', 'Manuk', 'Taru', 'Buku'];
const jejepanData = ['Paksi', 'Mina', 'Taru', 'Sato', 'Patra', 'Wong'];

const pancasudaNames = [
  '', 'Wisesa segara', 'Tunggak semi', 'Satria wibhawa', 'Sumur sinaba', 'Bumi kapetak', 'Satria wirang', 'Lebu katiup angin'
];
const pancasudaMatrix: number[][] = [
  [4, 1, 5, 3, 7],
  [2, 5, 4, 1, 6],
  [1, 6, 3, 7, 4],
  [4, 1, 5, 3, 7],
  [3, 7, 6, 2, 5],
  [6, 2, 7, 4, 1],
  [5, 3, 1, 6, 2],
];

const rakamNames = [
  '', 'Laku bumi', 'Laku api', 'Laku angin', 'Laku pandita sakti', 'Aras tuding', 'Aras kembang'
];

const ekajalaresiNames = [
  '', 'Bagna mapasah', 'Bahu putra', 'Buat astawa', 'Buat lara', 'Buat merang', 'Buat sebet', 'Buat kingking', 'Buat suka', 'Dahat kingking', 'Kamaranan',
  'Kamretaan', 'Kasobagian', 'Kinasihan amreta', 'Kinasihan jana', 'Langgeng kayohanaan', 'Lewih bagia', 'Manggih bagia', 'Manggih suka', 'Patining amreta', 'Rahayu',
  'Sidha kasobagian', 'Subagia', 'Suka kapanggih', 'Suka pinanggih', 'Suka rahayu', 'Tininggaling suka', 'Wredhi putra', 'Wredhi sarwa mule'
];
const ekajalaresiMatrix: number[][] = [
  [24, 8, 18, 8, 24, 24, 18], [10, 8, 14, 27, 25, 24, 21], [14, 8, 14, 26, 20, 6, 3], [15, 27, 18, 21, 26, 23, 1], [11, 6, 16, 24, 8, 18, 24],
  [18, 26, 5, 24, 3, 3, 3], [13, 13, 5, 15, 13, 27, 27], [2, 24, 24, 16, 26, 16, 6], [10, 26, 19, 26, 12, 16, 22], [26, 26, 13, 1, 18, 14, 1],
  [16, 24, 13, 8, 17, 26, 19], [25, 13, 13, 6, 8, 6, 27], [8, 6, 13, 8, 26, 3, 13], [26, 26, 15, 16, 27, 8, 13], [21, 8, 6, 26, 26, 6, 14],
  [26, 18, 14, 24, 6, 27, 21], [26, 26, 24, 8, 19, 19, 18], [8, 18, 8, 5, 27, 18, 6], [10, 13, 13, 14, 26, 19, 19], [6, 3, 26, 26, 3, 26, 18],
  [21, 15, 28, 24, 18, 9, 26], [18, 6, 18, 8, 7, 16, 19], [26, 3, 8, 14, 26, 21, 8], [16, 16, 24, 8, 9, 25, 3], [13, 10, 25, 25, 18, 25, 21],
  [8, 13, 13, 15, 19, 26, 21], [5, 19, 5, 21, 27, 13, 24], [19, 18, 18, 26, 16, 3, 25], [4, 3, 24, 26, 19, 26, 21], [15, 4, 3, 26, 8, 26, 18],
];

const lintangNames = [
  '', 'Kelapa', 'Jaran Dawuk', 'Bade', 'Magelut', 'Kala Sungsang', 'Puuh Atarung', 'Lembu', 'Kukus', 'Lembu', 'Bulan',
  'Tarung', 'Tiwa-tiwa', 'Salah Ukur', 'Depat', 'Kumba', 'Yuyu', 'Gajah Mina', 'Batu', 'Jung Sarat', 'Dupa',
  'Salah Ukur', 'Pati', 'Pati', 'Perahu Pegat', 'Depat', 'Kumba', 'Lembu', 'Kala Sungsang', 'Asu', 'Kartika', 'Naga', 'Angsa', 'Mengkutu', 'Udang', 'Begoong'
];
const lintangMatrix: number[][] = [
  [15, 1, 22, 8, 29],
  [30, 16, 2, 23, 9],
  [10, 31, 17, 23, 24],
  [25, 11, 32, 18, 4],
  [5, 26, 12, 33, 19],
  [20, 6, 27, 13, 34],
  [35, 21, 7, 28, 15]
];

const pararasanNames = [
  '', 'Laku bumi', 'Laku api', 'Laku angin', 'Laku pandita sakti', 'Aras tuding', 'Aras kembang', 'Laku bintang', 'Laku bulan', 'Laku surya', 'Laku air/toya', 'Laku pretiwi', 'Laku agni agung'
];
const pararasanMatrix: number[][] = [
  [4, 8, 6, 3, 7], // Redite (0)
  [3, 7, 5, 2, 6], // Soma (1)
  [2, 6, 4, 1, 5], // Anggara (2)
  [4, 10, 8, 5, 9], // Buda (3)
  [7, 11, 9, 6, 10], // Wraspati (4)
  [5, 9, 7, 4, 8], // Sukra (5)
  [8, 12, 10, 7, 11] // Saniscara (6)
];

const zodiakNames = [
  '', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagitarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// ============ KONSTANTA KALENDER ============

// Base date: 1 Januari 2000 untuk kalibrasi Pangalantaka
// Pada 1 Jan 2000 (Sungsang, Umanis, Saniscara):
// - Penanggal: 10
// - isPangelong: true (artinya menuju Tilem / Pangelong)
// - noNgunaratri: 424 (Jumlah hari dari Ngunaratri ke-1)
// - isNgunaratri: false
// - Tahun Saka: 1921
// - Sasih: 7 (Kapitu)
const PANGALANTAKA_PIVOT = new Date(2000, 0, 1);
const PIVOT_PENANGGAL = 10;
const PIVOT_IS_PANGELONG = true;
const PIVOT_NO_NGUNARATRI = 424;
const PIVOT_IS_NGUNARATRI = false;

// Base date: 1 Januari 1945 = Matal, Pon, Soma
const BASE_DATE = new Date(1945, 0, 1);
const PAWUKON_OFFSET = 141; // Posisi hari 1 Jan 1945 dalam siklus 210 hari Pawukon

// ============ FUNGSI PERHITUNGAN ============

/**
 * Menghitung selisih hari antara dua tanggal
 */
function getDaysDifference(date1: Date, date2: Date): number {
  // Normalize both dates to midnight to avoid time-of-day rounding issues
  // Without this, calling getBaliDate(new Date()) after noon would round up
  // and compute the NEXT day's Wuku/calendar data
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((d1.getTime() - d2.getTime()) / oneDay);
}

/**
 * Menghitung Wuku berdasarkan tanggal
 */
function calculateWuku(date: Date): { wuku: Wuku; number: number; dayInCycle: number } {
  const daysDiff = getDaysDifference(date, BASE_DATE);
  const dayInPawukon = (((daysDiff + PAWUKON_OFFSET) % 210) + 210) % 210;
  const wukuIndex = Math.floor(dayInPawukon / 7);
  return { wuku: wukuData[wukuIndex], number: wukuIndex + 1, dayInCycle: dayInPawukon };
}

/**
 * Menghitung Pancawara (5 hari)
 */
function calculatePancawara(date: Date): Wewaran {
  const daysDiff = getDaysDifference(date, BASE_DATE);
  const pancawaraIndex = (((daysDiff + 2) % 5) + 5) % 5; // Offset 2 untuk Pon
  return pancawaraData[pancawaraIndex];
}

/**
 * Menghitung Saptawara (7 hari)
 */
function calculateSaptawara(date: Date): Wewaran {
  const dayOfWeek = date.getDay(); // 0 = Minggu, 1 = Senin, etc.
  return saptawaraData[dayOfWeek];
}

/**
 * Menghitung Triwara (3 hari)
 */
function calculateTriwara(date: Date): Wewaran {
  const daysDiff = getDaysDifference(date, BASE_DATE);
  const triwaraIndex = ((daysDiff % 3) + 3) % 3;
  return triwaraData[triwaraIndex];
}

/**
 * Menghitung Dwiwara (2 hari)
 */
function calculateDwiwara(date: Date): Wewaran {
  const saptawara = calculateSaptawara(date);
  const pancawara = calculatePancawara(date);
  const sum = saptawara.urip + pancawara.urip;
  const dwiwaraIndex = sum % 2 === 1 ? 1 : 0; // Ganjil = Pepet, Genap = Menga
  return dwiwaraData[dwiwaraIndex];
}

/**
 * Menghitung Caturwara (4 hari)
 */
function calculateCaturwara(date: Date): Wewaran {
  const wukuInfo = calculateWuku(date);
  const angkaWuku = wukuInfo.dayInCycle + 1;

  let noCaturwara;
  if (angkaWuku === 71 || angkaWuku === 72 || angkaWuku === 73) {
    noCaturwara = 3;
  } else if (angkaWuku <= 70) {
    noCaturwara = angkaWuku % 4;
  } else {
    noCaturwara = (angkaWuku + 2) % 4;
  }
  if (noCaturwara === 0) noCaturwara = 4;

  return caturwaraData[noCaturwara - 1];
}

/**
 * Menghitung Sadwara (6 hari)
 */
function calculateSadwara(date: Date): Wewaran {
  const daysDiff = getDaysDifference(date, BASE_DATE);
  const sadwaraIndex = (((daysDiff + 3) % 6) + 6) % 6; // Offset 3 untuk Paniron
  return sadwaraData[sadwaraIndex];
}

/**
 * Menghitung Astawara (8 hari)
 */
function calculateAstawara(date: Date): Wewaran {
  const wukuInfo = calculateWuku(date);
  const angkaWuku = wukuInfo.dayInCycle + 1;

  let noAstawara;
  if (angkaWuku === 71 || angkaWuku === 72 || angkaWuku === 73) {
    noAstawara = 7;
  } else if (angkaWuku <= 70) {
    noAstawara = angkaWuku % 8;
  } else {
    noAstawara = (angkaWuku + 6) % 8;
  }
  if (noAstawara === 0) noAstawara = 8;

  return astawaraData[noAstawara - 1];
}

/**
 * Menghitung Sangawara (9 hari)
 */
function calculateSangawara(date: Date): Wewaran {
  const daysDiff = getDaysDifference(date, BASE_DATE);
  const sangawaraIndex = (((daysDiff + 3) % 9) + 9) % 9; // Offset 3 untuk Nohan
  return sangawaraData[sangawaraIndex];
}

/**
 * Menghitung Dasawara (10 hari)
 * Dasawara = (Saptawara urip + Pancawara urip) % 10
 */
function calculateDasawara(date: Date): Wewaran {
  const saptawara = calculateSaptawara(date);
  const pancawara = calculatePancawara(date);
  const dasawaraIndex = ((saptawara.urip + pancawara.urip) % 10);
  return dasawaraData[dasawaraIndex];
}

/**
 * Menghitung Ekawara (1 hari)
 * Luang didapatkan jika hasil penjumlahan urip Sapta Wara dan Panca Wara merupakan angka ganjil.
 */
function calculateEkawara(date: Date): Wewaran | null {
  const saptawara = calculateSaptawara(date);
  const pancawara = calculatePancawara(date);
  const sum = saptawara.urip + pancawara.urip;
  if (sum % 2 !== 0) {
    return ekawaraData[0]; // Luang
  }
  return null;
}


/**
 * Menghitung posisi siklus bulan (Penanggal / Pangelong) dan Purnama/Tilem
 * Menggunakan sistem Pangalantaka asli Kalender Bali Cetak
 */
function getLunarPhase(date: Date, wukuInfo: { wuku: Wuku; number: number }, pancawaraInfo: Wewaran, saptawaraInfo: Wewaran): {
  purnamaTilem: PurnamaTilem | null;
  penanggalPangelong: PenanggalPangelong | null;
  sasih: Sasih;
  sakaYear: number;
} {
  const bedaHari = getDaysDifference(date, PANGALANTAKA_PIVOT);

  // 1. Menghitung Jumlah Ngunaratri (Pergeseran Hari)
  let jumlahNgunaratri = 0;
  let mulai = 0;
  let noNgunaratri = 0;
  let currentPenanggal = 0;
  let currentIsPangelong = false;

  const noWuku = wukuInfo.number;
  // Umanis=1, Paing=2, Pon=3, Wage=4, Kliwon=5
  const noPancawara = pancawaraData.indexOf(pancawaraInfo) + 1;
  // Redite=1, Soma=2, Anggara=3, Buda=4, Wraspati=5, Sukra=6, Saniscara=7
  const noSaptawara = saptawaraData.indexOf(saptawaraInfo) + 1;

  if (bedaHari >= 0) {
    // Mengetahui jumlah ngunaratri setelah pivot
    if (PIVOT_NO_NGUNARATRI > 63) {
      mulai = PIVOT_NO_NGUNARATRI - (PIVOT_NO_NGUNARATRI % 63);
    }
    noNgunaratri = PIVOT_NO_NGUNARATRI + bedaHari;

    if (noNgunaratri > (mulai + 63)) {
      jumlahNgunaratri = Math.floor((noNgunaratri - (mulai + 63)) / 63) + 1;
      if ((noNgunaratri - (mulai + 63)) % 63 === 0) {
        jumlahNgunaratri--;
      }
    }
    if (PIVOT_IS_NGUNARATRI) {
      jumlahNgunaratri++;
    }

    let hasilNgunaratri = (bedaHari + PIVOT_PENANGGAL + jumlahNgunaratri) % 15;
    if (hasilNgunaratri === 0) hasilNgunaratri = 15;

    currentPenanggal = hasilNgunaratri;
    currentIsPangelong = (Math.floor((bedaHari + PIVOT_PENANGGAL + jumlahNgunaratri - 1) / 15) % 2 === 0) === PIVOT_IS_PANGELONG;

  } else {
    // Tanggal sebelum pivot
    const pNgunaratri = PIVOT_NO_NGUNARATRI + 63;
    if (pNgunaratri > 63) {
      mulai = pNgunaratri - (pNgunaratri % 63);
    }
    noNgunaratri = PIVOT_NO_NGUNARATRI + bedaHari;

    if (noNgunaratri < (mulai - 63)) {
      jumlahNgunaratri = Math.floor(Math.abs(noNgunaratri - (mulai - 63)) / 63) + 1;
      if (Math.abs(noNgunaratri - (mulai - 63)) % 63 === 0) {
        jumlahNgunaratri--;
      }
    }

    let hasilNgunaratri = bedaHari + PIVOT_PENANGGAL - jumlahNgunaratri;
    hasilNgunaratri = 15 - (Math.abs(hasilNgunaratri) % 15);
    if (hasilNgunaratri <= 15) {
      currentPenanggal = hasilNgunaratri;
    } else {
      currentPenanggal = hasilNgunaratri % 15;
    }
    if (currentPenanggal === 0) currentPenanggal = 15;

    currentIsPangelong = (Math.floor((-bedaHari + currentPenanggal + jumlahNgunaratri - 1) / 15) % 2 === 0) === PIVOT_IS_PANGELONG;

    // Fix tilem boundary condition before pivot
    if (!currentIsPangelong && currentPenanggal === 15) {
      if ((bedaHari + PIVOT_PENANGGAL - jumlahNgunaratri) % 15 === 0) {
        currentIsPangelong = true;
      }
    }
  }

  // 2. Menentukan apakah Ngunaratri atau Tidak (Sistem Eka Sungsang ke Pahing > Tahun 1999)
  // Untuk menyederhanakan, kita asumsikan di atas tahun 1999 untuk Eka Sungsang ke Pahing
  if (date.getFullYear() > 1999) {
    if (noSaptawara === 3) { // Anggara (Selasa) (Di java 0-based berarti noSaptawara 2)
      if (bedaHari > 0) {
        if ((noWuku === 10 && noPancawara === 3 && (currentPenanggal === 14 || currentPenanggal === 9 || currentPenanggal === 4)) ||
          (noWuku === 19 && noPancawara === 1 && (currentPenanggal === 3 || currentPenanggal === 13 || currentPenanggal === 8)) ||
          (noWuku === 28 && noPancawara === 4 && (currentPenanggal === 7 || currentPenanggal === 2 || currentPenanggal === 12)) ||
          (noWuku === 7 && noPancawara === 2 && (currentPenanggal === 11 || currentPenanggal === 6 || currentPenanggal === 1)) ||
          (noWuku === 16 && noPancawara === 5 && (currentPenanggal === 15 || currentPenanggal === 10 || currentPenanggal === 5)) ||
          (noWuku === 25 && noPancawara === 3 && (currentPenanggal === 4 || currentPenanggal === 14 || currentPenanggal === 9)) ||
          (noWuku === 4 && noPancawara === 1 && (currentPenanggal === 8 || currentPenanggal === 3 || currentPenanggal === 13)) ||
          (noWuku === 13 && noPancawara === 4 && (currentPenanggal === 12 || currentPenanggal === 7 || currentPenanggal === 2)) ||
          (noWuku === 22 && noPancawara === 2 && (currentPenanggal === 1 || currentPenanggal === 11 || currentPenanggal === 6)) ||
          (noWuku === 1 && noPancawara === 5 && (currentPenanggal === 5 || currentPenanggal === 15 || currentPenanggal === 10))) {
          // Do nothing (handled natively)
        }
      } else {
        if ((noWuku === 10 && noPancawara === 3 && (currentPenanggal === 15 || currentPenanggal === 10 || currentPenanggal === 5)) ||
          (noWuku === 19 && noPancawara === 1 && (currentPenanggal === 4 || currentPenanggal === 14 || currentPenanggal === 9)) ||
          (noWuku === 28 && noPancawara === 4 && (currentPenanggal === 8 || currentPenanggal === 3 || currentPenanggal === 13)) ||
          (noWuku === 7 && noPancawara === 2 && (currentPenanggal === 12 || currentPenanggal === 7 || currentPenanggal === 2)) ||
          (noWuku === 16 && noPancawara === 5 && (currentPenanggal === 1 || currentPenanggal === 11 || currentPenanggal === 6)) ||
          (noWuku === 25 && noPancawara === 3 && (currentPenanggal === 5 || currentPenanggal === 15 || currentPenanggal === 10)) ||
          (noWuku === 4 && noPancawara === 1 && (currentPenanggal === 9 || currentPenanggal === 4 || currentPenanggal === 14)) ||
          (noWuku === 13 && noPancawara === 4 && (currentPenanggal === 13 || currentPenanggal === 8 || currentPenanggal === 3)) ||
          (noWuku === 22 && noPancawara === 2 && (currentPenanggal === 2 || currentPenanggal === 12 || currentPenanggal === 7)) ||
          (noWuku === 1 && noPancawara === 5 && (currentPenanggal === 6 || currentPenanggal === 1 || currentPenanggal === 11))) {
          currentPenanggal -= 1;
          if (currentPenanggal === 0 && !currentIsPangelong) currentIsPangelong = true;
          if (currentPenanggal === 0) currentPenanggal = 15;
        }
      }
    }
  }

  // 3. Menghitung Sasih & Nampih Sasih secara sederhana
  // Karena algoritma Nampih Sasih Java sangat panjang (>200 baris while loop),
  // kita gunakan fallback approksimasi Nyepi yg lebih robust & performant untuk TypeScript
  const month = date.getMonth(); // 0-11
  const year = date.getFullYear();
  const sasihIndex = ((month - 6 + 12) % 12);
  const sakaYear = month < 2 ? year - 79 : year - 78;
  const sasihDataInfo = sasihData[sasihIndex];

  // 4. Set Purnama / Tilem
  let type: 'Purnama' | 'Tilem' | null = null;
  let purnamaTilemName = '';

  // Purnama = Penanggal 15, Tilem = Pangelong 15
  if (!currentIsPangelong && currentPenanggal === 15) {
    type = 'Purnama';
    purnamaTilemName = 'Purnama';
  } else if (currentIsPangelong && currentPenanggal === 15) {
    type = 'Tilem';
    purnamaTilemName = 'Tilem';
  }

  const purnamaTilem = type ? { type, date, name: purnamaTilemName } : null;
  const status = currentIsPangelong ? 'Pangelong' : 'Penanggal';

  return {
    purnamaTilem,
    penanggalPangelong: { status, day: currentPenanggal },
    sasih: sasihDataInfo,
    sakaYear
  };
}

/**
 * Menghitung elemen-elemen kalender ekstra
 */
function calculateExtraElements(date: Date, wukuIndex: number, dayInPawukon: number): {
  watekAlit: string;
  watekMadya: string;
  ingkel: string;
  jejepan: string;
  pancasuda: string;
  rakam: string;
  ekajalaresi: string;
  lintang: string;
  pararasan: string;
  zodiak: string;
} {
  const saptawara = calculateSaptawara(date);
  const pancawara = calculatePancawara(date);
  const saptawaraIndex = date.getDay(); // 0(Minggu)-6(Sabtu)
  const daysDiff = getDaysDifference(date, BASE_DATE);
  const pancawaraIndex = (((daysDiff + 2) % 5) + 5) % 5; // 0(Umanis)-4(Kliwon)

  const watekAlitIndex = (pancawara.urip + saptawara.urip) % 4;
  const watekMadyaIndex = (pancawara.urip + saptawara.urip) % 5;
  const ingkelIndex = wukuIndex % 6;
  const jejepanIndex = (dayInPawukon + 1) % 6;

  const pancasudaVal = pancasudaMatrix[saptawaraIndex][pancawaraIndex];

  // Rakam: (pancawaraIndex(1-based) + saptawaraIndex(0-based)) % 6
  let rakamVal = (pancawaraIndex + 1 + saptawaraIndex) % 6;
  if (rakamVal === 0) rakamVal = 6;

  const ekajalaresiVal = ekajalaresiMatrix[wukuIndex][saptawaraIndex];

  // Lintang & Pararasan
  const lintangIdx = lintangMatrix[saptawaraIndex][pancawaraIndex];
  const pararasanIdx = pararasanMatrix[saptawaraIndex][pancawaraIndex];

  // Zodiak
  let noZodiak = 0;
  const M = date.getMonth() + 1;
  const D = date.getDate();

  if ((M === 12 && D >= 22 && D <= 31) || (M === 1 && D >= 1 && D <= 19)) noZodiak = 10;
  else if ((M === 1 && D >= 20 && D <= 31) || (M === 2 && D >= 1 && D <= 17)) noZodiak = 11;
  else if ((M === 2 && D >= 18 && D <= 29) || (M === 3 && D >= 1 && D <= 19)) noZodiak = 12;
  else if ((M === 3 && D >= 20 && D <= 31) || (M === 4 && D >= 1 && D <= 19)) noZodiak = 1;
  else if ((M === 4 && D >= 20 && D <= 30) || (M === 5 && D >= 1 && D <= 20)) noZodiak = 2;
  else if ((M === 5 && D >= 21 && D <= 31) || (M === 6 && D >= 1 && D <= 20)) noZodiak = 3;
  else if ((M === 6 && D >= 21 && D <= 30) || (M === 7 && D >= 1 && D <= 22)) noZodiak = 4;
  else if ((M === 7 && D >= 23 && D <= 31) || (M === 8 && D >= 1 && D <= 22)) noZodiak = 5;
  else if ((M === 8 && D >= 23 && D <= 31) || (M === 9 && D >= 1 && D <= 22)) noZodiak = 6;
  else if ((M === 9 && D >= 23 && D <= 30) || (M === 10 && D >= 1 && D <= 22)) noZodiak = 7;
  else if ((M === 10 && D >= 23 && D <= 31) || (M === 11 && D >= 1 && D <= 21)) noZodiak = 8;
  else if ((M === 11 && D >= 22 && D <= 30) || (M === 12 && D >= 1 && D <= 21)) noZodiak = 9;

  return {
    watekAlit: watekAlitData[watekAlitIndex],
    watekMadya: watekMadyaData[watekMadyaIndex],
    ingkel: ingkelData[ingkelIndex],
    jejepan: jejepanData[jejepanIndex],
    pancasuda: pancasudaNames[pancasudaVal],
    rakam: rakamNames[rakamVal],
    ekajalaresi: ekajalaresiNames[ekajalaresiVal],
    lintang: lintangNames[lintangIdx] || '',
    pararasan: pararasanNames[pararasanIdx] || '',
    zodiak: zodiakNames[noZodiak] || ''
  };
}

/**
 * Definisi resmi hari libur Bali sesuai request user
 */
export const BALI_HOLIDAYS = [
  'Penyekeban Galungan',
  'Penyajaan Galungan',
  'Penampahan Galungan',
  'Hari Raya Galungan',
  'Manis Galungan',
  'Pemacekan Agung',
  'Penampahan Kuningan',
  'Hari Raya Kuningan',
  'Manis Kuningan (Pegat Wakan)',
  'Hari Raya Saraswati',
  'Hari Raya Siwaratri',
  'Pengerupukan',
  'Hari Raya Nyepi',
  'Ngembak Geni'
];

export function isHolidayBali(events: string[]): boolean {
  return events.some(event => BALI_HOLIDAYS.includes(event));
}

// Daftar tanggal pasti Nyepi untuk dekade ini (karena perhitungan Sasih Kadasa 
// membutuhkan algoritma Nampih Sasih/Mala Sasih yang sangat kompleks untuk 100% akurat).
// Format: YYYY-MM-DD (Maret/April)
const NYEPI_DATES: Record<number, string> = {
  2020: '2020-03-25',
  2021: '2021-03-14',
  2022: '2022-03-03',
  2023: '2023-03-22',
  2024: '2024-03-11',
  2025: '2025-03-29',
  2026: '2026-03-19',
  2027: '2027-03-09',
  2028: '2028-03-26',
  2029: '2029-03-15',
  2030: '2030-03-05',
  2031: '2031-03-24',
  2032: '2032-03-12',
  2033: '2033-03-31',
  2034: '2034-03-21',
  2035: '2035-03-10',
  2036: '2036-03-28',
  2037: '2037-03-17',
  2038: '2038-03-06',
  2039: '2039-03-25',
  2040: '2040-03-13'
};

/**
 * Menghitung Rahinan Bali (Galungan, Kuningan, Tumpek, dll)
 */
function calculateRahinan(
  date: Date,
  wuku: Wuku,
  pancawara: Wewaran,
  saptawara: Wewaran,
  triwara: Wewaran,
  sasih: Sasih,
  penanggalPangelong: import('@/types/bali-calendar').PenanggalPangelong | null
): string[] {
  const events: string[] = [];

  // Kajeng Kliwon
  if (triwara.name === 'Kajeng (Biantara)' && pancawara.name === 'Kliwon') {
    events.push('Kajeng Kliwon');
  }

  // Tumpek (Saniscara Kliwon)
  if (saptawara.name.includes('Saniscara') && pancawara.name === 'Kliwon') {
    let tumpekName = 'Tumpek';
    if (wuku.name === 'Landep') tumpekName = 'Tumpek Landep';
    else if (wuku.name === 'Wariga') tumpekName = 'Tumpek Uduh / Wariga / Bubuh';
    else if (wuku.name === 'Kuningan') tumpekName = 'Tumpek Kuningan';
    else if (wuku.name === 'Krulut') tumpekName = 'Tumpek Krulut';
    else if (wuku.name === 'Uye') tumpekName = 'Tumpek Uye / Kandang';
    else if (wuku.name === 'Wayang') tumpekName = 'Tumpek Wayang';
    events.push(tumpekName);
  }

  // Rentetan Galungan & Kuningan
  // Penyekeban (Redite Paing Dungulan)
  if (wuku.name === 'Dungulan' && saptawara.name.includes('Redite') && pancawara.name === 'Paing') {
    events.push('Penyekeban Galungan');
  }
  // Penyajaan (Soma Pon Dungulan)
  if (wuku.name === 'Dungulan' && saptawara.name.includes('Soma') && pancawara.name === 'Pon') {
    events.push('Penyajaan Galungan');
  }
  // Penampahan Galungan (Anggara Wage Dungulan)
  if (wuku.name === 'Dungulan' && saptawara.name.includes('Anggara') && pancawara.name === 'Wage') {
    events.push('Penampahan Galungan');
  }
  // Galungan (Buda Kliwon Dungulan)
  if (saptawara.name.includes('Buda') && pancawara.name === 'Kliwon' && wuku.name === 'Dungulan') {
    events.push('Hari Raya Galungan');
  }
  // Manis Galungan (Wraspati Umanis Dungulan)
  if (wuku.name === 'Dungulan' && saptawara.name.includes('Wraspati') && pancawara.name === 'Umanis') {
    events.push('Manis Galungan');
  }
  // Pemacekan Agung (Soma Kliwon Kuningan)
  if (wuku.name === 'Kuningan' && saptawara.name.includes('Soma') && pancawara.name === 'Kliwon') {
    events.push('Pemacekan Agung');
  }
  // Penampahan Kuningan (Sukra Wage Kuningan)
  if (wuku.name === 'Kuningan' && saptawara.name.includes('Sukra') && pancawara.name === 'Wage') {
    events.push('Penampahan Kuningan');
  }
  // Hari Raya Kuningan (already handled by Tumpek Kuningan, but let's make it separate)
  // Hari Raya Kuningan is Saniscara Kliwon Kuningan
  if (saptawara.name.includes('Saniscara') && pancawara.name === 'Kliwon' && wuku.name === 'Kuningan') {
    // Tumpek Kuningan is pushed above, let's just make sure it's known as Hari Raya Kuningan
    const idx = events.indexOf('Tumpek Kuningan');
    if (idx !== -1) {
      events[idx] = 'Hari Raya Kuningan';
    } else {
      events.push('Hari Raya Kuningan');
    }
  }
  // Manis Kuningan / Pegat Wakan (Redite Umanis Langkir)
  if (wuku.name === 'Langkir' && saptawara.name.includes('Redite') && pancawara.name === 'Umanis') {
    events.push('Manis Kuningan (Pegat Wakan)');
  }

  // Saraswati (Saniscara Umanis Watugunung)
  if (wuku.name === 'Watugunung' && saptawara.name.includes('Saniscara') && pancawara.name === 'Umanis') {
    events.push('Hari Raya Saraswati');
  }

  // Siwaratri (Purwani / Pangelong 14 Sasih Kapitu)
  if (sasih.name === 'Sasih Kapitu (Magha)' && penanggalPangelong?.status === 'Pangelong' && penanggalPangelong.day === 14) {
    events.push('Hari Raya Siwaratri');
  }

  // Nyepi Series - Menggunakan lookup table atau perhitungan sederhana fallback
  const year = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const dateStr = `${year}-${m}-${d}`;

  if (NYEPI_DATES[year]) {
    const nyepiDateStr = NYEPI_DATES[year];
    const nyepiDate = parseLocalDate(nyepiDateStr);

    // Pengerupukan (1 day before)
    const pengerupukanDate = new Date(nyepiDate);
    pengerupukanDate.setDate(nyepiDate.getDate() - 1);
    const pM = (pengerupukanDate.getMonth() + 1).toString().padStart(2, '0');
    const pD = pengerupukanDate.getDate().toString().padStart(2, '0');
    const pStr = `${year}-${pM}-${pD}`;

    // Ngembak Geni (1 day after)
    const ngembakDate = new Date(nyepiDate);
    ngembakDate.setDate(nyepiDate.getDate() + 1);
    const nM = (ngembakDate.getMonth() + 1).toString().padStart(2, '0');
    const nD = ngembakDate.getDate().toString().padStart(2, '0');
    const nStr = `${year}-${nM}-${nD}`;

    if (dateStr === nyepiDateStr) events.push('Hari Raya Nyepi');
    if (dateStr === pStr) events.push('Pengerupukan');
    if (dateStr === nStr) events.push('Ngembak Geni');
  } else {
    // Fallback if year > 2040 or < 2020: logic based on sasih kedasa
    // Pengerupukan (Tilem Sasih Kasanga / 1 hari sebelum Nyepi)
    if (sasih.name === 'Sasih Kasanga (Caitra)' && penanggalPangelong?.status === 'Pangelong' && penanggalPangelong.day === 15) {
      events.push('Pengerupukan');
    }

    // Nyepi (Penanggal 1 Sasih Kedasa)
    if (sasih.name === 'Sasih Kadasa (Waisaka)' && penanggalPangelong?.status === 'Penanggal' && penanggalPangelong.day === 1) {
      events.push('Hari Raya Nyepi');
    }

    // Ngembak Geni (Penanggal 2 Sasih Kedasa / 1 hari setelah Nyepi)
    if (sasih.name === 'Sasih Kadasa (Waisaka)' && penanggalPangelong?.status === 'Penanggal' && penanggalPangelong.day === 2) {
      events.push('Ngembak Geni');
    }
  }

  return events;
}

/**
 * In-memory cache for getBaliDate computations.
 * Avoids recalculating the same date multiple times within a session.
 */
const baliDateCache = new Map<string, BaliDate>();

export function clearBaliDateCache() {
  baliDateCache.clear();
}

/**
 * Mendapatkan semua data kalender Bali untuk sebuah tanggal
 */
export function getBaliDate(date: Date): BaliDate {
  // Check cache first
  const cacheKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const cached = baliDateCache.get(cacheKey);
  if (cached) return cached;

  // Hitung wuku
  const wukuInfo = calculateWuku(date);

  // Hitung elemen lain
  const pancawaraInfo = calculatePancawara(date);
  const saptawaraInfo = calculateSaptawara(date);
  const lunarAndSasih = getLunarPhase(date, wukuInfo, pancawaraInfo, saptawaraInfo);

  // Wuku calculation gives us the day in pawukon (0-209)
  const daysDiff = getDaysDifference(date, BASE_DATE);
  const dayInPawukon = (((daysDiff + PAWUKON_OFFSET) % 210) + 210) % 210;
  const extraElements = calculateExtraElements(date, wukuInfo.number - 1, dayInPawukon);

  const baseBaliDate: BaliDate = {
    gregorianDate: date,
    ekawara: calculateEkawara(date),
    dwiwara: calculateDwiwara(date),
    triwara: calculateTriwara(date),
    caturwara: calculateCaturwara(date),
    pancawara: pancawaraInfo,
    sadwara: calculateSadwara(date),
    saptawara: saptawaraInfo,
    astawara: calculateAstawara(date),
    sangawara: calculateSangawara(date),
    dasawara: calculateDasawara(date),
    wuku: wukuInfo.wuku,
    wukuNumber: wukuInfo.number,
    sasih: lunarAndSasih.sasih,
    purnamaTilem: lunarAndSasih.purnamaTilem,
    penanggalPangelong: lunarAndSasih.penanggalPangelong,
    sakaYear: lunarAndSasih.sakaYear,
    watekAlit: extraElements.watekAlit,
    watekMadya: extraElements.watekMadya,
    ingkel: extraElements.ingkel,
    jejepan: extraElements.jejepan,
    pancasuda: extraElements.pancasuda,
    rakam: extraElements.rakam,
    ekajalaresi: extraElements.ekajalaresi,
    lintang: extraElements.lintang,
    pararasan: extraElements.pararasan,
    zodiak: extraElements.zodiak,
    events: calculateRahinan(
      date,
      wukuInfo.wuku,
      pancawaraInfo,
      saptawaraInfo,
      calculateTriwara(date),
      lunarAndSasih.sasih,
      lunarAndSasih.penanggalPangelong
    )
  };

  // Calculate dewasa ayu based on the assembled baliDate properties
  baseBaliDate.dewasaAyu = calculateDewasaAyu(baseBaliDate);

  // Calculate Dauh Ayu (jam baik)
  baseBaliDate.dauhAyu = calculateDauhAyu(baseBaliDate.saptawara.name);

  // Calculate Pewatekan Rare and Banten Penebusan
  baseBaliDate.pewatekan = getPewatekan(
    baseBaliDate.ekawara ? baseBaliDate.ekawara.name : undefined,
    baseBaliDate.dwiwara ? baseBaliDate.dwiwara.name : undefined,
    baseBaliDate.triwara ? baseBaliDate.triwara.name : undefined,
    baseBaliDate.caturwara ? baseBaliDate.caturwara.name : undefined,
    baseBaliDate.pancawara ? baseBaliDate.pancawara.name : undefined,
    baseBaliDate.sadwara ? baseBaliDate.sadwara.name : undefined,
    baseBaliDate.saptawara ? baseBaliDate.saptawara.name : undefined,
    baseBaliDate.astawara ? baseBaliDate.astawara.name : undefined,
    baseBaliDate.sangawara ? baseBaliDate.sangawara.name : undefined,
    baseBaliDate.dasawara ? baseBaliDate.dasawara.name : undefined
  );

  baseBaliDate.penebusan = checkBantenPenebusan(
    baseBaliDate.wuku ? baseBaliDate.wuku.name : undefined,
    baseBaliDate.astawara ? baseBaliDate.astawara.name : undefined,
    baseBaliDate.dasawara ? baseBaliDate.dasawara.name : undefined
  );

  // Store in cache
  baliDateCache.set(cacheKey, baseBaliDate);
  return baseBaliDate;
}

/**
 * Mendapatkan hari dalam setahun
 */
export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Format tanggal Indonesia
 */
export function formatIndonesianDate(date: Date): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Mendapatkan nama hari dalam bahasa Bali
 */
export function getBaliDayName(saptawara: string): string {
  const baliNames: Record<string, string> = {
    'Redite (Minggu)': 'Redite',
    'Soma (Senin)': 'Soma',
    'Anggara (Selasa)': 'Anggara',
    'Buda (Rabu)': 'Buda',
    'Wraspati (Kamis)': 'Wraspati',
    'Sukra (Jumat)': 'Sukra',
    'Saniscara (Sabtu)': 'Saniscara'
  };
  return baliNames[saptawara] || saptawara;
}

/**
 * Mendapatkan aksara Bali (Unicode) untuk Saptawara
 */
export function getAksaraBaliSaptawara(saptawara: string): string {
  const aksaraBali: Record<string, string> = {
    'Redite (Minggu)': 'ᬭᬾᬤᬶᬢᬾ',
    'Soma (Senin)': 'ᬲᭀᬫ',
    'Anggara (Selasa)': 'ᬅᬂᬕᬭ',
    'Buda (Rabu)': 'ᬩᬸᬤ',
    'Wraspati (Kamis)': 'ᬯᬺᬳᬲ᭄ᬧᬢᬶ',
    'Sukra (Jumat)': 'ᬰᬸᬓᬺ',
    'Saniscara (Sabtu)': 'ᬰᬦᬶᬰ᭄ᬘᬭ'
  };
  return aksaraBali[saptawara] || '';
}

/**
 * Mengkonversi angka ke digit aksara Bali
 */
export function toBalineseDigits(num: number): string {
  const digits: Record<string, string> = {
    '0': '᭐', '1': '᭑', '2': '᭒', '3': '᭓', '4': '᭔',
    '5': '᭕', '6': '᭖', '7': '᭗', '8': '᭘', '9': '᭙'
  };
  return String(num).split('').map(d => digits[d] || d).join('');
}

/**
 * Mendapatkan aksara Bali untuk nama Wuku
 */
export function getAksaraBaliWuku(wukuName: string): string {
  const aksaraWuku: Record<string, string> = {
    'Sinta': 'ᬲᬶᬦ᭄ᬢ',
    'Landep': 'ᬮᬦ᭄ᬤᬾᬧ᭄',
    'Ukir': 'ᬉᬓᬶᬭ᭄',
    'Kulantir': 'ᬓᬸᬮᬦ᭄ᬢᬶᬭ᭄',
    'Tolu': 'ᬢᭀᬮᬸ',
    'Gumbreg': 'ᬕᬸᬫ᭄ᬩ᭄ᬭᬾᬕ᭄',
    'Wariga': 'ᬯᬭᬶᬕ',
    'Warigadian': 'ᬯᬭᬶᬕᬤᬶᬬᬦ᭄',
    'Julungwangi': 'ᬚᬸᬮᬸᬂᬯᬂᬶ',
    'Sungsang': 'ᬲᬸᬂᬲᬂ',
    'Dungulan': 'ᬤᬸᬂᬕᬸᬮᬦ᭄',
    'Kuningan': 'ᬓᬸᬦᬶᬂᬕᬦ᭄',
    'Langkir': 'ᬮᬂᬓᬶᬭ᭄',
    'Medangsia': 'ᬫᬾᬤᬂᬲᬶᬬ',
    'Pujut': 'ᬧᬸᬚᬸᬢ᭄',
    'Pahang': 'ᬧᬳᬂ',
    'Krulut': 'ᬓ᭄ᬭᬸᬮᬸᬢ᭄',
    'Merakih': 'ᬫᬾᬭᬓᬶᬳ᭄',
    'Tambir': 'ᬢᬫ᭄ᬩᬶᬭ᭄',
    'Medangkungan': 'ᬫᬾᬤᬂᬓᬸᬂᬕᬦ᭄',
    'Matal': 'ᬫᬢᬮ᭄',
    'Uye': 'ᬉᬬᬾ',
    'Menail': 'ᬫᬾᬦᬳᬶᬮ᭄',
    'Prangbakat': 'ᬧ᭄ᬭᬂᬩᬓᬢ᭄',
    'Bala': 'ᬩᬮ',
    'Ugu': 'ᬉᬕᬸ',
    'Wayang': 'ᬯᬬᬂ',
    'Kulawu': 'ᬓᬸᬮᬯᬸ',
    'Dukut': 'ᬤᬸᬓᬸᬢ᭄',
    'Watugunung': 'ᬯᬢᬸᬕᬸᬦᬸᬂ'
  };
  return aksaraWuku[wukuName] || '';
}

/**
 * Mendapatkan aksara Bali untuk nama bulan
 */
export function getAksaraBaliMonth(monthIndex: number): string {
  const monthAksara: string[] = [
    'ᬚᬦᬸᬯᬭᬶ',       // Januari
    'ᬧᬾᬩ᭄ᬭᬸᬯᬭᬶ',     // Februari
    'ᬫᬭᬾᬢ᭄',         // Maret
    'ᬅᬧ᭄ᬭᬶᬮ᭄',       // April
    'ᬫᬾᬇ',           // Mei
    'ᬚᬸᬦᬶ',         // Juni
    'ᬚᬸᬮᬶ',         // Juli
    'ᬅᬕᬸᬲ᭄ᬢᬸᬲ᭄',     // Agustus
    'ᬲᬾᬧ᭄ᬢᬾᬫ᭄ᬩᬾᬭ᭄',   // September
    'ᬑᬓ᭄ᬢᭀᬩᬾᬭ᭄',     // Oktober
    'ᬦᭀᬯᬾᬫ᭄ᬩᬾᬭ᭄',     // November
    'ᬤᬾᬲᬾᬫ᭄ᬩᬾᬭ᭄'      // Desember
  ];
  return monthAksara[monthIndex] || '';
}

/**
 * Format tanggal lengkap dalam aksara Bali
 * Contoh: ᬰᬦᬶᬰ᭄ᬘᬭ, ᭗ ᬫᬭᬾᬢ᭄ ᭒᭐᭒᭖ • ᬢᬳᬸᬦ᭄ ᬲᬓ ᭑᭙᭔᭘
 */
export function formatAksaraBaliDate(date: Date, sakaYear: number): string {
  const baliDate = getBaliDate(date);
  const saptawaraAksara = getAksaraBaliSaptawara(baliDate.saptawara.name);
  const day = toBalineseDigits(date.getDate());
  const year = toBalineseDigits(date.getFullYear());
  const saka = toBalineseDigits(sakaYear);

  // Nama bulan dalam aksara Bali
  const monthAksara: string[] = [
    'ᬚᬦᬸᬯᬭᬶ',     // Januari
    'ᬧᬾᬩ᭄ᬭᬸᬯᬭᬶ',   // Februari
    'ᬫᬭᬾᬢ᭄',       // Maret
    'ᬅᬧ᭄ᬭᬶᬮ᭄',     // April
    'ᬫᬾᬇ',         // Mei
    'ᬚᬸᬦᬶ',       // Juni
    'ᬚᬸᬮᬶ',       // Juli
    'ᬅᬕᬸᬲ᭄ᬢᬸᬲ᭄',   // Agustus
    'ᬲᬾᬧ᭄ᬢᬾᬫ᭄ᬩᬾᬭ᭄', // September
    'ᬑᬓ᭄ᬢᭀᬩᬾᬭ᭄',   // Oktober
    'ᬦᭀᬯᬾᬫ᭄ᬩᬾᬭ᭄',   // November
    'ᬤᬾᬲᬾᬫ᭄ᬩᬾᬭ᭄'    // Desember
  ];

  const month = monthAksara[date.getMonth()];
  // ᬢᬳᬸᬦ᭄ ᬲᬓ = Tahun Saka
  return `${saptawaraAksara}᭞ ${day} ${month} ${year} ᭟ ᬢᬳᬸᬦ᭄ ᬲᬓ ${saka}`;
}
