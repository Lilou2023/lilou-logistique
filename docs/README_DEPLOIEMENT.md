# 🚀 Déploiement Automatisé – Lilou Logistique

## 🔁 Stratégie Git

| Branche              | Rôle |
|----------------------|--------------------------------------------------------|
| `main`               | Développement fonctionnel avec Next.js |
| `hostinger-deploy`   | Branche de production statique exportée (`next export`) |

---

## ⚙️ Préparation

1. `main` contient le code source Next.js
2. `hostinger-deploy` contient **le résultat de `next export`** pour Hostinger
3. Le dossier `public_html/` n'est pas suivi dans `main` et est généré lors de chaque export
4. Webhook GitHub → Hostinger déclenche un `git pull` sur cette branche

---

## 🧪 Étapes du déploiement

```bash
git checkout main
git pull origin main

# Fusionner les derniers changements dans hostinger-deploy
git checkout hostinger-deploy
git merge main

# Rebuild + export statique
npm install
npm run build:hostinger
cp -r out/* .

# Commit et push
git add .
git commit -m "🚀 Déploiement Hostinger"
git push origin hostinger-deploy
```

---

## 📡 Webhook GitHub → Hostinger

Déclenché automatiquement à chaque `push` vers `hostinger-deploy`.
👉 URL personnalisée à configurer dans le tableau de bord Hostinger.

---

## 📁 Structure attendue sur `/public_html/app` (Hostinger)

| Dossier/Fichier | Description                 |
| --------------- | --------------------------- |
| `/fonts`        | Polices locales             |
| `index.html`    | Page exportée               |
| `_next/`        | Bundles JS/CSS générés      |
| `favicon.ico`   | Icone                       |
| `404.html`      | Page d'erreur personnalisée |

---

## 🔍 Vérifications après déploiement

- [ ] Site disponible : [https://lilou-logistique.com/app](https://lilou-logistique.com/app)
- [ ] Le commit fusionné est bien pris en compte
- [ ] Aucune erreur de chargement (fonts, scripts, layout)

---

✅ **Ton déploiement est automatisé, robuste et facile à reproduire.**
