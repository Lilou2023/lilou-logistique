#!/bin/bash

# 🚀 Script pour configurer et valider l'environnement de développement local

set -e

echo "🔧 Préparation de l'environnement de développement pour Lilou Logistique..."
echo "------------------------------------------------------------------"

# 1. Installation des dépendances
echo "📦 Installation des dépendances (npm install)..."
npm install
echo "✅ Dépendances installées."
echo ""

# 2. Correction des vulnérabilités
echo "🔒 Correction des vulnérabilités de sécurité (npm audit fix)..."
npm audit fix --force
echo "✅ Audit de sécurité terminé."
echo ""

# 3. Création du fichier .env.local
if [ ! -f ".env.local" ]; then
    echo "📝 Le fichier .env.local n'existe pas. Création à partir de .env.example..."
    cp .env.example .env.local
    echo "✅ Fichier .env.local créé. N'oubliez pas de le remplir avec vos clés secrètes !"
else
    echo "👍 Le fichier .env.local existe déjà."
fi
echo ""

# 4. Validation de l'environnement
echo "🔍 Validation des variables d'environnement (npm run validate-env)..."
npm run validate-env
echo "✅ Environnement validé."
echo ""

# 5. Lancement des tests
echo "🧪 Lancement des tests unitaires (npm test)..."
npm run test
echo "✅ Tests terminés."
echo ""

echo "------------------------------------------------------------------"
echo "🎉 Votre environnement de développement est prêt ! Vous pouvez lancer 'npm run dev'."
echo "------------------------------------------------------------------"
