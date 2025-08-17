# 🚀 Guide de Déploiement Hostinger - Lilou-GO IA

## 📋 Prérequis

### 1. Informations Nécessaires

**Pour trouver vos identifiants SSH dans Hostinger :**
1. Connectez-vous à hPanel
2. Allez dans **Advanced → SSH Access**
3. Notez les informations suivantes :

```
Host SSH    : _________________ (ex: ssh123.main.hostinger.com)
Port        : _________________ (ex: 65002)
Username    : _________________ (ex: u123456789)
Mot de passe: _________________ (votre mot de passe SSH)
```

### 2. Dépôt Git (Optionnel)

Si vous utilisez Git :
```
Repo Git : _________________ (ex: git@github.com:votre-org/lilou-go.git)
```

## 🔧 Configuration Initiale

### Étape 1 : Mise à jour du script de déploiement

Ouvrez `deploy-hostinger.sh` et remplacez les valeurs :

```bash
SSH_HOST="votre-host-ssh"     # Votre host SSH Hostinger
SSH_PORT="votre-port"          # Votre port SSH 
SSH_USER="votre-username"      # Votre username SSH
PRODUCTION_DOMAIN="votre-domaine.com"  # Votre domaine
```

### Étape 2 : Variables d'environnement de production

Créez un fichier `.env.production` :

```env
VITE_SUPABASE_URL=https://ocsxrxcphdknfzihejjd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk4MjEsImV4cCI6MjA2OTY0NTgyMX0.ZYvmJCUKcsQWrW2tFRfjcUJ29vca5abK7yg8QG3WkCk
```

## 📦 Méthode 1 : Déploiement Automatique (Script)

### Commandes à exécuter sur votre machine locale :

```bash
# 1. Rendre le script exécutable
chmod +x deploy-hostinger.sh

# 2. Lancer le déploiement
./deploy-hostinger.sh
```

Le script va automatiquement :
- ✅ Builder l'application
- ✅ Se connecter en SSH
- ✅ Sauvegarder l'ancien site
- ✅ Déployer les nouveaux fichiers
- ✅ Configurer Apache (.htaccess)
- ✅ Vérifier le déploiement

## 🛠️ Méthode 2 : Déploiement Manuel SSH

Si vous préférez faire manuellement :

### Sur votre machine locale :

```bash
# 1. Build de production
npm run build

# 2. Créer une archive
tar -czf lilou-go-build.tar.gz -C dist .
```

### Connexion SSH et upload :

```bash
# 1. Se connecter en SSH
ssh -p [PORT] [USERNAME]@[HOST]

# 2. Créer les dossiers
mkdir -p ~/public_html
mkdir -p ~/backups

# 3. Backup (optionnel)
tar -czf ~/backups/backup_$(date +%Y%m%d).tar.gz -C ~/public_html .

# 4. Exit SSH et upload depuis local
exit
scp -P [PORT] lilou-go-build.tar.gz [USERNAME]@[HOST]:~/

# 5. Reconnecter et extraire
ssh -p [PORT] [USERNAME]@[HOST]
cd ~/public_html
rm -rf * # Attention ! Sauvegardez d'abord
tar -xzf ~/lilou-go-build.tar.gz
rm ~/lilou-go-build.tar.gz
```

### Créer le .htaccess :

```bash
cat > ~/public_html/.htaccess << 'EOF'
RewriteEngine On

# HTTPS Redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# React Router
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L]

# Security
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"

# Cache
<FilesMatch "\.(jpg|jpeg|png|gif|svg|ico|js|css|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

Options -Indexes
EOF
```

## 🔐 Méthode 3 : Via hPanel File Manager

1. **Build local :**
   ```bash
   npm run build
   ```

2. **Créer un ZIP :**
   - Windows : Clic droit sur `dist` → Envoyer vers → Dossier compressé
   - Mac : Clic droit sur `dist` → Compresser
   - Linux : `zip -r dist.zip dist/`

3. **Dans hPanel :**
   - Allez dans **File Manager**
   - Naviguez vers `public_html`
   - Supprimez le contenu existant
   - Upload du ZIP
   - Extrayez le contenu
   - Upload du `.htaccess`

## 🌐 Configuration DNS (si nouveau domaine)

Dans hPanel → **Domains** → **DNS Zone** :

```
Type A    : @     → IP_HOSTINGER
Type A    : www   → IP_HOSTINGER  
Type CNAME: *     → @
```

## 🔒 SSL/HTTPS

Dans hPanel → **SSL** :
1. Activez **Let's Encrypt SSL**
2. Attendez la propagation (5-15 min)

## ✅ Vérification Post-Déploiement

### Tests à effectuer :

1. **Page d'accueil :** https://votre-domaine.com
2. **Routes React :** 
   - https://votre-domaine.com/login
   - https://votre-domaine.com/select-role
3. **Console navigateur :** Vérifier les erreurs (F12)
4. **Connexion Supabase :** Tester la connexion

### En cas de problème :

```bash
# Vérifier les logs d'erreur
ssh -p [PORT] [USERNAME]@[HOST]
tail -50 ~/logs/error.log

# Vérifier les permissions
ls -la ~/public_html/

# Permissions correctes
find ~/public_html -type d -exec chmod 755 {} \;
find ~/public_html -type f -exec chmod 644 {} \;
```

## 🔄 Mises à jour futures

Pour déployer une mise à jour :
1. Faire les modifications en local
2. Relancer `./deploy-hostinger.sh`
3. Le script garde automatiquement une sauvegarde

## 📞 Support

### Problèmes courants :

**Erreur 500 :**
- Vérifiez le `.htaccess`
- Vérifiez les permissions

**Page blanche :**
- Vérifiez la console du navigateur
- Vérifiez que les fichiers JS/CSS sont chargés

**Routes ne fonctionnent pas :**
- Vérifiez que le `.htaccess` est présent
- Vérifiez que `mod_rewrite` est activé

---

## 🎯 Checklist Finale

- [ ] Build de production créé (`npm run build`)
- [ ] Informations SSH configurées
- [ ] Fichiers uploadés dans `public_html`
- [ ] `.htaccess` configuré
- [ ] SSL activé
- [ ] DNS configuré (si nouveau domaine)
- [ ] Site accessible en HTTPS
- [ ] Connexion Supabase fonctionnelle
- [ ] Routes React fonctionnelles

🎉 **Félicitations ! Votre application Lilou-GO IA est en production !**
