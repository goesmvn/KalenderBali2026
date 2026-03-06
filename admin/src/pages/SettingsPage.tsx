import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { Settings, Save, Check } from 'lucide-react';

interface Setting {
    id: number;
    key: string;
    value: string;
    label: string;
    group: string;
    type: string;
}

export function SettingsPage() {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [values, setValues] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState<Set<number>>(new Set());

    const fetchData = async () => {
        setLoading(true);
        const data = await api.get<Setting[]>('/master/settings');
        setSettings(data);
        const vals: Record<number, string> = {};
        data.forEach(s => { vals[s.id] = s.value; });
        setValues(vals);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const saveSetting = async (setting: Setting) => {
        await api.put(`/master/settings/${setting.id}`, { ...setting, value: values[setting.id] });
        setSaved(prev => new Set(prev).add(setting.id));
        setTimeout(() => setSaved(prev => { const next = new Set(prev); next.delete(setting.id); return next; }), 2000);
    };

    const groups = [...new Set(settings.map(s => s.group))];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <Settings className="w-7 h-7 text-brand-600" />
                    Settings
                </h1>
                <p className="text-slate-500 mt-1">Konfigurasi umum aplikasi</p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-400">Memuat...</div>
            ) : (
                <div className="space-y-6">
                    {groups.map(group => (
                        <motion.div key={group} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{group}</h3>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {settings.filter(s => s.group === group).map(setting => (
                                    <div key={setting.id} className="px-5 py-4 flex items-center gap-4">
                                        <div className="flex-1 min-w-0">
                                            <label className="block text-sm font-medium text-slate-800">{setting.label}</label>
                                            <p className="text-xs text-slate-400 mt-0.5">{setting.key}</p>
                                        </div>
                                        <div className="flex items-center gap-2 w-80">
                                            {setting.type === 'boolean' ? (
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" checked={values[setting.id] === 'true'}
                                                        onChange={e => setValues(p => ({ ...p, [setting.id]: e.target.checked ? 'true' : 'false' }))}
                                                        className="rounded" />
                                                    <span className="text-sm text-slate-600">{values[setting.id] === 'true' ? 'Ya' : 'Tidak'}</span>
                                                </label>
                                            ) : (
                                                <input value={values[setting.id] || ''} onChange={e => setValues(p => ({ ...p, [setting.id]: e.target.value }))}
                                                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" />
                                            )}
                                            <button onClick={() => saveSetting(setting)}
                                                className={`p-2 rounded-lg transition-all ${saved.has(setting.id) ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-brand-100 hover:text-brand-600'}`}>
                                                {saved.has(setting.id) ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
