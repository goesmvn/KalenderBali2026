import * as fs from 'fs';

const calTerms = new Set([
    'redite', 'soma', 'anggara', 'buda', 'wraspati', 'sukra', 'saniscara',
    'umanis', 'paing', 'pon', 'wage', 'kliwon', 'keliwon',
    'pasah', 'beteng', 'kajeng',
    'purnama', 'tilem', 'penanggal', 'pangelong',
    'sinta', 'landep', 'ukir', 'kulantir', 'tolu', 'gumbreg', 'wariga', 'warigadean', 'julungwangi', 'sungsang', 'dunggulan', 'kuningan', 'langkir', 'medangsia', 'pujut', 'pahang', 'krulut', 'merakih', 'tambir', 'medangkungan', 'matal', 'uye', 'menail', 'prangbakat', 'bala', 'ugu', 'wayang', 'kulawu', 'dukut', 'watugunung',
    'brahma', 'indra', 'uma', 'ludra', 'guru', 'sri', 'yama',
    'kasa', 'karo', 'katiga', 'kapat', 'kalima', 'kanem', 'kapitu', 'kawalu', 'kasanga', 'kedasa', 'dresta', 'sadha',
    'tungleh', 'aryang', 'urukung', 'paniron', 'was', 'maulu',
    'pandita', 'pepet'
]);

function isConditionSentence(sentence: string) {
    const words = sentence.replace(/[.,]/g, '').toLowerCase().split(/\s+/);
    // Uncal Balung has specific format, but generally, if 80% of words are calendar terms or numbers, it's a condition.
    let matchCount = 0;
    for (const w of words) {
        if (calTerms.has(w) || !isNaN(Number(w))) {
            matchCount++;
        }
    }
    return matchCount > 0 && (matchCount / words.length) >= 0.7; // 70% match to be safe
}

const rawText = fs.readFileSync('raw-ala-ayuning-dewasa.txt', 'utf8');
const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const results = [];

for (const line of lines) {
    // Extract name: Stop at first "Baik" or "Tidak baik" or "Bersifat" or "Mengandung"
    const match = line.match(/^(.*?)\s+(Baik|Tidak baik|Bersifat|Mengandung|Untuk)/i);
    if (!match) {
        if (line.includes('Uncal Balung')) {
            const name = "Uncal Balung";
            const descEnd = line.indexOf('penting.') + 8;
            const desc = line.substring(13, descEnd).trim();
            const conds = line.substring(descEnd).split('.').map(c => c.trim()).filter(c => c.length > 0);
            results.push({ name, description: desc, conditions: conds });
        }
        continue;
    }
    const name = match[1].trim();
    const rest = line.substring(name.length).trim();

    // Split the rest into sentences
    const sentences = rest.split('.').map(s => s.trim()).filter(s => s.length > 0);

    const descSentences = [];
    const condSentences = [];

    for (const s of sentences) {
        if (isConditionSentence(s)) {
            condSentences.push(s);
        } else {
            descSentences.push(s);
        }
    }

    results.push({
        name,
        description: descSentences.join('. ') + (descSentences.length > 0 ? '.' : ''),
        conditions: condSentences
    });
}

const template = `export interface AlaAyuningDewasa {
  name: string;
  description: string;
  conditions: string[];
}

// Data digenerate dari referensi kalenderbali.org
export const alaAyuningData: AlaAyuningDewasa[] = ${JSON.stringify(results, null, 2)};
`;

fs.writeFileSync('src/utils/dewasa-ayu-data.ts', template);
console.log('Generated src/utils/dewasa-ayu-data.ts with', results.length, 'entries.');
