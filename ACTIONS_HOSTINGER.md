# ✅ Actions à faire dans Hostinger

## 1. Sur GitHub (5 minutes)

1. **Créez votre repository** si pas encore fait :
   - Allez sur https://github.com/new
   - Nom : `lilou-logistique`
   - Type : Public
   - Créez le repository

2. **Ajoutez la clé SSH de Hostinger** :
   - Allez dans Settings → Deploy keys
   - Add deploy key
   - Titre : `Hostinger - lilou-logistique.com`
   - Collez la clé SSH fournie par Hostinger
   - ✅ Cochez "Allow write access"
   - Add key

3. **Poussez le code** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/Lilou2023/lilou-logistique.git
   git push -u origin main
   ```

## 2. Dans Hostinger (2 minutes)

Dans le formulaire Git que vous avez montré, entrez exactement :

| Champ | Valeur |
|-------|---------|
| **Dépôt** | `git@github.com:Lilou2023/lilou-logistique.git` |
| **Branche** | `hostinger-deploy` |
| **Répertoire** | (laisser vide) |

Puis cliquez sur **"Créer"**.

## 3. Attendez la magie ✨

### ⚠️ Erreur possible au premier déploiement

Si vous voyez : **"branche hostinger-deploy introuvable"**, c'est normal !

**Solution rapide** :
```bash
bash scripts/create-deploy-branch.sh
```
Puis cliquez sur "Pull" dans Hostinger.

### Déploiement normal

1. GitHub Actions va automatiquement :
   - Détecter votre push
   - Construire une version statique
   - Créer la branche `hostinger-deploy`

2. Hostinger va :
   - Détecter la nouvelle branche
   - Déployer automatiquement

⏱️ **Temps total** : ~10 minutes pour le premier déploiement

## 4. Vérifiez

Visitez https://lilou-logistique.com

## 🔄 Pour les mises à jour futures

Simplement :
```bash
git add .
git commit -m "Votre message"
git push origin main
```

Le déploiement sera automatique !

## ⚠️ Si la branche n'existe pas encore

Attendez 5 minutes après votre premier push sur `main`, GitHub Actions va la créer automatiquement.

Ou créez-la manuellement :
```bash
git checkout -b hostinger-deploy
git push origin hostinger-deploy
```

---

**Besoin d'aide ?** Vérifiez le statut sur :
- GitHub Actions : https://github.com/Lilou2023/lilou-logistique/actions
- Logs Hostinger : Dans votre panel → Git → Logs
