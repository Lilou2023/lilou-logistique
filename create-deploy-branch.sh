#!/bin/bash

# Script pour créer rapidement la branche hostinger-deploy
echo "🚀 Création de la branche hostinger-deploy..."

# Sauvegarder la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)

# Créer et pousser la branche
git checkout -b hostinger-deploy 2>/dev/null || git checkout hostinger-deploy
echo "📄 Ajout d'un fichier temporaire..."
echo "Déploiement en cours..." > index.html
git add index.html
git commit -m "Initial deployment" 2>/dev/null || echo "✅ Déjà committé"
git push -u origin hostinger-deploy

# Retourner à la branche d'origine
git checkout $CURRENT_BRANCH

echo "✅ Branche hostinger-deploy créée !"
echo "👉 Retournez sur Hostinger et cliquez sur 'Pull'" 