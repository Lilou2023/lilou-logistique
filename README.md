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

## 3️⃣ Ajouter la clé SSH Hostinger à GitHub

- Allez dans votre dépôt GitHub → Settings → Deploy keys
- Cliquez sur Add deploy key
- Titre : `Hostinger - lilou-logistique.com`
- Collez la clé SSH fournie par Hostinger
- Cochez **Allow write access**
- Cliquez sur Add key

---

## 4️⃣ Ajouter les secrets GitHub

Dans GitHub : Settings → Secrets and variables → Actions
Ajoutez les secrets suivants :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`

> Voir le fichier `GITHUB_SECRETS_SETUP.md` pour les valeurs et la génération des clés.

---

## 5️⃣ Installer et configurer le projet localement

```bash
git clone https://github.com/Lilou2023/lilou-logistique.git
cd lilou-logistique
npm install
cp .env.example .env.local
```

Modifiez `.env.local` avec vos variables d'environnement.

---

## ⚙️ Configuration de l'environnement

1. **Crée un fichier `.env.local`** à la racine du projet :

```bash
cp .env.example .env.local
```

2. **Renseigne les variables d'environnement** dans `.env.local` :

| Variable                        | Description                                 |
| ------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL de votre projet Supabase                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase                        |
| `SUPABASE_SERVICE_ROLE_KEY`     | Clé de service Supabase (privée)            |
| `OPENAI_API_KEY`                | Clé API OpenAI                              |
| `JWT_SECRET`                    | Secret JWT (32+ caractères)                 |
| `NEXTAUTH_SECRET`               | Secret NextAuth (32+ caractères)            |

### Ajouter les secrets GitHub

Pour permettre le déploiement automatique, ajoutez aussi ces variables dans
**Settings → Secrets and variables → Actions** de votre dépôt GitHub :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

---

## 6️⃣ Tester et valider l'environnement

```bash
npm run test
npm run validate-env
```

---

## 7️⃣ Configurer le déploiement Git sur Hostinger

Dans le panneau Hostinger → section GIT :
- Dépôt : `git@github.com:Lilou2023/lilou-logistique.git`
- Branche : `hostinger-deploy`
- Répertoire : (laisser vide)
- Cliquez sur Créer

---

## 8️⃣ Premier déploiement automatique

- Faites un commit sur la branche main :
```bash
git add .
git commit -m "Déclenchement premier build"
git push origin main
```
- GitHub Actions va :
  - Construire le site statique
  - Créer la branche `hostinger-deploy`
  - Déployer automatiquement via Hostinger
- Vérifiez :
  - GitHub → Actions (workflow)
  - Hostinger → Git → Logs
  - https://lilou-logistique.com

---

## 9️⃣ Mises à jour continues

À chaque modification du code :
```bash
git add .
git commit -m "Votre message"
git push origin main
```
Le déploiement sera automatique !

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
