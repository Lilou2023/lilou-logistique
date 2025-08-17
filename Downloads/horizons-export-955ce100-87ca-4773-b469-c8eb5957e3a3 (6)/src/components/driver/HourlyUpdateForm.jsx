import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Send, Loader2 } from 'lucide-react';

const HourlyUpdateForm = () => {
    const { toast } = useToast();
    const [packagesDelivered, setPackagesDelivered] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        toast({
            title: "🚧 Fonctionnalité en cours de développement",
            description: "Le rapport de progression horaire sera bientôt disponible.",
        });
        setLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rappel Horaire</CardTitle>
                <CardDescription>Saisissez le nombre total de colis livrés jusqu'à présent.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="packages">Nombre total de colis livrés</Label>
                        <Input
                            id="packages"
                            type="number"
                            value={packagesDelivered}
                            onChange={(e) => setPackagesDelivered(e.target.value)}
                            placeholder="Ex: 85"
                            disabled={loading}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Soumettre la progression
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default HourlyUpdateForm;