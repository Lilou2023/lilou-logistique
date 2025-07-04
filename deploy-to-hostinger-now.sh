#!/bin/bash

echo "🚀 Déploiement immédiat sur Hostinger"
echo "===================================="
echo ""

# Étape 1: Retour sur main
echo "📌 Étape 1: Préparation..."
git checkout main 2>/dev/null || git checkout -b main

# Étape 2: Installation des dépendances
echo ""
echo "📦 Étape 2: Installation des dépendances..."
if [ ! -d "node_modules" ]; then
    npm install || {
        echo "❌ Erreur: npm install a échoué"
        echo "Installez Node.js et npm puis relancez le script"
        exit 1
    }
fi

# Étape 3: Configuration pour export statique
echo ""
echo "⚙️  Étape 3: Configuration Next.js pour export statique..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
}

module.exports = nextConfig
EOF

# Étape 4: Build statique
echo ""
echo "🔨 Étape 4: Build de l'application..."
npm run build || {
    echo "❌ Erreur lors du build"
    exit 1
}

# Étape 5: Préparer la branche hostinger-deploy
echo ""
echo "🌿 Étape 5: Préparation de la branche de déploiement..."
git checkout hostinger-deploy || git checkout -b hostinger-deploy

# Nettoyer tous les fichiers sauf .git
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# Copier les fichiers buildés
if [ -d "../out" ]; then
    cp -r ../out/* . 2>/dev/null
else
    cp -r out/* . 2>/dev/null || {
        echo "❌ Erreur: Dossier 'out' introuvable"
        exit 1
    }
fi

# Créer un .htaccess optimisé
cat > .htaccess << 'EOF'
# Configuration Apache pour Next.js statique sur Hostinger
Options -MultiViews -Indexes
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Gérer les routes Next.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^([^/]+)/?$ $1.html [L]

# Fallback pour les routes non trouvées
ErrorDocument 404 /404.html

# Headers de sécurité
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
EOF

# Créer un fichier info
cat > deployment-info.txt << EOF
Déployé le : $(date)
Branche source : main
Build : Next.js Static Export
EOF

# Étape 6: Commit et push
echo ""
echo "💾 Étape 6: Déploiement sur GitHub..."
git add -A
git commit -m "🚀 Déploiement statique - $(date '+%Y-%m-%d %H:%M:%S')" || {
    echo "⚠️  Aucun changement à déployer"
}

git push -f origin hostinger-deploy || {
    echo "❌ Erreur lors du push"
    exit 1
}

# Retour sur main
git checkout main

echo ""
echo "===================================="
echo "✅ Déploiement réussi !"
echo "===================================="
echo ""
echo "📋 Actions finales sur Hostinger :"
echo ""
echo "1. Allez dans le panel Hostinger"
echo "2. Section GIT de votre site"
echo "3. Si pas encore configuré :"
echo "   - Dépôt : git@github.com:Lilou2023/lilou-logistique.git"
echo "   - Branche : hostinger-deploy"
echo "   - Répertoire : (vide)"
echo ""
echo "4. Cliquez sur 'Pull' ou 'Synchroniser'"
echo ""
echo "🌐 Votre site sera accessible dans quelques minutes !"
echo "===================================="