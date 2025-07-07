# 🔐 Configuration des Secrets GitHub pour le Déploiement Automatique

## 📋 Vue d'ensemble

Ce guide vous explique comment configurer les secrets GitHub nécessaires pour que le déploiement automatique via GitHub Actions fonctionne correctement.

## 🚀 Étape 1 : Accéder aux Secrets GitHub

1. **Allez sur votre dépôt GitHub** : `https://github.com/Lilou2023/lilou-logistique`

2. **Cliquez sur l'onglet "Settings"** (en haut à droite)

3. **Dans le menu de gauche, cliquez sur "Secrets and variables" → "Actions"**

4. **Cliquez sur "New repository secret"** pour chaque secret

## 🔑 Étape 2 : Ajouter les Secrets Requis

### Variables d'environnement à ajouter :

| Nom du Secret | Valeur | Description |
|---------------|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mvhogfelpbufnrklxpxq.supabase.co` | URL de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Clé anonyme Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Clé de service Supabase |
| `OPENAI_API_KEY` | `sk-proj-wcEYpbVu2ctBOzT5zmJiSaV5...` | Clé API OpenAI |
| `JWT_SECRET` | `UiuSVGy6+Tzn93GwXa/dcyPBeD+Y9q7f...` | Secret JWT pour l'authentification |
| `NEXTAUTH_SECRET` | `ytvqKJNF+DHMZXHeipda6n+DGVOKYWz2...` | Secret NextAuth |

### Variables optionnelles :

| Nom du Secret | Valeur | Description |
|---------------|--------|-------------|
| `NEXT_PUBLIC_Maps_API_KEY` | `AIzaSyBoJQ8DvmPw0Y5u4ZzrRfRj-peId7JGBnI` | Clé API Google Maps |
| `WEBHOOK_URL_ALERTS` | `https://hooks.slack.com/services/...` | URL webhook pour les alertes |
| `WEBHOOK_SECRET` | `votre_super_cle_webhook_secrete_123` | Secret pour les webhooks |

## 📝 Étape 3 : Procédure d'ajout

Pour chaque secret :

1. **Cliquez sur "New repository secret"**
2. **Nom** : Entrez le nom exact (ex: `NEXT_PUBLIC_SUPABASE_URL`)
3. **Valeur** : Copiez la valeur depuis votre fichier `.env.local`
4. **Cliquez sur "Add secret"**

## ✅ Étape 4 : Vérification

Une fois tous les secrets ajoutés :

1. **Retournez dans votre terminal**
2. **Lancez le script de déploiement** :
   ```bash
   ./tools/deploy.sh
   ```
3. **Vérifiez que le déploiement se fait sans erreur**

## 🔍 Dépannage

### Erreur "Secret not found"
- Vérifiez que le nom du secret est exactement le même que dans le workflow
- Assurez-vous que le secret a été ajouté au bon dépôt

### Erreur de déploiement
- Vérifiez les logs GitHub Actions dans l'onglet "Actions"
- Assurez-vous que toutes les variables requises sont présentes

## 📚 Ressources

- [Documentation GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Guide de déploiement](./docs/README_DEPLOIEMENT.md)
- [Script de déploiement](./tools/deploy.sh)

## 🎯 Prochaines étapes

Une fois les secrets configurés :
1. Testez le déploiement avec `./tools/deploy.sh`
2. Vérifiez que le site est accessible sur Hostinger
3. Configurez les notifications si nécessaire

---

**Note** : Les secrets GitHub sont chiffrés et ne peuvent pas être consultés après leur ajout. Gardez une copie de vos valeurs dans un endroit sûr. 