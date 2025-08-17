import React, { lazy, Suspense } from 'react';
    import { Route, Routes, Navigate } from 'react-router-dom';
    import { Helmet, HelmetProvider } from 'react-helmet-async';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import ProtectedRoute from '@/components/auth/ProtectedRoute';
    import SupabaseStatus from './components/auth/SupabaseStatus';

    const LandingPage = lazy(() => import('@/pages/LandingPage'));
    const LoginPage = lazy(() => import('@/pages/LoginPage'));
    const RoleSelectionPage = lazy(() => import('@/pages/RoleSelectionPage'));
    const ManagerDashboardPage = lazy(() => import('@/pages/ManagerDashboardPage'));
    const DriverDashboardPage = lazy(() => import('@/pages/DriverDashboardPage'));
    const RHDashboardPage = lazy(() => import('@/pages/RHDashboardPage'));
    const ParcDashboardPage = lazy(() => import('@/pages/ParcDashboardPage'));
    const DispatcherDashboardPage = lazy(() => import('@/pages/DispatcherDashboardPage'));
    const AmirIADashboardPage = lazy(() => import('@/pages/AmirIADashboardPage'));
    const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'));
    const ValidationDashboardPage = lazy(() => import('@/pages/ValidationDashboardPage'));
    const GeneralManagerLayout = lazy(() => import('@/pages/gm/GeneralManagerLayout'));
    const GMDashboard = lazy(() => import('@/pages/gm/GMDashboard'));
    const GMAmazonReportsPage = lazy(() => import('@/pages/gm/GMAmazonReportsPage'));
    const GMAlertsPage = lazy(() => import('@/pages/gm/GMAlertsPage'));
    const RecrutementPage = lazy(() => import('@/pages/RecrutementPage'));


    const AppSpinner = () => (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

    function App() {
      const { session, profile, loading } = useAuth();

      if (loading) {
        return <AppSpinner />;
      }

      return (
        <>
          <Helmet>
            <title>Lilou-GO - Roulez vers l'excellence !</title>
            <meta name="description" content="Lilou-GO : Suivi, performance et IA logistique au service de vos livraisons." />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
          </Helmet>
          
          <Suspense fallback={<AppSpinner />}>
            <Routes>
              <Route path="/" element={!session ? <LandingPage /> : <Navigate to="/select-role" />} />
              <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/select-role" />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/recrutement" element={<RecrutementPage />} />

              <Route path="/select-role" element={<ProtectedRoute><RoleSelectionPage /></ProtectedRoute>} />
              
              <Route path="/manager" element={<ProtectedRoute roles={['manager', 'admin', 'General Manager']}><ManagerDashboardPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute roles={['admin']}><RHDashboardPage /></ProtectedRoute>} />
              <Route path="/driver" element={<ProtectedRoute roles={['driver']}><DriverDashboardPage /></ProtectedRoute>} />
              <Route path="/rh" element={<ProtectedRoute roles={['hr', 'admin', 'General Manager']}><RHDashboardPage /></ProtectedRoute>} />
              <Route path="/parc" element={<ProtectedRoute roles={['fleet_manager', 'chef_parc', 'admin', 'manager', 'General Manager']}><ParcDashboardPage /></ProtectedRoute>} />
              <Route path="/dispatcher" element={<ProtectedRoute roles={['dispatcher', 'admin', 'manager', 'General Manager']}><DispatcherDashboardPage /></ProtectedRoute>} />
              <Route path="/amir-ia" element={<ProtectedRoute roles={['admin', 'manager', 'General Manager']}><AmirIADashboardPage /></ProtectedRoute>} />
              <Route path="/validation" element={<ProtectedRoute roles={['admin']}><ValidationDashboardPage /></ProtectedRoute>} />

              <Route path="/gm" element={<ProtectedRoute roles={['General Manager']}><GeneralManagerLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<GMDashboard />} />
                <Route path="reports" element={<GMAmazonReportsPage />} />
                <Route path="alerts" element={<GMAlertsPage />} />
              </Route>
              
              <Route path="*" element={<Navigate to={session ? "/select-role" : "/"} />} />
            </Routes>
          </Suspense>
          {session && profile && <SupabaseStatus />}
        </>
      );
    }

    export default function WrappedApp() {
      return (
        <HelmetProvider>
            <App />
        </HelmetProvider>
      )
    };