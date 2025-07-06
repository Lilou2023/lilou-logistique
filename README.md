# 🚚 Lilou Logistique

[![Deploy Hostinger](https://github.com/Lilou2023/lilou-logistique/workflows/%F0%9F%9A%80%20D%C3%A9ploiement%20Hostinger%20Automatique/badge.svg)](https://github.com/Lilou2023/lilou-logistique/actions)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/Lilou2023/lilou-logistique/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Plateforme Next.js dédiée à la gestion logistique intelligente et connectée avec Supabase et OpenAI.

## 🚀 Fonctionnalités principales

- Authentification sécurisée via NextAuth.js
- Base de données temps réel avec Supabase
- Intégration OpenAI (analyse, génération, automatisation)
- CI/CD complet via GitHub Actions
- Tests unitaires et audit de sécurité automatisés
- Chargement local de la police **Inter**

---

## 📦 Installation locale

```bash
git clone https://github.com/Lilou2023/lilou-logistique.git
cd lilou-logistique
npm install
```

---

## ⚙️ Configuration de l'environnement

1. **Crée un fichier `.env.local`** à la racine du projet :

```bash
cp .env.example .env.local
```

2. **Renseigne les variables d'environnement** dans `.env.local` :

| Variable                        | Description                                 |
| ------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` |              |
| `SUPABASE_SERVICE_ROLE_KEY`     | |
| `OPENAI_API_KEY`                ||
| `JWT_SECRET`                    |                      |
| `NEXTAUTH_SECRET`               |                |
### Ajouter les secrets GitHub

Pour permettre le déploiement automatique, ajoutez aussi ces variables dans
**Settings → Secrets and variables → Actions** de votre dépôt GitHub :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`


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

## ✍️ Police Inter locale

Les fichiers de police Inter se trouvent dans `public/fonts` et sont chargés via `next/font/local` dans `app/layout.tsx`.

---


## 🧾 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE).

