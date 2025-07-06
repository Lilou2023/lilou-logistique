# 🔐 Configuration des secrets GitHub

Ce projet utilise plusieurs secrets pour les workflows GitHub Actions.
Suivez les étapes ci-dessous pour les ajouter dans votre repository.

## 1️⃣ Accéder aux secrets

1. Ouvrez votre dépôt sur GitHub.
2. Cliquez sur **Settings** > **Secrets and variables** > **Actions**.
3. Cliquez sur **New repository secret** pour chaque variable.

## 2️⃣ Secrets requis

Créez les secrets suivants en vous basant sur votre fichier `.env.local` :

| Nom du secret | Description |
| ------------- | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase (ANON KEY) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase |
| `OPENAI_API_KEY` | Clé API OpenAI |
| `JWT_SECRET` | Clé secrète pour la génération des JWT |
| `NEXTAUTH_SECRET` | Clé secrète pour NextAuth |

Ajoutez d'autres variables de votre `.env.local` si nécessaire.

## 3️⃣ Utilisation dans les workflows

Les secrets ainsi ajoutés seront disponibles dans les fichiers
`.github/workflows/*.yml` via `${{ secrets.NOM_DU_SECRET }}`.
Assurez-vous qu'ils sont tous définis avant d'exécuter les workflows.
