# 🚚 Lilou Logistique

Plateforme Next.js dédiée à la gestion logistique intelligente et connectée avec Supabase et OpenAI.

## 🚀 Fonctionnalités principales

- Authentification sécurisée via NextAuth.js
- Base de données temps réel avec Supabase
- Intégration OpenAI (analyse, génération, automatisation)
- CI/CD complet via GitHub Actions
- Tests unitaires et audit de sécurité automatisés

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
| `NEXT_PUBLIC_SUPABASE_URL`      | https://mvhogfelpbufnrklxpxq.supabase.co|
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjQ0MDksImV4cCI6MjA2NDMwMDQwOX0.FrVdKelHzLgJFGFwnYfA23XsbzgrK6PCsSV01a1qM5I               |
| `SUPABASE_SERVICE_ROLE_KEY`     | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcyNDQwOSwiZXhwIjoyMDY0MzAwNDA5fQ.keTkB1muKnhNK3TkDrOcdG6vjQJKA_OYDIUSIUPDfSM |
| `OPENAI_API_KEY`                | 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|
| `JWT_SECRET`                    | UiuSVGy6+Tzn93GwXa/dcyPBeD+Y9q7f18fwUPL/D1cdYmQQI5K8OjMZh/RlbCErVbgCSL9NqNAPAYVVxzAzPA==                        |
| `NEXTAUTH_SECRET`               | ytvqKJNF+DHMZXHeipda6n+DGVOKYWz2+5MoUiN/I6ED7v65kwboamNyN1Q=                 |

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

Fichier de workflow : `.github/workflows/validate-env.yml`

---

## 🧾 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE).

