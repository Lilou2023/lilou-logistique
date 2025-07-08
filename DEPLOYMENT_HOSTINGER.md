# 🚀 Guide de déploiement sur Hostinger - Lilou Logistique

Ce guide vous accompagne étape par étape pour déployer votre application Next.js sur Hostinger.

## 📋 Prérequis

- Un compte Hostinger avec un plan d'hébergement VPS ou Cloud
- Accès SSH à votre serveur Hostinger
- Node.js 20+ installé sur le serveur
- Un nom de domaine configuré

## 🔧 Option 1 : Déploiement sur VPS Hostinger

### Étape 1 : Connexion au serveur

```bash
ssh root@votre-ip-serveur
```

### Étape 2 : Installation des dépendances système

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation de PM2 pour la gestion des processus
sudo npm install -g pm2

# Installation de Nginx
sudo apt install nginx -y

# Installation de Git
sudo apt install git -y
```

### Étape 3 : Configuration du projet

```bash
# Création du répertoire d'application
sudo mkdir -p /var/www/lilou-logistique
cd /var/www/lilou-logistique

# Clonage du repository
sudo git clone https://github.com/Lilou2023/lilou-logistique.git .

# Installation des dépendances
sudo npm install

# Création du fichier de variables d'environnement
sudo nano .env.local
```

Ajoutez vos variables d'environnement dans `.env.local` :

```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service
OPENAI_API_KEY=votre-clé-openai
JWT_SECRET=votre-secret-jwt
NEXTAUTH_SECRET=votre-secret-nextauth
NEXTAUTH_URL=https://votre-domaine.com
```

### Étape 4 : Build de l'application

```bash
# Build de production
sudo npm run build
```

### Étape 5 : Configuration de PM2

Créez un fichier `ecosystem.config.js` :

```bash
sudo nano ecosystem.config.js
```

Contenu :

```javascript
module.exports = {
  apps: [{
    name: 'lilou-logistique',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/lilou-logistique',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Démarrez l'application avec PM2 :

```bash
# Démarrage de l'application
sudo pm2 start ecosystem.config.js

# Sauvegarde de la configuration PM2
sudo pm2 save

# Configuration du démarrage automatique
sudo pm2 startup systemd
```

### Étape 6 : Configuration de Nginx

```bash
sudo nano /etc/nginx/sites-available/lilou-logistique
```

Configuration Nginx :

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gestion des fichiers statiques Next.js
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }

    # Limite de taille pour les uploads
    client_max_body_size 50M;
}
```

Activez le site :

```bash
sudo ln -s /etc/nginx/sites-available/lilou-logistique /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Étape 7 : Configuration SSL avec Certbot

```bash
# Installation de Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtention du certificat SSL
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

## 🌐 Option 2 : Déploiement via Panel Hostinger (Hosting Partagé)

Si vous avez un hébergement partagé Hostinger, le déploiement Next.js nécessite une approche différente :

### Étape 1 : Export statique (si possible)

Modifiez votre `next.config.js` :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Étape 2 : Build et upload

```bash
# Sur votre machine locale
npm run build
```

Uploadez le contenu du dossier `out/` via FTP ou le gestionnaire de fichiers Hostinger.

### ⚠️ Limitations de l'hébergement partagé

- Pas de support pour les API Routes Next.js
- Pas de rendu côté serveur (SSR)
- Pas de génération statique incrémentale (ISR)
- Les fonctionnalités nécessitant Node.js ne fonctionneront pas

**Recommandation** : Pour une application Next.js complète avec toutes les fonctionnalités, utilisez un VPS Hostinger.

## 📦 Scripts de déploiement automatisé

Créez un script `deploy.sh` :

```bash
#!/bin/bash

echo "🚀 Démarrage du déploiement..."

# Pull des dernières modifications
git pull origin main

# Installation des dépendances
npm install

# Build de production
npm run build

# Redémarrage de l'application
pm2 reload lilou-logistique

echo "✅ Déploiement terminé !"
```

Rendez le script exécutable :

```bash
chmod +x deploy.sh
```

## 🔄 Mise à jour continue avec GitHub Actions

Ajoutez un workflow de déploiement `.github/workflows/deploy.yml` :

```yaml
name: 🚀 Déploiement Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: 🚀 Déploiement sur Hostinger
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOSTINGER_HOST }}
          username: ${{ secrets.HOSTINGER_USER }}
          key: ${{ secrets.HOSTINGER_SSH_KEY }}
          script: |
            cd /var/www/lilou-logistique
            ./deploy.sh
```

## 🔍 Monitoring et maintenance

### Vérifier le statut de l'application

```bash
# Statut PM2
pm2 status

# Logs de l'application
pm2 logs lilou-logistique

# Monitoring en temps réel
pm2 monit
```

### Sauvegarde automatique

Créez un script de sauvegarde :

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/lilou-logistique"
DATE=$(date +%Y%m%d_%H%M%S)

# Création du répertoire de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarde des fichiers
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/lilou-logistique

# Nettoyage des anciennes sauvegardes (garde 7 jours)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

Ajoutez au crontab :

```bash
# Sauvegarde quotidienne à 3h du matin
0 3 * * * /root/backup.sh
```

## 🚨 Dépannage courant

### Problème : L'application ne démarre pas

```bash
# Vérifier les logs
pm2 logs lilou-logistique --lines 100

# Vérifier les permissions
sudo chown -R www-data:www-data /var/www/lilou-logistique

# Vérifier les variables d'environnement
pm2 env 0
```

### Problème : Erreur 502 Bad Gateway

```bash
# Vérifier que l'application tourne
pm2 status

# Vérifier la configuration Nginx
sudo nginx -t

# Redémarrer les services
sudo systemctl restart nginx
pm2 restart lilou-logistique
```

### Problème : Performance lente

```bash
# Augmenter les instances PM2
pm2 scale lilou-logistique +2

# Activer la compression Nginx
# Ajoutez dans /etc/nginx/nginx.conf :
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

## 📊 Optimisations recommandées

1. **CDN** : Utilisez Cloudflare pour les assets statiques
2. **Cache** : Configurez Redis pour le cache de session
3. **Base de données** : Assurez-vous que Supabase est dans la même région
4. **Monitoring** : Installez un outil comme Datadog ou New Relic

## 🔐 Sécurité

1. **Firewall** : Configurez UFW
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **Fail2ban** : Protection contre les attaques brute-force
   ```bash
   sudo apt install fail2ban -y
   ```

3. **Headers de sécurité** : Ajoutez dans Nginx
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-Content-Type-Options "nosniff" always;
   add_header X-XSS-Protection "1; mode=block" always;
   ```

## 📞 Support

- Documentation Hostinger : https://support.hostinger.com
- Documentation Next.js : https://nextjs.org/docs/deployment
- PM2 Documentation : https://pm2.keymetrics.io/docs/

---

Bon déploiement ! 🎉