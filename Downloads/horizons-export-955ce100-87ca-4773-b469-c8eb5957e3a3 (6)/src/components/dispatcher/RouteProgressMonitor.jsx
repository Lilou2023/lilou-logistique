import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, AlertTriangle, Inbox, Truck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const RouteProgressMonitor = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoutes = async () => {
        try {
            const { data, error } = await supabase.functions.invoke('get-routes-with-progress');
            if (error) throw error;
            if(data) setRoutes(data.routes);
        } catch (err) {
            setError('Impossible de charger la progression des tournées.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoutes();

        const channel = supabase
            .channel('realtime-routes-progress')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'deliveries' }, (payload) => {
                // Refetch all routes on any delivery change for simplicity
                fetchRoutes();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicle_checks' }, (payload) => {
                 // Refetch all routes on any vehicle_checks change (for returned packages count)
                fetchRoutes();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

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

        if (!routes || routes.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg">
                    <Inbox className="h-12 w-12 mb-4"/>
                    <h3 className="text-lg font-semibold">Aucune tournée en cours</h3>
                    <p className="text-sm">Le suivi apparaîtra ici une fois les tournées démarrées.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                <AnimatePresence>
                    {routes.map((route, index) => (
                         <motion.div 
                            key={route.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                         >
                            <div className="flex items-center gap-4">
                                <Truck className="h-5 w-5 text-muted-foreground" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className="font-medium">{route.driver_name} <span className="text-xs text-muted-foreground">({route.route_name})</span></p>
                                        <p className="text-sm font-mono">{route.packages_delivered} / {route.total_packages}</p>
                                    </div>
                                    <Progress value={route.progress_percentage} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        );
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Suivi des Tournées en Direct</CardTitle>
                <CardDescription>Progression des livraisons heure par heure.</CardDescription>
            </CardHeader>
            <CardContent>
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default RouteProgressMonitor;