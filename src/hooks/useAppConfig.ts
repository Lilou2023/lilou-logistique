import { useMemo } from 'react';

interface AppConfig {
  name: string;
  version: string;
  url: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

export const useAppConfig = (): AppConfig => {
  return useMemo(() => ({
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Lilou Logistique DSP',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://lilou-logistique.com',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  }), []);
};

// Fonction utilitaire pour logger les informations de l'app
export const logAppInfo = () => {
  const config = useAppConfig();
  console.log('🚀 Application Info:', {
    name: config.name,
    version: config.version,
    url: config.url,
    environment: config.isProduction ? 'production' : 'development',
  });
};

// Fonction pour obtenir le titre complet de l'app
export const getAppTitle = (pageTitle?: string): string => {
  const config = useAppConfig();
  return pageTitle ? `${pageTitle} - ${config.name}` : config.name;
}; 