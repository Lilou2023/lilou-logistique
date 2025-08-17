import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon, isNegativeBetter = false }) => {
  const isPositiveChange = change >= 0;
  const TrendIcon = isPositiveChange ? ArrowUp : ArrowDown;
  
  let trendColor = 'text-muted-foreground';
  if (change !== 0 && change !== null && change !== undefined) {
    if (isNegativeBetter) {
      trendColor = isPositiveChange ? 'text-destructive' : 'text-success';
    } else {
      trendColor = isPositiveChange ? 'text-success' : 'text-destructive';
    }
  }

  return (
    <Card className="hover:border-primary/80 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {change !== null && change !== undefined && !isNaN(change) && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-xs ${trendColor} flex items-center`}>
            <TrendIcon className="h-4 w-4 mr-1" />
            {isPositiveChange ? '+' : ''}{change.toFixed(1)}% vs. période précédente
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;