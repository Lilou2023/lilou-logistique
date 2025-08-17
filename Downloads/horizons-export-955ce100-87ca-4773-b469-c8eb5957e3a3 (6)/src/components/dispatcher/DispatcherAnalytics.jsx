import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

const deliveryData = [
    { name: 'Jean D.', taux_livraison: 98.2, },
    { name: 'Amina S.', taux_livraison: 99.1, },
    { name: 'Lucas M.', taux_livraison: 95.5, },
    { name: 'Sophie P.', taux_livraison: 97.8, },
];

const dnrData = [
  { day: 'Lun', dnr: 5 },
  { day: 'Mar', dnr: 8 },
  { day: 'Mer', dnr: 3 },
  { day: 'Jeu', dnr: 12 },
  { day: 'Ven', dnr: 7 },
  { day: 'Sam', dnr: 2 },
];

const DispatcherAnalytics = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Taux de Livraison par Chauffeur (Mois)</CardTitle>
                    <CardDescription>Performance individuelle des livreurs.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deliveryData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                            <YAxis domain={[90, 100]} stroke="#888888" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))'}}/>
                            <Bar dataKey="taux_livraison" fill="#1e40af" name="Taux de livraison (%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Anomalies DNR par Jour (Semaine)</CardTitle>
                    <CardDescription>Volume des colis non remis aux destinataires.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={dnrData}>
                            <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                            <YAxis stroke="#888888" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))'}}/>
                            <Line type="monotone" dataKey="dnr" stroke="#c2410c" strokeWidth={2} name="Nombre de DNR" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default DispatcherAnalytics;