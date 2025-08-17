import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Bell, User, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const moduleConfig = {
  operations: { icon: <Bell className="h-6 w-6" />, title: 'Opérations' },
  rh: { icon: <User className="h-6 w-6" />, title: 'RH' },
  parc: { icon: <Truck className="h-6 w-6" />, title: 'Parc' },
  default: { icon: <AlertTriangle className="h-6 w-6" />, title: 'Alertes' },
};

export function ModuleAlertCard({ module, alerts }) {
  const config = moduleConfig[module] || moduleConfig.default;
  const hasAlerts = alerts && alerts.length > 0;

  return (
    <Card className={cn(
        "h-full bg-lilou-surface border-primary/20 shadow-lg",
        hasAlerts && alerts.some(a => a.priority === 'critical') && "border-red-500/50 animate-pulse-slow"
    )}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-text-primary">
              {config.icon}
              <span>{`Alertes ${config.title}`}</span>
            </CardTitle>
            <CardDescription>Problèmes nécessitant une attention.</CardDescription>
          </div>
          {hasAlerts && <Badge variant="destructive">{alerts.length}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {hasAlerts ? (
          <ul className="space-y-3">
            {alerts.slice(0, 3).map((alert, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertTriangle className={cn(
                  "h-5 w-5 mt-0.5",
                  alert.priority === 'high' || alert.priority === 'critical' ? 'text-red-500' : 'text-yellow-400'
                )} />
                <span className="text-sm text-text-secondary">{alert.message}</span>
              </li>
            ))}
            {alerts.length > 3 && <li className="text-xs text-center text-muted-foreground mt-2">et {alerts.length - 3} autre(s)...</li>}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">Aucune alerte pour le moment.</p>
        )}
      </CardContent>
    </Card>
  );
}