import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const AddDriverForm = ({ onFinished }) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: 'Lilou2023@', // Mot de passe temporaire par défaut
    full_name: '',
    prenom: '',
    nom: '',
    role: 'driver', // Rôle par défaut
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
    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.full_name,
      prenom: formData.prenom,
      nom: formData.nom,
      role: formData.role,
    });
    if (!error) {
      toast({
        title: 'Employé ajouté !',
        description: 'Le nouveau profil a été créé et un email de bienvenue envoyé.',
      });
      onFinished();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prenom">Prénom</Label>
        <Input id="prenom" name="prenom" type="text" placeholder="Jean" value={formData.prenom} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nom">Nom</Label>
        <Input id="nom" name="nom" type="text" placeholder="Dupont" value={formData.nom} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="full_name">Nom complet (Automatique)</Label>
        <Input id="full_name" name="full_name" type="text" value={`${formData.prenom} ${formData.nom}`} disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input id="email" name="email" type="email" placeholder="employe@lilou-go.com" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe temporaire</Label>
        <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Rôle</Label>
        <Select name="role" onValueChange={(value) => handleSelectChange('role', value)} defaultValue="driver">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="driver">Chauffeur</SelectItem>
            <SelectItem value="dispatcher">Dispatcher</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="hr">RH</SelectItem>
            <SelectItem value="fleet_manager">Gestionnaire de flotte</SelectItem>
            <SelectItem value="General Manager">Directeur Général</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Créer le profil
      </Button>
    </form>
  );
};

export default AddDriverForm;