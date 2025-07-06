#!/bin/bash
set -euo pipefail

# Script d'initialisation GitHub pour Lilou Logistique
# Usage: bash init-github.sh [repo_url]

REPO_URL=${1:-"https://github.com/Lilou2023/lilou-logistique.git"}

echo "🚀 Initialisation du projet Lilou Logistique sur GitHub"
echo "======================================================"

# Vérifier si git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé. Installez-le d'abord."
    exit 1
fi

# Initialiser git si nécessaire
if [ ! -d ".git" ]; then
    echo "📁 Initialisation de Git..."
    git init
else
    echo "✅ Repository Git déjà initialisé"
fi

# Configuration git
echo "⚙️ Configuration Git..."
read -p "Entrez votre nom pour Git: " git_name
read -p "Entrez votre email pour Git: " git_email

git config user.name "$git_name"
git config user.email "$git_email"

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers..."
git add .

# Premier commit
echo "💾 Création du commit initial..."
git commit -m "🎉 Initial commit - Lilou Logistique

- Configuration Next.js avec TypeScript
- Intégration Tailwind CSS
- Configuration pour Supabase et OpenAI
- Scripts de déploiement Hostinger
- GitHub Actions pour CI/CD"

# Ajouter le remote
echo "🔗 Configuration du repository distant..."
git branch -M main
git remote add origin "$REPO_URL" 2>/dev/null || {
    echo "✅ Remote 'origin' déjà configuré"
}

# Push vers GitHub
echo "📤 Push vers GitHub..."
echo ""
echo "⚠️  Assurez-vous d'avoir :"
echo "1. Créé le repository sur GitHub : https://github.com/new"
echo "2. Nom du repository : lilou-logistique"
echo ""
read -p "Appuyez sur Entrée quand c'est fait..."

git push -u origin main || {
    echo ""
    echo "❌ Erreur lors du push. Vérifiez que :"
    echo "1. Le repository existe sur GitHub"
    echo "2. Vous avez les droits d'accès"
    echo "3. L'URL est correcte : $REPO_URL"
    echo ""
    echo "Pour corriger l'URL du remote :"
    echo "git remote set-url origin YOUR_REPO_URL"
    exit 1
}

echo ""
echo "✅ Succès ! Votre code est maintenant sur GitHub"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Ajoutez la clé SSH de Hostinger dans GitHub Settings → Deploy keys"
echo "2. Configurez le déploiement Git dans Hostinger avec :"
echo "   - Dépôt : git@github.com:Lilou2023/lilou-logistique.git"
echo "   - Branche : hostinger-deploy"
echo "   - Répertoire : (vide)"
echo ""
echo "🔄 La branche 'hostinger-deploy' sera créée automatiquement par GitHub Actions"
echo "   dans quelques minutes..."
echo ""
echo "======================================================"
