# 🚀 Guide Final - Lancement Pipeline CI/CD Lilou Logistique

## ⚡ DÉMARRAGE RAPIDE (3 commandes)

```bash
# 1. Lancer la pipeline complète
./launch-pipeline.sh

# 2. Configurer les secrets GitHub (après avoir installé gh)
./configure-github-secrets.sh

# 3. Surveiller les résultats
open https://github.com/Lilou2023/lilou-logistique/actions
```

---

## 🎯 PROBLÈMES À RÉSOUDRE EN PRIORITÉ

### ❌ **1. Erreur "Invalid API key" (URGENT)**

**Symptôme :** L'interface affiche "Invalid API key" lors de la sélection du rôle.

**Solutions :**
1. **Vérifier les variables Vercel :**
   - Aller sur https://vercel.com/lilou-lo/lilou-logistique/settings/environment-variables
   - Vérifier que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correct
   - Vérifier que `NEXT_PUBLIC_SUPABASE_URL` est correct

2. **Redéployer sur Vercel :**
   ```bash
   # Si les variables sont correctes, forcer un redéploiement
   git commit --allow-empty -m "fix: force Vercel redeploy to refresh env vars"
   git push origin main
   ```

3. **Tester les clés Supabase :**
   ```bash
   ./fix-supabase-api.sh
   ```

### ✅ **2. Pipeline CI/CD (PRÊTE)**

**Fichiers créés :**
- ✅ `eas.json` - Configuration Expo EAS Build
- ✅ `app.config.js` - Configuration app mobile
- ✅ `.github/workflows/mobile-build.yml` - Build mobile
- ✅ `.github/workflows/hostinger-deploy.yml` - Déploiement Hostinger
- ✅ `launch-pipeline.sh` - Script de lancement
- ✅ `configure-github-secrets.sh` - Configuration secrets

---

## 🔧 **INSTRUCTIONS DÉTAILLÉES**

### **Étape 1: Lancer la Pipeline**

```bash
# Exécuter le script de lancement
./launch-pipeline.sh
```

**Ce script va :**
- ✅ Vérifier Git et GitHub CLI
- ✅ Installer GitHub CLI si nécessaire (`brew install gh`)
- ✅ Se connecter à GitHub (`gh auth login`)
- ✅ Vérifier tous les fichiers de pipeline
- ✅ Tester le build local
- ✅ Créer un commit et pousser vers GitHub
- ✅ Déclencher automatiquement la pipeline

### **Étape 2: Configurer les Secrets (après installation gh)**

```bash
# Configurer tous les secrets GitHub
./configure-github-secrets.sh
```

**Secrets configurés automatiquement :**
- ✅ `NEXTAUTH_SECRET`
- ✅ `NEXTAUTH_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Secrets à configurer manuellement :**
- 🔧 `EXPO_TOKEN` (pour builds mobiles)
- 🔧 `HOSTINGER_FTP_HOST`
- 🔧 `HOSTINGER_FTP_USER`
- 🔧 `HOSTINGER_FTP_PASSWORD`

### **Étape 3: Surveiller les Workflows**

1. **GitHub Actions :** https://github.com/Lilou2023/lilou-logistique/actions
2. **Expo Builds :** https://expo.dev
3. **Site déployé :** https://lilou-logistique.com

---

## 📊 **WORKFLOWS AUTOMATIQUES**

### 📱 **Mobile Build Workflow**
- **Trigger :** Push sur `main` ou `develop`
- **Actions :**
  - Build Android (APK/AAB)
  - Build iOS (IPA) si configuré
  - Upload sur Expo
- **Durée :** 10-15 minutes

### 🌐 **Hostinger Deploy Workflow**
- **Trigger :** Push sur `main`
- **Actions :**
  - Build Next.js statique
  - Déploiement FTP/SSH sur Hostinger
  - Test des URLs
- **Durée :** 3-5 minutes

### 🔄 **CI/CD Workflow**
- **Trigger :** Push sur toutes branches
- **Actions :**
  - Tests automatiques
  - Vérifications qualité
  - Rapports de build
- **Durée :** 2-3 minutes

---

## 🛠️ **COMMANDES UTILES**

```bash
# Voir les workflows en cours
gh run list

# Voir les détails d'un workflow
gh run view [RUN_ID]

# Relancer un workflow
gh workflow run "Mobile Build"
gh workflow run "Deploy to Hostinger"

# Test local de la pipeline
./test-ci-cd-pipeline.sh

# Correction API Supabase
./fix-supabase-api.sh
```

---

## ✅ **CHECKLIST FINAL**

### **Avant de lancer :**
- [ ] Git installé et configuré
- [ ] Repository GitHub lié
- [ ] Fichiers de pipeline créés

### **Après lancement :**
- [ ] GitHub CLI installé (`brew install gh`)
- [ ] Connecté à GitHub (`gh auth login`)
- [ ] Secrets GitHub configurés
- [ ] Workflows en cours sur GitHub Actions
- [ ] Erreur "Invalid API key" corrigée

### **Vérifications :**
- [ ] Site accessible : https://lilou-logistique.com
- [ ] Builds mobiles sur : https://expo.dev
- [ ] Workflows réussis sur GitHub Actions

---

## 🚨 **SUPPORT**

**Si problème avec :**
- **GitHub CLI :** `brew install gh` puis `gh auth login`
- **Pipeline :** Vérifier les logs sur GitHub Actions
- **API Key :** Vérifier les variables Vercel et redéployer
- **Build mobile :** Configurer `EXPO_TOKEN` dans les secrets GitHub

---

## 🎉 **RÉSULTATS ATTENDUS**

### **Immédiatement :**
- ✅ Pipeline CI/CD active
- ✅ Workflows déclenchés automatiquement
- ✅ Tests et builds en cours

### **Après 5-10 minutes :**
- ✅ Site déployé sur Hostinger
- ✅ Build mobile disponible sur Expo
- ✅ Rapports de qualité sur GitHub

### **À chaque push :**
- 🔄 Build automatique
- 🔄 Tests automatiques
- 🔄 Déploiement automatique

---

**🚀 COMMENCEZ PAR :** `./launch-pipeline.sh`