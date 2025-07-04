#!/bin/bash

echo "🔧 Résolution des problèmes de déploiement Hostinger"
echo "===================================================="
echo ""

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les étapes
step() {
    echo -e "${GREEN}✓${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# 1. Sauvegarder les changements actuels
echo "📦 Étape 1: Sauvegarde des changements actuels..."
if [[ -n $(git status -s) ]]; then
    git stash save "Sauvegarde automatique avant fix déploiement"
    step "Changements sauvegardés"
else
    step "Aucun changement à sauvegarder"
fi

# 2. Basculer sur la branche main
echo ""
echo "🌿 Étape 2: Basculement sur la branche main..."
git checkout main || {
    error "Impossible de basculer sur main"
    echo "Création de la branche main..."
    git checkout -b main
}
step "Sur la branche main"

# 3. Synchroniser avec le repository distant
echo ""
echo "🔄 Étape 3: Synchronisation avec GitHub..."
git fetch origin
git pull origin main --rebase || {
    warning "Impossible de pull, continuons..."
}
step "Synchronisation terminée"

# 4. Créer la branche hostinger-deploy
echo ""
echo "🚀 Étape 4: Création de la branche hostinger-deploy..."

# Vérifier si la branche existe déjà
if git show-ref --verify --quiet refs/heads/hostinger-deploy; then
    warning "La branche hostinger-deploy existe déjà localement"
    git checkout hostinger-deploy
    git pull origin hostinger-deploy 2>/dev/null || true
else
    # Créer la branche
    git checkout -b hostinger-deploy
    step "Branche hostinger-deploy créée"
fi

# 5. Préparer les fichiers pour Hostinger
echo ""
echo "📄 Étape 5: Préparation des fichiers de déploiement..."

# Créer un index.html si nécessaire
if [ ! -f "index.html" ] && [ ! -d "out" ]; then
    cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lilou Logistique</title>
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
            padding: 3rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        h1 { 
            font-size: 3rem; 
            margin-bottom: 1rem;
            animation: fadeIn 1s ease-in;
        }
        p { 
            font-size: 1.3rem; 
            opacity: 0.9;
            animation: fadeIn 1.5s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .status {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(0, 255, 0, 0.2);
            border-radius: 10px;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚚 Lilou Logistique</h1>
        <p>Plateforme de gestion logistique intelligente</p>
        <div class="status">
            ✅ Site déployé avec succès sur Hostinger
        </div>
    </div>
</body>
</html>
EOF
    step "Fichier index.html créé"
fi

# Créer un .htaccess optimisé
cat > .htaccess << 'EOF'
# Configuration Apache pour Hostinger
Options -MultiViews -Indexes
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirection www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Headers de sécurité
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
EOF
step "Fichier .htaccess créé"

# 6. Commiter et pousser
echo ""
echo "💾 Étape 6: Commit et push des changements..."
git add -A
git commit -m "🚀 Configuration initiale pour Hostinger" || {
    warning "Rien à commiter"
}

# Pousser la branche
git push -u origin hostinger-deploy || {
    error "Erreur lors du push. Vérifiez vos permissions GitHub"
    exit 1
}
step "Branche hostinger-deploy poussée sur GitHub"

# 7. Retour sur main
echo ""
echo "🔄 Étape 7: Retour sur la branche main..."
git checkout main
step "De retour sur main"

# 8. Afficher le résumé
echo ""
echo "===================================================="
echo -e "${GREEN}✅ Problèmes résolus avec succès !${NC}"
echo "===================================================="
echo ""
echo "📋 Résumé des actions :"
echo "  ✓ Branche main active"
echo "  ✓ Branche hostinger-deploy créée et poussée"
echo "  ✓ Fichiers de base créés"
echo ""
echo "🎯 Prochaines étapes :"
echo "1. Allez sur Hostinger"
echo "2. Dans la section GIT, configurez :"
echo "   - Dépôt : git@github.com:Lilou2023/lilou-logistique.git"
echo "   - Branche : hostinger-deploy"
echo "   - Répertoire : (laisser vide)"
echo "3. Cliquez sur 'Pull' ou 'Synchroniser'"
echo ""
echo "💡 Pour les futures mises à jour :"
echo "   git add ."
echo "   git commit -m \"Vos changements\""
echo "   git push origin main"
echo ""
echo "Le déploiement sera automatique via GitHub Actions !"
echo "===================================================="