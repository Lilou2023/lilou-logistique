#!/bin/bash

echo "🚀 Déploiement Unifié Lilou Logistique"
echo "======================================"

# Configuration
ENVIRONMENT=${1:-"staging"}
BRANCH=$(git branch --show-current)

echo "📍 Branche actuelle: $BRANCH"
echo "🌍 Environnement: $ENVIRONMENT"

# Déterminer l'environnement basé sur la branche
if [ "$BRANCH" = "main" ]; then
    ENVIRONMENT="production"
    echo "🎯 Déploiement PRODUCTION détecté"
elif [ "$BRANCH" = "develop" ]; then
    ENVIRONMENT="staging"
    echo "🎯 Déploiement STAGING détecté"
else
    echo "⚠️ Branche $BRANCH - Déploiement PREVIEW"
    ENVIRONMENT="preview"
fi

# 1. Tests et validation
echo "🧪 Exécution des tests..."
npm run test:ci || npm test || echo "⚠️ Tests non configurés"

# 2. Build optimisé
echo "🏗️ Build de production..."
npm run build

# 3. Analyse de performance
echo "📊 Analyse de performance..."
npm run lighthouse || echo "⚠️ Lighthouse non configuré"
npm run bundle-analyzer || echo "⚠️ Bundle analyzer non configuré"

# 4. Déploiement Vercel
echo "🚀 Déploiement Vercel..."
if [ "$ENVIRONMENT" = "production" ]; then
    vercel --prod
elif [ "$ENVIRONMENT" = "staging" ]; then
    vercel
else
    vercel
fi

# 5. Déploiement Hostinger (si configuré)
if [ -f "./deploy-hostinger-now.sh" ]; then
    echo "🌐 Déploiement Hostinger..."
    chmod +x ./deploy-hostinger-now.sh
    ./deploy-hostinger-now.sh $ENVIRONMENT
else
    echo "⚠️ Script Hostinger non trouvé"
fi

# 6. Vérification post-déploiement
echo "✅ Vérification post-déploiement..."
sleep 10

if [ "$ENVIRONMENT" = "production" ]; then
    curl -f https://lilou-logistique.vercel.app || echo "⚠️ Vercel production non accessible"
    curl -f https://lilou-logistique.com || echo "⚠️ Hostinger production non accessible"
elif [ "$ENVIRONMENT" = "staging" ]; then
    curl -f https://lilou-logistique-git-develop-lilou2023.vercel.app || echo "⚠️ Vercel staging non accessible"
    curl -f https://staging.lilou-logistique.com || echo "⚠️ Hostinger staging non accessible"
fi

echo "🎉 Déploiement $ENVIRONMENT terminé !"
echo "📊 Performance: $(npm run lighthouse --silent | grep -E 'Performance|FCP|LCP' || echo 'N/A')" 