#!/bin/bash

# ==============================================================================
# Script de Déploiement pour lilou-logistique.com sur Hostinger
# Date : 17/08/2025
# ==============================================================================

# Configuration RÉELLE
SSH_HOST="217.65.150.107"
SSH_PORT="65002"
SSH_USER="u240832595"
PRODUCTION_DOMAIN="lilou-logistique.com"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   DÉPLOIEMENT LILOU-LOGISTIQUE.COM        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""

# Étape 1 : Build
echo -e "${YELLOW}[1/5]${NC} Construction de l'application..."
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Erreur : Build échoué${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build terminé${NC}"

# Étape 2 : Création de l'archive
echo -e "${YELLOW}[2/5]${NC} Création de l'archive..."
cp .htaccess dist/ 2>/dev/null || echo "Pas de .htaccess à copier"
tar -czf deploy.tar.gz -C dist .
echo -e "${GREEN}✅ Archive créée${NC}"

# Étape 3 : Upload
echo -e "${YELLOW}[3/5]${NC} Upload vers Hostinger..."
echo -e "${YELLOW}Mot de passe SSH requis :${NC}"
scp -P $SSH_PORT deploy.tar.gz $SSH_USER@$SSH_HOST:~/

# Étape 4 : Déploiement sur le serveur
echo -e "${YELLOW}[4/5]${NC} Déploiement sur le serveur..."
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << 'ENDSSH'
echo "📦 Déploiement en cours..."

# Backup
mkdir -p ~/backups
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).tar.gz"
if [ -d ~/public_html ] && [ "$(ls -A ~/public_html 2>/dev/null)" ]; then
    tar -czf ~/backups/$BACKUP_FILE -C ~/public_html . 2>/dev/null
    echo "💾 Sauvegarde créée : $BACKUP_FILE"
fi

# Nettoyer et déployer
cd ~/public_html
rm -rf * 2>/dev/null
tar -xzf ~/deploy.tar.gz
rm ~/deploy.tar.gz

# Créer le .htaccess optimisé
cat > .htaccess << 'EOF'
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# React Router - TRÈS IMPORTANT
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/index\.html
RewriteRule ^.*$ /index.html [L]

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache Control pour les assets
<FilesMatch "\.(ico|jpg|jpeg|png|gif|svg|webp|js|css|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Désactiver la navigation des dossiers
Options -Indexes

# UTF-8
AddDefaultCharset UTF-8
EOF

# Permissions
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 644 .htaccess

echo "✅ Déploiement terminé sur le serveur !"
ENDSSH

# Étape 5 : Nettoyage et vérification
echo -e "${YELLOW}[5/5]${NC} Nettoyage et vérification..."
rm deploy.tar.gz

# Test du site
sleep 2
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$PRODUCTION_DOMAIN 2>/dev/null || echo "000")

echo ""
echo -e "${GREEN}════════════════════════════════════════════${NC}"
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ DÉPLOIEMENT RÉUSSI !${NC}"
    echo -e "${GREEN}🌐 Site accessible : https://$PRODUCTION_DOMAIN${NC}"
else
    echo -e "${YELLOW}⚠️  Site retourne code HTTP: $HTTP_STATUS${NC}"
    echo -e "${YELLOW}Vérifiez : https://$PRODUCTION_DOMAIN${NC}"
fi
echo -e "${GREEN}════════════════════════════════════════════${NC}"
