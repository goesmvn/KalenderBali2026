import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Map, Info, AlertTriangle, PhoneCall, ChevronDown, ChevronUp, Sun, Sparkles, VolumeX, Flame, Check, Share2, Copy } from 'lucide-react';
import { getBaliDate } from '@/utils/bali-calendar';
import { useTranslation } from 'react-i18next';

interface NyepiGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NyepiGuide({ isOpen, onClose }: NyepiGuideProps) {
    const { t, i18n } = useTranslation();
    // Determine the next Nyepi date (search up to 2 years ahead)
    const [nyepiDate, setNyepiDate] = useState<Date | null>(null);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [activeTab, setActiveTab] = useState<'guide' | 'timeline' | 'emergency'>('guide');
    const [openAccordion, setOpenAccordion] = useState<string | null>('catur-brata');
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    // Share Handler
    const handleShare = async () => {
        const shareUrl = `https://kalenderbali.id/?nyepi=true&lng=${i18n.language}`;
        const shareData = {
            title: t('nyepi.title') + ' - KalenderBali.id',
            text: t('nyepi.subtitle'),
            url: shareUrl
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            setShowShareMenu(!showShareMenu);
        }
    };

    const handleCopyLink = async () => {
        try {
            const shareUrl = `https://kalenderbali.id/?nyepi=true&lng=${i18n.language}`;
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowShareMenu(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Find Nyepi date
    useEffect(() => {
        const findNyepi = async () => {
            const today = new Date();
            const currentYear = today.getFullYear();

            for (let year = currentYear; year <= currentYear + 2; year++) {
                // Usually in March
                for (let month = 2; month <= 3; month++) {
                    for (let day = 1; day <= 31; day++) {
                        const date = new Date(year, month, day);
                        // Skip invalid dates (like Feb 30)
                        if (date.getMonth() !== month) continue;

                        const baliDate = getBaliDate(date);
                        if (baliDate.events.includes('Hari Raya Nyepi') && date > today) {
                            setNyepiDate(date);
                            return;
                        }
                    }
                }
            }
        };
        findNyepi();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (!nyepiDate) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            // Nyepi starts at 06:00 AM Bali Time
            const target = new Date(nyepiDate);
            target.setHours(6, 0, 0, 0);

            const distance = target.getTime() - now;

            if (distance < 0) {
                // If currently Nyepi (within 24 hours of start)
                if (distance > -24 * 60 * 60 * 1000) {
                    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                } else {
                    // Nyepi is over, we should find next year's (requires reload or re-running findNyepi)
                }
                return;
            }

            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [nyepiDate]);

    if (!isOpen) return null;

    const timeline = nyepiDate ? [
        {
            day: t('nyepi.timeline_melasti_day'),
            date: new Date(nyepiDate.getTime() - 3 * 24 * 60 * 60 * 1000),
            title: t('nyepi.timeline_melasti_title'),
            desc: t('nyepi.timeline_melasti_desc'),
            icon: <Map className="w-5 h-5 text-blue-500" />
        },
        {
            day: t('nyepi.timeline_pengerupukan_day'),
            date: new Date(nyepiDate.getTime() - 1 * 24 * 60 * 60 * 1000),
            title: t('nyepi.timeline_pengerupukan_title'),
            desc: t('nyepi.timeline_pengerupukan_desc'),
            icon: <Flame className="w-5 h-5 text-orange-500" />
        },
        {
            day: t('nyepi.timeline_nyepi_day'),
            date: nyepiDate,
            title: t('nyepi.timeline_nyepi_title'),
            desc: t('nyepi.timeline_nyepi_desc'),
            icon: <Moon className="w-5 h-5 text-indigo-400" />
        },
        {
            day: t('nyepi.timeline_ngembak_day'),
            date: new Date(nyepiDate.getTime() + 1 * 24 * 60 * 60 * 1000),
            title: t('nyepi.timeline_ngembak_title'),
            desc: t('nyepi.timeline_ngembak_desc'),
            icon: <Sun className="w-5 h-5 text-amber-500" />
        }
    ] : [];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-stone-950/80 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                    className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl bg-[#0f1115] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Dark Theme */}
                    <div className="relative pt-12 pb-6 px-6 bg-gradient-to-b from-indigo-950 to-[#0f1115] overflow-hidden shrink-0">
                        {/* Stars background pattern */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                            <div className="relative">
                                <button onClick={handleShare} className="p-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-2">
                                    <Share2 className="w-5 h-5" />
                                </button>

                                <AnimatePresence>
                                    {showShareMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 py-1 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => {
                                                    const shareUrl = `https://kalenderbali.id/?nyepi=true&lng=${i18n.language}`;
                                                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(t('nyepi.title') + ' - ' + t('nyepi.subtitle') + '\n\n' + shareUrl)}`, '_blank');
                                                    setShowShareMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm md:text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-2 transition-colors"
                                            >
                                                Bagikan ke WhatsApp
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const shareUrl = `https://kalenderbali.id/?nyepi=true&lng=${i18n.language}`;
                                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t('nyepi.title') + ' - ' + t('nyepi.subtitle'))}&url=${encodeURIComponent(shareUrl)}`, '_blank');
                                                    setShowShareMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm md:text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-2 transition-colors"
                                            >
                                                Bagikan ke X/Twitter
                                            </button>
                                            <div className="h-px bg-stone-100 my-1"></div>
                                            <button
                                                onClick={handleCopyLink}
                                                className="w-full text-left px-4 py-2.5 text-sm md:text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-2 transition-colors"
                                            >
                                                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                                {copied ? <span className="text-emerald-600">Tersalin!</span> : 'Salin Link'}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <button onClick={onClose} className="p-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 text-indigo-300 rounded-full mb-4 ring-1 ring-indigo-500/30">
                                <Moon className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{t('nyepi.title')}</h2>
                            <p className="text-indigo-200/70 text-sm">{t('nyepi.subtitle')}</p>
                        </div>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 overflow-y-auto bg-[#0f1115]">
                        <div className="p-6">

                            {/* Countdown */}
                            {nyepiDate && (
                                <div className="mb-8">
                                    <h3 className="text-center text-xs font-bold tracking-widest text-indigo-400 uppercase mb-4">{t('nyepi.countdown_title', { year: nyepiDate.getFullYear() })}</h3>
                                    <div className="flex justify-center gap-3">
                                        {[
                                            { label: t('nyepi.days'), value: countdown.days },
                                            { label: t('nyepi.hours'), value: countdown.hours },
                                            { label: t('nyepi.minutes'), value: countdown.minutes },
                                            { label: t('nyepi.seconds'), value: countdown.seconds }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col items-center">
                                                <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-950/50 rounded-2xl border border-indigo-500/20 flex items-center justify-center shadow-inner">
                                                    <span className="text-2xl md:text-3xl font-light text-white tabular-nums tracking-tight">
                                                        {String(item.value).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] md:text-xs font-medium text-indigo-300/60 mt-2 uppercase tracking-wider">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tabs */}
                            <div className="flex p-1 bg-indigo-950/30 rounded-xl mb-6">
                                {[
                                    { id: 'guide', label: t('nyepi.tab_guide') },
                                    { id: 'timeline', label: t('nyepi.tab_timeline') },
                                    { id: 'emergency', label: t('nyepi.tab_emergency') }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === tab.id
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'text-indigo-300/70 hover:text-indigo-200 hover:bg-indigo-900/40'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content: Guide */}
                            {activeTab === 'guide' && (
                                <div className="space-y-4">
                                    <div className="bg-indigo-950/30 rounded-2xl border border-indigo-500/20 overflow-hidden">
                                        <button
                                            onClick={() => setOpenAccordion(openAccordion === 'catur-brata' ? null : 'catur-brata')}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <VolumeX className="w-5 h-5 text-indigo-400" />
                                                <span className="font-semibold text-white">{t('nyepi.catur_brata_title')}</span>
                                            </div>
                                            {openAccordion === 'catur-brata' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-indigo-400" />}
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === 'catur-brata' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-4 pb-4 text-indigo-200/80 text-sm space-y-3"
                                                >
                                                    <p><strong className="text-white">{t('nyepi.catur_brata_1_title')}</strong> {t('nyepi.catur_brata_1_desc')}</p>
                                                    <p><strong className="text-white">{t('nyepi.catur_brata_2_title')}</strong> {t('nyepi.catur_brata_2_desc')}</p>
                                                    <p><strong className="text-white">{t('nyepi.catur_brata_3_title')}</strong> {t('nyepi.catur_brata_3_desc')}</p>
                                                    <p><strong className="text-white">{t('nyepi.catur_brata_4_title')}</strong> {t('nyepi.catur_brata_4_desc')}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="bg-green-950/30 rounded-2xl border border-green-500/20 overflow-hidden">
                                        <button
                                            onClick={() => setOpenAccordion(openAccordion === 'dos' ? null : 'dos')}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Check className="w-5 h-5 text-green-400" />
                                                <span className="font-semibold text-white">{t('nyepi.dos_title')}</span>
                                            </div>
                                            {openAccordion === 'dos' ? <ChevronUp className="w-5 h-5 text-green-400" /> : <ChevronDown className="w-5 h-5 text-green-400" />}
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === 'dos' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-4 pb-4 text-green-200/80 text-sm space-y-2"
                                                >
                                                    <ul className="list-disc pl-5 space-y-2">
                                                        <li>{t('nyepi.dos_1')}</li>
                                                        <li>{t('nyepi.dos_2')}</li>
                                                        <li>{t('nyepi.dos_3')}</li>
                                                        <li>{t('nyepi.dos_4')}</li>
                                                        <li>{t('nyepi.dos_5')}</li>
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="bg-red-950/30 rounded-2xl border border-red-500/20 overflow-hidden">
                                        <button
                                            onClick={() => setOpenAccordion(openAccordion === 'donts' ? null : 'donts')}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                                <span className="font-semibold text-white">{t('nyepi.donts_title')}</span>
                                            </div>
                                            {openAccordion === 'donts' ? <ChevronUp className="w-5 h-5 text-red-400" /> : <ChevronDown className="w-5 h-5 text-red-400" />}
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === 'donts' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-4 pb-4 text-red-200/80 text-sm space-y-2"
                                                >
                                                    <ul className="list-disc pl-5 space-y-2">
                                                        <li><strong>{t('nyepi.donts_1_title')}</strong>{t('nyepi.donts_1_desc')}</li>
                                                        <li>{t('nyepi.donts_2')}</li>
                                                        <li>{t('nyepi.donts_3')}</li>
                                                        <li>{t('nyepi.donts_4')}</li>
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}

                            {/* Tab Content: Timeline */}
                            {activeTab === 'timeline' && (
                                <div className="relative border-l-2 border-indigo-500/30 ml-3 md:ml-6 pl-6 md:pl-8 space-y-8 pb-4">
                                    {timeline.map((item, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[35px] md:-left-[43px] top-0 w-8 h-8 md:w-10 md:h-10 bg-[#0f1115] border-2 border-indigo-500/50 rounded-full flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">{item.day} — {new Date(item.date).toLocaleDateString(i18n.language === 'id' ? 'id-ID' : (i18n.language === 'ja' ? 'ja-JP' : (i18n.language === 'ru' ? 'ru-RU' : 'en-US')), { day: 'numeric', month: 'short' })}</span>
                                                <h4 className="text-lg font-bold text-white mt-1 mb-2">{item.title}</h4>
                                                <p className="text-sm text-indigo-200/70 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Tab Content: Emergency */}
                            {activeTab === 'emergency' && (
                                <div className="space-y-4">
                                    <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl mb-6">
                                        <div className="flex gap-3">
                                            <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                                            <p className="text-sm text-orange-200/90 leading-relaxed">
                                                {t('nyepi.emergency_warning')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { name: t('nyepi.contact_ambulance'), number: '118', icon: <PhoneCall className="w-4 h-4" /> },
                                            { name: t('nyepi.contact_police'), number: '110', icon: <PhoneCall className="w-4 h-4" /> },
                                            { name: t('nyepi.contact_fire'), number: '113', icon: <PhoneCall className="w-4 h-4" /> },
                                            { name: t('nyepi.contact_sar'), number: '115', icon: <PhoneCall className="w-4 h-4" /> },
                                            { name: t('nyepi.contact_callcenter'), number: '112', icon: <Sparkles className="w-4 h-4" /> },
                                        ].map((contact, i) => (
                                            <a
                                                key={i}
                                                href={`tel:${contact.number}`}
                                                className="flex items-center justify-between p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl hover:bg-indigo-900/40 transition-colors group"
                                            >
                                                <span className="font-medium text-indigo-100">{contact.name}</span>
                                                <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1.5 rounded-lg group-hover:bg-indigo-500/20">
                                                    {contact.icon}
                                                    {contact.number}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
