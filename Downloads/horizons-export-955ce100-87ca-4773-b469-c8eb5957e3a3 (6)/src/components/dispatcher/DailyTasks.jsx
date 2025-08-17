import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, UserCheck, ClipboardCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const atRiskDrivers = [
    { name: 'Lucas Martin', reason: '3 DNR cette semaine', pod: '94.2%' },
    { name: 'Sophie Dubois', reason: 'Retards répétés', pod: '96.1%' },
];

const DailyTasks = () => {
    const { toast } = useToast();

    const showToast = (message) => {
        toast({
            title: 'Action enregistrée',
            description: message,
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Checklist Quotidienne du Dispatcher</CardTitle>
                    <CardDescription>Tâches opérationnelles pour assurer le bon déroulement de la journée.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                        <Checkbox id="task1" />
                        <label htmlFor="task1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Vérifier et valider les tournées de la veille
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                        <Checkbox id="task2" />
                        <label htmlFor="task2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Traiter les colis retournés et notifier les clients concernés
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                        <Checkbox id="task3" />
                        <label htmlFor="task3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Valider toutes les anomalies signalées
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                        <Checkbox id="task4" />
                        <label htmlFor="task4" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Préparer les indicateurs pour la réunion journalière
                        </label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive" /> Chauffeurs à Suivre
                    </CardTitle>
                    <CardDescription>Liste générée automatiquement des chauffeurs nécessitant une attention particulière.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {atRiskDrivers.map((driver, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{driver.name}</p>
                                    <p className="text-xs text-muted-foreground">{driver.reason}</p>
                                </div>
                                <Badge variant="destructive">POD: {driver.pod}</Badge>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => showToast(`Alerte RH envoyée pour ${driver.name}.`)}>
                                    <UserCheck className="h-4 w-4 mr-2" /> Alerter RH
                                </Button>
                                <Button size="sm" variant="secondary" onClick={() => showToast(`Plan d'action créé pour ${driver.name}.`)}>
                                    <ClipboardCheck className="h-4 w-4 mr-2" /> Plan d'action
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default DailyTasks;