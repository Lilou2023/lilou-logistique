import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

const getDashboardPathByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/rh';
    case 'manager':
      return '/manager';
    case 'General Manager':
      return '/gm';
    case 'driver':
      return '/driver';
    case 'hr':
      return '/rh';
    case 'fleet_manager':
      return '/parc';
    case 'chef_parc':
      return '/parc';
    case 'dispatcher':
      return '/dispatcher';
    default:
      return '/select-role';
  }
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchProfile = useCallback(async (user) => {
    if (!user) return null;
    try {
      const { data: userProfile, error, status } = await supabase
        .from('user_profiles')
        .select(`*`)
        .eq('id', user.id)
        .single();
      
      if (error && status !== 406) {
        throw error;
      }
      
      if (!userProfile) {
          await new Promise(res => setTimeout(res, 1500));
          const { data: retryProfile, error: retryError } = await supabase.from('user_profiles').select('*').eq('id', user.id).single();
          
          if(retryError || !retryProfile) {
              console.error("Profile not found even after retry:", retryError?.message || 'No profile data');
              return null;
          }
           setProfile(retryProfile);
           return retryProfile;
      }

      setProfile(userProfile);
      return userProfile;

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de profil",
        description: `Impossible de charger les informations de l'utilisateur. ${error.message}`,
      });
      setProfile(null);
      await supabase.auth.signOut();
      return null;
    }
  }, [toast]);
  
  const refreshProfile = useCallback(async () => {
    if (session?.user) {
        await fetchProfile(session.user);
    }
  }, [session, fetchProfile]);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      setLoading(true);
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      if (currentSession) {
        await fetchProfile(currentSession.user);
      }
      setLoading(false);
    };

    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (event === 'SIGNED_OUT') {
          setProfile(null);
          navigate('/login', { replace: true });
        } else if (newSession) {
          setLoading(true);
          const userProfile = await fetchProfile(newSession.user);
          if (userProfile && event === 'SIGNED_IN') {
             const path = getDashboardPathByRole(userProfile.role);
             navigate(path, { replace: true });
          }
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchProfile, navigate]);

  const signIn = async (email, password) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: "Vérifiez vos identifiants et réessayez.",
      });
    } else {
        toast({
            title: 'Connexion réussie',
            description: "Bienvenue sur Lilou-GO 🚀"
        });
    }
    setLoading(false);
  };

  const signUp = async (email, password, metadata) => {
    setLoading(true);
    
    // Gérer les noms correctement
    let firstName = metadata?.first_name || '';
    let lastName = metadata?.last_name || '';
    
    // Si full_name est fourni mais pas first_name/last_name, diviser le nom
    if (metadata?.full_name && (!firstName || !lastName)) {
      const nameParts = metadata.full_name.trim().split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    const { data, error } = await supabase.auth.signUp(
      { 
        email, 
        password,
        options: { 
          data: {
            ...metadata,
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`.trim()
          }
        }
      }
    );
    
    if(error){
      toast({
        variant: "destructive",
        title: "Erreur lors de la création",
        description: error.message
      })
    }
    
    setLoading(false);
    return { data, error };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
    navigate('/login', { replace: true });
    setLoading(false);
  };
  
  const value = {
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};