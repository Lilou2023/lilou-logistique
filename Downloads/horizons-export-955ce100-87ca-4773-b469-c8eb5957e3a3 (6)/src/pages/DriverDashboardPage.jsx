import React from 'react';
import { Helmet } from 'react-helmet-async';
import DriverDashboard from '@/modules/driver/DriverDashboard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';

const DriverDashboardPage = () => {
    const { loading, profile } = useAuth();

    if (loading || !profile) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900">
                <Loader2 className="h-16 w-16 animate-spin text-cyan-400" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Tableau de Bord - {profile?.full_name || 'Chauffeur'}</title>
                <meta name="description" content="Votre hub central pour la gestion de vos tournées." />
            </Helmet>
            <DriverDashboard />
        </>
    );
};

export default DriverDashboardPage;