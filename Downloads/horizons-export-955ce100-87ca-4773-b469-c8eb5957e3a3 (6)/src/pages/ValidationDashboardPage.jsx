import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, Power, TestTube, Palette, Sparkles, UserCheck, Loader2, Database, PlayCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const StatusCard = ({ title, status, loading, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      ) : status ? (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle className="h-6 w-6" />
          <span className="text-lg font-bold">Connecté</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-destructive">
          <XCircle className="h-6 w-6" />
          <span className="text-lg font-bold">Déconnecté</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const SeedScenario = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        setLoading(true);
        toast({ title: 'Lancement du scénario de test...', description: 'Création des utilisateurs et des données...' });
        
        try {
            const { data, error } = await supabase.functions.invoke('seed-test-data', {
                method: 'POST',
            });

            if (error) throw error;

            toast({ variant: 'default', title: 'Scénario terminé avec succès !', description: data.message, className: 'bg-green-500 text-white' });
        } catch (error) {
            toast({ variant: 'destructive', title: 'Erreur lors du scénario de test', description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Database /> Scénario de Test</CardTitle>
                <CardDescription>Initialisez la base de données avec un jeu de données complet (utilisateurs, véhicules, etc.).</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleSeed} disabled={loading}>
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <PlayCircle className="mr-2 h-4 w-4" />
                    )}
                    Lancer le Scénario
                </Button>
                 <p className="text-xs text-muted-foreground mt-2">Cette action est irréversible et peut écraser des données existantes.</p>
            </CardContent>
        </Card>
    );
};

export default function ValidationDashboardPage() {
  const { session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [loadingSupabase, setLoadingSupabase] = useState(true);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { error } = await supabase.from('user_profiles').select('id').limit(1);
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        setSupabaseConnected(true);
      } catch (error) {
        console.error("Supabase connection check failed:", error);
        setSupabaseConnected(false);
      } finally {
        setLoadingSupabase(false);
      }
    };
    checkSupabaseConnection();
  }, []);

  const roles = [
    { name: "Manager", path: "/manager/dashboard" },
    { name: "Conducteur", path: "/driver/dashboard" },
    { name: "Répartiteur", path: "/dispatcher/dashboard" },
    { name: "RH", path: "/rh/dashboard" },
    { name: "Chef de Parc", path: "/parc/dashboard" },
    { name: "General Manager", path: "/gm/dashboard" },
    { name: "Recrutement", path: "/recrutement" },
  ];

  return (
    <>
      <Helmet>
        <title>Validation - Lilou GO</title>
        <meta name="description" content="Tableau de bord pour la validation et l'optimisation de l'application." />
      </Helmet>
      <div className="dark min-h-screen w-full bg-background text-foreground p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <header className="text-center mb-12">
            <TestTube className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Tableau de Bord de Validation</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Centre de contrôle pour les tests finaux et l'optimisation avant la mise en production.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatusCard title="Connexion Supabase" status={supabaseConnected} loading={loadingSupabase} icon={<Power className="h-4 w-4 text-muted-foreground" />} />
            <StatusCard title="Session Utilisateur" status={!!session} loading={authLoading} icon={<UserCheck className="h-4 w-4 text-muted-foreground" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tests Fonctionnels (Navigation)</CardTitle>
                  <CardDescription>Vérifiez l'accès aux différentes sections de l'application.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {roles.map(role => (
                    <Button key={role.name} onClick={() => navigate(role.path)}>
                      {role.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
              <SeedScenario />
            </div>
            <div className="space-y-8">
               <Card>
                <CardHeader>
                    <CardTitle>Prochaines Étapes</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Utilisez le bouton "Lancer le Scénario" pour peupler la base de données.</li>
                        <li>Naviguez vers chaque tableau de bord pour valider l'affichage des données.</li>
                        <li>Testez les fonctionnalités de chaque module.</li>
                    </ul>
                </CardContent>
               </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}