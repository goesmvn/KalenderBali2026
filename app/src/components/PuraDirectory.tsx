import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, CalendarDays, Clock, Building2, X } from 'lucide-react';
import { findNextPiodalan, type PuraBase } from '@/utils/next-piodalan';


export function PuraDirectory() {
    const { t, i18n } = useTranslation();
    const [puras, setPuras] = useState<PuraBase[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedPura, setSelectedPura] = useState<PuraBase | null>(null);

    useEffect(() => {
        const fetchPura = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
                const res = await fetch(`${API_URL}/pura`);
                if (res.ok) {
                    const data = await res.json();
                    setPuras(data);
                }
            } catch (err) {
                console.error('Failed to fetch pura data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPura();
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(puras.map(p => p.kategori));
        return ['all', ...Array.from(cats)].sort();
    }, [puras]);

    const filteredPuras = useMemo(() => {
        return puras.filter(pura => {
            const matchesSearch = pura.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (pura.alias && pura.alias.toLowerCase().includes(searchQuery.toLowerCase())) ||
                pura.kabupaten.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || pura.kategori === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [puras, searchQuery, selectedCategory]);

    // Format category nicely
    const formatCategory = (cat: string) => {
        return cat.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    const nextPiodalanCache = useMemo(() => {
        const cache: Record<number, Date | null> = {};
        puras.forEach(p => {
            if (p.id) cache[p.id] = findNextPiodalan(p);
        });
        return cache;
    }, [puras]);

    const calculateDaysLeft = (targetDate: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diffTime = targetDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{t('pura_directory.title')}</h1>
                <p className="text-stone-500 max-w-2xl mx-auto text-lg">{t('pura_directory.subtitle')}</p>
            </div>

            {/* Search & Filter */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-stone-200 mb-8 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <input
                            type="text"
                            placeholder={t('pura_directory.search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-stone-800"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                ? 'bg-brand-600 text-white shadow-sm'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                        >
                            {cat === 'all' ? t('pura_directory.all_categories') : formatCategory(cat)}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPuras.map(pura => {
                        const nextDate = pura.id ? nextPiodalanCache[pura.id] : null;
                        const daysLeft = nextDate ? calculateDaysLeft(nextDate) : null;

                        return (
                            <motion.div
                                key={pura.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group flex flex-col"
                                onClick={() => setSelectedPura(pura)}
                            >
                                <div className="h-48 bg-stone-100 relative overflow-hidden shrink-0">
                                    {pura.fotoUrl ? (
                                        <img src={pura.fotoUrl} alt={pura.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                                            <Building2 className="w-12 h-12 opacity-50" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-brand-700 text-xs font-bold rounded-full shadow-sm">
                                            {formatCategory(pura.kategori)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-brand-600 transition-colors">{pura.nama}</h3>
                                    {pura.alias && <p className="text-sm text-stone-500 mb-3 italic">Pura {pura.alias}</p>}

                                    <div className="mt-2 space-y-2 mb-4 flex-1">
                                        <div className="flex items-start gap-2 text-stone-600 text-sm">
                                            <MapPin className="w-4 h-4 mt-0.5 text-stone-400 shrink-0" />
                                            <span>{pura.desa ? `${pura.desa}, ` : ''}{pura.kecamatan ? `${pura.kecamatan}, ` : ''}{pura.kabupaten}</span>
                                        </div>
                                    </div>

                                    {nextDate && (
                                        <div className="bg-brand-50 rounded-xl p-3 border border-brand-100 mt-auto">
                                            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                <CalendarDays className="w-3.5 h-3.5" /> {t('pura_directory.nearest_piodalan')}
                                            </p>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="font-medium text-stone-800">
                                                        {nextDate.toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </p>
                                                    <p className="text-xs text-stone-500 mt-0.5">
                                                        {pura.piodalanTipe === 'pawukon'
                                                            ? `${pura.piodalanSaptawara} ${pura.piodalanPancawara} ${pura.piodalanWuku}`
                                                            : `${pura.piodalanTipe === 'purnama' ? 'Purnama' : 'Tilem'} Sasih ${pura.piodalanSasih}`}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    {daysLeft !== null && daysLeft <= 30 && daysLeft > 0 ? (
                                                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                                                            <Clock className="w-3 h-3" /> H-{daysLeft}
                                                        </span>
                                                    ) : daysLeft === 0 ? (
                                                        <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-600/20">
                                                            {t('pura_directory.today')}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {filteredPuras.length === 0 && !loading && (
                <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
                    <p className="text-stone-500 text-lg">{t('pura_directory.no_results')}</p>
                </div>
            )}

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedPura && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm"
                        onClick={() => setSelectedPura(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedPura(null)} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors backdrop-blur">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="h-64 bg-stone-200 relative shrink-0">
                                {selectedPura.fotoUrl ? (
                                    <img src={selectedPura.fotoUrl} alt={selectedPura.nama} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-100">
                                        <Building2 className="w-16 h-16 opacity-30 mb-2" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-full mb-3 inline-block shadow-sm">
                                        {formatCategory(selectedPura.kategori)}
                                    </span>
                                    <h2 className="text-3xl font-bold text-white leading-tight">{selectedPura.nama}</h2>
                                </div>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1 bg-stone-50">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white p-4 rounded-xl border border-stone-200">
                                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('pura_directory.location')}</p>
                                        <p className="text-stone-800 font-medium">
                                            {selectedPura.alamat && `${selectedPura.alamat}, `}
                                            {selectedPura.desa && `Desa ${selectedPura.desa}, `}
                                            {selectedPura.kecamatan && `Kec. ${selectedPura.kecamatan}, `}
                                            Kab. {selectedPura.kabupaten}
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-stone-200">
                                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('pura_directory.schedule')}</p>
                                        <p className="text-stone-800 font-medium capitalize">
                                            {t('pura_directory.type')} {selectedPura.piodalanTipe}
                                        </p>
                                        <p className="text-stone-500 text-sm mt-0.5">
                                            {selectedPura.piodalanTipe === 'pawukon'
                                                ? `${selectedPura.piodalanSaptawara} ${selectedPura.piodalanPancawara} ${selectedPura.piodalanWuku}`
                                                : `${selectedPura.piodalanTipe === 'purnama' ? 'Purnama' : 'Tilem'} Sasih ${selectedPura.piodalanSasih}`}
                                        </p>
                                        {selectedPura.id && nextPiodalanCache[selectedPura.id] && (
                                            <p className="mt-2 text-brand-600 font-bold text-sm bg-brand-50 px-2 py-1 rounded inline-block border border-brand-100">
                                                {t('pura_directory.next')}: {nextPiodalanCache[selectedPura.id]?.toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {selectedPura.deskripsi && (
                                    <div className="mb-8">
                                        <h4 className="text-lg font-bold text-stone-900 mb-3 border-b pb-2">{t('pura_directory.description')}</h4>
                                        <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">{selectedPura.deskripsi}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
