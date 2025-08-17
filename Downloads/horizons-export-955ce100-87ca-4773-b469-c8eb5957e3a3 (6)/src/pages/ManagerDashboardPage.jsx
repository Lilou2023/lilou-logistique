import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import Header from '@/components/layout/Header';
import { GlobalKpiCards } from '@/components/manager/GlobalKpiCards';
import { ModuleAlertCard } from '@/components/manager/ModuleAlertCard';
import DriverList from '@/components/dashboard/DriverList';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const ManagerDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({ kpis: {}, alerts: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.rpc('get_manager_dashboard_data');
        if (error) throw error;
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching manager dashboard data:", err);
        setError("Impossible de charger les données du tableau de bord.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-destructive">
        {error}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tableau de Bord Manager - Lilou-GO</title>
        <meta name="description" content="Vue d'ensemble des opérations, KPIs et alertes pour les managers." />
      </Helmet>
      <div className="flex h-screen bg-background text-foreground">
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header title="Tableau de Bord Manager" />
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <GlobalKpiCards kpis={dashboardData.kpis} />
              </motion.div>

              <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dashboardData.alerts && Object.entries(dashboardData.alerts).map(([module, alerts]) => (
                  <ModuleAlertCard key={module} module={module} alerts={alerts} />
                ))}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <DriverList />
              </motion.div>

            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ManagerDashboardPage;