#!/bin/bash

# 🚀 Script d'installation et de configuration complet - Lilou Logistique
# Usage: bash setup-lilou-logistique.sh
# Ce script automatise toute la configuration du projet depuis l'initialisation Git jusqu'au déploiement Hostinger

set -e

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

# Fonction de vérification
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 n'est pas installé. Veuillez l'installer d'abord."
        exit 1
    fi
}

# Fonction de pause
pause() {
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# Début du script
print_header "🚀 Configuration complète du projet Lilou Logistique"
echo ""

# 1. Vérification des prérequis
print_step "Vérification des prérequis..."
check_command "git"
check_command "node"
check_command "npm"
print_success "Tous les prérequis sont installés"
echo ""

# 2. Configuration Git
print_step "Configuration Git..."

# Initialiser git si nécessaire
if [ ! -d ".git" ]; then
    print_info "Initialisation du dépôt Git..."
    git init
    print_success "Dépôt Git initialisé"
else
    print_info "Dépôt Git déjà initialisé"
fi

# Configuration utilisateur Git
echo ""
print_info "Configuration de l'utilisateur Git :"
read -p "Entrez votre nom pour Git: " git_name
read -p "Entrez votre email pour Git: " git_email

git config user.name "$git_name"
git config user.email "$git_email"
print_success "Configuration Git utilisateur définie"
echo ""

# 3. Configuration de l'environnement
print_step "Configuration de l'environnement..."

# Vérifier si .env.local existe
if [ -f ".env.local" ]; then
    print_warning ".env.local existe déjà"
    read -p "Voulez-vous le remplacer ? (y/N): " replace_env
    if [[ $replace_env =~ ^[Yy]$ ]]; then
        rm .env.local
    else
        print_info "Conservation du fichier .env.local existant"
    fi
fi

# Créer .env.local si nécessaire
if [ ! -f ".env.local" ]; then
    print_info "Création du fichier .env.local..."
    
    # Demander les variables d'environnement
    echo ""
    print_info "Configuration des variables d'environnement :"
    read -p "NEXT_PUBLIC_SUPABASE_URL: " supabase_url
    read -p "NEXT_PUBLIC_SUPABASE_ANON_KEY: " supabase_anon_key
    read -p "SUPABASE_SERVICE_ROLE_KEY: " supabase_service_key
    read -p "OPENAI_API_KEY: " openai_key
    
    # Générer des secrets sécurisés
    jwt_secret=$(openssl rand -base64 32)
    nextauth_secret=$(openssl rand -base64 32)
    
    # Créer le fichier .env.local
    cat > .env.local << EOF
# Configuration Supabase
NEXT_PUBLIC_SUPABASE_URL=$supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=$supabase_service_key

# Configuration OpenAI
OPENAI_API_KEY=$openai_key

# Secrets de sécurité
JWT_SECRET=$jwt_secret
NEXTAUTH_SECRET=$nextauth_secret
NEXTAUTH_URL=http://localhost:3000
EOF
    
    print_success "Fichier .env.local créé"
else
    print_info "Fichier .env.local déjà présent"
fi
echo ""

# 4. Installation des dépendances
print_step "Installation des dépendances..."
npm install
print_success "Dépendances installées"
echo ""

# 5. Validation de l'environnement
print_step "Validation de l'environnement..."
if npm run validate-env; then
    print_success "Environnement validé"
else
    print_error "Erreur lors de la validation de l'environnement"
    exit 1
fi
echo ""

# 6. Tests
print_step "Lancement des tests..."
if npm run test; then
    print_success "Tests passés avec succès"
else
    print_warning "Certains tests ont échoué, mais la configuration continue"
fi
echo ""

# 7. Configuration du dépôt GitHub
print_step "Configuration du dépôt GitHub..."

# Demander l'URL du dépôt
echo ""
print_info "Configuration du dépôt distant :"
echo "1. Créez un nouveau dépôt sur GitHub : https://github.com/new"
echo "   - Nom : lilou-logistique"
echo "   - Visibilité : Public ou Privé"
echo "   - Ne cochez PAS 'Initialize with README'"
echo ""
read -p "Appuyez sur Entrée quand le dépôt est créé..."

read -p "URL du dépôt GitHub (ex: https://github.com/VotreNom/lilou-logistique.git): " repo_url

# Ajouter le remote
git remote add origin "$repo_url" 2>/dev/null || {
    print_info "Remote 'origin' déjà configuré"
}

# 8. Premier commit et push
print_step "Premier commit et push..."

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "🎉 Initial commit - Lilou Logistique

- Configuration Next.js avec TypeScript
- Intégration Tailwind CSS
- Configuration pour Supabase et OpenAI
- Scripts de déploiement Hostinger
- GitHub Actions pour CI/CD"

# Push vers main
git branch -M main
git push -u origin main

print_success "Code poussé vers GitHub"
echo ""

# 9. Configuration des secrets GitHub
print_step "Configuration des secrets GitHub..."

echo ""
print_info "📋 Configuration des secrets GitHub :"
echo "Allez sur votre dépôt GitHub : $repo_url"
echo "Puis : Settings → Secrets and variables → Actions"
echo ""
echo "Ajoutez les secrets suivants :"
echo ""

# Afficher les secrets à ajouter
if [ -f ".env.local" ]; then
    echo "Secrets à ajouter dans GitHub :"
    echo "================================"
    grep -E "^(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY|SUPABASE_SERVICE_ROLE_KEY|OPENAI_API_KEY|JWT_SECRET|NEXTAUTH_SECRET)=" .env.local | while IFS='=' read -r key value; do
        echo "$key"
    done
    echo ""
    print_warning "⚠️  Ne partagez JAMAIS ces secrets publiquement !"
else
    print_error "Fichier .env.local non trouvé"
fi

pause

# 10. Configuration de la clé SSH Hostinger
print_step "Configuration de la clé SSH Hostinger..."

echo ""
print_info "🔑 Configuration de la clé SSH Hostinger :"
echo "1. Dans votre panel Hostinger, allez dans la section Git"
echo "2. Copiez la clé SSH fournie par Hostinger"
echo "3. Sur GitHub : Settings → Deploy keys"
echo "4. Cliquez sur 'Add deploy key'"
echo "5. Titre : Hostinger - lilou-logistique.com"
echo "6. Collez la clé SSH"
echo "7. ✅ Cochez 'Allow write access'"
echo "8. Cliquez sur 'Add key'"
echo ""

# Afficher la clé SSH exemple (depuis la documentation)
echo "Exemple de clé SSH (à remplacer par celle de votre Hostinger) :"
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDULDMx2iSXlJ5mo9cPIm1LJ5OFGB5atXuLFkR53Mqy6Lla3vAZKbP0Np2LhgXOxCxjku1p66NRND+A3CqGVOpDGMoiAEFWKrjHkJPFgokB956MDFopvHJ4zQkbX4ubMe/6j6dkht4Web9QxzPFWcUeCFihkmydAdEEFvDyfYiqS5X1JRVgRYjp5ISddws7Wl9T2ivP2hAM40Fz5e1nPGX8vJ/yzy7GHYD0g01NVdndZHnfu+UwDHhL7+4mpJdkCFNWpDlUZIyrbiE0kAfYaisOrewChq0b5ZMmhK0TiuCvVoTRmmTsp92TVwr7cApyxyWq0gGtq44tUtJqESSrAq1BL/SIo+X0d6fcKd7qffxnz2rhL28UoVLQr+1HikJwEh1Wbdbh4g3vGuj1XQLzMG4LG6ezIfluEnDRB8uvRq6NIJi/4j/TLpTPbKZ5jzN6hHOe9u76FmmeSAHzKQUnc49LVQaG2D/E0/hS5+C6EeHL/l9sQf6D/xUV/STUOQ2arek= u240832595@fr-int-web1588.main-hosting.eu"
echo ""

pause

# 11. Configuration Hostinger
print_step "Configuration Hostinger..."

echo ""
print_info "☁️ Configuration du déploiement Git sur Hostinger :"
echo "Dans le panel Hostinger → Section Git, configurez :"
echo ""
echo "Dépôt : git@github.com:$(echo $repo_url | sed 's|https://github.com/||' | sed 's|.git||').git"
echo "Branche : hostinger-deploy"
echo "Répertoire : (laisser vide)"
echo ""
echo "Puis cliquez sur 'Créer'"
echo ""

pause

# 12. Instructions finales
print_step "Instructions finales..."

echo ""
print_success "🎉 Configuration initiale terminée !"
echo ""
print_info "📋 Prochaines étapes :"
echo ""
echo "1. ✅ Attendez que GitHub Actions crée la branche 'hostinger-deploy'"
echo "   (environ 5-10 minutes après le push)"
echo ""
echo "2. ✅ Vérifiez le déploiement :"
echo "   - GitHub Actions : $repo_url/actions"
echo "   - Hostinger : Panel → Git → Logs"
echo ""
echo "3. ✅ Votre site sera accessible sur votre domaine Hostinger"
echo ""
echo "🔄 Pour les mises à jour futures :"
echo "   git add ."
echo "   git commit -m 'Votre message'"
echo "   git push origin main"
echo "   (Le déploiement sera automatique !)"
echo ""

# 13. Commandes utiles
print_step "Commandes utiles..."

echo ""
print_info "🛠️ Commandes utiles :"
echo ""
echo "Développement local :"
echo "  npm run dev          # Serveur de développement"
echo "  npm run build        # Build de production"
echo "  npm run test         # Lancement des tests"
echo "  npm run validate-env # Validation environnement"
echo ""
echo "Déploiement :"
echo "  ./hostinger-deploy.sh # Script de déploiement manuel"
echo "  git push origin main  # Déploiement automatique"
echo ""
echo "Dépannage :"
echo "  git fetch origin hostinger-deploy"
echo "  git checkout hostinger-deploy"
echo "  git log --oneline -5"
echo ""

# 14. Liens utiles
print_step "Liens utiles..."

echo ""
print_info "🔗 Liens utiles :"
echo ""
echo "Documentation :"
echo "  - README.md                    # Guide principal"
echo "  - HOSTINGER_GIT_SETUP.md       # Configuration Hostinger"
echo "  - GITHUB_SECRETS_SETUP.md      # Configuration secrets"
echo "  - ACTIONS_HOSTINGER.md         # Actions GitHub"
echo ""
echo "Outils :"
echo "  - GitHub Actions : $repo_url/actions"
echo "  - Supabase : https://supabase.com"
echo "  - OpenAI : https://platform.openai.com"
echo "  - Hostinger : Votre panel d'hébergement"
echo ""

print_header "✅ Configuration terminée avec succès !"
echo ""
print_success "Votre projet Lilou Logistique est maintenant configuré et prêt pour le déploiement !"
echo ""
print_info "Pour toute question, consultez la documentation dans le dossier docs/"
echo ""
print_header "🚀 Bon développement !"