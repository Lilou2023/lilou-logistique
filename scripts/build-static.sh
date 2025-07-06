#!/bin/bash
set -euo pipefail

# Script pour générer une version statique de l'application
# Compatible avec l'hébergement mutualisé Hostinger

echo "🔨 Build statique pour Hostinger..."

# Installer les dépendances
npm install

# Configurer Next.js pour l'export statique
cat > next.config.static.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Désactiver les features qui nécessitent un serveur
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
EOF

# Remplacer temporairement la config
mv next.config.js next.config.js.bak
mv next.config.static.js next.config.js

# Build statique
npm run build

# Restaurer la config originale
mv next.config.js next.config.static.js
mv next.config.js.bak next.config.js

# Créer le dossier de déploiement
rm -rf deploy
mkdir -p deploy

# Copier les fichiers statiques
cp -r out/* deploy/

# Créer un .htaccess pour la configuration Apache
cat > deploy/.htaccess << 'EOF'
# Configuration Apache pour l'application Next.js

# Activer la réécriture d'URL
RewriteEngine On

# Rediriger www vers non-www (ou inverse selon votre préférence)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Forcer HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Gestion des routes Next.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Headers de sécurité
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache pour les assets statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOF

echo "✅ Build statique terminé ! Les fichiers sont dans le dossier 'deploy/'"
echo "📁 Ces fichiers peuvent être déployés sur l'hébergement mutualisé Hostinger"
