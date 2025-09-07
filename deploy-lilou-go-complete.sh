#!/bin/bash
set -e

DOMAIN="lilou-logistique.com"
APP_NAME="lilou-go"
REPO_URL="git@github.com:toncompte/lilou-go.git"

if [ -z "$1" ]; then
  echo "❌ Utilisation: $0 [VPS_IP]"
  exit 1
fi
VPS_IP="$1"

echo "=== Vérification DNS pour $DOMAIN ==="
dig +short $DOMAIN | grep -q "$VPS_IP" || {
  echo "❌ DNS ne pointe pas encore vers $VPS_IP"
  exit 1
}

echo "=== Clonage/Mise à jour du projet ==="
if [ ! -d "$APP_NAME" ]; then
  git clone $REPO_URL $APP_NAME
else
  cd $APP_NAME && git pull && cd ..
fi

cd $APP_NAME

echo "=== Setup VPS (Node, Nginx, PM2, etc.) ==="
chmod +x ./setup-vps-complete.sh
./setup-vps-complete.sh

echo "=== Installation des dépendances et build Next.js ==="
npm install
npm run build

echo "=== Configuration Nginx + SSL Let's Encrypt ==="
# Installe certbot si absent
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Config Nginx
cat >/etc/nginx/sites-available/$APP_NAME.conf <<EOF
server {
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/$APP_NAME.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Certificat SSL
certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN

# 🔄 RENOUVELLEMENT AUTOMATIQUE CERTBOT
echo "=== Configuration du renouvellement automatique SSL ==="
# Cron job pour renouveler les certificats tous les 12h
(crontab -l 2>/dev/null; echo "0 */12 * * * certbot renew --quiet && systemctl reload nginx") | crontab -

# Test du renouvellement
certbot renew --dry-run

echo "=== Démarrage de l'app avec PM2 ==="
pm2 delete $APP_NAME || true
pm2 start npm --name "$APP_NAME" -- run start
pm2 save
pm2 startup

echo "✅ Déploiement terminé : https://$DOMAIN est live et sécurisé."
echo "🔄 SSL se renouvellera automatiquement tous les 12h"
echo "📊 Monitoring : pm2 status | pm2 logs $APP_NAME"