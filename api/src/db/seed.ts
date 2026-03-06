/**
 * Database Seed Script
 * Seeds the SQLite database with initial data:
 * - Admin user
 * - Wuku, Sasih, Nyepi dates
 * - Ceremony types (Pawiwahan, Kelahiran) with rules
 * - Default settings
 */
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as schema from './schema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../data/kalenderbali.db');

// Create database and tables
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');
const db = drizzle(sqlite, { schema });

console.log('🌱 Starting seed...\n');

// ============ CREATE TABLES ============
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pura (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    alias TEXT,
    kategori TEXT NOT NULL DEFAULT 'lainnya',
    kabupaten TEXT NOT NULL,
    kecamatan TEXT,
    desa TEXT,
    alamat TEXT,
    latitude REAL,
    longitude REAL,
    deskripsi TEXT,
    foto_url TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );



  CREATE TABLE IF NOT EXISTS wewaran (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipe TEXT NOT NULL,
    nama TEXT NOT NULL,
    urip INTEGER NOT NULL,
    dewata TEXT,
    letak TEXT,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS wuku (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    urip INTEGER NOT NULL,
    dewata TEXT,
    letak TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS sasih (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    month INTEGER NOT NULL,
    dewata TEXT,
    masehi_month TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS rahinan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    deskripsi TEXT,
    conditions TEXT NOT NULL,
    is_bali_holiday INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS nyepi_dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL UNIQUE,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS dewasa_ayu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    conditions TEXT NOT NULL,
    tags TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pewatekan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wewaran_tipe TEXT NOT NULL,
    wewaran_nama TEXT NOT NULL,
    category TEXT NOT NULL,
    watak TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS banten_penebusan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    condition_wuku TEXT,
    condition_astawara TEXT,
    condition_dasawara TEXT,
    banten_list TEXT NOT NULL,
    is_wajib INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS ceremony_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    kategori_yadnya TEXT NOT NULL,
    deskripsi TEXT,
    icon TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ceremony_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ceremony_id INTEGER NOT NULL REFERENCES ceremony_types(id) ON DELETE CASCADE,
    tipe TEXT NOT NULL,
    nama TEXT NOT NULL,
    deskripsi TEXT,
    score_override INTEGER,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS rule_conditions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rule_id INTEGER NOT NULL REFERENCES ceremony_rules(id) ON DELETE CASCADE,
    field TEXT NOT NULL,
    operator TEXT NOT NULL DEFAULT 'equals',
    value TEXT NOT NULL,
    logic_group TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    "group" TEXT NOT NULL DEFAULT 'general',
    type TEXT NOT NULL DEFAULT 'text'
  );
`);

console.log('✅ Tables created\n');

// ============ SEED ADMIN USER ============
const existingUser = db.select().from(schema.users).get();
if (!existingUser) {
  const hash = await bcrypt.hash('admin123', 12);
  db.insert(schema.users).values({
    username: 'admin',
    passwordHash: hash,
    displayName: 'Administrator',
    role: 'admin',
  }).run();
  console.log('✅ Admin user created (admin / admin123)');
}

// ============ SEED WUKU ============
const existingWuku = db.select().from(schema.wuku).get();
if (!existingWuku) {
  const wukuData = [
    { nama: 'Sinta', urip: 7, dewata: 'Dewa Yamadipati', letak: 'Barat' },
    { nama: 'Landep', urip: 1, dewata: 'Dewa Mahadewa', letak: 'Barat laut' },
    { nama: 'Ukir', urip: 4, dewata: 'Dewa Mahayekti', letak: 'Utara' },
    { nama: 'Kulantir', urip: 6, dewata: 'Dewa Langsur', letak: 'Timur laut' },
    { nama: 'Tolu', urip: 5, dewata: 'Dewa Bayu', letak: 'Timur' },
    { nama: 'Gumbreg', urip: 8, dewata: 'Dewa Candra', letak: 'Tenggara' },
    { nama: 'Wariga', urip: 9, dewata: 'Dewa Asmara', letak: 'Selatan' },
    { nama: 'Warigadean', urip: 3, dewata: 'Dewa Maharsi', letak: 'Barat daya' },
    { nama: 'Julungwangi', urip: 7, dewata: 'Dewa Sambu', letak: 'Barat' },
    { nama: 'Sungsang', urip: 1, dewata: 'Dewa Gana', letak: 'Barat laut' },
    { nama: 'Dungulan', urip: 4, dewata: 'Dewa Kumara', letak: 'Utara' },
    { nama: 'Kuningan', urip: 6, dewata: 'Dewa Indra', letak: 'Timur laut' },
    { nama: 'Langkir', urip: 5, dewata: 'Dewa Kala', letak: 'Timur' },
    { nama: 'Medangsia', urip: 8, dewata: 'Dewa Brahma', letak: 'Tenggara' },
    { nama: 'Pujud', urip: 9, dewata: 'Dewa Guritna', letak: 'Selatan' },
    { nama: 'Pahang', urip: 3, dewata: 'Dewa Tantra', letak: 'Barat daya' },
    { nama: 'Krulut', urip: 7, dewata: 'Dewa Surenggana', letak: 'Barat' },
    { nama: 'Mrakih', urip: 1, dewata: 'Dewa Wisnu', letak: 'Barat laut' },
    { nama: 'Tambir', urip: 4, dewata: 'Dewa Siwa', letak: 'Utara' },
    { nama: 'Medangkungan', urip: 6, dewata: 'Dewa Basuki', letak: 'Timur laut' },
    { nama: 'Matal', urip: 5, dewata: 'Dewa Sakri', letak: 'Timur' },
    { nama: 'Uye', urip: 8, dewata: 'Dewa Kowera', letak: 'Tenggara' },
    { nama: 'Menail', urip: 9, dewata: 'Dewa Citragotra', letak: 'Selatan' },
    { nama: 'Prangbakat', urip: 3, dewata: 'Dewa Bisma', letak: 'Barat daya' },
    { nama: 'Bala', urip: 7, dewata: 'Dewa Durgha', letak: 'Barat' },
    { nama: 'Ugu', urip: 1, dewata: 'Dewa Singajanma', letak: 'Barat laut' },
    { nama: 'Wayang', urip: 4, dewata: 'Dewa Sri', letak: 'Utara' },
    { nama: 'Klawu', urip: 6, dewata: 'Dewa Sedana', letak: 'Timur laut' },
    { nama: 'Dukut', urip: 5, dewata: 'Dewa Baruna', letak: 'Timur' },
    { nama: 'Watugunung', urip: 8, dewata: 'Dewa Anantaboga', letak: 'Tenggara' },
  ];
  wukuData.forEach((w, i) => {
    db.insert(schema.wuku).values({ ...w, sortOrder: i + 1 }).run();
  });
  console.log(`✅ Seeded ${wukuData.length} Wuku`);
}

// ============ SEED SASIH ============
const existingSasih = db.select().from(schema.sasih).get();
if (!existingSasih) {
  const sasihData = [
    { nama: 'Sasih Kasa (Srawana)', month: 1, dewata: 'Dewi Sri', masehiMonth: 'Juli' },
    { nama: 'Sasih Karo (Bhadrawada)', month: 2, dewata: 'Dewa Ganga', masehiMonth: 'Agustus' },
    { nama: 'Sasih Katiga (Asuji)', month: 3, dewata: 'Dewa Wisnu', masehiMonth: 'September' },
    { nama: 'Sasih Kapat (Kartika)', month: 4, dewata: 'Dewa Brahma', masehiMonth: 'Oktober' },
    { nama: 'Sasih Kalima (Marggasirsa)', month: 5, dewata: 'Dewa Iswara', masehiMonth: 'November' },
    { nama: 'Sasih Kanem (Posya)', month: 6, dewata: 'Dewa Durgha', masehiMonth: 'Desember' },
    { nama: 'Sasih Kapitu (Magha)', month: 7, dewata: 'Bhatara Guru/Siwa', masehiMonth: 'Januari' },
    { nama: 'Sasih Kawolu (Palguna)', month: 8, dewata: 'Dewa Parameswara', masehiMonth: 'Februari' },
    { nama: 'Sasih Kasanga (Caitra)', month: 9, dewata: 'Dewi Uma', masehiMonth: 'Maret' },
    { nama: 'Sasih Kadasa (Waisaka)', month: 10, dewata: 'Dewa Sangkara', masehiMonth: 'April' },
    { nama: 'Sasih Desta (Jyesta)', month: 11, dewata: 'Dewa Sambu', masehiMonth: 'Mei' },
    { nama: 'Sasih Sada (Asadha)', month: 12, dewata: 'Dewa Anantaboga', masehiMonth: 'Juni' },
  ];
  sasihData.forEach((s, i) => {
    db.insert(schema.sasih).values({ ...s, sortOrder: i + 1 }).run();
  });
  console.log(`✅ Seeded ${sasihData.length} Sasih`);
}

// ============ SEED NYEPI DATES ============
const existingNyepi = db.select().from(schema.nyepiDates).get();
if (!existingNyepi) {
  const nyepiData: Record<number, string> = {
    2020: '2020-03-25', 2021: '2021-03-14', 2022: '2022-03-03', 2023: '2023-03-22',
    2024: '2024-03-11', 2025: '2025-03-29', 2026: '2026-03-19', 2027: '2027-03-09',
    2028: '2028-03-26', 2029: '2029-03-15', 2030: '2030-03-05', 2031: '2031-03-24',
    2032: '2032-03-12', 2033: '2033-03-31', 2034: '2034-03-21', 2035: '2035-03-10',
    2036: '2036-03-28', 2037: '2037-03-17', 2038: '2038-03-06', 2039: '2039-03-25',
    2040: '2040-03-13',
  };
  Object.entries(nyepiData).forEach(([year, date]) => {
    db.insert(schema.nyepiDates).values({ year: parseInt(year), date }).run();
  });
  console.log(`✅ Seeded ${Object.keys(nyepiData).length} Nyepi dates`);
}

// ============ SEED CEREMONY TYPES (Dewasa Designer) ============
const existingCeremony = db.select().from(schema.ceremonyTypes).get();
if (!existingCeremony) {
  // Pawiwahan
  const pawiwahan = db.insert(schema.ceremonyTypes).values({
    nama: 'Dewasa Nganten',
    slug: 'pawiwahan',
    kategoriYadnya: 'Manusa Yadnya',
    deskripsi: 'Hari baik untuk melangsungkan upacara pernikahan',
    icon: '💒',
    sortOrder: 1,
  }).returning().get();

  // Hari Utama rules
  const hariUtama = [
    { nama: 'Panca Merta', desc: 'Membawa keselamatan dan panjang umur', sapta: 'Buda', panca: 'Paing', status: 'Penanggal', day: '5' },
    { nama: 'Sada Merta', desc: 'Pasangan langgeng dan sejahtera', sapta: 'Saniscara', panca: 'Paing', status: 'Penanggal', day: '10' },
    { nama: 'Merta Sedana', desc: 'Rumah tangga mapan, rejeki lancar', sapta: 'Wraspati', panca: 'Wage', status: 'Penanggal', day: '3' },
    { nama: 'Dasa Amertha', desc: 'Murah sandang pangan, sejahtera lahir batin', sapta: 'Sukra', panca: 'Paing', status: 'Penanggal', day: '10' },
  ];

  for (const hu of hariUtama) {
    const rule = db.insert(schema.ceremonyRules).values({
      ceremonyId: pawiwahan.id,
      tipe: 'hari_utama',
      nama: hu.nama,
      deskripsi: hu.desc,
      scoreOverride: 100,
    }).returning().get();

    db.insert(schema.ruleConditions).values({ ruleId: rule.id, field: 'saptawara', operator: 'equals', value: hu.sapta }).run();
    db.insert(schema.ruleConditions).values({ ruleId: rule.id, field: 'pancawara', operator: 'equals', value: hu.panca }).run();
    db.insert(schema.ruleConditions).values({ ruleId: rule.id, field: 'penanggal_status', operator: 'equals', value: hu.status }).run();
    db.insert(schema.ruleConditions).values({ ruleId: rule.id, field: 'penanggal_day', operator: 'equals', value: hu.day }).run();
  }

  // Larangan Mutlak: Pangelong
  const laranganPangelong = db.insert(schema.ceremonyRules).values({
    ceremonyId: pawiwahan.id, tipe: 'larangan_mutlak', nama: 'Pangelong (Bulan Susut)',
    deskripsi: 'Sebaiknya dihindari mutlak untuk pawiwahan', scoreOverride: 0,
  }).returning().get();
  db.insert(schema.ruleConditions).values({ ruleId: laranganPangelong.id, field: 'penanggal_status', operator: 'equals', value: 'Pangelong' }).run();

  // Larangan Sedang: Wuku Rangda Tiga
  const laranganRangda = db.insert(schema.ceremonyRules).values({
    ceremonyId: pawiwahan.id, tipe: 'larangan_sedang', nama: 'Wuku Rangda Tiga',
    deskripsi: 'Mendatangkan sakit, kesengsaraan, hingga balu',
  }).returning().get();
  db.insert(schema.ruleConditions).values({
    ruleId: laranganRangda.id, field: 'wuku', operator: 'in',
    value: JSON.stringify(['Wariga', 'Warigadean', 'Pujud', 'Pahang', 'Menail', 'Prangbakat']),
  }).run();

  // Larangan Sedang: Wuku Tanpa Guru
  const laranganTanpaGuru = db.insert(schema.ceremonyRules).values({
    ceremonyId: pawiwahan.id, tipe: 'larangan_sedang', nama: 'Wuku Tanpa Guru',
    deskripsi: 'Sulit memperoleh ilmu dan keturunan',
  }).returning().get();
  db.insert(schema.ruleConditions).values({
    ruleId: laranganTanpaGuru.id, field: 'wuku', operator: 'in',
    value: JSON.stringify(['Gumbreg', 'Kuningan', 'Klawu', 'Medangkungan']),
  }).run();

  // Anjuran: Dewasa Ayu Manusa Yadnya
  const anjuranManusa = db.insert(schema.ceremonyRules).values({
    ceremonyId: pawiwahan.id, tipe: 'anjuran', nama: 'Dewasa Ayu Manusa Yadnya',
    deskripsi: 'Hari yang dianjurkan oleh petunjuk Ala Ayuning Dewasa',
  }).returning().get();
  db.insert(schema.ruleConditions).values({ ruleId: anjuranManusa.id, field: 'dewasa_ayu_tag', operator: 'equals', value: 'Manusa Yadnya' }).run();

  // Pantangan: Larangan Manusa Yadnya
  const pantanganManusa = db.insert(schema.ceremonyRules).values({
    ceremonyId: pawiwahan.id, tipe: 'pantangan', nama: 'Larangan Manusa Yadnya',
    deskripsi: 'Hari yang dilarang oleh petunjuk Ala Ayuning Dewasa',
  }).returning().get();
  db.insert(schema.ruleConditions).values({ ruleId: pantanganManusa.id, field: 'dewasa_ayu_tag', operator: 'equals', value: 'Larangan Manusa Yadnya' }).run();

  console.log('✅ Seeded Dewasa Nganten (Pawiwahan) with rules + conditions');

  // Kelahiran (Lahir Sesar)
  db.insert(schema.ceremonyTypes).values({
    nama: 'Dewasa Kelahiran',
    slug: 'melahirkan',
    kategoriYadnya: 'Manusa Yadnya',
    deskripsi: 'Hari baik untuk kelahiran atau operasi sesar',
    icon: '👶',
    sortOrder: 2,
  }).run();
  console.log('✅ Seeded Dewasa Kelahiran');
}

// ============ SEED DEFAULT SETTINGS ============
const existingSetting = db.select().from(schema.settings).get();
if (!existingSetting) {
  const defaultSettings = [
    { key: 'app_name', value: 'Kalender Bali', label: 'Nama Aplikasi', group: 'general', type: 'text' as const },
    { key: 'app_version', value: 'b.1.0.7', label: 'Versi', group: 'general', type: 'text' as const },
    { key: 'saka_pivot_year', value: '1921', label: 'Tahun Saka Pivot', group: 'calculation', type: 'number' as const },
    { key: 'holiday_api_url', value: 'https://api-harilibur.vercel.app/api', label: 'API Hari Libur', group: 'api', type: 'text' as const },
  ];
  defaultSettings.forEach(s => {
    db.insert(schema.settings).values(s).run();
  });
  console.log(`✅ Seeded ${defaultSettings.length} settings`);
}

console.log('\n🎉 Seed complete!');
sqlite.close();
