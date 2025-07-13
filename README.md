# Lilou Logistique

## Problèmes potentiels et corrections

### a) Vérification des secrets
**Problème :** Le job `build-and-prepare` s'arrête si une variable d'environnement est manquante, sans indiquer comment la configurer.
**Correction :** Ajouter une sous-section "Configuration des secrets" :
```bash
# Sur GitHub → Settings → Secrets and variables → Actions, ajoutez :
- SUPABASE_URL        : URL de l'instance Supabase
- SUPABASE_SERVICE_KEY : Clé secrète de l'instance Supabase
- HOSTINGER_SSH_KEY : Clé SSH du serveur Hostinger
# ...autres variables nécessaires
```

### b) Déploiement sur Hostinger
**Problème :** Le répertoire cible n'est pas vide, empêchant le `git pull`.
**Correction :** Documenter la procédure pour nettoyer le dossier de déploiement :
```bash
# Option 1 : Supprimer tout le contenu
rm -rf /home/votre-utilisateur/public_html/*
# Option 2 : Déployer dans un sous-dossier vide
```

### c) Nom de branche Git
**Problème :** Utilisation conflictuelle de `master` vs `main`.
**Correction :**
- Confirmer que la branche principale sur GitHub est `main`.
- - Dans Hostinger → Git, renseigner `main` comme branche de déploiement.
