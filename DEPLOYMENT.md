# 🚀 Guide de Déploiement - LILOU LOGISTIQUE

Ce guide détaille le système de déploiement automatisé et manuel pour la plateforme Lilou Logistique.

## 🏗️ Architecture de Déploiement

### Environnements
- **Development**: Environnement local de développement
- **Staging**: Environnement de test (branche `develop`)  
- **Production**: Environnement de production (branche `main`)

### Plateformes Supportées
- **Vercel** (par défaut) - Recommandé pour Next.js
- **Netlify** - Alternative populaire
- **AWS S3 + CloudFront** - Pour plus de contrôle

## ⚡ Déploiement Automatique (GitHub Actions)

### Déclencheurs Automatiques
- **Push sur `develop`** → Déploiement automatique en staging
- **Push sur `main`** → Déploiement automatique en production
- **Pull Request sur `main`** → Validation et tests uniquement

### Déclenchement Manuel
Via l'interface GitHub Actions, vous pouvez déclencher un déploiement manuel :
1. Allez dans l'onglet "Actions" de votre repository
2. Sélectionnez "🚀 Deploy LILOU LOGISTIQUE"
3. Cliquez sur "Run workflow"
4. Choisissez l'environnement (staging/production)

## 🛠️ Configuration des Secrets GitHub

### Secrets Requis

#### Pour Vercel (Recommandé)
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### Pour Netlify
```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

#### Pour AWS
```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_STAGING=your-staging-bucket
AWS_S3_BUCKET_PROD=your-production-bucket
AWS_CLOUDFRONT_DISTRIBUTION_STAGING=your_staging_distribution_id
AWS_CLOUDFRONT_DISTRIBUTION_PROD=your_production_distribution_id
```

### Variables d'Environnement

#### Variables de Base (Requises)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

#### Variables par Environnement (Optionnelles)
Pour des configurations différentes par environnement :

**Staging:**
```
STAGING_SUPABASE_URL=your_staging_supabase_url
STAGING_SUPABASE_ANON_KEY=your_staging_anon_key
STAGING_SUPABASE_SERVICE_ROLE_KEY=your_staging_service_key
STAGING_OPENAI_API_KEY=your_staging_openai_key
STAGING_JWT_SECRET=your_staging_jwt_secret
STAGING_NEXTAUTH_SECRET=your_staging_nextauth_secret
```

**Production:**
```
PROD_SUPABASE_URL=your_prod_supabase_url
PROD_SUPABASE_ANON_KEY=your_prod_anon_key
PROD_SUPABASE_SERVICE_ROLE_KEY=your_prod_service_key
PROD_OPENAI_API_KEY=your_prod_openai_key
PROD_JWT_SECRET=your_prod_jwt_secret
PROD_NEXTAUTH_SECRET=your_prod_nextauth_secret
```

### Variables de Configuration
```
DEPLOY_PLATFORM=vercel  # ou 'netlify' ou 'aws'
AWS_DEFAULT_REGION=eu-west-1
```

## 🖥️ Déploiement Local/Manuel

### Installation du Script
```bash
# Rendre le script exécutable
chmod +x scripts/deploy.sh
```

### Utilisation
```bash
# Déploiement en staging sur Vercel (défaut)
./scripts/deploy.sh

# Déploiement en production sur Vercel
./scripts/deploy.sh -e production

# Déploiement sur Netlify
./scripts/deploy.sh -p netlify -e staging

# Déploiement sur AWS
./scripts/deploy.sh -p aws -e production

# Déploiement rapide (sans tests)
./scripts/deploy.sh -e production -s

# Aide
./scripts/deploy.sh -h
```

### Options Disponibles
- `-e, --environment`: Environnement cible (staging|production)
- `-p, --platform`: Plateforme (vercel|netlify|aws)
- `-s, --skip-tests`: Ignorer les tests
- `-b, --skip-build`: Ignorer le build (utiliser le build existant)
- `-h, --help`: Afficher l'aide

## 🔧 Configuration Spécifique par Plateforme

### Vercel

#### Installation CLI
```bash
npm install -g vercel
vercel login
```

#### Configuration Projet
```bash
vercel link
```

### Netlify

#### Installation CLI
```bash
npm install -g netlify-cli
netlify login
```

#### Configuration Projet
```bash
netlify init
```

### AWS

#### Installation CLI
```bash
# Ubuntu/Debian
sudo apt install awscli

# macOS
brew install awscli

# Configuration
aws configure
```

#### Variables Requises
```bash
export AWS_S3_BUCKET="your-bucket-name"
export AWS_CLOUDFRONT_DISTRIBUTION_ID="your-distribution-id"
```

## 📋 Processus de Déploiement

### Étapes Automatiques
1. 🔍 **Validation**: Vérification des variables d'environnement
2. 🔧 **Type Check**: Vérification TypeScript
3. 🧪 **Tests**: Exécution des tests unitaires
4. 🏗️ **Build**: Construction de l'application
5. 🔐 **Audit**: Audit de sécurité
6. 🚀 **Deploy**: Déploiement sur la plateforme cible
7. 📢 **Notification**: Notification du statut

### Vérifications de Sécurité
- Audit des dépendances NPM
- Vérification des secrets codés en dur
- Headers de sécurité configurés
- CSP (Content Security Policy) appliquée

## 🚨 Dépannage

### Erreurs Communes

#### Variables d'Environnement Manquantes
```bash
# Vérifier la configuration locale
npm run validate-env

# Vérifier les secrets GitHub
# Aller dans Settings > Secrets and variables > Actions
```

#### Échec du Build
```bash
# Tester le build localement
npm run build

# Vérifier les logs TypeScript
npm run type-check
```

#### Échec des Tests
```bash
# Lancer les tests localement
npm run test

# Mode watch pour debug
npm run test:watch
```

### Logs de Déploiement
- **GitHub Actions**: Onglet "Actions" du repository
- **Vercel**: Dashboard Vercel → Project → Functions
- **Netlify**: Dashboard Netlify → Site → Deploys
- **AWS**: CloudWatch Logs

## 🔄 Rollback

### Rollback Automatique
En cas d'échec de déploiement, la plateforme conserve la version précédente.

### Rollback Manuel

#### Vercel
```bash
vercel rollback [deployment-url]
```

#### Netlify
```bash
netlify rollback
```

#### AWS
```bash
# Redéployer une version précédente
./scripts/deploy.sh -e production -p aws
```

## 📊 Monitoring

### Health Checks
- Endpoint: `/api/health`
- Vérifications automatiques toutes les 5 minutes
- Alertes en cas de problème

### Métriques
- Performance de l'application
- Temps de réponse des API
- Utilisation des ressources

## 🔐 Sécurité

### Best Practices
- ✅ Variables d'environnement chiffrées
- ✅ Headers de sécurité configurés
- ✅ Audit automatique des dépendances
- ✅ CSP stricte configurée
- ✅ HTTPS forcé en production

### Rotation des Secrets
Planifier la rotation régulière des :
- Clés API Supabase
- Clés OpenAI
- Secrets JWT
- Tokens d'authentification

## 📞 Support

Pour toute question ou problème de déploiement :
1. Consulter les logs de déploiement
2. Vérifier la configuration des secrets
3. Tester le déploiement en local
4. Consulter la documentation de la plateforme utilisée

---

**Dernière mise à jour**: $(date)
**Version**: 1.0.0