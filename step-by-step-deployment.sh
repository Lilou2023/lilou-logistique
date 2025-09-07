#!/bin/bash

# 🚀 Guide Interactif de Déploiement - Lilou-GO sur VPS
# =====================================================

clear
echo "🎯 DÉPLOIEMENT LILOU-GO - ÉTAPE PAR ÉTAPE"
echo "========================================"
echo ""

# Variables
VPS_IP=""
SSH_PORT="22"
SSH_USER="root"
DOMAIN="lilou-logistique.com"

# Fonction pour demander l'IP VPS
get_vps_ip() {
    echo "📋 ÉTAPE 1 : Configuration VPS"
    echo "----------------------------"
    echo ""
    echo "🔗 Ouvrez cette URL dans votre navigateur :"
    echo "https://hpanel.hostinger.com/vps/942059/overview"
    echo ""
    echo "📍 Trouvez l'IP publique de votre VPS et entrez-la ci-dessous :"
    echo "(Format attendu : 123.45.67.89)"
    echo ""
    read -p "💡 IP publique du VPS : " VPS_IP
    
    # Validation basique de l'IP
    if [[ $VPS_IP =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        echo "✅ IP valide : $VPS_IP"
    else
        echo "❌ Format IP invalide. Exemple : 123.45.67.89"
        get_vps_ip
    fi
}

# Fonction pour tester la connexion SSH
test_ssh_connection() {
    echo ""
    echo "📋 ÉTAPE 2 : Test de Connexion SSH"
    echo "--------------------------------"
    echo ""
    echo "🔐 Test de connexion SSH vers : $SSH_USER@$VPS_IP"
    echo ""
    
    # Test de ping d'abord
    echo "📡 Test de connectivité réseau..."
    if ping -c 1 "$VPS_IP" > /dev/null 2>&1; then
        echo "✅ VPS accessible (ping réussi)"
    else
        echo "❌ VPS inaccessible (ping échoué)"
        echo "💡 Vérifiez l'IP ou attendez que le VPS soit complètement démarré"
        return 1
    fi
    
    echo ""
    echo "🔑 Tentative de connexion SSH..."
    echo "💡 Si demandé, tapez 'yes' pour accepter la clé, puis entrez le mot de passe root"
    echo ""
    
    # Commande SSH de test
    echo "ssh -o ConnectTimeout=10 $SSH_USER@$VPS_IP 'echo \"✅ Connexion SSH réussie !\"'"
    
    if ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$SSH_USER@$VPS_IP" 'echo "✅ Connexion SSH réussie !"' 2>/dev/null; then
        echo ""
        echo "🎉 Connexion SSH fonctionnelle !"
        return 0
    else
        echo ""
        echo "⚠️  Connexion SSH échouée. Causes possibles :"
        echo "   - Mot de passe incorrect"
        echo "   - VPS en cours de démarrage"
        echo "   - Firewall bloquant"
        echo ""
        echo "🔧 Essayez manuellement :"
        echo "ssh $SSH_USER@$VPS_IP"
        return 1
    fi
}

# Fonction pour générer la configuration DNS
generate_dns_config() {
    echo ""
    echo "📋 ÉTAPE 3 : Configuration DNS"
    echo "----------------------------"
    echo ""
    echo "🌐 Configuration DNS pour $DOMAIN → $VPS_IP"
    echo ""
    echo "📝 Voici la configuration DNS à appliquer :"
    echo ""
    echo "┌─────────────────────────────────────────┐"
    echo "│ CONFIGURATION DNS HOSTINGER             │"
    echo "├─────────────────────────────────────────┤"
    echo "│                                         │"
    echo "│ 1. SUPPRIMER l'enregistrement A actuel │"
    echo "│    A  @  84.32.84.3250                 │"
    echo "│                                         │"
    echo "│ 2. AJOUTER le nouvel enregistrement A   │"
    echo "│    A  @  $VPS_IP                   │"
    echo "│                                         │"
    echo "│ 3. VÉRIFIER le CNAME www                │"
    echo "│    CNAME  www  lilou-logistique.com    │"
    echo "│                                         │"
    echo "└─────────────────────────────────────────┘"
    echo ""
    
    # Créer un fichier de configuration
    cat > "/tmp/dns-config-$VPS_IP.txt" << EOF
Configuration DNS pour lilou-logistique.com
==========================================

IP VPS : $VPS_IP
Date   : $(date)

ÉTAPES DANS HOSTINGER DNS :
1. Aller sur : https://hpanel.hostinger.com/domain/lilou-logistique.com/dns?tab=dns_records

2. SUPPRIMER :
   Type: A  Nom: @  Pointe vers: 84.32.84.3250

3. AJOUTER :
   Type: A  Nom: @  Pointe vers: $VPS_IP  TTL: 300

4. VÉRIFIER :
   Type: CNAME  Nom: www  Pointe vers: lilou-logistique.com  TTL: 300

5. CHANGER LES SERVEURS DE NOMS (si encore sur parking) :
   ns1.hostinger.com
   ns2.hostinger.com

DÉLAI DE PROPAGATION : 15 minutes à 24 heures
EOF
    
    echo "💾 Configuration sauvée dans : /tmp/dns-config-$VPS_IP.txt"
}

# Fonction pour créer les prochaines étapes
next_steps() {
    echo ""
    echo "📋 ÉTAPES SUIVANTES"
    echo "=================="
    echo ""
    echo "🔄 Après avoir configuré le DNS :"
    echo ""
    echo "1. 📥 Connexion au VPS :"
    echo "   ssh $SSH_USER@$VPS_IP"
    echo ""
    echo "2. 🚀 Installation automatique :"
    echo "   curl -sSL [URL_DU_SCRIPT] | bash"
    echo ""
    echo "3. 📦 Déploiement de l'application :"
    echo "   deploy-lilou"
    echo ""
    echo "4. 🔐 Configuration SSL :"
    echo "   certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo ""
    echo "5. ✅ Test final :"
    echo "   ./test-vps-deployment.sh $VPS_IP"
    echo ""
    
    # Créer script de connexion rapide
    cat > "/tmp/connect-vps.sh" << EOF
#!/bin/bash
echo "🔐 Connexion au VPS Lilou-GO..."
ssh $SSH_USER@$VPS_IP
EOF
    chmod +x "/tmp/connect-vps.sh"
    
    echo "🔑 Script de connexion créé : /tmp/connect-vps.sh"
}

# Exécution du guide interactif
main() {
    get_vps_ip
    
    if test_ssh_connection; then
        generate_dns_config
        next_steps
        
        echo ""
        echo "✅ CONFIGURATION PRÊTE !"
        echo "======================"
        echo ""
        echo "🎯 Prochaine action : Configurer le DNS avec l'IP $VPS_IP"
        echo "📋 Puis revenir ici pour continuer l'installation"
        
    else
        echo ""
        echo "⚠️  Connexion SSH à résoudre avant de continuer"
        echo "💡 Vérifiez l'IP, le mot de passe, ou contactez Hostinger"
    fi
}

# Lancer le guide
main