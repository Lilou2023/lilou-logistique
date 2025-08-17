import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const PerformanceReport = () => {
  return (
    <Card className="bg-lilou-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lilou-text-primary">
          <TrendingUp />
          Rapport de Performance IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lilou-text-secondary">Votre rapport de performance généré par l'IA sera disponible ici à la fin de votre journée.</p>
      </CardContent>
    </Card>
  );
};

export default PerformanceReport;