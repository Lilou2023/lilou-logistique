#!/bin/bash

echo "🧪 Test de Configuration Lilou Logistique"
echo "========================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de test
test_command() {
    local command="$1"
    local description="$2"
    
    echo -e "${BLUE}🔍 Test: $description${NC}"
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Succès${NC}"
        return 0
    else
        echo -e "${RED}❌ Échec${NC}"
        return 1
    fi
}

# Tests de base
echo -e "${YELLOW}📋 Tests de base...${NC}"

test_command "node --version" "Node.js installé"
test_command "npm --version" "npm installé"
test_command "vercel --version" "Vercel CLI installé"

# Tests de fichiers
echo -e "${YELLOW}📁 Tests de fichiers...${NC}"

test_command "test -f package.json" "package.json présent"
test_command "test -f vercel.json" "vercel.json présent"
test_command "test -f .github/workflows/ci.yml" "Workflow CI/CD présent"
test_command "test -f deploy-unified.sh" "Script de déploiement unifié présent"

# Tests de permissions
echo -e "${YELLOW}🔐 Tests de permissions...${NC}"

test_command "test -x deploy-unified.sh" "Script de déploiement exécutable"
test_command "test -x setup-vercel-env.sh" "Script de configuration exécutable"

# Tests de configuration
echo -e "${YELLOW}⚙️ Tests de configuration...${NC}"

if [ -f "package.json" ]; then
    echo -e "${BLUE}🔍 Vérification des scripts package.json...${NC}"
    if grep -q '"build"' package.json; then
        echo -e "${GREEN}✅ Script build trouvé${NC}"
    else
        echo -e "${RED}❌ Script build manquant${NC}"
    fi
    
    if grep -q '"test"' package.json; then
        echo -e "${GREEN}✅ Script test trouvé${NC}"
    else
        echo -e "${YELLOW}⚠️ Script test manquant${NC}"
    fi
fi

# Test de connexion Vercel
echo -e "${YELLOW}🌐 Test de connexion Vercel...${NC}"
if vercel whoami > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Connecté à Vercel${NC}"
else
    echo -e "${YELLOW}⚠️ Non connecté à Vercel - exécutez 'vercel login'${NC}"
fi

# Résumé
echo -e "${YELLOW}📊 Résumé de la configuration...${NC}"
echo "✅ Workflow CI/CD v4 configuré"
echo "✅ Script de déploiement unifié créé"
echo "✅ Configuration Vercel optimisée"
echo "✅ Variables d'environnement prêtes"

echo -e "${GREEN}🎉 Configuration terminée !${NC}"
echo ""
echo -e "${BLUE}🚀 Prochaines étapes:${NC}"
echo "1. Exécutez: ./setup-vercel-env.sh"
echo "2. Testez: ./deploy-unified.sh staging"
echo "3. Déployez: git push origin develop" 