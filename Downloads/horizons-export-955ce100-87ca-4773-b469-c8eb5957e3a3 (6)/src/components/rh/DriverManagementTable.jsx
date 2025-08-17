import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserPlus, Loader2, AlertTriangle, UserX, UserCheck, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddDriverForm from '@/components/rh/AddDriverForm';
import DriverProfileModal from '@/components/rh/DriverProfileModal';

const DriverManagementTable = () => {
    const { toast } = useToast();
    const { profile: currentUser } = useAuth();
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    const fetchPersonnel = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from('user_profiles')
                .select('*')
                .not('role', 'is', null)
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setPersonnel(data);
        } catch (err) {
            setError('Impossible de charger les données du personnel.');
            console.error(err);
            toast({ variant: 'destructive', title: 'Erreur', description: err.message });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchPersonnel();
        const profileChanges = supabase.channel('user_profiles_changes_rh_table')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'user_profiles' }, fetchPersonnel)
            .subscribe();

        return () => {
            supabase.removeChannel(profileChanges);
        };
    }, [fetchPersonnel]);
    
    const handleToggleApproval = async (member) => {
        try {
            const { error } = await supabase
                .from('user_profiles')
                .update({ is_approved: !member.is_approved })
                .eq('id', member.id);
            if (error) throw error;
            toast({ title: `Le statut de ${member.full_name} a été mis à jour.`});
        } catch(err) {
             toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de mettre à jour le statut.' });
        }
    };
    
    const handleDeleteUser = async (memberId) => {
        toast({ variant: 'destructive', title: 'Fonctionnalité non implémentée', description: 'La suppression sécurisée est en cours de développement.' });
    };

    const handleViewProfile = (member) => {
        setSelectedMember(member);
        setIsProfileOpen(true);
    };

    const renderContent = () => {
        if (loading) return <TableRow><TableCell colSpan="6" className="h-64 text-center"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /></TableCell></TableRow>;
        if (error) return <TableRow><TableCell colSpan="6" className="h-64 text-center text-destructive"><AlertTriangle className="h-8 w-8 mx-auto mb-2" />{error}</TableCell></TableRow>;
        if (personnel.length === 0) return <TableRow><TableCell colSpan="6" className="h-64 text-center text-muted-foreground">Aucun personnel trouvé.</TableCell></TableRow>;

        return personnel.map((member) => (
            <TableRow key={member.id} className={!member.is_approved ? "bg-yellow-100/50 dark:bg-yellow-900/20" : ""}>
                <TableCell className="font-medium">{member.full_name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone || 'N/A'}</TableCell>
                <TableCell>
                    <Badge variant="secondary">{member.role || 'N/A'}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={member.is_approved ? 'success' : 'destructive'}>
                        {member.is_approved ? 'Approuvé' : 'En attente'}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Ouvrir le menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewProfile(member)}>Voir le profil</DropdownMenuItem>
                             {(currentUser?.role === 'admin' || currentUser?.role === 'hr') && (
                                <>
                                    <DropdownMenuItem onClick={() => handleToggleApproval(member)}>
                                        {member.is_approved ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                        <span>{member.is_approved ? 'Révoquer' : 'Approuver'}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(member.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Supprimer</span>
                                    </DropdownMenuItem>
                                </>
                             )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Gestion du Personnel</CardTitle>
                        <CardDescription>Consultez, ajoutez et gérez l'ensemble du personnel.</CardDescription>
                    </div>
                     <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                        <DialogTrigger asChild>
                             <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Ajouter un membre
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Ajouter un nouveau membre</DialogTitle></DialogHeader>
                            <AddDriverForm onDriverAdded={() => { fetchPersonnel(); setIsAddMemberOpen(false); }} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Téléphone</TableHead>
                                    <TableHead>Rôle</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>{renderContent()}</TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <DialogContent className="max-w-4xl">
                     <DialogHeader><DialogTitle>Profil de {selectedMember?.full_name}</DialogTitle></DialogHeader>
                    {selectedMember && <DriverProfileModal driverId={selectedMember.id} onUpdate={() => { fetchPersonnel(); setIsProfileOpen(false); }} />}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DriverManagementTable;