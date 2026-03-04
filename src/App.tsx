import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/Calendar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getBaliDate } from '@/utils/bali-calendar';
import { getNationalHolidays } from '@/utils/holidays';
import { searchBaliCalendar } from '@/utils/search-utils';
import type { BaliDate } from '@/types/bali-calendar';
import {
  CalendarDays,
  Sun,
  Moon,
  Flower2,
  Flame,
  X,
  Search
} from 'lucide-react';

// Lazy-loaded components (loaded on demand, not in initial bundle)
const DateDetail = lazy(() => import('@/components/DateDetail').then(m => ({ default: m.DateDetail })));
const SearchPanel = lazy(() => import('@/components/SearchPanel').then(m => ({ default: m.SearchPanel })));
const InfoSection = lazy(() => import('@/components/InfoSection').then(m => ({ default: m.InfoSection })));
const WidgetView = lazy(() => import('@/components/WidgetView').then(m => ({ default: m.WidgetView })));
const WidgetEmbedModal = lazy(() => import('@/components/WidgetEmbedModal').then(m => ({ default: m.WidgetEmbedModal })));
const PrivacyPolicy = lazy(() => import('@/components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('@/components/TermsOfService').then(m => ({ default: m.TermsOfService })));

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'privacy' | 'terms'>('home');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBaliDate, setSelectedBaliDate] = useState<BaliDate | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [widgetModalOpen, setWidgetModalOpen] = useState(false);
  const [downloadModalTab, setDownloadModalTab] = useState<'hariBaik' | 'pawiwahan' | 'melahirkan' | null>(null);

  // Widget State Detection
  const isWidgetMode = useMemo(() => {
    return new URLSearchParams(window.location.search).get('widget') === 'true';
  }, []);

  // Holidays state
  const [holidays, setHolidays] = useState<Record<string, string[]>>({});

  // Fetch holidays whenever the year changes
  useEffect(() => {
    const year = currentMonth.getFullYear();
    getNationalHolidays(year).then(data => {
      setHolidays(prev => ({ ...prev, ...data }));
    });
    // Also prefetch next and previous year just in case
    getNationalHolidays(year + 1).then(data => setHolidays(prev => ({ ...prev, ...data })));
    getNationalHolidays(year - 1).then(data => setHolidays(prev => ({ ...prev, ...data })));
  }, [currentMonth.getFullYear()]);

  const handleSelectDate = (date: Date, baliDate?: BaliDate) => {
    setSelectedDate(date);
    if (baliDate) {
      setSelectedBaliDate(baliDate);
      // setShowDetail(true);
    } else {
      // If we only have normal Date (e.g. from SearchPanel Masehi M/Y search)
      // we change month but don't show detail pop-up until they click on grid
      setCurrentMonth(date);
    }
  };

  const handleCloseDetail = () => {
    // setShowDetail(false);
    setSelectedBaliDate(null);
  };

  const currentDayObj = new Date();
  // Memoize the expensive Bali date calculation for today
  const todayBaliDate = useMemo(() => getBaliDate(currentDayObj), []);
  const todayDateStr = `${currentDayObj.getFullYear()}-${(currentDayObj.getMonth() + 1).toString().padStart(2, '0')}-${currentDayObj.getDate().toString().padStart(2, '0')}`;
  const todayHolidays = holidays[todayDateStr] || [];

  const getDaysDiff = (targetDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - today.getTime()) / (1000 * 3600 * 24));
  };

  // Deferred: compute upcoming events AFTER initial render to avoid blocking paint
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    // Use requestIdleCallback (or setTimeout fallback) to defer heavy computation
    const compute = () => {
      const types: ('purnama' | 'tilem' | 'kajengkliwon' | 'galungan' | 'kuningan' | 'nyepi' | 'tumpek' | 'anggarakasih' | 'budacemeng')[] =
        ['purnama', 'tilem', 'kajengkliwon', 'galungan', 'kuningan', 'nyepi', 'tumpek', 'anggarakasih', 'budacemeng'];

      let allResults: any[] = [];
      const tomorrow = new Date(currentDayObj);
      tomorrow.setDate(tomorrow.getDate() + 1);

      types.forEach(type => {
        const results = searchBaliCalendar({ type, startDate: tomorrow }, 1);
        if (results.length > 0) {
          allResults.push({ ...results[0], searchType: type });
        }
      });

      // Check national holidays 40 days ahead
      const checkDate = new Date(tomorrow);
      for (let i = 0; i < 40; i++) {
        const ds = `${checkDate.getFullYear()}-${(checkDate.getMonth() + 1).toString().padStart(2, '0')}-${checkDate.getDate().toString().padStart(2, '0')}`;
        if (holidays[ds] && holidays[ds].length > 0) {
          holidays[ds].forEach(hol => {
            allResults.push({ date: new Date(checkDate), label: hol, searchType: 'holiday' });
          });
        }
        checkDate.setDate(checkDate.getDate() + 1);
      }

      const getPriority = (evt: any) => {
        if (evt.searchType === 'purnama' || evt.searchType === 'tilem') return 1;
        if (evt.searchType === 'kajengkliwon') return 2;
        if (evt.searchType === 'tumpek') return 3;
        if (evt.searchType === 'anggarakasih') return 4;
        if (evt.searchType === 'budacemeng') return 5;
        if (['galungan', 'kuningan', 'nyepi'].includes(evt.searchType)) return 6;
        if (evt.searchType === 'holiday') return 7;
        return 8;
      };

      allResults.sort((a, b) => {
        const dateDiff = a.date.getTime() - b.date.getTime();
        return dateDiff === 0 ? getPriority(a) - getPriority(b) : dateDiff;
      });

      // Deduplicate
      const deduplicatedResults: any[] = [];
      allResults.forEach(evt => {
        const label = evt.searchType === 'kajengkliwon' ? 'KAJENG KLIWON' :
          ['purnama', 'tilem', 'tumpek', 'anggarakasih', 'budacemeng'].includes(evt.searchType) ? evt.label.toUpperCase() : evt.label;
        const normalizedLabel = label.toLowerCase();
        const isNyepi = normalizedLabel.includes('nyepi');

        const isDuplicate = deduplicatedResults.some(existing => {
          const existingLabel = (existing.searchType === 'kajengkliwon' ? 'KAJENG KLIWON' :
            ['purnama', 'tilem', 'tumpek', 'anggarakasih', 'budacemeng'].includes(existing.searchType) ? existing.label.toUpperCase() : existing.label).toLowerCase();
          const isSameDate = existing.date.getTime() === evt.date.getTime();
          if (isSameDate) {
            const overlapKeywords = ['nyepi', 'galungan', 'kuningan', 'saraswati', 'pagerwesi', 'siwaratri'];
            for (const word of overlapKeywords) {
              if (normalizedLabel.includes(word) && existingLabel.includes(word)) return true;
            }
          }
          if (isNyepi && existingLabel.includes('nyepi')) return true;
          if (normalizedLabel === existingLabel) return true;
          return false;
        });

        if (!isDuplicate) deduplicatedResults.push(evt);
      });

      setUpcomingEvents(deduplicatedResults.slice(0, 7));
    };

    // Defer computation to after paint
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(compute);
    } else {
      setTimeout(compute, 100);
    }
  }, [holidays]);

  // Helper to determine special holiday highlight
  const getSpecialHighlight = () => {
    if (todayBaliDate.purnamaTilem) {
      return {
        type: `${todayBaliDate.purnamaTilem.type.toUpperCase()} ${todayBaliDate.sasih.name.split(' ')[1].toUpperCase()}`,
        icon: todayBaliDate.purnamaTilem.type === 'Purnama' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />,
        bgClass: todayBaliDate.purnamaTilem.type === 'Purnama' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 'bg-slate-700 text-slate-100 border-slate-600'
      };
    }

    // Check Kajeng Kliwon
    if (todayBaliDate.triwara.name.includes('Kajeng') && todayBaliDate.pancawara.name.includes('Kliwon')) {
      const isEnyitan = todayBaliDate.penanggalPangelong?.status === 'Penanggal';
      return {
        type: `KAJENG KLIWON ${isEnyitan ? 'ENYITAN' : 'UWUDAN'}`,
        icon: <Flame className="w-5 h-5" />,
        bgClass: 'bg-red-50 text-red-800 border-red-200'
      };
    }

    // Check Major Holidays
    const majorHolidays = ['Galungan', 'Kuningan', 'Nyepi', 'Saraswati', 'Siwaratri', 'Pagerwesi'];
    for (const holiday of majorHolidays) {
      if (todayBaliDate.events.some(e => e.includes(holiday))) {
        return {
          type: holiday.toUpperCase(),
          icon: <Flower2 className="w-5 h-5" />,
          bgClass: 'bg-brand-50 text-brand-800 border-brand-200'
        };
      }
    }

    return null;
  };

  const specialHighlight = getSpecialHighlight();

  // Determine what content to show based on the active page
  const renderMainContent = () => {
    if (currentPage === 'about') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <InfoSection />
        </motion.div>
      );
    }

    if (currentPage === 'privacy') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <PrivacyPolicy />
        </motion.div>
      );
    }

    if (currentPage === 'terms') {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <TermsOfService />
        </motion.div>
      );
    }

    // Default Home Page View
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Sidebar */}
        <div className="lg:col-span-3 h-full min-h-0">

          {/* Today's Info Card */}
          <motion.div
            className="h-full min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-5 relative overflow-hidden group h-full flex flex-col min-h-0">

              <div className="flex flex-wrap justify-between items-start mb-4 gap-2 relative z-10">
                <span className="bg-stone-800 text-white text-xs px-3 py-1 rounded-full font-medium">Hari Ini</span>
                <span className="bg-brand-600 text-white text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap">Saka {todayBaliDate.sakaYear}</span>
              </div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                  <CalendarDays className="w-7 h-7 text-brand-700" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-stone-900 leading-tight">
                    {new Date().toLocaleDateString('id-ID', { weekday: 'long' })}
                  </h2>
                  <p className="text-stone-500 text-sm mt-0.5">
                    {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="space-y-3 relative z-10 border-t border-stone-100 pt-4">
                {todayBaliDate.ekawara && (
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Eka Wara</span>
                    <span className="font-semibold text-stone-800">{todayBaliDate.ekawara.name}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Saptawara</span>
                  <span className="font-semibold text-stone-800">{todayBaliDate.saptawara.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Panca Wara</span>
                  <span className="font-semibold text-stone-800">{todayBaliDate.pancawara.name.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Dasa Wara</span>
                  <span className="font-semibold text-stone-800">{todayBaliDate.dasawara.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Wuku</span>
                  <span className="font-semibold text-stone-800">{todayBaliDate.wuku.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Sasih</span>
                  <span className="font-semibold text-stone-800">{todayBaliDate.sasih.name.split(' ')[1]}</span>
                </div>

                {todayBaliDate.penanggalPangelong && (
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">{todayBaliDate.penanggalPangelong.status}</span>
                    <span className="font-semibold text-stone-800">{Math.round(todayBaliDate.penanggalPangelong.day)}</span>
                  </div>
                )}

                {(todayBaliDate.events.length > 0 || todayHolidays.length > 0) && (
                  <div className="pt-3 mt-3 border-t border-stone-100">
                    <span className="text-xs text-stone-500 font-medium block mb-2">Hari Penting & Libur</span>
                    <div className="flex flex-col gap-1.5">
                      {todayHolidays.map((holiday, i) => (
                        <div key={`hol-${i}`} className="flex items-center gap-1.5 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                          <span className="text-red-700 font-semibold">{holiday}</span>
                        </div>
                      ))}
                      {todayBaliDate.events.map((evt, i) => (
                        <div key={`evt-${i}`} className="flex items-center gap-1.5 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                          <span className="text-brand-700 font-medium">{evt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {specialHighlight && (
                <div className={`mt-5 flex items-center gap-2 justify-center py-2 px-3 rounded-lg border ${specialHighlight.bgClass}`}>
                  {specialHighlight.icon}
                  <span className="text-sm font-bold tracking-wide">{specialHighlight.type} HARI INI</span>
                </div>
              )}

              {/* Upcoming Events Section */}
              {upcomingEvents.length > 0 && (
                <div className="mt-6 flex-1 flex flex-col min-h-0">
                  <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2 shrink-0">
                    <CalendarDays className="w-4 h-4 text-brand-600" />
                    Akan Datang
                  </h3>
                  <div className="space-y-2.5 flex-1 pr-2 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-stone-300">
                    {upcomingEvents.map((evt, idx) => {
                      let icon = <CalendarDays className="w-4 h-4" />;
                      let bgClass = "bg-stone-50 border-stone-200 text-stone-600";
                      if (evt.searchType === 'purnama') {
                        icon = <Sun className="w-4 h-4" />;
                        bgClass = "bg-yellow-50 border-yellow-200 text-yellow-700";
                      } else if (evt.searchType === 'tilem') {
                        icon = <Moon className="w-4 h-4" />;
                        bgClass = "bg-slate-700 border-slate-600 text-slate-200";
                      } else if (evt.searchType === 'kajengkliwon') {
                        icon = <Flame className="w-4 h-4" />;
                        bgClass = "bg-red-50 border-red-200 text-red-700";
                      } else if (evt.searchType === 'holiday') {
                        icon = <CalendarDays className="w-4 h-4" />;
                        bgClass = "bg-red-50 border-red-200 text-red-700";
                      } else if (evt.searchType === 'anggarakasih' || evt.searchType === 'budacemeng') {
                        icon = <Flower2 className="w-4 h-4" />;
                        bgClass = "bg-orange-50 border-orange-200 text-orange-700";
                      } else if (['saraswati', 'pagerwesi', 'siwaratri'].includes(evt.searchType)) {
                        icon = <Flower2 className="w-4 h-4" />;
                        bgClass = "bg-purple-50 border-purple-200 text-purple-700";
                      }
                      else {
                        icon = <Flower2 className="w-4 h-4" />;
                        bgClass = "bg-brand-50 border-brand-200 text-brand-700";
                      }

                      const daysDiff = getDaysDiff(evt.date);

                      return (
                        <div key={idx} className={`flex items-center justify-between p-2.5 rounded-xl border shadow-sm ${bgClass}`}>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide mb-0.5">
                              {icon}
                              <span>{
                                evt.searchType === 'kajengkliwon' ? 'KAJENG KLIWON' :
                                  ['purnama', 'tilem', 'tumpek', 'anggarakasih', 'budacemeng'].includes(evt.searchType) ? evt.label.toUpperCase() :
                                    evt.label
                              }</span>
                            </div>
                            <span className="text-xs font-medium opacity-90">
                              {evt.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                            </span>
                          </div>
                          <div className="text-xs font-bold px-2 py-1 bg-white/50 rounded-lg whitespace-nowrap">
                            H-{daysDiff}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </div>

        {/* Center Column (Calendar & Search) */}
        <div className="lg:col-span-9 flex flex-col gap-6">

          {/* Collapsible Search Panel */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SearchPanel
                  onSelectResult={(date) => {
                    setCurrentMonth(date);
                    handleSelectDate(date);
                  }}
                  currentDate={currentMonth}
                  onHighlightCategory={(category) => {
                    setHighlightCategory(category);
                  }}
                  currentHighlightCategory={highlightCategory}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Calendar */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Calendar
              onSelectDate={handleSelectDate}
              selectedDate={selectedDate}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              nationalHolidays={holidays}
              highlightCategory={highlightCategory}
              onReset={() => setHighlightCategory(null)}
            />
          </motion.div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // Render: WIDGET MODE (IFRAME EMBEDS)
  // --------------------------------------------------------------------------
  if (isWidgetMode) {
    return <Suspense fallback={null}><WidgetView /></Suspense>;
  }

  // --------------------------------------------------------------------------
  // Render: DEFAULT MAIN WEB APPLICATION
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDownload={(tab) => {
          setDownloadModalTab(tab);
          setDownloadModalOpen(true);
        }}
        onOpenWidget={() => setWidgetModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-stone-200 border-t-[#c1121f] rounded-full animate-spin" />
          </div>
        }>
          {renderMainContent()}
        </Suspense>
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Date Detail Modal */}
      <AnimatePresence>
        {
          !!selectedBaliDate && selectedDate && (
            <DateDetail
              baliDate={selectedBaliDate}
              // Passing national holidays for the selected date if any exists
              nationalHolidays={holidays[`${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`] || []}
              onClose={handleCloseDetail}
            />
          )
        }
      </AnimatePresence >

      {/* Download PDF Modal */}
      <AnimatePresence>
        {
          downloadModalOpen && downloadModalTab && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-24">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDownloadModalOpen(false)}
                className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl flex flex-col"
              >
                <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-stone-100 bg-white shadow-sm">
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Search className="w-6 h-6 text-[#c1121f]" />
                    Cari & Download PDF
                  </h2>
                  <button
                    onClick={() => setDownloadModalOpen(false)}
                    className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4 sm:p-6 bg-stone-50">
                  <SearchPanel
                    initialTab={downloadModalTab}
                    onSelectResult={(date) => {
                      setCurrentMonth(date);
                      handleSelectDate(date);
                      setDownloadModalOpen(false);
                    }}
                    currentDate={currentMonth}
                    onHighlightCategory={(category) => {
                      setHighlightCategory(category);
                    }}
                    currentHighlightCategory={highlightCategory}
                  />
                </div>
              </motion.div>
            </div>
          )
        }
      </AnimatePresence >

      <WidgetEmbedModal
        isOpen={widgetModalOpen}
        onClose={() => setWidgetModalOpen(false)}
      />

    </div >
  );
}

export default App;
