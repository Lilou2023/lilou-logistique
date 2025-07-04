# 🚀 Guide de Déploiement Hostinger - Lilou Logistique

Ce guide décrit les étapes nécessaires pour configurer le déploiement automatique vers Hostinger.

## 📋 Prérequis

- [ ] Compte Hostinger actif
- [ ] Accès au hPanel (panneau de contrôle Hostinger)
- [ ] Clé SSH générée par Hostinger
- [ ] Accès administrateur au repository GitHub

## 🔧 Configuration Initiale

### 1. 🔑 Configuration des Clés SSH

#### Dans Hostinger (hPanel) :
1. Connectez-vous à votre hPanel
2. Allez dans l'onglet **Git**
3. Générez une clé SSH si ce n'est pas déjà fait
4. Copiez la clé SSH publique générée

#### Dans GitHub :
1. Allez dans **Settings** → **Deploy Keys**
2. Cliquez sur **Add deploy key**
3. Collez la clé SSH publique d'Hostinger
4. **✅ Cochez "Allow write access"**
5. Sauvegardez

### 2. 🌐 Configuration du Repository dans Hostinger

1. Dans hPanel, ouvrez l'onglet **Git**
2. Cliquez sur **Add Repository**
3. Remplissez les informations :
   ```
   Repository URL: git@github.com:Lilou2023/lilou-logistique.git
   Branch: hostinger-deploy
   Directory: (laisser vide pour public_html)
   ```
4. Sauvegardez la configuration

### 3. 🔒 Configuration des Secrets GitHub

Dans les **Settings** → **Secrets and variables** → **Actions** du repository, ajoutez :

| Secret | Description | Exemple |
|--------|-------------|---------|
| `HOSTINGER_SSH_KEY` | Clé SSH privée d'Hostinger | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `HOSTINGER_HOST` | Nom d'hôte du serveur | `srv123.hostinger.com` |
| `HOSTINGER_USER` | Nom d'utilisateur SSH | `u123456789` |
| `HOSTINGER_DOMAIN` | Domaine du site (optionnel) | `https://lilou-logistique.com` |

## 🚀 Déploiement

### Déploiement Automatique

Le déploiement se déclenche automatiquement lors de :
- Push vers la branche `main`
- Push vers la branche `hostinger-deploy`

### Déploiement Manuel

Pour déclencher un déploiement manuel :

1. **Via GitHub Actions** :
   - Allez dans **Actions** → **Deploy Lilou Logistique to Hostinger**
   - Cliquez sur **Run workflow**
   - Sélectionnez la branche
   - Cliquez sur **Run workflow**

2. **Via Git** :
   ```bash
   # Créer un commit vide pour déclencher le déploiement
   git commit --allow-empty -m "♻️ Déclenchement du workflow Hostinger"
   git push origin main
   ```

## 📁 Structure des Fichiers Déployés

```
public_html/
├── index.html          # Application principale
├── .htaccess          # Configuration Apache
├── assets/            # Fichiers statiques (CSS, JS, images)
├── favicon.ico        # Icône du site
└── manifest.json      # Manifeste PWA
```

## 🔧 Fonctionnalités du Déploiement

### ✅ Fonctionnalités Incluses

- **Sauvegarde automatique** : Les fichiers existants sont sauvegardés avant déploiement
- **Configuration Apache** : `.htaccess` optimisé pour React Router
- **Compression** : Activation de la compression gzip
- **Cache** : Configuration du cache pour les fichiers statiques
- **Permissions** : Configuration automatique des permissions de fichiers
- **Nettoyage** : Suppression automatique des anciennes sauvegardes
- **Vérification** : Test de disponibilité du site après déploiement

### 🎯 Optimisations

- **Compression gzip** activée pour tous les fichiers texte
- **Cache navigateur** configuré pour les ressources statiques
- **Routage SPA** supporté via `.htaccess`
- **Performance** optimisée pour les Core Web Vitals

## 🧪 Test du Déploiement

### Test Rapide

```bash
# 1. Créer un commit vide
git commit --allow-empty -m "♻️ Test du déploiement Hostinger"

# 2. Pousser vers main
git push origin main

# 3. Vérifier dans GitHub Actions
# Allez dans Actions → Deploy Lilou Logistique to Hostinger
```

### Vérification Post-Déploiement

1. **Vérifier l'URL** : Visitez votre domaine
2. **Tester la navigation** : Vérifiez que le routage fonctionne
3. **Contrôler les performances** : Utilisez Lighthouse pour valider
4. **Vérifier les logs** : Consultez les logs d'Apache si nécessaire

## 🔍 Dépannage

### Problèmes Courants

#### 1. Erreur d'Authentification SSH
```
fatal: Authentication failed
```
**Solution** : Vérifiez que la clé SSH est correctement configurée dans GitHub et Hostinger.

#### 2. Permissions Insuffisantes
```
Permission denied
```
**Solution** : Vérifiez que "Allow write access" est activé pour la clé de déploiement.

#### 3. Branche Introuvable
```
fatal: Remote branch hostinger-deploy not found
```
**Solution** : Créez la branche `hostinger-deploy` :
```bash
git checkout -b hostinger-deploy
git push -u origin hostinger-deploy
```

#### 4. Site Non Accessible
**Solutions** :
- Vérifiez que les fichiers sont dans le bon répertoire
- Contrôlez les permissions des fichiers
- Vérifiez la configuration DNS

### Logs et Monitoring

- **GitHub Actions** : Consultez les logs dans l'onglet Actions
- **Hostinger** : Vérifiez les logs d'erreur dans hPanel
- **Site** : Utilisez les outils de développement du navigateur

## 🎯 Bonnes Pratiques

### 📋 Checklist Avant Déploiement

- [ ] Tests locaux réussis
- [ ] Build sans erreurs
- [ ] Vérification des secrets GitHub
- [ ] Test de la clé SSH
- [ ] Sauvegarde des données importantes

### 🔄 Workflow Recommandé

1. **Développement** : Travaillez sur une branche feature
2. **Test** : Mergez vers `develop` pour les tests
3. **Staging** : Testez sur `hostinger-deploy`
4. **Production** : Mergez vers `main` pour la production

### 🛡️ Sécurité

- **Clés SSH** : Utilisez des clés dédiées au déploiement
- **Secrets** : Ne jamais exposer les secrets dans le code
- **Permissions** : Utilisez les permissions minimales nécessaires
- **Monitoring** : Surveillez les déploiements et les accès

## 📞 Support

En cas de problème :

1. **Consultez les logs** GitHub Actions
2. **Vérifiez la configuration** Hostinger
3. **Testez la connectivité** SSH
4. **Consultez la documentation** Hostinger

---

**✅ Configuration terminée !** Votre application Lilou Logistique est maintenant prête pour le déploiement automatique vers Hostinger.