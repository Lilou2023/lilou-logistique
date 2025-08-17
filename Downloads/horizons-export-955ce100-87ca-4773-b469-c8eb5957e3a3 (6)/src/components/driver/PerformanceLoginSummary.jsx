import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StatCard = ({ title, value, change }) => {
    const getChangeIcon = () => {
      if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
      if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    };
    
    const getChangeColor = () => {
        if (change > 0) return 'text-green-500';
        if (change < 0) return 'text-red-500';
        return 'text-muted-foreground';
    }

    return (
        <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{value}</p>
                <div className={`flex items-center text-xs font-semibold ${getChangeColor()}`}>
                    {getChangeIcon()}
                    {Math.abs(change).toFixed(1)}%
                </div>
            </div>
        </div>
    );
};

const PerformanceLoginSummary = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // We are calling a Supabase Edge Function here.
      // The function name is 'get-driver-analytics' and we pass a 'time_range' parameter.
      const { data, error } = await supabase.functions.invoke('get-driver-analytics', {
        body: JSON.stringify({ time_range: 'current_week' })
      });
      
      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      setStats(data);
    } catch (err) {
      setError('Impossible de charger vos performances.');
      console.error('Error fetching driver analytics:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-48">
          <AlertTriangle className="h-5 w-5" />
          {error || 'Données non disponibles.'}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Résumé de vos performances (Semaine en cours)</CardTitle>
        <CardDescription>Aperçu rapide de vos statistiques clés.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Livraisons réussies" value={stats.total_deliveries} change={stats.total_deliveries_change} />
        <StatCard title="DNR (Non-livraisons)" value={stats.total_dnr} change={stats.total_dnr_change} />
        <StatCard title="Score Performance" value={`${stats.average_performance.toFixed(1)}%`} change={stats.average_performance_change} />
        <StatCard title="Absences" value={stats.total_absences} change={stats.total_absences_change} />
        
        <div className="md:col-span-2 lg:col-span-4 h-[200px] mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.dnr_trend.map(d => ({ name: d.week, DNR: d.dnr_count }))}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                <Legend formatter={() => 'Tendance DNR (4 sem.)'} />
                <Line type="monotone" dataKey="DNR" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceLoginSummary;