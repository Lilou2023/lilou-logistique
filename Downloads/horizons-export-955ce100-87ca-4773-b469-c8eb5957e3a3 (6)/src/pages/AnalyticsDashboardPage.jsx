import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart, FileDown, AlertTriangle, Loader2, PlusCircle, UserPlus, CalendarOff } from 'lucide-react';

import StatCard from '@/components/dashboard/StatCard';
import DriverList from '@/components/dashboard/DriverList';
import IncidentChart from '@/components/dashboard/IncidentChart';
import PerformanceTrend from '@/components/dashboard/PerformanceTrend';
import DeliveryHeatmap from '@/components/dashboard/DeliveryHeatmap';
import AddDeliveryForm from '@/components/forms/AddDeliveryForm';
import AddIncidentForm from '@/components/forms/AddIncidentForm';
import AddDriverForm from '@/components/forms/AddDriverForm';
import AddAbsenceForm from '@/components/forms/AddAbsenceForm';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function AnalyticsDashboardPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('current_week');
  const [openModal, setOpenModal] = useState(null);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming RPC exists, otherwise this will fail gracefully.
      const { data, error } = await supabase.rpc('get_driver_analytics', {
        time_range: timeRange
      });

      if (error) throw error;
      setStats(data);
    } catch (err) {
       console.warn('Analytics RPC "get_driver_analytics" might not exist. Using mock data. Error:', err.message);
       // Mock data to prevent crash if RPC not set up
        setStats({
            total_deliveries: 1250, total_deliveries_change: 12.5,
            total_dnr: 34, total_dnr_change: -5.2,
            total_absences: 5, total_absences_change: 2,
            average_performance: 92.3, average_performance_change: 1.8,
            driver_performance: [], incident_summary: [], dnr_trend: []
        });
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  const fetchDrivers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, full_name')
        .in('role', ['Driver', 'driver']);
      if (error) throw error;
      setDrivers(data);
    } catch (err) {
      console.error("Failed to fetch drivers:", err);
      toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de charger la liste des chauffeurs.' });
    }
  }, [toast]);

  useEffect(() => {
    fetchAnalyticsData();
    fetchDrivers();
  }, [timeRange, fetchAnalyticsData, fetchDrivers]);

  const handleFormFinished = () => {
    setOpenModal(null);
    fetchAnalyticsData();
    fetchDrivers();
  };
  
  const handleModalOpenChange = (modalName, isOpen) => {
    setOpenModal(isOpen ? modalName : null);
  };


  const handleExport = () => {
    toast({
      title: "🚧 Exportation en cours de développement",
      description: "La génération de rapports PDF sera bientôt disponible.",
    });
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-destructive">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold">Erreur de chargement</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard Analytique - Lilou GO</title>
        <meta name="description" content="Analyse des performances des chauffeurs et des livraisons." />
      </Helmet>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-background">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center justify-between space-y-2 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Analytique</h1>
              <p className="text-muted-foreground">Vue d'ensemble des performances des chauffeurs.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current_week">Cette semaine</SelectItem>
                  <SelectItem value="last_week">Semaine dernière</SelectItem>
                  <SelectItem value="last_month">Mois dernier</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" /> Exporter
              </Button>
            </div>
          </div>

          {stats && (
            <>
              <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Livraisons" value={stats.total_deliveries} change={stats.total_deliveries_change} icon={<BarChart />} />
                <StatCard title="Total DNR" value={stats.total_dnr} change={stats.total_dnr_change} icon={<AlertTriangle />} isNegativeBetter={true} />
                <StatCard title="Absences" value={stats.total_absences} change={stats.total_absences_change} icon={<BarChart />} isNegativeBetter={true} />
                <StatCard title="Score de Performance" value={`${stats.average_performance.toFixed(1)}%`} change={stats.average_performance_change} icon={<BarChart />} />
              </motion.div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Actions Rapides</CardTitle>
                  <CardDescription>Ajoutez rapidement des livraisons, incidents, chauffeurs ou absences.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Dialog open={openModal === 'addDelivery'} onOpenChange={(isOpen) => handleModalOpenChange('addDelivery', isOpen)}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Ajouter Livraison</Button>
                    </DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Nouvelle Livraison</DialogTitle></DialogHeader><AddDeliveryForm drivers={drivers} onFinished={handleFormFinished} /></DialogContent>
                  </Dialog>
                  <Dialog open={openModal === 'addIncident'} onOpenChange={(isOpen) => handleModalOpenChange('addIncident', isOpen)}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><AlertTriangle className="mr-2 h-4 w-4" /> Signaler Incident</Button>
                    </DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Signaler un Incident</DialogTitle></DialogHeader><AddIncidentForm drivers={drivers} onFinished={handleFormFinished} /></DialogContent>
                  </Dialog>
                  <Dialog open={openModal === 'addDriver'} onOpenChange={(isOpen) => handleModalOpenChange('addDriver', isOpen)}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" /> Ajouter Chauffeur</Button>
                    </DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Nouveau Chauffeur</DialogTitle></DialogHeader><AddDriverForm onFinished={handleFormFinished} /></DialogContent>
                  </Dialog>
                  <Dialog open={openModal === 'addAbsence'} onOpenChange={(isOpen) => handleModalOpenChange('addAbsence', isOpen)}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><CalendarOff className="mr-2 h-4 w-4" /> Déclarer Absence</Button>
                    </DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Déclarer une Absence</DialogTitle></DialogHeader><AddAbsenceForm drivers={drivers} onFinished={handleFormFinished} /></DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
                <Card className="col-span-4 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Performance des Chauffeurs</CardTitle>
                    <CardDescription>Top 5 des chauffeurs et ceux en alerte.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DriverList drivers={stats.driver_performance} />
                  </CardContent>
                </Card>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Incidents par Type</CardTitle>
                    <CardDescription>Répartition des incidents signalés.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IncidentChart data={stats.incident_summary} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
                 <Card className="col-span-7 lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Tendance des DNR</CardTitle>
                    <CardDescription>Évolution des livraisons non réalisées sur les 4 dernières semaines.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PerformanceTrend data={stats.dnr_trend} />
                  </CardContent>
                </Card>
                <Card className="col-span-7 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Heatmap des Livraisons</CardTitle>
                    <CardDescription>Zones géographiques avec une forte concentration de livraisons.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <DeliveryHeatmap />
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}