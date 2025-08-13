#!/bin/bash

# Script pour faciliter la configuration des secrets GitHub pour Hostinger

echo "🔐 Configuration des Secrets GitHub pour Hostinger"
echo "=================================================="
echo ""

# Génération de la clé SSH
echo "📝 Étape 1: Génération de la clé SSH"
echo "------------------------------------"

KEY_NAME="hostinger_deploy_key"

if [ -f "$KEY_NAME" ]; then
    echo "⚠️  Une clé existe déjà. Voulez-vous la remplacer? (y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        echo "❌ Opération annulée"
        exit 1
    fi
    rm -f "$KEY_NAME" "$KEY_NAME.pub"
fi

# Générer la clé
ssh-keygen -t rsa -b 4096 -C "github-actions@lilou-logistique" -f "$KEY_NAME" -N ""

echo "✅ Clé SSH générée avec succès!"
echo ""

# Afficher la clé publique
echo "📋 Clé publique (à ajouter sur Hostinger dans ~/.ssh/authorized_keys):"
echo "----------------------------------------------------------------------"
cat "$KEY_NAME.pub"
echo ""
echo "----------------------------------------------------------------------"

# Afficher la clé privée
echo ""
echo "🔒 Clé privée (à ajouter comme secret HOSTINGER_SSH_KEY sur GitHub):"
echo "--------------------------------------------------------------------"
cat "$KEY_NAME"
echo ""
echo "--------------------------------------------------------------------"

# Instructions pour GitHub
echo ""
echo "📌 Étape 2: Ajouter les secrets sur GitHub"
echo "----------------------------------------"
echo ""
echo "1. Allez sur: https://github.com/[VOTRE-USERNAME]/lilou-logistique/settings/secrets/actions"
echo ""
echo "2. Cliquez sur 'New repository secret' et ajoutez:"
echo ""
echo "   📍 HOSTINGER_USER"
echo "      Valeur: Votre nom d'utilisateur Hostinger (ex: u123456789)"
echo ""
echo "   📍 HOSTINGER_HOST" 
echo "      Valeur: IP ou hostname du serveur (ex: 123.45.67.89)"
echo ""
echo "   📍 HOSTINGER_PATH"
echo "      Valeur: /home/[VOTRE-USER]/domains/lilou-logistique.com/public_html"
echo ""
echo "   📍 HOSTINGER_SSH_KEY"
echo "      Valeur: Copiez TOUT le contenu de la clé privée ci-dessus"
echo ""

# Commandes SSH pour Hostinger
echo "📌 Étape 3: Configuration sur le serveur Hostinger"
echo "------------------------------------------------"
echo ""
echo "Connectez-vous en SSH et exécutez:"
echo ""
echo "# 1. Créer le dossier SSH s'il n'existe pas"
echo "mkdir -p ~/.ssh"
echo ""
echo "# 2. Ajouter la clé publique"
echo "echo '$(cat "$KEY_NAME.pub")' >> ~/.ssh/authorized_keys"
echo ""
echo "# 3. Définir les permissions"
echo "chmod 700 ~/.ssh"
echo "chmod 600 ~/.ssh/authorized_keys"
echo ""
echo "# 4. Installer Node.js si nécessaire"
echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
echo "source ~/.bashrc"
echo "nvm install 18"
echo "nvm use 18"
echo ""
echo "# 5. Installer PM2"
echo "npm install -g pm2"
echo ""

# Sécurité
echo "⚠️  IMPORTANT - SÉCURITÉ"
echo "----------------------"
echo "1. Ne partagez JAMAIS votre clé privée"
echo "2. Supprimez les fichiers de clés locaux après configuration:"
echo "   rm -f $KEY_NAME $KEY_NAME.pub"
echo "3. Utilisez des mots de passe forts pour votre compte Hostinger"
echo ""

echo "✅ Script terminé! Suivez les instructions ci-dessus pour finaliser la configuration."