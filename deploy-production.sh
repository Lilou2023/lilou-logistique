#!/bin/bash

# Script de déploiement en production vers Hostinger
# Lilou Logistique - Production Deployment

echo "🚀 Déploiement en production vers Hostinger..."

# Vérifier si le script de déploiement Hostinger existe
if [ -f "deploy-hostinger.sh" ]; then
    echo "✅ Script de déploiement Hostinger trouvé"
    ./deploy-hostinger.sh
else
    echo "❌ Script de déploiement Hostinger non trouvé"
    echo "💡 Suggestion: Utilisez le workflow GitHub Actions:"
    echo "   gh workflow run 'Deploy Lilou Logistique to Hostinger'"
    exit 1
fi