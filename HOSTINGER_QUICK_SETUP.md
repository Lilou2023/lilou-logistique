# 🚀 Configuration rapide Git sur Hostinger

## 1️⃣ Configuration dans Hostinger

Dans le panneau Hostinger → Section GIT :

- **Dépôt** : `git@github.com:Lilou2023/lilou-logistique.git`
- **Branche** : `hostinger-deploy`
- **Répertoire** : (laisser vide)

Cliquez sur **"Créer"**.

## 2️⃣ Si erreur "branche introuvable"

C'est normal au premier déploiement ! Solutions :

### Option A : Création rapide (30 secondes)
```bash
git checkout -b hostinger-deploy
git push origin hostinger-deploy
git checkout main
```
Puis cliquez sur "Pull" dans Hostinger.

### Option B : Attendre GitHub Actions
1. Poussez sur `main` : `git push origin main`
2. Attendez 3-5 minutes que GitHub Actions crée la branche
3. Cliquez sur "Pull" dans Hostinger

## 3️⃣ Vérification

- Visitez : https://lilou-logistique.com
- Vérifiez GitHub Actions : https://github.com/Lilou2023/lilou-logistique/actions

## ✅ C'est tout !

Les prochaines mises à jour seront automatiques après chaque `git push origin main`. 
