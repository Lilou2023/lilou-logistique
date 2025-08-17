import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, Inbox, Check, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AttendanceDashboard = () => {
    const { toast } = useToast();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('rh_medical_leaves')
                .select(`
                    *,
                    user_profiles ( full_name )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data);
        } catch (err) {
            setError('Impossible de charger les demandes de congé.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('rh_medical_leaves')
                .update({ status: newStatus, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;
            
            toast({
                title: 'Statut mis à jour !',
                description: `La demande a été ${newStatus === 'Approved' ? 'approuvée' : 'rejetée'}.`,
            });
            fetchRequests(); // Refresh data
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Erreur',
                description: "Impossible de mettre à jour la demande. " + err.message,
            });
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved': return <Badge variant="success">Approuvée</Badge>;
            case 'Rejected': return <Badge variant="destructive">Rejetée</Badge>;
            case 'Pending':
            default:
                return <Badge variant="secondary">En attente</Badge>;
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    if (error) {
        return <div className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-64"><AlertTriangle className="h-5 w-5" />{error}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion des Absences et Arrêts</CardTitle>
                <CardDescription>Consultez et gérez les arrêts de travail des employés.</CardDescription>
            </CardHeader>
            <CardContent>
                {requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg">
                        <Inbox className="h-12 w-12 mb-4"/>
                        <h3 className="text-lg font-semibold">Aucune demande d'arrêt</h3>
                        <p className="text-sm">Toutes les demandes ont été traitées.</p>
                    </div>
                ) : (
                    <div className="max-h-[500px] overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employé</TableHead>
                                    <TableHead>Dates</TableHead>
                                    <TableHead>Motif</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map((req) => (
                                    <TableRow key={req.id}>
                                        <TableCell>{req.user_profiles?.full_name || 'N/A'}</TableCell>
                                        <TableCell>{new Date(req.start_date).toLocaleDateString()} - {req.end_date ? new Date(req.end_date).toLocaleDateString() : 'En cours'}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{req.reason || 'N/A'}</TableCell>
                                        <TableCell>{getStatusBadge(req.status)}</TableCell>
                                        <TableCell>
                                            {req.status === 'Pending' && (
                                                <div className="flex gap-2">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild><Button size="icon" variant="outline" className="text-green-500 hover:text-green-600"><Check className="h-4 w-4" /></Button></AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader><AlertDialogTitle>Approuver la demande ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription></AlertDialogHeader>
                                                            <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={() => handleStatusChange(req.id, 'Approved')}>Approuver</AlertDialogAction></AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild><Button size="icon" variant="outline" className="text-red-500 hover:text-red-600"><X className="h-4 w-4" /></Button></AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader><AlertDialogTitle>Rejeter la demande ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription></AlertDialogHeader>
                                                            <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={() => handleStatusChange(req.id, 'Rejected')}>Rejeter</AlertDialogAction></AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AttendanceDashboard;