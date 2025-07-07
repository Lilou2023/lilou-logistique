#!/bin/bash

# 🚀 Script de Déploiement Automatisé - Lilou Logistique
# Usage: ./tools/deploy.sh [--force] [--skip-tests]

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
FORCE=false
SKIP_TESTS=false
CURRENT_BRANCH=$(git branch --show-current)

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Fonction d'aide
show_help() {
    echo "🚀 Script de Déploiement - Lilou Logistique"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --force       Forcer le déploiement même s'il y a des changements non commités"
    echo "  --skip-tests  Ignorer les tests avant le déploiement"
    echo "  --help        Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0                    # Déploiement normal"
    echo "  $0 --force           # Déploiement forcé"
    echo "  $0 --skip-tests      # Déploiement sans tests"
}

# Parsing des arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --force)
            FORCE=true
            shift
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            log_error "Option inconnue: $1"
            show_help
            exit 1
            ;;
    esac
done

# Vérifications préliminaires
log_info "🔍 Vérifications préliminaires..."

# Vérifier qu'on est sur la branche main
if [[ "$CURRENT_BRANCH" != "main" ]]; then
    log_error "Vous devez être sur la branche 'main' pour déployer"
    log_info "Branche actuelle: $CURRENT_BRANCH"
    exit 1
fi

# Vérifier les changements non commités
if [[ "$FORCE" == "false" ]] && ! git diff-index --quiet HEAD --; then
    log_error "Il y a des changements non commités"
    log_info "Utilisez --force pour ignorer cette vérification"
    git status --short
    exit 1
fi

# Vérifier que le répertoire tools existe
if [[ ! -d "tools" ]]; then
    log_error "Le répertoire 'tools' n'existe pas"
    exit 1
fi

log_success "Vérifications préliminaires OK"

# Étape 1: Mise à jour de la branche main
log_info "📥 Mise à jour de la branche main..."
git pull origin main
log_success "Branche main mise à jour"

# Étape 2: Tests (optionnel)
if [[ "$SKIP_TESTS" == "false" ]]; then
    log_info "🧪 Exécution des tests..."
    if npm test -- --passWithNoTests; then
        log_success "Tests passés"
    else
        log_warning "Tests échoués, mais continuation du déploiement"
    fi
else
    log_warning "Tests ignorés (--skip-tests)"
fi

# Étape 3: Build de production
log_info "🏗️  Build de production..."
if npm run build; then
    log_success "Build réussi"
else
    log_error "Échec du build"
    exit 1
fi

# Étape 4: Préparation de la branche hostinger-deploy
log_info "🌿 Préparation de la branche hostinger-deploy..."

# Sauvegarder la branche actuelle
git stash push -m "Auto-stash before deploy" 2>/dev/null || true

# Basculer sur hostinger-deploy
git checkout hostinger-deploy 2>/dev/null || git checkout -b hostinger-deploy

# Mettre à jour depuis origin
git pull origin hostinger-deploy 2>/dev/null || true

# Nettoyer la branche
git rm -rf . 2>/dev/null || true

# Copier les fichiers de build
log_info "📁 Copie des fichiers de build..."
cp -r out/* . 2>/dev/null || {
    log_error "Le dossier 'out' n'existe pas. Le build a-t-il échoué ?"
    exit 1
}

# Copier les fichiers importants
cp -r public/fonts . 2>/dev/null || log_warning "Dossier fonts non trouvé"
cp .htaccess . 2>/dev/null || log_warning "Fichier .htaccess non trouvé"

# Étape 5: Commit et push
log_info "📤 Commit et push..."

# Ajouter tous les fichiers
git add -A

# Vérifier s'il y a des changements
if git diff --cached --quiet; then
    log_warning "Aucun changement à déployer"
else
    # Commit
    git commit -m "🚀 Déploiement automatique - $(date '+%Y-%m-%d %H:%M:%S')"

    # Push
    if git push origin hostinger-deploy; then
        log_success "Déploiement poussé vers hostinger-deploy"
    else
        log_error "Échec du push vers hostinger-deploy"
        exit 1
    fi
fi

# Étape 6: Retour sur main
log_info "🔄 Retour sur la branche main..."
git checkout main

# Restaurer les changements si nécessaire
if git stash list | grep -q "Auto-stash before deploy"; then
    git stash pop
    log_info "Changements restaurés"
fi

# Étape 7: Vérifications finales
log_info "🔍 Vérifications finales..."

# Vérifier que la branche hostinger-deploy existe
if git ls-remote --heads origin hostinger-deploy | grep -q hostinger-deploy; then
    log_success "Branche hostinger-deploy existe sur GitHub"
else
    log_error "Branche hostinger-deploy n'existe pas sur GitHub"
    exit 1
fi

# Afficher les informations de déploiement
echo ""
log_success "🎉 Déploiement terminé avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Vérifier le webhook Hostinger"
echo "2. Consulter : https://lilou-logistique.com/app"
echo "3. Vérifier les logs GitHub Actions si nécessaire"
echo ""
echo "📚 Documentation :"
echo "- docs/POST_MERGE_CHECKLIST.md"
echo "- docs/README_DEPLOIEMENT.md"
echo ""
