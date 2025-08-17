import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const formSchema = z.object({
  first_name: z.string().min(1, 'Le prénom est requis.'),
  last_name: z.string().min(1, 'Le nom est requis.'),
  email: z.string().email("L'adresse email est invalide."),
  phone: z.string().optional(),
  role: z.string().min(1, 'Le rôle est requis.'),
});


const AddDriverForm = ({ onDriverAdded }) => {
  const { signUp } = useAuth();
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: { role: 'driver', first_name: '', last_name: '', email: '', phone: '' }
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    const temporaryPassword = `Pass@${new Date().getFullYear()}${Math.random().toString(36).slice(-4)}`;
    
    const metadata = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        role: formData.role
    };
    
    const { error } = await signUp(formData.email, temporaryPassword, metadata);

    if (!error) {
       toast({
            title: 'Membre ajouté avec succès !',
            description: `Un mot de passe temporaire a été défini pour ${formData.email}.`,
        });
        reset();
        if (onDriverAdded) onDriverAdded();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">Prénom</Label>
          <Input id="first_name" {...register('first_name')} />
          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
        </div>
        <div>
          <Label htmlFor="last_name">Nom</Label>
          <Input id="last_name" {...register('last_name')} />
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
       <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input id="phone" type="tel" {...register('phone')} />
      </div>
      <div>
        <Label htmlFor="role">Rôle</Label>
         <Select onValueChange={(value) => control.setValue('role', value)} defaultValue="driver">
            <SelectTrigger id="role">
                <SelectValue placeholder="Sélectionnez un rôle" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="driver">Chauffeur</SelectItem>
                <SelectItem value="chef_parc">Chef de Parc</SelectItem>
                <SelectItem value="dispatcher">Dispatcher</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="hr">RH</SelectItem>
                 <SelectItem value="General Manager">Directeur Général</SelectItem>
                 <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Ajouter le membre
      </Button>
    </form>
  );
};

export default AddDriverForm;