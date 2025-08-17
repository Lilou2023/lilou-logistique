import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle, ShieldCheck, PackageX, ScanSearch } from 'lucide-react';
import { getKpiStatus } from '@/utils/kpiConstants';
import { cn } from '@/lib/utils';

const KpiStat = ({ icon, value, label, kpiName }) => {
  const status = getKpiStatus(kpiName, parseFloat(value));
  
  const statusConfig = {
    optimal: { iconColor: 'text-green-500', bgColor: 'bg-green-500/10' },
    watch: { iconColor: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    critical: { iconColor: 'text-red-500', bgColor: 'bg-red-500/10' },
    default: { iconColor: 'text-primary', bgColor: 'bg-primary/10' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-4">
      <div className={cn('p-3 rounded-full', config.bgColor)}>
        {React.cloneElement(icon, { className: cn('h-6 w-6', config.iconColor) })}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

const DispatcherAmazonKpis = () => {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKpis = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.rpc('get_dispatcher_kpis');
        if (error) throw error;
        setKpis(data);
      } catch (err) {
        setError('Impossible de charger les KPIs Amazon.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
    const interval = setInterval(fetchKpis, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-24">
          <AlertTriangle className="h-5 w-5" />
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicateurs Amazon en Temps Réel</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiStat icon={<PackageX />} value={`${kpis.dnr_rate.toFixed(2)}%`} label="Taux de DNR (jour)" kpiName="DNR_RATE" />
        <KpiStat icon={<ShieldCheck />} value={`${kpis.pod_quality_rate.toFixed(2)}%`} label="Qualité POD (jour)" kpiName="POD_QUALITY_RATE" />
        <KpiStat icon={<ScanSearch />} value={kpis.false_scans} label="Faux scans (jour)" kpiName="FALSE_SCAN_RATE" />
      </CardContent>
    </Card>
  );
};

export default DispatcherAmazonKpis;