#!/bin/bash

# Script de configuration rapide pour le déploiement Hostinger
# Lilou Logistique - Hostinger Quick Setup

echo "🚀 Configuration rapide du déploiement Hostinger"
echo "================================================"

# Vérifier que nous sommes dans un repository git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce script doit être exécuté dans un repository git"
    exit 1
fi

# Fonction pour créer la branche hostinger-deploy
create_hostinger_branch() {
    echo ""
    echo "📋 Création de la branche hostinger-deploy..."
    
    # Vérifier si la branche existe déjà
    if git show-ref --verify --quiet refs/heads/hostinger-deploy; then
        echo "✅ La branche hostinger-deploy existe déjà"
    else
        echo "🆕 Création de la branche hostinger-deploy..."
        git checkout -b hostinger-deploy
        
        # Pousser la branche vers le repository distant
        if git push -u origin hostinger-deploy; then
            echo "✅ Branche hostinger-deploy créée et poussée avec succès"
        else
            echo "⚠️ Impossible de pousser la branche. Vous devrez la pousser manuellement."
            echo "   Commande à exécuter : git push -u origin hostinger-deploy"
        fi
    fi
}

# Fonction pour tester le déploiement
test_deployment() {
    echo ""
    echo "🧪 Test du déploiement..."
    
    # Retourner à la branche main
    git checkout main
    
    # Créer un commit vide pour déclencher le déploiement
    echo "📝 Création d'un commit vide pour déclencher le workflow..."
    git commit --allow-empty -m "♻️ Déclenchement du workflow Hostinger - Test automatique"
    
    # Pousser vers main
    if git push origin main; then
        echo "✅ Commit de test poussé vers main"
        echo ""
        echo "🔗 Vérifiez le déploiement sur GitHub Actions:"
        echo "   https://github.com/Lilou2023/lilou-logistique/actions"
    else
        echo "❌ Erreur lors du push vers main"
        return 1
    fi
}

# Fonction pour afficher les informations de configuration
show_configuration_info() {
    echo ""
    echo "📋 Configuration requise dans GitHub:"
    echo "======================================"
    echo ""
    echo "🔑 Secrets à configurer dans GitHub Settings → Secrets and variables → Actions:"
    echo "   - HOSTINGER_SSH_KEY: Clé SSH privée d'Hostinger"
    echo "   - HOSTINGER_HOST: Nom d'hôte du serveur (ex: srv123.hostinger.com)"
    echo "   - HOSTINGER_USER: Nom d'utilisateur SSH (ex: u123456789)"
    echo "   - HOSTINGER_DOMAIN: Domaine du site (optionnel)"
    echo ""
    echo "🌐 Configuration Hostinger (hPanel):"
    echo "   - Onglet Git → Ajouter le dépôt"
    echo "   - Repository URL: git@github.com:Lilou2023/lilou-logistique.git"
    echo "   - Branch: hostinger-deploy"
    echo "   - Directory: (laisser vide pour public_html)"
    echo ""
    echo "🔒 GitHub Deploy Keys:"
    echo "   - Settings → Deploy Keys → Add Key"
    echo "   - Coller la clé SSH publique d'Hostinger"
    echo "   - ✅ Cocher 'Allow write access'"
    echo ""
}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    echo "🔍 Vérification des prérequis..."
    
    # Vérifier git
    if ! command -v git &> /dev/null; then
        echo "❌ Git n'est pas installé"
        exit 1
    fi
    
    # Vérifier que nous sommes sur une branche trackée
    if ! git rev-parse --abbrev-ref @{upstream} &> /dev/null; then
        echo "⚠️ La branche actuelle n'est pas trackée sur un remote"
        echo "   Assurez-vous d'être sur une branche connectée à GitHub"
    fi
    
    # Vérifier les fichiers de workflow
    if [ ! -f ".github/workflows/hostinger-deploy.yml" ]; then
        echo "❌ Le workflow hostinger-deploy.yml n'existe pas"
        echo "   Assurez-vous que le workflow GitHub Actions est présent"
        exit 1
    fi
    
    echo "✅ Prérequis vérifiés"
}

# Menu principal
show_menu() {
    echo ""
    echo "🎯 Choisissez une action:"
    echo "1. Créer la branche hostinger-deploy"
    echo "2. Tester le déploiement"
    echo "3. Afficher les informations de configuration"
    echo "4. Tout configurer (1 + 2 + 3)"
    echo "5. Quitter"
    echo ""
    read -p "Votre choix (1-5): " choice
    
    case $choice in
        1)
            create_hostinger_branch
            ;;
        2)
            test_deployment
            ;;
        3)
            show_configuration_info
            ;;
        4)
            create_hostinger_branch
            test_deployment
            show_configuration_info
            ;;
        5)
            echo "👋 Au revoir!"
            exit 0
            ;;
        *)
            echo "❌ Choix invalide. Veuillez choisir entre 1 et 5."
            show_menu
            ;;
    esac
}

# Script principal
main() {
    check_prerequisites
    show_menu
    
    echo ""
    echo "🎉 Configuration terminée!"
    echo ""
    echo "📖 Pour plus d'informations, consultez:"
    echo "   - HOSTINGER_DEPLOYMENT_GUIDE.md"
    echo "   - https://github.com/Lilou2023/lilou-logistique/actions"
    echo ""
}

# Lancer le script
main