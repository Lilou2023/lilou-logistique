# 🚚 Lilou Logistique – Déploiement Automatique GitHub + Hostinger

Ce guide explique étape par étape comment configurer, déployer et maintenir le projet **lilou-logistique** sur GitHub avec intégration Hostinger.

---

## 1️⃣ Création du dépôt GitHub

- Rendez-vous sur https://github.com/new
- Nom du dépôt : `lilou-logistique`
- Type : Public
- Ne pas initialiser avec README
- Créez le repository

---

## 2️⃣ Initialisation locale et premier push

Dans votre terminal :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Lilou2023/lilou-logistique.git
git push -u origin main
```
Ou utilisez le script :
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

Dans GitHub : Settings → Secrets and variables → Actions
Ajoutez les secrets suivants :
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

Modifiez `.env.local` avec vos variables d’environnement.

---

## 6️⃣ Tester et valider l’environnement

```bash
npm run test
npm run validate-env
```

---

## 7️⃣ Configurer le déploiement Git sur Hostinger

Dans le panneau Hostinger → section GIT :
- Dépôt : `git@github.com:Lilou2023/lilou-logistique.git`
- Branche : `hostinger-deploy`
- Répertoire : (laisser vide)
- Cliquez sur Créer

---

## 8️⃣ Premier déploiement automatique

- Faites un commit sur la branche main :
```bash
git add .
git commit -m "Déclenchement premier build"
git push origin main
```
- GitHub Actions va :
  - Construire le site statique
  - Créer la branche `hostinger-deploy`
  - Déployer automatiquement via Hostinger
- Vérifiez :
  - GitHub → Actions (workflow)
  - Hostinger → Git → Logs
  - https://lilou-logistique.com

---

## 9️⃣ Mises à jour continues

À chaque modification du code :
```bash
git add .
git commit -m "Votre message"
git push origin main
```
Le déploiement est automatique ✨

---

## 🔄 Dépannage courant

- Le site ne se met pas à jour ? Vérifiez GitHub Actions, cliquez sur "Pull" dans Hostinger, videz le cache navigateur.
- Erreur 404 ? Vérifiez que `.htaccess` est bien généré (voir `hostinger-deploy.sh`).
- Images manquantes ? Utilisez `/images/logo.png` (chemins absolus).

---

## 🔐 Sécurité et performance

- CI/CD : Automatisé avec GitHub Actions
- Tests et validation : via `validate-env.yml` et `test`
- Export statique : Pour hébergement mutualisé
- Sécurité : `.htaccess` généré avec protections avancées
- Performances : Gzip + cache + routing optimisé

---

## 📚 Références utiles

- `README.md` (ce fichier)
- `HOSTINGER_GIT_SETUP.md`
- `ACTIONS_HOSTINGER.md`
- `GITHUB_SECRETS_SETUP.md`
- `GUIDE_RAPIDE_HOSTINGER.md`
- `DEPLOYMENT_HOSTINGER.md`

---

En suivant ce guide, vous aurez un projet lilou-logistique prêt à être développé, testé et déployé automatiquement sur Hostinger via GitHub Actions.

N’hésitez pas à demander une version PDF ou un guide illustré si besoin !
