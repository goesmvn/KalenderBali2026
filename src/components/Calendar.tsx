import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getBaliDate, formatIndonesianDate, isHolidayBali } from '@/utils/bali-calendar';
import type { BaliDate } from '@/types/bali-calendar';
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  CalendarDays,
  Info,
  RotateCcw
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { calculateYadnyaScore } from '@/utils/yadnya-score';
import { calculatePawiwahanScore } from '@/utils/pawiwahan-score';
import { calculateKelahiranScore } from '@/utils/kelahiran-score';

interface CalendarProps {
  onSelectDate: (date: Date, baliDate: BaliDate) => void;
  selectedDate: Date | null;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  nationalHolidays?: Record<string, string[]>;
  highlightCategory?: string | null;
  onReset?: () => void;
}

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function Calendar({ onSelectDate, selectedDate, currentMonth, onMonthChange, nationalHolidays = {}, highlightCategory, onReset }: CalendarProps) {
  const [today] = useState(new Date());

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Day of week for first day (0 = Sunday)
    const startDayOfWeek = firstDay.getDay();

    // Total days in month
    const daysInMonth = lastDay.getDate();

    // Previous month days to show
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      baliDate: BaliDate;
      isNationalHoliday: boolean;
      isBaliHoliday: boolean;
      holidaysList: string[];
      yadnyaScore?: number;
      hasBadYadnyaMatch?: boolean;
    }> = [];

    // Add previous month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      const baliDate = getBaliDate(date);

      // format: YYYY-MM-DD
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const dateKey = `${date.getFullYear()}-${m}-${d}`;
      const holidaysList = nationalHolidays[dateKey] || [];
      const isIndoHoliday = holidaysList.length > 0 || date.getDay() === 0;

      let yadnyaScore = undefined;
      let hasBadYadnyaMatch = false;
      if (highlightCategory === 'dewasa_pawiwahan') {
        const scoreResult = calculatePawiwahanScore(baliDate);
        if (scoreResult.goodMatches.length > 0 || scoreResult.badMatches.length > 0) {
          yadnyaScore = scoreResult.score;
          hasBadYadnyaMatch = scoreResult.badMatches.length > 0;
        }
      } else if (highlightCategory) {
        const scoreResult = calculateYadnyaScore(baliDate, highlightCategory);
        if (scoreResult.goodMatches.length > 0 || scoreResult.badMatches.length > 0) {
          yadnyaScore = scoreResult.score;
          hasBadYadnyaMatch = scoreResult.badMatches.length > 0;
        }
      }

      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        baliDate,
        isNationalHoliday: isIndoHoliday,
        isBaliHoliday: isHolidayBali(baliDate.events),
        holidaysList,
        yadnyaScore,
        hasBadYadnyaMatch
      });
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const baliDate = getBaliDate(date);

      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const dateKey = `${date.getFullYear()}-${m}-${d}`;
      const holidaysList = nationalHolidays[dateKey] || [];
      const isIndoHoliday = holidaysList.length > 0 || date.getDay() === 0;

      let yadnyaScore = undefined;
      let hasBadYadnyaMatch = false;
      if (highlightCategory === 'dewasa_pawiwahan') {
        const scoreResult = calculatePawiwahanScore(baliDate);
        if (scoreResult.goodMatches.length > 0 || scoreResult.badMatches.length > 0) {
          yadnyaScore = scoreResult.score;
          hasBadYadnyaMatch = scoreResult.badMatches.length > 0;
        }
      } else if (highlightCategory) {
        const scoreResult = calculateYadnyaScore(baliDate, highlightCategory);
        if (scoreResult.goodMatches.length > 0 || scoreResult.badMatches.length > 0) {
          yadnyaScore = scoreResult.score;
          hasBadYadnyaMatch = scoreResult.badMatches.length > 0;
        }
      }

      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        baliDate,
        isNationalHoliday: isIndoHoliday,
        isBaliHoliday: isHolidayBali(baliDate.events),
        holidaysList,
        yadnyaScore,
        hasBadYadnyaMatch
      });
    }

    // Add next month days to fill the grid (6 rows x 7 columns = 42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      const baliDate = getBaliDate(date);

      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      const dateKey = `${date.getFullYear()}-${m}-${d}`;
      const holidaysList = nationalHolidays[dateKey] || [];
      const isIndoHoliday = holidaysList.length > 0 || date.getDay() === 0;

      let yadnyaScore = undefined;
      let hasBadYadnyaMatch = false;
      if (highlightCategory === 'dewasa_pawiwahan') {
        const scoreResult = calculatePawiwahanScore(baliDate);
        if (scoreResult.goodMatches.length > 0 || scoreResult.badMatches.length > 0) {
          yadnyaScore = scoreResult.score;
          hasBadYadnyaMatch = scoreResult.badMatches.length > 0;
        }
      } else if (highlightCategory === 'melahirkan') {
        const scoreResult = calculateKelahiranScore(baliDate, date);
        if (scoreResult.goodMatches.length > 0 || scoreResult.badMatches.length > 0) {
          yadnyaScore = scoreResult.score;
          hasBadYadnyaMatch = scoreResult.badMatches.length > 0;
        }
      } else if (highlightCategory) {
        const scoreResult = calculateYadnyaScore(baliDate, highlightCategory);
        if (scoreResult.goodMatches.length > 0 || scoreResult.badMatches.length > 0) {
          yadnyaScore = scoreResult.score;
          hasBadYadnyaMatch = scoreResult.badMatches.length > 0;
        }
      }

      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        baliDate,
        isNationalHoliday: isIndoHoliday,
        isBaliHoliday: isHolidayBali(baliDate.events),
        holidaysList,
        yadnyaScore,
        hasBadYadnyaMatch
      });
    }

    return days;
  }, [currentMonth, today, nationalHolidays, highlightCategory]);

  const goToPreviousMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    onMonthChange(new Date());
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <p className="text-white/80 text-sm">
                  Kalender Bali
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {highlightCategory && onReset && (
                <button
                  onClick={onReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-sm font-medium transition-colors"
                  title="Reset Pencarian"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
              <button
                onClick={goToToday}
                className="hidden sm:flex px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Hari Ini
              </button>
              <button
                onClick={goToPreviousMonth}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="px-4 sm:px-6 py-3 bg-stone-50 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-stone-600">Purnama</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <span className="text-stone-600">Tilem</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-600"></div>
              <span className="text-stone-600">Hari Ini</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-3 h-3 text-stone-400" />
              <span className="text-stone-500 italic">Klik tanggal untuk detail</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4 sm:p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs sm:text-sm font-semibold text-stone-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((day, index) => {
              const isPurnama = day.baliDate.purnamaTilem?.type === 'Purnama';
              const isTilem = day.baliDate.purnamaTilem?.type === 'Tilem';
              const isSelected = isSelectedDate(day.date);

              const hasHighlight = day.yadnyaScore !== undefined;
              let highlightStyle = {};
              if (hasHighlight) {
                const score = day.yadnyaScore!;
                if (score > 0) {
                  // Hijau based on percentage
                  highlightStyle = { backgroundColor: `rgba(16, 185, 129, ${Math.max(0.1, score / 100)})`, borderColor: `rgba(16, 185, 129, ${score / 100 + 0.2})` };
                } else if (day.hasBadYadnyaMatch) {
                  // Merah pudar jika murni larangan (score 0 tapi punya pantangan)
                  highlightStyle = { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' };
                }
              }

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.005 }}
                  onClick={() => onSelectDate(day.date, day.baliDate)}
                  style={hasHighlight ? highlightStyle : undefined}
                  className={`
                    relative aspect-square sm:aspect-auto sm:h-20 md:h-24 rounded-lg sm:rounded-xl p-1 sm:p-2
                    flex flex-col items-center justify-start sm:justify-between
                    transition-all duration-200 overflow-hidden min-w-0
                    ${!hasHighlight && day.isCurrentMonth
                      ? 'bg-white hover:bg-brand-50'
                      : ''
                    }
                    ${!hasHighlight && !day.isCurrentMonth
                      ? 'bg-stone-50 text-stone-400'
                      : ''
                    }
                    ${day.isToday && !hasHighlight
                      ? 'ring-2 ring-brand-600 ring-offset-1'
                      : 'border border-stone-100 hover:border-brand-200'
                    }
                    ${isSelected && !hasHighlight
                      ? 'bg-gradient-to-br from-brand-100 to-brand-50 border-brand-300'
                      : ''
                    }
                    ${isSelected && hasHighlight
                      ? 'ring-2 ring-brand-600 ring-offset-1 ring-offset-stone-50'
                      : ''
                    }
                  `}
                >
                  {/* Events Indicator */}
                  {day.isNationalHoliday && (
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 shadow-sm" />
                  )}

                  {/* Date Number with Red Circle for Bali Holiday */}
                  <div className={`mt-0.5 sm:mt-1 flex items-center justify-center ${day.isBaliHoliday ? 'w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-red-500' : ''}`}>
                    <span className={`
                      text-sm sm:text-base font-medium z-10
                      ${day.isCurrentMonth ? (hasHighlight && day.yadnyaScore! > 60 ? 'text-emerald-950 font-bold' : 'text-stone-700') : 'text-stone-400'}
                      ${day.isToday ? 'text-brand-700 font-bold' : ''}
                      ${isSelected ? 'text-brand-900' : ''}
                      ${day.isNationalHoliday && day.isCurrentMonth && !day.isToday && !isSelected ? 'text-red-600 font-bold' : ''}
                    `}>
                      {day.date.getDate()}
                    </span>
                  </div>

                  {/* Top Right Indicators: Purnama/Tilem & Yadnya Score */}
                  {(hasHighlight || isPurnama || isTilem) && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex flex-col items-end gap-1 z-20">

                      {/* Purnama/Tilem Icon goes first (topmost) */}
                      {(isPurnama || isTilem) && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={`
                              w-4 h-4 sm:w-5 sm:h-5 rounded-full 
                              flex items-center justify-center shadow-sm
                              ${isPurnama
                                ? 'bg-yellow-400 text-yellow-900 border border-yellow-500'
                                : 'bg-slate-700 text-slate-100 border border-slate-800'
                              }
                            `}>
                              {isPurnama ? (
                                <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              ) : (
                                <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isPurnama ? 'Purnama' : 'Tilem'}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {/* Yadnya Score Indicator */}
                      {hasHighlight && (
                        <>
                          {day.yadnyaScore! > 0 && (
                            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-white/60 px-1 rounded backdrop-blur-sm shadow-sm border border-emerald-50">
                              {day.yadnyaScore}%
                            </span>
                          )}
                          {highlightCategory === 'dewasa_pawiwahan' && day.hasBadYadnyaMatch && day.yadnyaScore! === 0 && (
                            <span className="text-[8px] sm:text-[9px] font-bold text-red-700 bg-red-100/90 px-1 rounded backdrop-blur-sm shadow-sm border border-red-200 whitespace-nowrap">
                              <span className="hidden sm:inline">Hindari</span>
                              <span className="sm:hidden">!</span>
                            </span>
                          )}
                          {highlightCategory !== 'dewasa_pawiwahan' && day.hasBadYadnyaMatch && day.yadnyaScore! < 50 && (
                            <span className="text-[8px] sm:text-[9px] font-bold text-red-700 bg-red-100/90 px-1 rounded backdrop-blur-sm shadow-sm border border-red-200 whitespace-nowrap">
                              <span className="hidden sm:inline">Larangan</span>
                              <span className="sm:hidden">!</span>
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Bali Info - Hidden on very small screens */}
                  <div className="hidden sm:flex flex-col items-center gap-0.5 mt-1 z-10 mix-blend-multiply w-full px-0.5">
                    <span className="text-[10px] text-stone-500 truncate w-full text-center block">
                      {day.baliDate.pancawara.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-stone-400 truncate w-full text-center block">
                      {day.baliDate.wuku.name}
                    </span>
                    {day.holidaysList.length > 0 && (
                      <span className="text-[10px] sm:text-[9px] font-medium text-red-500 truncate w-full text-center block" title={day.holidaysList.join(', ')}>
                        {day.holidaysList.join(', ')}
                      </span>
                    )}
                  </div>

                  {/* Today Indicator */}
                  {day.isToday && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-brand-600 rounded-full shadow-sm z-20"></div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Highlight Legend */}
        {highlightCategory && (
          <div className="px-4 sm:px-6 py-2 bg-emerald-50 border-t border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-800">
                {highlightCategory === 'dewasa_pawiwahan' ? 'Hari Baik: Dewasa Pawiwahan' : `Hari Baik: ${highlightCategory}`}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <div className="w-3 h-3 rounded bg-emerald-500 border border-emerald-600"></div>
                <span className="text-emerald-900 font-medium">100% {highlightCategory === 'dewasa_pawiwahan' ? '(Hari Utama)' : '(Sangat Baik)'}</span>
              </div>
              <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity hidden sm:flex">
                <div className="w-3 h-3 rounded bg-emerald-500/50 border border-emerald-600/50"></div>
                <span className="text-emerald-800">Campuran</span>
              </div>
              <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <div className="w-3 h-3 rounded bg-red-100 border border-red-200"></div>
                <span className="text-stone-600">Ada Larangan</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-stone-50 border-t border-stone-200">
          <p className="text-xs text-stone-500 text-center">
            {formatIndonesianDate(new Date())} • Tahun Saka {getBaliDate(new Date()).sakaYear}
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
