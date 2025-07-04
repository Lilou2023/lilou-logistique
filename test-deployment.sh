#!/bin/bash

# Test des configurations de déploiement
# Lilou Logistique - Deployment Configuration Test

echo "🧪 Test des configurations de déploiement..."
echo ""

# Test 1: Vérifier les fichiers de configuration
echo "1️⃣ Vérification des fichiers de configuration..."

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json trouvé"
    echo "🔍 Validation JSON..."
    if python3 -m json.tool vercel.json > /dev/null 2>&1; then
        echo "✅ vercel.json est valide"
    else
        echo "❌ vercel.json contient des erreurs"
        exit 1
    fi
else
    echo "❌ vercel.json manquant"
    exit 1
fi

if [ -f "next.config.js" ]; then
    echo "✅ next.config.js trouvé"
    echo "🔍 Validation syntaxe..."
    if node -c next.config.js > /dev/null 2>&1; then
        echo "✅ next.config.js est valide"
    else
        echo "❌ next.config.js contient des erreurs"
        exit 1
    fi
else
    echo "❌ next.config.js manquant"
    exit 1
fi

if [ -f "deploy-hostinger.sh" ]; then
    echo "✅ deploy-hostinger.sh trouvé"
    if [ -x "deploy-hostinger.sh" ]; then
        echo "✅ deploy-hostinger.sh est exécutable"
    else
        echo "❌ deploy-hostinger.sh n'est pas exécutable"
        exit 1
    fi
else
    echo "❌ deploy-hostinger.sh manquant"
    exit 1
fi

echo ""

# Test 2: Vérifier la configuration Vercel
echo "2️⃣ Vérification de la configuration Vercel..."

FRAMEWORK=$(grep -o '"framework": "[^"]*"' vercel.json | cut -d'"' -f4)
OUTPUT_DIR=$(grep -o '"outputDirectory": "[^"]*"' vercel.json | cut -d'"' -f4)
BUILD_CMD=$(grep -o '"buildCommand": "[^"]*"' vercel.json | cut -d'"' -f4)

echo "📦 Framework: $FRAMEWORK"
echo "📁 Output Directory: $OUTPUT_DIR"
echo "🔨 Build Command: $BUILD_CMD"

if [ "$FRAMEWORK" = "vite" ]; then
    echo "✅ Framework correctement configuré pour Vite"
else
    echo "❌ Framework non configuré pour Vite"
    exit 1
fi

if [ "$OUTPUT_DIR" = "dist" ]; then
    echo "✅ Output directory correctement configuré"
else
    echo "❌ Output directory mal configuré"
    exit 1
fi

echo ""

# Test 3: Vérifier la configuration Next.js
echo "3️⃣ Vérification de la configuration Next.js..."

if grep -q "output: 'export'" next.config.js; then
    echo "✅ Configuration export statique trouvée"
else
    echo "❌ Configuration export statique manquante"
    exit 1
fi

if grep -q "images: { unoptimized: true }" next.config.js; then
    echo "✅ Images non optimisées pour export statique"
else
    echo "❌ Configuration images manquante"
    exit 1
fi

echo ""

# Test 4: Test de build
echo "4️⃣ Test de build..."

echo "🔨 Exécution du build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build réussi"
    
    if [ -d "dist" ]; then
        echo "✅ Dossier dist créé"
        
        if [ -f "dist/index.html" ]; then
            echo "✅ index.html généré"
        else
            echo "❌ index.html manquant"
            exit 1
        fi
    else
        echo "❌ Dossier dist non créé"
        exit 1
    fi
else
    echo "❌ Build échoué"
    exit 1
fi

echo ""

# Test 5: Test des scripts de déploiement
echo "5️⃣ Test des scripts de déploiement..."

if npm run deploy:hostinger > /dev/null 2>&1; then
    echo "✅ Script Hostinger fonctionne"
else
    echo "❌ Script Hostinger échoué"
    exit 1
fi

echo ""

# Test 6: Vérifier les branches
echo "6️⃣ Vérification des branches..."

CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branche actuelle: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" = "hostinger-deploy" ]; then
    echo "✅ Sur la branche hostinger-deploy"
else
    echo "ℹ️  Pas sur la branche hostinger-deploy (normal)"
fi

echo ""

# Résumé
echo "🎉 Tous les tests sont passés!"
echo ""
echo "📊 Résumé des configurations:"
echo "✅ vercel.json: Vite framework, dist output"
echo "✅ next.config.js: Export statique, images non optimisées"
echo "✅ deploy-hostinger.sh: Script exécutable"
echo "✅ Build: Fonctionne correctement"
echo "✅ Scripts: Tous opérationnels"
echo ""
echo "🎯 Prêt pour le déploiement!"
echo "1. Vercel: Connecter le repository et déployer depuis main"
echo "2. Hostinger: Configurer SSH et déployer depuis hostinger-deploy"