# 🚀 Configuration Git et Déploiement Continu pour Lilou-GO

## 📌 Situation Actuelle
Votre projet **n'est pas encore sur Git**. Voici comment le configurer et établir un workflow de déploiement professionnel.

---

## 📦 ÉTAPE 1 : Créer le Dépôt GitHub

### Option A : Via GitHub.com (Recommandé)

1. Allez sur [github.com](https://github.com)
2. Connectez-vous avec `logistiquelilou@gmail.com`
3. Cliquez sur **"New Repository"** (bouton vert)
4. Configurez :
   - **Repository name :** `lilou-go-ia` (ou `lilou-logistique`)
   - **Description :** "Système de gestion logistique avec IA"
   - **Private :** ✅ (recommandé pour un projet commercial)
   - **NE PAS** initialiser avec README
5. Cliquez **"Create repository"**
6. GitHub vous donnera l'URL : `git@github.com:votre-username/lilou-go-ia.git`

### Option B : Via GitLab

Similaire, mais sur [gitlab.com](https://gitlab.com)

---

## 🔧 ÉTAPE 2 : Initialiser Git Localement

**Dans votre terminal, depuis le dossier du projet :**

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit - Lilou-GO IA v1.0"

# 4. Ajouter le remote (REMPLACEZ l'URL par la vôtre)
git remote add origin git@github.com:VOTRE-USERNAME/lilou-go-ia.git

# 5. Pousser vers GitHub
git branch -M main
git push -u origin main
```

---

## 🚀 ÉTAPE 3 : Déploiement depuis Git vers Hostinger

Une fois que votre code est sur Git, voici les commandes SSH pour déployer :

### Script de Déploiement Complet

**Connexion SSH et déploiement :**

```bash
ssh -p 65002 u240832595@217.65.150.107 << 'ENDSSH'
# Variables
REPO_URL="git@github.com:VOTRE-USERNAME/lilou-go-ia.git"  # REMPLACEZ !
DEPLOY_DIR="~/public_html"
BUILD_DIR="~/lilou-build-temp"

echo "🚀 Déploiement depuis Git..."

# 1. Backup du site actuel
mkdir -p ~/backups
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).tar.gz"
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR)" ]; then
    tar -czf ~/backups/$BACKUP_FILE -C $DEPLOY_DIR .
    echo "💾 Sauvegarde créée : $BACKUP_FILE"
fi

# 2. Cloner le repo (ou pull si existe déjà)
if [ -d "$BUILD_DIR" ]; then
    cd $BUILD_DIR
    git pull origin main
else
    git clone $REPO_URL $BUILD_DIR
    cd $BUILD_DIR
fi

# 3. Installer les dépendances et builder
npm install
npm run build

# 4. Déployer
rm -rf $DEPLOY_DIR/*
cp -r dist/* $DEPLOY_DIR/

# 5. Créer le .htaccess
cat > $DEPLOY_DIR/.htaccess << 'EOF'
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L]
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Options -Indexes
EOF

# 6. Permissions
find $DEPLOY_DIR -type d -exec chmod 755 {} \;
find $DEPLOY_DIR -type f -exec chmod 644 {} \;

echo "✅ Déploiement terminé !"
echo "🌐 Site accessible : https://lilou-logistique.com"
ENDSSH
```

---

## 🔑 ÉTAPE 4 : Configuration SSH pour Git (sur Hostinger)

Pour que Hostinger puisse cloner depuis GitHub/GitLab :

```bash
ssh -p 65002 u240832595@217.65.150.107

# Une fois connecté :
# 1. Générer une clé SSH (si pas déjà fait)
ssh-keygen -t ed25519 -C "logistiquelilou@gmail.com"
# Appuyez Enter pour tout accepter

# 2. Afficher la clé publique
cat ~/.ssh/id_ed25519.pub

# 3. Copiez cette clé et ajoutez-la dans :
# GitHub : Settings → SSH and GPG keys → New SSH key
# GitLab : Settings → SSH Keys
```

---

## 🔄 ÉTAPE 5 : Workflow pour les Futures Mises à Jour

### Sur votre machine locale :

```bash
# 1. Faire vos modifications
# 2. Commit et push
git add .
git commit -m "Description des changements"
git push origin main
```

### Déploiement (depuis n'importe où) :

```bash
ssh -p 65002 u240832595@217.65.150.107 'cd ~/lilou-build-temp && git pull && npm run build && cp -r dist/* ~/public_html/'
```

---

## 🎯 Commandes Rapides Une Fois Git Configuré

### Déploiement en 1 ligne :
```bash
git push && ssh -p 65002 u240832595@217.65.150.107 'cd ~/lilou-build-temp && git pull && npm run build && rm -rf ~/public_html/* && cp -r dist/* ~/public_html/ && echo "✅ Déployé"'
```

### Rollback rapide :
```bash
ssh -p 65002 u240832595@217.65.150.107 'cd ~/public_html && rm -rf * && tar -xzf ~/backups/backup_YYYYMMDD_HHMMSS.tar.gz'
```

---

## 📊 Avantages du Workflow Git

✅ **Versioning :** Historique complet des modifications
✅ **Collaboration :** Plusieurs développeurs peuvent contribuer
✅ **Rollback :** Retour facile à une version précédente
✅ **CI/CD :** Possibilité d'automatiser avec GitHub Actions
✅ **Backup :** Code sauvegardé sur GitHub/GitLab

---

## ⚠️ IMPORTANT

1. **Ne JAMAIS commiter :**
   - Fichiers `.env` avec les vraies clés
   - Mots de passe
   - Clés SSH privées

2. **Toujours tester localement avant de push**

3. **Faire des backups avant chaque déploiement**

---

## 🆘 Besoin d'Aide ?

Si vous n'avez pas encore de compte GitHub :
1. Créez-en un sur [github.com](https://github.com)
2. Utilisez `logistiquelilou@gmail.com`
3. Créez le repository
4. Partagez-moi l'URL pour les commandes exactes

**URL attendue :** `git@github.com:[votre-username]/lilou-go-ia.git`
