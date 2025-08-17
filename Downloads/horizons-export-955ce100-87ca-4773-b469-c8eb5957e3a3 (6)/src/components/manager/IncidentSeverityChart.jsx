import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', Mineure: 20, Majeure: 5 },
  { name: 'Fév', Mineure: 15, Majeure: 8 },
  { name: 'Mar', Mineure: 25, Majeure: 3 },
  { name: 'Avr', Mineure: 18, Majeure: 6 },
  { name: 'Mai', Mineure: 22, Majeure: 4 },
  { name: 'Juin', Mineure: 30, Majeure: 2 },
];

export function IncidentSeverityChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Évolution des Incidents par Gravité</CardTitle>
                <CardDescription>Nombre d'incidents mineurs vs. majeurs sur les 6 derniers mois.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                            <YAxis stroke="#888888" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))'
                                }}
                            />
                            <Bar dataKey="Mineure" fill="#3b82f6" name="Mineure" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Majeure" fill="#ef4444" name="Majeure" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}