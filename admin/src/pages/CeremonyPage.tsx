import { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target, Plus, ChevronRight, ChevronDown, Edit2, Trash2, X, Shield, ShieldAlert,
    ShieldOff, Star, Ban, BookOpen
} from 'lucide-react';

interface Condition {
    id: number;
    ruleId: number;
    field: string;
    operator: string;
    value: string;
}

interface Rule {
    id: number;
    ceremonyId: number;
    tipe: string;
    nama: string;
    deskripsi?: string;
    scoreOverride?: number;
    conditions: Condition[];
}

interface Ceremony {
    id: number;
    nama: string;
    slug: string;
    kategoriYadnya: string;
    deskripsi?: string;
    icon?: string;
    isActive: boolean;
    rules?: Rule[];
}

const tipeConfig: Record<string, { label: string; color: string; icon: React.ElementType; bg: string }> = {
    hari_utama: { label: 'Hari Utama', color: 'text-emerald-700', icon: Star, bg: 'bg-emerald-50' },
    larangan_mutlak: { label: 'Larangan Mutlak', color: 'text-red-700', icon: ShieldOff, bg: 'bg-red-50' },
    larangan_sedang: { label: 'Larangan Sedang', color: 'text-amber-700', icon: ShieldAlert, bg: 'bg-amber-50' },
    anjuran: { label: 'Anjuran', color: 'text-blue-700', icon: Shield, bg: 'bg-blue-50' },
    pantangan: { label: 'Pantangan', color: 'text-purple-700', icon: Ban, bg: 'bg-purple-50' },
};

// ============ DROPDOWN DATA dari kalender ============

const WEWARAN_OPTIONS: Record<string, string[]> = {
    ekawara: ['Luang'],
    dwiwara: ['Menga', 'Pepet'],
    triwara: ['Pasah (Dora)', 'Beteng (Waya)', 'Kajeng (Biantara)'],
    caturwara: ['Sri', 'Laba', 'Jaya', 'Menala'],
    pancawara: ['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon'],
    sadwara: ['Tungleh', 'Aryang', 'Urukung', 'Paniron', 'Was', 'Maulu'],
    saptawara: ['Redite (Minggu)', 'Soma (Senin)', 'Anggara (Selasa)', 'Buda (Rabu)', 'Wraspati (Kamis)', 'Sukra (Jumat)', 'Saniscara (Sabtu)'],
    astawara: ['Sri', 'Indra', 'Guru', 'Yama', 'Ludra', 'Brahma', 'Kala', 'Uma'],
    sangawara: ['Dangu', 'Jangur', 'Gigis', 'Nohan', 'Ogan', 'Erangan', 'Urungan', 'Tulus', 'Dadi'],
    dasawara: ['Pandita', 'Pati', 'Suka', 'Duka', 'Sri', 'Manuh', 'Manusa', 'Raja', 'Dewa', 'Raksasa'],
};

const WUKU_OPTIONS = [
    'Sinta', 'Landep', 'Ukir', 'Kulantir', 'Tolu', 'Gumbreg', 'Wariga', 'Warigadean',
    'Julungwangi', 'Sungsang', 'Dungulan', 'Kuningan', 'Langkir', 'Medangsia', 'Pujud', 'Pahang',
    'Krulut', 'Mrakih', 'Tambir', 'Medangkungan', 'Matal', 'Uye', 'Menail', 'Prangbakat',
    'Bala', 'Ugu', 'Wayang', 'Klawu', 'Dukut', 'Watugunung',
];

const PENANGGAL_STATUS = ['Penanggal', 'Pangelong'];
const PURNAMA_TILEM = ['Purnama', 'Tilem'];

// Field definitions with their dropdown values
const fieldDefinitions: { value: string; label: string; values?: string[] }[] = [
    { value: 'ekawara', label: 'Ekawara (1)', values: WEWARAN_OPTIONS.ekawara },
    { value: 'dwiwara', label: 'Dwiwara (2)', values: WEWARAN_OPTIONS.dwiwara },
    { value: 'triwara', label: 'Triwara (3)', values: WEWARAN_OPTIONS.triwara },
    { value: 'caturwara', label: 'Caturwara (4)', values: WEWARAN_OPTIONS.caturwara },
    { value: 'pancawara', label: 'Pancawara (5)', values: WEWARAN_OPTIONS.pancawara },
    { value: 'sadwara', label: 'Sadwara (6)', values: WEWARAN_OPTIONS.sadwara },
    { value: 'saptawara', label: 'Saptawara (7)', values: WEWARAN_OPTIONS.saptawara },
    { value: 'astawara', label: 'Astawara (8)', values: WEWARAN_OPTIONS.astawara },
    { value: 'sangawara', label: 'Sangawara (9)', values: WEWARAN_OPTIONS.sangawara },
    { value: 'dasawara', label: 'Dasawara (10)', values: WEWARAN_OPTIONS.dasawara },
    { value: 'wuku', label: 'Wuku', values: WUKU_OPTIONS },
    { value: 'penanggal_status', label: 'Penanggal/Pangelong', values: PENANGGAL_STATUS },
    { value: 'penanggal_day', label: 'Hari Penanggal (1-15)' },
    { value: 'purnama_tilem', label: 'Purnama/Tilem', values: PURNAMA_TILEM },
];

const operatorOptions = [
    { value: 'equals', label: '=' },
    { value: 'not_equals', label: '≠' },
    { value: 'in', label: 'termasuk' },
    { value: 'not_in', label: 'bukan' },
];

const kategoriOptions = ['Manusa Yadnya', 'Dewa Yadnya', 'Pitra Yadnya', 'Rsi Yadnya', 'Bhuta Yadnya'];

export function CeremonyPage() {
    const [ceremonies, setCeremonies] = useState<Ceremony[]>([]);
    const [selected, setSelected] = useState<Ceremony | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showRuleForm, setShowRuleForm] = useState(false);
    const [editCeremony, setEditCeremony] = useState<Ceremony | null>(null);
    const [ceremonyForm, setCeremonyForm] = useState({ nama: '', slug: '', kategoriYadnya: 'Manusa Yadnya', deskripsi: '', icon: '🛕' });
    const [ruleForm, setRuleForm] = useState({ tipe: 'hari_utama', nama: '', deskripsi: '', scoreOverride: '' as string });
    const [expandedRules, setExpandedRules] = useState<Set<number>>(new Set());
    const [saving, setSaving] = useState(false);

    const fetchList = async () => {
        setLoading(true);
        const data = await api.get<Ceremony[]>('/ceremonies');
        setCeremonies(data);
        setLoading(false);
    };

    const fetchDetail = async (id: number) => {
        const data = await api.get<Ceremony>(`/ceremonies/${id}`);
        setSelected(data);
    };

    useEffect(() => { fetchList(); }, []);

    const openAddCeremony = () => {
        setEditCeremony(null);
        setCeremonyForm({ nama: '', slug: '', kategoriYadnya: 'Manusa Yadnya', deskripsi: '', icon: '🛕' });
        setShowForm(true);
    };

    const openEditCeremony = (c: Ceremony) => {
        setEditCeremony(c);
        setCeremonyForm({ nama: c.nama, slug: c.slug, kategoriYadnya: c.kategoriYadnya, deskripsi: c.deskripsi || '', icon: c.icon || '🛕' });
        setShowForm(true);
    };

    const saveCeremony = async () => {
        setSaving(true);
        try {
            if (editCeremony) {
                await api.put(`/ceremonies/${editCeremony.id}`, ceremonyForm);
            } else {
                await api.post('/ceremonies', ceremonyForm);
            }
            setShowForm(false);
            fetchList();
            if (selected) fetchDetail(selected.id);
        } catch { /* ignore */ }
        setSaving(false);
    };

    const deleteCeremony = async (id: number) => {
        if (!confirm('Yakin hapus upacara dan semua aturannya?')) return;
        await api.del(`/ceremonies/${id}`);
        if (selected?.id === id) setSelected(null);
        fetchList();
    };

    const openAddRule = () => {
        setRuleForm({ tipe: 'hari_utama', nama: '', deskripsi: '', scoreOverride: '' });
        setShowRuleForm(true);
    };

    const saveRule = async () => {
        if (!selected) return;
        setSaving(true);
        try {
            await api.post(`/ceremonies/${selected.id}/rules`, {
                ...ruleForm,
                scoreOverride: ruleForm.scoreOverride ? parseInt(ruleForm.scoreOverride) : null,
            });
            setShowRuleForm(false);
            fetchDetail(selected.id);
        } catch { /* ignore */ }
        setSaving(false);
    };

    const deleteRule = async (ruleId: number) => {
        if (!confirm('Yakin hapus aturan ini?')) return;
        await api.del(`/ceremonies/rules/${ruleId}`);
        if (selected) fetchDetail(selected.id);
    };

    const addCondition = async (ruleId: number, field: string, operator: string, value: string) => {
        await api.post(`/ceremonies/rules/${ruleId}/conditions`, { field, operator, value });
        if (selected) fetchDetail(selected.id);
    };

    const deleteCondition = async (conditionId: number) => {
        await api.del(`/ceremonies/conditions/${conditionId}`);
        if (selected) fetchDetail(selected.id);
    };

    const toggleRule = (id: number) => {
        setExpandedRules(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    // Helper to display human-readable field label
    const getFieldLabel = (field: string) => fieldDefinitions.find(f => f.value === field)?.label || field;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <Target className="w-7 h-7 text-brand-600" />
                        Dewasa Designer
                    </h1>
                    <p className="text-slate-500 mt-1">Rancang komponen dewasa untuk setiap jenis upacara</p>
                </div>
                <button onClick={openAddCeremony} className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-brand-600/20">
                    <Plus className="w-4 h-4" /> Tambah Upacara
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Ceremony List */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Jenis Upacara</h3>
                    {loading ? (
                        <div className="text-center py-8 text-slate-400">Memuat...</div>
                    ) : ceremonies.length === 0 ? (
                        <div className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm">
                            Belum ada. Klik "Tambah Upacara".
                        </div>
                    ) : (
                        ceremonies.map(c => (
                            <motion.button
                                key={c.id}
                                onClick={() => fetchDetail(c.id)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === c.id
                                        ? 'bg-brand-50 border-brand-200 shadow-sm'
                                        : 'bg-white border-slate-100 hover:border-brand-200'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{c.icon || '🛕'}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-slate-900 truncate">{c.nama}</div>
                                        <div className="text-xs text-slate-400">{c.kategoriYadnya}</div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={(e) => { e.stopPropagation(); openEditCeremony(c); }} className="p-1 rounded hover:bg-white text-slate-400 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
                                        <button onClick={(e) => { e.stopPropagation(); deleteCeremony(c.id); }} className="p-1 rounded hover:bg-white text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            </motion.button>
                        ))
                    )}
                </div>

                {/* Right: Rules Detail */}
                <div className="lg:col-span-2">
                    {!selected ? (
                        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400">Pilih upacara untuk melihat & mengelola aturan</p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selected.icon} {selected.nama}</h2>
                                    <p className="text-sm text-slate-500">{selected.deskripsi || selected.kategoriYadnya}</p>
                                </div>
                                <button onClick={openAddRule} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors">
                                    <Plus className="w-4 h-4" /> Tambah Aturan
                                </button>
                            </div>

                            {/* Rules List */}
                            <div className="space-y-3">
                                {Object.entries(tipeConfig).map(([tipe, config]) => {
                                    const rules = (selected.rules || []).filter(r => r.tipe === tipe);
                                    if (rules.length === 0) return null;
                                    return (
                                        <div key={tipe} className={`rounded-xl border border-slate-100 overflow-hidden`}>
                                            <div className={`px-4 py-2 ${config.bg} flex items-center gap-2`}>
                                                <config.icon className={`w-4 h-4 ${config.color}`} />
                                                <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
                                                <span className="text-xs text-slate-400 ml-auto">{rules.length} aturan</span>
                                            </div>
                                            {rules.map(rule => (
                                                <div key={rule.id} className="border-t border-slate-50">
                                                    <div className="px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-slate-50/50" onClick={() => toggleRule(rule.id)}>
                                                        {expandedRules.has(rule.id) ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                                                        <div className="flex-1">
                                                            <span className="text-sm font-medium text-slate-800">{rule.nama}</span>
                                                            {rule.scoreOverride !== null && rule.scoreOverride !== undefined && (
                                                                <span className={`ml-2 text-xs font-bold ${rule.scoreOverride === 100 ? 'text-emerald-600' : rule.scoreOverride === 0 ? 'text-red-600' : 'text-slate-500'}`}>
                                                                    → {rule.scoreOverride}%
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-slate-400">{rule.conditions.length} kondisi</span>
                                                        <button onClick={(e) => { e.stopPropagation(); deleteRule(rule.id); }} className="p-1 rounded hover:bg-red-50 text-slate-300 hover:text-red-500">
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>

                                                    <AnimatePresence>
                                                        {expandedRules.has(rule.id) && (
                                                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                                                <div className="px-4 pb-3 pl-10">
                                                                    {rule.deskripsi && <p className="text-xs text-slate-500 mb-2">{rule.deskripsi}</p>}

                                                                    {/* Conditions */}
                                                                    <div className="space-y-1.5 mb-2">
                                                                        {rule.conditions.map(cond => (
                                                                            <div key={cond.id} className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-1.5 rounded-lg">
                                                                                <span className="font-medium text-indigo-600">{getFieldLabel(cond.field)}</span>
                                                                                <span className="text-slate-400">{operatorOptions.find(o => o.value === cond.operator)?.label || cond.operator}</span>
                                                                                <span className="font-mono text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">{cond.value}</span>
                                                                                <button onClick={() => deleteCondition(cond.id)} className="ml-auto text-slate-300 hover:text-red-500">
                                                                                    <X className="w-3 h-3" />
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    {/* Quick add condition */}
                                                                    <QuickConditionForm onAdd={(f, o, v) => addCondition(rule.id, f, o, v)} />
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}

                                {(!selected.rules || selected.rules.length === 0) && (
                                    <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
                                        Belum ada aturan. Klik "Tambah Aturan" untuk mulai merancang dewasa.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Ceremony Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setShowForm(false)}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                            <h2 className="text-lg font-bold mb-4">{editCeremony ? 'Edit Upacara' : 'Tambah Upacara'}</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                                    <input value={ceremonyForm.nama} onChange={e => setCeremonyForm(p => ({ ...p, nama: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" placeholder="Dewasa Nganten" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                                    <input value={ceremonyForm.slug} onChange={e => setCeremonyForm(p => ({ ...p, slug: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" placeholder="pawiwahan" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Kategori Yadnya</label>
                                    <select value={ceremonyForm.kategoriYadnya} onChange={e => setCeremonyForm(p => ({ ...p, kategoriYadnya: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500">
                                        {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                                    <input value={ceremonyForm.icon} onChange={e => setCeremonyForm(p => ({ ...p, icon: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" placeholder="💒" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                                    <textarea value={ceremonyForm.deskripsi} onChange={e => setCeremonyForm(p => ({ ...p, deskripsi: e.target.value }))} rows={2}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500 resize-none" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                <button onClick={saveCeremony} disabled={saving || !ceremonyForm.nama || !ceremonyForm.slug}
                                    className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rule Form Modal */}
            <AnimatePresence>
                {showRuleForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setShowRuleForm(false)}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                            <h2 className="text-lg font-bold mb-4">Tambah Aturan</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Aturan</label>
                                    <select value={ruleForm.tipe} onChange={e => setRuleForm(p => ({ ...p, tipe: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500">
                                        {Object.entries(tipeConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Aturan</label>
                                    <input value={ruleForm.nama} onChange={e => setRuleForm(p => ({ ...p, nama: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" placeholder="Panca Merta" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Score Override (%)</label>
                                    <input type="number" value={ruleForm.scoreOverride} onChange={e => setRuleForm(p => ({ ...p, scoreOverride: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500" placeholder="100 untuk Hari Utama, 0 untuk Larangan Mutlak" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                                    <textarea value={ruleForm.deskripsi} onChange={e => setRuleForm(p => ({ ...p, deskripsi: e.target.value }))} rows={2}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-500 resize-none" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                                <button onClick={() => setShowRuleForm(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                <button onClick={saveRule} disabled={saving || !ruleForm.nama}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg disabled:opacity-50">
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

// Quick condition adder — ALL DROPDOWN, no free text (except penanggal_day for numeric)
function QuickConditionForm({ onAdd }: { onAdd: (field: string, operator: string, value: string) => void }) {
    const [field, setField] = useState('saptawara');
    const [operator, setOperator] = useState('equals');
    const [value, setValue] = useState('');

    const fieldDef = useMemo(() => fieldDefinitions.find(f => f.value === field), [field]);
    const hasDropdown = fieldDef?.values && fieldDef.values.length > 0;

    // Reset value when field changes
    useEffect(() => {
        if (hasDropdown && fieldDef?.values) {
            setValue(fieldDef.values[0]);
        } else {
            setValue('');
        }
    }, [field]);

    const handleAdd = () => {
        if (!value) return;
        onAdd(field, operator, value);
        // Reset to first option after adding
        if (hasDropdown && fieldDef?.values) {
            setValue(fieldDef.values[0]);
        } else {
            setValue('');
        }
    };

    // Generate penanggal_day options (1-15)
    const penanggalDayOptions = Array.from({ length: 15 }, (_, i) => String(i + 1));

    return (
        <div className="bg-indigo-50/50 rounded-lg p-2.5 border border-indigo-100">
            <p className="text-[10px] font-medium text-indigo-500 uppercase tracking-wider mb-2">Tambah Kondisi</p>
            <div className="flex items-center gap-2 flex-wrap">
                {/* Field dropdown */}
                <select value={field} onChange={e => setField(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-brand-500 outline-none bg-white min-w-[130px]">
                    {fieldDefinitions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>

                {/* Operator dropdown */}
                <select value={operator} onChange={e => setOperator(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-brand-500 outline-none bg-white w-20">
                    {operatorOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                {/* Value — ALWAYS dropdown */}
                {field === 'penanggal_day' ? (
                    <select value={value} onChange={e => setValue(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-brand-500 outline-none bg-white min-w-[80px]">
                        <option value="">Pilih hari...</option>
                        {penanggalDayOptions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                ) : hasDropdown && fieldDef?.values ? (
                    <select value={value} onChange={e => setValue(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-brand-500 outline-none bg-white min-w-[120px]">
                        {fieldDef.values.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                ) : (
                    <select value={value} onChange={e => setValue(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-brand-500 outline-none bg-white min-w-[120px]">
                        <option value="">Pilih...</option>
                    </select>
                )}

                <button onClick={handleAdd} disabled={!value}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap transition-colors">
                    + Tambah
                </button>
            </div>
        </div>
    );
}
