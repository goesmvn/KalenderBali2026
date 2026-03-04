import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchBaliCalendar } from '@/utils/search-utils';
import type { SearchType, SearchResult } from '@/utils/search-utils';
import { formatIndonesianDate } from '@/utils/bali-calendar';
import { Search, CalendarDays, SearchIcon, ChevronRight, Star, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getBaliDate } from '@/utils/bali-calendar';
import { calculatePawiwahanScore } from '@/utils/pawiwahan-score';
import type { YadnyaScoreResult } from '@/utils/pawiwahan-score';
import { calculateKelahiranScore } from '@/utils/kelahiran-score';
import type { KelahiranScoreResult } from '@/utils/kelahiran-score';
import type { BaliDate } from '@/types/bali-calendar';
import { LOGO_BASE64 } from '@/utils/logo-base64';

interface SearchPanelProps {
    onSelectResult: (date: Date) => void;
    currentDate: Date;
    onHighlightCategory?: (category: string | null) => void;
    currentHighlightCategory?: string | null;
    initialTab?: 'masehi' | 'fitur' | 'hariBaik' | 'pawiwahan' | 'melahirkan';
}

const SAPTAWARA = ['Redite', 'Soma', 'Anggara', 'Buda', 'Wraspati', 'Sukra', 'Saniscara'];
const PANCAWARA = ['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon'];
const WUKU = [
    'Sinta', 'Landep', 'Ukir', 'Kulantir', 'Tolu', 'Gumbreg', 'Wariga', 'Warigadean',
    'Julungwangi', 'Sungsang', 'Dungulan', 'Kuningan', 'Langkir', 'Medangsia', 'Pujud',
    'Pahang', 'Krulut', 'Mrakih', 'Tambir', 'Medangkungan', 'Matal', 'Uye', 'Menail',
    'Prangbakat', 'Bala', 'Ugu', 'Wayang', 'Klawu', 'Dukut', 'Watugunung'
];
const INGKEL = ['Wong', 'Sato', 'Mina', 'Manuk', 'Taru', 'Buku'];

const formatDateToInput = (d: Date) => {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function SearchPanel({ onSelectResult, currentDate, onHighlightCategory, currentHighlightCategory, initialTab }: SearchPanelProps) {
    const [activeTab, setActiveTab] = useState<'masehi' | 'fitur' | 'hariBaik' | 'pawiwahan' | 'melahirkan'>(initialTab || 'masehi');
    const [isExpanded, setIsExpanded] = useState(true);

    // Masehi State
    const [targetMonth, setTargetMonth] = useState((currentDate.getMonth() + 1).toString());
    const [targetYear, setTargetYear] = useState(currentDate.getFullYear().toString());

    // Fitur State
    const [searchType, setSearchType] = useState<SearchType>('otonan');
    const [saptawara, setSaptawara] = useState('Buda');
    const [pancawara, setPancawara] = useState('Kliwon');
    const [wuku, setWuku] = useState('Sinta');
    const [ingkel, setIngkel] = useState('Wong');
    const [searchMode, setSearchMode] = useState<'forward' | 'year'>('forward');
    const [featureYear, setFeatureYear] = useState(currentDate.getFullYear().toString());

    // Hari Baik State
    const [selectedCategory, setSelectedCategory] = useState<string>(currentHighlightCategory || 'Dewa Yadnya');

    const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    // Pawiwahan Summary Feature State
    const [pawiwahanStartDate, setPawiwahanStartDate] = useState<string>(() => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return formatDateToInput(d);
    });
    const [pawiwahanEndDate, setPawiwahanEndDate] = useState<string>(() => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of active month
        return formatDateToInput(d);
    });
    const [pawiwahanResults, setPawiwahanResults] = useState<Array<{ date: Date, scoreResult: YadnyaScoreResult, baliDate: BaliDate }> | null>(null);

    // Melahirkan Sesar Feature State
    const [melahirkanStartDate, setMelahirkanStartDate] = useState<string>(() => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return formatDateToInput(d);
    });
    const [melahirkanEndDate, setMelahirkanEndDate] = useState<string>(() => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return formatDateToInput(d);
    });
    const [ayahSaptawara, setAyahSaptawara] = useState('');
    const [ayahPancawara, setAyahPancawara] = useState('');
    const [ibuSaptawara, setIbuSaptawara] = useState('');
    const [ibuPancawara, setIbuPancawara] = useState('');
    const [melahirkanResults, setMelahirkanResults] = useState<Array<{ date: Date, scoreResult: KelahiranScoreResult, baliDate: BaliDate }> | null>(null);

    const YADNYA_CATEGORIES = [
        'Dewa Yadnya', 'Pitra Yadnya', 'Manusa Yadnya', 'Rsi Yadnya', 'Bhuta Yadnya',
        'Pertanian', 'Bangunan', 'Peternakan & Hewan', 'Usaha & Karir'
    ];

    const handleMasehiSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const month = parseInt(targetMonth) - 1;
        const year = parseInt(targetYear);

        // Default to the 1st of the selected month
        const date = new Date(year, month, 1);
        onSelectResult(date);
        setIsExpanded(false);
    };

    const handleFeatureSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setPawiwahanResults(null); // Clear other results
        setMelahirkanResults(null);

        // Simulate slight delay for UI feedback
        setTimeout(() => {
            const results = searchBaliCalendar({
                type: searchType,
                saptawara: saptawara,
                pancawara: pancawara,
                wuku: wuku,
                ingkel: ingkel,
                startDate: currentDate, // Search forward from the current viewed month
                targetYear: searchMode === 'year' ? parseInt(featureYear) : undefined,
            });
            setSearchResults(results);
            setIsSearching(false);
        }, 300);
    };

    const handlePawiwahanSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setSearchResults(null); // Clear other results
        setMelahirkanResults(null);
        if (onHighlightCategory) onHighlightCategory(null);

        // Simulate delay
        setTimeout(() => {
            const results = [];
            const startDate = new Date(pawiwahanStartDate);
            const endDate = new Date(pawiwahanEndDate);

            if (startDate > endDate) {
                setIsSearching(false);
                return;
            }

            // Iterate through every day in the range
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const bDate = getBaliDate(d);
                const scoreResult = calculatePawiwahanScore(bDate);

                if (scoreResult.score >= 50) {
                    // Create a copy of the date because setDate mutates it
                    results.push({
                        date: new Date(d),
                        baliDate: bDate,
                        scoreResult
                    });
                }
            }

            setPawiwahanResults(results);
            if (onHighlightCategory) onHighlightCategory('dewasa_pawiwahan');
            setIsSearching(false);
        }, 300);
    };

    const handleMelahirkanSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setSearchResults(null);
        setPawiwahanResults(null);
        if (onHighlightCategory) onHighlightCategory(null);

        setTimeout(() => {
            const results = [];
            const startDate = new Date(melahirkanStartDate);
            const endDate = new Date(melahirkanEndDate);

            if (startDate > endDate) {
                setIsSearching(false);
                return;
            }

            const ayahOtonan = (ayahSaptawara && ayahPancawara) ? { saptawara: ayahSaptawara, pancawara: ayahPancawara } : undefined;
            const ibuOtonan = (ibuSaptawara && ibuPancawara) ? { saptawara: ibuSaptawara, pancawara: ibuPancawara } : undefined;

            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const bDate = getBaliDate(d);
                const scoreResult = calculateKelahiranScore(bDate, d, ayahOtonan, ibuOtonan);

                // For Melahirkan, filter only very good harmonic days (>= 50 logic applied)
                if (scoreResult.score >= 50) {
                    results.push({
                        date: new Date(d),
                        baliDate: bDate,
                        scoreResult
                    });
                }
            }

            // Sort results by score descending
            results.sort((a, b) => b.scoreResult.score - a.scoreResult.score);

            setMelahirkanResults(results);
            if (onHighlightCategory) onHighlightCategory('melahirkan');
            setIsSearching(false);
        }, 300);
    };

    const createBasePDF = (title: string, subtitle: string, extraDetails?: { label: string, value: string }[]) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        doc.addImage(LOGO_BASE64, 'JPEG', 14, 12, 16, 16);

        // 'KalenderBali' (Black) + '.id' (Red)
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40, 40, 40); // Black/Dark Gray
        doc.text('KalenderBali', 34, 21);

        // Calculate width of 'KalenderBali' to position '.id' right after it
        const titleWidth = doc.getTextWidth('KalenderBali');
        doc.setTextColor(193, 18, 31); // Brand Red
        doc.text('.id', 34 + titleWidth, 21);

        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "normal");
        doc.text(title, 34, 30);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(subtitle, 34, 36);

        let currentY = 36;
        if (extraDetails && extraDetails.length > 0) {
            currentY += 6; // Add some gap from subtitle
            const boxPadding = 5;
            const lineHeight = 6;
            const boxHeight = (extraDetails.length * lineHeight) + (boxPadding * 2) - 2;

            // Draw background and border (red-50 bg, red-200 border to match brand theme)
            doc.setFillColor(254, 242, 242);
            doc.setDrawColor(254, 202, 202);
            doc.setLineWidth(0.5);
            doc.roundedRect(34, currentY, pageWidth - 68, boxHeight, 2, 2, 'FD'); // Fill and Border

            // Draw text inside the box
            let textY = currentY + boxPadding + 3.5; // Baseline adjustment

            extraDetails.forEach(detail => {
                doc.setFontSize(9);

                // Label (Bold)
                doc.setFont("helvetica", "bold");
                doc.setTextColor(153, 27, 27); // red-800
                doc.text(detail.label, 38, textY);

                // Value (Normal)
                const labelWidth = doc.getTextWidth(detail.label);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                doc.text(detail.value, 38 + labelWidth + 2, textY);

                textY += lineHeight;
            });

            currentY += boxHeight;
        }

        return { doc, pageWidth, pageHeight, startY: currentY + 10 };
    };

    const drawFooter = (doc: jsPDF, pageWidth: number, pageHeight: number) => {
        doc.setFontSize(10);
        doc.setTextColor(130, 130, 130);
        doc.setFont("helvetica", "italic");
        doc.text("KalenderBali.id merupakan bagian dari NusaHeritage.id", pageWidth / 2, pageHeight - 10, { align: "center" });
    };

    const handleExportPawiwahanPDF = () => {
        if (!pawiwahanResults || pawiwahanResults.length === 0) return;
        const subtitle = `Periode: ${formatIndonesianDate(new Date(pawiwahanStartDate))} - ${formatIndonesianDate(new Date(pawiwahanEndDate))}`;
        const { doc, pageWidth, pageHeight, startY } = createBasePDF('Rekomendasi Hari Dewasa Pawiwahan', subtitle);

        const tableData = pawiwahanResults.map(res => [
            formatIndonesianDate(res.date),
            `${res.baliDate.saptawara.name} ${res.baliDate.pancawara.name.split(' ')[0]} ${res.baliDate.wuku.name}`,
            `${res.scoreResult.score}% ${res.scoreResult.isHariUtama ? '(Hari Utama)' : ''}`
        ]);

        autoTable(doc, {
            startY: startY,
            head: [['Tanggal Masehi', 'Wewaran & Wuku', 'Skor']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [193, 18, 31], textColor: [255, 255, 255] },
            didParseCell: function (data) {
                if (data.section === 'body' && data.column.index === 2) {
                    const textStr = Array.isArray(data.cell.raw) ? data.cell.raw.join(' ') : String(data.cell.raw);
                    const match = textStr.match(/(\d+)%/);
                    if (match) {
                        const score = parseInt(match[1]);
                        if (score === 100) {
                            data.cell.styles.fillColor = [5, 150, 105];   // emerald-600 (hijau pekat)
                            data.cell.styles.textColor = [255, 255, 255]; // white text
                            data.cell.styles.fontStyle = 'bold';
                        } else if (score >= 50) {
                            data.cell.styles.fillColor = [209, 250, 229]; // emerald-100 (hijau muda)
                            data.cell.styles.textColor = [6, 95, 70];     // emerald-800 (teks hijau tua)
                            data.cell.styles.fontStyle = 'bold';
                        }
                    }
                }
            },
            didDrawPage: function () {
                drawFooter(doc, pageWidth, pageHeight);
            }
        });

        doc.save(`pawiwahan_${pawiwahanStartDate}_${pawiwahanEndDate}.pdf`);
    };

    const handleExportHariBaikPDF = () => {
        if (!searchResults || searchResults.length === 0) return;
        let subtitle = `Kategori Pencarian: ${searchType.toUpperCase()}`;
        if (searchMode === 'year') subtitle += ` | Tahun: ${featureYear}`;

        const { doc, pageWidth, pageHeight, startY } = createBasePDF('Rekomendasi Hari Baik / Fitur', subtitle);

        const tableData = searchResults.map(res => [
            formatIndonesianDate(res.date),
            res.label
        ]);

        autoTable(doc, {
            startY: startY,
            head: [['Tanggal Masehi', 'Informasi']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [193, 18, 31], textColor: [255, 255, 255] },
            didDrawPage: function () {
                drawFooter(doc, pageWidth, pageHeight);
            }
        });

        doc.save(`hari_baik_${searchType}.pdf`);
    };

    const handleExportMelahirkanPDF = () => {
        if (!melahirkanResults || melahirkanResults.length === 0) return;
        const subtitle = `HPL: ${formatIndonesianDate(new Date(melahirkanStartDate))} - ${formatIndonesianDate(new Date(melahirkanEndDate))}`;

        const extraDetails: { label: string, value: string }[] = [];
        if (ayahSaptawara && ayahPancawara) {
            extraDetails.push({ label: 'Otonan Ayah:', value: `${ayahSaptawara} ${ayahPancawara}` });
        }
        if (ibuSaptawara && ibuPancawara) {
            extraDetails.push({ label: 'Otonan Ibu:', value: `${ibuSaptawara} ${ibuPancawara}` });
        }

        const { doc, pageWidth, pageHeight, startY } = createBasePDF('Rekomendasi Hari Baik Lahir Sesar', subtitle, extraDetails);

        const tableData = melahirkanResults.map(res => {
            const dateStr = formatIndonesianDate(res.date);
            const wewaranStr = `${res.baliDate.saptawara.name} ${res.baliDate.pancawara.name.split(' ')[0]} ${res.baliDate.wuku.name}`;

            let scoreStr = `${res.scoreResult.score}%`;
            let details = [];

            if (res.scoreResult.tanggalCantikLabel) {
                details.push(`Cantik: ${res.scoreResult.tanggalCantikLabel}`);
            }
            if (res.scoreResult.uripHarmonyLabel) {
                const prefix = res.scoreResult.uripHarmonyScore! > 0 ? '(Harmonis) ' : '(Kurang) ';
                details.push(`Urip: ${prefix}${res.scoreResult.uripHarmonyLabel}`);
            }

            let finalDetailStr = scoreStr;
            if (details.length > 0) {
                finalDetailStr += `\n${details.join('\n')}`;
            }

            return [dateStr, wewaranStr, finalDetailStr];
        });

        autoTable(doc, {
            startY: startY,
            head: [['Tanggal Masehi', 'Wewaran & Wuku', 'Skor Harmoni']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [193, 18, 31], textColor: [255, 255, 255] },
            didParseCell: function (data) {
                if (data.section === 'body' && data.column.index === 2) {
                    const textStr = Array.isArray(data.cell.raw) ? data.cell.raw.join(' ') : String(data.cell.raw);
                    const match = textStr.match(/(\d+)%/);
                    if (match) {
                        const score = parseInt(match[1]);
                        if (score === 100) {
                            data.cell.styles.fillColor = [5, 150, 105];   // emerald-600 (hijau pekat)
                            data.cell.styles.textColor = [255, 255, 255]; // white text
                            data.cell.styles.fontStyle = 'bold';
                        } else if (score >= 50) {
                            data.cell.styles.fillColor = [209, 250, 229]; // emerald-100 (hijau muda)
                            data.cell.styles.textColor = [6, 95, 70];     // emerald-800 (teks hijau tua)
                            data.cell.styles.fontStyle = 'bold';
                        }
                    }
                }
            },
            didDrawPage: function () {
                drawFooter(doc, pageWidth, pageHeight);
            }
        });

        doc.save(`lahir_sesar_${melahirkanStartDate}_${melahirkanEndDate}.pdf`);
    };

    const handleResultClick = (date: Date) => {
        onSelectResult(date);
        setIsExpanded(false);
    };

    const handleHighlightCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (onHighlightCategory) {
            onHighlightCategory(selectedCategory);
        }
        // Don't close accordion when highlighting so user can see it
    };

    const handleResetHighlight = () => {
        if (onHighlightCategory) {
            onHighlightCategory(null);
        }
        setIsExpanded(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden mb-6">
            <div
                className="px-4 sm:px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 text-stone-700">
                    <div className="p-2 bg-brand-100 rounded-lg text-brand-800">
                        <Search className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-stone-800">Cari Tanggal & Fitur Kalender</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-stone-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-stone-100"
                    >
                        <div className="p-4 sm:p-6 bg-stone-50/50">

                            {/* Tabs */}
                            <div className="flex p-1 mb-6 bg-stone-200/50 rounded-xl w-full flex-wrap sm:flex-nowrap gap-1">
                                <button
                                    onClick={() => setActiveTab('masehi')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'masehi' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    Tanggal
                                </button>
                                <button
                                    onClick={() => setActiveTab('fitur')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'fitur' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    Fitur
                                </button>
                                <button
                                    onClick={() => setActiveTab('hariBaik')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'hariBaik' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    Hari Baik
                                </button>
                                <button
                                    onClick={() => setActiveTab('pawiwahan')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'pawiwahan' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    Pawiwahan
                                </button>
                                <button
                                    onClick={() => setActiveTab('melahirkan')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'melahirkan' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    Lahir Sesar
                                </button>
                            </div>

                            {/* Masehi Search */}
                            {activeTab === 'masehi' && (
                                <form onSubmit={handleMasehiSearch} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-2 gap-4 max-w-md">
                                        <div>
                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">Bulan</label>
                                            <select
                                                value={targetMonth}
                                                onChange={(e) => setTargetMonth(e.target.value)}
                                                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600"
                                            >
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>{new Date(2000, i, 1).toLocaleString('id-ID', { month: 'long' })}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">Tahun</label>
                                            <input
                                                type="number"
                                                value={targetYear}
                                                onChange={(e) => setTargetYear(e.target.value)}
                                                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-sm font-medium transition-colors">
                                        <CalendarDays className="w-4 h-4" /> Go ke Tanggal
                                    </button>
                                </form>
                            )}

                            {/* Fitur Search */}
                            {activeTab === 'fitur' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <form onSubmit={handleFeatureSearch} className="space-y-4 max-w-2xl">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs text-stone-500 font-medium mb-1.5">Tipe Pencarian</label>
                                                <select
                                                    value={searchType}
                                                    onChange={(e) => {
                                                        setSearchType(e.target.value as SearchType);
                                                        setSearchResults(null);
                                                    }}
                                                    className="w-full sm:w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600"
                                                >
                                                    <option value="otonan">Otonan / Hari Lahir Bali</option>
                                                    <option value="purnama">Purnama (Bulan Penuh)</option>
                                                    <option value="tilem">Tilem (Bulan Mati)</option>
                                                    <option value="kajengkliwon">Kajeng Kliwon</option>
                                                    <option value="galungan">Hari Raya Galungan</option>
                                                    <option value="kuningan">Hari Raya Kuningan</option>
                                                    <option value="nyepi">Hari Raya Nyepi</option>
                                                    <option value="tumpek">Tumpek</option>
                                                    <option value="ingkel">Ingkel</option>
                                                </select>
                                            </div>

                                            {searchType === 'otonan' && (
                                                <>
                                                    <div>
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">Saptawara (7 Hari)</label>
                                                        <select value={saptawara} onChange={(e) => setSaptawara(e.target.value)} className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                            <option value="">Semua Hari</option>
                                                            {SAPTAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">Pancawara (5 Hari)</label>
                                                        <select value={pancawara} onChange={(e) => setPancawara(e.target.value)} className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                            <option value="">Semua</option>
                                                            {PANCAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">Wuku</label>
                                                        <select value={wuku} onChange={(e) => setWuku(e.target.value)} className="w-full sm:w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                            <option value="">Semua Wuku</option>
                                                            {WUKU.map(d => <option key={d} value={d}>{d}</option>)}
                                                        </select>
                                                    </div>
                                                </>
                                            )}

                                            {searchType === 'ingkel' && (
                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs text-stone-500 font-medium mb-1.5">Jenis Ingkel</label>
                                                    <select value={ingkel} onChange={(e) => setIngkel(e.target.value)} className="w-full sm:w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        {INGKEL.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                            )}

                                            <div className="sm:col-span-2 border-t border-stone-200 pt-4 mt-2">
                                                <label className="block text-xs text-stone-500 font-medium mb-2">Metode Pencarian</label>
                                                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                                    <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            checked={searchMode === 'forward'}
                                                            onChange={() => setSearchMode('forward')}
                                                            className="text-brand-600 focus:ring-brand-600"
                                                        />
                                                        3 Terdekat Kedepan
                                                    </label>
                                                    <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            checked={searchMode === 'year'}
                                                            onChange={() => setSearchMode('year')}
                                                            className="text-brand-600 focus:ring-brand-600"
                                                        />
                                                        Dalam Tahun Tertentu
                                                    </label>
                                                </div>

                                                {searchMode === 'year' && (
                                                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">Tahun</label>
                                                        <input
                                                            type="number"
                                                            value={featureYear}
                                                            onChange={(e) => setFeatureYear(e.target.value)}
                                                            className="w-full sm:w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button type="submit" disabled={isSearching} className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-brand-600 to-brand-800 hover:from-brand-700 hover:to-brand-800 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-70">
                                            <SearchIcon className="w-4 h-4" /> {isSearching ? 'Mencari...' : (searchMode === 'year' ? 'Cari di Tahun Ini' : 'Cari Berikutnya')}
                                        </button>
                                    </form>

                                    {/* Search Results Display */}
                                    {searchResults && (
                                        <div className="mt-6 pt-6 border-t border-stone-200">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
                                                <h4 className="text-sm font-medium text-stone-500">Hasil Pencarian{searchMode === 'year' ? ` di Tahun ${featureYear}` : ' (3 Terdekat Kedepan)'}:</h4>
                                                {searchResults.length > 0 && (
                                                    <button onClick={handleExportHariBaikPDF} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium transition-colors whitespace-nowrap">
                                                        <FileText className="w-3.5 h-3.5" /> PDF
                                                    </button>
                                                )}
                                            </div>
                                            {searchResults.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {searchResults.map((res, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => handleResultClick(res.date)}
                                                            className="bg-white border border-stone-200 rounded-xl p-3 hover:border-brand-400 hover:shadow-md transition-all cursor-pointer group"
                                                        >
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <p className="font-semibold text-stone-800 text-sm group-hover:text-brand-800">{formatIndonesianDate(res.date)}</p>
                                                                    <p className="text-xs text-stone-500 mt-1">{res.label}</p>
                                                                </div>
                                                                <div className="w-6 h-6 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                                                                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-brand-700" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-stone-500 italic">Tidak ditemukan kecocokan dalam jangka waktu dekat.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Hari Baik Highlight */}
                            {activeTab === 'hariBaik' && (
                                <form onSubmit={handleHighlightCategory} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="max-w-md">
                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">Kategori Kegiatan / Yadnya</label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 mb-4"
                                        >
                                            {YADNYA_CATEGORIES.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>

                                        <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                                            Kalender akan menampilkan <strong className="text-emerald-600">persentase kecocokan hari (warna hijau)</strong> berdasarkan hari baik dan menghindari larangan untuk kategori yang dipilih.
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors">
                                                Tampilkan di Kalender
                                            </button>

                                            {currentHighlightCategory && (
                                                <button type="button" onClick={handleResetHighlight} className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl text-sm font-medium transition-colors">
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* Pawiwahan Highlight & Search */}
                            {activeTab === 'pawiwahan' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="max-w-xl">
                                        <h3 className="text-lg font-semibold text-emerald-800 mb-2">Dewasa Pawiwahan</h3>
                                        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                                            Fitur khusus ini menghitung Dewasa Ayu untuk Pawiwahan (Pernikahan) dengan menggabungkan rumusan Lontar Wariga dan kearifan lokal (Pengamatan Lapangan sejak 1972).
                                        </p>
                                        <div className="bg-brand-50/80 border border-brand-100 rounded-lg p-3 sm:p-4 mb-4 text-xs sm:text-sm text-stone-700">
                                            <ul className="list-disc pl-4 space-y-1.5 opacity-90">
                                                <li><strong>Hari Utama:</strong> Panca Merta, Sada Merta, Merta Sedana, Dasa Amertha</li>
                                                <li><strong>Larangan Mutlak:</strong> Pangelong (Bulan Susut/Mati)</li>
                                                <li><strong>Wuku Pantangan:</strong> Rangda Tiga, Tanpa Guru, Was Panganten</li>
                                            </ul>
                                        </div>

                                        <form onSubmit={handlePawiwahanSearch} className="mb-6 pb-6 border-b border-stone-200">
                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">Cari Rekomendasi berdasarkan Rentang Tanggal</label>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                                                    <div className="flex-1">
                                                        <label className="block text-[10px] text-stone-400 mb-1">Dari Tanggal</label>
                                                        <input
                                                            type="date"
                                                            value={pawiwahanStartDate}
                                                            onChange={(e) => setPawiwahanStartDate(e.target.value)}
                                                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-[10px] text-stone-400 mb-1">Sampai Tanggal</label>
                                                        <input
                                                            type="date"
                                                            value={pawiwahanEndDate}
                                                            onChange={(e) => setPawiwahanEndDate(e.target.value)}
                                                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <button type="submit" disabled={isSearching} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-70 mt-auto sm:mt-0 self-end sm:self-auto sm:min-w-[140px] whitespace-nowrap">
                                                    <SearchIcon className="w-4 h-4" /> {isSearching ? 'Mencari...' : 'Cari'}
                                                </button>
                                            </div>
                                        </form>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button
                                                onClick={() => {
                                                    if (onHighlightCategory) onHighlightCategory('dewasa_pawiwahan');
                                                    setIsExpanded(false);
                                                }}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors"
                                            >
                                                Tampilkan Heatmap Bulan Ini
                                            </button>

                                            {currentHighlightCategory === 'dewasa_pawiwahan' && (
                                                <button type="button" onClick={handleResetHighlight} className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl text-sm font-medium transition-colors">
                                                    Reset Kalender
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pawiwahan Results Display */}
                                    {pawiwahanResults && (
                                        <div className="mt-8 pt-6 border-t border-emerald-100">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                                                <div>
                                                    <h4 className="text-sm font-medium text-emerald-800">
                                                        Rekomendasi Terbaik
                                                    </h4>
                                                    <p className="text-xs text-stone-500 mt-0.5">
                                                        {formatIndonesianDate(new Date(pawiwahanStartDate))} - {formatIndonesianDate(new Date(pawiwahanEndDate))}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                                                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1.5 rounded-full font-bold whitespace-nowrap">
                                                        Ditemukan: {pawiwahanResults.length} Hari
                                                    </span>
                                                    <button onClick={handleExportPawiwahanPDF} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium transition-colors whitespace-nowrap">
                                                        <FileText className="w-3.5 h-3.5" /> PDF
                                                    </button>
                                                </div>
                                            </div>

                                            {pawiwahanResults.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {pawiwahanResults.map((res, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => handleResultClick(res.date)}
                                                            className="bg-white border border-emerald-100 rounded-xl p-3 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <p className="font-bold text-stone-800 text-sm group-hover:text-emerald-700">{formatIndonesianDate(res.date)}</p>
                                                                    <p className="text-xs text-stone-500 mt-0.5">
                                                                        {res.baliDate.saptawara.name} {res.baliDate.pancawara.name.split(' ')[0]} {res.baliDate.wuku.name}
                                                                    </p>
                                                                </div>
                                                                <div className={`px-2 py-1 rounded w-auto flex-shrink-0 flex items-center gap-1 bg-emerald-100 ${res.scoreResult.isHariUtama ? 'bg-emerald-500 text-white' : 'text-emerald-800'}`}>
                                                                    {res.scoreResult.isHariUtama && <Star className="w-3 h-3 fill-current" />}
                                                                    <span className="text-[10px] font-bold">
                                                                        {res.scoreResult.score}%
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between mt-1">
                                                                <div className="text-[10px] text-emerald-600 line-clamp-1 flex-1">
                                                                    {res.scoreResult.isHariUtama ? 'Hari Utama Pawiwahan' : 'Tidak ada pantangan berat'}
                                                                </div>
                                                                <div className="w-5 h-5 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors ml-2">
                                                                    <ChevronRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-600" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                                                    <p className="text-sm text-stone-600">Tidak ada hari dengan skor minimal 50% yang ditemukan dalam rentang waktu ini.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'melahirkan' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="max-w-xl">
                                        <h3 className="text-lg font-semibold text-rose-800 mb-2">Hari Baik Melahirkan Sesar</h3>
                                        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                                            Fitur ini membantu mencari hari baik untuk operasi sesar. Melibatkan perhitungan Dewasa Ayu (Manusa Yadnya), bonus <strong>Tanggal Cantik</strong>, dan harmoni <strong>Urip</strong> dengan Otonan Ayah/Ibu.
                                        </p>

                                        <form onSubmit={handleMelahirkanSearch} className="mb-6 pb-6 border-b border-stone-200">

                                            {/* Otonan Ayah & Ibu */}
                                            <div className="mb-4">
                                                <label className="block text-xs text-stone-500 font-medium mb-1.5">Otonan Ayah (Opsional, untuk hitung Urip)</label>
                                                <div className="flex gap-2 mb-3">
                                                    <select value={ayahSaptawara} onChange={e => setAyahSaptawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">Pilih Saptawara</option>
                                                        {SAPTAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                    <select value={ayahPancawara} onChange={e => setAyahPancawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">Pilih Pancawara</option>
                                                        {PANCAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>

                                                <label className="block text-xs text-stone-500 font-medium mb-1.5">Otonan Ibu (Opsional, untuk hitung Urip)</label>
                                                <div className="flex gap-2">
                                                    <select value={ibuSaptawara} onChange={e => setIbuSaptawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">Pilih Saptawara</option>
                                                        {SAPTAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                    <select value={ibuPancawara} onChange={e => setIbuPancawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">Pilih Pancawara</option>
                                                        {PANCAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">Rentang Tanggal (HPL)</label>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <div className="flex-1 flex gap-2">
                                                    <input
                                                        type="date"
                                                        value={melahirkanStartDate}
                                                        onChange={(e) => setMelahirkanStartDate(e.target.value)}
                                                        className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700"
                                                        required
                                                    />
                                                    <input
                                                        type="date"
                                                        value={melahirkanEndDate}
                                                        onChange={(e) => setMelahirkanEndDate(e.target.value)}
                                                        className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700"
                                                        required
                                                    />
                                                </div>
                                                <button type="submit" disabled={isSearching} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-70 mt-auto sm:mt-0 sm:min-w-[140px] whitespace-nowrap">
                                                    <SearchIcon className="w-4 h-4" /> {isSearching ? 'Mencari...' : 'Cari'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Melahirkan Results */}
                                    {melahirkanResults && (
                                        <div className="mt-4 pt-4 border-t border-rose-100">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                                                <h4 className="text-sm font-medium text-rose-800">
                                                    Rekomendasi Hari Terbaik (Skor &gt; 50%)
                                                </h4>
                                                {melahirkanResults.length > 0 && (
                                                    <button onClick={handleExportMelahirkanPDF} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium transition-colors whitespace-nowrap">
                                                        <FileText className="w-3.5 h-3.5" /> PDF
                                                    </button>
                                                )}
                                            </div>

                                            {melahirkanResults.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {melahirkanResults.map((res, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => handleResultClick(res.date)}
                                                            className="bg-white border border-rose-100 rounded-xl p-3 sm:p-4 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group"
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <p className="font-bold text-stone-800 text-base group-hover:text-rose-700">{formatIndonesianDate(res.date)}</p>
                                                                    <p className="text-xs text-stone-500 mt-0.5">
                                                                        {res.baliDate.saptawara.name} {res.baliDate.pancawara.name.split(' ')[0]} {res.baliDate.wuku.name}
                                                                    </p>
                                                                </div>
                                                                <div className="px-2 py-1 rounded bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1">
                                                                    {res.scoreResult.score}%
                                                                </div>
                                                            </div>

                                                            {/* Badges */}
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {res.scoreResult.tanggalCantikLabel && (
                                                                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded border border-amber-200 flex items-center gap-1">
                                                                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {res.scoreResult.tanggalCantikLabel}
                                                                    </span>
                                                                )}
                                                                {res.scoreResult.uripHarmonyLabel && (
                                                                    <span className={`text-[10px] px-2 py-1 rounded border flex items-center gap-1 ${res.scoreResult.uripHarmonyScore! > 0 ? 'bg-sky-100 text-sky-800 border-sky-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                                                                        {res.scoreResult.uripHarmonyScore! > 0 ? '♥' : '⚠'} Urip: {res.scoreResult.uripHarmonyLabel}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                                                    <p className="text-sm text-stone-600">Tidak ada hari dengan skor minimal 50% yang ditemukan dalam rentang waktu ini.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
