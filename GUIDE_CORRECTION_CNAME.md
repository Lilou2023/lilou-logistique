# 🔧 Guide de Correction CNAME Hostinger → Vercel

## 📍 Situation Actuelle
- ✅ **A Record** : `lilou-logistique.com` → `76.76.21.21` (Correct)
- ❌ **CNAME** : `www.lilou-logistique.com` → `www.lilou-logistique.com.cdn.hstgr.net` (Incorrect)

## 🎯 Objectif
Corriger le CNAME pour qu'il pointe vers Vercel et non vers le CDN Hostinger.

---

## 📋 Instructions Détaillées

### **Étape 1 : Accès à Hostinger hPanel**
1. 🌐 Connectez-vous à [Hostinger hPanel](https://hpanel.hostinger.com)
2. 📱 Utilisez vos identifiants Hostinger habituels

### **Étape 2 : Navigation vers DNS**
1. 🏠 Depuis le tableau de bord principal
2. 📍 Cliquez sur **"Domaines"**
3. 🔍 Trouvez `lilou-logistique.com` et cliquez dessus
4. ⚙️ Cliquez sur **"DNS"** dans le menu

### **Étape 3 : Localisation du CNAME**
Recherchez cette ligne dans les enregistrements DNS :
```
Type: CNAME
Name: www
Points to: www.lilou-logistique.com.cdn.hstgr.net
```

### **Étape 4 : Modification du CNAME**
1. ✏️ Cliquez sur l'**icône MODIFIER** (crayon) à droite de cette ligne
2. 📝 Dans le champ **"Pointe vers"**, remplacez :
   ```
   ANCIEN : www.lilou-logistique.com.cdn.hstgr.net
   NOUVEAU : cname.vercel-dns.com
   ```
3. 💾 Cliquez sur **"Enregistrer"**

### **Étape 5 : Attente de Propagation**
⏱️ **Attendez 5-10 minutes** pour que les changements DNS se propagent.

---

## 🔧 Scripts de Vérification

### **Script 1 : Vérification du Statut**
```bash
./fix-cname-hostinger.sh
```
- 🔍 Vérifie l'état actuel du CNAME
- 📋 Affiche les instructions si correction nécessaire
- 🔄 Option de monitoring continu de la propagation

### **Script 2 : Vérification Finale**
```bash
./verify-final-deployment.sh
```
- 🎯 Tests complets du déploiement
- 📊 Évaluation sur 8 critères
- 🎉 Rapport final de statut

---

## 🔍 Vérification Manuelle

### **Commande dig**
```bash
dig +short CNAME www.lilou-logistique.com
```
**Résultat attendu :** `cname.vercel-dns.com.`

### **Test nslookup**
```bash
nslookup www.lilou-logistique.com
```
**Résultat attendu :** Résolution vers les serveurs Vercel

---

## 🎯 Étapes Post-Correction

### **Sur Vercel Dashboard**
1. 🌐 Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. 📂 Sélectionnez le projet **lilou-logistique**
3. ⚙️ Allez dans **Settings → Domains**
4. ✅ Cliquez sur **"Verify"** pour `lilou-logistique.com`
5. 🔒 Activez **"Enforce HTTPS"** une fois vérifié

### **Résultat Attendu**
- ✅ Statut : **Valid**
- 🔐 HTTPS : **Active**
- 🌐 Domaine : **Opérationnel**

---

## 📊 Timeline de Propagation

| Temps | Action | Statut |
|-------|--------|--------|
| 0 min | Modification DNS | ✅ Effectuée |
| 2-5 min | Propagation locale | ⏳ En cours |
| 5-10 min | Propagation globale | ⏳ En cours |
| 10-15 min | Vérification Vercel | ✅ Prêt |

---

## 🚨 Résolution de Problèmes

### **Le CNAME ne change pas**
1. 🔄 Vérifiez que vous avez bien sauvegardé
2. 💾 Rafraîchissez la page DNS d'Hostinger
3. 🔍 Confirmez que la valeur est `cname.vercel-dns.com`

### **Erreur de vérification Vercel**
1. ⏱️ Attendez 5 minutes supplémentaires
2. 🔄 Relancez la vérification
3. 📞 Contactez le support Vercel si persiste

### **Site inaccessible**
1. 🔍 Vérifiez le A Record (doit être `76.76.21.21`)
2. 🌐 Testez avec `https://lilou-logistique.com`
3. 🔄 Videz le cache DNS local : `sudo dscacheutil -flushcache`

---

## 📞 Support et Assistance

### **Scripts d'Aide**
- `./fix-cname-hostinger.sh` - Guide et monitoring
- `./verify-final-deployment.sh` - Vérification complète

### **Liens Utiles**
- [Hostinger hPanel](https://hpanel.hostinger.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentation Vercel Domains](https://vercel.com/docs/concepts/projects/domains)

### **Commandes de Dépannage**
```bash
# Vérifier DNS
dig +short A lilou-logistique.com
dig +short CNAME www.lilou-logistique.com

# Tester connectivité
curl -I https://lilou-logistique.com

# Vider cache DNS
sudo dscacheutil -flushcache  # macOS
sudo systemd-resolve --flush-caches  # Linux
```

---

## 🎉 Résultat Final

Une fois la correction effectuée :

✅ **Domaine Principal** : `https://lilou-logistique.com`  
✅ **Domaine WWW** : `https://www.lilou-logistique.com`  
✅ **HTTPS** : Activé et sécurisé  
✅ **Certificat SSL** : Automatique via Vercel  
✅ **Performance** : Optimisée via CDN Vercel  

**🚀 Lilou Logistique v5.1 sera pleinement opérationnelle !**

---

*Guide créé pour finaliser le déploiement de la plateforme DSP Lilou Logistique v5.1*