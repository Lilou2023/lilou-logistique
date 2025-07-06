# ✅ Post-Merge Checklist – Lilou Logistique

Ce document aide à ne rien oublier juste après la fusion d'une branche importante comme `hébergeur-déployer` vers `main`.

---

## 📦 1. Vérification des conflits

- [ ] Tous les conflits `.env.example`, `package.json`, `README.md` ont été résolus proprement
- [ ] Aucun résidu `<<<<<<<`, `=======`, `>>>>>>>` dans le code
- [ ] `npm install` fonctionne correctement
- [ ] `npm run dev` démarre sans erreur

---

## 🚀 2. Build statique pour Hostinger

- [ ] Exécuter la commande :
  ```bash
  npm run build:hostinger
  ```
- [ ] Vérifier que le dossier `/out` a été généré
- [ ] Copier le contenu vers la racine de `hostinger-deploy`

  ```bash
  cp -r out/* .
  ```

---

## 🌐 3. Commit et push vers la branche de déploiement

- [ ] S'assurer d'être sur la branche `hostinger-deploy`
- [ ] Commit final :

  ```bash
  git add .
  git commit -m "🚀 Déploiement final post-merge"
  git push origin hostinger-deploy
  ```

---

## 🧪 4. Vérification

- [ ] Le webhook Hostinger a bien été déclenché
- [ ] La dernière version est visible en ligne : [https://lilou-logistique.com/app](https://lilou-logistique.com/app)
- [ ] Si erreurs : consulter les journaux sur Hostinger ou `GitHub Actions > Actions`

---

## 📄 5. Mise à jour des documents

- [ ] `README.md` contient bien les infos à jour (CI/CD, fonts locales, commandes, structure)
- [ ] Le fichier `FONTS.md` est présent si tu as ajouté d'autres familles de polices

---

🟢 **Ton projet est maintenant correctement synchronisé, exporté et déployé.** 