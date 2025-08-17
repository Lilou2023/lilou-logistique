import { supabase } from '@/lib/customSupabaseClient';

/**
 * Ceci est un script de test et de référence pour créer des utilisateurs avec des rôles spécifiques.
 * C'est la méthode OFFICIELLE et RECOMMANDÉE pour créer des utilisateurs, car elle respecte
 * tous les mécanismes internes de Supabase (triggers, RLS, etc.).
 *
 * N'exécutez pas ce fichier directement dans l'application. Utilisez-le comme un guide pour
 * vos propres scripts de seeding ou pour des créations manuelles via la console de votre navigateur.
 *
 * Pour utiliser :
 * 1. Ouvrez la console de votre navigateur sur votre application en cours d'exécution.
 * 2. Assurez-vous d'avoir importé le client `supabase`.
 * 3. Appelez la fonction `createTestUser` avec les informations souhaitées.
 *
 * Exemple dans la console :
 * createTestUser('test.driver@lilou-go.com', 'password123', 'Test Driver', 'Driver');
 */

async function createTestUser(email, password, fullName, role) {
  console.log(`Tentative de création de l'utilisateur : ${email} avec le rôle : ${role}`);

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  });

  if (error) {
    console.error(`Erreur lors de la création de l'utilisateur ${email}:`, error.message);
    return { success: false, error };
  }

  console.log(`Utilisateur ${email} créé avec succès !`, data);
  // Le trigger `handle_new_user` dans Supabase s'occupera automatiquement de créer
  // l'entrée correspondante dans la table `public.user_profiles`.
  return { success: true, data };
}

// --- Exemples d'utilisation ---

// Pour créer un administrateur
// createTestUser('new.admin@lilou-go.com', 'securePassword123', 'Nouveau Admin', 'Admin');

// Pour créer un chauffeur
// createTestUser('new.driver@lilou-go.com', 'securePassword123', 'Nouveau Chauffeur', 'Driver');

// Pour créer un dispatcher
// createTestUser('new.dispatcher@lilou-go.com', 'securePassword123', 'Nouveau Dispatcher', 'Dispatcher');

// Exposez la fonction à la fenêtre pour un accès facile depuis la console
if (typeof window !== 'undefined') {
  window.createTestUser = createTestUser;
}

export { createTestUser };