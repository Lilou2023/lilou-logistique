# lilou-logistique
name: 🔍 Validation Environnement LILOU LOGISTIQUE

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  FORCE_COLOR: 1

jobs:
  valider:
    name: 🛡️ CI - Validation et construction
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout du code
        uses: actions/checkout@v3

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: 📦 Install dependencies
        run: npm ci

      - name: 🔍 TypeScript Check
        run: npm run type-check

      - name: ✅ Validate Env Vars
        env:
          NODE_ENV: development
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
        run: npm run validate-env

      - name: 🧪 Unit tests
        run: npm run test

      - name: 🏗️ Production Build
        env:
          NODE_ENV: production
        run: npm run build

  audit:
    name: 🔒 Audit Sécurité
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: 📦 Install dependencies
        run: npm ci

      - name: 🔐 Exécution de l'audit NPM
        run: npm audit --audit-level=high || echo "⚠️ Vulnérabilités détectées"

      - name: 🧪 Vérifier les secrets codés en dur
        run: |
          echo "🔍 Vérification des secrets en dur..."
          if grep -r "your-super-secret" . --exclude-dir=node_modules --exclude-dir=.git; then
            echo "❌ Secrets par défaut trouvés !"
            exit 1
          fi
          echo "✅ Aucun secret par défaut trouvé"

