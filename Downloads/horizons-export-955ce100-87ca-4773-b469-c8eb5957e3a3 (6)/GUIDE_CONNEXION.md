# 🚀 Guide de Connexion - Lilou-GO

## 📧 Compte Super-Administrateur

### Identifiants de connexion
- **Email :** `logistiquelilou@gmail.com`
- **Mot de passe :** `LilouGO2024!`
- **Rôle :** General Manager (Accès à TOUS les modules)

## 🎯 Modules Accessibles

Avec ce compte, vous avez accès à **TOUS** les modules de l'application :

| Module | URL | Description |
|--------|-----|-------------|
| 🏠 **Sélection du rôle** | `/select-role` | Page d'accueil après connexion |
| 👔 **Manager** | `/manager` | Dashboard Manager avec KPIs et analyses |
| 🛡️ **Admin** | `/admin` | Administration système |
| 👥 **RH** | `/rh` | Gestion des ressources humaines |
| 🚚 **Chauffeur** | `/driver` | Interface chauffeur |
| 📍 **Dispatcher** | `/dispatcher` | Gestion des tournées et dispatch |
| 🔧 **Parc** | `/parc` | Gestion du parc automobile |
| 👨‍💼 **General Manager** | `/gm` | Dashboard direction générale |
| 🤖 **IA Amir** | `/amir-ia` | Dashboard Intelligence Artificielle |
| ✅ **Validation** | `/validation` | Validation des opérations |

## 📝 Instructions de Configuration

### Étape 1 : Créer le compte dans Supabase

1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Connectez-vous à votre projet
3. Cliquez sur **SQL Editor** dans le menu de gauche
4. Copiez le contenu du fichier `create-super-admin.sql`
5. Collez-le dans l'éditeur SQL
6. Cliquez sur **Run** pour exécuter le script

### Étape 2 : Se connecter à l'application

1. Ouvrez votre navigateur
2. Allez sur http://localhost:5173/login
3. Entrez les identifiants :
   - Email : `logistiquelilou@gmail.com`
   - Mot de passe : `LilouGO2024!`
4. Cliquez sur "Se connecter"

### Étape 3 : Navigation

Après connexion, vous serez redirigé vers `/gm` (Dashboard General Manager).
Vous pouvez naviguer vers n'importe quel module depuis le menu ou en tapant directement l'URL.

## 🔒 Sécurité

- **Important :** Changez le mot de passe après la première connexion
- Ce compte a accès à tous les modules, utilisez-le avec précaution
- Pour créer des comptes avec des accès limités, utilisez le module RH

## 🛠️ Dépannage

### Erreur "Invalid login credentials"
- Vérifiez que le script SQL a bien été exécuté dans Supabase
- Attendez quelques secondes après la création du compte
- Vérifiez que vous utilisez le bon email et mot de passe

### Erreur "User not found"
- Le compte n'existe pas encore dans la base de données
- Exécutez le script `create-super-admin.sql` dans Supabase

### Problème de redirection
- Videz le cache de votre navigateur
- Essayez en navigation privée
- Vérifiez que le serveur de développement est bien lancé (`npm run dev`)

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs dans la console du navigateur (F12)
2. Consultez les logs Supabase dans le dashboard
3. Redémarrez le serveur de développement si nécessaire

---

✨ **Bon développement avec Lilou-GO !**
