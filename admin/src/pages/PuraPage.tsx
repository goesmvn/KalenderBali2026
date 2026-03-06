import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, Search, Edit2, Trash2, MapPin, X } from 'lucide-react';

interface Pura {
    id: number;
    nama: string;
    alias?: string;
    kategori: string;
    kabupaten: string;
    kecamatan?: string;
    desa?: string;
    alamat?: string;
    latitude?: number;
    longitude?: number;
    deskripsi?: string;
    // Piodalan fields
    piodalanTipe?: string;
    piodalanSaptawara?: string;
    piodalanPancawara?: string;
    piodalanWuku?: string;
    piodalanSasih?: string;
    catatanPiodalan?: string;
}

const kategoriOptions = [
    { value: 'sad_kahyangan', label: 'Sad Kahyangan' },
    { value: 'dang_kahyangan', label: 'Dang Kahyangan' },
    { value: 'kahyangan_jagat', label: 'Kahyangan Jagat' },
    { value: 'kahyangan_tiga', label: 'Kahyangan Tiga' },
    { value: 'paibon', label: 'Paibon' },
    { value: 'merajan', label: 'Merajan' },
    { value: 'lainnya', label: 'Lainnya' },
];

const kabupatenBali = [
    'Badung', 'Bangli', 'Buleleng', 'Gianyar', 'Jembrana',
    'Karangasem', 'Klungkung', 'Tabanan', 'Denpasar',
];

const WUKU_OPTIONS = [
    'Sinta', 'Landep', 'Ukir', 'Kulantir', 'Tolu', 'Gumbreg', 'Wariga', 'Warigadean',
    'Julungwangi', 'Sungsang', 'Dungulan', 'Kuningan', 'Langkir', 'Medangsia', 'Pujud', 'Pahang',
    'Krulut', 'Mrakih', 'Tambir', 'Medangkungan', 'Matal', 'Uye', 'Menail', 'Prangbakat',
    'Bala', 'Ugu', 'Wayang', 'Klawu', 'Dukut', 'Watugunung',
];

const SASIH_OPTIONS = [
    'Kasa (Srawana)', 'Karo (Bhadrawada)', 'Katiga (Asuji)', 'Kapat (Kartika)',
    'Kalima (Marggasirsa)', 'Kanem (Posya)', 'Kapitu (Magha)', 'Kawolu (Palguna)',
    'Kasanga (Caitra)', 'Kadasa (Waisaka)', 'Desta (Jyesta)', 'Sada (Asadha)',
];

const emptyPura: Omit<Pura, 'id'> = {
    nama: '', alias: '', kategori: 'lainnya', kabupaten: 'Badung',
    kecamatan: '', desa: '', alamat: '', latitude: undefined, longitude: undefined, deskripsi: '',
    // Default Piodalan
    piodalanTipe: 'pawukon', piodalanSaptawara: '', piodalanPancawara: '',
    piodalanWuku: '', piodalanSasih: '', catatanPiodalan: '',
};

export function PuraPage() {
    const [puraList, setPuraList] = useState<Pura[]>([]);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<Pura | null>(null);
    const [form, setForm] = useState<Omit<Pura, 'id'>>(emptyPura);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await api.get<Pura[]>('/pura');
            setPuraList(data);
        } catch { /* ignore */ }
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = puraList.filter(p =>
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.kabupaten.toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = () => {
        setEditItem(null);
        setForm(emptyPura);
        setShowForm(true);
    };

    const openEdit = (item: Pura) => {
        setEditItem(item);
        setForm({
            nama: item.nama, alias: item.alias || '', kategori: item.kategori,
            kabupaten: item.kabupaten, kecamatan: item.kecamatan || '', desa: item.desa || '',
            alamat: item.alamat || '', latitude: item.latitude, longitude: item.longitude,
            deskripsi: item.deskripsi || '',
            piodalanTipe: item.piodalanTipe || 'pawukon',
            piodalanSaptawara: item.piodalanSaptawara || '',
            piodalanPancawara: item.piodalanPancawara || '',
            piodalanWuku: item.piodalanWuku || '',
            piodalanSasih: item.piodalanSasih || '',
            catatanPiodalan: item.catatanPiodalan || '',
        });
        setShowForm(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editItem) {
                await api.put(`/pura/${editItem.id}`, form);
            } else {
                await api.post('/pura', form);
            }
            setShowForm(false);
            fetchData();
        } catch { /* ignore */ }
        setSaving(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Yakin hapus pura ini?')) return;
        await api.del(`/pura/${id}`);
        fetchData();
    };

    const updateForm = (field: string, value: unknown) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <Building2 className="w-7 h-7 text-brand-600" />
                        Master Pura
                    </h1>
                    <p className="text-slate-500 mt-1">Kelola data pura, merajan, dan sanggah</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-brand-600/20">
                    <Plus className="w-4 h-4" /> Tambah Pura
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Cari pura atau kabupaten..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-4 py-3 font-medium text-slate-600">Nama</th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Kategori</th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Kabupaten</th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Koordinat</th>
                            <th className="text-right px-4 py-3 font-medium text-slate-600 w-24">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-12 text-slate-400">Memuat data...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-12 text-slate-400">
                                {puraList.length === 0 ? 'Belum ada data pura. Klik "Tambah Pura" untuk mulai.' : 'Tidak ditemukan.'}
                            </td></tr>
                        ) : (
                            filtered.map((item, i) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-slate-900">{item.nama}</div>
                                        {item.alias && <div className="text-xs text-slate-400">{item.alias}</div>}
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="inline-flex px-2 py-0.5 bg-brand-50 text-brand-700 rounded-md text-xs font-medium">
                                            {kategoriOptions.find(k => k.value === item.kategori)?.label || item.kategori}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell text-slate-600">{item.kabupaten}</td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        {item.latitude && item.longitude ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                                                <MapPin className="w-3 h-3" />
                                                {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-300">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Hapus">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="px-4 py-2 bg-slate-50 text-xs text-slate-400 border-t border-slate-100">
                    Total: {filtered.length} pura
                </div>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-6 mb-12"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900">
                                    {editItem ? 'Edit Pura' : 'Tambah Pura Baru'}
                                </h2>
                                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pura *</label>
                                    <input value={form.nama} onChange={e => updateForm('nama', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" placeholder="Pura Besakih" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Alias</label>
                                    <input value={form.alias} onChange={e => updateForm('alias', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" placeholder="Nama lain" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                                    <select value={form.kategori} onChange={e => updateForm('kategori', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 outline-none">
                                        {kategoriOptions.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Kabupaten *</label>
                                    <select value={form.kabupaten} onChange={e => updateForm('kabupaten', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 outline-none">
                                        {kabupatenBali.map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Kecamatan</label>
                                    <input value={form.kecamatan} onChange={e => updateForm('kecamatan', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Desa</label>
                                    <input value={form.desa} onChange={e => updateForm('desa', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                                    <input type="number" step="0.0001" value={form.latitude ?? ''} onChange={e => updateForm('latitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" placeholder="-8.3405" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                                    <input type="number" step="0.0001" value={form.longitude ?? ''} onChange={e => updateForm('longitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" placeholder="115.5085" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
                                    <input value={form.alamat} onChange={e => updateForm('alamat', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" placeholder="Jl. ..." />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Pura</label>
                                    <textarea value={form.deskripsi} onChange={e => updateForm('deskripsi', e.target.value)} rows={3}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none resize-none" />
                                </div>

                                {/* Divider for Piodalan Section */}
                                <div className="md:col-span-2 pt-4 border-t border-slate-100 mt-2">
                                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        Data Piodalan (Opsional)
                                    </h3>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Piodalan</label>
                                    <div className="flex bg-slate-100 p-1 rounded-lg">
                                        {[
                                            { id: 'pawukon', label: 'Berdasarkan Pawukon (Wuku)' },
                                            { id: 'purnama', label: 'Berdasarkan Purnama' },
                                            { id: 'tilem', label: 'Berdasarkan Tilem' },
                                        ].map(t => (
                                            <button
                                                key={t.id}
                                                type="button"
                                                onClick={() => {
                                                    updateForm('piodalanTipe', t.id);
                                                    if (t.id === 'pawukon') updateForm('piodalanSasih', '');
                                                }}
                                                className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${form.piodalanTipe === t.id
                                                        ? 'bg-white text-slate-900 shadow-sm'
                                                        : 'text-slate-500 hover:text-slate-700'
                                                    }`}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {form.piodalanTipe === 'pawukon' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Saptawara</label>
                                            <select value={form.piodalanSaptawara || ''} onChange={e => updateForm('piodalanSaptawara', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 outline-none">
                                                <option value="">Pilih...</option>
                                                {['Redite (Minggu)', 'Soma (Senin)', 'Anggara (Selasa)', 'Buda (Rabu)', 'Wraspati (Kamis)', 'Sukra (Jumat)', 'Saniscara (Sabtu)'].map(o => (
                                                    <option key={o} value={o.split(' ')[0]}>{o}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Pancawara</label>
                                            <select value={form.piodalanPancawara || ''} onChange={e => updateForm('piodalanPancawara', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 outline-none">
                                                <option value="">Pilih...</option>
                                                {['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon'].map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Wuku</label>
                                            <select value={form.piodalanWuku || ''} onChange={e => updateForm('piodalanWuku', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 outline-none">
                                                <option value="">Pilih Wuku...</option>
                                                {WUKU_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                    </>
                                )}

                                {form.piodalanTipe !== 'pawukon' && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Sasih</label>
                                        <select value={form.piodalanSasih || ''} onChange={e => updateForm('piodalanSasih', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 outline-none">
                                            <option value="">Pilih Sasih...</option>
                                            {SASIH_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                )}

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Piodalan</label>
                                    <textarea value={form.catatanPiodalan} onChange={e => updateForm('catatanPiodalan', e.target.value)} rows={2}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none resize-none" placeholder="Catatan tambahan (opsional)" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Batal</button>
                                <button onClick={handleSave} disabled={saving || !form.nama}
                                    className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 shadow-md shadow-brand-600/20">
                                    {saving ? 'Menyimpan...' : editItem ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
