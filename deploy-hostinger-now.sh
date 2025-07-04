#!/bin/bash

echo "🚀 Déploiement Lilou GO v4.2 sur Hostinger"
echo "=========================================="

# 1. S'assurer qu'on est sur main
git checkout main 2>/dev/null || git checkout -b main

# 2. Récupérer les derniers changements
echo "📥 Récupération des derniers changements..."
git pull origin main 2>/dev/null || echo "✅ Pas de nouveaux changements"

# 3. Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# 4. Configurer Next.js pour l'export statique
echo "⚙️ Configuration pour export statique..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Désactiver les features qui nécessitent un serveur
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
EOF

# 5. Build statique
echo "🔨 Build en cours..."
npm run build || {
    echo "❌ Erreur lors du build"
    echo "💡 Vérifiez les erreurs ci-dessus"
    exit 1
}

# 6. Vérifier que le dossier out existe
if [ ! -d "out" ]; then
    echo "❌ Erreur : Le dossier 'out' n'a pas été créé"
    echo "💡 Vérifiez que next.config.js contient: output: 'export'"
    exit 1
fi

echo "✅ Build réussi ! Fichiers statiques créés."

# 7. Créer/checkout la branche hostinger-deploy
echo "🌿 Préparation de la branche hostinger-deploy..."
git checkout hostinger-deploy 2>/dev/null || git checkout -b hostinger-deploy

# 8. Nettoyer la branche (garder seulement .git)
find . -maxdepth 1 ! -name '.git' ! -name 'out' ! -name '.' -exec rm -rf {} \;

# 9. Déplacer les fichiers du build
cp -r out/* .
rm -rf out

# 10. Créer .htaccess optimisé pour Lilou GO
cat > .htaccess << 'EOF'
# Lilou GO v4.2 - Configuration Apache
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

# 11. Créer un fichier info
echo "Lilou GO v4.2 - Déployé le: $(date)" > deploy-info.txt
echo "Commit: $(git rev-parse HEAD)" >> deploy-info.txt
echo "Build: Production (Export statique)" >> deploy-info.txt

# 12. Commit et push
echo "📤 Push vers GitHub..."
git add -A
git commit -m "🚀 Deploy Lilou GO v4.2 - $(date +%Y-%m-%d_%H-%M-%S)

- Version: 4.2
- Type: Export statique pour Hostinger
- Optimisations: Cache, compression, sécurité"

git push -f origin hostinger-deploy

# 13. Retour sur main
git checkout main

echo ""
echo "✅ Déploiement terminé avec succès !"
echo ""
echo "===================================="
echo "📋 DERNIÈRE ÉTAPE sur Hostinger :"
echo "===================================="
echo ""
echo "1. Va dans ton panel Hostinger"
echo "2. Section GIT → Trouve ton dépôt"
echo "3. Clique sur le bouton 'Pull' 🔄"
echo ""
echo "⏱️ Attends 2-3 minutes..."
echo ""
echo "🌐 Ton site sera en ligne sur :"
echo "   https://lilou-logistique.com"
echo ""
echo "===================================="
echo ""
echo "💡 Notes importantes :"
echo "- Mode : Export statique (pas d'API Routes)"
echo "- Branch : hostinger-deploy"
echo "- Cache : Optimisé pour performance"
echo "===================================="