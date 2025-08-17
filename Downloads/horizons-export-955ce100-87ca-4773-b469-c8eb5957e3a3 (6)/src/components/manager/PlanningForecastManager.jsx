import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, AlertTriangle } from 'lucide-react';
import { PlanningAmazon } from './PlanningAmazon';

export function PlanningForecastManager() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanningData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('planning-forecast');
        if (error) throw error;
        setChartData(data);
      } catch (err) {
        setError('Impossible de charger les données du graphique.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanningData();
  }, []);

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-80">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center h-80 text-destructive">
          <AlertTriangle className="h-8 w-8 mb-2" />
          <p>{error}</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semaine" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
          />
          <Legend />
          <Bar dataKey="demande" fill="hsl(var(--primary))" name="Demande (missions)" />
          <Bar dataKey="livreurs" fill="hsl(var(--secondary))" name="Livreurs Disponibles" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>📊 Analyse Graphique des Prévisions</CardTitle>
                    <CardDescription>
                    Visualisation de la demande vs. les ressources disponibles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {renderChart()}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-3">
            <PlanningAmazon />
        </div>
    </div>
  );
}

export default PlanningForecastManager;