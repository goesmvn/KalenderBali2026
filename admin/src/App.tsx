import { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { AdminLayout } from '@/components/AdminLayout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { PuraPage } from '@/pages/PuraPage';
import { CeremonyPage } from '@/pages/CeremonyPage';
import { PangalantakaPage } from '@/pages/PangalantakaPage';
import { DewasaAyuPage } from '@/pages/DewasaAyuPage';
import { SettingsPage } from '@/pages/SettingsPage';

// Placeholder pages for later
function AppContent() {
    const { user, isLoading } = useAuth();
    const [currentPath, setCurrentPath] = useState('/');

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <img
                        src="https://nusaheritage.id/niceadmin/assets/img/logo2.jpeg"
                        alt="Loading"
                        className="w-16 h-16 rounded-2xl mx-auto mb-4 animate-pulse shadow-lg object-cover"
                    />
                    <p className="text-slate-500 text-sm">Memuat...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <LoginPage />;
    }

    const renderPage = () => {
        switch (currentPath) {
            case '/': return <DashboardPage />;
            case '/pura': return <PuraPage />;
            case '/ceremonies': return <CeremonyPage />;
            case '/dewasa-ayu': return <DewasaAyuPage />;
            case '/pangalantaka': return <PangalantakaPage />;
            case '/settings': return <SettingsPage />;
            default: return <DashboardPage />;
        }
    };

    return (
        <AdminLayout currentPath={currentPath} onNavigate={setCurrentPath}>
            {renderPage()}
        </AdminLayout>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
