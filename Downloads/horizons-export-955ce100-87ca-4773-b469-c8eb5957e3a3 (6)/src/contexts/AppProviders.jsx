import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { Toaster } from '@/components/ui/toaster';

/**
 * Composant wrapper qui organise correctement l'ordre des providers
 * L'ordre est critique : 
 * 1. Router (pour useNavigate)
 * 2. Toaster (pour useToast) - DOIT être avant AuthProvider car AuthProvider utilise useToast
 * 3. AuthProvider (qui utilise useNavigate et useToast)
 */
export function AppProviders({ children }) {
  return (
    <Router>
      {/* Le Toaster doit être rendu en premier pour que son contexte soit disponible */}
      <Toaster />
      {/* AuthProvider peut maintenant utiliser useToast car il est dans le contexte */}
      <AuthProvider>
        {children}
      </AuthProvider>
    </Router>
  );
}
