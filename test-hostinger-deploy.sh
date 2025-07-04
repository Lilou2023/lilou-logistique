#!/bin/bash

# Script de test pour déclencher le déploiement Hostinger
# Lilou Logistique - Hostinger Deployment Test

echo "🧪 Test du déploiement Hostinger..."

# Créer un commit vide pour déclencher le workflow
echo "📝 Création d'un commit vide pour déclencher le workflow..."
git commit --allow-empty -m "♻️ Déclenchement du workflow Hostinger"

if [ $? -eq 0 ]; then
    echo "✅ Commit vide créé avec succès"
    
    # Pousser vers la branche principale
    echo "⬆️ Push vers origin/main..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Push réussi!"
        echo ""
        echo "🎯 Actions suivantes:"
        echo "1. Aller sur GitHub → Actions → 'Deploy Lilou Logistique to Hostinger'"
        echo "2. Cliquer sur 'Run workflow'"
        echo "3. Vérifier le déploiement"
        echo ""
        echo "🔗 Lien direct: https://github.com/Lilou2023/lilou-logistique/actions"
        echo ""
    else
        echo "❌ Erreur lors du push"
        exit 1
    fi
else
    echo "❌ Erreur lors de la création du commit"
    exit 1
fi