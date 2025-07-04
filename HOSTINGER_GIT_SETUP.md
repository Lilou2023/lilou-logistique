# 🚀 Configuration Git sur Hostinger - lilou-logistique.com

## 📋 Étapes de configuration

### 1️⃣ Ajouter la clé SSH à GitHub

1. **Copiez cette clé SSH** (celle fournie par Hostinger) :
   ```
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDULDMx2iSXlJ5mo9cPIm1LJ5OFGB5atXuLFkR53Mqy6Lla3vAZKbP0Np2LhgXOxCxjku1p66NRND+A3CqGVOpDGMoiAEFWKrjHkJPFgokB956MDFopvHJ4zQkbX4ubMe/6j6dkht4Web9QxzPFWcUeCFihkmydAdEEFvDyfYiqS5X1JRVgRYjp5ISddws7Wl9T2ivP2hAM40Fz5e1nPGX8vJ/yzy7GHYD0g01NVdndZHnfu+UwDHhL7+4mpJdkCFNWpDlUZIyrbiE0kAfYaisOrewChq0b5ZMmhK0TiuCvVoTRmmTsp92TVwr7cApyxyWq0gGtq44tUtJqESSrAq1BL/SIo+X0d6fcKd7qffxnz2rhL28UoVLQr+1HikJwEh1Wbdbh4g3vGuj1XQLzMG4LG6ezIfluEnDRB8uvRq6NIJi/4j/TLpTPbKZ5jzN6hHOe9u76FmmeSAHzKQUnc49LVQaG2D/E0/hS5+C6EeHL/l9sQf6D/xUV/STUOQ2arek= u240832595@fr-int-web1588.main-hosting.eu
   ```

2. **Allez sur GitHub** :
   - Accédez à votre repository : https://github.com/Lilou2023/lilou-logistique
   - Cliquez sur `Settings` → `Deploy keys`
   - Cliquez sur `Add deploy key`
   - Titre : `Hostinger - lilou-logistique.com`
   - Collez la clé SSH
   - ✅ Cochez `Allow write access` (important!)
   - Cliquez sur `Add key`

### 2️⃣ Créer votre repository (si pas encore fait)

```bash
# Sur votre ordinateur local
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Lilou2023/lilou-logistique.git
git push -u origin main
```

### 3️⃣ Configuration dans Hostinger

Dans le formulaire de déploiement Git sur Hostinger, entrez :

- **Dépôt** : 
  ```
  git@github.com:Lilou2023/lilou-logistique.git
  ```
  
- **Branche** : 
  ```
  hostinger-deploy
  ```
  
- **Répertoire** : 
  ```
  (laisser vide)
  ```

### 4️⃣ Workflow automatique

Le projet est configuré avec GitHub Actions pour :

1. **Branche `main`** : Code source complet
2. **Branche `hostinger-deploy`** : Version statique optimisée pour Hostinger

À chaque push sur `main`, GitHub Actions :
- ✅ Build l'application en mode statique
- ✅ Crée/met à jour la branche `hostinger-deploy`
- ✅ Ajoute les configurations Apache (.htaccess)
- ✅ Optimise pour l'hébergement mutualisé

## 🔄 Déploiement continu

### Option A : Déploiement automatique (Recommandé)

1. Faites vos modifications sur la branche `main`
2. Poussez vers GitHub :
   ```bash
   git add .
   git commit -m "Mise à jour"
   git push origin main
   ```
3. GitHub Actions créera automatiquement la branche `hostinger-deploy`
4. Hostinger détectera les changements et déploiera automatiquement

### Option B : Déploiement manuel

Si vous préférez déclencher manuellement :

1. Allez sur GitHub → Actions
2. Sélectionnez "🚀 Déploiement Hostinger Automatique"
3. Cliquez sur "Run workflow"

## ⚙️ Configuration avancée

### Personnaliser le build

Modifiez `.github/workflows/deploy-hostinger.yml` pour :
- Ajouter des variables d'environnement publiques
- Modifier les options de build
- Ajouter des étapes de post-traitement

### Variables d'environnement

⚠️ **Important** : Sur l'hébergement mutualisé, seules les variables `NEXT_PUBLIC_*` fonctionnent.

Dans le workflow, ajoutez :
```yaml
env:
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
```

## 🚨 Limitations de l'hébergement mutualisé

- ❌ Pas de serveur Node.js
- ❌ Pas d'API Routes
- ❌ Pas de SSR/ISR
- ❌ Pas de middleware
- ✅ Export statique uniquement
- ✅ Client-side routing
- ✅ Assets statiques

## 📝 Commandes utiles

```bash
# Tester le build statique localement
npm run build
npx serve out

# Vérifier la branche de déploiement
git fetch origin hostinger-deploy
git checkout hostinger-deploy
git log --oneline -5

# Forcer une reconstruction
git commit --allow-empty -m "Force rebuild"
git push origin main
```

## 🆘 Dépannage

### Le site ne se met pas à jour
1. Vérifiez que GitHub Actions s'est bien exécuté
2. Dans Hostinger, cliquez sur "Pull" pour forcer la mise à jour
3. Videz le cache du navigateur

### Erreur 404 sur les routes
- Vérifiez que le `.htaccess` est bien présent
- Les routes dynamiques nécessitent une configuration spéciale

### Images non affichées
- Utilisez des chemins absolus : `/images/logo.png`
- Évitez les imports dynamiques d'images

## 🎉 C'est configuré !

Votre site sera automatiquement déployé sur https://lilou-logistique.com à chaque push sur la branche `main` !

---

💡 **Astuce** : Pour un site plus dynamique avec toutes les fonctionnalités Next.js, considérez un VPS Hostinger.