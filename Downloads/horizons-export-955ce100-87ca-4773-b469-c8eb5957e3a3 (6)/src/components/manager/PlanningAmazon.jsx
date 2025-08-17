import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

export function PlanningAmazon() {
  const [planningData, setPlanningData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanningData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('planning-forecast');
        if (error) throw error;
        setPlanningData(data);
      } catch (err) {
        setError('Impossible de charger les prévisions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanningData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Sous-capacité':
        return <Badge variant="destructive">{status}</Badge>;
      case 'OK':
        return <Badge variant="success">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-64">
          <AlertTriangle className="h-5 w-5" />
          {error}
        </div>
      );
    }

    if (planningData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg">
            <Inbox className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Aucune donnée de planning</h3>
            <p className="text-sm">Les prévisions ne sont pas disponibles pour le moment.</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Semaine</TableHead>
            <TableHead className="text-center">Demande (missions)</TableHead>
            <TableHead className="text-center">Livreurs Dispo.</TableHead>
            <TableHead className="text-center">Écart</TableHead>
            <TableHead className="text-center">Statut</TableHead>
            <TableHead>Recommandation IA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planningData.map((row) => (
            <TableRow key={row.semaine}>
              <TableCell className="font-medium">{row.semaine}</TableCell>
              <TableCell className="text-center">{row.demande}</TableCell>
              <TableCell className="text-center">{row.livreurs}</TableCell>
              <TableCell className={`text-center font-bold ${row.ecart < 0 ? 'text-destructive' : 'text-green-500'}`}>
                {row.ecart > 0 ? `+${row.ecart}` : row.ecart}
              </TableCell>
              <TableCell className="text-center">{getStatusBadge(row.statut)}</TableCell>
              <TableCell>{row.recommandation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📅 Planning Intelligent - Forecast Amazon</CardTitle>
        <CardDescription>
          Analyse prévisionnelle de la demande pour anticiper les besoins en ressources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}