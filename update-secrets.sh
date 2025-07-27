#!/usr/bin/env bash
# update-secrets.sh
# Usage: source .env.new && ./update-secrets.sh

set -e

echo "🔐 Mise à jour des Secrets GitHub Actions..."
gh secret set HOSTINGER_API_KEY        --body "$HOSTINGER_API_KEY"
gh secret set HOSTINGER_HOST           --body "$HOSTINGER_HOST"
gh secret set EXPO_TOKEN               --body "$EXPO_TOKEN"
gh secret set EXPO_USERNAME            --body "$EXPO_USERNAME"
gh secret set EXPO_PASSWORD            --body "$EXPO_PASSWORD"
gh secret set ANDROID_KEYSTORE_BASE64  --body "$ANDROID_KEYSTORE_BASE64"
gh secret set ANDROID_KEYSTORE_PASSWORD --body "$ANDROID_KEYSTORE_PASSWORD"
gh secret set ANDROID_KEY_ALIAS        --body "$ANDROID_KEY_ALIAS"
gh secret set ANDROID_KEY_PASSWORD     --body "$ANDROID_KEY_PASSWORD"
gh secret set APPLE_APP_ID             --body "$APPLE_APP_ID"
gh secret set APPLE_TEAM_ID            --body "$APPLE_TEAM_ID"
gh secret set APPLE_KEY_ID             --body "$APPLE_KEY_ID"
gh secret set APPLE_ISSUER_ID          --body "$APPLE_ISSUER_ID"
gh secret set APPLE_P8_BASE64          --body "$APPLE_P8_BASE64"
gh secret set NEXT_PUBLIC_SUPABASE_URL --body "$NEXT_PUBLIC_SUPABASE_URL"
gh secret set NEXT_PUBLIC_SUPABASE_ANON_KEY --body "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
gh secret set NEXTAUTH_URL             --body "$NEXTAUTH_URL"
gh secret set NEXTAUTH_SECRET          --body "$NEXTAUTH_SECRET"

echo "✅ Secrets GitHub mis à jour."

echo "🌐 Mise à jour des variables Vercel..."
# ensure 'vercel' CLI is logged in with 'vercel login'
vercel env add NEXT_PUBLIC_SUPABASE_URL production "$NEXT_PUBLIC_SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
vercel env add NEXTAUTH_URL production "$NEXTAUTH_URL"
vercel env add NEXTAUTH_SECRET production "$NEXTAUTH_SECRET"

echo "✅ Variables Vercel mises à jour."
echo "🎯 Terminé. Relance ton redeploy si nécessaire."
