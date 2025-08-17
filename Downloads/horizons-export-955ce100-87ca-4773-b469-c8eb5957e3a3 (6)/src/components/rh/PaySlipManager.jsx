import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PaySlipManager = () => {
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: '🚧 Fonctionnalité en développement',
      description: "L'upload de fiches de paie sera bientôt disponible.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Fiches de Paie</CardTitle>
        <CardDescription>Importez et consultez les fiches de paie des chauffeurs.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="p-8 border-2 border-dashed rounded-lg">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            Glissez-déposez les fiches de paie ici, ou cliquez pour sélectionner des fichiers.
          </p>
          <Button className="mt-4" onClick={handleUpload}>
            <UploadCloud className="mr-2 h-4 w-4" /> Importer
          </Button>
        </div>
        <div className="mt-6">
            <h4 className="font-semibold mb-2">Derniers imports</h4>
            <div className="text-sm text-muted-foreground">
                <p>Aucun document importé pour le moment.</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaySlipManager;