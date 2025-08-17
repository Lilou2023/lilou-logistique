import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2, Inbox } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AnomaliesTable = () => {
    const [anomalies, setAnomalies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchAnomalies = async () => {
            try {
                const { data, error } = await supabase
                    .from('incidents')
                    .select(`
                        *,
                        drivers!inner ( user_profiles!inner ( full_name ) )
                    `)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                
                const formattedData = data.map(item => ({
                    ...item,
                    driver_name: item.drivers.user_profiles.full_name
                }));
                setAnomalies(formattedData);

            } catch (err) {
                setError('Impossible de charger les anomalies.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnomalies();
    }, []);

    const handleResolve = (id) => {
        toast({
            title: "🚧 Fonctionnalité en cours de développement",
            description: "La résolution des anomalies sera bientôt disponible.",
        });
    };

    const getBadgeVariant = (severity) => {
        switch (severity) {
            case 'critical':
            case 'high': 
                return 'destructive';
            case 'medium': 
                return 'secondary';
            default: return 'outline';
        }
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Anomalies et Urgences</CardTitle>
                    <CardDescription>Liste des incidents et retards nécessitant une action immédiate.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Anomalies et Urgences</CardTitle>
                </CardHeader>
                <CardContent className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-64">
                    <AlertTriangle className="h-5 w-5" />
                    {error}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion des Anomalies et Urgences</CardTitle>
                <CardDescription>Liste des incidents et retards nécessitant une action immédiate.</CardDescription>
            </CardHeader>
            <CardContent>
                {anomalies.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg">
                        <Inbox className="h-12 w-12 mb-4"/>
                        <h3 className="text-lg font-semibold">Aucune anomalie en cours</h3>
                        <p className="text-sm">Tout se déroule comme prévu.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Chauffeur</TableHead>
                                <TableHead>Sévérité</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {anomalies.map((anomaly) => (
                                <TableRow key={anomaly.id}>
                                    <TableCell>{anomaly.driver_name}</TableCell>
                                    <TableCell>
                                        <Badge variant={getBadgeVariant(anomaly.severity)}>{anomaly.severity}</Badge>
                                    </TableCell>
                                    <TableCell>{anomaly.description}</TableCell>
                                    <TableCell>{new Date(anomaly.created_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button size="sm" onClick={() => handleResolve(anomaly.id)}>Résoudre</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default AnomaliesTable;