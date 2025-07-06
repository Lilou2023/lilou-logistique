# 🚚 Lilou Logistique

Plateforme Next.js dédiée à la gestion logistique intelligente et connectée avec Supabase et OpenAI.

## 🆘 Premier déploiement sur Hostinger ?

Si vous avez l'erreur **"branche hostinger-deploy introuvable"**, c'est normal ! 

**Solution rapide** :
```bash
bash scripts/create-deploy-branch.sh
```
Puis relancez le déploiement sur Hostinger. [Plus d'infos](FIX_FIRST_DEPLOYMENT.md)

## 🚀 Fonctionnalités principales

- Authentification sécurisée via NextAuth.js
- Base de données temps réel avec Supabase
- Intégration OpenAI (analyse, génération, automatisation)
- CI/CD complet via GitHub Actions
- Tests unitaires et audit de sécurité automatisés
- Police Inter locale (fin de dépendance à Google Fonts)

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
| `NEXT_PUBLIC_SUPABASE_URL`      | URL de votre projet Supabase                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme publique Supabase               |
| `SUPABASE_SERVICE_ROLE_KEY`     | Clé de service Supabase (privée)            |
| `OPENAI_API_KEY`                | Clé API OpenAI                              |
| `JWT_SECRET`                    | Secret JWT pour NextAuth                    |
| `NEXTAUTH_SECRET`               | Secret NextAuth                             |

### Ajouter les secrets GitHub

Pour permettre le déploiement automatique, ajoutez aussi ces variables dans
**Settings → Secrets and variables → Actions** de votre dépôt GitHub :

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

Fichier de workflow : `.github/workflows/validate-env.yml`

---

## ✍️ Police Inter locale

Les fichiers de police Inter se trouvent dans `public/fonts` et sont chargés via `next/font/local` dans `app/layout.tsx`.

---

## 🧾 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE).

