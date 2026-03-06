import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// ============ AUTH ============

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    displayName: text('display_name').notNull(),
    role: text('role', { enum: ['admin', 'editor'] }).notNull().default('admin'),
    createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// ============ MASTER PURA ============

export const pura = sqliteTable('pura', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nama: text('nama').notNull(),
    alias: text('alias'),
    kategori: text('kategori', {
        enum: ['sad_kahyangan', 'dang_kahyangan', 'kahyangan_jagat', 'kahyangan_tiga', 'paibon', 'merajan', 'lainnya']
    }).notNull().default('lainnya'),
    kabupaten: text('kabupaten').notNull(),
    kecamatan: text('kecamatan'),
    desa: text('desa'),
    alamat: text('alamat'),
    latitude: real('latitude'),
    longitude: real('longitude'),
    deskripsi: text('deskripsi'),
    fotoUrl: text('foto_url'),

    // Piodalan fields moved here
    piodalanTipe: text('piodalan_tipe', { enum: ['pawukon', 'purnama', 'tilem'] }).default('pawukon'),
    piodalanSaptawara: text('piodalan_saptawara'),
    piodalanPancawara: text('piodalan_pancawara'),
    piodalanWuku: text('piodalan_wuku'),
    piodalanSasih: text('piodalan_sasih'),
    catatanPiodalan: text('catatan_piodalan'),

    createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
    updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});



// ============ WEWARAN ============

export const wewaran = sqliteTable('wewaran', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    tipe: text('tipe').notNull(), // ekawara, dwiwara, triwara, ..., dasawara
    nama: text('nama').notNull(),
    urip: integer('urip').notNull(),
    dewata: text('dewata'),
    letak: text('letak'),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
});

// ============ WUKU ============

export const wuku = sqliteTable('wuku', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nama: text('nama').notNull(),
    urip: integer('urip').notNull(),
    dewata: text('dewata'),
    letak: text('letak'),
    sortOrder: integer('sort_order').notNull().default(0),
});

// ============ SASIH ============

export const sasih = sqliteTable('sasih', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nama: text('nama').notNull(),
    month: integer('month').notNull(),
    dewata: text('dewata'),
    masehiMonth: text('masehi_month'),
    sortOrder: integer('sort_order').notNull().default(0),
});

// ============ RAHINAN ============

export const rahinan = sqliteTable('rahinan', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nama: text('nama').notNull(),
    deskripsi: text('deskripsi'),
    conditions: text('conditions').notNull(), // JSON string of matching rules
    isBaliHoliday: integer('is_bali_holiday', { mode: 'boolean' }).notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
});

// ============ NYEPI LOOKUP ============

export const nyepiDates = sqliteTable('nyepi_dates', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    year: integer('year').notNull().unique(),
    date: text('date').notNull(), // YYYY-MM-DD
});

// ============ DEWASA AYU ============

export const dewasaAyu = sqliteTable('dewasa_ayu', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nama: text('nama').notNull(),
    deskripsi: text('deskripsi').notNull(),
    conditions: text('conditions').notNull(), // JSON array of condition strings
    tags: text('tags').notNull(), // JSON array of tag strings
});

// ============ PEWATEKAN ============

export const pewatekan = sqliteTable('pewatekan', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    wewaranTipe: text('wewaran_tipe').notNull(), // ekawara, dwiwara, ...
    wewaranNama: text('wewaran_nama').notNull(),
    category: text('category').notNull(),
    watak: text('watak').notNull(),
});

// ============ BANTEN PENEBUSAN ============

export const bantenPenebusan = sqliteTable('banten_penebusan', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    description: text('description').notNull(),
    conditionWuku: text('condition_wuku'),
    conditionAstawara: text('condition_astawara'),
    conditionDasawara: text('condition_dasawara'),
    bantenList: text('banten_list').notNull(), // JSON array
    isWajib: integer('is_wajib', { mode: 'boolean' }).notNull().default(false),
});

// ============ CEREMONY TYPES (DEWASA DESIGNER) ============

export const ceremonyTypes = sqliteTable('ceremony_types', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nama: text('nama').notNull(),
    slug: text('slug').notNull().unique(),
    kategoriYadnya: text('kategori_yadnya').notNull(),
    deskripsi: text('deskripsi'),
    icon: text('icon'),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// ============ CEREMONY RULES ============

export const ceremonyRules = sqliteTable('ceremony_rules', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ceremonyId: integer('ceremony_id').notNull().references(() => ceremonyTypes.id, { onDelete: 'cascade' }),
    tipe: text('tipe', {
        enum: ['hari_utama', 'larangan_mutlak', 'larangan_sedang', 'anjuran', 'pantangan']
    }).notNull(),
    nama: text('nama').notNull(),
    deskripsi: text('deskripsi'),
    scoreOverride: integer('score_override'), // 100 for hari_utama, 0 for larangan_mutlak, null for calculated
    sortOrder: integer('sort_order').notNull().default(0),
});

// ============ RULE CONDITIONS ============

export const ruleConditions = sqliteTable('rule_conditions', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ruleId: integer('rule_id').notNull().references(() => ceremonyRules.id, { onDelete: 'cascade' }),
    field: text('field', {
        enum: ['saptawara', 'pancawara', 'wuku', 'penanggal_status', 'penanggal_day', 'dewasa_ayu_tag', 'sasih', 'purnama_tilem', 'triwara']
    }).notNull(),
    operator: text('operator', {
        enum: ['equals', 'not_equals', 'in', 'not_in', 'gte', 'lte']
    }).notNull().default('equals'),
    value: text('value').notNull(), // Single value or JSON array for 'in'/'not_in'
    logicGroup: text('logic_group'), // For AND/OR grouping
});

// ============ SETTINGS ============

export const settings = sqliteTable('settings', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    key: text('key').notNull().unique(),
    value: text('value').notNull(),
    label: text('label').notNull(),
    group: text('group').notNull().default('general'),
    type: text('type', { enum: ['text', 'number', 'boolean', 'json'] }).notNull().default('text'),
});
