import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const UnauthorizedPage = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const message = location.state?.message || 'Vous n\'êtes pas autorisé à accéder à cette page.';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4 text-center">
        <CardHeader>
          <div className="mx-auto bg-red-100 dark:bg-red-900/30 rounded-full p-4 w-fit">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Accès refusé</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{message}</p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
            <Button variant="ghost" onClick={signOut}>
              Se déconnecter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;