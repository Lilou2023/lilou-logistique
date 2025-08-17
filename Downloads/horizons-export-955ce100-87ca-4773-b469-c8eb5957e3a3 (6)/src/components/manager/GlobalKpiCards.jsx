import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Truck, PackageCheck, AlertTriangle, CalendarDays, ShieldCheck } from 'lucide-react';
import { getKpiStatus } from '@/utils/kpiConstants';
import { cn } from '@/lib/utils';

const KpiCard = ({ title, value, icon, change, kpiName }) => {
  const status = kpiName ? getKpiStatus(kpiName, parseFloat(value)) : 'default';

  const statusClasses = {
    optimal: 'border-green-500/50 hover:border-green-500',
    watch: 'border-yellow-500/50 hover:border-yellow-500',
    critical: 'border-red-500/50 hover:border-red-500 animate-pulse-slow',
    default: 'border-border/20 hover:border-primary/80',
  };

  return (
    <Card className={cn("bg-card/80 backdrop-blur-sm transition-all duration-300", statusClasses[status])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
};


export function GlobalKpiCards({ kpis }) {
    const kpiList = [
        { title: "Conducteurs Actifs", value: kpis?.active_drivers || 0, icon: <Users className="h-6 w-6 text-blue-400" />, change: `Sur la route` },
        { title: "Véhicules en Mission", value: kpis?.vehicles_on_road || 0, icon: <Truck className="h-6 w-6 text-green-400" />, change: `Suivi en temps réel` },
        { title: "Incidents (24h)", value: kpis?.incidents_today || 0, icon: <AlertTriangle className="h-6 w-6 text-red-400" />, change: `Nécessitent une action` },
        { title: "Qualité POD (7j)", value: `${(kpis?.global_pod_quality || 0).toFixed(2)}%`, icon: <ShieldCheck className="h-6 w-6 text-indigo-400" />, change: "Performance Amazon", kpiName: 'AMAZON_COMPLIANCE_RATE' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiList.map((kpi, index) => (
                <KpiCard key={index} {...kpi} />
            ))}
        </div>
    );
}