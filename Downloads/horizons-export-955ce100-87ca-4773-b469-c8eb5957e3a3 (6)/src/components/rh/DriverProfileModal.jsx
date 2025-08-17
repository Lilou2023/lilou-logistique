import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const contractTypes = ['CDI', 'CDD', 'Intérim', 'Auto-entrepreneur'];
const statuses = ['actif', 'inactif', 'formation', 'en_conges'];

const DriverProfileModal = ({ driverId, onUpdate }) => {
    const { toast } = useToast();
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { profile: currentUser, refreshProfile } = useAuth();
    
    const fetchDriverProfile = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', driverId)
                .single();
            if (error) throw error;
            setDriver(data);
            setAvatarPreview(data.avatar_url);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de charger le profil.' });
        } finally {
            setLoading(false);
        }
    }, [driverId, toast]);

    useEffect(() => {
        if (driverId) {
            fetchDriverProfile();
        }
    }, [driverId, fetchDriverProfile]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDriver(prev => ({...prev, [name]: value}));
    }
    
    const handleSelectChange = (name, value) => {
        setDriver(prev => ({ ...prev, [name]: value }));
    }
    
    const handleAvatarChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            let avatarUrl = driver.avatar_url;
            if(avatarFile){
                const filePath = `${driverId}/${avatarFile.name}`;
                const { error: uploadError } = await supabase.storage
                   .from('avatars')
                   .upload(filePath, avatarFile, { upsert: true });

                if(uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
                avatarUrl = publicUrl;
            }

            const { first_name, last_name, phone, address, contract_type, contract_start_date, contract_end_date, status } = driver;
            
            const { error } = await supabase
                .from('user_profiles')
                .update({ 
                    first_name, 
                    last_name, 
                    phone,
                    address,
                    contract_type,
                    contract_start_date,
                    contract_end_date,
                    status,
                    avatar_url: avatarUrl
                 })
                .eq('id', driverId);
            
            if (error) throw error;

            toast({ title: 'Profil mis à jour !'});
            if(currentUser.id === driverId) {
              refreshProfile();
            }
            if (onUpdate) onUpdate();

        } catch (error) {
            toast({ variant: 'destructive', title: 'Erreur', description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (loading) return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (!driver) return <p>Impossible de trouver les informations pour ce membre.</p>;
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
                 <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarPreview} alt={driver.full_name} />
                    <AvatarFallback>{driver.full_name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <Label htmlFor="avatar-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Changer d'avatar
                    </Label>
                    <input id="avatar-upload" type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF jusqu'à 2Mo.</p>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="first_name">Prénom</Label>
                    <Input id="first_name" name="first_name" value={driver.first_name || ''} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="last_name">Nom</Label>
                    <Input id="last_name" name="last_name" value={driver.last_name || ''} onChange={handleInputChange} />
                </div>
             </div>
             <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={driver.email} disabled />
            </div>
            <div className="space-y-1">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" name="phone" value={driver.phone || ''} onChange={handleInputChange} />
            </div>
             <div className="space-y-1">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" name="address" value={driver.address || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="contract_type">Type de contrat</Label>
                    <Select name="contract_type" value={driver.contract_type || ''} onValueChange={(value) => handleSelectChange('contract_type', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                            {contractTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="status">Statut</Label>
                    <Select name="status" value={driver.status || ''} onValueChange={(value) => handleSelectChange('status', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="contract_start_date">Date de début</Label>
                    <Input id="contract_start_date" name="contract_start_date" type="date" value={driver.contract_start_date || ''} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="contract_end_date">Date de fin</Label>
                    <Input id="contract_end_date" name="contract_end_date" type="date" value={driver.contract_end_date || ''} onChange={handleInputChange} />
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enregistrer les modifications
            </Button>
        </form>
    )
};
export default DriverProfileModal;