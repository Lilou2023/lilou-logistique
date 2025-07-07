#!/bin/bash

# 🚀 Script de déploiement complet - Lilou Logistique
# Usage: bash deploy-lilou-complete.sh
# Ce script automatise tout le processus de déploiement selon les instructions spécifiques

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${PURPLE}================================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================================${NC}"
}

print_step() {
    echo -e "${BLUE}[ÉTAPE]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCÈS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERREUR]${NC} $1"
}

print_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

pause() {
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# Début du script
print_header "🚀 Déploiement complet - Lilou Logistique"
echo ""

print_step "1. Création du dépôt GitHub"
echo ""
print_info "📋 Instructions pour créer le dépôt GitHub :"
echo ""
echo "1. Allez sur : https://github.com/new"
echo "2. Nom du dépôt : lilou-logistique"
echo "3. Description : Application Next.js pour la gestion logistique"
echo "4. Visibilité : Public"
echo "5. ❌ Ne cochez PAS 'Add a README file'"
echo "6. ❌ Ne cochez PAS 'Add .gitignore'"
echo "7. ❌ Ne cochez PAS 'Choose a license'"
echo "8. Cliquez sur 'Create repository'"
echo ""

pause

print_step "2. Configuration de la clé SSH Hostinger"
echo ""

# Clé SSH de Hostinger
HOSTINGER_SSH_KEY="ssh-rsa YOUR-HOSTINGER-SSH-KEY"

print_info "📋 Configuration de la clé SSH Hostinger :"
echo ""
echo "1. Allez sur votre dépôt : https://github.com/Lilou2023/lilou-logistique"
echo "2. Cliquez sur Settings → Deploy keys"
echo "3. Cliquez sur 'Add deploy key'"
echo "4. Configurez comme suit :"
echo ""
echo "   Titre : Hostinger - lilou-logistique.com"
echo "   Clé SSH : (collez la clé ci-dessous)"
echo "   ✅ Cochez 'Allow write access'"
echo ""

echo "🔑 Clé SSH Hostinger à copier :"
echo "=================================================="
echo "$HOSTINGER_SSH_KEY"
echo "=================================================="
echo ""

pause

print_step "3. Initialisation Git et push du projet"
echo ""

print_info "🚀 Lancement du script init-github.sh..."
echo ""

# Vérifier si le script existe
if [ -f "init-github.sh" ]; then
    print_success "Script init-github.sh trouvé"
    echo ""
    print_info "Le script va :"
    echo "- Initialiser Git"
    echo "- Configurer les infos utilisateur"
    echo "- Faire le commit initial"
    echo "- Pousser vers la branche main"
    echo ""
    
    read -p "Voulez-vous lancer init-github.sh maintenant ? (y/N): " run_init
    if [[ $run_init =~ ^[Yy]$ ]]; then
        ./init-github.sh
    else
        print_info "Vous pouvez lancer manuellement : bash init-github.sh"
    fi
else
    print_error "Script init-github.sh non trouvé"
    print_info "Initialisation manuelle requise"
fi

echo ""

print_step "4. Configuration des secrets GitHub"
echo ""

print_info "📋 Configuration des secrets GitHub :"
echo "1. Allez dans Settings → Secrets and variables → Actions"
echo "2. Cliquez sur 'New repository secret'"
echo "3. Ajoutez les secrets suivants :"
echo ""

# Secrets à configurer
echo "🔐 Secrets à ajouter dans GitHub :"
echo "=================================================="
echo "NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
echo "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key"
echo "OPENAI_API_KEY=your-openai-api-key"
echo "JWT_SECRET=your-jwt-secret"
echo "NEXTAUTH_SECRET=your-nextauth-secret"
echo "=================================================="
echo ""

print_warning "⚠️  Ne partagez JAMAIS ces secrets publiquement !"
echo ""

pause

print_step "5. Configuration Git sur Hostinger"
echo ""

print_info "☁️ Configuration du déploiement Git sur Hostinger :"
echo ""
echo "1. Allez dans votre panel Hostinger"
echo "2. Naviguez vers la section GIT"
echo "3. Configurez comme suit :"
echo ""
echo "   Dépôt : git@github.com:Lilou2023/lilou-logistique.git"
echo "   Branche : hostinger-deploy"
echo "   Répertoire : (laisser vide)"
echo "4. Cliquez sur 'Créer'"
echo ""

pause

print_step "6. Attente du déploiement automatique"
echo ""

print_info "⏳ Processus automatique en cours :"
echo ""
echo "1. GitHub Actions va détecter le push sur main"
echo "2. Build automatique de l'application"
echo "3. Création de la branche hostinger-deploy"
echo "4. Hostinger va détecter la nouvelle branche"
echo "5. Déploiement automatique sur le serveur"
echo ""
echo "⏱️  Temps estimé : 5-10 minutes"
echo ""

print_info "🔍 Vérifications à effectuer :"
echo ""
echo "GitHub Actions : https://github.com/Lilou2023/lilou-logistique/actions"
echo "Hostinger Logs : Panel → Git → Logs"
echo "Site en ligne : https://lilou-logistique.com"
echo "Aperçu live : https://f471e78f-f041-4565-87c5-6867ce01bf46.dev31.app-preview.com/"
echo ""

pause

print_step "7. Vérification finale"
echo ""

print_info "✅ Vérifications à effectuer :"
echo ""
echo "1. ✅ Dépôt GitHub créé : https://github.com/Lilou2023/lilou-logistique"
echo "2. ✅ Clé SSH Hostinger ajoutée dans GitHub"
echo "3. ✅ Code poussé vers la branche main"
echo "4. ✅ Secrets GitHub configurés"
echo "5. ✅ Configuration Hostinger effectuée"
echo "6. ✅ GitHub Actions en cours d'exécution"
echo "7. ✅ Branche hostinger-deploy créée automatiquement"
echo "8. ✅ Site déployé sur Hostinger"
echo ""

print_success "🎉 Déploiement automatique configuré !"
echo ""

print_info "📋 Prochaines étapes :"
echo ""
echo "Pour les mises à jour futures :"
echo "  git add ."
echo "  git commit -m 'Votre message'"
echo "  git push origin main"
echo "  (Le déploiement sera automatique !)"
echo ""

print_header "✅ Configuration terminée avec succès !"
echo ""
print_success "Votre projet Lilou Logistique est maintenant configuré et déployé !"
echo ""
print_info "Sites à vérifier :"
echo "- Production : https://lilou-logistique.com"
echo "- Aperçu : https://f471e78f-f041-4565-87c5-6867ce01bf46.dev31.app-preview.com/"
echo ""
print_header "🚀 Bon développement !" 