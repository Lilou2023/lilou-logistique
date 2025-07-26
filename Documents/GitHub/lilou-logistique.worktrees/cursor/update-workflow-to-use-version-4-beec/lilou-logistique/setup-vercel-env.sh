#!/bin/bash

echo "🚀 Configuration automatique des variables d'environnement Vercel"

# Variables Supabase
SUPABASE_URL="https://fauuqcmfzxltjrlbdibh.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdXVxY21menhsdGpybGJkaWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NDAxMDIsImV4cCI6MjA2NzIxNjEwMn0.14Se4vJCLawZzywxk4fapHOLLi_PUeo2VYUznG0DIGE"

echo "📦 Configuration Production..."
vercel env add SUPABASE_URL production <<< "$SUPABASE_URL"
vercel env add SUPABASE_KEY production <<< "$SUPABASE_KEY"

echo "📦 Configuration Preview..."
vercel env add SUPABASE_URL preview <<< "$SUPABASE_URL"
vercel env add SUPABASE_KEY preview <<< "$SUPABASE_KEY"

echo "📦 Configuration Development..."
vercel env add SUPABASE_URL development <<< "$SUPABASE_URL"
vercel env add SUPABASE_KEY development <<< "$SUPABASE_KEY"

echo "✅ Variables d'environnement configurées avec succès !"
echo "🔍 Vérification des variables..."
vercel env ls

echo "🚀 Déploiement de test..."
vercel --prod 