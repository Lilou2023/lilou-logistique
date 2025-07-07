# 🚀 Déploiement rapide - Lilou Logistique

## 📋 Objectif
Configurer et déployer automatiquement le projet lilou-logistique sur GitHub avec intégration Hostinger.

## ⚡ Étapes rapides

### 1. Créer le dépôt GitHub
- Allez sur : https://github.com/new
- **Nom** : `lilou-logistique`
- **Type** : Public
- ❌ Ne pas initialiser avec README
- ❌ Ne pas sauvegarder les infos personnelles
- Cliquez sur "Create repository"

### 2. Ajouter la clé SSH de Hostinger
- Accédez à **Settings → Deploy keys** dans le dépôt
- **Titre** : `Hostinger - lilou-logistique.com`
- **Clé SSH** :
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDULDMx2iSXlJ5mo9cPIm1LJ5OFGB5atXuLFkR53Mqy6Lla3vAZKbP0Np2LhgXOxCxjku1p66NRND+A3CqGVOpDGMoiAEFWKrjHkJPFgokB956MDFopvHJ4zQkbX4ubMe/6j6dkht4Web9QxzPFWcUeCFihkmydAdEEFvDyfYiqS5X1JRVgRYjp5ISddws7Wl9T2ivP2hAM40Fz5e1nPGX8vJ/yzy7GHYD0g01NVdndZHnfu+UwDHhL7+4mpJdkCFNWpDlUZIyrbiE0kAfYaisOrewChq0b5ZMmhK0TiuCvVoTRmmTsp92TVwr7cApyxyWq0gGtq44tUtJqESSrAq1BL/SIo+X0d6fcKd7qffxnz2rhL28UoVLQr+1HikJwEh1Wbdbh4g3vGuj1XQLzMG4LG6ezIfluEnDRB8uvRq6NIJi/4j/TLpTPbKZ5jzN6hHOe9u76FmmeSAHzKQUnc49LVQaG2D/E0/hS5+C6EeHL/l9sQf6D/xUV/STUOQ2arek= u240832595@fr-int-web1588.main-hosting.eu
```
- ✅ Cochez **Allow write access**

### 3. Pousser le projet local
Depuis le dossier `lilou-logistique`, exécuter :
```bash
bash init-github.sh
```
Ce script initialise Git, configure les infos locales, fait le commit et push vers main.

### 4. Configurer les secrets GitHub
Dans **Settings → Secrets and variables → Actions**, ajouter :

| Nom du secret | Valeur |
|---------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-supabase-url.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` |
| `OPENAI_API_KEY` | `your-openai-api-key` |
| `JWT_SECRET` | `your-jwt-secret` |
| `NEXTAUTH_SECRET` | `your-nextauth-secret` |

### 5. Configurer Git sur Hostinger
Dans le panneau d'administration → section **GIT** :

| Champ | Valeur |
|-------|--------|
| **Dépôt** | `git@github.com:Lilou2023/lilou-logistique.git` |
| **Branche** | `hostinger-deploy` |
| **Répertoire** | (laisser vide) |

Cliquer sur **Créer**.

### 6. Attendre le déploiement automatique
- GitHub Actions va créer la branche `hostinger-deploy`
- Hostinger va automatiquement déployer le site
- **Site en ligne** : https://lilou-logistique.com
- **Aperçu live** : https://f471e78f-f041-4565-87c5-6867ce01bf46.dev31.app-preview.com/

## 🔄 Scripts automatisés

### Script complet
```bash
./deploy-lilou-complete.sh
```
Guide interactif complet avec toutes les étapes.

### Script de configuration SSH
```bash
./configure-hostinger-ssh.sh
```
Configuration rapide de la clé SSH et des secrets.

### Script d'initialisation
```bash
./init-github.sh
```
Initialisation Git et push initial.

## 📁 Fichiers créés

- `deploy-lilou-complete.sh` - Script de déploiement complet
- `configure-hostinger-ssh.sh` - Configuration SSH et secrets
- `.env.example` - Exemple de configuration des variables d'environnement
- `setup-lilou-logistique.sh` - Script de configuration générale

## ✅ Vérifications finales

1. ✅ Dépôt GitHub créé : https://github.com/Lilou2023/lilou-logistique
2. ✅ Clé SSH Hostinger ajoutée
3. ✅ Code poussé vers main
4. ✅ Secrets GitHub configurés
5. ✅ Configuration Hostinger effectuée
6. ✅ GitHub Actions en cours
7. ✅ Branche hostinger-deploy créée
8. ✅ Site déployé sur Hostinger

## 🚀 Mises à jour futures

Pour chaque modification :
```bash
git add .
git commit -m "Votre message"
git push origin main
```
Le déploiement sera automatique !

## 🔗 Liens utiles

- **GitHub Actions** : https://github.com/Lilou2023/lilou-logistique/actions
- **Site production** : https://lilou-logistique.com
- **Aperçu** : https://f471e78f-f041-4565-87c5-6867ce01bf46.dev31.app-preview.com/
- **Documentation** : Consultez les fichiers dans `docs/`

---

**Note** : Ce guide suit exactement les instructions fournies et utilise les clés et URLs spécifiques du projet. 