import * as fs from 'fs';
import { alaAyuningData } from './src/utils/dewasa-ayu-data';

// Kategori Yadnya dan kata kuncinya (lowercase)
const categories = {
    'Dewa Yadnya': ['dewa yadnya', 'odalan', 'melaspas', 'bangunan suci', 'tempat suci', 'ibadah', 'pura', 'merajan', 'sanggah', 'pemujaan', 'memuja dewa'],
    'Pitra Yadnya': ['pitra yadnya', 'ngaben', 'atiwa-tiwa', 'leluhur', 'memuja leluhur', 'membakar mayat', 'mengubur', 'nyekah', 'penguburan', 'kawitan'],
    'Manusa Yadnya': ['manusa yadnya', 'nikah', 'kawin', 'wiwaha', 'pernikahan', 'pawiwahan', 'potong gigi', 'mapendes', 'bayi', 'menetek', 'melas rare', 'potong rambut', 'macukur', 'digundul', 'meminang'],
    'Rsi Yadnya': ['rsi yadnya', 'pendita', 'sulinggih', 'diksa', 'dwijati', 'mabiseka'],
    'Bhuta Yadnya': ['bhuta yadnya', 'mecaru', 'caru', 'tawur', 'menghilangkan yang angker'],

    // Kategori Umum
    'Pertanian': ['bercocok tanam', 'menanam', 'memetik', 'pertanian', 'tegal', 'sawah', 'padi', 'jagung', 'kelapa', 'umbi', 'buah', 'lumbung', 'membajak', 'bibit'],
    'Bangunan': ['membangun', 'bata', 'genteng', 'atap', 'mengatapi', 'rumah', 'pindah rumah', 'dapur', 'tembok', 'pagar', 'membuat sumur', 'bendungan', 'irigasi'],
    'Peternakan & Hewan': ['ternak', 'sapi', 'kerbau', 'kuda', 'kambing', 'babi', 'ayam', 'burung', 'berburu', 'jala', 'jaring', 'pancing', 'ikan'],
    'Usaha & Karir': ['usaha', 'berdagang', 'berjualan', 'pejabat', 'pertemuan', 'rapat', 'pelantikan', 'aturan', 'awig-awig'],
};

// Detektor untuk larangan
const laranganKeywords = ['tidak baik', 'buruk', 'pantangan', 'dilarang', 'mengandung sifat boros', 'sakit-sakitan', 'mengecewakan', 'kepanasan', 'jangan'];

const updatedData = alaAyuningData.map((rule: any) => {
    const desc = rule.description.toLowerCase();
    const tags = new Set<string>();

    // Deteksi apakah rule ini mengandung unsur larangan
    let isLarangan = false;
    for (const keyword of laranganKeywords) {
        if (desc.includes(keyword)) {
            isLarangan = true;
            break;
        }
    }

    // Check each category
    for (const [category, keywords] of Object.entries(categories)) {
        for (const keyword of keywords) {
            if (desc.includes(keyword)) {
                if (isLarangan) {
                    tags.add(`Larangan ${category}`);
                } else {
                    tags.add(category);
                }
                break; // Found one keyword for this category, move to next category
            }
        }
    }

    // Khusus Panca Yadnya: jika ada kata "panca yadnya" / "segala macam yadnya", tambahkan 5 kategori yadnya
    if (desc.includes('panca yadnya') || desc.includes('segala macam yadnya') || desc.includes('segala yadnya') || desc.includes('semua jenis upacara') || desc.includes('segala pekerjaan')) {
        if (!isLarangan) {
            tags.add('Dewa Yadnya');
            tags.add('Pitra Yadnya');
            tags.add('Manusa Yadnya');
            tags.add('Rsi Yadnya');
            tags.add('Bhuta Yadnya');
        } else {
            tags.add('Larangan Dewa Yadnya');
            tags.add('Larangan Pitra Yadnya');
            tags.add('Larangan Manusa Yadnya');
            tags.add('Larangan Rsi Yadnya');
            tags.add('Larangan Bhuta Yadnya');
        }
    }

    // Jika deskripsi diawali "Tidak baik" atau murni larangan tapi tidak ada kata kunci spesifik
    // misalnya "Tidak baik.", "Sangat buruk." berikan tag Larangan Umum
    if (isLarangan && tags.size === 0) {
        tags.add('Larangan Umum');
    }

    return {
        ...rule,
        tags: Array.from(tags)
    };
});

const template = `export interface AlaAyuningDewasa {
  name: string;
  description: string;
  conditions: string[];
  tags: string[];
}

// Data digenerate dari referensi kalenderbali.org
export const alaAyuningData: AlaAyuningDewasa[] = ${JSON.stringify(updatedData, null, 2)};
`;

fs.writeFileSync('src/utils/dewasa-ayu-data.ts', template);
console.log('Updated src/utils/dewasa-ayu-data.ts with tags.');
