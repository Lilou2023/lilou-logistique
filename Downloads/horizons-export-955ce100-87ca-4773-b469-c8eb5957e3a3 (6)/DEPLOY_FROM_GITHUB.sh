#!/bin/bash

# ==============================================================================
# DÉPLOIEMENT AUTOMATIQUE DEPUIS GITHUB VERS HOSTINGER
# Repository : https://github.com/Lilou2023/lilou-logistique.git
# Domaine : lilou-logistique.com
# ==============================================================================

# Configuration
SSH_HOST="217.65.150.107"
SSH_PORT="65002"
SSH_USER="u240832595"
REPO_URL="https://github.com/Lilou2023/lilou-logistique.git"
BRANCH="Lilou-Go"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   DÉPLOIEMENT DEPUIS GITHUB                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""

# 1. Push local changes to GitHub
echo -e "${YELLOW}[1/3]${NC} Push des changements vers GitHub..."
git add .
git commit -m "Update avant déploiement - $(date +%Y-%m-%d_%H:%M:%S)" 2>/dev/null
git push origin Lilou-Go

# 2. Déploiement sur Hostinger
echo -e "${YELLOW}[2/3]${NC} Connexion et déploiement sur Hostinger..."
echo -e "${YELLOW}Mot de passe SSH requis${NC}"

ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << 'ENDSSH'
# Configuration serveur
REPO_URL="https://github.com/Lilou2023/lilou-logistique.git"
BRANCH="Lilou-Go"
BUILD_DIR="~/lilou-build"
DEPLOY_DIR="~/public_html"

echo "🚀 Déploiement depuis GitHub..."

# Backup
mkdir -p ~/backups
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).tar.gz"
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR 2>/dev/null)" ]; then
    tar -czf ~/backups/$BACKUP_FILE -C $DEPLOY_DIR . 2>/dev/null
    echo "💾 Sauvegarde créée : $BACKUP_FILE"
fi

# Clone ou Update
if [ -d "$BUILD_DIR" ]; then
    echo "📥 Mise à jour du code..."
    cd $BUILD_DIR
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    echo "📥 Clonage du repository..."
    git clone -b $BRANCH $REPO_URL $BUILD_DIR
    cd $BUILD_DIR
fi

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "⚠️ Node.js non trouvé, installation..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 18
    nvm use 18
fi

# Build
echo "🔨 Construction de l'application..."
npm install --production=false
npm run build

# Déploiement
echo "📂 Déploiement des fichiers..."
rm -rf $DEPLOY_DIR/* 2>/dev/null
cp -r dist/* $DEPLOY_DIR/

# .htaccess pour React
cat > $DEPLOY_DIR/.htaccess << 'EOF'
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# React Router
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/index\.html
RewriteRule ^.*$ /index.html [L]

# Security
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"

# Cache pour assets
<FilesMatch "\.(ico|jpg|jpeg|png|gif|svg|js|css|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

Options -Indexes
AddDefaultCharset UTF-8
EOF

# Permissions
find $DEPLOY_DIR -type d -exec chmod 755 {} \;
find $DEPLOY_DIR -type f -exec chmod 644 {} \;

echo "✅ Déploiement terminé !"
echo "🌐 https://lilou-logistique.com"
ENDSSH

# 3. Vérification
echo -e "${YELLOW}[3/3]${NC} Vérification..."
sleep 2
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://lilou-logistique.com)

echo ""
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ DÉPLOIEMENT RÉUSSI !${NC}"
    echo -e "${GREEN}🌐 Site en ligne : https://lilou-logistique.com${NC}"
else
    echo -e "${YELLOW}⚠️ Code HTTP: $HTTP_STATUS${NC}"
fi
