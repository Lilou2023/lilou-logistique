import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Briefcase, Send, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const recruitmentSchema = z.object({
  full_name: z.string().min(3, 'Le nom complet est requis'),
  email: z.string().email("L'adresse email est invalide"),
  phone: z.string().optional(),
  message: z.string().optional(),
  cv: z.instanceof(File).optional(),
});

const RecrutementPage = ({ isEmbedded = false, onNewCandidate }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(recruitmentSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    let cvPath = null;
    try {
      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        cvPath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('cvs')
          .upload(cvPath, cvFile);

        if (uploadError) throw uploadError;
      }

      const { error: insertError } = await supabase.from('rh_candidates').insert([
        {
          full_name: values.full_name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          cv_path: cvPath,
          status: 'Nouvelle',
        },
      ]);
      
      if (insertError) throw insertError;

      toast({
        title: 'Candidature envoyée !',
        description: 'Nous avons bien reçu votre candidature et nous vous recontacterons bientôt.',
      });
      reset();
      setCvFile(null);
      if(onNewCandidate) onNewCandidate();

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oh non ! Une erreur est survenue.',
        description: error.message || "Impossible d'envoyer votre candidature. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const PageWrapper = isEmbedded ? 'div' : motion.div;
  const wrapperProps = isEmbedded ? {} : {
    initial:{ opacity: 0 },
    animate:{ opacity: 1 },
    exit:{ opacity: 0 }
  };

  return (
    <>
      {!isEmbedded && (
        <Helmet>
          <title>Recrutement - Rejoignez Lilou-GO</title>
          <meta name="description" content="Postulez pour devenir chauffeur chez Lilou-GO et rejoignez une équipe dynamique." />
        </Helmet>
      )}
      <PageWrapper {...wrapperProps} className={`flex items-center justify-center ${!isEmbedded && 'min-h-screen bg-gray-100 dark:bg-gray-900 p-4'}`}>
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <Briefcase className="mx-auto h-12 w-12 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4">Rejoignez notre équipe</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Nous sommes toujours à la recherche de talents pour grandir.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Input placeholder="Nom complet" {...register('full_name')} className="bg-gray-50 dark:bg-gray-700"/>
                  {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name.message}</p>}
                </div>
                <div className="space-y-1">
                  <Input placeholder="Email" {...register('email')} className="bg-gray-50 dark:bg-gray-700"/>
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <Input placeholder="Téléphone (optionnel)" {...register('phone')} className="bg-gray-50 dark:bg-gray-700"/>
              </div>
              <div className="space-y-1">
                <Textarea placeholder="Votre message (optionnel)" {...register('message')} className="bg-gray-50 dark:bg-gray-700"/>
              </div>
              
              <div className="space-y-2">
                 <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Votre CV (PDF, DOCX)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label
                        htmlFor="cv-upload-input"
                        className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                        >
                        <span>Uploadez un fichier</span>
                        <input id="cv-upload-input" name="cv-upload" type="file" className="sr-only" onChange={(e) => setCvFile(e.target.files[0])} accept=".pdf,.doc,.docx" />
                        </label>
                        <p className="pl-1">ou glissez-déposez</p>
                    </div>
                    {cvFile ? 
                        <p className="text-sm text-gray-500">{cvFile.name}</p> :
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX jusqu'à 5MB</p>
                    }
                    </div>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full text-lg py-3">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Send className="mr-2 h-5 w-5" /> Envoyer ma candidature</>}
              </Button>
            </form>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default RecrutementPage;