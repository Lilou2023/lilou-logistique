# 🚀 Guide de Configuration du Déploiement Hostinger

## ✅ Workflow créé avec succès !

Le fichier `deploy-hostinger.yml` a été ajouté à votre projet. Voici les étapes pour finaliser la configuration :

## 📋 Étapes à suivre

### 1. 🔐 Configurer les Secrets GitHub

Allez sur GitHub → **Settings** → **Secrets and variables** → **Actions** et ajoutez :

#### A. HOSTINGER_USER
- **Valeur** : Votre nom d'utilisateur Hostinger (généralement `u123456789`)
- **Où le trouver** : Panel Hostinger → Hébergement → Détails

#### B. HOSTINGER_HOST
- **Valeur** : L'adresse IP ou hostname de votre serveur
- **Exemple** : `123.45.67.89` ou `srv123.hostinger.com`
- **Où le trouver** : Panel Hostinger → Hébergement → Détails SSH

#### C. HOSTINGER_PATH
- **Valeur** : Le chemin vers votre dossier public
- **Généralement** : `/home/u123456789/domains/lilou-logistique.com/public_html`
- **Où le trouver** : Panel Hostinger → Gestionnaire de fichiers

#### D. HOSTINGER_SSH_KEY
- **Valeur** : Votre clé SSH privée (format RSA)
- **Comment la créer** :

```bash
# Sur votre ordinateur local
ssh-keygen -t rsa -b 4096 -C "github-actions@lilou-logistique"
# Sauvegardez dans un fichier temporaire, ex: hostinger_deploy_key
```

### 2. 🖥️ Préparer le Serveur Hostinger

#### A. Activer l'accès SSH
1. Panel Hostinger → **SSH Access**
2. Activez SSH si ce n'est pas déjà fait
3. Notez les informations de connexion

#### B. Se connecter en SSH
```bash
ssh u123456789@123.45.67.89 -p 65002
# Utilisez le port indiqué dans votre panel
```

#### C. Installer Node.js et PM2
```bash
# Vérifier si Node.js est installé
node --version

# Si non installé, utilisez nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Installer PM2 globalement
npm install -g pm2
```

#### D. Ajouter la clé publique SSH
```bash
# Sur le serveur Hostinger
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys

# Collez la clé publique (hostinger_deploy_key.pub)
# Sauvegardez et fermez

# Définir les permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 3. 📁 Préparer la Structure des Dossiers

```bash
# Sur le serveur Hostinger
cd ~/domains/lilou-logistique.com
mkdir -p public_html
mkdir -p deployments
mkdir -p logs

# Créer le fichier ecosystem PM2
nano ecosystem.config.js
```

Contenu du fichier `ecosystem.config.js` :
```javascript
module.exports = {
  apps: [{
    name: 'lilou-logistique',
    script: 'npm',
    args: 'start',
    cwd: '/home/u123456789/domains/lilou-logistique.com/public_html',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '../logs/pm2-error.log',
    out_file: '../logs/pm2-out.log',
    time: true
  }]
}
```

### 4. 🌐 Configurer le Proxy Nginx/Apache

#### Pour Apache (.htaccess dans public_html)
```apache
RewriteEngine On

# Proxy toutes les requêtes vers Node.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Headers de sécurité
Header set X-Frame-Options "SAMEORIGIN"
Header set X-Content-Type-Options "nosniff"
Header set X-XSS-Protection "1; mode=block"
```

### 5. 🧪 Tester le Déploiement

#### A. Faire un commit de test
```bash
# Sur votre machine locale
git add .
git commit -m "test: trigger deployment to Hostinger"
git push origin main
```

#### B. Vérifier sur GitHub
1. Allez dans l'onglet **Actions**
2. Vous devriez voir le workflow "Deploy to Hostinger" en cours
3. Cliquez dessus pour voir les détails

#### C. Vérifier sur le serveur
```bash
# SSH sur Hostinger
cd ~/domains/lilou-logistique.com/public_html
ls -la  # Vérifier les fichiers

# Vérifier PM2
pm2 list
pm2 logs lilou-logistique
```

### 6. 🔧 Dépannage

#### Erreur de connexion SSH
- Vérifiez que la clé SSH est correctement ajoutée
- Vérifiez le port SSH (souvent 65002 sur Hostinger)
- Testez la connexion manuellement

#### Erreur de build
- Vérifiez les logs GitHub Actions
- Assurez-vous que toutes les dépendances sont installées
- Vérifiez la version de Node.js

#### Application ne démarre pas
- Vérifiez les logs PM2 : `pm2 logs`
- Vérifiez les variables d'environnement
- Testez manuellement : `npm run build && npm start`

### 7. 🎯 Configuration Finale

#### A. Variables d'environnement
Créez un fichier `.env.production` sur le serveur :
```bash
nano ~/domains/lilou-logistique.com/public_html/.env.production
```

Ajoutez vos variables :
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ocsxrxcphdknfzihejjd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
NEXTAUTH_URL=https://lilou-logistique.com
NEXTAUTH_SECRET=votre_secret

# Autres variables...
```

#### B. Redémarrer l'application
```bash
pm2 restart lilou-logistique
pm2 save
pm2 startup  # Pour démarrage automatique
```

### 8. ✅ Checklist Finale

- [ ] Secrets GitHub configurés
- [ ] SSH activé et clé ajoutée
- [ ] Node.js et PM2 installés
- [ ] Structure des dossiers créée
- [ ] Proxy configuré (.htaccess)
- [ ] Variables d'environnement ajoutées
- [ ] Premier déploiement réussi
- [ ] Application accessible via le domaine

## 🎉 Félicitations !

Une fois toutes ces étapes complétées, votre application sera automatiquement déployée sur Hostinger à chaque push sur la branche `main`.

## 📞 Support

En cas de problème :
1. Vérifiez les logs GitHub Actions
2. Consultez les logs PM2 sur le serveur
3. Vérifiez la documentation Hostinger
4. Contactez le support Hostinger si nécessaire