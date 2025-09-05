# 🌐 Configuration DNS pour VPS Hostinger

## 🎯 Nouvelle Configuration DNS

### ❌ **Configuration Actuelle (À Changer)**
```dns
# Serveurs de noms parking (inactifs)
ns1.dns-parking.com
ns2.dns-parking.com

# IP incorrecte
A @ → 84.32.84.3250
```

### ✅ **Nouvelle Configuration VPS**
```dns
# 1. Changer les serveurs de noms
ns1.hostinger.com
ns2.hostinger.com

# 2. Pointer vers votre VPS
A       @    [VOTRE_IP_VPS]     300
CNAME   www  lilou-logistique.com  300
```

---

## 📋 **Instructions Étape par Étape**

### **Étape 1: Obtenir l'IP VPS**
1. **Interface VPS**: https://hpanel.hostinger.com/vps/942059/overview
2. **Noter**: L'adresse IP publique du VPS
3. **Exemple**: Si votre VPS a l'IP `123.45.67.89`

### **Étape 2: Modifier DNS Hostinger**
```bash
# Dans Hostinger DNS (/dns?tab=dns_records):

# 1. SUPPRIMER:
❌ A @ → 84.32.84.3250

# 2. AJOUTER:
✅ A @ → [VOTRE_IP_VPS] (TTL: 300)

# 3. GARDER les enregistrements existants:
✅ CNAME www → lilou-logistique.com
✅ Tous les enregistrements CAA (SSL)
✅ Enregistrements email (autodiscover, autoconfig)
```

### **Étape 3: Changer Serveurs de Noms**
```bash
# Dans Hostinger → Domaine → Serveurs de noms:

# REMPLACER:
❌ ns1.dns-parking.com
❌ ns2.dns-parking.com

# PAR:
✅ ns1.hostinger.com
✅ ns2.hostinger.com
```

---

## 🚀 **Avantages VPS vs Vercel**

| Critère | VPS Hostinger | Vercel |
|---------|---------------|--------|
| **Contrôle** | ✅ Total | ⚠️ Limité |
| **Performance DSP** | ✅ Optimisé | ⚠️ Généraliste |
| **Coût** | ✅ Prévisible | ⚠️ Variable |
| **Supabase** | ✅ Direct | ⚠️ Edge Functions |
| **Customisation** | ✅ Complète | ⚠️ Restreinte |

---

## ⏱️ **Timeline de Migration**

### **Phase 1: DNS (15 minutes)**
- Changer serveurs de noms
- Modifier enregistrement A
- Attendre propagation (2-24h)

### **Phase 2: VPS Setup (1 heure)**  
- Installation Node.js/PM2/Nginx
- Configuration SSL automatique
- Déploiement initial

### **Phase 3: Test & Go Live (30 minutes)**
- Tests fonctionnels
- Migration complète
- Désactivation Vercel

---

## 🛡️ **Sécurité VPS**

```bash
# Configuration sécurisée recommandée:

# 1. Firewall
ufw enable
ufw allow ssh
ufw allow http
ufw allow https

# 2. SSL automatique (Let's Encrypt)
certbot --nginx -d lilou-logistique.com -d www.lilou-logistique.com

# 3. Nginx optimisé DSP
server_tokens off;
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
```

---

## 📊 **Monitoring VPS**

```bash
# Scripts de monitoring inclus:
./monitor-vps-performance.sh  # CPU, RAM, Disk
./check-app-health.sh         # Application status  
./backup-vps.sh              # Backup automatique
```

Cette configuration VPS vous donnera **10x plus de contrôle** et de performance qu'avec Vercel pour une plateforme DSP professionnelle ! 🚀