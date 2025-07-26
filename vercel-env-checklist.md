# ✅ Checklist Variables d'Environnement Vercel

## 🎯 Variables Production à Configurer

| ✓ | Variable | Valeur | Edge Runtime |
|---|----------|---------|--------------|
| ☐ | `NEXT_PUBLIC_SUPABASE_URL` | `https://fauuqcmfzxltjrlbdibh.supabase.co` | ✅ OUI |
| ☐ | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdXVxY21menhsdGpybGJkaWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NDAxMDIsImV4cCI6MjA2NzIxNjEwMn0.14Se4vJCLawZzywxk4fapHOLLi_PUeo2VYUznG0DIGE` | ✅ OUI |
| ☐ | `NEXTAUTH_URL` | `https://lilou-logistique.com` | ❌ NON |
| ☐ | `NEXTAUTH_SECRET` | `5ZfRI53pM0l+RSFqGLCOvzl5+MmqU5N97DZVLAXFM4k=` | ❌ NON |

## 🚀 Étapes Finales

### 1. Ajout des Variables
- [x] NEXT_PUBLIC_SUPABASE_URL
- [x] NEXT_PUBLIC_SUPABASE_ANON_KEY  
- [x] NEXTAUTH_URL
- [ ] NEXTAUTH_SECRET ← **À AJOUTER**

### 2. Redéploiement
- [ ] Vercel > Deployments
- [ ] Cliquer "Redeploy" sur la dernière version
- [ ] Attendre 2-3 minutes

### 3. Test Final
- [ ] Ouvrir https://lilou-logistique.com
- [ ] Tester création de compte
- [ ] Vérifier absence d'erreur "Invalid API key"

## 🎉 Résultat Attendu

✅ **Application fonctionnelle**  
✅ **Création de compte OK**  
✅ **Login avec logistiquelilou@gmail.com**  
✅ **Erreur "Invalid API key" résolue**

## 🆘 En cas de problème

1. **Console navigateur (F12)**
   - Onglet Console → erreurs ?
   - Onglet Réseau → requêtes échouées ?

2. **Logs Vercel**
   - Vercel Dashboard → Functions
   - Voir les erreurs en temps réel

3. **Variables manquantes**
   - Vérifier toutes présentes
   - Vérifier valeurs exactes (pas de espaces)

## 📋 Contact

Si problème persistant, partager :
- Screenshot variables Vercel
- Messages d'erreur console
- URL exacte testée