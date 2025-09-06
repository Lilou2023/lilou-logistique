# 🎯 ÉTAPE SUIVANTE - Instructions Détaillées

## 📋 **ACTION IMMÉDIATE (5 minutes)**

### **Étape 1 : Récupérer l'IP de votre VPS**

1. **📱 Ouvrez cette URL dans votre navigateur :**
   ```
   https://hpanel.hostinger.com/vps/942059/overview
   ```

2. **🔍 Trouvez l'information "IP Address" ou "Public IP"**
   - Généralement dans une section "Server Information"
   - Format : `123.45.67.89`
   
3. **📝 Notez cette IP quelque part**

---

## 🌐 **Étape 2 : Configuration DNS (10 minutes)**

### **Une fois que vous avez l'IP VPS :**

1. **Aller dans les DNS Hostinger :**
   ```
   https://hpanel.hostinger.com/domain/lilou-logistique.com/dns?tab=dns_records
   ```

2. **SUPPRIMER l'enregistrement A actuel :**
   ```
   ❌ A  @  84.32.84.3250  (à supprimer)
   ```

3. **AJOUTER le nouvel enregistrement A :**
   ```
   ✅ A  @  [VOTRE_IP_VPS]  TTL: 300
   ```

4. **VÉRIFIER que le CNAME www existe :**
   ```
   ✅ CNAME  www  lilou-logistique.com  TTL: 300
   ```

---

## 🔧 **Étape 3 : Test de Connexion VPS**

### **Tester la connexion SSH :**

```bash
# Remplacez [VOTRE_IP_VPS] par l'IP notée
ssh root@[VOTRE_IP_VPS]

# Si ça fonctionne, vous verrez un prompt comme :
# root@vps942059:~#
```

---

## 📋 **Template de Configuration**

### **Copiez et remplissez ce template :**

```bash
# ===== INFORMATIONS VPS =====
IP_VPS="[VOTRE_IP_ICI]"          # Ex: 123.45.67.89
SSH_USER="root"                   # Généralement root
SSH_PORT="22"                     # Généralement 22
DOMAIN="lilou-logistique.com"

# ===== TEST DE CONNEXION =====
# ping $IP_VPS
# ssh $SSH_USER@$IP_VPS

# ===== DNS À CONFIGURER =====
# A     @    $IP_VPS              300
# CNAME www  lilou-logistique.com 300
```

---

## ✅ **Vérifications**

### **Avant de continuer, vérifiez que :**
- [ ] Vous avez récupéré l'IP publique du VPS
- [ ] La connexion SSH fonctionne
- [ ] Le DNS A pointe vers la nouvelle IP
- [ ] Les serveurs de noms ne sont plus sur "parking"

---

## 🎯 **Une fois ces étapes terminées :**

**Revenez ici et dites-moi :**
1. **L'IP de votre VPS** (Ex: 123.45.67.89)  
2. **Si la connexion SSH fonctionne**
3. **Si vous avez modifié le DNS**

**Je pourrai alors vous donner la suite : installation automatique sur le VPS ! 🚀**

---

## 💡 **Aide Rapide**

### **Si vous ne trouvez pas l'IP VPS :**
- Cherchez "IP Address", "Public IP", ou "External IP"
- Dans Hostinger, c'est souvent dans l'onglet "Overview" ou "Details"

### **Si SSH ne fonctionne pas :**
- Vérifiez que vous utilisez le bon utilisateur (root ou autre)
- Le VPS peut être en cours de démarrage (attendre 5-10 min)
- Vérifiez le mot de passe root dans l'interface Hostinger

### **Si vous ne trouvez pas les DNS :**
```
Interface DNS directe : 
https://hpanel.hostinger.com/domain/lilou-logistique.com/dns?tab=dns_records
```

**🎯 L'objectif : faire pointer lilou-logistique.com vers votre VPS plutôt que vers l'adresse de parking actuelle !**