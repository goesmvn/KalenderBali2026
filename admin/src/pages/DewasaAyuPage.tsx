import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Search, Edit2, Trash2, X, Tag } from 'lucide-react';

interface DewasaAyuItem {
    id: number;
    nama: string;
    deskripsi: string;
    conditions: string;
    tags: string;
}

export function DewasaAyuPage() {
    const [items, setItems] = useState<DewasaAyuItem[]>([]);
    const [search, setSearch] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<DewasaAyuItem | null>(null);
    const [form, setForm] = useState({ nama: '', deskripsi: '', conditions: '[]', tags: '[]' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await api.get<DewasaAyuItem[]>('/master/dewasa-ayu');
            setItems(data);
        } catch { /* ignore */ }
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    // Extract all unique tags
    const allTags = [...new Set(items.flatMap(item => {
        try { return JSON.parse(item.tags) as string[]; } catch { return []; }
    }))].sort();

    const filtered = items.filter(item => {
        const nameMatch = item.nama.toLowerCase().includes(search.toLowerCase());
        if (!tagFilter) return nameMatch;
        try {
            const tags = JSON.parse(item.tags) as string[];
            return nameMatch && tags.includes(tagFilter);
        } catch { return nameMatch; }
    });

    const openAdd = () => {
        setEditItem(null);
        setForm({ nama: '', deskripsi: '', conditions: '[]', tags: '[]' });
        setShowForm(true);
    };

    const openEdit = (item: DewasaAyuItem) => {
        setEditItem(item);
        setForm({
            nama: item.nama, deskripsi: item.deskripsi,
            conditions: item.conditions, tags: item.tags,
        });
        setShowForm(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editItem) {
                await api.put(`/master/dewasa-ayu/${editItem.id}`, form);
            } else {
                await api.post('/master/dewasa-ayu', form);
            }
            setShowForm(false);
            fetchData();
        } catch { /* ignore */ }
        setSaving(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Yakin hapus dewasa ayu ini?')) return;
        await api.del(`/master/dewasa-ayu/${id}`);
        fetchData();
    };

    const parseTags = (tagsStr: string): string[] => {
        try { return JSON.parse(tagsStr); } catch { return []; }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <Star className="w-7 h-7 text-brand-600" />
                        Dewasa Ayu
                    </h1>
                    <p className="text-slate-500 mt-1">Kelola aturan Ala Ayuning Dewasa</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-brand-600/20">
                    <Plus className="w-4 h-4" /> Tambah Dewasa
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Cari dewasa ayu..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" />
                </div>
                {allTags.length > 0 && (
                    <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 outline-none">
                        <option value="">Semua tag</option>
                        {allTags.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-4 py-3 font-medium text-slate-600">Nama</th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Deskripsi</th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Tags</th>
                            <th className="text-right px-4 py-3 font-medium text-slate-600 w-24">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-12 text-slate-400">Memuat...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-12 text-slate-400">
                                {items.length === 0 ? 'Belum ada data dewasa ayu.' : 'Tidak ditemukan.'}
                            </td></tr>
                        ) : (
                            filtered.map((item, i) => (
                                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-2.5 font-medium text-slate-900">{item.nama}</td>
                                    <td className="px-4 py-2.5 text-slate-500 hidden md:table-cell max-w-xs truncate">{item.deskripsi}</td>
                                    <td className="px-4 py-2.5 hidden lg:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {parseTags(item.tags).map(tag => (
                                                <span key={tag} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs">
                                                    <Tag className="w-2.5 h-2.5" />{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5 text-right">
                                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="px-4 py-2 bg-slate-50 text-xs text-slate-400 border-t border-slate-100">
                    Total: {filtered.length} dewasa ayu {tagFilter && `(filter: ${tagFilter})`}
                </div>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto" onClick={() => setShowForm(false)}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 mb-12" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-slate-900">{editItem ? 'Edit Dewasa Ayu' : 'Tambah Dewasa Ayu'}</h2>
                                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama *</label>
                                    <input value={form.nama} onChange={e => setForm(p => ({ ...p, nama: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi *</label>
                                    <textarea value={form.deskripsi} onChange={e => setForm(p => ({ ...p, deskripsi: e.target.value }))} rows={3}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500 resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Conditions (JSON array)</label>
                                    <textarea value={form.conditions} onChange={e => setForm(p => ({ ...p, conditions: e.target.value }))} rows={3}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500 resize-none font-mono text-xs" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tags (JSON array)</label>
                                    <textarea value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} rows={2}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500 resize-none font-mono text-xs"
                                        placeholder='["Manusa Yadnya", "Dewa Yadnya"]' />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                <button onClick={handleSave} disabled={saving || !form.nama}
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
