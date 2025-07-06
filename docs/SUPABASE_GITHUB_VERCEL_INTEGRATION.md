# 🚀 Intégration Supabase avec GitHub et Vercel

Ce guide explique comment connecter votre projet **Lilou Logistique** à GitHub et à Vercel depuis le tableau de bord Supabase.

## 🔗 Pourquoi connecter GitHub ?

- **Branches d'aperçu automatiques** pour chaque Pull Request
- **Synchronisation** de la branche de production avec `main`
- **Déploiement facilité** lorsque les fichiers Supabase changent

## ⚙️ Mise en place de l'intégration GitHub

1. Ouvrez votre projet dans le [Supabase Dashboard](https://app.supabase.com).
2. Dans le menu **Paramètres** → **Intégrations**, sélectionnez **Intégration GitHub**.
3. Choisissez le dépôt GitHub `Lilou2023/lilou-logistique`.
4. Spécifiez le chemin du dossier `supabase` si nécessaire (laisser vide si la configuration est à la racine).
5. Indiquez la branche de production, généralement `main`.
6. Activez l'option **Branchement automatique** pour créer des branches d'aperçu à chaque PR.
7. Cliquez sur **Activer l'intégration**.

## 💡 Astuces

- Définissez une limite raisonnable pour le nombre de branches d'aperçu (par exemple 50).
- Cochez **Modifications de Supabase uniquement** si vous souhaitez créer des branches d'aperçu uniquement lorsque les fichiers du dossier `supabase` sont modifiés.

## 🚀 Intégration Vercel

1. Dans Supabase → **Paramètres** → **Intégrations**, choisissez **Intégration Vercel**.
2. Connectez votre compte Vercel et sélectionnez le projet associé.
3. Supabase synchronisera automatiquement les variables d'environnement nécessaires pour chaque déploiement.
4. Vous pouvez lier plusieurs projets Vercel au même projet Supabase si besoin.

## ✅ Résultat

Une fois ces intégrations activées :
- Les Pull Requests sur GitHub déclenchent des branches d'aperçu dans Supabase.
- Les variables d'environnement sont à jour sur Vercel pour chaque déploiement.
- Votre branche `main` reste synchronisée avec la base de données de production.

**Votre pipeline CI/CD devient ainsi entièrement automatisé !**
