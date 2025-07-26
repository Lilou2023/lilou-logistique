# 🚨 PLAN D'URGENCE - RECONSTRUCTION COMPLÈTE

## ⛔ **SÉCURITÉ D'ABORD - NE PAS IGNORER**

### 🔥 **ÉTAPE 1: RÉVOCATION IMMÉDIATE (5 MIN MAX)**

**Tu DOIS révoquer ces clés MAINTENANT :**

1. **GitHub:** https://github.com/settings/tokens
2. **Vercel:** https://vercel.com/account/tokens  
3. **OpenAI:** https://platform.openai.com/api-keys
4. **Supabase:** https://app.supabase.com (Settings > API > Regenerate)

**⚠️ STOP TOUT - Ne continue pas sans avoir fait ça !**

---

## 🔧 **ÉTAPE 2: RECONSTRUCTION DU DÉPÔT GIT**

Ton Git est **irréparable** (`fatal: cannot read commit object`). Voici la solution :

### **Option A: Clone frais (Recommandé)**
```bash
# Sauvegarder les scripts actuels
cp *.sh ../scripts-backup/
cp *.md ../scripts-backup/

# Sortir du dossier corrompu  
cd ..

# Clone frais depuis GitHub
git clone https://github.com/Lilou2023/lilou-logistique.git lilou-fresh
cd lilou-fresh

# Copier les scripts de correction
cp ../scripts-backup/*.sh .
cp ../scripts-backup/*.md .
```

### **Option B: Reset brutal**
```bash
# Si Option A impossible
rm -rf .git
git init
git remote add origin https://github.com/Lilou2023/lilou-logistique.git
git fetch origin
git checkout -b main origin/main
```

---

## 🔑 **ÉTAPE 3: CORRECTION "Invalid API key"**

Une fois le Git reconstruit ET les clés révoquées :

### **3A: Configurer les nouvelles clés**
```bash
# Avec tes NOUVELLES clés générées
./configure-all-secrets-auto.sh
```

### **3B: Corriger le domaine Vercel**
```bash
./fix-vercel-domain-now.sh
```

### **3C: Test final**
```bash
# Vérifier que l'app fonctionne
curl -I https://lilou-logistique.com
```

---

## ✅ **CHECKLIST OBLIGATOIRE**

- [ ] **SÉCURITÉ:** Toutes les 4 clés révoquées et regénérées
- [ ] **GIT:** Dépôt reconstruit (`git log` fonctionne)
- [ ] **SECRETS:** Nouvelles clés configurées dans GitHub
- [ ] **VERCEL:** Domaine assigné automatiquement
- [ ] **APP:** https://lilou-logistique.com accessible
- [ ] **LOGIN:** Plus d'erreur "Invalid API key"

---

## 🚀 **ORDRE D'EXÉCUTION**

```bash
# 1. D'ABORD - Révocation manuelle des clés (navigateur)
# 2. Reconstruction Git
cd .. && git clone https://github.com/Lilou2023/lilou-logistique.git lilou-fresh
cd lilou-fresh

# 3. Configuration avec nouvelles clés
./configure-all-secrets-auto.sh

# 4. Test et correction domaine
./fix-vercel-domain-now.sh
```

---

**⏰ TEMPS ESTIMÉ:** 15-20 minutes maximum

**🎯 RÉSULTAT:** Application fonctionnelle avec sécurité restaurée