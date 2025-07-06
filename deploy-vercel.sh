#!/bin/bash

echo "🚀 Déploiement Lilou Logistique sur Vercel"
echo "=========================================="

# 1. Vérifier que nous sommes sur la bonne branche
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branche actuelle: $CURRENT_BRANCH"

# 2. Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# 3. Vérifier la configuration
echo "🔍 Vérification de la configuration..."
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json manquant"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ package.json manquant"
    exit 1
fi

# 4. Test de build local
echo "🏗️ Test de build local..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build local"
    echo "💡 Vérifiez les erreurs ci-dessus"
    exit 1
fi

echo "✅ Build local réussi !"

# 5. Déploiement sur Vercel
echo "🚀 Déploiement sur Vercel..."

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
fi

# Déployer
vercel --prod --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Déploiement réussi !"
    echo ""
    echo "📋 Prochaines étapes :"
    echo "1. Configurez vos variables d'environnement sur Vercel Dashboard"
    echo "2. Connectez votre domaine personnalisé si nécessaire"
    echo "3. Testez votre application"
    echo ""
    echo "🔗 Votre application sera disponible sur l'URL fournie par Vercel"
else
    echo "❌ Erreur lors du déploiement"
    echo "💡 Vérifiez votre configuration Vercel"
    exit 1
fi 