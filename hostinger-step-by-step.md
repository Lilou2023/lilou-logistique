# Guide Étape par Étape - Interface Hostinger 🎯

## 🔍 Configuration Actuelle Détectée

D'après votre interface Hostinger, voici ce qui doit être modifié :

### ❌ **À Modifier :**
- **Enregistrement A** : `@` → `76.76.21.21`
- **Enregistrement CNAME** : `www` → `www.lilou-logistique.com.cdn.hstgr.net`
- **Enregistrement ALIAS** : `@` → `lilou-logistique.com.cdn.hstgr.net`

### ✅ **Résultat Final :**
- **Enregistrement A** : `@` → `216.150.1.1`
- **Enregistrement CNAME** : `www` → `cname.vercel-dns.com`
- **Enregistrement ALIAS** : Supprimé

## 🛠️ Instructions Détaillées

### **Étape 1 : Modifier l'enregistrement A**
1. Trouvez la ligne : `A  @  76.76.21.21`
2. Cliquez sur le bouton "**Modificateur**" à droite
3. Dans le champ "**Pointe vers**", remplacez `76.76.21.21` par `216.150.1.1`
4. Optionnel : Changez le TTL de `14401` vers `300` pour une propagation plus rapide
5. Cliquez sur "**Sauvegarder**" ou "**Modifier**"

### **Étape 2 : Modifier l'enregistrement CNAME www**
1. Trouvez la ligne : `CNAME  www  www.lilou-logistique.com.cdn.hstgr.net`
2. Cliquez sur le bouton "**Modificateur**" à droite
3. Dans le champ "**Pointe vers**", remplacez `www.lilou-logistique.com.cdn.hstgr.net` par `cname.vercel-dns.com`
4. Gardez le TTL à `300`
5. Cliquez sur "**Sauvegarder**" ou "**Modifier**"

### **Étape 3 : Supprimer l'enregistrement ALIAS**
1. Trouvez la ligne : `ALIAS  @  lilou-logistique.com.cdn.hstgr.net`
2. Cliquez sur le bouton "**Effacer**" à droite
3. Confirmez la suppression

## ⚠️ **Points Importants**

- **Ne touchez pas** aux enregistrements MX (emails)
- **Ne touchez pas** aux enregistrements TXT (SPF, DMARC)
- **Ne touchez pas** aux enregistrements CAA
- **Gardez** les enregistrements CNAME pour les emails (_domainkey, autodiscover, autoconfig)

## 🎯 **Après les Modifications**

Votre configuration DNS devrait ressembler à :
```
A     @    216.150.1.1          300
CNAME www  cname.vercel-dns.com  300
```

## ⏱️ **Propagation**

- **Hostinger** : 5-15 minutes
- **Mondiale** : 24-48 heures

## 🔍 **Vérification**

Après 5-10 minutes, utilisez :
```bash
./quick-dns-check.sh
```

## 🎉 **Résultat Attendu**

```
✅ 216.150.1.1 (CORRECT - Nouvelle IP Vercel)
✅ cname.vercel-dns.com. (CORRECT)
🎉 Configuration DNS correcte !
``` 