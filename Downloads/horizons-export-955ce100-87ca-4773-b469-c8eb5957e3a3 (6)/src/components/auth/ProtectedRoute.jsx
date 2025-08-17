import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (profile && !profile.is_approved && profile.role !== 'admin' && profile.role !== 'hr') {
    // Si l'utilisateur n'est pas approuvé, et n'est pas un admin/rh qui peut s'auto-approuver
    return <Navigate to="/unauthorized" state={{ message: 'Votre compte est en attente de validation par un administrateur.' }} replace />;
  }

  if (roles && profile && !roles.includes(profile.role)) {
    return <Navigate to="/unauthorized" state={{ message: 'Vous n\'avez pas les permissions pour accéder à cette page.' }} replace />;
  }

  return children;
};

export default ProtectedRoute;