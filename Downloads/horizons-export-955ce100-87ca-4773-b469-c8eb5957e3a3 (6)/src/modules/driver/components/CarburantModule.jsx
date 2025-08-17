import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Fuel, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CarburantModule = () => {
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
                    <Fuel className="h-8 w-8" />
                    <span className="text-2xl font-bold">Module Carburant</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Déclaration du kilométrage et du plein de carburant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="mileage" className="text-gray-300">Kilométrage Actuel</Label>
                    <Input id="mileage" type="number" placeholder="ex: 123456" className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="fuel" className="text-gray-300">Montant du plein (€)</Label>
                    <Input id="fuel" type="number" step="0.01" placeholder="ex: 75.50" className="bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <Button onClick={handleFeatureClick} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 transition-transform transform hover:scale-105 flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Prendre une photo du reçu
                </Button>
                 <Button onClick={handleFeatureClick} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 transition-transform transform hover:scale-105">
                    Soumettre
                </Button>
            </CardContent>
        </Card>
    );
};

export default CarburantModule;