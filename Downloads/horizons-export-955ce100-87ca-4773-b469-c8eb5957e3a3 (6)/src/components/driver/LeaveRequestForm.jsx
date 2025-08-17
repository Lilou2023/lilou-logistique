import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';

const LeaveRequestForm = ({ onFinished }) => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Profil utilisateur non trouvé.' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('absences').insert([
        {
          driver_id: profile.id,
          start_date: formData.start_date,
          end_date: formData.end_date,
          reason: formData.reason,
          status: 'Pending',
        },
      ]);
      if (error) throw error;
      toast({
        title: 'Demande envoyée !',
        description: 'Votre demande de congé a été soumise pour approbation.',
      });
      onFinished();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: "Impossible d'envoyer la demande. " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Date de début</Label>
          <Input id="start_date" name="start_date" type="date" value={formData.start_date} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_date">Date de fin</Label>
          <Input id="end_date" name="end_date" type="date" value={formData.end_date} onChange={handleChange} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">Motif (optionnel)</Label>
        <Textarea id="reason" name="reason" placeholder="Ex: Vacances annuelles, raison personnelle..." value={formData.reason} onChange={handleChange} />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer la demande
        </Button>
      </DialogFooter>
    </form>
  );
};

export default LeaveRequestForm;