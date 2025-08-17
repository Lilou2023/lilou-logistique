import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import LiveTrackingMap from '@/components/dispatcher/LiveTrackingMap';
import AnomaliesTable from '@/components/dispatcher/AnomaliesTable';
import DailyTasks from '@/components/dispatcher/DailyTasks';
import TodosManager from '@/components/dispatcher/TodosManager';
import AmirAiPanel from '@/components/dispatcher/AmirAiPanel';
import DispatcherAnalytics from '@/components/dispatcher/DispatcherAnalytics';
import RouteProgressMonitor from '@/components/dispatcher/RouteProgressMonitor';
import DispatcherAmazonKpis from '@/components/dispatcher/DispatcherAmazonKpis';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const DispatcherDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Dispatcher - Lilou GO</title>
        <meta name="description" content="Gestion et suivi en temps réel des tournées et des chauffeurs." />
      </Helmet>
      <motion.div
        className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Dispatcher</h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DispatcherAmazonKpis />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DispatcherAnalytics />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <RouteProgressMonitor />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <motion.div variants={itemVariants} className="lg:col-span-4">
             <LiveTrackingMap />
          </motion.div>

          <div className="lg:col-span-3 space-y-4">
            <motion.div variants={itemVariants}>
              <AmirAiPanel />
            </motion.div>
          </div>
        </div>
        
        <motion.div variants={itemVariants}>
            <DailyTasks />
        </motion.div>

        <motion.div variants={itemVariants}>
          <AnomaliesTable />
        </motion.div>

      </motion.div>
    </>
  );
};

export default DispatcherDashboardPage;