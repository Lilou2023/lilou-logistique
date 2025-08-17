import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DriverManagementTable from '@/components/rh/DriverManagementTable';
import RecruitmentDashboard from '@/components/rh/RecruitmentDashboard';
import DriverImport from '@/components/rh/DriverImport';
import { UserPlus, Upload } from 'lucide-react';

const RHDashboardPage = () => {
  const [isImportModalOpen, setImportModalOpen] = useState(false);

  const handleImportComplete = () => {
    setImportModalOpen(false);
    // Potentially trigger a refresh of the driver list here
  };

  return (
    <>
      <Helmet>
        <title>Tableau de Bord RH - Lilou-GO</title>
        <meta name="description" content="Gérez les chauffeurs, le recrutement et les documents RH." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord RH</h1>
              <p className="text-muted-foreground mt-1">Gestion centralisée des ressources humaines chauffeurs.</p>
            </div>
            <div className="flex gap-2">
               <Dialog open={isImportModalOpen} onOpenChange={setImportModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" /> Importer des Chauffeurs
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Importer des chauffeurs via CSV</DialogTitle>
                  </DialogHeader>
                  <DriverImport onImportComplete={handleImportComplete} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="drivers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
              <TabsTrigger value="drivers">Gestion des Chauffeurs</TabsTrigger>
              <TabsTrigger value="recruitment">Recrutement</TabsTrigger>
            </TabsList>
            <TabsContent value="drivers" className="mt-4">
              <DriverManagementTable />
            </TabsContent>
            <TabsContent value="recruitment" className="mt-4">
              <RecruitmentDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default RHDashboardPage;