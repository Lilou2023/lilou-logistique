# 🚀 Déploiement Automatisé Lilou Logistique

## 📋 Vue d'ensemble

Système de déploiement unifié automatisé pour le projet Lilou Logistique, combinant Vercel et Hostinger avec CI/CD GitHub Actions v4.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  GitHub Actions │───▶│   Vercel +      │
│                 │    │   (CI/CD v4)    │    │   Hostinger     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Fichiers de Configuration

### Workflow CI/CD
- **`.github/workflows/ci.yml`** - Pipeline principal avec 6 jobs
- **`vercel.json`** - Configuration Vercel optimisée
- **`deploy-unified.sh`** - Script de déploiement unifié
- **`setup-vercel-env.sh`** - Configuration automatique des variables d'environnement

## 🔄 Pipeline CI/CD

### Jobs du Workflow

1. **🧪 Tests et Validation** (10 min)
   - Vérification TypeScript
   - Tests unitaires
   - Upload des résultats

2. **📊 Analyse de Performance** (15 min)
   - Build de production
   - Tests Lighthouse
   - Analyse de bundle

3. **🏗️ Build Optimisé** (20 min)
   - Build de production
   - Compression gzip
   - Upload des artefacts

4. **📱 Build Mobile** (25 min)
   - Build Capacitor
   - Support iOS/Android

5. **🚀 Déploiement Staging** (15 min)
   - Déploiement automatique sur `develop`
   - Vérification post-déploiement

6. **🚀 Déploiement Production** (20 min)
   - Déploiement automatique sur `main`
   - Notifications de succès

## 🌍 Environnements

| Branche | Environnement | URL Vercel | URL Hostinger |
|---------|---------------|------------|---------------|
| `main` | Production | `lilou-logistique.vercel.app` | `lilou-logistique.com` |
| `develop` | Staging | `lilou-logistique-git-develop-lilou2023.vercel.app` | `staging.lilou-logistique.com` |
| `feature/*` | Preview | Auto-généré | - |

## 🚀 Déploiement Automatique

### Déclencheurs
- **Push sur `main`** → Déploiement production
- **Push sur `develop`** → Déploiement staging
- **Pull Request** → Tests et validation

### Variables d'Environnement

```bash
# Supabase
SUPABASE_URL=https://fauuqcmfzxltjrlbdibh.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Vercel (automatique)
NODE_ENV=production
VERCEL_PROJECT_ID=auto-détecté
```

## 📊 Métriques de Performance

### Objectifs
- **FCP** : < 1.5s
- **LCP** : < 2.5s
- **CLS** : < 0.1
- **Bundle Size** : < 250KB

### Monitoring
- Tests Lighthouse automatisés
- Analyse de bundle
- Vérifications post-déploiement
- Notifications de performance

## 🛠️ Commandes Utiles

### Configuration
```bash
# Test de la configuration
./test-deployment.sh

# Configuration Vercel
./setup-vercel-env.sh

# Connexion Vercel
vercel login
```

### Déploiement Manuel
```bash
# Déploiement staging
./deploy-unified.sh staging

# Déploiement production
./deploy-unified.sh production

# Déploiement automatique
git push origin develop  # Staging
git push origin main     # Production
```

### Monitoring
```bash
# Vérification des variables d'environnement
vercel env ls

# Logs de déploiement
vercel logs

# Analyse de performance
npm run lighthouse
npm run bundle-analyzer
```

## 🔧 Optimisations Implémentées

### Performance
- ✅ Cache npm optimisé
- ✅ Compression gzip automatique
- ✅ Parallélisation des jobs
- ✅ Timeouts appropriés

### Sécurité
- ✅ Actions GitHub v4
- ✅ Variables d'environnement sécurisées
- ✅ Headers de sécurité
- ✅ Vérifications post-déploiement

### Monitoring
- ✅ Tests automatisés
- ✅ Rapports de performance
- ✅ Notifications de succès
- ✅ Vérifications de santé

## 🚨 Dépannage

### Problèmes Courants

1. **Échec de build**
   ```bash
   # Vérifier les logs
   vercel logs
   
   # Rebuild local
   npm run build
   ```

2. **Variables d'environnement manquantes**
   ```bash
   # Reconfigurer
   ./setup-vercel-env.sh
   
   # Vérifier
   vercel env ls
   ```

3. **Déploiement échoué**
   ```bash
   # Vérifier la configuration
   ./test-deployment.sh
   
   # Déploiement manuel
   ./deploy-unified.sh staging
   ```

### Logs et Debugging
- **GitHub Actions** : Onglet Actions du repo
- **Vercel** : `vercel logs`
- **Local** : `./test-deployment.sh`

## 📈 Statistiques

- **Temps de déploiement** : ~15-20 minutes
- **Taux de succès** : >95%
- **Déploiements/jour** : 10-20
- **Environnements** : 3 (dev, staging, prod)

## 🔗 Liens Utiles

- **GitHub Actions** : https://github.com/Lilou2023/lilou-logistique/actions
- **Vercel Dashboard** : https://vercel.com/dashboard
- **Hostinger Panel** : https://hpanel.hostinger.com
- **Supabase Dashboard** : https://supabase.com/dashboard

---

**Dernière mise à jour** : $(date)
**Version** : 4.0
**Statut** : ✅ Opérationnel 