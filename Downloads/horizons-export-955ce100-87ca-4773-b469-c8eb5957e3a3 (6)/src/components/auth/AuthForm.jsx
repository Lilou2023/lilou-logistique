import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Loader2, Mail } from 'lucide-react';
import { useToast } from '../ui/use-toast';

const AuthForm = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading } = useAuth();
  const { toast } = useToast();
  
  // Note: La fonctionnalité d'inscription publique a été retirée.
  // L'inscription se fait désormais via le dashboard RH.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      await signIn(email, password);
    } else if (authMode === 'reset') {
      // La fonctionnalité de réinitialisation de mot de passe n'est pas encore implémentée dans ce composant.
       toast({
          title: "Fonctionnalité à venir",
          description: "La réinitialisation de mot de passe sera bientôt disponible.",
      });
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  const formContent = {
    login: {
      title: 'Connexion',
      description: 'Accédez à votre tableau de bord.',
      buttonIcon: <LogIn className="mr-2 h-4 w-4" />,
      buttonText: 'Se connecter',
    },
    reset: {
      title: 'Mot de passe oublié',
      description: 'Recevez un lien de réinitialisation.',
      buttonIcon: <Mail className="mr-2 h-4 w-4" />,
      buttonText: 'Envoyer le lien',
    }
  };

  const currentForm = formContent[authMode];

  return (
    <Card className="w-full max-w-sm bg-lilou-surface/60 backdrop-blur-xl border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={authMode} 
          variants={cardVariants} 
          initial="initial" 
          animate="animate" 
          exit="exit" 
          transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
        >
          <form onSubmit={handleSubmit}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-text-primary">{currentForm.title}</CardTitle>
              <CardDescription className="text-text-secondary">{currentForm.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-6">
              <div className="space-y-1">
                <Label htmlFor={`${authMode}-email`}>Adresse e-mail</Label>
                <Input id={`${authMode}-email`} type="email" placeholder="email@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} className="bg-lilou-background/50" />
              </div>
              {authMode !== 'reset' && (
                <div className="space-y-1">
                  <Label htmlFor={`${authMode}-password`}>Mot de passe</Label>
                  <Input id={`${authMode}-password`} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} className="bg-lilou-background/50"/>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-6 pb-6">
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : currentForm.buttonIcon}
                {currentForm.buttonText}
              </Button>
              
              <div className="w-full flex justify-center items-center text-sm">
                  <Button type="button" variant="link" onClick={() => setAuthMode(authMode === 'login' ? 'reset' : 'login')} className="p-0 h-auto text-text-secondary" disabled={loading}>
                    {authMode === 'login' ? 'Mot de passe oublié ?' : 'Retour à la connexion'}
                  </Button>
                </div>
            </CardFooter>
          </form>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default AuthForm;