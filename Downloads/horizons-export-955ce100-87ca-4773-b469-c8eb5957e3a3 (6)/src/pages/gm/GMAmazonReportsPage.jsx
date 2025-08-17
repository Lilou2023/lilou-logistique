
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Loader2, AlertTriangle, Inbox } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GMAmazonReportsPage = () => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [errorMetrics, setErrorMetrics] = useState(null);

  const fetchMetrics = useCallback(async () => {
    setLoadingMetrics(true);
    setErrorMetrics(null);
    try {
      // Jointure simplifiée grâce à la nouvelle structure
      const { data, error } = await supabase
        .from('amazon_metrics')
        .select(`*, user_profiles(full_name)`)
        .order('date', { ascending: false })
        .limit(100);
      if (error) throw error;
      
      const formattedData = data.map(m => ({
          ...m,
          driver_name: m.user_profiles?.full_name || 'N/A'
      }));
      setMetrics(formattedData);
    } catch (err) {
      setErrorMetrics('Impossible de charger les métriques Amazon.');
      console.error(err);
    } finally {
      setLoadingMetrics(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'Aucun fichier sélectionné' });
      return;
    }
    setUploading(true);
    try {
      const csvContent = await file.text();
      // L'edge function `amazon-reports-importer` est déjà à jour pour la nouvelle structure
      const { data, error } = await supabase.functions.invoke('amazon-reports-importer', {
        body: JSON.stringify({ csvContent }),
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      toast({
        title: 'Importation réussie !',
        description: data.message,
      });
      fetchMetrics(); // Rafraîchir les données après l'importation
    } catch (err) {
      toast({
        variant: 'destructive',
        title: "Erreur d'importation",
        description: err.message,
      });
    } finally {
      setUploading(false);
      setFile(null);
      // Réinitialiser le champ de fichier
      const fileInput = document.getElementById('csv-upload');
      if(fileInput) fileInput.value = '';
    }
  };

  const chartData = metrics.slice(0, 10).map(m => ({
    name: m.driver_name,
    'Score Global': m.overall_score,
    'Qualité POD': m.pod_quality,
  })).reverse();

  return (
    <>
      <Helmet>
        <title>Rapports Amazon - Lilou GO</title>
        <meta name="description" content="Importation et analyse des rapports de performance Amazon DSP." />
      </Helmet>
      <motion.div
        className="space-y-6 p-4 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Importation des Rapports Amazon DSP</CardTitle>
            <CardDescription>
              Chargez les fichiers CSV (Scorecards, etc.). Le CSV doit contenir : driver_email, date, et les métriques (dnr_rate, etc.).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            <Button onClick={handleUpload} disabled={uploading || !file}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Importer le fichier
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analyse des Performances (10 derniers enregistrements)</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingMetrics ? (
              <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : errorMetrics ? (
              <div className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-64"><AlertTriangle className="h-5 w-5" />{errorMetrics}</div>
            ) : chartData.length === 0 ? (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
                    <Inbox className="h-12 w-12 mb-4"/>
                    <h3 className="text-lg font-semibold">Pas de données à afficher</h3>
                    <p className="text-sm">Importez un rapport pour commencer l'analyse.</p>
                </div>
            ) : (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} tick={{fontSize: 12}} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                    <Legend />
                    <Bar dataKey="Score Global" fill="hsl(var(--primary))" />
                    <Bar dataKey="Qualité POD" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Données Brutes des Rapports</CardTitle>
            <CardDescription>Liste des 100 derniers enregistrements de performance importés.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingMetrics ? (
              <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : errorMetrics ? (
              <div className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-64"><AlertTriangle className="h-5 w-5" />{errorMetrics}</div>
            ) : metrics.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg">
                <Inbox className="h-12 w-12 mb-4"/>
                <h3 className="text-lg font-semibold">Aucune donnée importée</h3>
                <p className="text-sm">Utilisez le formulaire ci-dessus pour importer votre premier rapport.</p>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Chauffeur</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score Global</TableHead>
                      <TableHead>Qualité POD</TableHead>
                      <TableHead>Taux DNR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.map((metric) => (
                      <TableRow key={metric.id}>
                        <TableCell>{metric.driver_name || 'N/A'}</TableCell>
                        <TableCell>{new Date(metric.date).toLocaleDateString()}</TableCell>
                        <TableCell>{metric.overall_score}%</TableCell>
                        <TableCell>{metric.pod_quality}%</TableCell>
                        <TableCell>{metric.dnr_rate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default GMAmazonReportsPage;
