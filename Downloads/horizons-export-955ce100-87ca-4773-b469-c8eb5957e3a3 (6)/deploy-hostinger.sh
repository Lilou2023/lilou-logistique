#!/bin/bash

# ==============================================================================
# Script de Déploiement Automatique pour Hostinger
# Application : Lilou-GO IA
# Date : 17/08/2025
# ==============================================================================

# Configuration - À REMPLACER avec vos vraies valeurs
SSH_HOST="ssh123.hostinger.com"  # Remplacer par votre host SSH
SSH_PORT="7022"                   # Remplacer par votre port SSH
SSH_USER="u1234567"              # Remplacer par votre username SSH
GIT_REPO="git@github.com:votre-org/lilou-go-ia.git"  # Remplacer par votre repo Git

# Variables de production
PRODUCTION_DOMAIN="votredomaine.com"  # Remplacer par votre domaine
DEPLOY_PATH="~/public_html"
BUILD_PATH="~/lilou-go-build"
BACKUP_PATH="~/backups"

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# ==============================================================================
# ÉTAPE 1 : Préparation locale
# ==============================================================================

echo "╔════════════════════════════════════════════╗"
echo "║   DÉPLOIEMENT LILOU-GO IA SUR HOSTINGER   ║"
echo "╚════════════════════════════════════════════╝"
echo ""

log_info "Début du déploiement..."

# Vérifier si on est dans le bon dossier
if [ ! -f "package.json" ]; then
    log_error "package.json non trouvé. Êtes-vous dans le bon dossier ?"
    exit 1
fi

# Build local
log_info "Construction de l'application en mode production..."
npm run build

if [ ! -d "dist" ]; then
    log_error "Le build a échoué. Dossier 'dist' non trouvé."
    exit 1
fi

log_info "Build terminé avec succès !"

# ==============================================================================
# ÉTAPE 2 : Connexion SSH et déploiement
# ==============================================================================

log_info "Connexion au serveur Hostinger..."

# Commandes SSH à exécuter sur le serveur
SSH_COMMANDS=$(cat <<'EOF'
# Variables
DEPLOY_PATH="~/public_html"
BUILD_PATH="~/lilou-go-build"
BACKUP_PATH="~/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "📦 Préparation du déploiement..."

# Créer les dossiers nécessaires
mkdir -p $BUILD_PATH
mkdir -p $BACKUP_PATH

# Backup de l'ancien site (si existant)
if [ -d "$DEPLOY_PATH" ] && [ "$(ls -A $DEPLOY_PATH)" ]; then
    echo "💾 Sauvegarde de l'ancien site..."
    tar -czf "$BACKUP_PATH/backup_$TIMESTAMP.tar.gz" -C $DEPLOY_PATH . 2>/dev/null || true
    echo "✅ Sauvegarde créée : backup_$TIMESTAMP.tar.gz"
fi

# Nettoyer le dossier de build
rm -rf $BUILD_PATH/*

echo "🚀 Déploiement en cours..."
EOF
)

# Exécuter les commandes sur le serveur
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "$SSH_COMMANDS"

# ==============================================================================
# ÉTAPE 3 : Upload des fichiers
# ==============================================================================

log_info "Upload des fichiers de production..."

# Créer une archive tar du build
tar -czf build.tar.gz -C dist .

# Upload via SCP
scp -P $SSH_PORT build.tar.gz $SSH_USER@$SSH_HOST:~/lilou-go-build/

# Extraire et déployer sur le serveur
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << 'EOF'
cd ~/lilou-go-build
tar -xzf build.tar.gz
rm build.tar.gz

# Nettoyer public_html (garder certains fichiers importants)
cd ~/public_html
find . -maxdepth 1 ! -name '.htaccess' ! -name 'robots.txt' ! -name '.well-known' -exec rm -rf {} + 2>/dev/null || true

# Copier les nouveaux fichiers
cp -r ~/lilou-go-build/* ~/public_html/

# Copier le .htaccess si présent dans le build
if [ -f ~/lilou-go-build/.htaccess ]; then
    cp ~/lilou-go-build/.htaccess ~/public_html/
fi

# Permissions correctes
find ~/public_html -type d -exec chmod 755 {} \;
find ~/public_html -type f -exec chmod 644 {} \;

echo "✅ Fichiers déployés avec succès !"
EOF

# Nettoyer l'archive locale
rm -f build.tar.gz

# ==============================================================================
# ÉTAPE 4 : Configuration finale
# ==============================================================================

log_info "Configuration finale..."

# Créer/Mettre à jour le .htaccess sur le serveur
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << 'EOF'
cat > ~/public_html/.htaccess << 'HTACCESS'
RewriteEngine On

# Redirect to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Handle React Router
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L]

# Security Headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"

# Cache Control
<FilesMatch "\.(ico|jpg|jpeg|png|gif|svg|webp|js|css|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

Options -Indexes
HTACCESS

echo "✅ Configuration .htaccess mise à jour"
EOF

# ==============================================================================
# ÉTAPE 5 : Vérification
# ==============================================================================

log_info "Vérification du déploiement..."

# Test de santé du site
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$PRODUCTION_DOMAIN 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    log_info "✅ Site accessible avec succès !"
    echo ""
    echo "╔════════════════════════════════════════════╗"
    echo "║     DÉPLOIEMENT TERMINÉ AVEC SUCCÈS !     ║"
    echo "╚════════════════════════════════════════════╝"
    echo ""
    echo "🌐 Votre site est accessible sur : https://$PRODUCTION_DOMAIN"
    echo "💾 Une sauvegarde a été créée dans ~/backups/"
    echo ""
else
    log_warning "Le site retourne un code HTTP : $HTTP_STATUS"
    echo "Vérifiez manuellement : https://$PRODUCTION_DOMAIN"
fi

# Afficher les derniers logs d'erreur (si disponibles)
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << 'EOF'
if [ -f ~/logs/error.log ]; then
    echo ""
    echo "📋 Dernières erreurs (si présentes) :"
    tail -5 ~/logs/error.log 2>/dev/null || echo "Aucune erreur récente"
fi
EOF

echo ""
echo "🎉 Déploiement terminé !"
