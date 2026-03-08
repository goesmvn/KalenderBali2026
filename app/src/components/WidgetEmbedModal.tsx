import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Code, CalendarDays, Info } from 'lucide-react';
import { WidgetView } from './WidgetView';
import { TodayWidget } from './TodayWidget';
import { useTranslation } from 'react-i18next';

interface WidgetEmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type WidgetType = 'calendar' | 'today';

export function WidgetEmbedModal({ isOpen, onClose }: WidgetEmbedModalProps) {
    const { t } = useTranslation();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [widgetType, setWidgetType] = useState<WidgetType>('calendar');
    const [copied, setCopied] = useState(false);

    const widgetConfig = {
        calendar: {
            src: `https://kalenderbali.id/?widget=true&theme=${theme}`,
            height: 600,
            maxWidth: 500,
        },
        today: {
            src: `https://kalenderbali.id/?widget=today&theme=${theme}`,
            height: 380,
            maxWidth: 360,
        }
    };

    const config = widgetConfig[widgetType];

    const embedCode = `<iframe 
    src="${config.src}" 
    width="100%" 
    height="${config.height}" 
    frameborder="0" 
    scrolling="no" 
    style="border: 1px solid #e5e7eb; border-radius: 12px; max-width: ${config.maxWidth}px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"
    title="Kalender Bali Widget"
></iframe>`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(embedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
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
                    className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                                <Code className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-stone-800">{t('widget_embed.title')}</h2>
                                <p className="text-sm text-stone-500 mt-0.5">{t('widget_embed.subtitle')}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto">
                        <div className="space-y-6">

                            {/* Widget Type Selector */}
                            <div>
                                <h3 className="text-sm font-semibold text-stone-700 mb-3">{t('widget_embed.step1_title')}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setWidgetType('calendar')}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${widgetType === 'calendar'
                                            ? 'border-brand-500 bg-brand-50'
                                            : 'border-stone-200 hover:border-brand-200 bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <CalendarDays className={`w-4 h-4 ${widgetType === 'calendar' ? 'text-brand-600' : 'text-stone-400'}`} />
                                            <span className="font-semibold text-stone-800">{t('widget_embed.full_cal')}</span>
                                        </div>
                                        <p className="text-xs text-stone-500">{t('widget_embed.full_cal_desc')}</p>
                                    </button>
                                    <button
                                        onClick={() => setWidgetType('today')}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${widgetType === 'today'
                                            ? 'border-brand-500 bg-brand-50'
                                            : 'border-stone-200 hover:border-brand-200 bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Info className={`w-4 h-4 ${widgetType === 'today' ? 'text-brand-600' : 'text-stone-400'}`} />
                                            <span className="font-semibold text-stone-800">{t('widget_embed.today_only')}</span>
                                        </div>
                                        <p className="text-xs text-stone-500">{t('widget_embed.today_only_desc')}</p>
                                    </button>
                                </div>
                            </div>

                            {/* Theme Selector */}
                            <div>
                                <h3 className="text-sm font-semibold text-stone-700 mb-3">{t('widget_embed.step2_title')}</h3>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${theme === 'light'
                                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                                            : 'border-stone-200 hover:border-brand-200 bg-white text-stone-600'
                                            }`}
                                    >
                                        {t('widget_embed.theme_light')}
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${theme === 'dark'
                                            ? 'border-brand-500 bg-stone-900 text-white'
                                            : 'border-stone-200 hover:border-brand-200 bg-stone-800 text-white/70'
                                            }`}
                                    >
                                        {t('widget_embed.theme_dark')}
                                    </button>
                                </div>
                            </div>

                            {/* Code Snippet */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-stone-700">{t('widget_embed.step3_title')}</h3>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                        {copied ? <span className="text-emerald-600">{t('widget_embed.copied')}</span> : t('widget_embed.copy_btn')}
                                    </button>
                                </div>
                                <div className="relative group">
                                    <pre className="bg-stone-900 text-stone-100 p-4 rounded-xl text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                                        <code>{embedCode}</code>
                                    </pre>
                                </div>
                                <p className="text-xs text-stone-500 mt-3 flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">💡</span>
                                    <span>Tempelkan kode ini di dalam Tag HTML situs Anda (mendukung Wordpress, Blogger, React, atau framework lainnya).</span>
                                </p>
                            </div>

                            {/* Preview Section */}
                            <div>
                                <h3 className="text-sm font-semibold text-stone-700 mb-3">4. Pratinjau (Live Preview)</h3>
                                <div className="p-4 bg-stone-100/50 border border-stone-200 rounded-2xl flex justify-center w-full">
                                    <div
                                        className={`w-full bg-white rounded-xl shadow-lg border border-stone-200 overflow-y-auto relative ${theme === 'dark' ? 'invert hue-rotate-180' : ''}`}
                                        style={{ maxWidth: config.maxWidth, height: config.height }}
                                    >
                                        {widgetType === 'calendar' ? (
                                            <WidgetView isPreview={true} />
                                        ) : (
                                            <TodayWidget />
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
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
