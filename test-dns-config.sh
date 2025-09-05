#!/bin/bash

echo "🔍 Test de Configuration DNS - lilou-logistique.com"
echo "=================================================="

# Test résolution DNS actuelle
echo ""
echo "📍 Résolution DNS actuelle:"
nslookup lilou-logistique.com 2>/dev/null || echo "❌ Résolution échouée"

# Test ping
echo ""
echo "📡 Test de connectivité:"
ping -c 1 lilou-logistique.com 2>/dev/null && echo "✅ Domaine accessible" || echo "❌ Domaine inaccessible"

# Test HTTPS
echo ""
echo "🌐 Test HTTPS:"
curl -Is https://lilou-logistique.com 2>/dev/null | head -1 || echo "❌ HTTPS inaccessible"

# Test Vercel actuel
echo ""
echo "🚀 Test Vercel (URL alternative):"
curl -Is https://out-4r54b3bcz-lilou-lo.vercel.app 2>/dev/null | head -1 || echo "❌ Vercel inaccessible"

echo ""
echo "📋 Actions recommandées:"
echo "1. Changer les serveurs de noms vers Hostinger ou Vercel"
echo "2. Configurer les enregistrements A/CNAME pour Vercel"
echo "3. Ajouter le domaine dans Vercel Dashboard"
echo "4. Attendre propagation DNS (15min-24h)"

echo ""
echo "🎯 URLs à tester après configuration:"
echo "- https://lilou-logistique.com"
echo "- https://www.lilou-logistique.com"