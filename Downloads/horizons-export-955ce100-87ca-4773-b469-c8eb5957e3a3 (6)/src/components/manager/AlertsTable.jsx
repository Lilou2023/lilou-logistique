import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function AlertsTable({ alerts, onResolve, onViewDetails }) {
  const { toast } = useToast();

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Élevée</Badge>;
      case 'medium':
        return <Badge variant="secondary">Moyenne</Badge>;
      case 'low':
        return <Badge variant="default">Faible</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  const handleAction = (actionType) => {
    toast({
      title: "🚧 Fonctionnalité en cours de développement",
      description: `L'action "${actionType}" n'est pas encore implémentée.`,
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Priorité</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell>{alert.type}</TableCell>
            <TableCell>{getPriorityBadge(alert.priority)}</TableCell>
            <TableCell className="max-w-[300px] truncate">{alert.message}</TableCell>
            <TableCell>{new Date(alert.created_at).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAction('Voir détails')}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="success" size="sm" onClick={() => handleAction('Résoudre')}>
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleAction('Ignorer')}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}