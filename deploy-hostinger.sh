#!/bin/bash

# Script de déploiement vers Hostinger
# Lilou Logistique - Hostinger Deployment Script

set -e

echo "🚀 Déploiement vers Hostinger..."

# Vérifier si nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# Récupérer la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branche actuelle: $CURRENT_BRANCH"

# Vérifier si la branche hostinger-deploy existe
if git show-ref --verify --quiet refs/heads/hostinger-deploy; then
    echo "✅ La branche hostinger-deploy existe"
else
    echo "🆕 Création de la branche hostinger-deploy..."
    git checkout -b hostinger-deploy
    git checkout $CURRENT_BRANCH
fi

# Fonction pour déployer
deploy_to_hostinger() {
    echo "🔄 Passage à la branche hostinger-deploy..."
    git checkout hostinger-deploy
    
    # Fusionner les derniers changements
    echo "🔄 Fusion des changements depuis $CURRENT_BRANCH..."
    git merge $CURRENT_BRANCH --no-ff -m "merge: préparation déploiement Hostinger depuis $CURRENT_BRANCH"
    
    # Construire l'application
    echo "🏗️ Construction de l'application..."
    if npm run build; then
        echo "✅ Build réussi"
    else
        echo "❌ Échec du build"
        git checkout $CURRENT_BRANCH
        exit 1
    fi
    
    # Préparer les fichiers de déploiement
    echo "📁 Préparation des fichiers de déploiement..."
    
    # Créer le répertoire de déploiement s'il n'existe pas
    mkdir -p hostinger-deploy
    
    # Copier les fichiers de build
    if [ -d "dist" ]; then
        cp -r dist/* hostinger-deploy/
        echo "✅ Fichiers de build copiés"
    else
        echo "⚠️ Aucun répertoire dist trouvé, création d'un fallback"
        echo "<html><body><h1>Lilou Logistique</h1><p>Déploiement réussi!</p></body></html>" > hostinger-deploy/index.html
    fi
    
    # Créer le fichier .htaccess pour le SPA
    cat > hostinger-deploy/.htaccess << 'EOF'
# Enable mod_rewrite
RewriteEngine On

# Handle SPA routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/ico "access plus 1 year"
  ExpiresByType image/icon "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
EOF
    
    echo "✅ Fichier .htaccess créé"
    
    # Ajouter les fichiers de déploiement au git
    git add hostinger-deploy/
    
    # Vérifier s'il y a des changements à commiter
    if git diff --cached --quiet; then
        echo "ℹ️ Aucun changement à déployer"
    else
        # Commiter les fichiers de déploiement
        git commit -m "🚀 Déploiement Hostinger - $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
        
        echo "📊 Résumé du déploiement:"
        echo "- Branche: hostinger-deploy"
        echo "- Commit: $(git rev-parse --short HEAD)"
        echo "- Fichiers déployés: $(find hostinger-deploy -type f | wc -l)"
        echo "- Taille totale: $(du -sh hostinger-deploy | cut -f1)"
        
        # Pousser vers le remote
        echo "⬆️ Push vers origin/hostinger-deploy..."
        git push origin hostinger-deploy
        
        if [ $? -eq 0 ]; then
            echo "✅ Push vers hostinger-deploy réussi!"
        else
            echo "❌ Erreur lors du push vers hostinger-deploy"
            git checkout $CURRENT_BRANCH
            exit 1
        fi
    fi
    
    # Retourner à la branche originale
    git checkout $CURRENT_BRANCH
}

# Confirmation avant déploiement
echo ""
echo "🔍 Vérification avant déploiement:"
echo "- Projet: Lilou Logistique"
echo "- Branche source: $CURRENT_BRANCH"
echo "- Branche cible: hostinger-deploy"
echo "- Environnement: Hostinger"
echo ""

read -p "Continuer avec le déploiement? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    deploy_to_hostinger
    
    echo ""
    echo "🎉 Déploiement terminé!"
    echo ""
    echo "🔗 Actions suivantes:"
    echo "1. Vérifier le déploiement sur Hostinger"
    echo "2. Tester l'application sur l'environnement de production"
    echo "3. Déclencher le workflow GitHub Actions si nécessaire:"
    echo "   gh workflow run 'Deploy Lilou Logistique to Hostinger'"
    echo ""
    echo "📈 URLs utiles:"
    echo "- Production: https://lilou-logistique.com"
    echo "- GitHub Actions: https://github.com/Lilou2023/lilou-logistique/actions"
    echo ""
else
    echo "❌ Déploiement annulé"
    exit 1
fi