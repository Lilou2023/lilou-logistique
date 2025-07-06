# 🚀 Guide de Déploiement Hostinger - Lilou Logistique

## 📋 Vue d'ensemble

Ce guide explique comment déployer automatiquement votre application Next.js sur Hostinger en utilisant des fichiers statiques.

## 🔧 Prérequis

- Node.js 20+ installé
- npm installé
- Accès Git configuré
- Repository GitHub configuré

## 🚀 Déploiement Automatique

### **Option 1 : Script Automatisé (Recommandé)**

```bash
# Rendre le script exécutable
chmod +x tools/deploy.sh

# Lancer le déploiement
./tools/deploy.sh
```

### **Option 2 : Déploiement Manuel**

```bash
# 1. Basculer vers hostinger-deploy
git checkout hostinger-deploy

# 2. Fusionner les changements de main
git merge main --no-edit

# 3. Configurer Next.js pour l'export statique
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}
module.exports = nextConfig
EOF

# 4. Installer les dépendances
npm ci

# 5. Build statique
npm run build

# 6. Nettoyer et copier les fichiers
git rm -rf .
cp -r out/* .

# 7. Commit et push
git add -A
git commit -m "🚀 Déploiement statique"
git push origin hostinger-deploy
```

## 📁 Structure des Fichiers

Après le déploiement, la branche `hostinger-deploy` contient :

```
hostinger-deploy/
├── index.html          # Page d'accueil
├── _next/              # Assets Next.js
├── .htaccess           # Configuration Apache
├── deploy-info.txt     # Informations de déploiement
└── ...                 # Autres fichiers statiques
```

## 🔄 Workflow de Déploiement

1. **Développement** sur la branche `main`
2. **Script de déploiement** :
   - Fusion de `main` vers `hostinger-deploy`
   - Build statique avec `output: 'export'`
   - Copie des fichiers vers la racine
   - Push vers GitHub
3. **Webhook Hostinger** se déclenche automatiquement
4. **Déploiement** sur le serveur Hostinger

## ⚙️ Configuration Hostinger

Dans votre panel Hostinger :

| Paramètre | Valeur |
|-----------|---------|
| **Dépôt** | `git@github.com:Lilou2023/lilou-logistique.git` |
| **Branche** | `hostinger-deploy` |
| **Répertoire** | `public_html` (ou vide) |
| **Webhook** | Configuré automatiquement |

## 🔍 Vérification du Déploiement

### **1. Logs Hostinger**
```
Panel Hostinger → Git → Logs
```

### **2. Test du Site**
```bash
curl -I https://lilou-logistique.com
```

### **3. GitHub Actions**
```
https://github.com/Lilou2023/lilou-logistique/actions
```

## 🛠️ Dépannage

### **Problème : "Aucun fichier copié"**
- Vérifiez que `next.config.js` contient `output: 'export'`
- Assurez-vous que le build génère un dossier `out/`

### **Problème : "Erreur de fusion"**
```bash
git checkout hostinger-deploy
git reset --hard origin/hostinger-deploy
./tools/deploy.sh
```

### **Problème : "Webhook ne se déclenche pas"**
- Vérifiez la configuration du webhook dans Hostinger
- Testez manuellement avec un push

## 📝 Scripts Utiles

### **Vérification de l'état**
```bash
# Statut des branches
git branch -a

# Derniers commits
git log --oneline -5

# Fichiers dans hostinger-deploy
git ls-tree -r hostinger-deploy --name-only
```

### **Nettoyage**
```bash
# Supprimer les fichiers temporaires
rm -f next.config.js.backup
rm -rf out/
```

## 🎯 Bonnes Pratiques

1. **Toujours tester** le build localement avant le déploiement
2. **Vérifier les logs** Hostinger après chaque déploiement
3. **Utiliser le script automatisé** pour éviter les erreurs
4. **Documenter les changements** dans les commits

## 📞 Support

- **Logs Hostinger** : Panel → Git → Logs
- **GitHub Actions** : https://github.com/Lilou2023/lilou-logistique/actions
- **Documentation** : Ce fichier et les autres guides dans le projet

---

**Dernière mise à jour** : $(date)
**Version** : 1.0.0