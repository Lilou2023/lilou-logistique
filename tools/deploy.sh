#!/bin/bash

# 🚀 Script de déploiement automatisé pour Hostinger
# Usage: ./tools/deploy.sh

set -e

echo "🚀 Déploiement automatisé vers Hostinger"
echo "========================================"

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

# Sauvegarder la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)
print_status "Branche actuelle : $CURRENT_BRANCH"

# Créer la configuration Next.js pour l'export statique
print_status "Configuration Next.js pour export statique..."
cat > next.config.hostinger.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_APP_NAME: 'Lilou Logistique',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
}

module.exports = nextConfig
EOF

# Sauvegarder la config originale
cp next.config.js next.config.js.backup

# Basculer vers hostinger-deploy
print_status "Basculer vers la branche hostinger-deploy..."
git checkout hostinger-deploy 2>/dev/null || {
    print_status "Création de la branche hostinger-deploy..."
    git checkout -b hostinger-deploy
}

# Fusionner les changements de main
print_status "Fusion des changements de main..."
git merge main --no-edit || {
    print_warning "Conflit de fusion détecté, utilisation de la stratégie 'ours'"
    git merge --abort
    git merge main --strategy=ours --no-edit
}

# Remplacer la config Next.js
print_status "Application de la configuration d'export statique..."
mv next.config.hostinger.js next.config.js

# Installation des dépendances
print_status "Installation des dépendances..."
npm ci

# Build statique
print_status "Build statique en cours..."
npm run build

# Vérifier que le dossier out existe
if [ ! -d "out" ]; then
    print_error "Le dossier 'out' n'a pas été créé. Vérifiez la configuration Next.js."
    exit 1
fi

# Nettoyer la branche
print_status "Nettoyage de la branche..."
git rm -rf . || true

# Copier les fichiers statiques
print_status "Copie des fichiers statiques..."
cp -r out/* .

# Créer .htaccess pour Apache
print_status "Création du fichier .htaccess..."
cat > .htaccess << 'EOF'
# Configuration Apache optimisée pour Next.js statique

Options -MultiViews
RewriteEngine On

# Redirection www
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
echo "Build date: $(date)" > deploy-info.txt
echo "Commit: $(git rev-parse HEAD)" >> deploy-info.txt

# Ajouter tous les fichiers
print_status "Ajout des fichiers au Git..."
git add -A

# Commit et push
if ! git diff --cached --quiet; then
    print_status "Commit des changements..."
    git commit -m "🚀 Déploiement statique vers Hostinger - $(date)"
    
    print_status "Push vers GitHub..."
    git push origin hostinger-deploy
    
    print_success "Déploiement déclenché !"
    print_status "Le webhook Hostinger va automatiquement déployer les fichiers."
else
    print_warning "Aucun changement détecté, pas de déploiement nécessaire."
fi

# Restaurer la configuration originale
print_status "Restauration de la configuration originale..."
mv next.config.js.backup next.config.js

# Retourner à la branche d'origine
print_status "Retour à la branche $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo ""
print_success "✅ Déploiement terminé avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Attendez 2-3 minutes que le webhook Hostinger se déclenche"
echo "2. Vérifiez votre site : https://lilou-logistique.com"
echo "3. Pour les prochaines mises à jour, relancez : ./tools/deploy.sh"
echo ""
echo "🔗 Logs Hostinger : Panel → Git → Logs"
echo "🔗 GitHub Actions : https://github.com/Lilou2023/lilou-logistique/actions"
echo ""
echo "========================================"