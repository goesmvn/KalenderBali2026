import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getBaliDate, getAksaraBaliSaptawara, getAksaraBaliWuku, toBalineseDigits, formatAksaraBaliDate, BALI_HOLIDAYS } from '@/utils/bali-calendar';
import { getNationalHolidays } from '@/utils/holidays';
import { getPiodalan } from '@/utils/piodalan-data';
import { CalendarDays, Star, Sparkles, MapPin, Sun, Moon } from 'lucide-react';

export function TodayWidget() {
    const { t, i18n } = useTranslation();
    const today = new Date();
    const baliDate = getBaliDate(today);
    const [holidays, setHolidays] = useState<Record<string, string[]>>({});

    useEffect(() => {
        getNationalHolidays(today.getFullYear()).then(setHolidays);
    }, []);

    // Date key
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const todayNationalHolidays = holidays[todayStr] || [];
    const baliHolidayList: string[] = baliDate.events.filter(e => BALI_HOLIDAYS.includes(e));
    const piodalan = getPiodalan(baliDate);

    const isPurnama = baliDate.purnamaTilem?.type === 'Purnama';
    const isTilem = baliDate.purnamaTilem?.type === 'Tilem';

    return (
        <div className="min-h-0 bg-transparent flex flex-col font-sans">
            {/* Header */}
            <a href="https://kalenderbali.id" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 py-4 px-5 flex flex-col items-center text-white hover:opacity-95 transition-opacity">
                <div className="flex items-center gap-2 mb-1">
                    <CalendarDays className="w-5 h-5" />
                    <span className="text-base font-extrabold tracking-tight">
                        KalenderBali<span className="text-red-200">.id</span>
                    </span>
                </div>
                <p className="text-white/90 text-sm font-medium">
                    {today.toLocaleDateString(i18n.language === 'id' ? 'id-ID' : (i18n.language === 'ja' ? 'ja-JP' : (i18n.language === 'ru' ? 'ru-RU' : 'en-US')), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                {getAksaraBaliSaptawara(baliDate.saptawara.name) && (
                    <p className="text-white/80 text-xl mt-1" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                        {getAksaraBaliSaptawara(baliDate.saptawara.name)}
                    </p>
                )}
            </a>

            {/* Content */}
            <div className="p-4 bg-white flex-1">
                {/* Purnama / Tilem */}
                {(isPurnama || isTilem) && (
                    <div className={`flex items-center gap-2 justify-center py-2 px-3 rounded-lg border mb-3 ${isPurnama ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-indigo-50 border-indigo-200 text-indigo-800'}`}>
                        {isPurnama ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        <span className="text-sm font-bold">{isPurnama ? t('today_widget.purnama_today') : t('today_widget.tilem_today')}</span>
                    </div>
                )}

                {/* Wuku Card */}
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 mb-3">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">{t('date_detail.wuku')}</span>
                        <span className="px-2 py-0.5 bg-brand-100 text-brand-800 text-[10px] font-semibold rounded-full" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                            Ke-{baliDate.wukuNumber} ({toBalineseDigits(baliDate.wukuNumber)})
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-stone-800">{baliDate.wuku.name}</span>
                        {getAksaraBaliWuku(baliDate.wuku.name) && (
                            <span className="text-base text-brand-600" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                                {getAksaraBaliWuku(baliDate.wuku.name)}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-stone-500">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-brand-500" /> Urip: {baliDate.wuku.urip}</span>
                        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-indigo-400" /> {baliDate.wuku.dewata}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-400" /> {baliDate.wuku.letak}</span>
                    </div>
                </div>

                {/* Wewaran Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-100">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">Saptawara</span>
                        <p className="text-sm font-semibold text-stone-800">{baliDate.saptawara.name}</p>
                    </div>
                    <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-100">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">Pancawara</span>
                        <p className="text-sm font-semibold text-stone-800">{baliDate.pancawara.name.split(' ')[0]}</p>
                    </div>
                    <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-100">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">{t('date_detail.sasih')}</span>
                        <p className="text-sm font-semibold text-stone-800">{baliDate.sasih.name.split(' ')[1]}</p>
                    </div>
                    <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-100">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">{t('date_detail.saka_year')}</span>
                        <p className="text-sm font-semibold text-stone-800">{baliDate.sakaYear}</p>
                    </div>
                </div>

                {/* Holidays & Events */}
                {(todayNationalHolidays.length > 0 || baliDate.events.length > 0 || baliHolidayList.length > 0 || piodalan.length > 0) && (
                    <div className="border-t border-stone-100 pt-3">
                        <span className="text-xs text-stone-400 font-medium block mb-2">{t('today_widget.holidays')}</span>
                        <div className="flex flex-col gap-1.5">
                            {todayNationalHolidays.map((h: string, i: number) => (
                                <div key={`nh-${i}`} className="flex items-center gap-1.5 text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                    <span className="text-red-700 font-semibold">{h}</span>
                                </div>
                            ))}
                            {baliHolidayList.map((h: string, i: number) => (
                                <div key={`bh-${i}`} className="flex items-center gap-1.5 text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                                    <span className="text-brand-700 font-medium">{h}</span>
                                </div>
                            ))}
                            {baliDate.events.map((evt: string, i: number) => (
                                <div key={`evt-${i}`} className="flex items-center gap-1.5 text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                                    <span className="text-brand-700 font-medium">{evt}</span>
                                </div>
                            ))}
                            {piodalan.slice(0, 3).map((p: string, i: number) => (
                                <div key={`pio-${i}`} className="flex items-center gap-1.5 text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                    <span className="text-amber-700 font-medium">{p}</span>
                                </div>
                            ))}
                            {piodalan.length > 3 && (
                                <span className="text-[10px] text-stone-400 ml-3">{t('today_widget.more_piodalan', { count: piodalan.length - 3 })}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* No events fallback */}
                {todayNationalHolidays.length === 0 && baliDate.events.length === 0 && baliHolidayList.length === 0 && piodalan.length === 0 && !isPurnama && !isTilem && (
                    <div className="text-center py-2 text-xs text-stone-400">
                        {t('today_widget.no_events')}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="text-center py-2.5 bg-stone-50 border-t border-stone-100 flex flex-col items-center gap-1">
                <span className="text-xs text-brand-600" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                    {formatAksaraBaliDate(today, baliDate.sakaYear)}
                </span>
                <a href="https://kalenderbali.id" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-brand-700 hover:underline">
                    KalenderBali.id
                </a>
            </div>
        </div>
    );
}
