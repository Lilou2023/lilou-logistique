import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Target, CheckCircle, Percent, Star, Loader2, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const KpiItem = ({ title, value, target, icon, progress }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-bold text-lg">{value}</span>
        <span className="text-xs text-muted-foreground">/ {target}</span>
      </div>
    </div>
    <Progress value={progress} className="h-2" />
  </div>
);

const AmazonKpiCard = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKpis = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.rpc('get_driver_amazon_kpis', { driver_id_param: user.id });
        if (error) throw error;
        setKpis(data);
      } catch (err) {
        setError('Impossible de charger vos KPIs Amazon.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, [user]);

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }
    if (error) {
      return <div className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-24"><AlertTriangle className="h-5 w-5" />{error}</div>;
    }
    if (!kpis || Object.keys(kpis).length === 0) {
      return <div className="text-muted-foreground p-4 text-center h-24">Aucune donnée de performance Amazon disponible pour le moment.</div>;
    }

    const amazonKpis = [
      { title: "Qualité POD", value: `${kpis.pod_quality_rate || 0}%`, target: "99.5%", icon: <Target className="h-5 w-5 text-blue-500" />, progress: kpis.pod_quality_rate || 0 },
      { title: "Taux de DNR", value: `${kpis.dnr_rate || 0}%`, target: "< 1.5%", icon: <CheckCircle className="h-5 w-5 text-green-500" />, progress: 100 - (kpis.dnr_rate || 0) },
      { title: "Conformité", value: `${kpis.compliance_rate || 0}%`, target: "98.0%", icon: <Percent className="h-5 w-5 text-yellow-500" />, progress: kpis.compliance_rate || 0 },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {amazonKpis.map((kpi, index) => <KpiItem key={index} {...kpi} />)}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🎯 Objectifs Amazon (Dernier rapport)</CardTitle>
        <CardDescription>Vos indicateurs de performance clés pour Amazon.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default AmazonKpiCard;