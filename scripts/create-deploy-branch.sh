#!/bin/bash
set -euo pipefail

# Script pour créer la branche hostinger-deploy rapidement
# Utile pour le premier déploiement sur Hostinger

echo "🚀 Création de la branche hostinger-deploy"
echo "=========================================="

# Vérifier qu'on est dans un repo git
if [ ! -d ".git" ]; then
    echo "❌ Erreur : Ce n'est pas un repository Git"
    echo "Exécutez d'abord : git init"
    exit 1
fi

# Sauvegarder la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)

echo "📌 Branche actuelle : $CURRENT_BRANCH"

# Créer et basculer vers hostinger-deploy
echo "🌿 Création de la branche hostinger-deploy..."
git checkout -b hostinger-deploy 2>/dev/null || {
    echo "⚠️  La branche hostinger-deploy existe déjà"
    git checkout hostinger-deploy
}

# Créer un fichier index.html minimal si aucun fichier n'existe
if [ ! -f "index.html" ] && [ ! -f "out/index.html" ]; then
    echo "📄 Création d'un fichier index.html temporaire..."
    cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lilou Logistique - Déploiement en cours</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; opacity: 0.9; }
        .loader {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 3px solid white;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚚 Lilou Logistique</h1>
        <div class="loader"></div>
        <p>Déploiement en cours...</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">Le site sera disponible dans quelques instants</p>
    </div>
</body>
</html>
EOF
    git add index.html
fi

# Ajouter un .htaccess basique
if [ ! -f ".htaccess" ]; then
    echo "⚙️  Création du fichier .htaccess..."
    cat > .htaccess << 'EOF'
# Configuration Apache basique
Options -Indexes
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Headers de sécurité
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
EOF
    git add .htaccess
fi

# Commiter si nécessaire
if ! git diff --cached --quiet; then
    echo "💾 Commit des fichiers..."
    git commit -m "🚀 Initial deployment setup for Hostinger"
fi

# Pousser la branche
echo "📤 Push de la branche hostinger-deploy..."
git push -u origin hostinger-deploy || {
    echo "❌ Erreur lors du push. Vérifiez votre connexion GitHub."
    exit 1
}

# Retourner à la branche d'origine
echo "🔄 Retour à la branche $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo ""
echo "✅ Succès ! La branche hostinger-deploy a été créée."
echo ""
echo "📋 Prochaines étapes :"
echo "1. Retournez sur Hostinger"
echo "2. Cliquez sur 'Pull' ou relancez le déploiement"
echo "3. Le déploiement devrait maintenant fonctionner !"
echo ""
echo "⚡ La prochaine fois que vous ferez un push sur 'main',"
echo "   GitHub Actions mettra automatiquement à jour cette branche."
echo ""
echo "=========================================="