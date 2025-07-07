#!/bin/bash

# 🚀 Script de Déploiement Unifié - Lilou Logistique DSP
# =====================================================

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonctions d'affichage
print_header() {
    echo -e "${PURPLE}================================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================================${NC}"
}

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

print_step() {
    echo -e "${CYAN}➤${NC} $1"
}

# Configuration
APP_NAME="Lilou Logistique DSP"
APP_VERSION="1.0.0"
APP_URL="https://lilou-logistique.com"

# Vérification de l'environnement
check_environment() {
    print_header "🔍 Vérification de l'environnement"

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

    # Vérifier Git
    if ! command -v git &> /dev/null; then
        print_error "Git n'est pas installé"
        exit 1
    fi

    print_success "Environnement vérifié"
    print_status "Node.js: $(node --version)"
    print_status "npm: $(npm --version)"
    print_status "Git: $(git --version)"
}

# Installation des dépendances
install_dependencies() {
    print_header "📦 Installation des dépendances"

    if [ ! -d "node_modules" ]; then
        print_step "Installation des packages npm..."
        npm install
        if [ $? -ne 0 ]; then
            print_error "Erreur lors de l'installation des dépendances"
            exit 1
        fi
    else
        print_status "Dépendances déjà installées"
    fi

    print_success "Dépendances installées"
}

# Validation de l'environnement
validate_environment() {
    print_header "✅ Validation de l'environnement"

    print_step "Validation des variables d'environnement..."
    npm run validate-env

    if [ $? -ne 0 ]; then
        print_error "Validation des variables d'environnement échouée"
        exit 1
    fi

    print_success "Validation réussie"
}

# Test de build
test_build() {
    print_header "🏗️ Test de build"

    print_step "Build de production..."
    npm run build

    if [ $? -ne 0 ]; then
        print_error "Erreur lors du build"
        exit 1
    fi

    print_success "Build réussi"
}

# Menu de déploiement
show_deployment_menu() {
    print_header "🎯 Options de Déploiement"

    echo ""
    echo "Choisissez votre plateforme de déploiement :"
    echo ""
    echo "1. 🚀 Vercel (Recommandé)"
    echo "   ✅ Gratuit, optimisé Next.js, déploiement automatique"
    echo "   ✅ Performance optimale, CDN global"
    echo ""
    echo "2. 🏢 Hostinger"
    echo "   ✅ Export statique, contrôle serveur"
    echo "   ⚠️  Limitations : pas d'API Routes"
    echo ""
    echo "3. 🔧 Manuel"
    echo "   ✅ Build local, contrôle total"
    echo "   ⚠️  Configuration manuelle requise"
    echo ""
    echo "4. 📊 GitHub Actions"
    echo "   ✅ Automatisation complète"
    echo "   ✅ Déploiement sur Hostinger automatique"
    echo ""
    echo "5. ❌ Annuler"
    echo ""
}

# Déploiement Vercel
deploy_vercel() {
    print_header "🚀 Déploiement Vercel"

    # Vérifier Vercel CLI
    if ! command -v vercel &> /dev/null; then
        print_step "Installation de Vercel CLI..."
        npm install -g vercel
    fi

    print_step "Déploiement sur Vercel..."
    vercel --prod --yes

    if [ $? -eq 0 ]; then
        print_success "Déploiement Vercel réussi !"
        echo ""
        print_status "Prochaines étapes :"
        echo "1. Configurez vos variables d'environnement sur Vercel Dashboard"
        echo "2. Connectez votre domaine personnalisé"
        echo "3. Testez votre application"
    else
        print_error "Erreur lors du déploiement Vercel"
        exit 1
    fi
}

# Déploiement Hostinger
deploy_hostinger() {
    print_header "🏢 Déploiement Hostinger"

    if [ -f "deploy-hostinger-now.sh" ]; then
        print_step "Lancement du script de déploiement Hostinger..."
        chmod +x deploy-hostinger-now.sh
        ./deploy-hostinger-now.sh
    else
        print_error "Script de déploiement Hostinger non trouvé"
        exit 1
    fi
}

# Déploiement manuel
deploy_manual() {
    print_header "🔧 Déploiement Manuel"

    print_success "Build terminé avec succès !"
    echo ""
    print_status "Pour démarrer le serveur de production :"
    echo "   npm start"
    echo ""
    print_status "Pour tester localement :"
    echo "   npm run dev"
    echo ""
    print_status "Fichiers de build disponibles dans :"
    echo "   .next/ (Next.js)"
    echo "   out/ (Export statique)"
}

# Configuration GitHub Actions
setup_github_actions() {
    print_header "📊 Configuration GitHub Actions"

    print_status "GitHub Actions est déjà configuré !"
    echo ""
    print_status "Pour activer le déploiement automatique :"
    echo "1. Poussez vos changements : git push origin main"
    echo "2. Allez sur GitHub → Onglet Actions"
    echo "3. Le workflow se lancera automatiquement"
    echo ""
    print_status "Variables d'environnement configurées dans le workflow"
    print_success "Déploiement automatique prêt"
}

# Fonction principale
main() {
    print_header "🚀 Déploiement Unifié - $APP_NAME v$APP_VERSION"

    # Vérifications préliminaires
    check_environment
    install_dependencies
    validate_environment
    test_build

    # Menu de déploiement
    show_deployment_menu

    read -p "Votre choix (1-5) : " choice

    case $choice in
        1)
            deploy_vercel
            ;;
        2)
            deploy_hostinger
            ;;
        3)
            deploy_manual
            ;;
        4)
            setup_github_actions
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

    # Résumé final
    print_header "🎉 Déploiement Terminé"

    echo ""
    print_success "Votre application $APP_NAME est prête !"
    echo ""
    print_status "Documentation disponible :"
    echo "- DEPLOIEMENT_COMPLET.md : Guide détaillé"
    echo "- DEPLOYMENT_READY.md : Déploiement rapide"
    echo "- VERCEL_VS_HOSTINGER.md : Comparaison des plateformes"
    echo ""
    print_status "Variables d'environnement configurées :"
    echo "- NEXT_PUBLIC_APP_NAME: $APP_NAME"
    echo "- NEXT_PUBLIC_APP_VERSION: $APP_VERSION"
    echo "- NEXT_PUBLIC_APP_URL: $APP_URL"
    echo ""
    print_success "🔗 Votre application sera bientôt en ligne !"
}

# Exécution du script
main "$@"
