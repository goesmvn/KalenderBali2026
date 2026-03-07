import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SubItem {
    label: string;
    href?: string;
    action?: () => void;
}

interface NavItem {
    label: string;
    hasDropdown: boolean;
    href?: string;
    items?: SubItem[];
}

interface HeaderProps {
    currentPage: 'home' | 'about' | 'privacy' | 'terms';
    onNavigate: (page: 'home' | 'about' | 'privacy' | 'terms') => void;
    onOpenSearch?: () => void;
    onOpenDownload?: (tab: 'hariBaik' | 'pawiwahan' | 'melahirkan') => void;
    onOpenWidget?: () => void;
    onOpenOtonan?: () => void;
    onOpenExportCalendar?: () => void;
    onOpenNyepiGuide?: () => void;
}

export function Header({ currentPage, onNavigate, onOpenSearch, onOpenDownload, onOpenWidget, onOpenOtonan, onOpenExportCalendar, onOpenNyepiGuide }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

    const navItems: NavItem[] = [
        { label: t('nav.about'), hasDropdown: false },
        {
            label: t('nav.explore_culture'),
            hasDropdown: true,
            items: [
                { label: t('nav.heritage_tangible'), href: 'https://nusaheritage.id/warisan-budaya-berwujud' },
                { label: t('nav.heritage_intangible'), href: 'https://nusaheritage.id/warisan-budaya-tak-berwujud' },
                { label: t('nav.vr_tours'), href: 'https://nusaheritage.id/virtualtour' },
                { label: t('nav.forecast'), href: 'https://metemu.nusaheritage.id' }
            ]
        },
        {
            label: t('nav.features_services'),
            hasDropdown: true,
            items: [
                { label: t('nav.otonan'), action: () => onOpenOtonan && onOpenOtonan() },
                { label: t('nav.nyepi'), action: () => onOpenNyepiGuide && onOpenNyepiGuide() },
                { label: t('nav.pdf_good_days'), action: () => onOpenDownload && onOpenDownload('hariBaik') },
                { label: t('nav.pdf_cesarean'), action: () => onOpenDownload && onOpenDownload('melahirkan') },
                { label: t('nav.pdf_wedding'), action: () => onOpenDownload && onOpenDownload('pawiwahan') },
                { label: t('nav.export_ics'), action: () => onOpenExportCalendar && onOpenExportCalendar() },
                { label: t('nav.widget'), action: () => onOpenWidget && onOpenWidget() }
            ]
        }
    ];

    return (
        <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => onNavigate('home')}
                    >
                        <img
                            src="https://nusaheritage.id/niceadmin/assets/img/logo2.jpeg"
                            alt="Kalender Bali Logo"
                            className="w-10 h-10 rounded object-cover"
                        />
                        <h1 className="text-2xl font-bold tracking-tight">
                            <span className="text-stone-800">KalenderBali</span>
                            <span className="text-[#c1121f]">.id</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navItems.map((item, index) => {
                            const isActive = item.label === 'Tentang' && currentPage === 'about';

                            return (
                                <div key={index} className="relative group">
                                    {item.href ? (
                                        <a href={item.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors ${isActive ? 'text-[#c1121f]' : 'text-stone-600 hover:text-red-700'}`}>
                                            {item.label}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (item.label === 'Tentang') {
                                                    onNavigate('about');
                                                } else if (item.label === 'Cari Tanggal & Fitur' && onOpenSearch) {
                                                    onOpenSearch();
                                                } else if (item.label === 'Pasang Widget' && onOpenWidget) {
                                                    onOpenWidget();
                                                } else if (item.label === 'Kalkulator Otonan' && onOpenOtonan) {
                                                    onOpenOtonan();
                                                } else if (item.label === 'Nyepi Guide' && onOpenNyepiGuide) {
                                                    onOpenNyepiGuide();
                                                }
                                            }}
                                            className={`flex items-center gap-1.5 text-[15px] transition-colors py-2 ${item.label === 'Nyepi Guide'
                                                ? 'font-bold text-indigo-600 hover:text-indigo-800'
                                                : isActive ? 'font-medium text-[#c1121f]' : 'font-medium text-stone-600 hover:text-red-700'
                                                }`}
                                        >
                                            {item.label}
                                            {item.hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isActive ? 'text-[#c1121f]' : 'text-stone-400'}`} />}
                                        </button>
                                    )}

                                    {item.hasDropdown && item.items && (
                                        <div className="absolute top-full left-0 hidden group-hover:block pt-2 w-64 z-50">
                                            <div className="bg-white rounded-xl shadow-xl border border-stone-100 py-2 overflow-hidden">
                                                {item.items.map((subItem, subIdx) => (
                                                    subItem.href ? (
                                                        <a
                                                            key={subIdx}
                                                            href={subItem.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-[#c1121f] hover:bg-red-50 transition-colors"
                                                        >
                                                            {subItem.label}
                                                        </a>
                                                    ) : (
                                                        <button
                                                            key={subIdx}
                                                            onClick={subItem.action}
                                                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-[#c1121f] hover:bg-red-50 transition-colors"
                                                        >
                                                            {subItem.label}
                                                        </button>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Right Section / Auth */}
                    <div className="hidden lg:flex items-center gap-6">
                        <LanguageSwitcher />
                        <a href="https://nusaheritage.id/register" target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-stone-600 hover:text-stone-900 transition-colors">
                            Register
                        </a>
                        <a href="https://nusaheritage.id/login" target="_blank" rel="noopener noreferrer" className="bg-[#c1121f] hover:bg-[#a00f1a] text-white px-6 py-2.5 rounded-lg text-[15px] font-medium transition-colors">
                            Log in
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-t border-stone-100 bg-white overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navItems.map((item, index) => {
                                const isActive = item.label === 'Tentang' && currentPage === 'about';

                                return (
                                    <div key={index}>
                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between py-3 px-2 text-base font-medium rounded-lg transition-colors text-stone-600 hover:bg-stone-50 hover:text-red-700">
                                                {item.label}
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    if (item.label === t('nav.about')) {
                                                        onNavigate('about');
                                                        setIsMobileMenuOpen(false);
                                                    } else if (item.label === t('search.button') && onOpenSearch) {
                                                        onOpenSearch();
                                                        setIsMobileMenuOpen(false);
                                                    } else if (item.label === t('nav.widget') && onOpenWidget) {
                                                        onOpenWidget();
                                                        setIsMobileMenuOpen(false);
                                                    } else if (item.label === t('nav.otonan') && onOpenOtonan) {
                                                        onOpenOtonan();
                                                        setIsMobileMenuOpen(false);
                                                    } else if (item.label === t('nav.nyepi') && onOpenNyepiGuide) {
                                                        onOpenNyepiGuide();
                                                        setIsMobileMenuOpen(false);
                                                    }
                                                }}
                                                className={`w-full flex items-center justify-between py-3 px-2 text-base transition-colors rounded-lg ${item.label === t('nav.nyepi')
                                                    ? 'font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800'
                                                    : isActive
                                                        ? 'font-medium bg-red-50 text-[#c1121f]'
                                                        : 'font-medium text-stone-600 hover:bg-stone-50 hover:text-red-700'
                                                    }`}
                                            >
                                                {item.label}
                                                {item.hasDropdown && <ChevronDown className={`w-4 h-4 ${isActive ? 'text-[#c1121f]' : 'text-stone-400'}`} />}
                                            </button>
                                        )}

                                        {item.hasDropdown && item.items && (
                                            <div className="pl-4 border-l-2 border-stone-100 ml-2 mt-1 mb-2 space-y-1">
                                                {item.items.map((subItem, subIdx) => (
                                                    subItem.href ? (
                                                        <a
                                                            key={subIdx}
                                                            href={subItem.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block w-full py-2 px-3 text-sm font-medium text-stone-500 hover:text-[#c1121f] hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            {subItem.label}
                                                        </a>
                                                    ) : (
                                                        <button
                                                            key={subIdx}
                                                            onClick={() => {
                                                                if (subItem.action) subItem.action();
                                                                setIsMobileMenuOpen(false);
                                                            }}
                                                            className="block w-full text-left py-2 px-3 text-sm font-medium text-stone-500 hover:text-[#c1121f] hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            {subItem.label}
                                                        </button>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col gap-4">
                                <div className="flex justify-center mb-2">
                                    <LanguageSwitcher />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <a href="https://nusaheritage.id/register" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 text-center text-stone-600 font-medium border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors block">
                                        Register
                                    </a>
                                    <a href="https://nusaheritage.id/login" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 text-center text-white font-medium bg-[#c1121f] hover:bg-[#a00f1a] rounded-lg transition-colors block">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
