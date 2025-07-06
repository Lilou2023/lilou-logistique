import { useMemo } from 'react';

interface AppConfig {
  name: string;
  version: string;
  url: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  isProduction: boolean;
  isDevelopment: boolean;
  isCI: boolean;
}

// Configuration statique pour les fonctions utilitaires
const getStaticConfig = () => ({
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Lilou Logistique DSP',
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://lilou-logistique.com',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isCI: !!(process.env.CI || process.env.GITHUB_ACTIONS),
});

export const useAppConfig = (): AppConfig => {
  return useMemo(() => getStaticConfig(), []);
};

// Fonction utilitaire pour logger les informations de l'app
export const logAppInfo = () => {
  const config = getStaticConfig();
  console.log('🚀 Application Info:', {
    name: config.name,
    version: config.version,
    url: config.url,
    environment: config.isProduction ? 'production' : 'development',
    ci: config.isCI,
  });
};

// Fonction pour obtenir le titre complet de l'app
export const getAppTitle = (pageTitle?: string): string => {
  const config = getStaticConfig();
  return pageTitle ? `${pageTitle} - ${config.name}` : config.name;
};

// Fonction pour obtenir les métadonnées de l'app
export const getAppMetadata = () => {
  const config = getStaticConfig();
  return {
    title: config.name,
    description: 'Système de gestion logistique intelligent et connecté',
    url: config.url,
    version: config.version,
  };
}; 
