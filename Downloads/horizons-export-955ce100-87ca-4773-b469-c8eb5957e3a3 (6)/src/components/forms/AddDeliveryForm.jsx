import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const AddDeliveryForm = ({ drivers, onFinished }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    driver_id: '',
    client_name: 'Client Mystère',
    address: '123 Rue de la Réussite',
    city: 'Paris',
    postal_code: '75001',
    status: 'completed',
    scheduled_date: new Date().toISOString().split('T')[0],
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
      const { error } = await supabase.from('deliveries').insert([{
        ...formData,
        contact_phone: '0123456789',
        contact_email: 'contact@example.com',
        package_description: 'Colis standard',
        weight_kg: 2.5,
        scheduled_time_window: '09:00-12:00',
        notes: 'Ajout rapide depuis dashboard.'
      }]);
      if (error) throw error;
      toast({
        title: 'Livraison ajoutée !',
        description: 'La nouvelle livraison a été enregistrée.',
      });
      onFinished();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: "Impossible d'ajouter la livraison. " + error.message,
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
      <div className="space-y-2">
        <Label htmlFor="scheduled_date">Date de livraison</Label>
        <Input id="scheduled_date" name="scheduled_date" type="date" value={formData.scheduled_date} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select name="status" onValueChange={(value) => handleSelectChange('status', value)} defaultValue="completed">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">Terminée</SelectItem>
            <SelectItem value="in_progress">En cours</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="failed">Échouée (DNR)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Ajouter la livraison
      </Button>
    </form>
  );
};

export default AddDeliveryForm;