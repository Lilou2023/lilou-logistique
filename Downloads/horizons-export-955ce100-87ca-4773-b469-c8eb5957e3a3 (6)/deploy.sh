#!/bin/bash

# ==============================================================================
# Script de déploiement pour Hostinger
# ==============================================================================
#
# USAGE :
#   ./deploy.sh production
#
# PRÉREQUIS :
#   1. Avoir `rsync` installé localement.
#   2. Remplacer les placeholders ci-dessous par vos propres informations.
#   3. Assurez-vous que votre clé SSH est autorisée sur le serveur Hostinger
#      pour une connexion sans mot de passe, ou utilisez `sshpass` si nécessaire.
#
# ==============================================================================

# --- A CONFIGURER ---
# Votre nom d'utilisateur SSH/FTP chez Hostinger
REMOTE_USER="your_ssh_username"

# L'adresse de votre serveur Hostinger (souvent votre nom de domaine)
REMOTE_HOST="your_domain_or_server_ip"

# Le chemin absolu vers le dossier de votre site sur le serveur
# En général, /home/username/domains/yourdomain.com/public_html
REMOTE_PATH="/home/your_ssh_username/domains/lilou-go.com/public_html"

# Le dossier local contenant le build de votre application
LOCAL_BUILD_DIR="dist"
# --------------------


# Récupère le premier argument (l'environnement)
ENV=$1

# Vérifie si l'environnement est "production"
if [ "$ENV" != "production" ]; then
  echo "❌ Environnement non reconnu. Utilisez : ./deploy.sh production"
  exit 1
fi

echo "🚀 Démarrage du déploiement pour l'environnement : $ENV"

# Étape 1 : Build de l'application React
echo "   - 1/3 : 🛠️  Construction de l'application en mode production..."
npm run build

# Vérifie si le build a réussi
if [ $? -ne 0 ]; then
  echo "❌ Erreur lors du build de l'application. Déploiement annulé."
  exit 1
fi
echo "   - ✅ Build terminé."

# Étape 2 : Synchronisation des fichiers avec le serveur distant via rsync
echo "   - 2/3 : 🚚  Téléversement des fichiers vers Hostinger..."

# -a : mode archive (préserve les permissions, etc.)
# -v : mode verbeux (affiche les fichiers transférés)
# -z : compresse les données pendant le transfert
# --delete : supprime les fichiers sur le serveur qui n'existent plus localement
# --exclude='.DS_Store' : exclut les fichiers système inutiles
rsync -avz --delete --exclude='.DS_Store' ${LOCAL_BUILD_DIR}/ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/

if [ $? -ne 0 ]; then
  echo "❌ Erreur lors du téléversement des fichiers. Vérifiez vos identifiants et le chemin."
  exit 1
fi
echo "   - ✅ Fichiers synchronisés."

# Étape 3 : Fin du déploiement
echo "   - 3/3 : ✨  Nettoyage et finalisation..."
echo "✅ déploiement terminé avec succès sur https://lilou-go.com !"

exit 0