import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { Power, PowerOff, Loader2, AlertTriangle } from 'lucide-react';
    
    const MobilicConnect = () => {
      const [status, setStatus] = useState('disconnected'); // disconnected, connecting, connected, error
      const { toast } = useToast();
    
      const handleConnect = () => {
        setStatus('connecting');
        setTimeout(() => {
          // In a real app, this would be an API call to Mobilic
          const success = Math.random() > 0.1; // 90% success rate
          if (success) {
            setStatus('connected');
            toast({
              title: 'Mobilic Connecté',
              description: 'Votre temps de conduite est maintenant enregistré.',
              variant: 'success',
            });
          } else {
            setStatus('error');
            toast({
              title: 'Erreur de Connexion Mobilic',
              description: 'Impossible de se connecter. Veuillez réessayer.',
              variant: 'destructive',
            });
          }
        }, 1500);
      };
    
      const handleDisconnect = () => {
        setStatus('disconnected');
        toast({
          title: 'Mobilic Déconnecté',
        });
      };
    
      const renderButton = () => {
        switch (status) {
          case 'disconnected':
            return (
              <Button onClick={handleConnect} className="w-full bg-blue-600 hover:bg-blue-700">
                <Power className="mr-2 h-4 w-4" /> Se Connecter à Mobilic
              </Button>
            );
          case 'connecting':
            return (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connexion en cours...
              </Button>
            );
          case 'connected':
            return (
              <Button onClick={handleDisconnect} variant="secondary" className="w-full bg-green-600 hover:bg-green-700 text-white">
                <PowerOff className="mr-2 h-4 w-4" /> Se Déconnecter de Mobilic
              </Button>
            );
          case 'error':
             return (
              <Button onClick={handleConnect} variant="destructive" className="w-full">
                <AlertTriangle className="mr-2 h-4 w-4" /> Réessayer la connexion
              </Button>
            );
          default:
            return null;
        }
      };

      const getStatusText = () => {
         switch (status) {
          case 'disconnected':
            return 'Connexion obligatoire pour démarrer.';
          case 'connecting':
            return 'Synchronisation avec les services Mobilic...';
          case 'connected':
            return 'Connecté. Votre temps de conduite est enregistré.';
          case 'error':
            return 'Échec de la connexion. Veuillez réessayer.';
          default:
            return '';
        }
      }
    
      return (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle>Connexion Mobilic</CardTitle>
            <CardDescription>{getStatusText()}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderButton()}
          </CardContent>
        </Card>
      );
    };
    
    export default MobilicConnect;