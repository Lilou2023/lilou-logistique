# 🔐 Fonctionnalité d'Authentification Supabase

## Vue d'ensemble

Cette fonctionnalité implémente un système d'authentification complet basé sur Supabase pour l'application Lilou Logistique.

## 🚀 Fonctionnalités

### Authentification
- ✅ Connexion avec email/mot de passe
- ✅ Inscription d'utilisateurs
- ✅ Déconnexion sécurisée
- ✅ Gestion automatique des sessions
- ✅ Persistance de la session
- ✅ Protection des routes

### Gestion des utilisateurs
- ✅ Rôles utilisateur (admin, conductor, manager)
- ✅ Métadonnées utilisateur personnalisées
- ✅ Gestion des profils

## 📁 Structure des fichiers

```
├── useAuth.tsx                 # Hook et provider d'authentification
├── src/lib/supabase.ts        # Configuration Supabase et types
├── .env.example               # Template de configuration
└── docs/AUTHENTIFICATION.md   # Cette documentation
```

## 🛠️ Installation

### 1. Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Copiez le fichier `.env.example` vers `.env`
3. Remplacez les valeurs dans `.env` avec vos clés Supabase

```bash
cp .env.example .env
# Éditez .env avec vos clés Supabase
```

### 2. Installation des dépendances

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-react
```

### 3. Configuration de la base de données

Exécutez les scripts SQL suivants dans votre projet Supabase :

```sql
-- Table des profils utilisateur étendus
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT CHECK (role IN ('admin', 'conductor', 'manager')) DEFAULT 'conductor',
  phone TEXT,
  license_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs de voir leur propre profil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de mettre à jour leur propre profil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Fonction pour créer automatiquement un profil après inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'conductor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour exécuter la fonction après insertion d'un nouvel utilisateur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 💻 Utilisation

### Wrapping de l'application

```tsx
import { AuthProvider } from './useAuth';

function App() {
  return (
    <AuthProvider>
      {/* Votre application */}
    </AuthProvider>
  );
}
```

### Hook d'authentification

```tsx
import { useAuth } from './useAuth';

function LoginComponent() {
  const { signIn, loading, user } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  if (user) {
    return <div>Bienvenue, {user.name}!</div>;
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      handleLogin(
        formData.get('email') as string,
        formData.get('password') as string
      );
    }}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Mot de passe" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
}
```

### Protection des routes

```tsx
import { ProtectedRoute } from './useAuth';

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Contenu protégé du tableau de bord</div>
    </ProtectedRoute>
  );
}
```

## 🔧 API

### AuthProvider

Provider qui encapsule l'application et fournit le contexte d'authentification.

### useAuth()

Hook qui retourne l'objet suivant :

```tsx
interface AuthContextType {
  user: User | null;           // Utilisateur connecté
  loading: boolean;            // État de chargement
  session: Session | null;     // Session Supabase
  signIn: (email, password) => Promise<void>;    // Connexion
  signOut: () => Promise<void>;                  // Déconnexion
  signUp: (email, password, name) => Promise<void>; // Inscription
}
```

### ProtectedRoute

Composant qui protège les routes et redirige les utilisateurs non connectés.

## 🔒 Sécurité

- ✅ Tokens JWT automatiquement gérés
- ✅ Refresh automatique des tokens
- ✅ Row Level Security (RLS) activé
- ✅ Validation côté serveur avec Supabase
- ✅ Hashage sécurisé des mots de passe

## 🚀 Prochaines étapes

1. **Réinitialisation de mot de passe**
   - Implémentation de l'email de récupération
   - Interface de réinitialisation

2. **Authentification sociale**
   - Google, GitHub, etc.
   - Configuration OAuth

3. **Gestion avancée des rôles**
   - Permissions granulaires
   - Middleware de vérification

4. **Audit de sécurité**
   - Journalisation des connexions
   - Détection d'activités suspectes

## 📞 Support

Pour toute question concernant l'authentification :
1. Consultez la [documentation Supabase](https://supabase.com/docs/guides/auth)
2. Vérifiez votre configuration dans `.env`
3. Consultez les logs de la console pour les erreurs

## 🐛 Résolution de problèmes

### Erreur : "Variables d'environnement Supabase manquantes"
- Vérifiez que `.env` existe et contient les bonnes clés
- Redémarrez le serveur de développement après modification

### Erreur de connexion
- Vérifiez que l'utilisateur existe dans Supabase
- Confirmez que RLS est correctement configuré
- Vérifiez les politiques de sécurité

### Session non persistante
- Vérifiez la configuration `persistSession: true`
- Contrôlez les paramètres de cookies