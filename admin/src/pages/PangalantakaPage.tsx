import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Edit2, Trash2, X, CalendarDays, Hash, Star, Settings2 } from 'lucide-react';

interface MasterItem {
    id: number;
    [key: string]: unknown;
}

// Tab config
const tabs = [
    {
        key: 'wuku', label: 'Wuku', icon: CalendarDays, apiPath: '/master/wuku',
        columns: [
            { key: 'nama', label: 'Nama', width: 'flex-1' },
            { key: 'urip', label: 'Urip', width: 'w-16' },
            { key: 'dewata', label: 'Dewata', width: 'w-40 hidden md:table-cell' },
            { key: 'letak', label: 'Letak', width: 'w-32 hidden lg:table-cell' },
        ],
        fields: [
            { key: 'nama', label: 'Nama', type: 'text', required: true },
            { key: 'urip', label: 'Urip', type: 'number', required: true },
            { key: 'dewata', label: 'Dewata', type: 'text' },
            { key: 'letak', label: 'Letak', type: 'text' },
            { key: 'sortOrder', label: 'Urutan', type: 'number' },
        ],
    },
    {
        key: 'sasih', label: 'Sasih', icon: Hash, apiPath: '/master/sasih',
        columns: [
            { key: 'nama', label: 'Nama', width: 'flex-1' },
            { key: 'month', label: 'Bulan', width: 'w-16' },
            { key: 'dewata', label: 'Dewata', width: 'w-40 hidden md:table-cell' },
            { key: 'masehiMonth', label: 'Masehi', width: 'w-32 hidden lg:table-cell' },
        ],
        fields: [
            { key: 'nama', label: 'Nama', type: 'text', required: true },
            { key: 'month', label: 'Bulan ke-', type: 'number', required: true },
            { key: 'dewata', label: 'Dewata', type: 'text' },
            { key: 'masehiMonth', label: 'Bulan Masehi', type: 'text' },
            { key: 'sortOrder', label: 'Urutan', type: 'number' },
        ],
    },
    {
        key: 'rahinan', label: 'Rahinan', icon: Star, apiPath: '/master/rahinan',
        columns: [
            { key: 'nama', label: 'Nama', width: 'flex-1' },
            { key: 'isBaliHoliday', label: 'Libur', width: 'w-16' },
        ],
        fields: [
            { key: 'nama', label: 'Nama', type: 'text', required: true },
            { key: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
            { key: 'conditions', label: 'Conditions (JSON)', type: 'textarea', required: true },
            { key: 'isBaliHoliday', label: 'Hari Libur Bali', type: 'checkbox' },
            { key: 'sortOrder', label: 'Urutan', type: 'number' },
        ],
    },
    {
        key: 'nyepi', label: 'Nyepi', icon: Settings2, apiPath: '/master/nyepi',
        columns: [
            { key: 'year', label: 'Tahun', width: 'w-24' },
            { key: 'date', label: 'Tanggal', width: 'flex-1' },
        ],
        fields: [
            { key: 'year', label: 'Tahun', type: 'number', required: true },
            { key: 'date', label: 'Tanggal (YYYY-MM-DD)', type: 'text', required: true },
        ],
    },
];

export function PangalantakaPage() {
    const [activeTab, setActiveTab] = useState('wuku');
    const [items, setItems] = useState<MasterItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<MasterItem | null>(null);
    const [form, setForm] = useState<Record<string, unknown>>({});
    const [saving, setSaving] = useState(false);

    const tab = tabs.find(t => t.key === activeTab)!;

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await api.get<MasterItem[]>(tab.apiPath);
            setItems(data);
        } catch { /* ignore */ }
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, [activeTab]);

    const openAdd = () => {
        setEditItem(null);
        const empty: Record<string, unknown> = {};
        tab.fields.forEach(f => { empty[f.key] = f.type === 'number' ? 0 : f.type === 'checkbox' ? false : ''; });
        setForm(empty);
        setShowForm(true);
    };

    const openEdit = (item: MasterItem) => {
        setEditItem(item);
        const formData: Record<string, unknown> = {};
        tab.fields.forEach(f => { formData[f.key] = item[f.key] ?? ''; });
        setForm(formData);
        setShowForm(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editItem) {
                await api.put(`${tab.apiPath}/${editItem.id}`, form);
            } else {
                await api.post(tab.apiPath, form);
            }
            setShowForm(false);
            fetchData();
        } catch { /* ignore */ }
        setSaving(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Yakin hapus data ini?')) return;
        await api.del(`${tab.apiPath}/${id}`);
        fetchData();
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <BookOpen className="w-7 h-7 text-brand-600" />
                    Pangalantaka
                </h1>
                <p className="text-slate-500 mt-1">Kelola data dasar kalender Bali</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-slate-100 mb-4 overflow-x-auto">
                {tabs.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === t.key ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <t.icon className="w-4 h-4" />
                        {t.label}
                    </button>
                ))}
                <div className="ml-auto">
                    <button onClick={openAdd} className="flex items-center gap-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Plus className="w-4 h-4" /> Tambah
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            {tab.columns.map(col => (
                                <th key={col.key} className={`text-left px-4 py-3 font-medium text-slate-600 ${col.width}`}>{col.label}</th>
                            ))}
                            <th className="text-right px-4 py-3 font-medium text-slate-600 w-24">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={tab.columns.length + 1} className="text-center py-12 text-slate-400">Memuat...</td></tr>
                        ) : items.length === 0 ? (
                            <tr><td colSpan={tab.columns.length + 1} className="text-center py-12 text-slate-400">Belum ada data {tab.label}.</td></tr>
                        ) : (
                            items.map((item, i) => (
                                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.015 }}
                                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    {tab.columns.map(col => (
                                        <td key={col.key} className={`px-4 py-2.5 ${col.width}`}>
                                            {col.key === 'isBaliHoliday' ? (
                                                item[col.key] ? <span className="text-emerald-600 text-xs font-medium">✓ Ya</span> : <span className="text-slate-300 text-xs">—</span>
                                            ) : (
                                                <span className="text-slate-700">{String(item[col.key] ?? '—')}</span>
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2.5 text-right">
                                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="px-4 py-2 bg-slate-50 text-xs text-slate-400 border-t border-slate-100">
                    Total: {items.length} {tab.label.toLowerCase()}
                </div>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setShowForm(false)}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-slate-900">{editItem ? `Edit ${tab.label}` : `Tambah ${tab.label}`}</h2>
                                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                            </div>
                            <div className="space-y-3">
                                {tab.fields.map(field => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {field.label} {field.required && <span className="text-red-400">*</span>}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea value={String(form[field.key] ?? '')} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} rows={3}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500 resize-none" />
                                        ) : field.type === 'checkbox' ? (
                                            <label className="flex items-center gap-2">
                                                <input type="checkbox" checked={!!form[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.checked }))} className="rounded" />
                                                <span className="text-sm text-slate-600">Ya</span>
                                            </label>
                                        ) : (
                                            <input type={field.type} value={String(form[field.key] ?? '')}
                                                onChange={e => setForm(p => ({ ...p, [field.key]: field.type === 'number' ? (e.target.value ? parseInt(e.target.value) : 0) : e.target.value }))}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                <button onClick={handleSave} disabled={saving}
                                    className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
