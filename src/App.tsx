import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/Calendar';
import { DateDetail } from '@/components/DateDetail';
import { Hero } from '@/components/Hero';
import { SearchPanel } from '@/components/SearchPanel';
import { InfoSection } from '@/components/InfoSection';
import { getBaliDate, formatIndonesianDate } from '@/utils/bali-calendar';
import { getNationalHolidays } from '@/utils/holidays';
import type { BaliDate } from '@/types/bali-calendar';
import {
  CalendarDays,
  Info,
  ChevronUp,
  Sparkles
} from 'lucide-react';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBaliDate, setSelectedBaliDate] = useState<BaliDate | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDetail, setShowDetail] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null);

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
      setShowDetail(true);
    } else {
      // If we only have normal Date (e.g. from SearchPanel Masehi M/Y search)
      // we change month but don't show detail pop-up until they click on grid
      setCurrentMonth(date);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const todayBaliDate = getBaliDate(new Date());

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Today's Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-brand-600 to-brand-800 rounded-xl text-white">
                  <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-stone-500 mb-0.5">Hari Ini</p>
                  <h2 className="text-base sm:text-lg font-semibold text-stone-800">
                    {formatIndonesianDate(new Date())}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    {todayBaliDate.wuku.name} • {todayBaliDate.pancawara.name.split(' ')[0]} • {todayBaliDate.sasih.name.split(' ')[0]}
                    {todayBaliDate.penanggalPangelong ? ` • ${Math.round(todayBaliDate.penanggalPangelong.day)} ${todayBaliDate.penanggalPangelong.status}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {todayBaliDate.purnamaTilem && (
                  <div className={`
                    px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2
                    ${todayBaliDate.purnamaTilem.type === 'Purnama'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-slate-100 text-slate-800'
                    }
                  `}>
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">{todayBaliDate.purnamaTilem.type}</span>
                  </div>
                )}
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-100 text-brand-900 rounded-full text-xs sm:text-sm font-medium">
                  Saka {todayBaliDate.sakaYear}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <SearchPanel
            onSelectResult={(date) => {
              setCurrentMonth(date); // Center calendar on the found date
              handleSelectDate(date);
            }}
            currentDate={currentMonth}
            onHighlightCategory={setHighlightCategory}
            currentHighlightCategory={highlightCategory}
          />
        </motion.div>

        {/* Calendar */}
        <motion.div
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
          />
        </motion.div>

        {/* Info Toggle Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 border border-stone-200 rounded-full text-stone-600 hover:text-stone-800 transition-colors shadow-sm"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">
              {showInfo ? 'Sembunyikan Informasi' : 'Pelajari Tentang Kalender Bali'}
            </span>
            <ChevronUp className={`w-4 h-4 transition-transform ${showInfo ? '' : 'rotate-180'}`} />
          </button>
        </motion.div>

        {/* Info Section */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InfoSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-stone-600 font-medium mb-2">Kalender Bali</p>
            <p className="text-stone-500 text-sm mb-4">
              Mempertahankan warisan budaya dan spiritualitas leluhur
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-stone-400">
              <span>© {new Date().getFullYear()}</span>
              <span>•</span>
              <span>Dibuat dengan ❤️ untuk Bali</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Date Detail Modal */}
      <AnimatePresence>
        {showDetail && selectedDate && selectedBaliDate && (
          <DateDetail
            baliDate={selectedBaliDate}
            // Passing national holidays for the selected date if any exists
            nationalHolidays={holidays[`${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`] || []}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
