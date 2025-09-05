#!/bin/bash

echo "🚀 Déploiement Lilou-GO sur VPS Hostinger"
echo "========================================="

# Variables à configurer
VPS_IP="[VOTRE_IP_VPS]"  # Remplacer par l'IP du VPS
VPS_USER="root"          # Ou utilisateur configuré
PROJECT_NAME="lilou-logistique"

echo ""
echo "📋 Prérequis VPS:"
echo "1. Node.js 18+ installé"
echo "2. Nginx installé et configuré"
echo "3. PM2 pour gestion des processus"
echo "4. SSL/HTTPS configuré"

echo ""
echo "🔧 Commandes d'installation sur le VPS:"
echo "----------------------------------------"

cat << 'EOF'
# Sur le VPS, exécuter:

# 1. Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Installer PM2
npm install -g pm2

# 3. Installer Nginx
sudo apt update
sudo apt install nginx

# 4. Créer dossier projet
sudo mkdir -p /var/www/lilou-logistique
sudo chown -R $USER:$USER /var/www/lilou-logistique

# 5. Cloner et déployer le projet
cd /var/www/lilou-logistique
git clone [VOTRE_REPO_GIT] .
npm install
npm run build

# 6. Lancer avec PM2
pm2 start npm --name "lilou-logistique" -- start
pm2 startup
pm2 save

EOF

echo ""
echo "🌐 Configuration Nginx pour Next.js:"
echo "-----------------------------------"

cat << 'EOF'
# Fichier: /etc/nginx/sites-available/lilou-logistique.com

server {
    listen 80;
    server_name lilou-logistique.com www.lilou-logistique.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lilou-logistique.com www.lilou-logistique.com;

    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

EOF

echo ""
echo "🔐 Activation du site:"
echo "sudo ln -s /etc/nginx/sites-available/lilou-logistique.com /etc/nginx/sites-enabled/"
echo "sudo nginx -t"
echo "sudo systemctl reload nginx"

echo ""
echo "📱 Test du déploiement:"
echo "curl -I http://[VPS_IP]:3000"
echo "curl -I https://lilou-logistique.com"