#!/bin/bash

# Script de test du webhook Hostinger
# Lilou Logistique - Webhook Testing Script

echo "🧪 Test du webhook Hostinger..."
echo "================================"

WEBHOOK_URL="https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "🔗 URL du webhook: $WEBHOOK_URL"
echo "⏰ Timestamp: $TIMESTAMP"
echo ""

# Préparer le payload de test
TEST_PAYLOAD='{
  "repository": "Lilou2023/lilou-logistique",
  "ref": "refs/heads/main",
  "commit": "test-commit",
  "branch": "main",
  "workflow": "webhook-test",
  "timestamp": "'$TIMESTAMP'",
  "source": "webhook-test-script",
  "message": "Test webhook deployment trigger",
  "test": true
}'

echo "📦 Payload de test:"
echo "$TEST_PAYLOAD" | jq . 2>/dev/null || echo "$TEST_PAYLOAD"
echo ""

# Appel du webhook
echo "📡 Appel du webhook..."
response=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "User-Agent: Test-Webhook-Lilou-Logistique" \
  -d "$TEST_PAYLOAD" \
  "$WEBHOOK_URL")

echo "📊 Réponse HTTP: $response"

# Interpréter la réponse
case $response in
  200|201|204)
    echo "✅ Webhook test réussi!"
    echo "🎉 Le déploiement devrait être déclenché sur Hostinger"
    ;;
  400)
    echo "❌ Erreur 400: Payload invalide"
    echo "🔧 Vérifiez la structure du JSON"
    ;;
  401)
    echo "❌ Erreur 401: Problème d'authentification"
    echo "🔧 Vérifiez l'URL du webhook"
    ;;
  404)
    echo "❌ Erreur 404: Webhook non trouvé"
    echo "🔧 Vérifiez l'URL du webhook"
    ;;
  500)
    echo "❌ Erreur 500: Problème serveur Hostinger"
    echo "🔧 Réessayez plus tard ou contactez le support"
    ;;
  000)
    echo "❌ Erreur de connexion"
    echo "🔧 Vérifiez votre connexion internet"
    ;;
  *)
    echo "⚠️ Réponse inattendue: $response"
    echo "🔧 Consultez la documentation Hostinger"
    ;;
esac

echo ""
echo "🔗 Actions suivantes:"
echo "1. Vérifier les logs de déploiement sur Hostinger"
echo "2. Vérifier que l'application est mise à jour"
echo "3. Tester les fonctionnalités principales"
echo ""
echo "📚 Documentation: ./WEBHOOK_DEPLOYMENT_CONFIG.md"