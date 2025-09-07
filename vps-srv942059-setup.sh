#!/bin/bash

# 🚀 Configuration VPS srv942059.hstgr.cloud - Lilou-GO
# ====================================================

echo "🎯 Configuration VPS Hostinger - srv942059.hstgr.cloud"
echo "===================================================="

# Variables du VPS identifié
VPS_HOSTNAME="srv942059.hstgr.cloud"
VPS_IP="${1:-IP_NOT_PROVIDED}"
DOMAIN="lilou-logistique.com"

echo ""
echo "📋 Informations VPS :"
echo "- Hostname : $VPS_HOSTNAME"
echo "- IP Publique : $VPS_IP"
echo "- Domaine : $DOMAIN"

if [ "$VPS_IP" = "IP_NOT_PROVIDED" ]; then
    echo ""
    echo "❌ IP VPS manquante !"
    echo ""
    echo "🔍 TROUVEZ L'IP SUR LA PAGE VPS HOSTINGER :"
    echo "Dans l'interface srv942059.hstgr.cloud, cherchez :"
    echo "- Section 'Server Information' ou 'Overview'"
    echo "- Ligne 'Public IP Address' ou 'IP Address'"
    echo "- Format : 123.45.67.89"
    echo ""
    echo "💡 Puis relancez : $0 [VOTRE_IP]"
    echo "Exemple : $0 185.196.21.45"
    exit 1
fi

# Validation de l'IP
if [[ ! $VPS_IP =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    echo "❌ Format IP invalide : $VPS_IP"
    echo "💡 Format attendu : 123.45.67.89"
    exit 1
fi

echo ""
echo "✅ IP VPS validée : $VPS_IP"

# Test de connectivité
echo ""
echo "📡 Test de connectivité au VPS..."
if ping -c 2 "$VPS_IP" > /dev/null 2>&1; then
    echo "✅ VPS accessible (ping réussi)"
else
    echo "⚠️  VPS inaccessible (ping échoué)"
    echo "💡 Le VPS peut être en cours de démarrage"
fi

# Test de résolution du hostname
echo ""
echo "🌐 Test de résolution hostname..."
RESOLVED_IP=$(nslookup "$VPS_HOSTNAME" 2>/dev/null | grep "Address" | tail -1 | awk '{print $2}' 2>/dev/null)
if [ "$RESOLVED_IP" = "$VPS_IP" ]; then
    echo "✅ Hostname résout correctement vers $VPS_IP"
else
    echo "🔄 Hostname résout vers : $RESOLVED_IP (peut différer de l'IP publique)"
fi

# Génération de la configuration DNS
echo ""
echo "🌐 CONFIGURATION DNS À APPLIQUER :"
echo "================================="
echo ""
echo "🔗 Interface DNS : https://hpanel.hostinger.com/domain/lilou-logistique.com/dns"
echo ""

cat << EOF
┌─────────────────────────────────────────┐
│ MODIFICATIONS DNS REQUISES              │
├─────────────────────────────────────────┤
│                                         │
│ 1. ❌ SUPPRIMER :                       │
│    A  @  84.32.84.3250                 │
│                                         │
│ 2. ✅ AJOUTER :                         │
│    A  @  $VPS_IP                   │
│                                         │
│ 3. ✅ VÉRIFIER :                        │
│    CNAME  www  lilou-logistique.com    │
│                                         │
│ 4. 🔄 SERVEURS DE NOMS :                │
│    ns1.hostinger.com                   │
│    ns2.hostinger.com                   │
│                                         │
└─────────────────────────────────────────┘
EOF

# Test SSH
echo ""
echo "🔐 TEST DE CONNEXION SSH :"
echo "========================="
echo ""
echo "💡 Commandes à tester :"
echo ""
echo "# Option 1 - Par IP :"
echo "ssh root@$VPS_IP"
echo ""
echo "# Option 2 - Par hostname :"
echo "ssh root@$VPS_HOSTNAME"
echo ""

# Génération du script de connexion
cat > "/tmp/connect-srv942059.sh" << EOF
#!/bin/bash
echo "🔐 Connexion SSH au VPS srv942059..."
echo "Essai par IP : $VPS_IP"
ssh root@$VPS_IP
EOF

chmod +x "/tmp/connect-srv942059.sh"

# Génération de la configuration complète
cat > "/tmp/srv942059-config.txt" << EOF
Configuration VPS srv942059.hstgr.cloud
=======================================
Date : $(date)

VPS INFORMATION:
- Hostname : $VPS_HOSTNAME
- IP Public : $VPS_IP
- SSH Command : ssh root@$VPS_IP

DNS CONFIGURATION:
1. URL: https://hpanel.hostinger.com/domain/lilou-logistique.com/dns
2. Supprimer : A @ 84.32.84.3250
3. Ajouter   : A @ $VPS_IP (TTL: 300)
4. Vérifier  : CNAME www lilou-logistique.com (TTL: 300)

NEXT STEPS:
1. Configurer DNS (15 min)
2. Tester SSH : ssh root@$VPS_IP
3. Installer environnement
4. Déployer Lilou-GO

SCRIPTS CREATED:
- /tmp/connect-srv942059.sh (connexion SSH rapide)
- /tmp/srv942059-config.txt (cette config)
EOF

echo ""
echo "📁 FICHIERS GÉNÉRÉS :"
echo "- 🔑 /tmp/connect-srv942059.sh (connexion rapide)"
echo "- 📋 /tmp/srv942059-config.txt (configuration complète)"
echo ""
echo "🎯 PROCHAINES ÉTAPES :"
echo "1. 🌐 Configurer DNS avec IP $VPS_IP"
echo "2. 🔐 Tester SSH : ssh root@$VPS_IP"
echo "3. 🚀 Installer environnement automatiquement"
echo ""
echo "✨ Une fois DNS + SSH OK, revenez pour l'installation !"