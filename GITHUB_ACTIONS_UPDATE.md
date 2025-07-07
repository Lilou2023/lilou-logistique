# 📝 Mise à jour des GitHub Actions vers v4

## 🔄 Changements effectués

Les workflows GitHub Actions ont été mis à jour pour utiliser les versions v4 des actions officielles :

- `actions/checkout@v3` → `actions/checkout@v4`
- `actions/setup-node@v3` → `actions/setup-node@v4`
- `actions/upload-artifact@v3` → `actions/upload-artifact@v4`
- `actions/download-artifact@v3` → `actions/download-artifact@v4`

## ⚠️ Note sur les erreurs du linter

Le linter local peut afficher des erreurs du type :
```
Unable to resolve action `actions/checkout@v4`, repository or version not found
```

**Ces erreurs peuvent être ignorées** car :

1. Les actions v4 sont les versions officielles actuelles sur GitHub
2. Le linter local a des difficultés à résoudre les actions GitHub
3. Les workflows fonctionneront correctement sur GitHub Actions

## ✅ Pourquoi v4 ?

- **Sécurité** : Dernières mises à jour de sécurité
- **Performance** : Améliorations de performance
- **Node.js 20** : Support natif de Node.js 20
- **Maintenance** : Les versions v3 ne sont plus maintenues activement

## 📋 Fichiers mis à jour

- `.github/workflows/deploy-hostinger.yml`
- `.github/workflows/validate-env.yml`

## 🚀 Validation

Pour valider que les workflows fonctionnent :

1. Poussez les changements sur GitHub
2. Vérifiez l'onglet Actions : https://github.com/Lilou2023/lilou-logistique/actions
3. Les workflows devraient s'exécuter sans erreur

---

**Note** : Si vous utilisez un IDE avec un linter GitHub Actions intégré, vous pouvez désactiver temporairement les avertissements pour ces fichiers ou mettre à jour la configuration du linter.
