# 🚀 Guide de Déploiement Hostinger

## Configuration Initiale

### 1. Configurer la Clé SSH sur GitHub

1. Aller sur GitHub → Settings → Deploy Keys
2. Cliquer sur "Add deploy key"
3. Coller la clé SSH fournie par Hostinger
4. ✅ Cocher "Allow write access"
5. Donner un nom descriptif (ex: "Hostinger Deploy Key")

### 2. Configurer Hostinger

1. Se connecter au hPanel Hostinger
2. Aller dans l'onglet **Git**
3. Cliquer sur "Create new repository"
4. Remplir les informations:
   - **Repository URL**: `git@github.com:Lilou2023/lilou-logistique.git`
   - **Branch**: `hostinger-deploy`
   - **Directory**: (laisser vide pour `public_html`)

## Méthodes de Déploiement

### 🔄 Déploiement Automatique (Recommandé)

Utiliser GitHub Actions pour déployer automatiquement:

```bash
# Déclencher le workflow manuellement
gh workflow run "Deploy Lilou Logistique to Hostinger"
```

Ou depuis l'interface GitHub:
1. Aller sur **Actions** → **Deploy Lilou Logistique to Hostinger**
2. Cliquer sur **Run workflow**
3. Choisir l'environnement (production/staging)
4. Cliquer sur **Run workflow**

### 🛠️ Déploiement Manuel

#### Option 1: Script de déploiement
```bash
# Exécuter le script de déploiement
./deploy-hostinger.sh
```

#### Option 2: Commandes manuelles
```bash
# Créer et pousser vers la branche hostinger-deploy
git checkout -b hostinger-deploy
npm run build
git add dist/
git commit -m "🚀 Déploiement Hostinger"
git push origin hostinger-deploy
```

### 🧪 Test du Déploiement

Pour tester le déploiement, pousser un commit vide:

```bash
git commit --allow-empty -m "♻️ Déclenchement du workflow Hostinger"
git push origin main
```

Puis déclencher le workflow sur GitHub Actions.

## Structure des Fichiers Déployés

Le déploiement copie les fichiers suivants vers Hostinger:

```
hostinger-deploy/
├── index.html          # Application principale
├── assets/            # Fichiers CSS, JS, images
├── .htaccess          # Configuration Apache
└── ...                # Autres fichiers du build
```

### Configuration .htaccess

Le fichier `.htaccess` est automatiquement créé avec:
- ✅ Routage SPA (Single Page Application)
- ✅ Compression des ressources
- ✅ Cache headers optimisés
- ✅ Redirection vers index.html

## Surveillance et Monitoring

### URLs de Vérification
- **Production**: https://lilou-logistique.com
- **GitHub Actions**: https://github.com/Lilou2023/lilou-logistique/actions

### Vérifications Post-Déploiement
1. ✅ Application accessible
2. ✅ Routage fonctionnel
3. ✅ Performance optimale
4. ✅ Pas d'erreurs console

## Dépannage

### Problèmes Courants

#### 1. Erreur de clé SSH
```bash
# Vérifier la configuration de la clé SSH sur GitHub
# S'assurer que "Allow write access" est coché
```

#### 2. Branche hostinger-deploy manquante
```bash
# Créer la branche manuellement
git checkout -b hostinger-deploy
git push origin hostinger-deploy
```

#### 3. Échec du build
```bash
# Vérifier les dépendances
npm install
npm run build
```

### Commandes de Diagnostic

```bash
# Vérifier l'état du déploiement
git status
git log --oneline -5

# Vérifier la branche hostinger-deploy
git branch -a
git checkout hostinger-deploy
```

## Automatisation Avancée

### Déploiement sur Push

Le workflow se déclenche automatiquement sur:
- ✅ Push vers la branche `hostinger-deploy`
- ✅ Déclenchement manuel via GitHub Actions

### Variables d'Environnement

Le workflow utilise:
- `NODE_VERSION`: Version Node.js (18)
- `deploy_environment`: Environnement cible (production/staging)

---

## 🎯 Checklist de Déploiement

- [ ] Clé SSH configurée sur GitHub
- [ ] Repository configuré sur Hostinger
- [ ] Branche `hostinger-deploy` créée
- [ ] Workflow testé et fonctionnel
- [ ] Application accessible en production
- [ ] Monitoring activé

**Support**: Pour toute question, consulter la documentation ou créer une issue sur GitHub.