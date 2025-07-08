#!/bin/bash

# Script pour pousser les changements sur 'main' et lancer le déploiement Hostinger

set -e

echo "🚀 Poussée des changements vers la branche 'main'..."

# Tente de pousser les changements
if git push origin main; then
    echo "✅ Push réussi."
    echo ""
    echo "🚀 Lancement du déploiement sur Hostinger..."
    # Lance le script de déploiement existant
    ./tools/deploy.sh --skip-tests
else
    echo "❌ Échec du 'git push'. Le déploiement est annulé."
    exit 1
fi
