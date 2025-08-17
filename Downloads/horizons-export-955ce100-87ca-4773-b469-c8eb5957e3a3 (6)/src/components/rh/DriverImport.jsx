import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';

const DriverImport = ({ onImportComplete }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
  });

  const handleImport = async () => {
    if (files.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Aucun fichier sélectionné',
        description: 'Veuillez sélectionner un fichier CSV à importer.',
      });
      return;
    }

    setLoading(true);

    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const usersToCreate = results.data.map(row => ({
          email: row.email,
          prenom: row.prenom,
          nom: row.nom,
          telephone: row.telephone
        }));

        try {
          const { data, error } = await supabase.functions.invoke('create-bulk-users', {
            body: { users: usersToCreate },
          });

          if (error) throw error;
          
          toast({
            title: 'Importation terminée !',
            description: `${data.success.length} chauffeurs créés. ${data.errors.length} erreurs.`,
          });

          if (data.errors.length > 0) {
             console.error('Erreurs lors de l\'importation:', data.errors);
          }

          setFiles([]);
          if(onImportComplete) onImportComplete();

        } catch (error) {
          toast({
            variant: 'destructive',
            title: "Erreur lors de l'importation",
            description: error.message,
          });
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        toast({
          variant: 'destructive',
          title: 'Erreur de lecture du fichier CSV',
          description: error.message,
        });
        setLoading(false);
      }
    });
  };

  const removeFile = () => {
    setFiles([]);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <UploadCloud className="h-10 w-10" />
          {isDragActive ? (
            <p>Déposez le fichier ici...</p>
          ) : (
            <p>Glissez-déposez votre fichier .csv ou cliquez pour sélectionner</p>
          )}
          <em className="text-xs">(Colonnes attendues: nom, prenom, email, telephone)</em>
        </div>
      </div>
      {files.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <File className="h-5 w-5" />
            <span>{files[0].name}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={removeFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Button onClick={handleImport} disabled={loading || files.length === 0} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Importation en cours...
          </>
        ) : (
          'Lancer l\'importation'
        )}
      </Button>
    </div>
  );
};

export default DriverImport;