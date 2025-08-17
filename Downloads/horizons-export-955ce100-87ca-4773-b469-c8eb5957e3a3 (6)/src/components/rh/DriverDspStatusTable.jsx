import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, UserX, ExternalLink, ShieldAlert } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  'Active': { variant: 'success', label: 'Actif' },
  'Amber': { variant: 'secondary', label: 'Amber' },
  'Red': { variant: 'destructive', label: 'Red' },
  'White': { variant: 'outline', label: 'White' },
};

const filters = ['Tous', 'Active', 'Amber', 'Red', 'White'];

const DriverDspStatusTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const { toast } = useToast();

  const fetchDriverStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('driver_dsp_status_view')
        .select(`*`)
        .order('inactive_days', { ascending: false });

      if (activeFilter !== 'Tous') {
        query = query.eq('dsp_status', activeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setDrivers(data);
    } catch (err) {
      setError('Impossible de charger le statut des chauffeurs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    fetchDriverStatus();
  }, [fetchDriverStatus]);
  
  const handlePortalClick = (driverName) => {
    toast({
      title: 'Redirection vers le portail Amazon',
      description: `Ouverture du profil de ${driverName} sur le portail DSP... (simulation)`,
    });
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
    
    if (drivers.length === 0) {
        return (
             <TableRow>
              <TableCell colSpan="5" className="h-64 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <UserX className="h-10 w-10 mb-2" />
                    <p>Aucun chauffeur ne correspond à ce filtre.</p>
                </div>
              </TableCell>
            </TableRow>
        )
    }

    return drivers.map((driver) => (
      <motion.tr
        key={driver.id}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-sm"
      >
        <TableCell className="font-medium">{driver.full_name || 'N/A'}</TableCell>
        <TableCell>
            <Badge variant={statusConfig[driver.dsp_status]?.variant || 'default'}>
                {statusConfig[driver.dsp_status]?.label || driver.dsp_status}
            </Badge>
        </TableCell>
        <TableCell className="text-center">{driver.inactive_days}</TableCell>
        <TableCell>{new Date(driver.last_activity_date).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm" onClick={() => handlePortalClick(driver.full_name)}>
            Voir sur portail DSP
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </TableCell>
      </motion.tr>
    ));
  };

  return (
    <div className="space-y-4">
        <div className="flex items-center gap-2">
            {filters.map(filter => (
                <Button 
                    key={filter} 
                    variant={activeFilter === filter ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(filter)}
                >
                    {filter}
                </Button>
            ))}
        </div>
        <div className="border rounded-lg">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Nom du Chauffeur</TableHead>
                <TableHead>Statut DSP</TableHead>
                <TableHead className="text-center">Jours d'inactivité</TableHead>
                <TableHead>Dernière Activité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
                <AnimatePresence>
                    {renderContent()}
                </AnimatePresence>
            </TableBody>
        </Table>
        </div>
    </div>
  );
};

export default DriverDspStatusTable;