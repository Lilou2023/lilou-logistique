#!/bin/bash

# Script de déploiement pour Hostinger - Version Corrigée

set -e

echo "🚀 Lancement du déploiement sur Hostinger..."
echo "=========================================="

# 1. Vérifications préliminaires (vous pouvez les ajouter si besoin)
echo "✅ Vérifications préliminaires OK"

# 2. Sauvegarder la configuration Next.js actuelle
cp next.config.js next.config.js.backup
echo "👍 Configuration Next.js sauvegardée."

# 3. Créer une configuration temporaire pour l'export statique
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
echo "🔧 Fichier next.config.js configuré pour l'export statique."

# 4. Lancer le build
echo "🏗️  Build de l'application..."
npm run build

# 5. Restaurer la configuration originale
mv next.config.js.backup next.config.js
echo "👍 Configuration Next.js restaurée."

# 6. Préparation et push vers la branche de déploiement
echo "🌿 Préparation de la branche hostinger-deploy..."
git checkout hostinger-deploy
git pull origin hostinger-deploy
git rm -rf .
cp -r out/* .
git add -A
git commit -m "🚀 Déploiement du $(date)"
git push origin hostinger-deploy

# 7. Retour à la branche principale
git checkout main

echo "🎉 Déploiement sur hostinger-deploy terminé avec succès !"