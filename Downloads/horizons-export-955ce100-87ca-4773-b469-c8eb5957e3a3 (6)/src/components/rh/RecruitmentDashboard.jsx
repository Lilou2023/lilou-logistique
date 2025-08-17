import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertTriangle, Inbox, Download, Briefcase, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RecrutementPage from '@/pages/RecrutementPage';
import DriverImport from '@/components/rh/DriverImport';

const statusOptions = ['Nouvelle', 'En cours', 'Entretien', 'Retenue', 'Refusée'];
const statusColors = {
  'Nouvelle': 'bg-blue-500',
  'En cours': 'bg-yellow-500',
  'Entretien': 'bg-purple-500',
  'Retenue': 'bg-green-500',
  'Refusée': 'bg-red-500',
};

const RecruitmentDashboard = () => {
    const { toast } = useToast();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);

    const fetchCandidates = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('rh_candidates')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCandidates(data);
        } catch (err) {
            setError('Impossible de charger les candidatures.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCandidates();
        const changes = supabase.channel('rh_candidates_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'rh_candidates' }, fetchCandidates)
            .subscribe();

        return () => {
            supabase.removeChannel(changes);
        };
    }, [fetchCandidates]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('rh_candidates')
                .update({ status: newStatus })
                .eq('id', id);
            
            if (error) throw error;
            toast({ title: 'Statut mis à jour !' });
        } catch (err) {
            toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de mettre à jour le statut.' });
        }
    };
    
    const handleDownloadCV = async (cvPath) => {
        if(!cvPath) {
            toast({ variant: 'destructive', title: 'Aucun CV', description: 'Ce candidat n\'a pas de CV.' });
            return;
        }
        try {
            const { data, error } = await supabase.storage.from('cvs').download(cvPath);
            if (error) throw error;
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = cvPath.split('/').pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Erreur de téléchargement', description: error.message });
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <TableRow>
                    <TableCell colSpan="5" className="h-64 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                    </TableCell>
                </TableRow>
            );
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan="5" className="h-64 text-center text-destructive">
                        <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                        {error}
                    </TableCell>
                </TableRow>
            );
        }

        if (candidates.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan="5">
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg">
                            <Inbox className="h-12 w-12 mb-4"/>
                            <h3 className="text-lg font-semibold">Aucune candidature pour le moment</h3>
                            <p className="text-sm">Partagez votre page de recrutement pour recevoir des CV.</p>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        return candidates.map((candidate) => (
            <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.full_name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{new Date(candidate.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                    <Select value={candidate.status} onValueChange={(value) => handleStatusChange(candidate.id, value)}>
                        <SelectTrigger className="w-[120px]">
                             <SelectValue>
                                <Badge className={`${statusColors[candidate.status] || 'bg-gray-400'} text-white`}>{candidate.status}</Badge>
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map(option => (
                                <SelectItem key={option} value={option}>
                                    <Badge className={`${statusColors[option]} text-white`}>{option}</Badge>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadCV(candidate.cv_path)} disabled={!candidate.cv_path}>
                        <Download className="h-4 w-4" />
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Suivi des Candidatures</CardTitle>
                    <CardDescription>Gérez les candidats qui ont postulé pour rejoindre votre équipe.</CardDescription>
                </div>
                 <div className="flex gap-2">
                    <Dialog open={isRecruitmentOpen} onOpenChange={setIsRecruitmentOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Briefcase className="mr-2 h-4 w-4" /> Page de recrutement</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0">
                            <RecrutementPage isEmbedded={true} onNewCandidate={() => { fetchCandidates(); setIsRecruitmentOpen(false); }}/>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
                        <DialogTrigger asChild>
                            <Button><UserPlus className="mr-2 h-4 w-4" />Importer en masse</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Importer des chauffeurs via CSV</DialogTitle>
                            </DialogHeader>
                            <DriverImport onImportComplete={() => { fetchCandidates(); setIsImportOpen(false); }} />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">CV</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{renderContent()}</TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecruitmentDashboard;