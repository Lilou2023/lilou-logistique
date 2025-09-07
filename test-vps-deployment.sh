#!/bin/bash

# 🧪 Test de Déploiement VPS - Lilou-GO
# =====================================

echo "🧪 Test de Déploiement VPS Hostinger"
echo "===================================="

# Variables
DOMAIN="lilou-logistique.com"
VPS_IP="${1:-[IP_VPS_À_DÉFINIR]}"

echo ""
echo "📋 Configuration de test:"
echo "- Domaine: $DOMAIN"
echo "- IP VPS: $VPS_IP"
echo ""

# Fonctions de test
test_dns() {
    echo "🔍 Test résolution DNS..."
    if nslookup $DOMAIN > /dev/null 2>&1; then
        RESOLVED_IP=$(nslookup $DOMAIN | grep "Address" | tail -1 | awk '{print $2}')
        echo "✅ DNS résolu: $DOMAIN → $RESOLVED_IP"
        
        if [ "$RESOLVED_IP" = "$VPS_IP" ]; then
            echo "✅ DNS pointe correctement vers le VPS"
            return 0
        else
            echo "⚠️  DNS ne pointe pas vers le VPS ($VPS_IP)"
            return 1
        fi
    else
        echo "❌ Résolution DNS échouée"
        return 1
    fi
}

test_http() {
    echo ""
    echo "🌐 Test HTTP/HTTPS..."
    
    # Test HTTP
    if curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" | grep -q "200\|301\|302"; then
        echo "✅ HTTP accessible"
    else
        echo "❌ HTTP inaccessible"
    fi
    
    # Test HTTPS
    if curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" | grep -q "200\|301\|302"; then
        echo "✅ HTTPS accessible"
    else
        echo "⚠️  HTTPS non configuré (normal avant SSL)"
    fi
}

test_vps_services() {
    echo ""
    echo "🖥️  Test services VPS..."
    
    if [ "$VPS_IP" != "[IP_VPS_À_DÉFINIR]" ]; then
        echo "📡 Ping VPS..."
        if ping -c 1 "$VPS_IP" > /dev/null 2>&1; then
            echo "✅ VPS accessible (ping)"
        else
            echo "❌ VPS inaccessible"
        fi
    else
        echo "⚠️  IP VPS non définie - passez l'IP en paramètre"
        echo "💡 Usage: $0 123.45.67.89"
    fi
}

test_app_health() {
    echo ""
    echo "🚀 Test application Lilou-GO..."
    
    # Test si l'app répond
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" 2>/dev/null || echo "000")
    
    case $RESPONSE in
        200)
            echo "✅ Application en ligne et fonctionnelle"
            ;;
        301|302)
            echo "✅ Redirection configurée (probablement HTTPS)"
            ;;
        401)
            echo "⚠️  Protection d'accès activée"
            ;;
        404)
            echo "❌ Application non trouvée"
            ;;
        502|503)
            echo "❌ Application en erreur (vérifier PM2)"
            ;;
        000)
            echo "❌ Aucune réponse (DNS ou serveur)"
            ;;
        *)
            echo "⚠️  Réponse inattendue: $RESPONSE"
            ;;
    esac
}

generate_report() {
    echo ""
    echo "📊 Rapport de Configuration"
    echo "=========================="
    echo ""
    echo "🌐 URLs à tester:"
    echo "- Principal: https://$DOMAIN"
    echo "- WWW: https://www.$DOMAIN"
    echo "- IP directe: http://$VPS_IP (si configuré)"
    echo ""
    echo "🔧 Commandes de diagnostic VPS:"
    echo "ssh root@$VPS_IP 'pm2 status'"
    echo "ssh root@$VPS_IP 'nginx -t'"
    echo "ssh root@$VPS_IP 'systemctl status nginx'"
    echo ""
    echo "📋 Checklist post-déploiement:"
    echo "- [ ] DNS configuré (A → VPS IP)"
    echo "- [ ] SSL installé (certbot)"
    echo "- [ ] Application déployée (PM2)"
    echo "- [ ] Nginx configuré et actif"
    echo "- [ ] Variables d'environnement configurées"
}

# Exécution des tests
test_dns
test_http  
test_vps_services
test_app_health
generate_report

echo ""
echo "✨ Test terminé ! Consultez le rapport ci-dessus."