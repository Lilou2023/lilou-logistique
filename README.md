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

## ⚙️ Configuration de l'environnement

1. Copiez le fichier `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```
2. Renseignez les variables d'environnement dans `.env.local`.
   Les secrets GitHub et la configuration du déploiement sont détaillés dans [HOSTINGER_GIT_SETUP.md](HOSTINGER_GIT_SETUP.md).

---

## 🧪 Tests et validation

```bash
npm run test
npm run validate-env
```

---

## 🛠️ Build de production

```bash
npm run build
```

---

## 🔐 CI/CD

Ce projet utilise GitHub Actions pour valider le code et déployer automatiquement la version statique sur Hostinger. Les étapes détaillées se trouvent dans [HOSTINGER_GIT_SETUP.md](HOSTINGER_GIT_SETUP.md).

---

## ✍️ Police Inter locale

Les fichiers de police Inter se trouvent dans `public/fonts` et sont chargés via `next/font/local` dans `app/layout.tsx`.

---

## 🧾 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE).
