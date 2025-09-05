#!/bin/bash

# 🚀 Installation Automatique VPS Hostinger pour Lilou-GO
# ======================================================

set -e

echo "🚀 Setup VPS Hostinger - Lilou-GO v5.1"
echo "======================================"

# Variables de configuration
PROJECT_NAME="lilou-logistique"
DOMAIN="lilou-logistique.com"  
NODE_VERSION="18"
APP_DIR="/var/www/$PROJECT_NAME"
NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"

echo ""
echo "📋 Configuration détectée:"
echo "- Projet: $PROJECT_NAME"
echo "- Domaine: $DOMAIN"
echo "- Node.js: v$NODE_VERSION"
echo "- Répertoire: $APP_DIR"
echo ""

# Vérification utilisateur
if [ "$EUID" -ne 0 ]; then
    echo "❌ Ce script doit être exécuté en root"
    echo "💡 Utilisez: sudo $0"
    exit 1
fi

echo "🔄 Mise à jour du système..."
apt update -y && apt upgrade -y

echo ""
echo "📦 Installation des dépendances système..."
apt install -y curl wget git unzip nginx certbot python3-certbot-nginx ufw htop

echo ""
echo "📥 Installation de Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs

echo ""
echo "🔧 Vérification des versions installées..."
echo "Node.js: $(node --version)"
echo "NPM: $(npm --version)"
echo "Nginx: $(nginx -v 2>&1)"

echo ""
echo "🌐 Installation de PM2..."
npm install -g pm2

echo ""
echo "📁 Création de la structure des répertoires..."
mkdir -p $APP_DIR
mkdir -p /var/log/$PROJECT_NAME
chown -R www-data:www-data $APP_DIR
chown -R www-data:www-data /var/log/$PROJECT_NAME

echo ""
echo "🔧 Configuration Nginx pour Next.js..."
cat > $NGINX_CONFIG << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL sera configuré par Certbot automatiquement
    
    # Sécurité
    server_tokens off;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Proxy vers Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Optimisation statique
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    access_log /var/log/$PROJECT_NAME/nginx-access.log;
    error_log /var/log/$PROJECT_NAME/nginx-error.log;
}
EOF

echo ""
echo "🔗 Activation du site Nginx..."
ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ""
echo "🔒 Configuration du firewall..."
ufw --force enable
ufw allow ssh
ufw allow http
ufw allow https

echo ""
echo "🎯 Configuration PM2 pour l'application..."
cat > $APP_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$PROJECT_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$APP_DIR',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/$PROJECT_NAME/pm2-error.log',
    out_file: '/var/log/$PROJECT_NAME/pm2-out.log',
    time: true,
    instances: 1,
    exec_mode: 'fork'
  }]
}
EOF

echo ""
echo "📋 Création du script de déploiement..."
cat > /usr/local/bin/deploy-lilou << 'EOF'
#!/bin/bash
cd /var/www/lilou-logistique

echo "📥 Téléchargement du code..."
git pull origin main || git clone https://github.com/[VOTRE-USERNAME]/lilou-logistique.git .

echo "📦 Installation des dépendances..."
npm ci

echo "🏗️ Build de l'application..."
npm run build

echo "🔄 Redémarrage de l'application..."
pm2 restart lilou-logistique || pm2 start ecosystem.config.js
pm2 save

echo "✅ Déploiement terminé !"
EOF

chmod +x /usr/local/bin/deploy-lilou

echo ""
echo "🎉 Installation terminée !"
echo "========================"
echo ""
echo "📋 Prochaines étapes:"
echo "1. 📡 Configurer DNS pour pointer vers cette IP: $(curl -s ifconfig.me)"
echo "2. 🔐 Installer SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "3. 📥 Déployer l'application: deploy-lilou"
echo "4. 🔧 Configurer les variables d'environnement"
echo ""
echo "🔧 Commandes utiles:"
echo "- Déployer: deploy-lilou"
echo "- Logs app: pm2 logs $PROJECT_NAME"
echo "- Status: pm2 status"
echo "- Nginx logs: tail -f /var/log/$PROJECT_NAME/nginx-*.log"
echo ""
echo "🌐 Votre VPS est prêt pour Lilou-GO !"
echo "IP publique: $(curl -s ifconfig.me)"