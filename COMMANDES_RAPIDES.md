# 🚀 Commandes Rapides - Lilou Logistique

## 📦 Installation initiale

```bash
# Installer les dépendances
npm install

# Tester en local
npm run dev
# Ouvrir http://localhost:3000
```

## 🔧 Premier déploiement

```bash
# 1. Initialiser et pousser vers GitHub
bash init-github.sh

# 2. Si erreur "branche hostinger-deploy introuvable"
bash scripts/create-deploy-branch.sh
```

## 📤 Mises à jour

```bash
# Faire des changements puis :
git add .
git commit -m "Description des changements"
git push origin main

# Le déploiement est automatique !
```

## 🔍 Vérifications

```bash
# Voir les branches
git branch -a

# Vérifier la branche de déploiement
git fetch origin
git log origin/hostinger-deploy --oneline -5

# Statut du repository
git status
git remote -v
```

## 🛠️ Dépannage

```bash
# Changer l'URL du repository
git remote set-url origin https://github.com/VOTRE-USERNAME/lilou-logistique.git

# Forcer la création de la branche deploy
git checkout -b hostinger-deploy
git push -u origin hostinger-deploy
git checkout main

# Nettoyer et recommencer
rm -rf .git
bash init-github.sh
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Vérifier les variables d'environnement
npm run validate-env

# Build de test
npm run build
```

## 📝 Build statique manuel

```bash
# Pour hébergement mutualisé
bash scripts/build-static.sh
# Les fichiers seront dans deploy/
```

## 🔗 Liens utiles

- **GitHub Actions** : https://github.com/Lilou2023/lilou-logistique/actions
- **Repository** : https://github.com/Lilou2023/lilou-logistique
- **Site en ligne** : https://lilou-logistique.com

---

💡 **Astuce** : Gardez ce fichier ouvert pendant le déploiement !
