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
HOSTINGER_SSH_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDULDMx2iSXlJ5mo9cPIm1LJ5OFGB5atXuLFkR53Mqy6Lla3vAZKbP0Np2LhgXOxCxjku1p66NRND+A3CqGVOpDGMoiAEFWKrjHkJPFgokB956MDFopvHJ4zQkbX4ubMe/6j6dkht4Web9QxzPFWcUeCFihkmydAdEEFvDyfYiqS5X1JRVgRYjp5ISddws7Wl9T2ivP2hAM40Fz5e1nPGX8vJ/yzy7GHYD0g01NVdndZHnfu+UwDHhL7+4mpJdkCFNWpDlUZIyrbiE0kAfYaisOrewChq0b5ZMmhK0TiuCvVoTRmmTsp92TVwr7cApyxyWq0gGtq44tUtJqESSrAq1BL/SIo+X0d6fcKd7qffxnz2rhL28UoVLQr+1HikJwEh1Wbdbh4g3vGuj1XQLzMG4LG6ezIfluEnDRB8uvRq6NIJi/4j/TLpTPbKZ5jzN6hHOe9u76FmmeSAHzKQUnc49LVQaG2D/E0/hS5+C6EeHL/l9sQf6D/xUV/STUOQ2arek= u240832595@fr-int-web1588.main-hosting.eu"

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
echo "NEXT_PUBLIC_SUPABASE_URL=https://mvhogfelpbufnrklxpxq.supabase.co"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjQ0MDksImV4cCI6MjA2NDMwMDQwOX0.FrVdKelHzLgJFGFwnYfA23XsbzgrK6PCsSV01a1qM5I"
echo "SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcyNDQwOSwiZXhwIjoyMDY0MzAwNDA5fQ.keTkB1muKnhNK3TkDrOcdG6vjQJKA_OYDIUSIUPDfSM"
echo "OPENAI_API_KEY=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"
echo "JWT_SECRET=UiuSVGy6+Tzn93GwXa/dcyPBeD+Y9q7f18fwUPL/D1cdYmQQI5K8OjMZh/RlbCErVbgCSL9NqNAPAYVVxzAzPA=="
echo "NEXTAUTH_SECRET=ytvqKJNF+DHMZXHeipda6n+DGVOKYWz2+5MoUiN/I6ED7v65kwboamNyN1Q="
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