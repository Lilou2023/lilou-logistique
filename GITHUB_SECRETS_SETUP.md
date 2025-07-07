# 🔐 Configuration des Secrets GitHub - Lilou Logistique

## 📋 Secrets Requis

Pour que les workflows GitHub Actions fonctionnent correctement, vous devez configurer les secrets suivants dans votre repository GitHub.

### 🔧 Comment ajouter des secrets

1. Allez sur votre repository GitHub
2. Cliquez sur `Settings` → `Secrets and variables` → `Actions`
3. Cliquez sur `New repository secret`
4. Ajoutez chaque secret ci-dessous

### 📝 Liste des secrets

| Nom du Secret | Description | Exemple |
|---------------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase | `https://your-supabase-url.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé de service Supabase (privée) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `OPENAI_API_KEY` | Clé API OpenAI | `sk-proj-...` |
| `JWT_SECRET` | Secret JWT (32+ caractères) | `votre-secret-jwt-super-securise-32-chars` |
| `NEXTAUTH_SECRET` | Secret NextAuth (32+ caractères) | `votre-secret-nextauth-super-securise-32-chars` |

### 🔍 Où trouver ces valeurs

#### Supabase
1. Allez sur https://supabase.com
2. Sélectionnez votre projet
3. `Settings` → `API`
4. Copiez l'URL et les clés

#### OpenAI
1. Allez sur https://platform.openai.com/api-keys
2. Créez une nouvelle clé API
3. Copiez la clé (commence par `sk-`)

#### Secrets JWT/NextAuth
Générez des secrets sécurisés :
```bash
# Dans votre terminal
openssl rand -base64 32
```

### ✅ Vérification

Après avoir ajouté tous les secrets :

1. Poussez un commit sur la branche `main`
2. Allez sur l'onglet `Actions` de votre repository
3. Vérifiez que le workflow `validate-env` s'exécute sans erreur

### 🚨 Sécurité

- ⚠️ **Ne jamais** commiter ces secrets dans le code
- ⚠️ **Ne jamais** les partager publiquement
- ✅ Utilisez toujours les secrets GitHub pour les variables sensibles
- ✅ Régénérez les clés si elles ont été exposées

### 🔄 Mise à jour des secrets

Si vous devez changer une clé :

1. Mettez à jour le secret dans GitHub
2. Les prochains déploiements utiliseront automatiquement la nouvelle valeur
3. Aucun redéploiement manuel n'est nécessaire

---

**Note** : Les secrets sont automatiquement disponibles dans tous les workflows GitHub Actions via `${{ secrets.NOM_DU_SECRET }}`.
