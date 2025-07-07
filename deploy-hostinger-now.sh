#!/bin/bash

# 🚀 Script de déploiement Hostinger - Lilou Logistique
# Usage: ./deploy-hostinger-now.sh

set -e

echo "🚀 Déploiement Hostinger - Lilou Logistique"
echo "==========================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification de l'environnement
print_status "Vérification de l'environnement..."

if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

print_success "Environnement vérifié"

# Installation des dépendances
print_status "Installation des dépendances..."
npm install

# Validation de l'environnement
print_status "Validation des variables d'environnement..."
npm run validate-env

# Configuration pour l'export statique
print_status "Configuration pour l'export statique..."

# Sauvegarder la config originale
cp next.config.js next.config.js.backup

# Créer la config pour l'export statique
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Désactiver les features qui nécessitent un serveur
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
EOF

# Build statique
print_status "Build statique en cours..."
npm run build

# Restaurer la config originale
mv next.config.js.backup next.config.js

# Préparation des fichiers de déploiement
print_status "Préparation des fichiers de déploiement..."

# Créer le dossier de déploiement
rm -rf hostinger-deploy
mkdir -p hostinger-deploy

# Copier les fichiers statiques
cp -r out/* hostinger-deploy/

# Créer .htaccess pour Apache
cat > hostinger-deploy/.htaccess << 'EOF'
# Configuration Apache optimisée pour Next.js statique

Options -MultiViews
RewriteEngine On

# Redirection www vers non-www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Gestion des routes Next.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^([^/]+)/?$ $1.html [L]

# Fallback vers index.html pour les routes dynamiques
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Headers de sécurité
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Compression Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Cache optimisé
<IfModule mod_expires.c>
    ExpiresActive On
    
    # Images
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    
    # CSS et JS
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    
    # Fonts
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/otf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"
    
    # HTML
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Désactiver l'indexation des dossiers
Options -Indexes

# Protection des fichiers sensibles
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>
EOF

# Créer un fichier de déploiement info
echo "Build date: $(date)" > hostinger-deploy/deploy-info.txt
echo "Commit: $(git rev-parse HEAD)" >> hostinger-deploy/deploy-info.txt

print_success "Fichiers de déploiement préparés dans le dossier 'hostinger-deploy/'"

# Instructions pour le déploiement
echo ""
echo "================================================"
echo "✅ Build terminé avec succès!"
echo "================================================"
echo ""
echo "📋 Pour déployer sur Hostinger :"
echo ""
echo "1. Uploadez le contenu du dossier 'hostinger-deploy/'"
echo "   vers votre répertoire public_html sur Hostinger"
echo ""
echo "2. Ou utilisez Git dans Hostinger avec ces paramètres :"
echo "   - Dépôt : git@github.com:Lilou2023/lilou-logistique.git"
echo "   - Branche : hostinger-deploy"
echo "   - Répertoire : public_html"
echo ""
echo "3. Cliquez sur 'Pull' dans le panel Hostinger"
echo ""
echo "🌐 Votre site sera accessible sur :"
echo "   https://lilou-logistique.com"
echo ""
echo "================================================"

print_success "Déploiement prêt !" 
