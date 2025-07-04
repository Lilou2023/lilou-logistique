# 🔐 Configuration des Secrets GitHub

Pour que le workflow fonctionne, tu dois configurer les secrets dans GitHub.

## 📋 Secrets nécessaires

### 1️⃣ Va dans ton repository GitHub
1. Clique sur **Settings** (⚙️)
2. Dans le menu gauche : **Secrets and variables** → **Actions**
3. Clique sur **New repository secret**

### 2️⃣ Ajoute ces secrets :

| Secret Name | Description | Où le trouver |
|------------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de ton projet Supabase | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase | Supabase Dashboard → Settings → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service Supabase | Supabase Dashboard → Settings → API → service_role key |
| `OPENAI_API_KEY` | Clé API OpenAI | https://platform.openai.com/api-keys |

### 3️⃣ Pour Vercel (si tu choisis Vercel) :

| Secret Name | Description | Où le trouver |
|------------|-------------|---------------|
| `VERCEL_TOKEN` | Token d'authentification | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | ID de ton organisation | Vercel Dashboard → Settings → General |
| `VERCEL_PROJECT_ID` | ID du projet | Créé après le premier déploiement |

### 4️⃣ Optionnel (pour notifications) :

| Secret Name | Description | Où le trouver |
|------------|-------------|---------------|
| `SLACK_WEBHOOK_URL` | Pour notifications Slack | Slack → Apps → Incoming Webhooks |

## 🚀 Comment ajouter un secret

1. **Name** : Copie exactement le nom du secret
2. **Value** : Colle la valeur
3. Clique sur **Add secret**

## 🔍 Vérification

Pour vérifier que tes secrets sont configurés :
1. Va dans l'onglet **Actions**
2. Lance le workflow manuellement
3. Vérifie les logs

## ⚠️ Important

- **Ne jamais** commiter ces valeurs dans ton code
- Les secrets avec `NEXT_PUBLIC_` sont visibles côté client
- Les autres secrets restent côté serveur uniquement

## 💡 Astuce

Pour développement local, crée un fichier `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
OPENAI_API_KEY=sk-xxx
```

**N'oublie pas** : `.env.local` est dans `.gitignore` = sécurisé ✅