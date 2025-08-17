import React from 'react';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { MapPin, Info, AlertTriangle } from 'lucide-react';
    import AmazonKpiCard from './AmazonKpiCard';
    import PerformanceLoginSummary from './PerformanceLoginSummary';
    
    const BriefingTab = ({ driverInfo }) => {
      // Mock data for briefing, can be replaced with real data from props/API
      const briefing = {
        tourId: driverInfo?.tour_id || "N/A",
        sector: "Paris 15ème - Sud",
        importantInfo: "Manifestation prévue Place de la Concorde à 14h. Éviter le secteur.",
        alerts: [
            { type: 'info', message: 'Nouveau protocole de signature pour les colis recommandés.'},
            { type: 'warning', message: 'Travaux sur le Boulevard Garibaldi, prévoir un itinéraire alternatif.'}
        ]
      };
    
      return (
        <div className="space-y-6">
            <PerformanceLoginSummary />
            <AmazonKpiCard />

            <Card>
                <CardHeader>
                    <CardTitle>Briefing de la Journée</CardTitle>
                    <CardDescription>Informations importantes pour votre tournée du jour.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">N° de Tournée / Secteur</p>
                            <p className="font-bold text-lg">{briefing.tourId} / {briefing.sector}</p>
                        </div>
                    </div>
                    {briefing.alerts.map((alert, index) => (
                         <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${alert.type === 'warning' ? 'bg-yellow-500/10 text-yellow-300' : 'bg-blue-500/10 text-blue-300'}`}>
                            {alert.type === 'warning' ? <AlertTriangle className="h-5 w-5 mt-0.5" /> : <Info className="h-5 w-5 mt-0.5" />}
                            <p className="flex-1">{alert.message}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      );
    };
    
    export default BriefingTab;