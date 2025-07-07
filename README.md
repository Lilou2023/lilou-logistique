# 🚚 Lilou Logistique – Déploiement Automatique GitHub + Hostinger

[![Deploy Hostinger](https://github.com/Lilou2023/lilou-logistique/workflows/%F0%9F%9A%80%20D%C3%A9ploiement%20Hostinger%20Automatique/badge.svg)](https://github.com/Lilou2023/lilou-logistique/actions)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/Lilou2023/lilou-logistique/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Ce guide explique étape par étape comment configurer, déployer et maintenir le projet **lilou-logistique** sur GitHub avec intégration Hostinger.

Plateforme Next.js dédiée à la gestion logistique intelligente et connectée avec Supabase et OpenAI.

## 🚀 Fonctionnalités principales

- Authentification sécurisée via NextAuth.js
- Base de données temps réel avec Supabase
- Intégration OpenAI (analyse, génération, automatisation)
- CI/CD complet via GitHub Actions
- Tests unitaires et audit de sécurité automatisés
- Chargement local de la police **Inter**

## 💻 Prérequis

- Node.js 20+ installé

---

## 1️⃣ Création du dépôt GitHub

- Rendez-vous sur https://github.com/new
- Nom du dépôt : `lilou-logistique`
- Type : Public
- Ne pas initialiser avec README
- Créer le dépôt

---

## 2️⃣ Initialisation locale et premier push

Dans votre terminal :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Lilou2023/lilou-logistique.git
git push -u origin main
```

Ou utilisez le script :
```bash
bash init-github.sh
```

---

## Deploying to Hostinger
See [HOSTINGER_GIT_SETUP.md](./HOSTINGER_GIT_SETUP.md) for SSH key setup, secrets and deployment workflow.


---

## 🧪 Lancer les tests

```bash
npm run test
```

---

## ✅ Vérification d'environnement

```bash
npm run validate-env
```

Ce script vérifie :

* La présence d'un `.env.local`
* L'absence de `.env` (sécurité)
* Le format et la validité des variables

---

## 🛠️ Build de production

```bash
npm run build
```

---

## 🎨 Formatage du code

Pour appliquer le formatage Prettier sur l'ensemble du projet :

```bash
npx prettier --write .
```

---

## 🔐 CI/CD avec GitHub Actions

Un pipeline automatique est déclenché sur chaque `push` ou `pull request` :

* Validation environnement (développement + production)
* Lint / Type check TypeScript
* Tests unitaires
* Build
* Audit de sécurité NPM
* **Déploiement automatique sur Hostinger** 🚀

### Workflows disponibles :
- `.github/workflows/validate-env.yml` - Validation et tests
- `.github/workflows/deploy-hostinger.yml` - Déploiement automatique

### Déploiement manuel :
```bash
# Script automatisé
./tools/deploy.sh

# Avec options
./tools/deploy.sh --force --skip-tests
```

---

## 🛠️ Scripts de déploiement

### Script principal (recommandé)
```bash
./deploy-lilou-complete.sh
```

### Script de configuration SSH
```bash
./configure-hostinger-ssh.sh
```

### Script d'initialisation
```bash
./init-github.sh
```

---

## ✍️ Police Inter locale

Les fichiers de police Inter se trouvent dans `public/fonts` et sont chargés via `next/font/local` dans `app/layout.tsx`.

---

## 🔗 Liens utiles

- **GitHub Actions** : https://github.com/Lilou2023/lilou-logistique/actions
- **Site production** : https://lilou-logistique.com
- **Aperçu** : https://f471e78f-f041-4565-87c5-6867ce01bf46.dev31.app-preview.com/
- **Documentation** : Consultez les fichiers dans `docs/`

---

## 🧾 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE).
