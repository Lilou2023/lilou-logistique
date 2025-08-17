import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, TrendingUp, AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const KpiCard = ({ title, value, change, icon, unit = '' }) => {
  const isPositive = change >= 0;
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}{unit}</div>
        <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-destructive'}`}>
          {isPositive ? '+' : ''}{change}{unit} vs. hier
        </p>
      </CardContent>
    </Card>
  );
};

const RecommendationCard = ({ recommendation, index }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'Alerte': return <AlertTriangle className="h-5 w-5 text-destructive" />;
            case 'Optimisation': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
            default: return <Lightbulb className="h-5 w-5 text-blue-500" />;
        }
    };
    const getBadgeVariant = (type) => {
        switch (type) {
            case 'Alerte': return 'destructive';
            case 'Optimisation': return 'secondary';
            default: return 'default';
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-card/50 rounded-lg border flex items-start gap-4"
        >
            <div className="mt-1">{getIcon(recommendation.type)}</div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getBadgeVariant(recommendation.type)}>{recommendation.type}</Badge>
                    <span className="text-xs font-semibold text-muted-foreground">{recommendation.module}</span>
                </div>
                <p className="text-sm">{recommendation.text}</p>
            </div>
        </motion.div>
    );
};

export default function AmirIADashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('amir-ia-dashboard');
        if (error) throw error;
        setDashboardData(data);
      } catch (err) {
        setError('Impossible de charger les données du tableau de bord IA.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
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
        <title>Tableau de Bord Amir IA - Lilou Logistique</title>
        <meta name="description" content="Analyse prédictive et recommandations stratégiques pour optimiser les opérations." />
      </Helmet>
      <div className="dark min-h-screen w-full bg-background text-foreground p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <BrainCircuit className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Amir IA - Centre de Contrôle</h1>
                <p className="text-muted-foreground">Analyse prédictive et optimisation en temps réel.</p>
              </div>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <KpiCard title="Disponibilité Flotte" value={dashboardData.kpis.fleet_availability} change={dashboardData.kpis.fleet_availability_change} icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} unit="%" />
            <KpiCard title="Taux de POD" value={dashboardData.kpis.pod_rate} change={dashboardData.kpis.pod_rate_change} icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} unit="%" />
            <KpiCard title="Taux d'Absence RH" value={dashboardData.kpis.hr_absence_rate} change={dashboardData.kpis.hr_absence_rate_change} icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} unit="%" />
            <KpiCard title="Tournées du Jour" value={dashboardData.kpis.daily_tours} change={dashboardData.kpis.daily_tours_change} icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Opérationnelle Globale</CardTitle>
                  <CardDescription>Évolution de l'efficacité sur les derniers mois.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.performance_chart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                      <Legend />
                      <Bar dataKey="efficacite" fill="hsl(var(--primary))" name="Efficacité (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recommandations de l'IA</h3>
                {dashboardData.recommendations.map((rec, index) => (
                    <RecommendationCard key={index} recommendation={rec} index={index} />
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}