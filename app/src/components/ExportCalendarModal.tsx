import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check, Calendar, Sun, Sparkles, Flag } from 'lucide-react';
import { collectBaliEvents, collectNationalHolidays, generateICS, downloadICS } from '@/utils/ics-generator';
import type { } from '@/utils/ics-generator';
import { useTranslation } from 'react-i18next';

interface ExportCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExportCalendarModal({ isOpen, onClose }: ExportCalendarModalProps) {
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [includeBali, setIncludeBali] = useState(true);
    const [includePurnama, setIncludePurnama] = useState(true);
    const [includeNational, setIncludeNational] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    // Collect Bali events (sync, computed from calendar logic)
    const baliEvents = useMemo(() => collectBaliEvents(year), [year]);

    // National holidays (async)
    const [nationalEvents, setNationalEvents] = useState<Awaited<ReturnType<typeof collectNationalHolidays>>>([]);
    useEffect(() => {
        collectNationalHolidays(year).then(setNationalEvents);
    }, [year]);

    // Filter events
    const filteredEvents = useMemo(() => {
        const result = [];
        if (includeBali) {
            result.push(...baliEvents.filter(e => e.category === 'bali'));
        }
        if (includePurnama) {
            result.push(...baliEvents.filter(e => e.category === 'purnama' || e.category === 'tilem'));
        }
        if (includeNational) {
            result.push(...nationalEvents);
        }
        return result.sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [baliEvents, nationalEvents, includeBali, includePurnama, includeNational]);

    // Stats
    const stats = useMemo(() => ({
        bali: baliEvents.filter(e => e.category === 'bali').length,
        purnama: baliEvents.filter(e => e.category === 'purnama').length,
        tilem: baliEvents.filter(e => e.category === 'tilem').length,
        national: nationalEvents.length,
    }), [baliEvents, nationalEvents]);

    const handleDownload = async () => {
        setIsGenerating(true);
        // Small delay for UX feel
        await new Promise(r => setTimeout(r, 300));
        const ics = generateICS(filteredEvents, `Kalender Bali ${year}`);
        downloadICS(ics, `kalender-bali-${year}.ics`);
        setIsGenerating(false);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3000);
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
                    <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{t('export_calendar.title')}</h2>
                                    <p className="text-white/80 text-sm">{t('export_calendar.subtitle')}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <div className="space-y-5">

                            {/* Year Selector */}
                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-2">{t('export_calendar.select_year')}</label>
                                <div className="flex gap-2">
                                    {[currentYear - 1, currentYear, currentYear + 1].map(y => (
                                        <button
                                            key={y}
                                            onClick={() => setYear(y)}
                                            className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${year === y
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                : 'border-stone-200 hover:border-emerald-200 text-stone-600'
                                                }`}
                                        >
                                            {y}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Event Type Filters */}
                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-3">{t('export_calendar.select_event_type')}</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100 cursor-pointer hover:bg-stone-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={includeBali}
                                            onChange={(e) => setIncludeBali(e.target.checked)}
                                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <Sparkles className="w-4 h-4 text-brand-600" />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-stone-800">{t('export_calendar.hari_raya')}</span>
                                            <span className="text-xs text-stone-400 ml-2">({stats.bali} {t('export_calendar.total_event').split(' ')[1] || 'event'})</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100 cursor-pointer hover:bg-stone-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={includePurnama}
                                            onChange={(e) => setIncludePurnama(e.target.checked)}
                                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <Sun className="w-4 h-4 text-amber-500" />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-stone-800">{t('export_calendar.purnama_tilem')}</span>
                                            <span className="text-xs text-stone-400 ml-2">({stats.purnama + stats.tilem} {t('export_calendar.total_event').split(' ')[1] || 'event'})</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100 cursor-pointer hover:bg-stone-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={includeNational}
                                            onChange={(e) => setIncludeNational(e.target.checked)}
                                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <Flag className="w-4 h-4 text-red-500" />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-stone-800">{t('export_calendar.national')}</span>
                                            <span className="text-xs text-stone-400 ml-2">({stats.national} {t('export_calendar.total_event').split(' ')[1] || 'event'})</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Preview */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-stone-700">{t('export_calendar.preview')}</span>
                                    <span className="text-xs text-stone-400">{filteredEvents.length} {t('export_calendar.total_event')}</span>
                                </div>
                                <div className="max-h-[200px] overflow-y-auto border border-stone-200 rounded-xl divide-y divide-stone-100">
                                    {filteredEvents.length === 0 ? (
                                        <div className="p-4 text-center text-sm text-stone-400">{t('export_calendar.min_one')}</div>
                                    ) : (
                                        filteredEvents.slice(0, 50).map((evt, i) => (
                                            <div key={i} className="flex items-center gap-3 px-3 py-2">
                                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${evt.category === 'national' ? 'bg-red-500' :
                                                    evt.category === 'purnama' ? 'bg-amber-500' :
                                                        evt.category === 'tilem' ? 'bg-indigo-500' :
                                                            'bg-brand-500'
                                                    }`} />
                                                <span className="text-xs text-stone-500 w-20 shrink-0">
                                                    {evt.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                </span>
                                                <span className="text-xs text-stone-700 font-medium truncate">{evt.title}</span>
                                            </div>
                                        ))
                                    )}
                                    {filteredEvents.length > 50 && (
                                        <div className="p-2 text-center text-[10px] text-stone-400">
                                            {t('export_calendar.more_events', { count: filteredEvents.length - 50 })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
                        <p className="text-xs text-stone-400">
                            {t('export_calendar.footer_info')}
                        </p>
                        <button
                            onClick={handleDownload}
                            disabled={filteredEvents.length === 0 || isGenerating}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${downloaded
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-stone-300'
                                }`}
                        >
                            {downloaded ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    {t('export_calendar.downloaded')}
                                </>
                            ) : isGenerating ? (
                                t('export_calendar.downloading')
                            ) : (
                                <>
                                    <Download className="w-4 h-4" />
                                    {t('export_calendar.download_btn')}
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
