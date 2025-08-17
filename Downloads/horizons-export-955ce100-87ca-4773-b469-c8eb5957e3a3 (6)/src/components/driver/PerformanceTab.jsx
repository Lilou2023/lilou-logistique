import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, AlertTriangle, Car, PackageCheck, PackageX, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { performanceData7jours, classementData, assiduiteData } from '@/data/mockData.jsx';
import AmazonKpiCard from '@/components/driver/AmazonKpiCard';

const getRankIcon = (rank) => {
  if (rank === 1) return <Trophy className="inline mr-2 h-4 w-4 text-yellow-400" />;
  if (rank === 2) return <Trophy className="inline mr-2 h-4 w-4 text-gray-400" />;
  if (rank === 3) return <Trophy className="inline mr-2 h-4 w-4 text-orange-400" />;
  return <Trophy className="inline mr-2 h-4 w-4 text-transparent" />;
};

export function PerformanceTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <AmazonKpiCard />
      </div>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>📈 Suivi de performance POD & DNR (7 jours)</CardTitle>
          <CardDescription>Analyse de votre taux de réussite de livraison.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData7jours}>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[95, 100]} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
              <Legend />
              <ReferenceLine y={98.8} label={{ value: 'Objectif 98.8%', position: 'insideTopLeft', fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="pod" name="% POD" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="dnr" name="% DNR" stroke="hsl(var(--destructive))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>🏆 Classement Chauffeurs (Semaine)</CardTitle>
          <CardDescription>Score = POD - (DNR x 2)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rang</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classementData.map(driver => (
                <TableRow key={driver.rank} className={driver.name === 'Vous' ? 'bg-primary/20' : ''}>
                  <TableCell className="font-bold">{getRankIcon(driver.rank)}{driver.rank}</TableCell>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell className="text-right font-mono">{driver.score.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📦 Détail Livraisons (Semaine)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3"><PackageCheck className="h-6 w-6 text-green-500" /><div><p className="font-bold text-xl">812</p><p className="text-xs text-muted-foreground">Colis livrés</p></div></div>
          <div className="flex items-center gap-3"><PackageX className="h-6 w-6 text-red-500" /><div><p className="font-bold text-xl">18</p><p className="text-xs text-muted-foreground">Colis retournés</p></div></div>
          <div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6 text-muted-foreground" /><div><p className="font-bold text-xl">12</p><p className="text-xs text-muted-foreground">DNR justifiés</p></div></div>
          <div className="flex items-center gap-3"><XCircle className="h-6 w-6 text-muted-foreground" /><div><p className="font-bold text-xl">6</p><p className="text-xs text-muted-foreground">DNR non justifiés</p></div></div>
          <div className="col-span-2 flex items-center gap-3"><Car className="h-6 w-6 text-muted-foreground" /><div><p className="font-bold text-xl">135</p><p className="text-xs text-muted-foreground">Moyenne colis/jour</p></div></div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>🕓 Historique Assiduité (4 dernières semaines)</CardTitle>
          {assiduiteData.some(d => d.retards > 3) && <CardDescription className="text-yellow-500 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Seuil de retards dépassé.</CardDescription>}
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assiduiteData}>
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip wrapperClassName="!bg-background !border-border" contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
              <Legend />
              <Bar dataKey="retards" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Retards" />
              <Bar dataKey="absences" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absences" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}