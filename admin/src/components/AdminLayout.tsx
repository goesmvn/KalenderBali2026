import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Building2,
    Star,
    BookOpen,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    Target
} from 'lucide-react';

interface NavItem {
    label: string;
    icon: React.ElementType;
    path: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Master Pura', icon: Building2, path: '/pura' },
    { label: 'Dewasa Designer', icon: Target, path: '/ceremonies' },
    { label: 'Dewasa Ayu', icon: Star, path: '/dewasa-ayu' },
    { label: 'Pangalantaka', icon: BookOpen, path: '/pangalantaka' },
    { label: 'Settings', icon: Settings, path: '/settings' },
];

interface AdminLayoutProps {
    children: React.ReactNode;
    currentPath: string;
    onNavigate: (path: string) => void;
}

export function AdminLayout({ children, currentPath, onNavigate }: AdminLayoutProps) {
    const { user, logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-auto bg-white border-r border-slate-100 shadow-sm flex flex-col transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } ${collapsed ? 'w-20' : 'w-64'}`}
            >
                {/* Logo */}
                <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <img
                        src="https://nusaheritage.id/niceadmin/assets/img/logo2.jpeg"
                        alt="Kalender Bali"
                        className="w-10 h-10 rounded-xl flex-shrink-0 shadow-md object-cover"
                    />
                    {!collapsed && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
                            <h2 className="font-bold text-sm truncate">
                                <span className="text-slate-900">KalenderBali</span>
                                <span className="text-[#c1121f]">.id</span>
                            </h2>
                            <p className="text-[10px] text-slate-400">Admin Panel</p>
                        </motion.div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                    >
                        <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map(item => {
                        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                        return (
                            <button
                                key={item.path}
                                onClick={() => { onNavigate(item.path); setMobileOpen(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'bg-brand-50 text-brand-700 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-600' : ''}`} />
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* User info */}
                <div className="p-3 border-t border-slate-100">
                    <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                        <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                            {user?.displayName?.charAt(0) || 'A'}
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">{user?.displayName}</p>
                                <p className="text-[10px] text-slate-400">{user?.role}</p>
                            </div>
                        )}
                        {!collapsed && (
                            <button onClick={logout} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                                <LogOut className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
                {/* Mobile header */}
                <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
                        <Menu className="w-5 h-5 text-slate-600" />
                    </button>
                    <span className="font-semibold text-slate-900">Kalender Bali Admin</span>
                </div>

                {/* Page content */}
                <main className="p-6 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
