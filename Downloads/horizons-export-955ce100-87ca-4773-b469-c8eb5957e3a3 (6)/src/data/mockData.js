import React from 'react';
import { Truck, FerrisWheel, X, Check, Bed } from 'lucide-react';

export const todaysTourNumber = "R-75015-A";

export const performanceData7jours = [
  { day: 'Lun', pod: 98.2, dnr: 1.8 },
  { day: 'Mar', pod: 99.1, dnr: 0.9 },
  { day: 'Mer', pod: 97.5, dnr: 2.5 },
  { day: 'Jeu', pod: 99.5, dnr: 0.5 },
  { day: 'Ven', pod: 98.9, dnr: 1.1 },
  { day: 'Sam', pod: 100.0, dnr: 0.0 },
  { day: 'Dim', pod: 98.7, dnr: 1.3 },
];

export const classementData = [
  { rank: 1, name: 'Jean D.', score: 98.5 },
  { rank: 2, name: 'Vous', score: 97.2 },
  { rank: 3, name: 'Sophie L.', score: 96.8 },
  { rank: 4, name: 'Marc V.', score: 95.1 },
  { rank: 5, name: 'Amina K.', score: 94.9 },
];

export const assiduiteData = [
    { week: 'S-4', retards: 1, absences: 0 },
    { week: 'S-3', retards: 0, absences: 0 },
    { week: 'S-2', retards: 2, absences: 1 },
    { week: 'S-1', retards: 1, absences: 0 },
];

export const statusConfig = {
  T: { label: 'Travail', color: 'bg-primary text-primary-foreground', icon: <Truck className="h-4 w-4" /> },
  F: { label: 'Formation', color: 'bg-blue-500 text-white', icon: <FerrisWheel className="h-4 w-4" /> },
  R: { label: 'Repos', color: 'bg-green-500 text-white', icon: <Bed className="h-4 w-4" /> },
  A: { label: 'Absence', color: 'bg-red-500 text-white', icon: <X className="h-4 w-4" /> },
  P: { label: 'Aujourd\'hui', color: 'bg-yellow-400 text-black', icon: <Check className="h-4 w-4" /> },
};