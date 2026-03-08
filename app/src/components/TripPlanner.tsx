import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CalendarDays, PlaneTakeoff, Sun, Filter } from 'lucide-react';
import { findLongWeekends, type RecommendedTrip } from '@/utils/trip-planner';
import { getNationalHolidays } from '@/utils/holidays';

export function TripPlanner() {
    const { t, i18n } = useTranslation();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<number>(currentYear);
    const [holidays, setHolidays] = useState<Record<string, string[]>>({});
    const [filterCeremony, setFilterCeremony] = useState(false);

    useEffect(() => {
        getNationalHolidays(year).then(data => setHolidays(data));
    }, [year]);

    const recommendations = useMemo(() => {
        let recs = findLongWeekends(holidays, year);
        if (filterCeremony) {
            recs = recs.filter(r => r.ceremonies.length > 0);
        }
        return recs;
    }, [holidays, year, filterCeremony]);

    const formatShortDateRange = (start: string, end: string) => {
        const d1 = new Date(start);
        const d2 = new Date(end);
        const locale = i18n.language === 'id' ? 'id-ID' : 'en-US';

        if (d1.getMonth() === d2.getMonth()) {
            return `${d1.getDate()} - ${d2.getDate()} ${d1.toLocaleDateString(locale, { month: 'short' })}`;
        }
        return `${d1.getDate()} ${d1.toLocaleDateString(locale, { month: 'short' })} - ${d2.getDate()} ${d2.toLocaleDateString(locale, { month: 'short' })}`;
    };

    const getMonthName = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' });
    };

    // Group by month for timeline view
    const groupedRecs = useMemo(() => {
        const groups: Record<string, RecommendedTrip[]> = {};
        recommendations.forEach(rec => {
            const key = getMonthName(rec.startDate);
            if (!groups[key]) groups[key] = [];
            groups[key].push(rec);
        });
        return groups;
    }, [recommendations, i18n.language]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 relative">

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-brand-50 rounded-full mb-4 text-brand-600">
                    <PlaneTakeoff className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{t('trip_planner.title')}</h1>
                <p className="text-stone-500 max-w-2xl mx-auto text-lg">{t('trip_planner.desc')}</p>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 mb-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex bg-stone-100 p-1 rounded-xl">
                    {[currentYear, currentYear + 1, currentYear + 2].map(y => (
                        <button
                            key={y}
                            onClick={() => setYear(y)}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${year === y ? 'bg-white shadow text-brand-600' : 'text-stone-600 hover:text-stone-900'
                                }`}
                        >
                            {y}
                        </button>
                    ))}
                </div>

                <label className="flex items-center gap-2 cursor-pointer bg-stone-50 px-4 py-2.5 rounded-xl hover:bg-stone-100 transition-colors border border-stone-200">
                    <input
                        type="checkbox"
                        checked={filterCeremony}
                        onChange={e => setFilterCeremony(e.target.checked)}
                        className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-stone-300"
                    />
                    <Filter className="w-4 h-4 text-stone-500" />
                    <span className="text-stone-700 font-medium text-sm">{t('trip_planner.filter_ceremony')}</span>
                </label>
            </div>

            {/* Timeline */}
            <div className="space-y-12">
                {Object.entries(groupedRecs).map(([month, trips]) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        key={month}
                        className="relative"
                    >
                        <h2 className="text-2xl font-bold border-b border-stone-200 pb-2 mb-6 text-stone-800 flex items-center gap-3">
                            <CalendarDays className="w-6 h-6 text-brand-500" />
                            {month}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trips.map((trip, idx) => (
                                <div key={idx} className="bg-white border text-left border-stone-200 rounded-2xl p-5 hover:shadow-xl hover:border-brand-200 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-brand-50 text-brand-700 px-3 py-1 rounded-lg font-bold text-sm">
                                            {t('trip_planner.holiday')} {trip.totalDays} {t('trip_planner.days')}
                                        </div>
                                        {trip.requiredLeaveDays > 0 ? (
                                            <div className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded">
                                                {t('trip_planner.need_leave', { count: trip.requiredLeaveDays })}
                                            </div>
                                        ) : (
                                            <div className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                                                {t('trip_planner.no_leave')}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-stone-900 mb-1">
                                        {formatShortDateRange(trip.startDate, trip.endDate)}
                                    </h3>

                                    <div className="flex-1 mt-4 space-y-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-1">{t('trip_planner.leave_on')}</p>
                                            {trip.leaveDates.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {trip.leaveDates.map(ld => (
                                                        <span key={ld} className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 rounded text-xs">{new Date(ld).getDate()} {new Date(ld).toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', { month: 'short' })}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-sm text-stone-500 italic">-</span>
                                            )}
                                        </div>

                                        {trip.ceremonies.length > 0 && (
                                            <div className="pt-3 border-t border-stone-100">
                                                <p className="text-xs uppercase tracking-wider font-bold text-brand-400 mb-2 flex items-center gap-1">
                                                    <Sun className="w-3.5 h-3.5" /> {t('trip_planner.sacred_moment')}
                                                </p>
                                                <ul className="space-y-1">
                                                    {trip.ceremonies.map((c, i) => (
                                                        <li key={i} className="text-sm text-stone-700 font-medium">&bull; {c.name} ({new Date(c.date).getDate()} {new Date(c.date).toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', { month: 'short' })})</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {recommendations.length === 0 && (
                    <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
                        <p className="text-stone-500 text-lg">{t('trip_planner.no_results')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
