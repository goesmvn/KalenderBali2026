import { useState, useEffect } from 'react';
import { Calendar } from './Calendar';
import { DateDetail } from './DateDetail';
import type { BaliDate } from '@/types/bali-calendar';

interface WidgetViewProps {
    isPreview?: boolean;
}

export function WidgetView({ isPreview = false }: WidgetViewProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedBaliDate, setSelectedBaliDate] = useState<BaliDate | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        // Tracker Logic: Ping our server endpoint with the referrer to know who embeds KalenderBali
        const trackWidgetUsage = async () => {
            if (isPreview) return; // Skip tracking on internal modal previews

            try {
                // If it's loaded in an iframe, document.referrer will typically contain the parent URL
                // If loaded directly, document.referrer might be empty.
                const embedUrl = document.referrer || "direct";

                // IMPORTANT: Change this URL to the actual backend tracing endpoint you build at NusaHeritage
                // e.g. "https://api.nusaheritage.id/widget-track"
                const trackingEndpoint = "https://api.nusaheritage.id/track-widget";

                // We use a NO-CORS mode POST to 'fire-and-forget' the ping without relying on cross-origin complex setups as it's an iframe
                await fetch(trackingEndpoint, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'widget_load',
                        source_url: embedUrl,
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (err) {
                // Silently ignore ping tracking failures so we don't break the calendar for end users
                console.debug("Widget tracking ping failed", err);
            }
        };

        trackWidgetUsage();
    }, []);

    const handleSelectDate = (date: Date, baliDate?: BaliDate) => {
        setSelectedDate(date);
        if (baliDate) {
            setSelectedBaliDate(baliDate);
        } else {
            setCurrentMonth(date);
        }
    };

    const handleCloseDetail = () => {
        setSelectedBaliDate(null);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col font-sans relative">

            {/* Widget Header Identity */}
            <a href="https://kalenderbali.id" target="_blank" rel="noopener noreferrer" className="w-full bg-white border-b border-stone-200 py-3 px-4 flex justify-center items-center gap-2 shadow-sm hover:bg-stone-50 transition-colors block text-center">
                <div className="flex items-center justify-center gap-2">
                    <img
                        src="https://nusaheritage.id/niceadmin/assets/img/logo2.jpeg"
                        alt="KalenderBali Logo"
                        className="w-6 h-6 rounded object-cover shadow-sm"
                    />
                    <div className="text-base font-extrabold tracking-tight">
                        <span className="text-stone-800">KalenderBali</span>
                        <span className="text-[#c1121f]">.id</span>
                    </div>
                </div>
            </a>

            {/* Widget Mode typically desires a clean view: Only Calendar */}
            <div className="w-full h-full flex-1 max-w-[800px] mx-auto p-2 sm:p-4">
                <Calendar
                    selectedDate={selectedDate || currentMonth}
                    onSelectDate={handleSelectDate}
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                />
            </div>

            {/* Render full-screen Date Detail Modal specifically scoped inline for Widget interactions */}
            {selectedDate && selectedBaliDate && (
                <DateDetail
                    baliDate={selectedBaliDate}
                    onClose={handleCloseDetail}
                />
            )}

            <div className="text-center py-3 bg-stone-100 mt-auto border-t border-stone-200 flex flex-col items-center justify-center pointer-events-auto">
                <span className="text-[11px] text-stone-500 font-medium mb-0.5">Layanan Digital dari</span>
                <a href="https://nusaheritage.id" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-brand-700 hover:text-brand-800 hover:underline transition-colors flex items-center justify-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-stone-200">
                    <img src="https://nusaheritage.id/niceadmin/assets/img/logo2.jpeg" className="w-4 h-4 rounded-full" alt="NH Logo" />
                    NusaHeritage.id
                </a>
            </div>
        </div>
    );
}
