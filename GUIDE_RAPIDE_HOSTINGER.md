# 🚀 Guide Rapide - Déploiement sur Hostinger

## Option 1 : VPS Hostinger (Recommandé) ⭐

### Installation automatique (5 minutes)

1. **Connectez-vous à votre VPS**
   ```bash
   ssh root@votre-ip-vps
   ```

2. **Téléchargez et exécutez le script d'installation**
   ```bash
   wget https://raw.githubusercontent.com/Lilou2023/lilou-logistique/main/scripts/install-hostinger.sh
   chmod +x install-hostinger.sh
   sudo ./install-hostinger.sh
   ```

3. **Configurez vos variables d'environnement**
   ```bash
   nano /var/www/lilou-logistique/.env.local
   ```

4. **Redémarrez l'application**
   ```bash
   pm2 restart lilou-logistique
   ```

✅ **C'est tout !** Votre site est maintenant en ligne.

---

## Option 2 : Hébergement Partagé Hostinger

⚠️ **Limitations importantes** :
- Pas de fonctionnalités serveur (API, SSR)
- Pas de base de données temps réel
- Export statique uniquement

### Étapes :

1. **Sur votre ordinateur local**
   ```bash
   # Cloner le projet
   git clone https://github.com/Lilou2023/lilou-logistique.git
   cd lilou-logistique
   
   # Installer les dépendances
   npm install
   
   # Configurer pour l'export statique
   echo "output: 'export'," >> next.config.js
   
   # Build statique
   npm run build
   ```

2. **Dans le panel Hostinger**
   - Allez dans "Gestionnaire de fichiers"
   - Naviguez vers `public_html`
   - Uploadez tout le contenu du dossier `out/`

3. **Configuration du domaine**
   - Dans "Domaines" → Pointez vers `public_html`
   - Activez SSL dans "SSL/TLS"

---

## 📱 Commandes utiles après déploiement

### Sur VPS :
```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs lilou-logistique

# Mettre à jour
cd /var/www/lilou-logistique && ./deploy.sh
```

### Variables d'environnement requises :
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
OPENAI_API_KEY=sk-xxx
JWT_SECRET=xxx (32+ caractères)
NEXTAUTH_SECRET=xxx (32+ caractères)
```

---

## 🆘 Besoin d'aide ?

1. **Erreur 502** → `pm2 restart lilou-logistique`
2. **Page blanche** → Vérifiez `.env.local`
3. **SSL ne fonctionne pas** → Attendez 10 min ou relancez certbot

📧 Support Hostinger : https://support.hostinger.com