# Guide de Mise à Jour DNS Vercel 🔄

## 📋 Situation Actuelle

Vercel recommande de mettre à jour l'adresse IP de votre domaine `lilou-logistique.com` pour bénéficier de meilleures performances et de la nouvelle infrastructure.

### 🔍 État Actuel vs Recommandé

| Type | Nom | Valeur Actuelle | Valeur Recommandée |
|------|-----|----------------|-------------------|
| A | @ | `76.76.21.21` | `216.150.1.1` |
| CNAME | www | `*.hstgr.net` | `cname.vercel-dns.com` |

## 🎯 Actions à Effectuer

### 1. Vérification de l'état actuel
```bash
./update-dns-vercel.sh
```

### 2. Instructions spécifiques pour Hostinger
```bash
./fix-hostinger-dns.sh
```

### 3. Vérification rapide après changement
```bash
./quick-dns-check.sh
```

## 🌐 Étapes dans le Panel Hostinger

1. **Connexion**
   - Allez sur https://panel.hostinger.com
   - Connectez-vous avec vos identifiants

2. **Navigation**
   - Domains → lilou-logistique.com → DNS records

3. **Modification des enregistrements**
   
   **Enregistrement A:**
   - Type: A
   - Nom: @ (ou laissez vide)
   - Valeur: `216.150.1.1`
   - TTL: 300 (ou par défaut)
   
   **Enregistrement CNAME:**
   - Type: CNAME
   - Nom: www
   - Valeur: `cname.vercel-dns.com`
   - TTL: 300 (ou par défaut)

4. **Nettoyage**
   - ❌ Supprimez l'ancien enregistrement A (`76.76.21.21`)
   - ❌ Supprimez l'ancien CNAME vers Hostinger (`*.hstgr.net`)

## ⏱️ Temps de Propagation

- **Hostinger**: 5-15 minutes (rapide)
- **Propagation mondiale**: 24-48 heures maximum
- **Vérification**: Utilisez `./quick-dns-check.sh` toutes les 5 minutes

## 🔍 Outils de Vérification

### Scripts locaux
- `./quick-dns-check.sh` - Vérification rapide
- `./update-dns-vercel.sh` - Vérification complète
- `./fix-hostinger-dns.sh` - Instructions Hostinger

### Outils en ligne
- https://www.whatsmydns.net/#A/lilou-logistique.com
- https://dnschecker.org/

## 🤔 Pourquoi cette mise à jour ?

- **Performance** : Nouvelle infrastructure Vercel plus rapide
- **Fiabilité** : Extension de la plage IP pour meilleure disponibilité
- **Futur** : L'ancienne IP sera dépréciée (mais fonctionne encore)
- **Recommandation officielle** : Vercel le recommande dans votre dashboard

## 🆘 Support

**Hostinger :**
- Chat en direct: https://panel.hostinger.com
- Base de connaissances: https://support.hostinger.com

**Vercel :**
- Dashboard: https://vercel.com/lilou-lo/lilou-logistique
- Support: support@vercel.com

## ✅ Checklist de Validation

- [ ] Exécuter `./update-dns-vercel.sh` pour voir l'état actuel
- [ ] Se connecter au panel Hostinger
- [ ] Modifier l'enregistrement A vers `216.150.1.1`
- [ ] Modifier le CNAME vers `cname.vercel-dns.com`
- [ ] Supprimer les anciens enregistrements
- [ ] Attendre 5-10 minutes
- [ ] Exécuter `./quick-dns-check.sh` pour vérifier
- [ ] Tester le site : https://lilou-logistique.com
- [ ] Vérifier www : https://www.lilou-logistique.com

## 🎉 Résultat Attendu

Après la mise à jour, vous devriez voir :
```
✅ 216.150.1.1 (CORRECT - Nouvelle IP Vercel)
✅ cname.vercel-dns.com. (CORRECT)
🎉 Configuration DNS correcte !
```

---

*Ce guide a été généré automatiquement pour vous aider avec la mise à jour DNS recommandée par Vercel.* 

## 🎉 Système DNS Complet Créé !

J'ai créé un système complet pour gérer la mise à jour DNS recommandée par Vercel. Voici ce qui a été mis en place :

### 📋 **Situation Détectée**
- Vercel recommande de passer de l'IP `76.76.21.21` à `216.150.1.1`
- Votre domaine utilise actuellement Hostinger comme fournisseur DNS
- Le CNAME doit également être mis à jour vers `cname.vercel-dns.com`

### 🛠️ **Scripts Créés**

1. **`./dns-manager.sh`** - 🎯 **Point d'entrée principal** (menu interactif)
2. **`./update-dns-vercel.sh`** - Vérification complète de l'état DNS
3. **`./fix-hostinger-dns.sh`** - Instructions spécifiques pour Hostinger
4. **`./quick-dns-check.sh`** - Vérification rapide (mis à jour avec la nouvelle IP)
5. **`VERCEL_DNS_UPDATE_GUIDE.md`** - Guide complet avec checklist

### 🚀 **Action Recommandée**

**Lancez le gestionnaire DNS :**
```bash
./dns-manager.sh
```

### 📝 **Étapes Rapides**

1. **Vérifiez l'état actuel :**
   ```bash
   ./update-dns-vercel.sh
   ```

2. **Suivez les instructions Hostinger :**
   ```bash
   ./fix-hostinger-dns.sh
   ```

3. **Après changement, vérifiez :**
   ```bash
   ./quick-dns-check.sh
   ```

### 🎯 **Changements à Effectuer dans Hostinger**

| Type | Nom | Ancienne Valeur | Nouvelle Valeur |
|------|-----|----------------|-----------------|
| A | @ | `76.76.21.21` | `216.150.1.1` |
| CNAME | www | `*.hstgr.net` | `cname.vercel-dns.com` |

### ⏱️ **Temps de Propagation**
- Hostinger : 5-15 minutes
- Propagation mondiale : 24-48 heures

**Votre système DNS est maintenant prêt pour la mise à jour recommandée par Vercel !** 🎉