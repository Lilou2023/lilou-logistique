import React, { useState, useEffect } from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
    import { supabase } from '@/lib/customSupabaseClient';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import LeaveRequestForm from './LeaveRequestForm';
    import { CalendarPlus, CalendarCheck, CalendarX, Loader2, AlertTriangle } from 'lucide-react';
    import { Badge } from '@/components/ui/badge';
    import { format } from 'date-fns';
    import { fr } from 'date-fns/locale';

    const getStatusBadge = (status) => {
      switch (status) {
        case 'Approved':
          return <Badge variant="success">Approuvé</Badge>;
        case 'Rejected':
          return <Badge variant="destructive">Rejeté</Badge>;
        default:
          return <Badge variant="secondary">En attente</Badge>;
      }
    };

    const AssiduiteTab = () => {
      const { user } = useAuth();
      const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
      const [absences, setAbsences] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchAbsences = async () => {
          if (!user) return;
          setLoading(true);
          setError(null);
          try {
            const { data, error } = await supabase
              .from('absences')
              .select('*')
              .eq('driver_id', user.id)
              .order('start_date', { ascending: false });

            if (error) throw error;
            setAbsences(data || []);
          } catch (err) {
            setError("Impossible de charger l'historique des absences.");
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchAbsences();
      }, [user, isLeaveModalOpen]);

      const renderContent = () => {
        if (loading) {
          return <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
        }
        if (error) {
          return <div className="text-destructive p-4 bg-destructive/10 rounded-lg flex items-center gap-2 justify-center h-40"><AlertTriangle className="h-5 w-5" />{error}</div>;
        }
        if (absences.length === 0) {
          return <p className="text-center text-muted-foreground p-8">Aucune demande de congé enregistrée.</p>;
        }
        return (
          <ul className="space-y-3">
            {absences.map((absence) => (
              <li key={absence.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold">
                    Du {format(new Date(absence.start_date), 'dd/MM/yyyy', { locale: fr })} au {format(new Date(absence.end_date), 'dd/MM/yyyy', { locale: fr })}
                  </p>
                  <p className="text-sm text-muted-foreground">{absence.reason || 'Motif non spécifié'}</p>
                </div>
                {getStatusBadge(absence.status)}
              </li>
            ))}
          </ul>
        );
      };

      return (
        <Card>
          <CardHeader className="flex flex-row justify-between items-start">
            <div>
              <CardTitle>Suivi d'Assiduité</CardTitle>
              <CardDescription>Consultez votre historique de présence et vos demandes de congés.</CardDescription>
            </div>
            <Dialog open={isLeaveModalOpen} onOpenChange={setIsLeaveModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Demander un congé
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouvelle demande de congé</DialogTitle>
                </DialogHeader>
                <LeaveRequestForm onFinished={() => setIsLeaveModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-muted rounded-lg text-center">
                    <CalendarCheck className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm text-muted-foreground">Taux de présence</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                    <CalendarX className="h-8 w-8 mx-auto text-red-500 mb-2" />
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">Absences (30j)</p>
                </div>
                 <div className="p-4 bg-muted rounded-lg text-center">
                    <CalendarPlus className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{absences.filter(a => a.status === 'Pending').length}</p>
                    <p className="text-sm text-muted-foreground">Demandes en attente</p>
                </div>
            </div>
             <h3 className="text-lg font-semibold mb-4">Historique des demandes</h3>
            {renderContent()}
          </CardContent>
        </Card>
      );
    };

    export default AssiduiteTab;