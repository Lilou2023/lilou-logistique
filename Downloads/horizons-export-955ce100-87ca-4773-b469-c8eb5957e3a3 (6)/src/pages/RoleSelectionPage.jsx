import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const RoleSelectionPage = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile || !profile.role) {
    return <Navigate to="/login" />;
  }

  // Redirection basée sur le rôle
  switch (profile.role) {
    case 'admin':
      return <Navigate to="/rh" />;
    case 'manager':
      return <Navigate to="/manager" />;
    case 'General Manager':
        return <Navigate to="/gm" />;
    case 'driver':
      return <Navigate to="/driver" />;
    case 'hr':
      return <Navigate to="/rh" />;
    case 'fleet_manager':
    case 'chef_parc':
      return <Navigate to="/parc" />;
    case 'dispatcher':
      return <Navigate to="/dispatcher" />;
    default:
      return <Navigate to="/unauthorized" />;
  }
};

export default RoleSelectionPage;