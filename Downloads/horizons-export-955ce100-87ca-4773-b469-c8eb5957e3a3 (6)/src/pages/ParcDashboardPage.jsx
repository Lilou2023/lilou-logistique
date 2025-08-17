import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Truck, Wrench, Search, Package, AlertCircle, Inbox, Loader2, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EmptyState = ({ icon, title, message }) => (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg p-4">
        {icon}
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <p className="text-sm">{message}</p>
    </div>
);

const DataTable = ({ data, columns, loading, error, emptyIcon, emptyTitle, emptyMessage }) => {
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

    if (!data || data.length === 0) {
        return <EmptyState icon={emptyIcon} title={emptyTitle} message={emptyMessage} />;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((col) => <TableHead key={col.key}>{col.header}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.id}>
                        {columns.map((col) => (
                            <TableCell key={col.key}>
                                {col.render ? col.render(row) : row[col.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default function ParcDashboardPage() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState({ vehicles: true, incidents: true, parts: true });
  const [error, setError] = useState({ vehicles: null, incidents: null, parts: null });

  useEffect(() => {
    const fetchData = async (table, setData, loadKey, errorKey) => {
        try {
            const { data, error } = await supabase.from(table).select('*');
            if (error) throw error;
            setData(data);
        } catch (err) {
            setError(prev => ({ ...prev, [errorKey]: `Impossible de charger les données: ${table}` }));
        } finally {
            setLoading(prev => ({ ...prev, [loadKey]: false }));
        }
    };
    
    fetchData('vehicles', setVehicles, 'vehicles', 'vehicles');
    fetchData('incidents', setIncidents, 'incidents', 'incidents');
    fetchData('stock_pieces', setParts, 'parts', 'parts');
  }, []);

  const showToast = (message) => {
    toast({
      title: '🚧 Bientôt disponible',
      description: message || 'Cette fonctionnalité sera bientôt prête ! 🚀',
    });
  };

  const vehicleColumns = [
    { key: 'plate_number', header: 'Immatriculation' },
    { key: 'model', header: 'Modèle' },
    { key: 'status', header: 'Statut', render: (row) => <Badge variant={row.status === 'available' ? 'success' : 'secondary'}>{row.status}</Badge> },
    { key: 'actions', header: 'Actions', render: () => <Button variant="outline" size="sm" onClick={() => showToast()}>Détails</Button> },
  ];

  const incidentColumns = [
    { key: 'vehicle_id', header: 'Véhicule ID' },
    { key: 'description', header: 'Description' },
    { key: 'severity', header: 'Sévérité', render: (row) => <Badge variant={row.severity === 'high' || row.severity === 'critical' ? 'destructive' : 'secondary'}>{row.severity}</Badge> },
    { key: 'status', header: 'Statut' },
    { key: 'actions', header: 'Actions', render: () => <Button variant="outline" size="sm" onClick={() => showToast()}>Gérer</Button> },
  ];

  const partColumns = [
    { key: 'part_name', header: 'Nom de la pièce' },
    { key: 'quantity', header: 'Stock' },
    { key: 'threshold', header: 'Stock Min.' },
    { key: 'actions', header: 'Actions', render: () => <Button variant="outline" size="sm" onClick={() => showToast()}>Commander</Button> },
  ];

  return (
    <>
      <Helmet>
        <title>Tableau de Bord Chef de Parc - Lilou Logistique</title>
        <meta name="description" content="Gérez la flotte de véhicules, la maintenance et les affectations." />
      </Helmet>
      <div className="dark min-h-screen w-full bg-background text-foreground p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Gestion du Parc Automobile</h1>
              <p className="text-muted-foreground">Supervision de l'état, des incidents et des stocks de la flotte.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => showToast()}>
                <Truck className="mr-2 h-4 w-4" /> Ajouter un véhicule
              </Button>
              <Button variant="outline" onClick={() => showToast()}>
                <Package className="mr-2 h-4 w-4" /> Commander des pièces
              </Button>
            </div>
          </header>

          <Tabs defaultValue="fleet">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="fleet"><Truck className="mr-2 h-4 w-4" />Flotte</TabsTrigger>
              <TabsTrigger value="incidents"><AlertCircle className="mr-2 h-4 w-4" />Gestion des Incidents</TabsTrigger>
              <TabsTrigger value="stock"><Package className="mr-2 h-4 w-4" />Stock de Pièces</TabsTrigger>
              <TabsTrigger value="maintenance"><Wrench className="mr-2 h-4 w-4" />Maintenance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fleet" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Liste des Véhicules</CardTitle>
                  <CardDescription>Consultez le statut de tous les véhicules en temps réel.</CardDescription>
                  <div className="relative pt-4">
                     <Search className="absolute left-2.5 top-6 h-4 w-4 text-muted-foreground" />
                     <Input placeholder="Rechercher par immatriculation ou modèle..." className="pl-8" />
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable data={vehicles} columns={vehicleColumns} loading={loading.vehicles} error={error.vehicles} emptyIcon={<Truck className="h-12 w-12 mb-2"/>} emptyTitle="Aucun véhicule trouvé" emptyMessage="Ajoutez votre premier véhicule pour commencer." />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="incidents" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Incidents Véhicules</CardTitle>
                        <CardDescription>Gérez les problèmes signalés par les chauffeurs sur les véhicules.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable data={incidents} columns={incidentColumns} loading={loading.incidents} error={error.incidents} emptyIcon={<AlertCircle className="h-12 w-12 mb-2"/>} emptyTitle="Aucun incident signalé" emptyMessage="La flotte est en parfait état." />
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="stock" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Stock des Pièces de Rechange</CardTitle>
                        <CardDescription>Surveillez les niveaux de stock pour éviter les ruptures.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable data={parts} columns={partColumns} loading={loading.parts} error={error.parts} emptyIcon={<Package className="h-12 w-12 mb-2"/>} emptyTitle="Aucune pièce en stock" emptyMessage="Ajoutez des pièces pour commencer la gestion." />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Plan de Maintenance</CardTitle>
                        <CardDescription>Suivez les opérations de maintenance planifiées et en cours.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EmptyState icon={<Wrench className="h-12 w-12 mb-2"/>} title="Module en développement" message="Le module de maintenance permettra de créer des tickets depuis les incidents." />
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </>
  );
}