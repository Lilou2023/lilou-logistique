# 🚀 Guide d'utilisation du script setup-lilou-logistique.sh

## 📋 Description

Le script `setup-lilou-logistique.sh` automatise complètement la configuration du projet Lilou Logistique, depuis l'initialisation Git jusqu'au déploiement sur Hostinger.

## ⚡ Utilisation rapide

### 1. Prérequis
Assurez-vous d'avoir installé :
- Git
- Node.js (version 18+)
- npm

### 2. Lancement du script
```bash
# Rendre le script exécutable (si nécessaire)
chmod +x setup-lilou-logistique.sh

# Lancer le script
./setup-lilou-logistique.sh
```

## 🔄 Étapes automatisées

Le script effectue automatiquement les étapes suivantes :

### ✅ Vérification des prérequis
- Git installé
- Node.js installé
- npm installé

### 🔧 Configuration Git
- Initialisation du dépôt Git (si nécessaire)
- Configuration nom/email utilisateur
- Premier commit avec tous les fichiers

### ⚙️ Configuration environnement
- Création du fichier `.env.local`
- Saisie interactive des variables d'environnement :
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `OPENAI_API_KEY`
- Génération automatique des secrets sécurisés :
  - `JWT_SECRET`
  - `NEXTAUTH_SECRET`

### 📦 Installation et tests
- Installation des dépendances (`npm install`)
- Validation de l'environnement (`npm run validate-env`)
- Lancement des tests (`npm run test`)

### 🚀 Configuration GitHub
- Création du dépôt distant
- Push initial vers la branche `main`
- Instructions pour les secrets GitHub

### 🔑 Configuration Hostinger
- Instructions pour la clé SSH Hostinger
- Configuration du déploiement Git sur Hostinger

## 📝 Variables d'environnement requises

### Supabase
- **NEXT_PUBLIC_SUPABASE_URL** : URL de votre projet Supabase
- **NEXT_PUBLIC_SUPABASE_ANON_KEY** : Clé anonyme Supabase
- **SUPABASE_SERVICE_ROLE_KEY** : Clé de service Supabase

### OpenAI
- **OPENAI_API_KEY** : Clé API OpenAI (commence par `sk-`)

### Secrets générés automatiquement
- **JWT_SECRET** : Secret JWT (32+ caractères)
- **NEXTAUTH_SECRET** : Secret NextAuth (32+ caractères)

## 🔗 Où trouver les clés

### Supabase
1. Allez sur https://supabase.com
2. Sélectionnez votre projet
3. Settings → API
4. Copiez l'URL et les clés

### OpenAI
1. Allez sur https://platform.openai.com/api-keys
2. Créez une nouvelle clé API
3. Copiez la clé (commence par `sk-`)

## 🎯 Étapes manuelles après le script

### 1. Créer le dépôt GitHub
- Allez sur https://github.com/new
- Nom : `lilou-logistique`
- Visibilité : Public ou Privé
- Ne cochez PAS "Initialize with README"

### 2. Ajouter les secrets GitHub
- Allez dans Settings → Secrets and variables → Actions
- Ajoutez chaque secret listé par le script

### 3. Configurer la clé SSH Hostinger
- Dans votre panel Hostinger → Git
- Copiez la clé SSH fournie
- Sur GitHub : Settings → Deploy keys
- Ajoutez la clé avec "Allow write access"

### 4. Configurer Hostinger
- Panel Hostinger → Section Git
- Dépôt : `git@github.com:VotreNom/lilou-logistique.git`
- Branche : `hostinger-deploy`
- Répertoire : (vide)

## 🚨 Dépannage

### Erreur "Git n'est pas installé"
```bash
# macOS
brew install git

# Ubuntu/Debian
sudo apt install git

# Windows
# Téléchargez depuis https://git-scm.com/
```

### Erreur "Node.js n'est pas installé"
```bash
# macOS
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Téléchargez depuis https://nodejs.org/
```

### Erreur lors du push
- Vérifiez que le dépôt GitHub existe
- Vérifiez les droits d'accès
- Vérifiez l'URL du dépôt

### Le site ne se met pas à jour
- Vérifiez GitHub Actions : `https://github.com/VotreNom/lilou-logistique/actions`
- Dans Hostinger, cliquez sur "Pull"
- Videz le cache du navigateur

## 📚 Commandes utiles après configuration

```bash
# Développement local
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run test         # Lancement des tests
npm run validate-env # Validation environnement

# Déploiement
git add .
git commit -m "Votre message"
git push origin main  # Déploiement automatique

# Dépannage
git fetch origin hostinger-deploy
git checkout hostinger-deploy
git log --oneline -5
```

## 🔄 Mises à jour futures

Après la configuration initiale, pour chaque modification :

1. Modifiez votre code
2. Committez et poussez :
   ```bash
   git add .
   git commit -m "Votre message"
   git push origin main
   ```
3. Le déploiement est automatique via GitHub Actions

## 📞 Support

- Documentation : Consultez les fichiers dans le dossier `docs/`
- GitHub Actions : Vérifiez l'onglet Actions de votre dépôt
- Hostinger : Consultez les logs dans votre panel

## 🎉 Résultat final

Après avoir suivi toutes les étapes :
- ✅ Votre code est sur GitHub
- ✅ Les secrets sont configurés
- ✅ Hostinger est configuré
- ✅ Le déploiement automatique est actif
- ✅ Votre site est en ligne sur votre domaine Hostinger

---

**Note** : Ce script suit exactement la documentation du projet et automatise toutes les étapes manuelles décrites dans les guides `HOSTINGER_GIT_SETUP.md`, `GITHUB_SECRETS_SETUP.md`, et `ACTIONS_HOSTINGER.md`.
```

</rewritten_file>