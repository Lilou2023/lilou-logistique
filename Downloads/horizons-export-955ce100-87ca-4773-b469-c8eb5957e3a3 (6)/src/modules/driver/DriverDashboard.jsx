import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Fuel, Route, ScanLine, LogOut } from 'lucide-react';
import DepartModule from '@/modules/driver/components/DepartModule';
import TourneeModule from '@/modules/driver/components/TourneeModule';
import RetourModule from '@/modules/driver/components/RetourModule';
import CarburantModule from '@/modules/driver/components/CarburantModule';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('depart');
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Vous avez été déconnecté.'});
    navigate('/login', { replace: true });
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">Tableau de Bord</h1>
          <p className="text-gray-400">Bonjour, {profile?.full_name || 'Chauffeur'}</p>
        </div>
        <Button onClick={handleSignOut} variant="ghost" className="text-red-500 hover:bg-red-900/50 hover:text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-800/80 p-1 rounded-lg border border-gray-700">
          <TabsTrigger value="depart" className="flex-1 data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-lg rounded-md transition-all duration-300 py-2">
            <ScanLine className="mr-2 h-5 w-5" /> Départ
          </TabsTrigger>
          <TabsTrigger value="tournee" className="flex-1 data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-lg rounded-md transition-all duration-300 py-2">
            <Route className="mr-2 h-5 w-5" /> Tournée
          </TabsTrigger>
          <TabsTrigger value="retour" className="flex-1 data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-lg rounded-md transition-all duration-300 py-2">
            <Car className="mr-2 h-5 w-5" /> Retour
          </TabsTrigger>
          <TabsTrigger value="carburant" className="flex-1 data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-lg rounded-md transition-all duration-300 py-2">
            <Fuel className="mr-2 h-5 w-5" /> Carburant
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TabsContent value="depart" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <DepartModule />
              </TabsContent>
              <TabsContent value="tournee" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <TourneeModule />
              </TabsContent>
              <TabsContent value="retour" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <RetourModule />
              </TabsContent>
              <TabsContent value="carburant" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <CarburantModule />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
};

export default DriverDashboard;