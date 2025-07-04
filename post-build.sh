#!/bin/bash

# Script de post-build pour préparer le déploiement

echo "🚀 Préparation du déploiement..."

# Copier les fichiers nécessaires dans dist
echo "📁 Copie des fichiers de configuration..."
cp .htaccess dist/ 2>/dev/null || echo "⚠️ .htaccess non trouvé"
cp public/manifest.json dist/ 2>/dev/null || echo "⚠️ manifest.json non trouvé"

# Créer un fichier de version
echo "📝 Création du fichier de version..."
echo "{
  \"version\": \"$(date +%Y%m%d_%H%M%S)\",
  \"buildDate\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",
  \"commit\": \"$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')\"
}" > dist/version.json

# Optimiser les images si possible
if command -v optipng &> /dev/null; then
  echo "🖼️ Optimisation des images PNG..."
  find dist -name "*.png" -exec optipng -o2 {} \;
fi

# Créer un fichier README pour l'hébergeur
echo "📋 Création du fichier README..."
cat > dist/README_DEPLOYMENT.txt << EOF
LILOU LOGISTIQUE - Instructions de Déploiement
============================================

1. Tous les fichiers de ce dossier doivent être copiés dans public_html/
2. Assurez-vous que mod_rewrite est activé sur le serveur
3. Le fichier .htaccess contient toutes les règles nécessaires
4. L'application est une SPA (Single Page Application)
5. Toutes les routes doivent rediriger vers index.html

Configuration requise:
- PHP 7.4+ (pour les futures API)
- Apache avec mod_rewrite
- SSL/HTTPS activé

Support: support@lilou-logistique.com
EOF

echo "✅ Build prêt pour le déploiement !"
echo "📦 Taille du build: $(du -sh dist | cut -f1)"
echo "📄 Nombre de fichiers: $(find dist -type f | wc -l)"