import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';

const insights = [
    { text: "Optimisation de 7% des routes du secteur Est possible en réallouant le véhicule VEH005.", icon: <TrendingUp className="h-5 w-5 text-green-400" /> },
    { text: "Le chauffeur Jean Dupont montre des signes de fatigue. Recommander 2 jours de repos préventifs.", icon: <ShieldCheck className="h-5 w-5 text-blue-400" /> },
    { text: "Prévision de panne sur le système de freinage du véhicule CC-456-DD dans les 15 prochains jours.", icon: <TrendingUp className="h-5 w-5 text-yellow-400" /> },
];

export function IAInsights() {
    return (
        <Card className="h-full">
            <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Recommandations de l'IA Amir
                </CardTitle>
                <CardDescription>Analyses prédictives et suggestions d'optimisation.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div className="pt-1">{insight.icon}</div>
                            <p className="text-sm">{insight.text}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}