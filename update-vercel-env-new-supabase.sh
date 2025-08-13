#!/bin/bash

# Script pour mettre à jour les variables d'environnement Vercel
# avec les nouvelles credentials Supabase

echo "🔄 Mise à jour des variables d'environnement Vercel..."

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé. Installation en cours..."
    npm install -g vercel
fi

echo "📝 Configuration des nouvelles variables Supabase..."

# AI Gateway
vercel env add AI_GATEWAY_API_KEY production < <(echo "Juy0ZJiq3xAIFliGIozCAjlO")

# Supabase URLs et clés publiques
vercel env add NEXT_PUBLIC_SUPABASE_URL production < <(echo "https://ocsxrxcphdknfzihejjd.supabase.co")
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production < <(echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk4MjEsImV4cCI6MjA2OTY0NTgyMX0.ZYvmJCUKcsQWrW2tFRfjcUJ29vca5abK7yg8QG3WkCk")

# Supabase configuration privée
vercel env add SUPABASE_URL production < <(echo "https://ocsxrxcphdknfzihejjd.supabase.co")
vercel env add SUPABASE_ANON_KEY production < <(echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk4MjEsImV4cCI6MjA2OTY0NTgyMX0.ZYvmJCUKcsQWrW2tFRfjcUJ29vca5abK7yg8QG3WkCk")
vercel env add SUPABASE_SERVICE_ROLE_KEY production < <(echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDA2OTgyMSwiZXhwIjoyMDY5NjQ1ODIxfQ.e8-3nSK4A9pqf12jWWIwqeBjQ1FRRMpd-uibEOnGFzY")
vercel env add SUPABASE_JWT_SECRET production < <(echo "c2QxAYdQkWMndpqRlFeuaPMACLNeV2OfODvTs27CUGXaduQVNE6AqfiYRBSc1fV+5kWK5/+ZdCGWodFl9jxD7A==")

# Database configuration
vercel env add POSTGRES_URL production < <(echo "postgres://postgres.ocsxrxcphdknfzihejjd:mMInnKRIbRY5aW8L@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x")
vercel env add POSTGRES_USER production < <(echo "postgres")
vercel env add POSTGRES_HOST production < <(echo "db.ocsxrxcphdknfzihejjd.supabase.co")
vercel env add POSTGRES_PASSWORD production < <(echo "mMInnKRIbRY5aW8L")
vercel env add POSTGRES_DATABASE production < <(echo "postgres")
vercel env add POSTGRES_PRISMA_URL production < <(echo "postgres://postgres.ocsxrxcphdknfzihejjd:mMInnKRIbRY5aW8L@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true")
vercel env add POSTGRES_URL_NON_POOLING production < <(echo "postgres://postgres.ocsxrxcphdknfzihejjd:mMInnKRIbRY5aW8L@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require")

# NextAuth configuration
vercel env add NEXTAUTH_URL production < <(echo "https://lilou-logistique.com")
vercel env add NEXTAUTH_SECRET production < <(echo "5ZfRI53pM0l+RSFqGLCOvzl5+MmqU5N97DZVLAXFM4k=")

echo "✅ Variables d'environnement mises à jour!"
echo ""
echo "📋 Récapitulatif des variables configurées:"
echo "   - AI_GATEWAY_API_KEY"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" 
echo "   - SUPABASE_URL"
echo "   - SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - SUPABASE_JWT_SECRET"
echo "   - POSTGRES_URL"
echo "   - POSTGRES_USER"
echo "   - POSTGRES_HOST"
echo "   - POSTGRES_PASSWORD"
echo "   - POSTGRES_DATABASE"
echo "   - POSTGRES_PRISMA_URL"
echo "   - POSTGRES_URL_NON_POOLING"
echo "   - NEXTAUTH_URL"
echo "   - NEXTAUTH_SECRET"
echo ""
echo "🚀 Pour redéployer l'application avec les nouvelles variables:"
echo "   vercel --prod"
echo ""
echo "📊 Pour vérifier les variables configurées:"
echo "   vercel env ls"