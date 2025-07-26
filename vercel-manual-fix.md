# 🔧 Guide de Correction Manuelle Vercel

## 🎯 Problème : "Le répertoire racine spécifié « package.json » n'existe pas"

### ✅ Solution Immédiate

#### 1. **Correction Root Directory**
Dans votre dashboard Vercel (actuellement ouvert) :

1. **Restez dans** : `Settings` → `General`
2. **Trouvez** : `Root Directory` (Build & Development Settings)
3. **Changez** : `package.json` → **`.`** (point) ou **VIDE**
4. **Sauvegardez**

#### 2. **Paramètres Build Optimaux**
```
Build Command: npm run build
Output Directory: out
Install Command: npm ci
Node.js Version: 18.x
Framework: Next.js
```

#### 3. **Variables d'Environnement** ✅
Déjà configurées :
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXTAUTH_SECRET
- JWT_SECRET
- CLÉ_API_OPENAI

#### 4. **Branche de Production**
Actuellement : `main` ✅

### 🌐 Résolution Conflit de Domaine

**Problème** : `lilou-logistique.com` déjà utilisé

**Solution A** : Libérer le domaine
1. Allez dans l'autre projet Vercel
2. Settings → Domains
3. Supprimez `lilou-logistique.com`
4. Revenez à ce projet
5. Ajoutez le domaine

**Solution B** : Utiliser un sous-domaine
- `app.lilou-logistique.com`
- `v5.lilou-logistique.com`
- `demo.lilou-logistique.com`

### 📋 Ordre d'Exécution

1. **Corriger Root Directory** (plus important)
2. **Tester le déploiement**
3. **Résoudre le domaine** (si nécessaire)
4. **Vérifier l'accès**

### 🔍 Test Après Correction

1. **Déclencheur** : Push vers `main` ou redéploiement manuel
2. **Vérification** : Logs de build sans erreur "package.json"
3. **Accès** : URL Vercel accessible
4. **Domaine** : Configuration finale

### 🎉 Résultat Attendu

✅ **Déploiement réussi**
✅ **Application accessible**
✅ **Lilou Logistique v5.1 en ligne**

---

**Note** : Cette solution ne nécessite **aucune modification de code** - juste la correction des paramètres Vercel. 