#!/bin/bash

# 🔑 Script de configuration de la clé SSH Hostinger
# Usage: bash configure-hostinger-ssh.sh

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

print_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

print_header "🔑 Configuration de la clé SSH Hostinger"
echo ""

print_step "Configuration de la clé SSH Hostinger dans GitHub"
echo ""

print_info "📋 Étapes à suivre :"
echo ""
echo "1. Allez sur votre dépôt GitHub : https://github.com/Lilou2023/lilou-logistique"
echo "2. Cliquez sur Settings → Deploy keys"
echo "3. Cliquez sur 'Add deploy key'"
echo "4. Configurez comme suit :"
echo ""
echo "   Titre : Hostinger - lilou-logistique.com"
echo "   Clé SSH : (collez la clé ci-dessous)"
echo "   ✅ Cochez 'Allow write access'"
echo ""

# Clé SSH de Hostinger (depuis vos instructions)
HOSTINGER_SSH_KEY="ssh-rsa YOUR-HOSTINGER-SSH-KEY"

echo "🔑 Clé SSH Hostinger à copier :"
echo "=================================================="
echo "$HOSTINGER_SSH_KEY"
echo "=================================================="
echo ""

print_warning "⚠️  Copiez cette clé complète dans GitHub"
echo ""

read -p "Appuyez sur Entrée quand vous avez ajouté la clé SSH dans GitHub..."

print_success "✅ Clé SSH Hostinger configurée !"
echo ""

print_step "Prochaine étape : Configuration des secrets GitHub"
echo ""

print_info "📋 Maintenant, configurez les secrets GitHub :"
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

read -p "Appuyez sur Entrée quand vous avez ajouté tous les secrets..."

print_success "✅ Secrets GitHub configurés !"
echo ""

print_header "🎉 Configuration GitHub terminée !"
echo ""
print_info "Prochaine étape : Configuration Hostinger"
echo ""
print_info "Dans votre panel Hostinger → Section Git, configurez :"
echo "Dépôt : git@github.com:Lilou2023/lilou-logistique.git"
echo "Branche : hostinger-deploy"
echo "Répertoire : (laisser vide)"
echo ""
print_success "Configuration terminée avec succès !"
