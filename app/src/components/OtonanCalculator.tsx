import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarDays, Gift, ChevronRight, Share2, ExternalLink } from 'lucide-react';
import { getBaliDate, getAksaraBaliSaptawara, getAksaraBaliWuku, toBalineseDigits, formatAksaraBaliDate } from '@/utils/bali-calendar';
import type { BaliDate } from '@/types/bali-calendar';

interface OtonanCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

interface OtonanDate {
    date: Date;
    daysUntil: number;
    baliDate: BaliDate;
}

function calculateOtonanDates(birthDate: Date, count: number = 10): OtonanDate[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const results: OtonanDate[] = [];
    let current = new Date(birthDate);
    current.setHours(0, 0, 0, 0);

    // Find otonan dates (every 210 days from birth)
    // We want to show some past and mostly future ones
    let iteration = 0;
    const maxIterations = 5000; // safety limit

    while (results.length < count && iteration < maxIterations) {
        iteration++;
        current = new Date(current.getTime() + 210 * 24 * 60 * 60 * 1000);

        const daysUntil = Math.floor((current.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // Show up to 2 past and fill the rest with future
        if (daysUntil >= -420) {
            results.push({
                date: new Date(current),
                daysUntil,
                baliDate: getBaliDate(current)
            });
        }
    }

    return results;
}

export function OtonanCalculator({ isOpen, onClose }: OtonanCalculatorProps) {
    const [birthDateStr, setBirthDateStr] = useState('');
    const [showResults, setShowResults] = useState(false);

    const birthDate = useMemo(() => {
        if (!birthDateStr) return null;
        const d = new Date(birthDateStr + 'T00:00:00');
        return isNaN(d.getTime()) ? null : d;
    }, [birthDateStr]);

    const birthBaliDate = useMemo(() => {
        if (!birthDate) return null;
        return getBaliDate(birthDate);
    }, [birthDate]);

    const otonanDates = useMemo(() => {
        if (!birthDate) return [];
        return calculateOtonanDates(birthDate, 10);
    }, [birthDate]);

    const nextOtonan = useMemo(() => {
        return otonanDates.find(o => o.daysUntil >= 0) || null;
    }, [otonanDates]);

    const handleCalculate = () => {
        if (birthDate) setShowResults(true);
    };

    const handleGoogleCalendarLink = (otonan: OtonanDate) => {
        const d = otonan.date;
        const dateStr = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
        const title = encodeURIComponent('Otonan (Ulang Tahun Bali)');
        const details = encodeURIComponent(
            `Otonan - Ulang Tahun menurut Kalender Bali (setiap 210 hari)\n\nWuku: ${otonan.baliDate.wuku.name}\nSaptawara: ${otonan.baliDate.saptawara.name}\nPancawara: ${otonan.baliDate.pancawara.name}\n\nKunjungi KalenderBali.id untuk info lengkap.`
        );
        return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}`;
    };

    const handleShare = async () => {
        if (!birthBaliDate || !nextOtonan) return;
        const text = `🎉 Otonan saya berikutnya: ${nextOtonan.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n\nWuku: ${birthBaliDate.wuku.name}\nSaptawara: ${birthBaliDate.saptawara.name}\nPancawara: ${birthBaliDate.pancawara.name}\n\nHitung Otonan-mu di KalenderBali.id`;
        if (navigator.share) {
            try { await navigator.share({ title: 'Otonan Saya', text }); } catch { /* cancelled */ }
        } else {
            try { await navigator.clipboard.writeText(text); } catch { /* failed */ }
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Gift className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Kalkulator Otonan</h2>
                                    <p className="text-white/80 text-sm">Hitung Ulang Tahun Bali Anda</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-white/70 text-xs mt-2">
                            Otonan adalah ulang tahun menurut kalender Bali yang jatuh setiap 210 hari (1 siklus Pawukon).
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1">

                        {/* Date Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                                Tanggal Lahir (Masehi)
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="date"
                                    value={birthDateStr}
                                    onChange={(e) => { setBirthDateStr(e.target.value); setShowResults(false); }}
                                    className="flex-1 px-4 py-3 border-2 border-stone-200 rounded-xl text-stone-800 focus:border-amber-500 focus:outline-none transition-colors text-base"
                                    max={new Date().toISOString().split('T')[0]}
                                />
                                <button
                                    onClick={handleCalculate}
                                    disabled={!birthDate}
                                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 text-white font-semibold rounded-xl transition-colors"
                                >
                                    Hitung
                                </button>
                            </div>
                        </div>

                        {/* Birth Date Bali Info */}
                        <AnimatePresence>
                            {showResults && birthBaliDate && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-5"
                                >
                                    {/* Birth Wewaran Card */}
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">Wewaran Kelahiran</span>
                                            <button
                                                onClick={handleShare}
                                                className="p-1.5 text-amber-500 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                                                title="Bagikan"
                                            >
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Aksara Bali */}
                                        {getAksaraBaliSaptawara(birthBaliDate.saptawara.name) && (
                                            <p className="text-3xl text-amber-700 mb-2" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                                                {getAksaraBaliSaptawara(birthBaliDate.saptawara.name)}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
                                                <span className="text-[10px] text-amber-500 uppercase tracking-wider block">Saptawara</span>
                                                <p className="text-sm font-bold text-stone-800">{birthBaliDate.saptawara.name}</p>
                                            </div>
                                            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
                                                <span className="text-[10px] text-amber-500 uppercase tracking-wider block">Pancawara</span>
                                                <p className="text-sm font-bold text-stone-800">{birthBaliDate.pancawara.name}</p>
                                            </div>
                                        </div>

                                        <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-[10px] text-amber-500 uppercase tracking-wider block">Wuku</span>
                                                    <p className="text-sm font-bold text-stone-800">{birthBaliDate.wuku.name}</p>
                                                </div>
                                                {getAksaraBaliWuku(birthBaliDate.wuku.name) && (
                                                    <span className="text-lg text-amber-600" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                                                        {getAksaraBaliWuku(birthBaliDate.wuku.name)}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-stone-500 mt-1">Dewata: {birthBaliDate.wuku.dewata} • Urip: {birthBaliDate.wuku.urip}</p>
                                        </div>

                                        {/* Aksara Bali Full Date */}
                                        <div className="mt-3 text-center">
                                            <span className="text-sm text-amber-600" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                                                {formatAksaraBaliDate(birthDate!, birthBaliDate.sakaYear)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Next Otonan Highlight */}
                                    {nextOtonan && (
                                        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-5 text-white">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CalendarDays className="w-5 h-5 text-white/80" />
                                                <span className="text-sm font-medium text-white/80">Otonan Berikutnya</span>
                                            </div>
                                            <p className="text-xl font-bold">
                                                {nextOtonan.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-sm text-white/80">
                                                    {nextOtonan.daysUntil === 0 ? '🎉 Hari ini!' : `${nextOtonan.daysUntil} hari lagi`}
                                                </span>
                                                <a
                                                    href={handleGoogleCalendarLink(nextOtonan)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    Google Calendar
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Otonan List */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-stone-700 mb-3">Jadwal Otonan</h3>
                                        <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                                            {otonanDates.map((otonan, idx) => {
                                                const isPast = otonan.daysUntil < 0;
                                                const isToday = otonan.daysUntil === 0;
                                                const isNext = otonan === nextOtonan;

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${isToday ? 'bg-amber-50 border-amber-300' :
                                                                isNext ? 'bg-brand-50 border-brand-200' :
                                                                    isPast ? 'bg-stone-50 border-stone-100 opacity-60' :
                                                                        'bg-white border-stone-200 hover:border-stone-300'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isToday ? 'bg-amber-500 text-white' :
                                                                    isNext ? 'bg-brand-600 text-white' :
                                                                        isPast ? 'bg-stone-200 text-stone-500' :
                                                                            'bg-stone-100 text-stone-600'
                                                                }`}>
                                                                <span style={{ fontFamily: 'Noto Sans Balinese, sans-serif', fontSize: '14px' }}>
                                                                    {toBalineseDigits(otonan.date.getDate())}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className={`text-sm font-medium ${isPast ? 'text-stone-500' : 'text-stone-800'}`}>
                                                                    {otonan.date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                                                                </p>
                                                                <p className="text-[11px] text-stone-400">
                                                                    {otonan.baliDate.saptawara.name.split(' (')[0]}, {otonan.baliDate.pancawara.name}, Wuku {otonan.baliDate.wuku.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-xs font-medium ${isToday ? 'text-amber-600' :
                                                                    isPast ? 'text-stone-400' :
                                                                        'text-stone-500'
                                                                }`}>
                                                                {isToday ? '🎉 Hari ini!' :
                                                                    isPast ? `${Math.abs(otonan.daysUntil)} hari lalu` :
                                                                        `${otonan.daysUntil} hari`}
                                                            </span>
                                                            {!isPast && (
                                                                <a
                                                                    href={handleGoogleCalendarLink(otonan)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1.5 text-stone-400 hover:text-brand-600 transition-colors"
                                                                    title="Tambah ke Google Calendar"
                                                                >
                                                                    <ChevronRight className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Empty State */}
                        {!showResults && (
                            <div className="text-center py-8 text-stone-400">
                                <Gift className="w-12 h-12 mx-auto mb-3 text-stone-300" />
                                <p className="text-sm">Masukkan tanggal lahir untuk menghitung Otonan</p>
                                <p className="text-xs mt-1">Otonan jatuh setiap 210 hari (1 siklus Pawukon)</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm font-medium rounded-xl transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
