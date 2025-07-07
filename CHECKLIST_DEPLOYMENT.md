# ✅ Checklist Déploiement Hostinger

## 📋 Avant de commencer

- [ ] Compte GitHub créé
- [ ] Accès à Hostinger avec site web configuré
- [ ] Git installé sur votre ordinateur

## 🚀 Étapes de déploiement

### 1. GitHub - Préparation (5 min)

- [ ] Créer le repository sur GitHub :
  ```
  Nom : lilou-logistique
  Type : Public
  ```

- [ ] Ajouter la clé SSH de Hostinger :
  ```
  Settings → Deploy keys → Add deploy key
  Titre : Hostinger - lilou-logistique.com
  Clé : [coller la clé SSH de Hostinger]
  ✅ Allow write access
  ```

### 2. Local - Push du code (3 min)

- [ ] Initialiser et pousser :
  ```bash
  bash init-github.sh
  ```
  
- [ ] Si erreur, vérifier l'URL :
  ```bash
  git remote -v
  git remote set-url origin https://github.com/VOTRE-USERNAME/lilou-logistique.git
  ```

### 3. Hostinger - Configuration Git (2 min)

- [ ] Dans le panel Hostinger, section GIT :
  ```
  Dépôt : git@github.com:Lilou2023/lilou-logistique.git
  Branche : hostinger-deploy
  Répertoire : (laisser vide)
  ```
  
- [ ] Cliquer sur "Créer"

### 4. Résolution d'erreurs

#### ❌ Erreur "branche hostinger-deploy introuvable"

- [ ] Exécuter :
  ```bash
  bash scripts/create-deploy-branch.sh
  ```
  
- [ ] Retourner sur Hostinger → Cliquer "Pull"

#### ❌ Erreur "Permission denied"

- [ ] Vérifier que la clé SSH est bien ajoutée sur GitHub
- [ ] Vérifier "Allow write access" est coché

### 5. Vérification finale

- [ ] Site accessible : https://lilou-logistique.com
- [ ] GitHub Actions fonctionne : [Voir les actions](https://github.com/Lilou2023/lilou-logistique/actions)
- [ ] Test de mise à jour :
  ```bash
  git add .
  git commit -m "Test update"
  git push origin main
  ```

## 🎯 Déploiement réussi quand :

- ✅ Le site s'affiche sur votre domaine
- ✅ GitHub Actions est vert
- ✅ Les mises à jour se déploient automatiquement

## 📞 En cas de problème

1. Vérifiez les logs Hostinger (Panel → GIT → Logs)
2. Vérifiez GitHub Actions
3. Consultez `FIX_FIRST_DEPLOYMENT.md`

---

**Temps total estimé : 15 minutes** ⏱️
