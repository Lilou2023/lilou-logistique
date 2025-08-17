import React from 'react';
import { Briefcase, Check, X, Coffee, Car, Clock } from 'lucide-react';

export const todaysTourNumber = 'LIL-2408-A42';

export const statusConfig = {
  T: { label: 'Terminé', color: 'bg-green-500/20 text-green-300 border border-green-500/30', icon: <Check size={12} /> },
  F: { label: 'Formation', color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30', icon: <Briefcase size={12} /> },
  R: { label: 'Repos', color: 'bg-gray-500/20 text-gray-300 border border-gray-500/30', icon: <Coffee size={12} /> },
  P: { label: 'Prévu', color: 'bg-primary/20 text-primary-foreground border border-primary/30', icon: <Clock size={12} /> },
};

export const performanceData7jours = [
  { day: 'Lun', pod: 99.2, dnr: 0.8 },
  { day: 'Mar', pod: 98.5, dnr: 1.5 },
  { day: 'Mer', pod: 99.5, dnr: 0.5 },
  { day: 'Jeu', pod: 97.9, dnr: 2.1 },
  { day: 'Ven', pod: 98.8, dnr: 1.2 },
  { day: 'Sam', pod: 99.8, dnr: 0.2 },
  { day: 'Dim', pod: 100, dnr: 0 },
];

export const classementData = [
  { rank: 1, name: 'Amina S.', score: 98.7 },
  { rank: 2, name: 'Vous', score: 96.5 },
  { rank: 3, name: 'Lucas M.', score: 95.1 },
  { rank: 4, name: 'Jean D.', score: 94.8 },
  { rank: 5, name: 'Sophie P.', score: 93.2 },
];

export const assiduiteData = [
    { week: "S-4", retards: 1, absences: 0 },
    { week: "S-3", retards: 0, absences: 0 },
    { week: "S-2", retards: 4, absences: 1 },
    { week: "S-1", retards: 2, absences: 0 },
];