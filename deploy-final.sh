#!/bin/bash

echo "🚀 Déploiement Final - Lilou Logistique"
echo "======================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Vérification de l'environnement
print_status "Vérification de l'environnement..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

print_success "Environnement vérifié"

# 2. Installation des dépendances
print_status "Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    print_error "Erreur lors de l'installation des dépendances"
    exit 1
fi

print_success "Dépendances installées"

# 3. Test de build
print_status "Test de build..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Erreur lors du build"
    exit 1
fi

print_success "Build réussi"

# 4. Menu de déploiement
echo ""
echo "🎯 Choisissez votre option de déploiement :"
echo ""
echo "1. 🚀 Vercel (Recommandé - Gratuit, optimisé Next.js)"
echo "2. 🏢 Hostinger (Export statique)"
echo "3. 🔧 Manuel (Build local)"
echo "4. 📊 GitHub Actions (Automatique)"
echo "5. ❌ Annuler"
echo ""

read -p "Votre choix (1-5) : " choice

case $choice in
    1)
        print_status "Déploiement sur Vercel..."
        
        # Vérifier Vercel CLI
        if ! command -v vercel &> /dev/null; then
            print_status "Installation de Vercel CLI..."
            npm install -g vercel
        fi
        
        # Déployer
        vercel --prod --yes
        
        if [ $? -eq 0 ]; then
            print_success "Déploiement Vercel réussi !"
            echo ""
            echo "📋 Prochaines étapes :"
            echo "1. Configurez vos variables d'environnement sur Vercel Dashboard"
            echo "2. Connectez votre domaine personnalisé"
            echo "3. Testez votre application"
        else
            print_error "Erreur lors du déploiement Vercel"
        fi
        ;;
        
    2)
        print_status "Déploiement sur Hostinger..."
        
        if [ -f "deploy-hostinger-now.sh" ]; then
            chmod +x deploy-hostinger-now.sh
            ./deploy-hostinger-now.sh
        else
            print_error "Script de déploiement Hostinger non trouvé"
        fi
        ;;
        
    3)
        print_status "Déploiement manuel..."
        echo ""
        echo "✅ Build terminé avec succès !"
        echo ""
        echo "📋 Pour démarrer le serveur de production :"
        echo "   npm start"
        echo ""
        echo "📋 Pour tester localement :"
        echo "   npm run dev"
        ;;
        
    4)
        print_status "Configuration GitHub Actions..."
        echo ""
        echo "📋 Étapes pour activer GitHub Actions :"
        echo "1. Poussez vos changements : git push origin main"
        echo "2. Allez sur GitHub → Onglet Actions"
        echo "3. Cliquez sur 'Enable workflows' si nécessaire"
        echo "4. Configurez les secrets (voir GITHUB_SECRETS_SETUP.md)"
        echo ""
        echo "🔄 Le déploiement se fera automatiquement à chaque push"
        ;;
        
    5)
        print_status "Déploiement annulé"
        exit 0
        ;;
        
    *)
        print_error "Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé !"
echo ""
echo "📚 Documentation disponible :"
echo "- DEPLOIEMENT_COMPLET.md : Guide détaillé"
echo "- DEPLOYMENT_READY.md : Déploiement rapide"
echo "- VERCEL_VS_HOSTINGER.md : Comparaison des plateformes"
echo ""
echo "🔗 Votre application sera bientôt en ligne !" 
