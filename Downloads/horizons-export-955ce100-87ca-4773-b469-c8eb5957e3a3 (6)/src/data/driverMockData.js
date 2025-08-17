import React from 'react';
import { Car, BookOpen, Coffee, CheckCircle2, Clock } from 'lucide-react';

export const performanceData7jours = [
  { day: 'Lun', pod: 99.2, dnr: 0.8 },
  { day: 'Mar', pod: 98.5, dnr: 1.5 },
  { day: 'Mer', pod: 99.5, dnr: 0.5 },
  { day: 'Jeu', pod: 97.9, dnr: 2.1 },
  { day: 'Ven', pod: 98.9, dnr: 1.1 },
  { day: 'Sam', pod: 99.8, dnr: 0.2 },
  { day: 'Dim', pod: 100, dnr: 0 },
];

export const classementData = [
  { rank: 1, name: 'Jean Dupont', score: 97.5 },
  { rank: 2, name: 'Amina Sadi', score: 96.8 },
  { rank: 3, name: 'Vous', score: 95.4 },
  { rank: 4, name: 'Lucas Martin', score: 95.1 },
  { rank: 5, name: 'Sophie Petit', score: 94.2 },
];

export const assiduiteData = [
    { week: 'S-4', retards: 1, absences: 0 },
    { week: 'S-3', retards: 0, absences: 0 },
    { week: 'S-2', retards: 2, absences: 1 },
    { week: 'S-1', retards: 1, absences: 0 },
];

export const statusConfig = {
    'T': { label: 'Tournée', color: 'bg-blue-500', icon: <Car className="h-3 w-3" /> },
    'F': { label: 'Formation', color: 'bg-purple-500', icon: <BookOpen className="h-3 w-3" /> },
    'R': { label: 'Repos', color: 'bg-gray-500', icon: <Coffee className="h-3 w-3" /> },
    'Terminé': { label: 'Terminé', color: 'bg-green-500', icon: <CheckCircle2 className="h-3 w-3" /> },
    'Prévu': { label: 'Prévu', color: 'bg-yellow-500', icon: <Clock className="h-3 w-3" /> },
};

// Simulate today's tour number
export const todaysTourNumber = `#T-${Math.floor(10000 + Math.random() * 90000)}`;