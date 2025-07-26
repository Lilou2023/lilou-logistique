# 🌐 Configuration Git sur Hostinger - Guide Étape par Étape

## 🎯 Objectif
Configurer le déploiement automatique depuis GitHub vers Hostinger via Git, pour que chaque push sur `hostinger-deploy` mette automatiquement à jour ton site.

---

## 📋 **ÉTAPE 1: Accéder à la Configuration Git Hostinger**

1. **Connecte-toi à hPanel Hostinger**
   - Va sur https://hpanel.hostinger.com
   - Connecte-toi avec tes identifiants

2. **Accède à la section Git**
   - Va dans **Sites Web** (dans le menu latéral)
   - Sélectionne ton site **lilou-logistique.com**
   - Clique sur **Git** dans les options du site

---

## ⚙️ **ÉTAPE 2: Configuration du Repository Git**

Dans la section Git de Hostinger, configure :

### **Repository GitHub :**
```
https://github.com/Lilou2023/lilou-logistique.git
```

### **Branche à déployer :**
```
hostinger-deploy
```

### **Répertoire de destination :**
```
/public_html
```

### **Auto-déploiement :**
- ✅ **Activer le déploiement automatique**
- ✅ **Déployer à chaque push sur la branche**

---

## 🔐 **ÉTAPE 3: Récupérer l'API Key**

1. **Dans la section "Déploiement automatique"**
   - Copie le **Token API** généré par Hostinger
   - Il ressemble à : `hostinger_api_1234567890abcdef...`

2. **Ajouter le token aux secrets GitHub**
   - Va sur https://github.com/Lilou2023/lilou-logistique/settings/secrets/actions
   - Clique **"New repository secret"**
   - Nom : `HOSTINGER_API_KEY`
   - Valeur : ton token API copié

---

## 🏗️ **ÉTAPE 4: Comment ça fonctionne**

### **Workflow automatique :**

1. **Tu fais un push sur `main`** →
2. **GitHub Actions se déclenche** →
3. **Build de l'app Next.js** →
4. **Création/mise à jour de la branche `hostinger-deploy`** →
5. **Push vers `hostinger-deploy`** →
6. **Hostinger détecte le changement** →
7. **Déploiement automatique sur ton domaine** 🚀

### **Structure de la branche `hostinger-deploy` :**
```
hostinger-deploy/
├── index.html          # Page d'accueil construite
├── _next/              # Assets Next.js
├── assets/             # Images, CSS, JS
├── api/                # Routes API (si applicable)
└── deployment-info.md  # Info de déploiement
```

---

## 🧪 **ÉTAPE 5: Test de la Configuration**

### **1. Premier déploiement manuel :**
```bash
# Lancer la pipeline complète
./launch-pipeline.sh
```

### **2. Vérifier sur Hostinger :**
- Va dans **Sites Web** → **Git**
- Tu devrais voir l'historique des déploiements
- Status : "Déploiement réussi" ✅

### **3. Tester le site :**
- https://lilou-logistique.com
- https://www.lilou-logistique.com

---

## 📊 **MONITORING ET LOGS**

### **Sur Hostinger :**
- **Git** → **Historique des déploiements**
- Logs de chaque déploiement
- Status et erreurs éventuelles

### **Sur GitHub :**
- **Actions** → **Deploy to Hostinger via Git**
- Logs détaillés du build et déploiement
- Statut de chaque étape

---

## 🔧 **COMMANDES UTILES**

### **Déclencher un déploiement manuel :**
```bash
git commit --allow-empty -m "🚀 trigger Hostinger deployment"
git push origin main
```

### **Voir l'état de la branche hostinger-deploy :**
```bash
git checkout hostinger-deploy
git log --oneline -5
```

### **Forcer un redéploiement :**
```bash
git push origin hostinger-deploy --force
```

---

## ❌ **TROUBLESHOOTING**

### **Problème : Déploiement ne se déclenche pas**
- Vérifier que la branche `hostinger-deploy` existe
- Vérifier l'API Key dans les secrets GitHub
- Vérifier la configuration Git sur Hostinger

### **Problème : Build échoue**
- Vérifier les logs GitHub Actions
- Vérifier les variables d'environnement
- Tester le build localement : `npm run build`

### **Problème : Site non accessible**
- Vérifier les DNS (peut prendre quelques minutes)
- Vérifier le répertoire de destination `/public_html`
- Vérifier les logs Hostinger

---

## ✅ **RÉCAPITULATIF DE LA CONFIGURATION**

| Paramètre | Valeur |
|-----------|---------|
| **Repository** | `https://github.com/Lilou2023/lilou-logistique.git` |
| **Branche** | `hostinger-deploy` |
| **Répertoire** | `/public_html` |
| **Auto-deploy** | ✅ Activé |
| **API Key** | Configuré dans les secrets GitHub |

---

## 🎉 **RÉSULTAT ATTENDU**

Après configuration :
- ✅ Chaque push sur `main` déclenche un build
- ✅ Les fichiers sont deployés sur `hostinger-deploy`
- ✅ Hostinger met automatiquement à jour le site
- ✅ Site accessible sur https://lilou-logistique.com
- ✅ Déploiement complètement automatisé 🚀

---

**🔗 Liens utiles :**
- Configuration Git : hPanel → Sites Web → Git
- Secrets GitHub : https://github.com/Lilou2023/lilou-logistique/settings/secrets/actions
- Workflows : https://github.com/Lilou2023/lilou-logistique/actions