import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Camera, Fuel, Gauge, Package, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  start_mileage: z.coerce.number().optional(),
  start_fuel_level: z.coerce.number().min(0).max(100).optional(),
  end_mileage: z.coerce.number().optional(),
  end_fuel_level: z.coerce.number().min(0).max(100).optional(),
  returned_packages_count: z.coerce.number().min(0).optional(),
  mechanical_issues: z.string().optional(),
  photos_uploaded: z.boolean().default(false),
});

const VehicleCheckForm = ({ checkType, driverInfo, onCheckComplete, existingCheck }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_mileage: existingCheck?.start_mileage || '',
      start_fuel_level: existingCheck?.start_fuel_level || 50,
      end_mileage: existingCheck?.end_mileage || '',
      end_fuel_level: existingCheck?.end_fuel_level || 50,
      returned_packages_count: existingCheck?.returned_packages_count || 0,
      mechanical_issues: existingCheck?.mechanical_issues || '',
      photos_uploaded: existingCheck?.photos_uploaded || false,
    },
  });

  const isMorning = checkType === 'morning';
  const isFormDisabled = !!existingCheck;

  const onSubmit = async (values) => {
    setLoading(true);
    if (!driverInfo || !user) {
      toast({ title: "Erreur", description: "Données du conducteur manquantes.", variant: "destructive" });
      setLoading(false);
      return;
    }
    
    const checkData = {
      driver_id: user.id,
      vehicle_id: driverInfo.vehicle_id,
      tour_id: driverInfo.tour_id,
      check_type: checkType,
      ...isMorning ? {
          arrival_time: new Date().toISOString(),
          start_mileage: values.start_mileage,
          start_fuel_level: values.start_fuel_level,
      } : {
          end_mileage: values.end_mileage,
          end_fuel_level: values.end_fuel_level,
          returned_packages_count: values.returned_packages_count,
      },
      mechanical_issues: values.mechanical_issues,
      photos_uploaded: values.photos_uploaded,
    };

    try {
      let error;
      if (existingCheck) {
        // This logic is for updating, but we'll focus on creating new ones for now.
        // For simplicity, we assume we only create.
        toast({ title: "Info", description: "Mise à jour non implémentée, création d'une nouvelle entrée." });
        ({ error } = await supabase.from('vehicle_checks').insert(checkData));
      } else {
        ({ error } = await supabase.from('vehicle_checks').insert(checkData));
      }

      if (error) throw error;
      
      toast({ title: `Checklist ${isMorning ? 'de départ' : 'de retour'} enregistrée !`, description: "Vos informations ont été sauvegardées avec succès." });
      if (onCheckComplete) onCheckComplete();

    } catch (error) {
      toast({ title: "Erreur de sauvegarde", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle>Checklist de {isMorning ? 'Départ' : 'Retour'}</CardTitle>
          <CardDescription>
            {isFormDisabled 
              ? `Checklist du ${isMorning ? 'matin' : 'soir'} déjà complétée.`
              : `Veuillez remplir les informations ci-dessous pour ${isMorning ? 'commencer votre journée' : 'terminer votre tournée'}.`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isFormDisabled ? (
            <div className="text-center p-8">
              <p className="text-lg font-semibold text-green-500">Merci, tout est en ordre pour {isMorning ? 'le départ' : 'le retour'} !</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isMorning ? (
                  <>
                    <div>
                      <Label htmlFor="start_mileage" className="flex items-center gap-2 mb-2"><Gauge size={16} /> Kilométrage de départ</Label>
                      <Input id="start_mileage" type="number" {...register('start_mileage')} placeholder="ex: 123456" />
                      {errors.start_mileage && <p className="text-red-500 text-xs mt-1">{errors.start_mileage.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="start_fuel_level" className="flex items-center gap-2 mb-2"><Fuel size={16} /> Niveau de carburant (%)</Label>
                      <Input id="start_fuel_level" type="range" min="0" max="100" step="5" {...register('start_fuel_level')} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="end_mileage" className="flex items-center gap-2 mb-2"><Gauge size={16} /> Kilométrage de fin</Label>
                      <Input id="end_mileage" type="number" {...register('end_mileage')} placeholder="ex: 123654" />
                      {errors.end_mileage && <p className="text-red-500 text-xs mt-1">{errors.end_mileage.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="end_fuel_level" className="flex items-center gap-2 mb-2"><Fuel size={16} /> Niveau de carburant (%)</Label>
                      <Input id="end_fuel_level" type="range" min="0" max="100" step="5" {...register('end_fuel_level')} />
                    </div>
                    <div>
                        <Label htmlFor="returned_packages_count" className="flex items-center gap-2 mb-2"><Package size={16} /> Colis retournés</Label>
                        <Input id="returned_packages_count" type="number" {...register('returned_packages_count')} />
                        {errors.returned_packages_count && <p className="text-red-500 text-xs mt-1">{errors.returned_packages_count.message}</p>}
                    </div>
                  </>
                )}
              </div>
              
              <div>
                <Label htmlFor="mechanical_issues" className="flex items-center gap-2 mb-2"><AlertTriangle size={16} /> Signaler un problème mécanique</Label>
                <Textarea id="mechanical_issues" {...register('mechanical_issues')} placeholder="Ex: Pneu avant droit sous-gonflé, voyant moteur allumé..." />
              </div>

              <div className="space-y-2">
                <Label>Photos du véhicule (4 coins)</Label>
                 <Button type="button" variant="outline" className="w-full" onClick={() => toast({ title: "Fonctionnalité en cours de développement", description: "La prise de photo sera bientôt disponible."})}>
                    <Camera className="mr-2 h-4 w-4" /> Simuler la prise de photos
                </Button>
                <p className="text-xs text-muted-foreground">Cliquez pour simuler le processus de photo. La vraie fonctionnalité est en cours.</p>
              </div>

              <Button type="submit" disabled={loading || isFormDisabled} className="w-full bg-primary hover:bg-primary-dark">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isMorning ? 'Valider le départ' : 'Valider le retour'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VehicleCheckForm;