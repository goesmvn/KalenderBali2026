import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq, like } from 'drizzle-orm';
import * as schema from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../../data/kalenderbali.db');

// File containing the raw markdown data
const markdownPath = '/Users/indraiswara/.gemini/antigravity/brain/f863b8b7-348e-43b9-9166-acc731dafe6c/piodalan_2026.md.resolved';

// Wewaran constants based on schema and seed
const SAPTAWARA = ['Redite', 'Soma', 'Anggara', 'Buda', 'Wraspati', 'Sukra', 'Saniscara'];
const PANCAWARA = ['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon'];
const WUKU = [
    'Sinta', 'Landep', 'Ukir', 'Kulantir', 'Tolu', 'Gumbreg', 'Wariga', 'Warigadean',
    'Julungwangi', 'Sungsang', 'Dunggulan', 'Kuningan', 'Langkir', 'Medangsia', 'Pujut', 'Pahang',
    'Krulut', 'Merakih', 'Tambir', 'Medangkungan', 'Matal', 'Uye', 'Menail', 'Perangbakat',
    'Bala', 'Ugu', 'Wayang', 'Kelawu', 'Dukut', 'Watugunung'
];

interface PiodalanDef {
    nama: string;
    tipe: 'pawukon' | 'purnama' | 'tilem';
    saptawara?: string;
    pancawara?: string;
    wuku?: string;
    sasih?: string;
}

// Special case mappings from markdown text to DB values
const WEWARAN_MAPPING: Record<string, PiodalanDef> = {
    'Tumpek Kandang': { nama: 'Tumpek Kandang', tipe: 'pawukon', saptawara: 'Saniscara', pancawara: 'Kliwon', wuku: 'Uye' },
    'Tumpek Krurut': { nama: 'Tumpek Krurut', tipe: 'pawukon', saptawara: 'Saniscara', pancawara: 'Kliwon', wuku: 'Krulut' },
    'Tumpek Wayang': { nama: 'Tumpek Wayang', tipe: 'pawukon', saptawara: 'Saniscara', pancawara: 'Kliwon', wuku: 'Wayang' },
    'Tumpek Landep': { nama: 'Tumpek Landep', tipe: 'pawukon', saptawara: 'Saniscara', pancawara: 'Kliwon', wuku: 'Landep' },
    'Tumpek Uduh/Pengatag': { nama: 'Tumpek Uduh', tipe: 'pawukon', saptawara: 'Saniscara', pancawara: 'Kliwon', wuku: 'Warigadean' },
    'Hari Raya Saraswati': { nama: 'Hari Raya Saraswati', tipe: 'pawukon', saptawara: 'Saniscara', pancawara: 'Umanis', wuku: 'Watugunung' },
    'Hari Raya Pagerwesi': { nama: 'Hari Raya Pagerwesi', tipe: 'pawukon', saptawara: 'Buda', pancawara: 'Kliwon', wuku: 'Sinta' },
    'Some Ribek': { nama: 'Soma Ribek', tipe: 'pawukon', saptawara: 'Soma', pancawara: 'Pon', wuku: 'Sinta' },
};

function parseWewaran(rawText: string): PiodalanDef | null {
    const text = rawText.trim();

    // Check direct mapping first
    if (WEWARAN_MAPPING[text]) return WEWARAN_MAPPING[text];

    // Check Purnama / Tilem
    if (text.toLowerCase().startsWith('purnama')) {
        const parts = text.split(' ');
        // Normalizes "Purnama Kepitu" -> "Sasih Kapitu"
        let sasihName = parts[1];
        if (sasihName === 'Kepitu') sasihName = 'Kapitu';
        if (sasihName === 'Kawulu') sasihName = 'Kawolu';
        if (sasihName === 'Kesanga') sasihName = 'Kasanga';
        if (sasihName === 'Kedasa') sasihName = 'Kadasa';
        if (sasihName === 'Ketiga') sasihName = 'Katiga';
        if (sasihName === 'Kapat') sasihName = 'Kapat';
        if (sasihName === 'Kelima') sasihName = 'Kalima';
        if (sasihName === 'Kenam') sasihName = 'Kanem';
        if (sasihName === 'Jiyestha') sasihName = 'Desta (Jyesta)'; // Mapping from seed

        return { nama: text, tipe: 'purnama', sasih: `Sasih ${sasihName}` };
    }

    if (text.toLowerCase().startsWith('tilem')) {
        const parts = text.split(' ');
        let sasihName = parts[1];
        if (sasihName === 'Kepitu') sasihName = 'Kapitu';
        if (sasihName === 'Kawulu') sasihName = 'Kawolu';
        if (sasihName === 'Kedasa') sasihName = 'Kadasa';
        if (sasihName === 'Ketiga') sasihName = 'Katiga';
        if (sasihName === 'Jiyestha') sasihName = 'Desta (Jyesta)';

        return { nama: text, tipe: 'tilem', sasih: `Sasih ${sasihName}` };
    }

    // Parse Anggar Kasih
    if (text.toLowerCase().startsWith('anggar kasih')) {
        const parts = text.split(' ');
        const wukuName = parts[2] || parts[1]; // Anggar Kasih Tambir -> Tambir
        // normalization
        let wuku = wukuName;
        if (wuku === 'Julungwangi') wuku = 'Julungwangi';

        return { nama: text, tipe: 'pawukon', saptawara: 'Anggara', pancawara: 'Kliwon', wuku };
    }

    // Attempt to parse standard format e.g., "Buda Wage Merakih"
    const parts = text.split(' ');
    if (parts.length >= 3) {
        let saptawara = parts[0];
        let pancawara = parts[1];
        let wuku = parts[2];

        // Normalize names
        if (saptawara === 'Redite' || saptawara === 'Soma' || saptawara === 'Anggara' || saptawara === 'Buda' || saptawara === 'Wraspati' || saptawara === 'Sukra' || saptawara === 'Saniscara') {
            if (pancawara === 'Keliwon') pancawara = 'Kliwon';

            if (wuku === 'Kelawu') wuku = 'Klawu';
            if (wuku === 'Dunggulan') wuku = 'Dungulan';
            if (wuku === 'Pujut') wuku = 'Pujud';

            return { nama: text, tipe: 'pawukon', saptawara, pancawara, wuku };
        }
    }

    console.warn(`Could not parse wewaran: ${text}`);
    return null;
}

async function run() {
    console.log('🌱 Starting Piodalan seeding...');

    if (!fs.existsSync(markdownPath)) {
        console.error(`File not found: ${markdownPath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(markdownPath, 'utf8');
    const lines = content.split('\n');

    const sqlite = new Database(dbPath);
    const db = drizzle(sqlite, { schema });

    let addedCount = 0;

    // Find lines that look like table rows and parse them
    // | 03-01 | Tumpek Krurut | Pura Pasek Gelgel... |
    for (const line of lines) {
        if (!line.startsWith('|') || line.includes('Tanggal') || line.includes('---')) continue;

        const cols = line.split('|').map(c => c.trim());
        if (cols.length >= 4) {
            const dateStr = cols[1]; // e.g. "03-01"
            const rawWewaran = cols[2]; // e.g. "Tumpek Krurut"
            const rawPuraList = cols[3]; // e.g. "Pura A. Pura B."

            // Try to find the correct sasih for jiyestha from the file format, because sometimes they are not generic
            // For now, rely on our normalization rules

            if (!dateStr || !rawWewaran || !rawPuraList) continue;

            const def = parseWewaran(rawWewaran);
            if (!def) continue; // Skip if we can't parse it

            // Split pura list by '.' since it's "Pura A. Pura B."
            // Beware of abbreviations like "Mr." (Merajan)
            const puraNames = rawPuraList.split(/\.(?=\s*(Pura|Pr\.|Mr\.|Betara|Odalan|Memendak|Sangah|Desa))/gi)
                .filter(Boolean);

            // Quick regex cleanup for the splitted names   
            const cleanedPuraNames: string[] = [];

            let temp = '';
            const tokens = rawPuraList.split('.');
            for (let t of tokens) {
                t = t.trim();
                // If it's short like "Pr" or "Mr", append to next
                if (t === 'Pr' || t === 'Mr') {
                    temp = t + '. ';
                } else if (t.length > 0) {
                    cleanedPuraNames.push((temp + t).trim());
                    temp = '';
                }
            }

            for (let puraName of cleanedPuraNames) {
                // Remove prefixes if desired, or keep them. Let's keep them and normalize slightly
                if (puraName.startsWith('Pr. ')) puraName = puraName.replace('Pr. ', 'Pura ');
                if (puraName.startsWith('Mr. ')) puraName = puraName.replace('Mr. ', 'Merajan ');

                // Do not re-insert if name already exists
                const existing = db.select().from(schema.pura).where(like(schema.pura.nama, `%${puraName}%`)).get();

                if (existing) {
                    // Update existing Pura with piodalan details if not set
                    if (!existing.piodalanSaptawara && !existing.piodalanSasih) {
                        db.update(schema.pura).set({
                            piodalanTipe: def.tipe,
                            piodalanSaptawara: def.saptawara || null,
                            piodalanPancawara: def.pancawara || null,
                            piodalanWuku: def.wuku || null,
                            piodalanSasih: def.sasih || null,
                        }).where(eq(schema.pura.id, existing.id)).run();
                        addedCount++;
                    }
                } else {
                    // Insert new Pura
                    db.insert(schema.pura).values({
                        nama: puraName,
                        kategori: puraName.toLowerCase().includes('merajan') ? 'merajan' : 'lainnya',
                        kabupaten: 'Bali', // Fallback
                        piodalanTipe: def.tipe,
                        piodalanSaptawara: def.saptawara || null,
                        piodalanPancawara: def.pancawara || null,
                        piodalanWuku: def.wuku || null,
                        piodalanSasih: def.sasih || null,
                    }).run();
                    addedCount++;
                }
            }
        }
    }

    console.log(`✅ Seeded or updated ${addedCount} Piodalan entries from markdown.`);
    sqlite.close();
}

run().catch(console.error);
