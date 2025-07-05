# 🚨 Mise à jour critique - adoption des actions GitHub v4

GitHub impose désormais l'utilisation des versions v4 pour les actions officielles comme `actions/checkout`, `actions/setup-node` et `actions/upload-artifact`.
Toutes les références `@v3` doivent être remplacées par `@v4` afin de garantir la compatibilité avec le marketplace et d'éviter les erreurs de résolution.

## Plan de migration
1. Rechercher dans chaque workflow les actions `@v3` et les mettre à jour vers `@v4`.
2. Tester les workflows sur une branche dédiée (`workflow_dispatch`) pour valider la migration.
3. Déployer la configuration mise à jour sur `main` après validation.

## Statut actuel
- Tous les workflows du dépôt utilisent maintenant `actions/checkout@v4`, `actions/setup-node@v4` et `actions/upload-artifact@v4`.
- La documentation a été revue pour refléter cette exigence.

Cette mise à jour supprime toute référence aux versions v3 devenues obsolètes et assure le bon fonctionnement des pipelines CI/CD.
