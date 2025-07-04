#!/bin/bash

echo "🚀 Déploiement rapide sur Hostinger"
echo "==================================="

# 1. Vérifier qu'on est sur main
git checkout main 2>/dev/null || {
    echo "⚠️  Création de la branche main..."
    git checkout -b main
}

# 2. Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# 3. Build du projet
echo "🔨 Build en cours..."
npm run build

# 4. Créer/checkout la branche hostinger-deploy
echo "📤 Préparation du déploiement..."
git checkout hostinger-deploy 2>/dev/null || git checkout -b hostinger-deploy

# 5. Nettoyer la branche
find . -maxdepth 1 ! -name '.git' ! -name 'dist' ! -name '.' -exec rm -rf {} \;

# 6. Copier les fichiers du build
if [ -d "dist" ]; then
    cp -r dist/* .
    rm -rf dist
else
    echo "❌ Erreur : Le dossier dist n'existe pas après le build"
    git checkout main
    exit 1
fi

# 7. Ajouter un fichier .htaccess pour la configuration Apache
cat > .htaccess << 'EOF'
# Forcer HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Empêcher le listing des répertoires
Options -Indexes

# Configuration pour SPA (Single Page Application)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
</IfModule>
EOF

# 8. Commit et push
git add -A
git commit -m "Deploy: $(date +%Y-%m-%d_%H-%M-%S)"
git push -f origin hostinger-deploy

# 9. Retour sur main
git checkout main

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "📋 Prochaine étape sur Hostinger :"
echo "   1. Va dans la section GIT"
echo "   2. Clique sur le bouton 'Pull' ou 'Synchroniser' 🔄"
echo "   3. Attends 1-2 minutes"
echo ""
echo "🌐 Ton site sera disponible sur : https://lilou-logistique.com"
echo ""