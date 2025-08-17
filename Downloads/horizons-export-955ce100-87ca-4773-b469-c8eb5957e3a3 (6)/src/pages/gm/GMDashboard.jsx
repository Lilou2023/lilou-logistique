import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, CheckCircle, Lightbulb, Map, TrendingUp, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const kpiData = [
    { title: "OTD (On-Time Delivery)", value: "98.7%", target: "98.5%", status: "success" },
    { title: "DNR (Delivery Not Received)", value: "1.1%", target: "< 1.5%", status: "success" },
    { title: "PHR (Packages Per Hour)", value: "22.5", target: "21.0", status: "success" },
    { title: "POD Quality", value: "99.2%", target: "99.0%", status: "success" },
    { title: "Concessions", value: "0.3%", target: "< 0.5%", status: "warning" },
    { title: "Compliance Rate", value: "97.8%", target: "98.0%", status: "danger" },
];

const KpiCard = ({ title, value, target, status }) => {
    const statusClasses = {
        success: "border-green-500/50 text-green-400",
        warning: "border-yellow-500/50 text-yellow-400",
        danger: "border-red-500/50 text-red-400",
    };
    return (
        <Card className={`bg-card/50 border-l-4 ${statusClasses[status]}`}>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">Objectif: {target}</p>
            </CardContent>
        </Card>
    );
};

const AlertsTable = ({ alerts, onAcknowledge }) => {
    const priorityVariant = {
        critical: "destructive",
        high: "destructive",
        medium: "secondary",
        low: "outline"
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Alertes Prioritaires</CardTitle>
                <CardDescription>Actions immédiates requises pour maintenir la performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Priorité</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {alerts.map(alert => (
                            <TableRow key={alert.id}>
                                <TableCell><Badge variant={priorityVariant[alert.priority]}>{alert.priority}</Badge></TableCell>
                                <TableCell>{alert.message}</TableCell>
                                <TableCell>
                                    <Button size="sm" onClick={() => onAcknowledge(alert.id)}>
                                        <CheckCircle className="mr-2 h-4 w-4" /> Acquitter
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const IAInsightsPanel = () => (
    <Card className="h-full">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary" /> Amir-IA Insights</CardTitle>
            <CardDescription>Recommandations basées sur les données en temps réel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 mt-1 text-green-400" />
                <p className="text-sm">Prédiction : Le taux de DNR du secteur Nord devrait baisser de 5% demain grâce à la réaffectation de la tournée T-124.</p>
            </div>
            <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 mt-1 text-blue-400" />
                <p className="text-sm">Recommandation RH : Le chauffeur #54 (A. Martin) a un taux de POD en baisse. Planifier une formation corrective.</p>
            </div>
        </CardContent>
    </Card>
);

const LiveMapPlaceholder = () => (
    <Card className="h-full">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Map className="text-primary" /> Suivi de la Flotte</CardTitle>
            <CardDescription>Vue en temps réel des véhicules sur le terrain.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 bg-muted rounded-b-lg">
            <p className="text-muted-foreground">L'intégration de la carte Leaflet est en cours...</p>
        </CardContent>
    </Card>
);

const GMDashboard = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const { data, error } = await supabase
                    .from('alerts')
                    .select('*')
                    .eq('status', 'new')
                    .order('created_at', { ascending: false })
                    .limit(5);
                if (error) throw error;
                setAlerts(data);
            } catch (err) {
                setError("Impossible de charger les alertes.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();

        const channel = supabase.channel('public:alerts')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, (payload) => {
                fetchAlerts();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleAcknowledge = async (id) => {
        try {
            const { error } = await supabase
                .from('alerts')
                .update({ status: 'acknowledged' })
                .eq('id', id);
            if (error) throw error;
            toast({ title: "Alerte acquittée", description: "L'alerte a été marquée comme vue." });
        } catch (err) {
            toast({ variant: "destructive", title: "Erreur", description: "Impossible de mettre à jour l'alerte." });
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {loading ? <Loader2 className="animate-spin" /> : error ? <AlertTriangle className="text-destructive" /> : <AlertsTable alerts={alerts} onAcknowledge={handleAcknowledge} />}
                </div>
                <div className="space-y-6">
                    <IAInsightsPanel />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LiveMapPlaceholder />
                <Card>
                    <CardHeader><CardTitle>Tendances de Performance</CardTitle></CardHeader>
                    <CardContent className="flex items-center justify-center h-64 bg-muted rounded-b-lg">
                        <p className="text-muted-foreground">Graphique Recharts à venir...</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default GMDashboard;