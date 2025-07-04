# Guide de Déploiement - Lilou Logistique

## 🚀 Déploiement Production

### Prérequis
- Node.js 18+
- PostgreSQL 14+
- Serveur web (Nginx/Apache)
- Domaine avec certificat SSL

### 1. Build de Production

```bash
# Build optimisé
npm run build

# Le dossier dist/ contient les fichiers statiques
```

### 2. Configuration Base de Données

```bash
# Créer la base de données
createdb lilou_logistique

# Appliquer le schéma
psql -d lilou_logistique -f schema.sql

# Configuration des variables d'environnement
export DATABASE_URL="postgresql://user:password@localhost/lilou_logistique"
```

### 3. Déploiement avec Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. Configuration Nginx

```nginx
server {
    listen 80;
    server_name lilou-logistique.com;
    
    # Redirection HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lilou-logistique.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/lilou-logistique;
    index index.html;
    
    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Cache statique
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. Déploiement Cloud

#### AWS/EC2
```bash
# Installation sur Ubuntu
sudo apt update
sudo apt install nodejs npm nginx postgresql

# Clone et build
git clone https://github.com/votre-repo/lilou-logistique.git
cd lilou-logistique
npm install
npm run build

# Copier les fichiers
sudo cp -r dist/* /var/www/lilou-logistique/

# Démarrer les services
sudo systemctl start nginx
sudo systemctl start postgresql
```

#### Vercel
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

#### Netlify
```bash
# Build settings dans netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 6. Variables d'Environnement Production

```env
# .env.production
VITE_API_URL=https://api.lilou-logistique.com
VITE_APP_NAME=Lilou Logistique
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MOCK_API=false
```

### 7. Monitoring et Maintenance

#### Health Check
```bash
# Endpoint de santé
curl https://lilou-logistique.com/api/health
```

#### Logs
```bash
# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Application logs
pm2 logs
```

#### Backups
```bash
# Backup base de données
pg_dump lilou_logistique > backup_$(date +%Y%m%d).sql

# Backup automatique avec cron
0 2 * * * pg_dump lilou_logistique | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz
```

### 8. Performance en Production

- **CDN** : Utiliser Cloudflare pour les assets statiques
- **Compression** : Activer Brotli sur le serveur
- **HTTP/2** : Configuré dans Nginx
- **Service Worker** : PWA activée automatiquement

### 9. Sécurité

- **HTTPS** : Obligatoire avec Let's Encrypt
- **Headers de sécurité** : CSP, HSTS, X-Frame-Options
- **Rate limiting** : Sur l'API
- **Firewall** : Ouvrir seulement 80/443

### 10. Commandes Utiles

```bash
# Redémarrer l'application
pm2 restart lilou-logistique

# Vérifier les processus
pm2 status

# Analyser les performances
npm run lighthouse

# Nettoyer les logs
find /var/log -name "*.log" -mtime +30 -delete
```

## 📱 Déploiement Mobile

### iOS (App Store)
```bash
# Build iOS
npm run capacitor:build
npx cap sync ios
npx cap open ios

# Dans Xcode : Product > Archive
```

### Android (Google Play)
```bash
# Build Android
npm run capacitor:build
npx cap sync android
npx cap open android

# Dans Android Studio : Build > Generate Signed Bundle
```

## 🔄 CI/CD avec GitHub Actions

Le déploiement est automatisé :
- **Push sur `develop`** → Déploiement staging
- **Push sur `main`** → Déploiement production

Voir `.github/workflows/main.yml` pour les détails.

## 📞 Support

En cas de problème :
1. Vérifier les logs
2. Tester en local avec `npm run preview`
3. Vérifier la configuration réseau
4. Contacter l'équipe DevOps

---

**Dernière mise à jour** : Janvier 2025