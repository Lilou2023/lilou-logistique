# 🚀 ACTION IMMÉDIATE - Déploie Lilou GO v4.2 sur Hostinger

## ✅ Étape 1 : Lance le déploiement (30 secondes)

```bash
./deploy-hostinger-now.sh
```

Cette commande va :
- 🔨 Builder ton app en fichiers statiques
- 📤 Pousser sur la branche `hostinger-deploy`
- ⚙️ Configurer Apache automatiquement

## 📱 Étape 2 : Sur Hostinger (1 minute)

1. Va dans ton panel Hostinger
2. Section **GIT** → Trouve ton dépôt
3. Clique sur **"Pull"** ou **"Synchroniser"** 🔄

## 🎉 C'est fait !

Ton site sera en ligne dans 2-3 minutes sur :
**https://lilou-logistique.com**

---

## 🚀 Bonus : Déploiement automatique avec GitHub Actions

### Active le workflow :

1. **Sur GitHub** → Onglet **Actions**
2. Si tu vois un message jaune → Clique **"Enable workflows"**
3. Le workflow `.github/workflows/deploy-hostinger.yml` est déjà configuré !

### Configure les secrets GitHub :

Va dans **Settings** → **Secrets** → **Actions** et ajoute :

```
NEXT_PUBLIC_SUPABASE_URL = ta-valeur
NEXT_PUBLIC_SUPABASE_ANON_KEY = ta-valeur
```

### Résultat :

À chaque `git push`, GitHub va automatiquement :
- ✅ Tester ton code
- ✅ Builder en statique
- ✅ Déployer sur `hostinger-deploy`
- ✅ Tu n'auras qu'à cliquer "Pull" sur Hostinger

---

## 📝 Commandes utiles

```bash
# Voir l'état du déploiement
git log hostinger-deploy --oneline -5

# Forcer un rebuild
./deploy-hostinger-now.sh

# Retourner sur main
git checkout main
```

---

## ⚡ C'est parti !

**Lance la commande maintenant :**
```bash
./deploy-hostinger-now.sh
```

Puis va sur Hostinger et clique "Pull" ! 🚀