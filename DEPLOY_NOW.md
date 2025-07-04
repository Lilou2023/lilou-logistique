# 🚀 DÉPLOIEMENT IMMÉDIAT SUR HOSTINGER

## ✅ Ta configuration est parfaite !

### 1️⃣ Une seule commande à exécuter :

```bash
./quick-deploy.sh
```

### 2️⃣ Sur Hostinger (dans la section GIT où tu es) :

Cherche et clique sur l'un de ces boutons :
- **"Pull"** 
- **"Tirer"**
- **"Synchroniser"**
- **🔄** (icône de synchronisation)

### 3️⃣ C'est tout ! 🎉

Ton site sera en ligne dans 2-3 minutes sur :
**https://lilou-logistique.com**

---

## 📝 Si ça ne marche pas :

### Option 1 : Vérifier le build
```bash
# Le script devrait créer un dossier dist
ls -la dist/
```

### Option 2 : Forcer la synchronisation
Dans Hostinger :
1. Clique sur la poubelle 🗑️ à côté de ton dépôt
2. Recrée-le avec les mêmes paramètres :
   - Dépôt : `git@github.com:Lilou2023/lilou-logistique.git`
   - Branche : `hostinger-deploy`
   - Répertoire : `/` (laisser vide)

### Option 3 : Build manuel
```bash
# Si le script échoue, fais le build manuellement
npm run build
```

---

## 🔄 Pour les mises à jour futures :

Même processus :
```bash
./quick-deploy.sh
```
Puis "Pull" sur Hostinger.

---

## 💡 Astuce Pro :

Ajoute un alias pour déployer encore plus vite :
```bash
echo "alias deploy='./quick-deploy.sh'" >> ~/.bashrc
source ~/.bashrc
```

Ensuite, tu pourras juste taper : `deploy`