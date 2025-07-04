#!/bin/bash

# Script de déploiement pour Hostinger
# Lilou Logistique - Hostinger Deployment Script

echo "🌐 Déploiement Hostinger - Lilou Logistique..."
echo "📍 Branche: hostinger-deploy"
echo "📁 Destination: public_html"

# Vérifier que nous sommes sur la bonne branche
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "hostinger-deploy" ]; then
    echo "❌ Erreur: Vous devez être sur la branche hostinger-deploy"
    echo "🔧 Changement vers hostinger-deploy..."
    git checkout hostinger-deploy
fi

# Build de l'application
echo "🔨 Construction de l'application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Vérifier si le dossier dist existe
if [ ! -d "dist" ]; then
    echo "❌ Erreur: Le dossier dist n'existe pas"
    exit 1
fi

echo "📦 Contenu du build:"
ls -la dist/

# Copier les fichiers vers public_html (simulation)
echo "📁 Préparation des fichiers pour Hostinger..."
echo "📋 Fichiers à déployer:"
find dist -type f -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.png" -o -name "*.svg" -o -name "*.ico" | head -10

echo ""
echo "🎯 Configuration Hostinger requise:"
echo "📍 Repository: git@github.com:Lilou2023/lilou-logistique.git"
echo "🌿 Branche: hostinger-deploy"
echo "📁 Répertoire source: dist/"
echo "📁 Répertoire cible: public_html/"
echo ""
echo "🔑 Étapes manuelles à finaliser:"
echo "1. Ajouter la clé SSH Hostinger dans GitHub (Deploy Keys avec écriture)"
echo "2. Configurer le dépôt sur Hostinger avec ces paramètres"
echo "3. Vérifier que la branche hostinger-deploy est poussée"
echo ""
echo "✅ Déploiement Hostinger préparé!"