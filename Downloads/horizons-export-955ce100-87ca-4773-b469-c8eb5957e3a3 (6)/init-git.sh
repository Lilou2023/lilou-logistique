#!/bin/bash

# Script d'initialisation Git pour Lilou-GO
# ==========================================

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   INITIALISATION GIT POUR LILOU-GO        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier si Git est déjà initialisé
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git est déjà initialisé dans ce projet${NC}"
    echo -e "${YELLOW}Voulez-vous continuer ? (y/n)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

# Demander l'URL du repo
echo -e "${GREEN}📦 Configuration du dépôt Git${NC}"
echo ""
echo "Avez-vous déjà créé un repository sur GitHub/GitLab ? (y/n)"
read -r has_repo

if [[ "$has_repo" =~ ^[Nn]$ ]]; then
    echo ""
    echo -e "${YELLOW}📝 Instructions pour créer un repository :${NC}"
    echo ""
    echo "1. Allez sur https://github.com"
    echo "2. Connectez-vous"
    echo "3. Cliquez sur 'New Repository'"
    echo "4. Nom : lilou-go-ia"
    echo "5. Private : ✅"
    echo "6. NE PAS initialiser avec README"
    echo "7. Create repository"
    echo ""
    echo "Appuyez sur Enter une fois créé..."
    read -r
fi

echo ""
echo "Entrez l'URL de votre repository Git :"
echo "Format : git@github.com:username/lilou-go-ia.git"
echo -e "${YELLOW}URL : ${NC}"
read -r REPO_URL

if [ -z "$REPO_URL" ]; then
    echo -e "${RED}❌ URL requise${NC}"
    exit 1
fi

# Initialiser Git
echo -e "${GREEN}🔧 Initialisation de Git...${NC}"
git init

# Configurer Git (optionnel)
echo ""
echo "Configurer votre identité Git ? (y/n)"
read -r config_git

if [[ "$config_git" =~ ^[Yy]$ ]]; then
    echo "Email (ex: logistiquelilou@gmail.com) :"
    read -r git_email
    echo "Nom (ex: Lilou Logistique) :"
    read -r git_name
    
    git config user.email "$git_email"
    git config user.name "$git_name"
fi

# Ajouter les fichiers
echo -e "${GREEN}📁 Ajout des fichiers...${NC}"
git add .

# Premier commit
echo -e "${GREEN}💾 Création du premier commit...${NC}"
git commit -m "Initial commit - Lilou-GO IA v1.0

- Application de gestion logistique
- Interface multi-rôles
- Intégration Supabase
- Dashboard analytique"

# Ajouter le remote
echo -e "${GREEN}🔗 Configuration du remote...${NC}"
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

# Renommer la branche
git branch -M main

# Push
echo -e "${GREEN}🚀 Push vers GitHub/GitLab...${NC}"
echo -e "${YELLOW}Note : Vous devrez peut-être entrer vos identifiants${NC}"
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ GIT CONFIGURÉ AVEC SUCCÈS !${NC}"
    echo -e "${GREEN}════════════════════════════════════════════${NC}"
    echo ""
    echo "📦 Repository : $REPO_URL"
    echo "🌿 Branche : main"
    echo ""
    echo -e "${GREEN}Prochaines étapes :${NC}"
    echo "1. Configuration SSH sur Hostinger"
    echo "2. Cloner le repo sur le serveur"
    echo "3. Automatiser le déploiement"
    echo ""
    echo -e "${YELLOW}Commande de déploiement rapide :${NC}"
    echo "git push && ssh -p 65002 u240832595@217.65.150.107 'cd ~/lilou-build && git pull && npm run build && cp -r dist/* ~/public_html/'"
else
    echo ""
    echo -e "${RED}❌ Erreur lors du push${NC}"
    echo ""
    echo "Solutions possibles :"
    echo "1. Vérifiez l'URL du repository"
    echo "2. Vérifiez vos droits d'accès"
    echo "3. Si vous utilisez HTTPS, essayez SSH"
    echo "4. Configurez vos clés SSH : ssh-keygen -t ed25519"
fi
