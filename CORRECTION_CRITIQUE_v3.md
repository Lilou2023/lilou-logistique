# 🚨 Mise à jour Critique - Actions GitHub v4 obligatoires

Depuis peu, GitHub impose l'usage des versions **v4** pour les actions officielles. Les anciennes versions `@v3` ne sont plus acceptées.

## Historique
Ce fichier décrivait initialement un retour aux actions `@v3` car `@v4` n'était pas disponible. Cette approche est désormais obsolète.

## Actions à utiliser
```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
- uses: actions/upload-artifact@v4
- uses: actions/download-artifact@v4
```

Tous les workflows du projet ont été mis à jour en conséquence et s'exécutent correctement avec ces versions.
