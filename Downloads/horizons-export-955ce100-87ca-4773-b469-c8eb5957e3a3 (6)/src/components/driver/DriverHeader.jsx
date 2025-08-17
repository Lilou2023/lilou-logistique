import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { LogOut } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    
    const DriverHeader = ({ driverName, vehicleInfo }) => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const { signOut } = useAuth();
    
      const handleLogout = async () => {
        toast({
          title: 'Déconnexion en cours...',
        });
        await signOut();
        navigate('/login', { replace: true });
      };
    
      return (
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Bonjour, {driverName} !</h1>
            <p className="text-muted-foreground">{vehicleInfo || "Aucun véhicule assigné"}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>
      );
    };
    
    export default DriverHeader;