
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Loader2, UserCheck, UserX, AlertCircle } from 'lucide-react';

const statusConfig = {
  actif: {
    label: 'Actif',
    variant: 'success',
    icon: <UserCheck className="h-4 w-4" />,
  },
  inactif: {
    label: 'Inactif',
    variant: 'destructive',
    icon: <UserX className="h-4 w-4" />,
  },
  formation: {
    label: 'En formation',
    variant: 'secondary',
    icon: <AlertCircle className="h-4 w-4" />,
  },
  en_conges: {
    label: 'En Congés',
    variant: 'outline',
    icon: <AlertCircle className="h-4 w-4" />,
  },
  default: {
    label: 'Inconnu',
    variant: 'outline',
    icon: <AlertCircle className="h-4 w-4" />,
  },
};

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, full_name, status, phone')
          .eq('role', 'driver')
          .order('full_name', { ascending: true });

        if (error) throw error;
        setDrivers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching drivers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const getStatusConfig = (status) => {
    return statusConfig[status] || statusConfig.default;
  };

  return (
    <Card className="bg-lilou-surface border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-text-primary">Liste des Conducteurs</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-destructive text-center">{error}</div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-text-secondary">Nom</TableHead>
                  <TableHead className="text-text-secondary">Statut</TableHead>
                  <TableHead className="text-text-secondary text-right">Téléphone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => {
                  const config = getStatusConfig(driver.status);
                  return (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium text-text-primary">{driver.full_name}</TableCell>
                      <TableCell>
                        <Badge variant={config.variant} className="flex items-center gap-2 w-fit">
                          {config.icon}
                          <span>{config.label}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-text-secondary">{driver.phone || 'N/A'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverList;
