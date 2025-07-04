# Instructions de Déploiement Git - Lilou Logistique

## 🚀 Configuration pour Déploiement Git

### Informations à fournir à votre hébergeur :

#### 1. **URL du dépôt Git** (HTTPS)
```
https://github.com/[VOTRE-USERNAME]/lilou-logistique.git
```
*Remplacez [VOTRE-USERNAME] par votre nom d'utilisateur GitHub*

#### 2. **Branche**
```
main
```
*Ou `production` si vous créez une branche dédiée*

#### 3. **Chemin d'installation**
```
[Laisser vide]
```
*L'application sera déployée directement dans public_html*

### 📦 Structure du Déploiement

Le dossier `dist/` contient tous les fichiers nécessaires :
- `index.html` - Point d'entrée de l'application
- `.htaccess` - Configuration Apache
- `assets/` - Fichiers JS, CSS et images
- `sw.js` - Service Worker pour PWA
- `manifest.webmanifest` - Manifest PWA

### 🔧 Configuration Post-Déploiement

#### 1. Vérifier mod_rewrite
Assurez-vous que mod_rewrite est activé sur votre serveur Apache.

#### 2. Variables d'environnement (optionnel)
Si vous avez un backend, créez un fichier `.env` :
```env
VITE_API_URL=https://api.votre-domaine.com
```

#### 3. SSL/HTTPS
L'application redirige automatiquement vers HTTPS. Assurez-vous d'avoir un certificat SSL actif.

### 📝 Workflow de Déploiement

1. **Push vers GitHub**
```bash
git add .
git commit -m "Déploiement production"
git push origin main
```

2. **Déclenchement du déploiement**
- Le système de votre hébergeur récupérera automatiquement les changements
- Les fichiers du dossier `dist/` seront copiés dans public_html

3. **Vérification**
- Accédez à votre domaine
- Vérifiez la console du navigateur pour les erreurs
- Testez les différentes routes de l'application

### ⚠️ Important

1. **Ne pas modifier** les fichiers directement sur le serveur
2. **Toujours passer** par Git pour les mises à jour
3. **Build local** : Exécutez `npm run build` avant chaque push
4. **Fichier .htaccess** : Ne pas le supprimer ou modifier

### 🛠️ Commandes Utiles

```bash
# Build de production
npm run build

# Post-build (prépare le déploiement)
./post-build.sh

# Push vers Git
git add dist/
git commit -m "Build de production"
git push origin main
```

### 📞 Dépannage

**Erreur 404 sur les routes :**
- Vérifiez que le fichier .htaccess est présent
- Assurez-vous que mod_rewrite est activé

**Page blanche :**
- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs JavaScript
- Assurez-vous que tous les fichiers sont bien déployés

**Problèmes de cache :**
- Videz le cache du navigateur
- Le service worker se met à jour automatiquement

### 📚 Structure des Fichiers à Déployer

```
dist/
├── .htaccess                 # Configuration Apache
├── index.html               # Point d'entrée
├── manifest.webmanifest     # Manifest PWA
├── registerSW.js           # Registration Service Worker
├── sw.js                   # Service Worker
├── workbox-*.js           # Librairie PWA
├── version.json           # Information de version
├── README_DEPLOYMENT.txt  # Instructions
└── assets/               # Ressources statiques
    ├── *.js             # JavaScript bundles
    ├── *.css            # Styles
    └── *.png            # Images
```

### ✅ Checklist Pré-Déploiement

- [ ] Build de production exécuté (`npm run build`)
- [ ] Script post-build exécuté (`./post-build.sh`)
- [ ] Pas d'erreurs dans la console
- [ ] Fichier .htaccess présent dans dist/
- [ ] Commit et push effectués
- [ ] URL du dépôt correcte
- [ ] Branche correcte sélectionnée

---

**Support technique** : support@lilou-logistique.com