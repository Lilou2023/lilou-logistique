import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PackageCheck, Car, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const RetourModule = () => {
    const { toast } = useToast();

    const handleFeatureClick = () => {
        toast({
          title: "🚧 Fonctionnalité en cours de développement",
          description: "Cette partie de l'application est en construction. Revenez bientôt !",
        });
    };

    return (
        <Card className="bg-gray-800/50 border-gray-700 text-white shadow-2xl backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-400">
                    <Car className="h-8 w-8" />
                    <span className="text-2xl font-bold">Module de Retour</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Procédures et rapports de fin de tournée.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="font-semibold text-lg mb-2 flex items-center"><PackageCheck className="text-green-400 mr-2" /> Colis restants</h3>
                    <p className="text-gray-300">Le scan des colis non-livrés sera bientôt disponible.</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-700/50">
                    <h3 className="font-semibold text-lg mb-2 flex items-center"><ClipboardList className="text-yellow-400 mr-2" /> Rapport d'incidents</h3>
                    <p className="text-gray-300">Le formulaire de rapport d'incident est en préparation.</p>
                </div>
                <Button onClick={handleFeatureClick} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 transition-transform transform hover:scale-105">
                    Clôturer la Tournée
                </Button>
            </CardContent>
        </Card>
    );
};

export default RetourModule;