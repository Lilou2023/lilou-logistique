import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';
import { AlertsTable } from '@/components/manager/AlertsTable';

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

const GMAlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('alerts')
          .select('*')
          .eq('status', 'new') // Only fetch new alerts
          .order('priority', { ascending: false }) // High priority first
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAlerts(data);
      } catch (err) {
        setError('Impossible de charger les alertes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();

    const channel = supabase
      .channel('public:alerts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alerts' }, payload => {
        if (payload.new.status === 'new') {
          setAlerts(prevAlerts => [payload.new, ...prevAlerts].sort((a,b) => b.created_at.localeCompare(a.created_at)));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-96 text-destructive bg-destructive/10 rounded-lg">
          <AlertTriangle className="h-12 w-12 mb-4" />
          <h2 className="text-xl font-semibold">Erreur de chargement</h2>
          <p>{error}</p>
        </div>
      );
    }

    if (alerts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-96 border-2 border-dashed rounded-lg">
          <Inbox className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-semibold">Aucune alerte en cours</h3>
          <p className="text-sm">Tout est sous contrôle !</p>
        </div>
      );
    }

    return (
      <AlertsTable alerts={alerts} />
    );
  };

  return (
    <>
      <Helmet>
        <title>Alertes - GM Cockpit</title>
        <meta name="description" content="Gérez les alertes critiques et les incidents en temps réel." />
      </Helmet>
      <motion.div
        className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Alertes Critiques</h1>
            <p className="text-muted-foreground">Vue centralisée des incidents et problèmes nécessitant une action.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Alertes Actives ({alerts.length})</CardTitle>
              <CardDescription>Liste des alertes non résolues, triées par priorité.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default GMAlertsPage;