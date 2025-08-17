import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { statusConfig } from '@/data/mockData.jsx';
import { generatePlanningData } from '@/utils/driverUtils.js';
import LeaveRequestForm from './LeaveRequestForm';
import { CalendarPlus } from 'lucide-react';

const threeMonthSchedule = generatePlanningData(13);

const ScheduleStatusBadge = ({ code }) => {
    const config = statusConfig[code] || { label: 'N/A', color: 'bg-gray-400', icon: null };
    return (
        <Badge className={`${config.color} hover:${config.color} flex items-center gap-1.5`}>
            {config.icon}
            <span>{config.label}</span>
        </Badge>
    );
};

export function PlanningTab() {
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
            <CardTitle>Planning sur 3 mois</CardTitle>
            <CardDescription>Votre programme détaillé pour les prochaines semaines.</CardDescription>
        </div>
        <Dialog open={isLeaveModalOpen} onOpenChange={setIsLeaveModalOpen}>
            <DialogTrigger asChild>
                 <Button>
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Demander un congé
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nouvelle demande de congé</DialogTitle>
                </DialogHeader>
                <LeaveRequestForm onFinished={() => setIsLeaveModalOpen(false)} />
            </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {threeMonthSchedule.map((item, index) => (
            <div key={index} className={`rounded-lg p-3 flex flex-col justify-between h-36 ${item.code === 'P' ? 'bg-primary/20 border-2 border-primary' : 'bg-muted'}`}>
              <div>
                <p className="font-bold text-sm">{item.day}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono truncate">{item.tour}</p>
                <ScheduleStatusBadge code={item.code} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="font-bold">Légende:</span>
          {Object.entries(statusConfig).filter(([key]) => ['T', 'F', 'R'].includes(key)).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-full ${value.color.split(' ')[0]}`}></span>
              <span>{value.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}