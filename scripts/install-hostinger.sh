#!/bin/bash

# Script d'installation automatique pour Lilou Logistique sur Hostinger VPS
# Usage: bash install-hostinger.sh

set -e

echo "================================================"
echo "🚀 Installation de Lilou Logistique sur Hostinger"
echo "================================================"

# Variables
APP_DIR="/var/www/lilou-logistique"
REPO_URL="https://github.com/Lilou2023/lilou-logistique.git"
DOMAIN=""
EMAIL=""

# Fonction pour demander les informations
get_user_input() {
    read -p "📧 Entrez votre adresse email (pour SSL): " EMAIL
    read -p "🌐 Entrez votre nom de domaine (ex: monsite.com): " DOMAIN
}

# Fonction pour afficher les erreurs
error_exit() {
    echo "❌ Erreur: $1" >&2
    exit 1
}

# Vérification des privilèges root
if [[ $EUID -ne 0 ]]; then
   error_exit "Ce script doit être exécuté en tant que root (utilisez sudo)"
fi

echo "📋 Collecte des informations..."
get_user_input

echo "🔄 Mise à jour du système..."
apt update && apt upgrade -y || error_exit "Échec de la mise à jour du système"

echo "📦 Installation de Node.js 20..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs || error_exit "Échec de l'installation de Node.js"
else
    echo "✅ Node.js déjà installé: $(node -v)"
fi

echo "📦 Installation des outils système..."
apt install -y git nginx certbot python3-certbot-nginx || error_exit "Échec de l'installation des outils"

echo "📦 Installation de PM2..."
npm install -g pm2 || error_exit "Échec de l'installation de PM2"

echo "📁 Création du répertoire de l'application..."
mkdir -p $APP_DIR
cd $APP_DIR

echo "📥 Clonage du repository..."
if [ -d ".git" ]; then
    echo "✅ Repository déjà cloné, mise à jour..."
    git pull origin main
else
    git clone $REPO_URL . || error_exit "Échec du clonage du repository"
fi

echo "📦 Installation des dépendances npm..."
npm install || error_exit "Échec de l'installation des dépendances"

echo "⚙️ Configuration des variables d'environnement..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << EOF
NODE_ENV=production
PORT=3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Authentication
JWT_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://$DOMAIN
EOF
    echo "⚠️  Fichier .env.local créé. IMPORTANT: Modifiez les valeurs par défaut!"
    echo "    Éditez avec: nano $APP_DIR/.env.local"
else
    echo "✅ Fichier .env.local existe déjà"
fi

echo "🔨 Build de l'application..."
npm run build || error_exit "Échec du build"

echo "⚙️ Configuration de PM2..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'lilou-logistique',
    script: 'npm',
    args: 'start',
    cwd: '$APP_DIR',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/lilou-error.log',
    out_file: '/var/log/pm2/lilou-out.log',
    log_file: '/var/log/pm2/lilou-combined.log',
    time: true
  }]
};
EOF

echo "🚀 Démarrage de l'application avec PM2..."
pm2 stop lilou-logistique 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root

echo "🔧 Configuration de Nginx..."
cat > /etc/nginx/sites-available/lilou-logistique << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }

    client_max_body_size 50M;

    # Headers de sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
EOF

echo "🔗 Activation du site Nginx..."
ln -sf /etc/nginx/sites-available/lilou-logistique /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t || error_exit "Configuration Nginx invalide"
systemctl restart nginx

echo "🔐 Configuration du certificat SSL..."
if [ -n "$EMAIL" ] && [ -n "$DOMAIN" ]; then
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m $EMAIL || \
        echo "⚠️  Échec de l'obtention du certificat SSL. Vérifiez que votre domaine pointe vers ce serveur."
else
    echo "⚠️  Email ou domaine manquant, SSL non configuré"
fi

echo "🔥 Configuration du firewall UFW..."
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

echo "📝 Création du script de mise à jour..."
cat > $APP_DIR/deploy.sh << 'EOF'
#!/bin/bash
cd /var/www/lilou-logistique
echo "🔄 Mise à jour du code..."
git pull origin main
echo "📦 Installation des dépendances..."
npm install
echo "🔨 Build de production..."
npm run build
echo "♻️ Redémarrage de l'application..."
pm2 reload lilou-logistique
echo "✅ Déploiement terminé!"
EOF
chmod +x $APP_DIR/deploy.sh

echo "📊 Création du script de monitoring..."
cat > /usr/local/bin/lilou-status << 'EOF'
#!/bin/bash
echo "📊 Status de Lilou Logistique"
echo "=============================="
echo ""
echo "🚀 PM2 Status:"
pm2 status
echo ""
echo "📈 Utilisation des ressources:"
pm2 monit
EOF
chmod +x /usr/local/bin/lilou-status

echo "================================================"
echo "✅ Installation terminée avec succès!"
echo "================================================"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Modifiez les variables d'environnement:"
echo "   nano $APP_DIR/.env.local"
echo ""
echo "2. Redémarrez l'application après modification:"
echo "   pm2 restart lilou-logistique"
echo ""
echo "3. Vérifiez le statut:"
echo "   lilou-status"
echo ""
echo "4. Consultez les logs:"
echo "   pm2 logs lilou-logistique"
echo ""
echo "5. Pour déployer une mise à jour:"
echo "   cd $APP_DIR && ./deploy.sh"
echo ""
echo "🌐 Votre site sera accessible sur:"
echo "   http://$DOMAIN (ou https:// si SSL configuré)"
echo ""
echo "================================================"