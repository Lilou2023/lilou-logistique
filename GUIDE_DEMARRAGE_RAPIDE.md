# 🚀 Guide de Démarrage Rapide - Lilou Logistique

## 📋 Prérequis

- ✅ **Git** installé sur votre machine
- ✅ **Node.js** version 20+ installé
- ✅ **Compte GitHub** créé
- ✅ **Accès au repository** Lilou2023/lilou-logistique

---

## 🔧 Installation locale

### 1. Cloner le repository

```bash
# Cloner le repository
git clone https://github.com/Lilou2023/lilou-logistique.git

# Aller dans le dossier
cd lilou-logistique

# Vérifier les branches
git branch -a
```

### 2. Configuration de l'environnement

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Éditer .env.local avec vos variables
nano .env.local
```

### 3. Variables d'environnement requises

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
OPENAI_API_KEY=votre_clé_openai
```

### 4. Lancer le serveur de développement

```bash
# Démarrer le serveur
npm run dev

# Ou utiliser l'alias
liloudev
```

Le site sera accessible sur : http://localhost:3000

---

## 🔄 Workflow de développement

### 1. Créer une nouvelle branche

```bash
# Mettre à jour la branche principale
git checkout main
git pull origin main

# Créer une nouvelle branche
git checkout -b feature/nom-de-votre-fonctionnalite
```

### 2. Développer

```bash
# Faire vos modifications
# ... code ...

# Vérifier les changements
git status

# Ajouter les fichiers
git add .

# Commiter
git commit -m "feat: description de votre fonctionnalité"

# Pousser la branche
git push origin feature/nom-de-votre-fonctionnalite
```

### 3. Créer une Pull Request

1. **Aller sur GitHub** → Pull requests
2. **New Pull Request**
3. **Sélectionner** :
   - Base: `main`
   - Compare: `feature/nom-de-votre-fonctionnalite`
4. **Remplir la description**
5. **Créer la PR**

### 4. Déploiement automatique

Une fois la PR mergée sur `main` :
- ✅ **GitHub Actions** se déclenche automatiquement
- ✅ **Build statique** Next.js
- ✅ **Branche `hostinger-deploy`** mise à jour
- ✅ **Déploiement** automatique sur Hostinger

---

## 🧪 Tests et validation

### Tests automatiques

```bash
# Lancer les tests
npm test

# Tests en mode watch
npm run test:watch

# Validation des variables d'environnement
npm run validate-env
```

### Build de production

```bash
# Build statique pour Hostinger
npm run build:hostinger

# Vérifier les fichiers générés
ls out/
```

---

## 📁 Structure du projet

```
lilou-logistique/
├── app/                    # Pages Next.js 14 (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React réutilisables
├── lib/                   # Utilitaires et configurations
├── public/                # Fichiers statiques
│   └── fonts/            # Polices locales
├── scripts/               # Scripts utilitaires
├── .github/               # Workflows GitHub Actions
│   └── workflows/
├── __tests__/             # Tests
└── docs/                  # Documentation
```

---

## 🚀 Commandes utiles

### Développement

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification du code
npm run type-check   # Vérification TypeScript
```

### Tests

```bash
npm test             # Tests unitaires
npm run test:watch   # Tests en mode watch
npm run test:coverage # Tests avec couverture
```

### Déploiement

```bash
npm run build:hostinger  # Build pour Hostinger
npm run deploy          # Déploiement manuel
```

### Git

```bash
git status              # État du repository
git branch -a           # Toutes les branches
git log --oneline       # Historique des commits
git stash               # Sauvegarder temporairement
git stash pop           # Restaurer les changements
```

---

## 🔧 Résolution de problèmes

### Erreurs courantes

#### 1. "Module not found"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

#### 2. "Environment variables missing"

```bash
# Vérifier le fichier .env.local
cat .env.local

# Ou recréer depuis l'exemple
cp .env.example .env.local
```

#### 3. "Build failed"

```bash
# Nettoyer le cache
rm -rf .next out/
npm run build
```

#### 4. "Git push failed"

```bash
# Mettre à jour la branche
git pull origin main
git push origin votre-branche
```

### Support

- 📧 **Email** : your-email@example.com
- 📚 **Documentation** : `GUIDE_GITHUB_HOSTING.md`
- 🔧 **Issues** : GitHub Issues du projet

---

## 🎯 Checklist de démarrage

- [ ] Repository cloné
- [ ] Dépendances installées (`npm install`)
- [ ] Variables d'environnement configurées (`.env.local`)
- [ ] Serveur de développement fonctionnel (`npm run dev`)
- [ ] Tests passants (`npm test`)
- [ ] Compréhension du workflow Git
- [ ] Accès aux workflows GitHub Actions

---

*Guide de démarrage rapide - Lilou Logistique v1.0* 