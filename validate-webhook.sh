#!/bin/bash

# Script de validation de la configuration webhook
# Lilou Logistique - Webhook Configuration Validator

echo "🔍 Validation de la configuration webhook..."
echo "============================================"

# Variables
WEBHOOK_URL="https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936"
GITHUB_REPO="https://github.com/Lilou2023/lilou-logistique"
WORKFLOW_FILE=".github/workflows/main.yml"

# Fonction pour vérifier un fichier
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo "✅ $description: $file existe"
        return 0
    else
        echo "❌ $description: $file manquant"
        return 1
    fi
}

# Fonction pour vérifier une URL
check_url() {
    local url=$1
    local description=$2
    
    if curl -s -I "$url" > /dev/null 2>&1; then
        echo "✅ $description: URL accessible"
        return 0
    else
        echo "❌ $description: URL inaccessible"
        return 1
    fi
}

# Fonction pour vérifier le contenu d'un fichier
check_content() {
    local file=$1
    local pattern=$2
    local description=$3
    
    if [ -f "$file" ] && grep -q "$pattern" "$file"; then
        echo "✅ $description: Configuration trouvée"
        return 0
    else
        echo "❌ $description: Configuration manquante"
        return 1
    fi
}

echo "1. Vérification des fichiers de configuration..."
echo "------------------------------------------------"

# Vérifier les fichiers essentiels
check_file "$WORKFLOW_FILE" "Workflow GitHub Actions"
check_file "deploy.sh" "Script de déploiement"
check_file "webhook.config.js" "Configuration webhook"
check_file "test-webhook.sh" "Script de test"
check_file "WEBHOOK_DEPLOYMENT_CONFIG.md" "Documentation webhook"
check_file "WEBHOOK_SETUP_GUIDE.md" "Guide de configuration"

echo ""
echo "2. Vérification du contenu des fichiers..."
echo "------------------------------------------"

# Vérifier le contenu des fichiers
check_content "$WORKFLOW_FILE" "Trigger Hostinger deployment webhook" "Webhook dans GitHub Actions"
check_content "deploy.sh" "webhooks.hostinger.com" "Webhook dans deploy.sh"
check_content "webhook.config.js" "webhooks.hostinger.com" "URL webhook dans config"
check_content "README.md" "webhook" "Documentation webhook dans README"

echo ""
echo "3. Vérification de la connectivité..."
echo "-------------------------------------"

# Vérifier la connectivité (peut échouer dans certains environnements)
echo "🔗 Test de connectivité vers le webhook..."
if curl -s -I -m 10 "$WEBHOOK_URL" > /dev/null 2>&1; then
    echo "✅ Webhook Hostinger: Accessible"
else
    echo "⚠️ Webhook Hostinger: Inaccessible (normal dans certains environnements)"
fi

echo ""
echo "4. Vérification des permissions..."
echo "----------------------------------"

# Vérifier les permissions des scripts
if [ -x "deploy.sh" ]; then
    echo "✅ deploy.sh: Exécutable"
else
    echo "❌ deploy.sh: Pas exécutable"
fi

if [ -x "test-webhook.sh" ]; then
    echo "✅ test-webhook.sh: Exécutable"
else
    echo "❌ test-webhook.sh: Pas exécutable"
fi

echo ""
echo "5. Résumé de la configuration..."
echo "==============================="

echo "📋 Webhook URL: $WEBHOOK_URL"
echo "📋 Repository: $GITHUB_REPO"
echo "📋 Workflow: $WORKFLOW_FILE"

echo ""
echo "6. Prochaines étapes..."
echo "======================="

echo "🔄 Pour tester la configuration:"
echo "   ./test-webhook.sh"
echo ""
echo "🚀 Pour déclencher un déploiement:"
echo "   ./deploy.sh"
echo "   # ou"
echo "   git push origin main"
echo ""
echo "📚 Documentation complète:"
echo "   ./WEBHOOK_DEPLOYMENT_CONFIG.md"
echo "   ./WEBHOOK_SETUP_GUIDE.md"
echo ""
echo "🎉 Configuration webhook terminée!"