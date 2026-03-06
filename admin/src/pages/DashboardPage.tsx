import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Database,
    Star,
    CalendarDays,
    BookOpen,
    Award,
    Settings2,
} from 'lucide-react';

interface Stats {
    dewasaAyu: number;
    wewaran: number;
    wuku: number;
    sasih: number;
    pewatekan: number;
    banten: number;
    rahinan: number;
    settings: number;
}

const statCards = [
    { key: 'dewasaAyu', label: 'Dewasa Ayu', icon: Star, color: 'from-indigo-500 to-indigo-600' },
    { key: 'wuku', label: 'Wuku', icon: CalendarDays, color: 'from-emerald-500 to-emerald-600' },
    { key: 'wewaran', label: 'Wewaran', icon: Database, color: 'from-violet-500 to-violet-600' },
    { key: 'sasih', label: 'Sasih', icon: CalendarDays, color: 'from-sky-500 to-sky-600' },
    { key: 'rahinan', label: 'Rahinan', icon: BookOpen, color: 'from-rose-500 to-rose-600' },
    { key: 'pewatekan', label: 'Pewatekan', icon: Award, color: 'from-amber-500 to-amber-600' },
    { key: 'banten', label: 'Banten', icon: Settings2, color: 'from-teal-500 to-teal-600' },
    { key: 'settings', label: 'Settings', icon: Settings2, color: 'from-slate-500 to-slate-600' },
];

export function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [puraCount, setPuraCount] = useState(0);
    const [ceremonyCount, setCeremonyCount] = useState(0);

    useEffect(() => {
        api.get<Stats>('/master/stats').then(setStats);
        api.get<any[]>('/pura').then(data => setPuraCount(data.length));
        api.get<any[]>('/ceremonies').then(data => setCeremonyCount(data.length));
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <LayoutDashboard className="w-7 h-7 text-brand-600" />
                    Dashboard
                </h1>
                <p className="text-slate-500 mt-1">Selamat datang di panel administrasi Kalender Bali</p>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                    className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-lg shadow-brand-600/20"
                >
                    <span className="text-4xl mb-2 block">🛕</span>
                    <h3 className="text-3xl font-bold">{puraCount}</h3>
                    <p className="text-brand-100 text-sm">Pura & Merajan</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg shadow-indigo-600/20"
                >
                    <span className="text-4xl mb-2 block">🎯</span>
                    <h3 className="text-3xl font-bold">{ceremonyCount}</h3>
                    <p className="text-indigo-100 text-sm">Jenis Upacara (Dewasa)</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg shadow-emerald-600/20"
                >
                    <span className="text-4xl mb-2 block">⭐</span>
                    <h3 className="text-3xl font-bold">{stats?.dewasaAyu || 0}</h3>
                    <p className="text-emerald-100 text-sm">Dewasa Ayu</p>
                </motion.div>
            </div>

            {/* Master Data Grid */}
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Master Data</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${card.color} mb-3`}>
                            <card.icon className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900">
                            {stats ? (stats as any)[card.key] : '—'}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
