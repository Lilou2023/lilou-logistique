import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const AddAbsenceForm = ({ drivers, onFinished }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    driver_id: '',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'Approved',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('absences').insert([formData]);
      if (error) throw error;
      toast({
        title: 'Absence ajoutée !',
        description: "L'absence a été enregistrée avec succès.",
      });
      onFinished();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: "Impossible d'ajouter l'absence. " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="driver_id">Chauffeur</Label>
        <Select onValueChange={(value) => handleSelectChange('driver_id', value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un chauffeur" />
          </SelectTrigger>
          <SelectContent>
            {drivers.map((driver) => (
              <SelectItem key={driver.id} value={driver.id}>
                {driver.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
        <Label htmlFor="reason">Motif</Label>
        <Textarea id="reason" name="reason" placeholder="Motif de l'absence..." value={formData.reason} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select name="status" onValueChange={(value) => handleSelectChange('status', value)} defaultValue="Approved">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Approved">Approuvée</SelectItem>
            <SelectItem value="Pending">En attente</SelectItem>
            <SelectItem value="Rejected">Rejetée</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Ajouter l'absence
      </Button>
    </form>
  );
};

export default AddAbsenceForm;