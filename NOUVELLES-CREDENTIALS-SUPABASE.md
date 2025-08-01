# 🔐 Nouvelles Credentials Supabase - Lilou Logistique

## 🚨 IMPORTANT - SÉCURITÉ

Ces credentials sont **SENSIBLES** et doivent être gardées **SECRÈTES**. 
- Ne jamais les partager publiquement
- Ne jamais les commiter dans Git
- Les stocker uniquement dans des variables d'environnement sécurisées

## 📊 Informations de la nouvelle instance Supabase

- **Project Reference**: `ocsxrxcphdknfzihejjd`
- **Project URL**: https://ocsxrxcphdknfzihejjd.supabase.co
- **Database Host**: db.ocsxrxcphdknfzihejjd.supabase.co
- **Region**: AWS US East 1

## 🔑 Clés API

### AI Gateway
- **Clé**: `Juy0ZJiq3xAIFliGIozCAjlO`
- **Variable**: `AI_GATEWAY_API_KEY`

### Supabase Public (Client-side)
- **URL**: `https://ocsxrxcphdknfzihejjd.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk4MjEsImV4cCI6MjA2OTY0NTgyMX0.ZYvmJCUKcsQWrW2tFRfjcUJ29vca5abK7yg8QG3WkCk`

### Supabase Service (Server-side only)
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDA2OTgyMSwiZXhwIjoyMDY5NjQ1ODIxfQ.e8-3nSK4A9pqf12jWWIwqeBjQ1FRRMpd-uibEOnGFzY`
- **JWT Secret**: `c2QxAYdQkWMndpqRlFeuaPMACLNeV2OfODvTs27CUGXaduQVNE6AqfiYRBSc1fV+5kWK5/+ZdCGWodFl9jxD7A==`

## 🗄️ Configuration Base de Données

### Connection Pooler (Recommandé pour production)
```
postgres://postgres.ocsxrxcphdknfzihejjd:mMInnKRIbRY5aW8L@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
```

### Connection Directe (Pour migrations)
```
postgres://postgres.ocsxrxcphdknfzihejjd:mMInnKRIbRY5aW8L@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require
```

### Prisma Connection
```
postgres://postgres.ocsxrxcphdknfzihejjd:mMInnKRIbRY5aW8L@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
```

## 📝 Fichiers créés

1. **`.env.local`** - Variables d'environnement pour développement local
2. **`update-vercel-env-new-supabase.sh`** - Script pour mettre à jour Vercel

## 🚀 Instructions de déploiement

### 1. Développement Local
```bash
# Les variables sont déjà dans .env.local
npm run dev
```

### 2. Mise à jour sur Vercel
```bash
# Exécuter le script de mise à jour
./update-vercel-env-new-supabase.sh

# Ou manuellement via l'interface Vercel:
# https://vercel.com/lilou-lo/lilou-logistique/settings/environment-variables
```

### 3. Redéploiement
```bash
# Après mise à jour des variables
vercel --prod
```

## ⚠️ Migration depuis l'ancienne instance

Si vous migrez depuis l'ancienne instance Supabase (`fauuqcmfzxltjrlbdibh`):
1. Exporter les données de l'ancienne base
2. Importer dans la nouvelle base
3. Mettre à jour toutes les références dans le code
4. Tester en environnement de staging d'abord

## 🔍 Vérification

Pour vérifier que tout fonctionne:
1. Tester la connexion à Supabase
2. Vérifier l'authentification
3. Tester les opérations CRUD
4. Vérifier les logs Vercel pour toute erreur

## 📞 Support

En cas de problème:
- Vérifier les logs Vercel
- Vérifier la console du navigateur
- S'assurer que toutes les variables sont correctement configurées
- Vérifier que les clés n'ont pas d'espaces supplémentaires