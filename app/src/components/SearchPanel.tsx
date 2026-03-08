import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchBaliCalendar } from '@/utils/search-utils';
import type { SearchType, SearchResult } from '@/utils/search-utils';
import { formatIndonesianDate } from '@/utils/bali-calendar';
import { parseLocalDate } from '@/utils/date-parser';
import { Search, CalendarDays, SearchIcon, ChevronRight, Star, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getBaliDate } from '@/utils/bali-calendar';
import { calculatePawiwahanScore } from '@/utils/pawiwahan-score';
import type { YadnyaScoreResult } from '@/utils/pawiwahan-score';
import { calculateKelahiranScore } from '@/utils/kelahiran-score';
import type { KelahiranScoreResult } from '@/utils/kelahiran-score';
import { calculateYadnyaScore } from '@/utils/yadnya-score';
import type { YadnyaScoreResult as HariBaikScoreResult } from '@/utils/yadnya-score';
import type { BaliDate } from '@/types/bali-calendar';
import { LOGO_BASE64 } from '@/utils/logo-base64';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
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
    const [hariBaikStartDate, setHariBaikStartDate] = useState<string>(() => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return formatDateToInput(d);
    });
    const [hariBaikEndDate, setHariBaikEndDate] = useState<string>(() => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return formatDateToInput(d);
    });
    const [hariBaikResults, setHariBaikResults] = useState<Array<{ date: Date, scoreResult: HariBaikScoreResult, baliDate: BaliDate }> | null>(null);

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
            const startDate = parseLocalDate(pawiwahanStartDate);
            const endDate = parseLocalDate(pawiwahanEndDate);

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
            const startDate = parseLocalDate(melahirkanStartDate);
            const endDate = parseLocalDate(melahirkanEndDate);

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

    const handleHariBaikSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setSearchResults(null);
        setPawiwahanResults(null);
        setMelahirkanResults(null);

        setTimeout(() => {
            const start = parseLocalDate(hariBaikStartDate);
            const end = parseLocalDate(hariBaikEndDate);
            const results: Array<{ date: Date, scoreResult: HariBaikScoreResult, baliDate: BaliDate }> = [];

            const current = new Date(start);
            while (current <= end) {
                const baliDate = getBaliDate(new Date(current));
                const scoreResult = calculateYadnyaScore(baliDate, selectedCategory);

                if (scoreResult.score > 0) {
                    results.push({
                        date: new Date(current),
                        scoreResult,
                        baliDate
                    });
                }
                current.setDate(current.getDate() + 1);
            }

            // Sort by score descending
            results.sort((a, b) => b.scoreResult.score - a.scoreResult.score);
            setHariBaikResults(results);
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
        const subtitle = `Periode: ${formatIndonesianDate(parseLocalDate(pawiwahanStartDate))} - ${formatIndonesianDate(parseLocalDate(pawiwahanEndDate))}`;
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
        if (!hariBaikResults || hariBaikResults.length === 0) return;
        const subtitle = `Kategori: ${selectedCategory} | Rentang: ${formatIndonesianDate(parseLocalDate(hariBaikStartDate))} - ${formatIndonesianDate(parseLocalDate(hariBaikEndDate))}`;

        const { doc, pageWidth, pageHeight, startY } = createBasePDF('Rekomendasi Hari Baik', subtitle);

        const tableData = hariBaikResults.map(res => [
            formatIndonesianDate(res.date),
            `${res.baliDate.saptawara.name.split(' ')[0]} ${res.baliDate.pancawara.name}`,
            `${res.scoreResult.score}%`,
            res.scoreResult.goodMatches.join(', ') || '-',
            res.scoreResult.badMatches.length > 0 ? res.scoreResult.badMatches.join(', ') : '-'
        ]);

        autoTable(doc, {
            startY: startY,
            head: [['Tanggal Masehi', 'Wewaran', 'Skor', 'Hari Baik (Dewasa Ayu)', 'Larangan']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [193, 18, 31], textColor: [255, 255, 255], fontSize: 8 },
            bodyStyles: { fontSize: 7 },
            columnStyles: {
                0: { cellWidth: 35 },
                1: { cellWidth: 28 },
                2: { cellWidth: 12, halign: 'center' as const },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 35 }
            },
            didParseCell: function (data: any) {
                if (data.section === 'body' && data.column.index === 2) {
                    const score = parseInt(data.cell.raw);
                    if (score === 100) {
                        data.cell.styles.fillColor = [220, 252, 231];
                        data.cell.styles.textColor = [22, 101, 52];
                        data.cell.styles.fontStyle = 'bold';
                    } else if (score >= 50) {
                        data.cell.styles.fillColor = [254, 249, 195];
                        data.cell.styles.textColor = [113, 63, 18];
                    }
                }
            },
            didDrawPage: function () {
                drawFooter(doc, pageWidth, pageHeight);
            }
        });

        doc.save(`hari_baik_${selectedCategory.replace(/\s+/g, '_').toLowerCase()}_${hariBaikStartDate}_${hariBaikEndDate}.pdf`);
    };

    const handleExportMelahirkanPDF = () => {
        if (!melahirkanResults || melahirkanResults.length === 0) return;
        const subtitle = `HPL: ${formatIndonesianDate(parseLocalDate(melahirkanStartDate))} - ${formatIndonesianDate(parseLocalDate(melahirkanEndDate))}`;

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
                    <span className="font-semibold text-sm sm:text-base text-stone-800">{t('search_panel.title')}</span>
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
                                    {t('search_panel.tab_tanggal')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('fitur')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'fitur' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    {t('search_panel.tab_fitur')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('hariBaik')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'hariBaik' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    {t('search_panel.tab_hari_baik')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('pawiwahan')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'pawiwahan' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    {t('search_panel.tab_pawiwahan')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('melahirkan')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'melahirkan' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    {t('search_panel.tab_melahirkan')}
                                </button>
                            </div>

                            {/* Masehi Search */}
                            {activeTab === 'masehi' && (
                                <form onSubmit={handleMasehiSearch} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-2 gap-4 max-w-md">
                                        <div>
                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.month_label')}</label>
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
                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.year_label')}</label>
                                            <input
                                                type="number"
                                                value={targetYear}
                                                onChange={(e) => setTargetYear(e.target.value)}
                                                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-sm font-medium transition-colors">
                                        <CalendarDays className="w-4 h-4" /> {t('search_panel.go_to_date')}
                                    </button>
                                </form>
                            )}

                            {/* Fitur Search */}
                            {activeTab === 'fitur' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <form onSubmit={handleFeatureSearch} className="space-y-4 max-w-2xl">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.search_type_label')}</label>
                                                <select
                                                    value={searchType}
                                                    onChange={(e) => {
                                                        setSearchType(e.target.value as SearchType);
                                                        setSearchResults(null);
                                                    }}
                                                    className="w-full sm:w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/50 focus:border-brand-600"
                                                >
                                                    <option value="otonan">{t('search_panel.search_oto')}</option>
                                                    <option value="purnama">{t('search_panel.search_purnama')}</option>
                                                    <option value="tilem">{t('search_panel.search_tilem')}</option>
                                                    <option value="kajengkliwon">{t('search_panel.search_kajengkliwon')}</option>
                                                    <option value="galungan">{t('search_panel.search_galungan')}</option>
                                                    <option value="kuningan">{t('search_panel.search_kuningan')}</option>
                                                    <option value="nyepi">{t('search_panel.search_nyepi')}</option>
                                                    <option value="tumpek">{t('search_panel.search_tumpek')}</option>
                                                    <option value="ingkel">{t('search_panel.search_ingkel')}</option>
                                                </select>
                                            </div>

                                            {searchType === 'otonan' && (
                                                <>
                                                    <div>
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.saptawara_label')}</label>
                                                        <select value={saptawara} onChange={(e) => setSaptawara(e.target.value)} className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                            <option value="">{t('search_panel.saptawara_all')}</option>
                                                            {SAPTAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.pancawara_label')}</label>
                                                        <select value={pancawara} onChange={(e) => setPancawara(e.target.value)} className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                            <option value="">{t('search_panel.pancawara_all')}</option>
                                                            {PANCAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.wuku_label')}</label>
                                                        <select value={wuku} onChange={(e) => setWuku(e.target.value)} className="w-full sm:w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                            <option value="">{t('search_panel.wuku_all')}</option>
                                                            {WUKU.map(w => <option key={w} value={w}>{w}</option>)}
                                                        </select>
                                                    </div>
                                                </>
                                            )}

                                            {searchType === 'ingkel' && (
                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.ingkel_label')}</label>
                                                    <select value={ingkel} onChange={(e) => setIngkel(e.target.value)} className="w-full sm:w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        {INGKEL.map(i => <option key={i} value={i}>{i}</option>)}
                                                    </select>
                                                </div>
                                            )}

                                            <div className="sm:col-span-2 border-t border-stone-200 pt-4 mt-2">
                                                <label className="block text-xs text-stone-500 font-medium mb-3">{t('search_panel.search_method_label')}</label>
                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <label className="flex items-center p-3 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer">
                                                        <input type="radio" value="forward" checked={searchMode === 'forward'} onChange={() => setSearchMode('forward')} className="text-brand-600 focus:ring-brand-500" />
                                                        <span className="ml-2 text-sm text-stone-700">{t('search_panel.method_forward')}</span>
                                                    </label>
                                                    <label className="flex items-center p-3 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer">
                                                        <input type="radio" value="year" checked={searchMode === 'year'} onChange={() => setSearchMode('year')} className="text-brand-600 focus:ring-brand-500" />
                                                        <span className="ml-2 text-sm text-stone-700">{t('search_panel.method_year')}</span>
                                                    </label>
                                                </div>

                                                {searchMode === 'year' && (
                                                    <div className="animate-in fade-in slide-in-from-top-2 duration-200 mt-4">
                                                        <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.year_label')}</label>
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

                                        <button type="submit" disabled={isSearching} className="mt-6 flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                                            <SearchIcon className="w-4 h-4" /> {isSearching ? t('search_panel.btn_searching') : (searchMode === 'year' ? t('search_panel.btn_search_year') : t('search_panel.btn_search_next'))}
                                        </button>
                                    </form>

                                    {/* Feature Results */}
                                    {searchResults && (
                                        <div className="mt-8">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-t border-stone-200 pt-4">
                                                <h3 className="text-sm font-bold text-stone-800">
                                                    {t('search_panel.search_result_title')}{searchMode === 'year' ? t('search_panel.search_result_params_year', { year: featureYear }) : t('search_panel.search_result_params_next')}:
                                                </h3>
                                                {searchResults.length > 0 && (
                                                    <button onClick={handleExportHariBaikPDF} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors">
                                                        <FileText className="w-4 h-4" /> {t('search_panel.btn_pdf')}
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
                                                <p className="text-sm text-stone-500 italic">{t('search_panel.no_recent_match')}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Hari Baik Highlight & Search */}
                            {activeTab === 'hariBaik' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="max-w-xl">
                                        <h3 className="text-lg font-semibold text-emerald-800 mb-2">{t('search_panel.tab_hari_baik')}</h3>
                                        <p className="text-sm text-stone-600 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('search_panel.hari_baik_desc') }} />

                                        <form onSubmit={handleHariBaikSearch} className="mb-6 pb-6 border-b border-stone-200">
                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.category_label')}</label>
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 mb-4"
                                            >
                                                {YADNYA_CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>

                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.search_range_label')}</label>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <div className="flex-1 flex gap-2">
                                                    <div className="w-1/2">
                                                        <label className="block text-[10px] text-stone-400 mb-1">{t('search_panel.from_date')}</label>
                                                        <input
                                                            type="date"
                                                            value={hariBaikStartDate}
                                                            onChange={(e) => setHariBaikStartDate(e.target.value)}
                                                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="block text-[10px] text-stone-400 mb-1">{t('search_panel.to_date')}</label>
                                                        <input
                                                            type="date"
                                                            value={hariBaikEndDate}
                                                            onChange={(e) => setHariBaikEndDate(e.target.value)}
                                                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <button type="submit" disabled={isSearching} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-70 mt-auto sm:mt-0 sm:min-w-[140px] whitespace-nowrap">
                                                    <SearchIcon className="w-4 h-4" /> {isSearching ? t('search_panel.btn_searching') : t('search_panel.btn_search_haribaik')}
                                                </button>
                                            </div>
                                        </form>

                                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                            <form onSubmit={handleHighlightCategory} className="flex-1">
                                                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors">
                                                    {t('search_panel.btn_show_heatmap')}
                                                </button>
                                            </form>

                                            {currentHighlightCategory && (
                                                <button type="button" onClick={handleResetHighlight} className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl text-sm font-medium transition-colors">
                                                    {t('search_panel.btn_reset')}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hari Baik Results */}
                                    {hariBaikResults && (
                                        <div className="mt-6">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-t border-stone-200 pt-4">
                                                <h3 className="text-sm font-bold text-stone-800">
                                                    <Star className="inline w-4 h-4 text-emerald-500 mr-1" />
                                                    {t('search_panel.hari_baik_found', { count: hariBaikResults.length, category: selectedCategory })}
                                                </h3>
                                                {hariBaikResults.length > 0 && (
                                                    <button onClick={handleExportHariBaikPDF} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors">
                                                        <FileText className="w-4 h-4" /> {t('search_panel.btn_download_pdf')}
                                                    </button>
                                                )}
                                            </div>
                                            {hariBaikResults.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
                                                    {hariBaikResults.map((res, idx) => {
                                                        const scoreColor = res.scoreResult.score === 100 ? 'bg-emerald-500 text-white border-emerald-600'
                                                            : res.scoreResult.score >= 60 ? 'bg-lime-200 text-lime-900 border-lime-400'
                                                                : res.scoreResult.score >= 40 ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                                                    : 'bg-orange-100 text-orange-800 border-orange-300';
                                                        return (
                                                            <div
                                                                key={idx}
                                                                onClick={() => handleResultClick(res.date)}
                                                                className="bg-white border border-stone-200 rounded-xl p-3 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
                                                            >
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <div>
                                                                        <p className="font-semibold text-stone-800 text-sm group-hover:text-emerald-800">{formatIndonesianDate(res.date)}</p>
                                                                        <p className="text-xs text-stone-500 mt-0.5">{res.baliDate.saptawara.name.split(' ')[0]} {res.baliDate.pancawara.name} — Wuku {res.baliDate.wuku.name}</p>
                                                                    </div>
                                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${scoreColor}`}>
                                                                        {res.scoreResult.score}%
                                                                    </span>
                                                                </div>
                                                                {res.scoreResult.goodMatches.length > 0 && (
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {res.scoreResult.goodMatches.slice(0, 3).map((g, i) => (
                                                                            <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200">{g}</span>
                                                                        ))}
                                                                        {res.scoreResult.goodMatches.length > 3 && (
                                                                            <span className="text-[10px] bg-stone-50 text-stone-500 px-1.5 py-0.5 rounded-md">+{res.scoreResult.goodMatches.length - 3}</span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-stone-500 italic">{t('search_panel.hari_baik_not_found', { category: selectedCategory })}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Pawiwahan Highlight & Search */}
                            {activeTab === 'pawiwahan' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="max-w-xl">
                                        <h3 className="text-lg font-semibold text-emerald-800 mb-2">{t('search_panel.pawiwahan_title')}</h3>
                                        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                                            {t('search_panel.pawiwahan_desc')}
                                        </p>
                                        <div className="bg-brand-50/80 border border-brand-100 rounded-lg p-3 sm:p-4 mb-4 text-xs sm:text-sm text-stone-700">
                                            <ul className="list-disc pl-4 space-y-1.5 opacity-90">
                                                <li><strong>{t('search_panel.pawiwahan_rules_1')}</strong> {t('search_panel.pawiwahan_rules_1_val')}</li>
                                                <li><strong>{t('search_panel.pawiwahan_rules_2')}</strong> {t('search_panel.pawiwahan_rules_2_val')}</li>
                                                <li><strong>{t('search_panel.pawiwahan_rules_3')}</strong> {t('search_panel.pawiwahan_rules_3_val')}</li>
                                            </ul>
                                        </div>

                                        <form onSubmit={handlePawiwahanSearch} className="mb-6 pb-6 border-b border-stone-200">
                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.search_range_label')}</label>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                                                    <div className="flex-1">
                                                        <label className="block text-[10px] text-stone-400 mb-1">{t('search_panel.from_date')}</label>
                                                        <input
                                                            type="date"
                                                            value={pawiwahanStartDate}
                                                            onChange={(e) => setPawiwahanStartDate(e.target.value)}
                                                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-[10px] text-stone-400 mb-1">{t('search_panel.to_date')}</label>
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
                                                    <SearchIcon className="w-4 h-4" /> {isSearching ? t('search_panel.btn_searching') : t('search_panel.btn_search')}
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
                                                {t('search_panel.btn_show_heatmap')}
                                            </button>

                                            {currentHighlightCategory === 'dewasa_pawiwahan' && (
                                                <button type="button" onClick={handleResetHighlight} className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl text-sm font-medium transition-colors">
                                                    {t('search_panel.btn_reset_calendar')}
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
                                                        {t('search_panel.best_recommendation')}
                                                    </h4>
                                                    <p className="text-xs text-stone-500 mt-0.5">
                                                        {formatIndonesianDate(parseLocalDate(pawiwahanStartDate))} - {formatIndonesianDate(parseLocalDate(pawiwahanEndDate))}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                                                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1.5 rounded-full font-bold whitespace-nowrap">
                                                        {t('search_panel.pawiwahan_found', { count: pawiwahanResults.length })}
                                                    </span>
                                                    <button onClick={handleExportPawiwahanPDF} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                                                        <FileText className="w-4 h-4" /> {t('search_panel.btn_download_pdf')}
                                                    </button>
                                                </div>
                                            </div>

                                            {pawiwahanResults.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {pawiwahanResults.map((res, idx) => {
                                                        const score = res.scoreResult.score;
                                                        const scoreColor = score === 100 ? 'bg-emerald-500 text-white border-emerald-600'
                                                            : score >= 60 ? 'bg-lime-200 text-lime-900 border-lime-400'
                                                                : score >= 40 ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                                                    : 'bg-orange-100 text-orange-800 border-orange-300';
                                                        const cardBorder = score === 100 ? 'border-emerald-300'
                                                            : score >= 60 ? 'border-lime-300'
                                                                : score >= 40 ? 'border-yellow-200'
                                                                    : 'border-orange-200';
                                                        return (
                                                            <div
                                                                key={idx}
                                                                onClick={() => handleResultClick(res.date)}
                                                                className={`bg-white border ${cardBorder} rounded-xl p-3 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div>
                                                                        <p className="font-bold text-stone-800 text-sm group-hover:text-emerald-700">{formatIndonesianDate(res.date)}</p>
                                                                        <p className="text-xs text-stone-500 mt-0.5">
                                                                            {res.baliDate.saptawara.name} {res.baliDate.pancawara.name.split(' ')[0]} {res.baliDate.wuku.name}
                                                                        </p>
                                                                    </div>
                                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${scoreColor}`}>
                                                                        {res.scoreResult.isHariUtama && <Star className="w-3 h-3 fill-current" />}
                                                                        {score}%
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center justify-between mt-1">
                                                                    <div className="text-[10px] text-emerald-600 line-clamp-1 flex-1">
                                                                        {res.scoreResult.isHariUtama ? t('search_panel.hari_utama') : t('search_panel.no_pantangan')}
                                                                    </div>
                                                                    <div className="w-5 h-5 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors ml-2">
                                                                        <ChevronRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-600" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                                                    <p className="text-sm text-stone-600">{t('search_panel.pawiwahan_not_found')}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'melahirkan' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="max-w-xl">
                                        <h3 className="text-lg font-semibold text-rose-800 mb-2">{t('search_panel.melahirkan_title')}</h3>
                                        <p className="text-sm text-stone-600 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('search_panel.melahirkan_desc') }} />

                                        <form onSubmit={handleMelahirkanSearch} className="mb-6 pb-6 border-b border-stone-200">

                                            {/* Otonan Ayah & Ibu */}
                                            <div className="mb-4">
                                                <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.father_otonan_label')}</label>
                                                <div className="flex gap-2 mb-3">
                                                    <select value={ayahSaptawara} onChange={e => setAyahSaptawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">{t('search_panel.select_saptawara')}</option>
                                                        {SAPTAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                    <select value={ayahPancawara} onChange={e => setAyahPancawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">{t('search_panel.select_pancawara')}</option>
                                                        {PANCAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>

                                                <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.mother_otonan_label')}</label>
                                                <div className="flex gap-2">
                                                    <select value={ibuSaptawara} onChange={e => setIbuSaptawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">{t('search_panel.select_saptawara')}</option>
                                                        {SAPTAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                    <select value={ibuPancawara} onChange={e => setIbuPancawara(e.target.value)} className="w-1/2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-700">
                                                        <option value="">{t('search_panel.select_pancawara')}</option>
                                                        {PANCAWARA.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <label className="block text-xs text-stone-500 font-medium mb-1.5">{t('search_panel.hpl_label')}</label>
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
                                                    <SearchIcon className="w-4 h-4" /> {isSearching ? t('search_panel.btn_searching') : t('search_panel.btn_search')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Melahirkan Results */}
                                    {melahirkanResults && (
                                        <div className="mt-4 pt-4 border-t border-rose-100">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                                                <h4 className="text-sm font-medium text-rose-800">
                                                    {t('search_panel.melahirkan_recommendation')}
                                                </h4>
                                                {melahirkanResults.length > 0 && (
                                                    <button onClick={handleExportMelahirkanPDF} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                                                        <FileText className="w-4 h-4" /> {t('search_panel.btn_download_pdf')}
                                                    </button>
                                                )}
                                            </div>

                                            {melahirkanResults.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {melahirkanResults.map((res, idx) => {
                                                        const score = res.scoreResult.score;
                                                        const scoreColor = score === 100 ? 'bg-emerald-500 text-white border-emerald-600'
                                                            : score >= 60 ? 'bg-lime-200 text-lime-900 border-lime-400'
                                                                : score >= 40 ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                                                    : 'bg-orange-100 text-orange-800 border-orange-300';
                                                        const cardBorder = score === 100 ? 'border-emerald-300'
                                                            : score >= 60 ? 'border-lime-300'
                                                                : score >= 40 ? 'border-yellow-200'
                                                                    : 'border-orange-200';
                                                        return (
                                                            <div
                                                                key={idx}
                                                                onClick={() => handleResultClick(res.date)}
                                                                className={`bg-white border ${cardBorder} rounded-xl p-3 sm:p-4 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group`}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div>
                                                                        <p className="font-bold text-stone-800 text-base group-hover:text-emerald-700">{formatIndonesianDate(res.date)}</p>
                                                                        <p className="text-xs text-stone-500 mt-0.5">
                                                                            {res.baliDate.saptawara.name} {res.baliDate.pancawara.name.split(' ')[0]} {res.baliDate.wuku.name}
                                                                        </p>
                                                                    </div>
                                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${scoreColor}`}>
                                                                        {score}%
                                                                    </span>
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
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                                                    <p className="text-sm text-stone-600">{t('search_panel.melahirkan_not_found')}</p>
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
