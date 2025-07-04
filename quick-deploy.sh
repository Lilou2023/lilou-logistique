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

# 3. Configurer Next.js pour export statique
echo "⚙️  Configuration pour export statique..."
cat > next.config.js << 'EOF'
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true
}
EOF

# 4. Build
echo "🔨 Build en cours..."
npm run build

# 5. Déployer sur hostinger-deploy
echo "📤 Déploiement..."
git checkout hostinger-deploy 2>/dev/null || git checkout -b hostinger-deploy

# Nettoyer et copier les fichiers
rm -rf !(out|.git)
cp -r out/* .
rm -rf out

# Ajouter .htaccess
cat > .htaccess << 'EOF'
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
Options -Indexes
EOF

# Commit et push
git add -A
git commit -m "Deploy $(date +%Y-%m-%d-%H:%M:%S)"
git push -f origin hostinger-deploy

# Retour sur main
git checkout main

echo ""
echo "✅ Déployé ! Allez sur Hostinger et cliquez sur 'Pull'"
echo "🌐 Site : https://lilou-logistique.com"