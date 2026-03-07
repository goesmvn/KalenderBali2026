import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import type { BaliDate } from '@/types/bali-calendar';
import { WewaranCard } from './WewaranCard';
import { formatIndonesianDate, BALI_HOLIDAYS, getAksaraBaliSaptawara, getAksaraBaliWuku, toBalineseDigits } from '@/utils/bali-calendar';
import {
  Moon,
  Sun,
  Calendar,
  MapPin,
  Star,
  X,
  ChevronRight,
  Sparkles,
  Compass,
  Award,
  BookOpen,
  Clock,
  AlertTriangle,
  Baby,
  Share2,
  Check
} from 'lucide-react';
import { Badge } from './ui/badge';
import { calculatePawiwahanScore } from '@/utils/pawiwahan-score';
import { getPiodalan, getPiodalanWewaran } from '@/utils/piodalan-data';

// Format helper
interface DateDetailProps {
  baliDate: BaliDate | null;
  nationalHolidays?: string[];
  onClose: () => void;
}

function getEventDescription(eventName: string): string {
  if (eventName.toLowerCase().includes('penyekeban')) return 'Hari turunnya Sang Hyang Tiga Wisesa, di mana umat Hindu secara simbolis mulai mengendalikan diri (nyekeb) menyambut Galungan.';
  if (eventName.toLowerCase().includes('penyajaan')) return 'Pembuatan aneka jajan sarana upacara, maknanya adalah pemantapan hati yang tulus (saja) dalam menyambut kedatangan hari Dharma.';
  if (eventName.toLowerCase().includes('penampahan')) return 'Penyembelihan babi/ayam secara harfiah, dengan makna filosofis membunuh sifat keraksasaan (Adharma) dalam diri sendiri.';
  if (eventName.toLowerCase().includes('galungan')) return 'Merayakan kemenangan Dharma (kebaikan) melawan Adharma (kejahatan), siklus turunnya leluhur ke bumi.';
  if (eventName.toLowerCase().includes('manis galungan')) return 'Hari saling mengunjungi kerabat dan sembahyang dengan sukacita, mensyukuri berkat dari hari suci Galungan.';
  if (eventName.toLowerCase().includes('pemacekan agung')) return 'Puncak pelepasan Sang Hyang Tiga Wisesa (Kala Tiga) untuk kembali ke asalnya, menandai berakhirnya godaan utama Galungan.';
  if (eventName.toLowerCase().includes('kuningan')) return 'Pemujaan kepada para Dewa dan Pitara turun ke bumi untuk memberikan berkat kesejahteraan dengan sarana khas nasi kuning.';
  if (eventName.toLowerCase().includes('manis kuningan') || eventName.toLowerCase().includes('pegat wakan')) return 'Penutup seluruh rangkaian perayaan Galungan dan Kuningan, hari untuk mengakhiri segala halangan dan pantangan.';

  if (eventName.toLowerCase().includes('nyepi')) return 'Tahun Baru Saka yang dirayakan dengan Catur Brata Penyepian (Amati Geni, Karya, Lelungaan, Lelanguan) demi keharmonisan Bhuana Alit dan Agung.';
  if (eventName.toLowerCase().includes('tumpek')) return 'Pemujaan manifestasi Sang Hyang Widhi atas segala ciptaan spesifik-Nya (besi, flora, fauna, wayang, dsb).';
  if (eventName.toLowerCase().includes('kajeng kliwon')) return 'Hari keramat pertemuan energi yang ditujukan untuk pembersihan batin dan perlindungan dari marabahaya gaib.';
  if (eventName.toLowerCase().includes('purnama')) return 'Fase terang bulan purnama penuh, momen utama untuk memohon pencerahan dan penyucian pikiran.';
  if (eventName.toLowerCase().includes('tilem')) return 'Fase bulan mati, momen peleburan kekotoran diri sekaligus penyatuan dengan energi semesta alam.';

  if (eventName.toLowerCase().includes('saraswati')) return 'Hari turunnya ilmu pengetahuan suci yang dianugerahkan oleh Sang Hyang Aji Saraswati.';
  if (eventName.toLowerCase().includes('siwaratri')) return 'Malam perenungan suci dan pemujaan kepada Ida Sang Hyang Siwa untuk mencapai pencerahan spiritual.';

  return 'Hari peringatan kalender Bali atau Hari Libur Nasional / Cuti Bersama yang ditetapkan oleh pemerintah.';
}

function ClickableEventRow({ title, dotColorClass, bgClass }: { title: string, dotColorClass: string, bgClass: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const description = getEventDescription(title);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`p-3 bg-white rounded-xl shadow-sm border ${bgClass} cursor-pointer hover:shadow-md transition-all`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${dotColorClass} shadow-sm flex-shrink-0`} />
          <span className="text-sm font-medium text-stone-700 leading-tight">{title}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-2 pt-2 border-t border-stone-100/50 text-xs text-stone-600 leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExpandableDetailCard({ title, value, colorClass, description }: { title: string, value: string, colorClass: string, description: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="pr-4">
          <span className="block text-xs font-semibold text-stone-500 uppercase mb-1">{title}</span>
          <span className={`text-sm font-bold ${colorClass} block`}>{value}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DateDetail({ baliDate, nationalHolidays = [], onClose }: DateDetailProps) {
  const { t, i18n } = useTranslation();
  // Hitung Skor Alah Dening Alah (Persentase Kebaikan Per Yadnya)
  const yadnyaScores = React.useMemo(() => {
    if (!baliDate?.dewasaAyu) return {};

    const categories = ['Dewa Yadnya', 'Pitra Yadnya', 'Manusa Yadnya', 'Rsi Yadnya', 'Bhuta Yadnya', 'Pertanian', 'Bangunan'];
    const scores: Record<string, { baik: number, buruk: number }> = {};

    categories.forEach(cat => scores[cat] = { baik: 0, buruk: 0 });

    baliDate.dewasaAyu.forEach(rule => {
      rule.tags?.forEach(tag => {
        categories.forEach(cat => {
          if (tag === cat) {
            scores[cat].baik += 1;
          } else if (tag === `Larangan ${cat}`) {
            scores[cat].buruk += 1;
          }
        });
      });
    });

    return scores;
  }, [baliDate?.dewasaAyu]);

  // Calculate Pawiwahan Score specifically
  const pawiwahanScore = React.useMemo(() => {
    if (!baliDate) return null;
    return calculatePawiwahanScore(baliDate);
  }, [baliDate]);

  const [hasCopiedUrl, setHasCopiedUrl] = useState(false);

  const handleShare = async () => {
    if (!baliDate) return;
    const gregStr = formatIndonesianDate(baliDate.gregorianDate);
    const shareText = `Informasi Dewasa Ayu & Kalender Bali untuk tanggal ${gregStr}.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Kalender Bali: ${gregStr}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setHasCopiedUrl(true);
        setTimeout(() => setHasCopiedUrl(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  if (!baliDate) return null;

  const isPurnama = baliDate.purnamaTilem?.type === 'Purnama';
  const isTilem = baliDate.purnamaTilem?.type === 'Tilem';
  const piodalanList = getPiodalan(baliDate);
  const piodalanWewaran = getPiodalanWewaran(baliDate);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative z-10 p-4 sm:p-6 text-white overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-brand-700">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '30px 30px'
              }}
            />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 z-20">
              <button
                onClick={handleShare}
                className="p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                title={t('date_detail.share')}
              >
                {hasCopiedUrl ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 pr-12 sm:pr-8 relative z-10">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl shrink-0">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 leading-tight">
                  {new Intl.DateTimeFormat(i18n.language === 'id' ? 'id-ID' : (i18n.language === 'ja' ? 'ja-JP' : (i18n.language === 'ru' ? 'ru-RU' : 'en-US')), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(baliDate.gregorianDate)}
                </h2>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <p className="text-white/90 text-xs sm:text-sm font-medium">
                    {t('date_detail.saka_year')} {baliDate.sakaYear}
                  </p>
                  {getAksaraBaliSaptawara(baliDate.saptawara.name) && (
                    <span className="text-white/90 text-lg sm:text-xl leading-none" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                      {getAksaraBaliSaptawara(baliDate.saptawara.name)}
                    </span>
                  )}

                  {/* Purnama/Tilem Badge */}
                  {(isPurnama || isTilem) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm border border-white/20 ${isPurnama
                        ? 'bg-yellow-300 text-yellow-900'
                        : 'bg-slate-700 text-slate-100'
                        }`}
                    >
                      {isPurnama ? (
                        <>
                          <Sun className="w-3.5 h-3.5" />
                          <span className="font-semibold text-xs tracking-wide">{t('date_detail.purnama')}</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5" />
                          <span className="font-semibold text-xs tracking-wide">{t('date_detail.tilem')}</span>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* Holiday / Event Badges */}
                  {nationalHolidays.map((holiday, idx) => (
                    <motion.div
                      key={`hdr-hol-${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + (idx * 0.1), type: 'spring' }}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm border border-white/20 bg-red-500/80 text-white"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span className="font-semibold text-xs tracking-wide">{holiday.toUpperCase()}</span>
                    </motion.div>
                  ))}

                  {/* Show officially designated Bali Holidays in header too */}
                  {baliDate.events
                    .filter(e => BALI_HOLIDAYS.includes(e))
                    .map((event, idx) => (
                      <motion.div
                        key={`hdr-evt-${idx}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + (idx * 0.1), type: 'spring' }}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm border border-white/20 bg-brand-200 text-brand-950"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="font-semibold text-xs tracking-wide">{event.toUpperCase()}</span>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
            {/* Wuku & Sasih Section */}
            <div className="p-4 sm:p-6 bg-gradient-to-b from-brand-50/50 to-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-brand-600" />
                <h3 className="text-lg font-semibold text-stone-800">{t('date_detail.main_info')}</h3>
              </div>

              {/* Rahinan & Holidays Section */}
              {(baliDate.events.length > 0 || nationalHolidays.length > 0) && (
                <div className="mb-6 p-4 sm:p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-red-500" />
                      <h3 className="font-semibold text-red-800">{t('date_detail.holidays')}</h3>
                    </div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-red-400 bg-red-100/50 px-2 py-0.5 rounded-full">{t('date_detail.tap_info')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {nationalHolidays.map((holiday, idx) => (
                      <ClickableEventRow
                        key={`hol-${idx}`}
                        title={holiday}
                        dotColorClass="bg-red-500"
                        bgClass="border-red-100"
                      />
                    ))}
                    {baliDate.events.map((event, idx) => (
                      <ClickableEventRow
                        key={`evt-${idx}`}
                        title={event}
                        dotColorClass="bg-brand-600"
                        bgClass="border-brand-100"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Piodalan Section */}
              {piodalanList.length > 0 && (
                <div className="mb-6 p-4 sm:p-5 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🛕</span>
                      <h3 className="font-semibold text-amber-900">{t('date_detail.piodalan')}</h3>
                    </div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                      {piodalanWewaran}
                    </span>
                  </div>
                  <p className="text-xs text-amber-700 mb-3">
                    {t('date_detail.piodalan_desc')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {piodalanList.map((pura, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-amber-100 shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-stone-700 leading-relaxed">{pura}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wuku Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl p-5 border border-brand-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">{t('date_detail.wuku')}</span>
                    <span className="px-2 py-1 bg-brand-100 text-brand-800 text-xs font-semibold rounded-full">
                      {t('date_detail.wuku_number', { number: baliDate.wukuNumber })} <span style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>({toBalineseDigits(baliDate.wukuNumber)})</span>
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-800">{baliDate.wuku.name}</h4>
                  {getAksaraBaliWuku(baliDate.wuku.name) && (
                    <p className="text-lg text-brand-600 mb-3" style={{ fontFamily: 'Noto Sans Balinese, sans-serif' }}>
                      {getAksaraBaliWuku(baliDate.wuku.name)}
                    </p>
                  )}
                  <div className="space-y-2 text-sm text-stone-600">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-brand-600" />
                      <span>{t('date_detail.urip')}: <span className="font-medium">{baliDate.wuku.urip}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      <span>{baliDate.wuku.dewata}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{baliDate.wuku.letak}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Sasih Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white rounded-xl p-5 border border-indigo-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">Sasih</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {baliDate.sasih.masehiMonth}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-800 mb-3">{baliDate.sasih.name}</h4>
                  <div className="space-y-2 text-sm text-stone-600">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-indigo-500" />
                      <span>Bulan ke-<span className="font-medium">{baliDate.sasih.month}</span></span>
                    </div>
                    {baliDate.penanggalPangelong && (
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-blue-500" />
                        <span>Fase: <span className="font-medium">{baliDate.penanggalPangelong.status} {Math.round(baliDate.penanggalPangelong.day)}</span></span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-600" />
                      <span>{t('date_detail.deity')}: {baliDate.sasih.dewata}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Wewaran Section */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight className="w-5 h-5 text-brand-600" />
                <h3 className="text-lg font-semibold text-stone-800">{t('date_detail.wewaran')}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {/* Ekawara - hanya tampil jika ada */}
                {baliDate.ekawara && (
                  <WewaranCard
                    title="Ekawara (1)"
                    wewaran={baliDate.ekawara}
                    delay={0.2}
                    highlight={true}
                  />
                )}

                <WewaranCard title="Dwiwara (2)" wewaran={baliDate.dwiwara} delay={0.25} />
                <WewaranCard title="Triwara (3)" wewaran={baliDate.triwara} delay={0.3} />
                <WewaranCard title="Caturwara (4)" wewaran={baliDate.caturwara} delay={0.35} />
                <WewaranCard title="Pancawara (5)" wewaran={baliDate.pancawara} delay={0.4} highlight={true} />
                <WewaranCard title="Sadwara (6)" wewaran={baliDate.sadwara} delay={0.45} />
                <WewaranCard title="Saptawara (7)" wewaran={baliDate.saptawara} delay={0.5} highlight={true} />
                <WewaranCard title="Astawara (8)" wewaran={baliDate.astawara} delay={0.55} />
                <WewaranCard title="Sangawara (9)" wewaran={baliDate.sangawara} delay={0.6} />
                <WewaranCard title="Dasawara (10)" wewaran={baliDate.dasawara} delay={0.65} highlight={true} />
              </div>
            </div>

            {/* Ala Ayuning Dewasa & Personalitas Section */}
            <div className="p-4 sm:p-6 bg-gradient-to-b from-white to-stone-50 border-t border-stone-100">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-stone-800">Ala Ayuning Dewasa & Personalitas</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                <ExpandableDetailCard
                  title="Pancasuda"
                  value={baliDate.pancasuda}
                  colorClass="text-indigo-700"
                  description="Pancasuda merupakan sisa hitungan pembagian untuk memprediksi nasib, peruntungan, dan karakter dasar manusia menurut Wewaran."
                />
                <ExpandableDetailCard
                  title="Rakâm"
                  value={baliDate.rakam}
                  colorClass="text-brand-800"
                  description="Rakâm adalah nilai ramalan yang secara khusus membaca potensi rintangan atau kecenderungan emosional bawaan."
                />
                <ExpandableDetailCard
                  title="Ekajalaresi"
                  value={baliDate.ekajalaresi}
                  colorClass="text-rose-700"
                  description="Ekajalaresi mengategorikan momen ke dalam salah satu dari 29 sifat untuk melihat baik-buruknya suatu kejadian atau watak keturunan."
                />
                <ExpandableDetailCard
                  title="Watek Alit / Madya"
                  value={`${baliDate.watekAlit} / ${baliDate.watekMadya}`}
                  colorClass="text-emerald-700"
                  description="Watek (perwatakan) meminjam sifat fauna (Watek Alit) dan makhluk mitologis (Watek Madya) sebagai cerminan naluri alamiah."
                />
                <ExpandableDetailCard
                  title="Ingkel"
                  value={baliDate.ingkel}
                  colorClass="text-sky-700"
                  description="Ingkel adalah masa pantangan mingguan. Sesuai namanya, pada hari tersebut ada halangan tertentu (misal: Ingkel Taru berarti pantang menebang/menanam pohon)."
                />
                <ExpandableDetailCard
                  title="Jejepan"
                  value={baliDate.jejepan}
                  colorClass="text-fuchsia-700"
                  description="Jejepan serupa dengan watek namun lebih difokuskan pada fluktuasi keberuntungan dan titik lemah harian."
                />
                <ExpandableDetailCard
                  title="Lintang"
                  value={baliDate.lintang}
                  colorClass="text-cyan-700"
                  description="Lintang mengkorelasikan kelahiran dengan posisi gugus bintang tertentu, diyakini memengaruhi minat, rezeki dan jodoh."
                />
                <ExpandableDetailCard
                  title="Pararasan"
                  value={baliDate.pararasan}
                  colorClass="text-brand-900"
                  description="Pararasan menunjukkan unsur elemen (air, api, bumi, laku lintang, dsb) yang dominan dan menentukan kecocokan pergaulan sosial."
                />
                <ExpandableDetailCard
                  title="Zodiak"
                  value={baliDate.zodiak}
                  colorClass="text-violet-700"
                  description="Zodiak rujukan astrologi Barat/Internasional yang didasarkan siklus edar bumi terhadap matahari secara universal."
                />
              </div>

              {/* Ala Ayuning Dewasa Section */}
              {baliDate.dewasaAyu && baliDate.dewasaAyu.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-stone-800">{t('date_detail.yadnya_summary')}</h3>
                    <Badge variant="secondary" className="ml-auto bg-indigo-100 text-indigo-700">
                      {baliDate.dewasaAyu.length} Petunjuk
                    </Badge>
                  </div>

                  {/* Rekomendasi (Alah Dening Alah) Skor */}
                  <div className="mb-6 p-4 bg-white border border-indigo-50 shadow-sm rounded-xl">
                    <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      Keselarasan Hari (Alah Dening Alah)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {Object.entries(yadnyaScores).filter(([_, score]) => score.baik > 0 || score.buruk > 0).map(([category, score]) => {
                        const total = score.baik + score.buruk;
                        const percentage = total === 0 ? 0 : Math.round((score.baik / total) * 100);

                        let colorClass = 'bg-stone-200';
                        let textColor = 'text-stone-600';
                        if (percentage >= 75) { colorClass = 'bg-green-500'; textColor = 'text-green-700'; }
                        else if (percentage >= 50) { colorClass = 'bg-blue-500'; textColor = 'text-blue-700'; }
                        else if (percentage >= 25) { colorClass = 'bg-brand-600'; textColor = 'text-brand-800'; }
                        else { colorClass = 'bg-red-500'; textColor = 'text-red-700'; }

                        return (
                          <div key={category} className="flex flex-col gap-1">
                            <div className="flex justify-between items-end text-xs">
                              <span className="font-medium text-stone-600">{category}</span>
                              <span className={`font-bold ${textColor}`}>{percentage}% Baik</span>
                            </div>
                            <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                              <div className={`h-full ${colorClass} transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                              <span>{score.baik} Anjuran</span>
                              <span>{score.buruk} Pantangan</span>
                            </div>
                          </div>
                        );
                      })}
                      {Object.values(yadnyaScores).every(score => score.baik === 0 && score.buruk === 0) && (
                        <p className="text-xs text-stone-500 col-span-2 italic">Tidak ada petunjuk spesifik untuk kategori Yadnya pada hari ini.</p>
                      )}
                    </div>
                  </div>

                  {/* Dewasa Pawiwahan Score Section */}
                  {pawiwahanScore && (
                    <div className="mb-6 p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <Star className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-emerald-900 leading-tight">{t('date_detail.pawiwahan_score')}</h4>
                            <p className="text-[10px] sm:text-xs text-emerald-700 mt-0.5">Rekomendasi Hari Pernikahan</p>
                          </div>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${pawiwahanScore.isHariUtama ? 'bg-emerald-500 text-white' :
                          pawiwahanScore.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                            pawiwahanScore.score >= 50 ? 'bg-brand-100 text-brand-900' :
                              'bg-rose-100 text-rose-800'
                          }`}>
                          {pawiwahanScore.score}% {pawiwahanScore.isHariUtama ? '(Hari Utama)' : ''}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Good Matches (Hari Utama / Anjuran) */}
                        {pawiwahanScore.goodMatches.length > 0 && (
                          <div className="bg-white/60 p-3 rounded-lg border border-emerald-50">
                            <span className="text-xs font-semibold text-emerald-800 block mb-2">Keutamaan / Anjuran:</span>
                            <ul className="space-y-2">
                              {pawiwahanScore.goodMatches.map((match, idx) => (
                                <li key={`good-${idx}`} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                                  <div>
                                    <span className="text-xs font-medium text-emerald-900 block">{match.name}</span>
                                    <span className="text-[10px] text-stone-600 leading-relaxed block mt-0.5">{match.description}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Bad Matches (Larangan) */}
                        {pawiwahanScore.badMatches.length > 0 && (
                          <div className="bg-white/60 p-3 rounded-lg border border-rose-50">
                            <span className="text-xs font-semibold text-rose-800 block mb-2">Pantangan / Larangan:</span>
                            <ul className="space-y-2">
                              {pawiwahanScore.badMatches.map((match, idx) => (
                                <li key={`bad-${idx}`} className="flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${match.warningType === 'larangan_mutlak' ? 'bg-red-600' : 'bg-rose-400'}`} />
                                  <div>
                                    <span className={`text-xs font-medium block ${match.warningType === 'larangan_mutlak' ? 'text-red-700' : 'text-rose-900'}`}>{match.name}</span>
                                    <span className="text-[10px] text-stone-600 leading-relaxed block mt-0.5">{match.description}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {pawiwahanScore.goodMatches.length === 0 && pawiwahanScore.badMatches.length === 0 && (
                          <p className="text-xs text-stone-500 italic text-center py-2">Hari ini netral untuk Pawiwahan.</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {baliDate.dewasaAyu.map((rule, idx) => (
                      <div key={idx} className="bg-white border text-sm border-indigo-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-semibold text-indigo-900 mb-2 flex items-start justify-between">
                          <span>{rule.name}</span>
                          {rule.tags?.some(t => t.includes('Larangan')) ? (
                            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2 mt-0.5" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-indigo-300 flex-shrink-0 ml-2 mt-0.5" />
                          )}
                        </div>
                        {rule.tags && rule.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {rule.tags.map((tag, tIdx) => {
                              let tagColor = 'bg-stone-100 text-stone-600';

                              if (tag.startsWith('Larangan')) {
                                tagColor = 'bg-rose-100 text-rose-700 font-medium border border-rose-200';
                              } else if (tag === 'Dewa Yadnya') tagColor = 'bg-yellow-100 text-yellow-700';
                              else if (tag === 'Manusa Yadnya') tagColor = 'bg-blue-100 text-blue-700';
                              else if (tag === 'Pitra Yadnya') tagColor = 'bg-purple-100 text-purple-700';
                              else if (tag === 'Bhuta Yadnya') tagColor = 'bg-red-100 text-red-700';
                              else if (tag === 'Rsi Yadnya') tagColor = 'bg-brand-100 text-brand-900';
                              else if (tag === 'Pertanian') tagColor = 'bg-green-100 text-green-700';
                              else if (tag === 'Bangunan') tagColor = 'bg-brand-100 text-brand-800';

                              return (
                                <span key={tIdx} className={`text-[10px] px-2 py-0.5 rounded-full ${tagColor}`}>
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        <p className="text-stone-600 leading-relaxed text-xs">
                          {rule.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jam Baik / Dauh Ayu Section */}
              {baliDate.dauhAyu && (
                <div className="mt-8 bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-stone-800">Dauh Ayu (Jam Baik)</h3>
                  </div>
                  <p className="text-xs text-stone-500 mb-4">
                    Daftar rentang waktu yang direkomendasikan untuk memulai kegiatan penting pada hari <b>{baliDate.dauhAyu.saptawara}</b> menurut perhitungan Wariga Dauh (Waktu Setempat).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Siang */}
                    <div className="bg-white rounded-xl p-4 border border-indigo-50 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-brand-600">
                        <Sun className="w-4 h-4" />
                        <span className="font-semibold text-sm">Waktu Siang</span>
                      </div>
                      <ul className="space-y-2">
                        {baliDate.dauhAyu.siang.map((time, idx) => (
                          <li key={`siang-${idx}`} className="flex items-center gap-2 text-sm text-stone-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div>
                            <span className="font-medium font-mono">{time}</span>
                          </li>
                        ))}
                        {baliDate.dauhAyu.siang.length === 0 && (
                          <li className="text-xs text-stone-400 italic">Tidak ada rentang jam baik siang.</li>
                        )}
                      </ul>
                    </div>
                    {/* Malam */}
                    <div className="bg-white rounded-xl p-4 border border-indigo-50 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-indigo-500">
                        <Moon className="w-4 h-4" />
                        <span className="font-semibold text-sm">Waktu Malam</span>
                      </div>
                      <ul className="space-y-2">
                        {baliDate.dauhAyu.malam.map((time, idx) => (
                          <li key={`malam-${idx}`} className="flex items-center gap-2 text-sm text-stone-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                            <span className="font-medium font-mono">{time}</span>
                          </li>
                        ))}
                        {baliDate.dauhAyu.malam.length === 0 && (
                          <li className="text-xs text-stone-400 italic">Tidak ada rentang jam baik malam.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Pewatekan Rare Section */}
              {baliDate.pewatekan && (
                <div className="mt-8 bg-pink-50/50 rounded-2xl p-5 border border-pink-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Baby className="w-5 h-5 text-pink-500" />
                    <h3 className="text-lg font-semibold text-stone-800">Pewatekan Rare (Karakteristik Lahir)</h3>
                  </div>
                  <p className="text-xs text-stone-500 mb-4">
                    Gambaran karakter/sifat dominan seseorang yang lahir pada kombinasi wewaran hari ini berdasarkan Lontar Wariga Catur Winasa Sari.
                  </p>
                  <div className="flex flex-col gap-3">
                    {Object.entries(baliDate.pewatekan)
                      .filter(([_, data]) => data !== undefined)
                      .map(([key, data]) => {
                        const entry = data as { wewaranName: string; category: string; watak: string };
                        return (
                          <div key={key} className="bg-white p-3 rounded-lg border border-pink-50 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start shadow-sm">
                            <div className="min-w-[120px]">
                              <span className="text-xs font-semibold text-pink-700 uppercase tracking-wider">{entry.wewaranName}</span>
                              <div className="text-sm font-bold text-stone-800">{entry.category}</div>
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">
                              {entry.watak}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Banten Penebusan Section */}
              {baliDate.penebusan && baliDate.penebusan.length > 0 && (
                <div className="mt-4 bg-brand-50 rounded-2xl p-5 border border-brand-200">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-brand-700" />
                    <h3 className="text-lg font-semibold text-stone-800">Banten Otonan & Penebusan Watek</h3>
                  </div>
                  <div className="space-y-4">
                    {baliDate.penebusan.map((penebusan, idx) => {
                      const isSpecial = penebusan.isWajib || penebusan.title.includes("Mebayuh");
                      const cardBorder = isSpecial ? "border-rose-200" : "border-brand-100";
                      const titleColor = isSpecial ? "text-rose-800" : "text-brand-950";
                      const listBg = isSpecial ? "bg-rose-50/50" : "bg-brand-50/50";

                      return (
                        <div key={idx} className={`bg-white p-4 rounded-xl border ${cardBorder} shadow-sm relative overflow-hidden`}>
                          {penebusan.isWajib && (
                            <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg">
                              Wajib
                            </div>
                          )}
                          <h4 className={`font-semibold ${titleColor} mb-2 mr-12`}>{penebusan.title}</h4>
                          <p className="text-xs text-stone-600 mb-3">{penebusan.description}</p>
                          <div className={`${listBg} p-3 rounded-lg`}>
                            <span className="text-xs font-semibold text-stone-700 block mb-2">Komponen Banten:</span>
                            <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                              {penebusan.bantenList.map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Info */}
            <div className="p-4 bg-stone-100 text-center border-t border-stone-200">
              <p className="text-xs text-stone-500 text-center leading-relaxed">
                Kalender Bali menggunakan sistem perhitungan warisan leluhur yang mencakup
                siklus Wuku (30 minggu), Sasih (12 bulan), dan Wewaran (siklus hari 1-10).
                Setiap hari memiliki energi dan karakteristik unik berdasarkan perhitungan ini.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
