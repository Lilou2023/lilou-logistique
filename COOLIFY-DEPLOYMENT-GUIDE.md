# 🚀 Guide Complet de Déploiement avec Coolify

## Table des Matières

1. [Introduction](#introduction)
2. [Configuration du VPS](#configuration-du-vps)
3. [Installation de Coolify](#installation-de-coolify)
4. [Connexion du Dépôt GitHub](#connexion-du-dépôt-github)
5. [Configuration des Variables d'Environnement Supabase](#configuration-des-variables-denvironnement-supabase)
6. [Configuration du Domaine et SSL](#configuration-du-domaine-et-ssl)
7. [Sécurisation du Pare-feu](#sécurisation-du-pare-feu)
8. [Configuration de la Surveillance](#configuration-de-la-surveillance)
9. [Dépannage](#dépannage)

---

## Introduction

Ce guide détaille toutes les étapes nécessaires pour déployer l'application **Lilou Logistique** sur un VPS en utilisant **Coolify**, une plateforme d'hébergement self-hosted open-source. Coolify simplifie le déploiement d'applications avec des fonctionnalités similaires à Heroku ou Vercel, mais avec un contrôle total sur votre infrastructure.

### Prérequis

- Un VPS avec au minimum :
  - **2 Go de RAM** (4 Go recommandé)
  - **20 Go d'espace disque** (40 Go recommandé)
  - **1 vCPU** (2 vCPU recommandé)
  - **Ubuntu 22.04 LTS** ou **Debian 11+**
- Un nom de domaine pointant vers votre VPS
- Accès SSH root au VPS
- Un compte GitHub avec accès au dépôt
- Un projet Supabase configuré

### Documentation Officielle

Ce guide s'appuie sur la documentation officielle de Coolify :
- Site officiel : https://coolify.io
- Documentation : https://coolify.io/docs
- GitHub : https://github.com/coollabsio/coolify

---

## Configuration du VPS

### Étape 1 : Connexion au VPS

```bash
# Connexion SSH en tant que root
ssh root@votre-ip-vps

# OU si vous utilisez une clé SSH spécifique
ssh -i ~/.ssh/votre_cle root@votre-ip-vps
```

### Étape 2 : Mise à Jour du Système

```bash
# Mettre à jour la liste des paquets
apt update

# Mettre à jour tous les paquets installés
apt upgrade -y

# Installer les outils essentiels
apt install -y curl wget git software-properties-common apt-transport-https ca-certificates
```

### Étape 3 : Configuration du Hostname

```bash
# Définir le hostname (remplacez par votre domaine)
hostnamectl set-hostname lilou-logistique

# Éditer /etc/hosts
nano /etc/hosts

# Ajouter cette ligne (remplacez l'IP par la vôtre)
# 192.168.1.100 lilou-logistique.com lilou-logistique
```

### Étape 4 : Créer un Utilisateur Non-Root (Optionnel mais Recommandé)

```bash
# Créer un utilisateur
adduser deploy

# Ajouter aux sudoers
usermod -aG sudo deploy

# Copier la configuration SSH
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
```

---

## Installation de Coolify

### Étape 1 : Installation en Une Commande

Coolify fournit un script d'installation automatique qui configure tout ce dont vous avez besoin :

```bash
# Exécuter le script d'installation officiel
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Ce script va :
- ✅ Installer Docker et Docker Compose
- ✅ Installer Coolify et ses dépendances
- ✅ Configurer les réseaux Docker nécessaires
- ✅ Démarrer l'interface web Coolify

**Durée estimée :** 5-10 minutes

### Étape 2 : Vérifier l'Installation

```bash
# Vérifier que Docker est installé
docker --version

# Vérifier que Coolify fonctionne
docker ps | grep coolify

# Afficher les logs de Coolify
docker logs -f coolify
```

### Étape 3 : Accéder à l'Interface Web

1. Ouvrez votre navigateur
2. Accédez à : `http://votre-ip-vps:8000`
3. Vous devriez voir l'écran de configuration initiale de Coolify

### Étape 4 : Configuration Initiale

1. **Créer le compte administrateur :**
   - Email : votre-email@domaine.com
   - Mot de passe : (utilisez un mot de passe fort)
   - Confirmez le mot de passe

2. **Configurer l'instance :**
   - Nom de l'instance : `Lilou Logistique Production`
   - Région : `Europe` (ou votre région)

3. **Configuration du serveur :**
   - Coolify détectera automatiquement votre serveur local
   - Validez la configuration

---

## Connexion du Dépôt GitHub

### Étape 1 : Ajouter une Source Git

1. Dans le dashboard Coolify, cliquez sur **Sources**
2. Cliquez sur **+ Add Source**
3. Sélectionnez **GitHub**

### Étape 2 : Générer un Token GitHub

1. Allez sur GitHub : https://github.com/settings/tokens
2. Cliquez sur **Generate new token** → **Generate new token (classic)**
3. Configurez le token :
   - **Note** : `Coolify - Lilou Logistique`
   - **Expiration** : `No expiration` (ou selon vos besoins)
   - **Scopes** :
     - ✅ `repo` (accès complet aux dépôts privés)
     - ✅ `read:org` (si dans une organisation)
     - ✅ `write:repo_hook` (pour les webhooks)
4. Cliquez sur **Generate token**
5. **Copiez le token** (vous ne le reverrez plus !)

### Étape 3 : Connecter GitHub à Coolify

1. Dans Coolify, collez le token GitHub
2. Donnez un nom : `GitHub - Lilou2023`
3. Cliquez sur **Save**

### Étape 4 : Créer un Nouveau Projet

1. Cliquez sur **+ New Project**
2. Donnez un nom : `Lilou Logistique`
3. Sélectionnez votre serveur

### Étape 5 : Ajouter l'Application

1. Dans le projet, cliquez sur **+ New Resource**
2. Sélectionnez **Application**
3. Choisissez **Public Repository** ou **Private Repository**
4. Configurez :
   - **Git Source** : Sélectionnez votre source GitHub
   - **Repository** : `Votre-Organisation/votre-depot` (exemple: `Lilou2023/lilou-logistique`)
   - **Branch** : `main`
   - **Build Pack** : `nixpacks` (détection automatique)
   - **Port** : `3000` (Next.js)

### Étape 6 : Configuration du Build

1. **Build Command** (laisser vide pour auto-détection ou spécifier) :
   ```bash
   npm run build
   ```

2. **Start Command** :
   ```bash
   npm start
   ```

3. **Base Directory** : `/` (racine du projet)

4. **Publish Directory** : `.next` (Next.js)

---

## Configuration des Variables d'Environnement Supabase

### Étape 1 : Récupérer les Credentials Supabase

1. Connectez-vous à votre projet Supabase : https://app.supabase.com
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Notez ces informations :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **API Keys** → **anon public** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **API Keys** → **service_role** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (⚠️ Secret)

### Étape 2 : Configurer les Variables dans Coolify

1. Dans votre application Coolify, allez dans l'onglet **Environment Variables**
2. Ajoutez les variables suivantes :

#### Variables Supabase

```env
# URL publique Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet-id.supabase.co

# Clé anonyme publique Supabase (safe pour le client)
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-publique-ici

# Clé de service Supabase (SECRET - pour les opérations backend)
SUPABASE_SERVICE_KEY=votre-cle-service-secrete-ici
```

#### Variables NextAuth

```env
# URL de l'application (sera mise à jour après configuration du domaine)
NEXTAUTH_URL=https://lilou-logistique.com

# Secret pour NextAuth (générer avec: openssl rand -base64 32)
NEXTAUTH_SECRET=votre-secret-aleatoire-genere-securise-32-caracteres

# Activer HTTPS en production
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

#### Variables Node.js

```env
# Environnement
NODE_ENV=production

# Port (Coolify le configure automatiquement, mais on peut le spécifier)
PORT=3000
```

### Étape 3 : Générer un Secret NextAuth

Sur votre machine locale ou le VPS :

```bash
# Générer un secret aléatoire sécurisé
openssl rand -base64 32

# Exemple de sortie (utilisez votre propre valeur !) :
# XyZ123abc/DEF456+ghi789JKL012mno=
```

Copiez ce secret dans la variable `NEXTAUTH_SECRET` dans Coolify.

### Étape 4 : Vérification des Variables

Assurez-vous que :
- ✅ Toutes les variables `NEXT_PUBLIC_*` sont accessibles côté client
- ✅ Les variables secrètes (comme `SUPABASE_SERVICE_KEY`) ne sont PAS préfixées par `NEXT_PUBLIC_`
- ✅ Aucune variable secrète n'est exposée dans le code client
- ✅ `NEXTAUTH_URL` correspond à votre domaine final

---

## Configuration du Domaine et SSL

### Étape 1 : Configuration DNS

Chez votre registrar de domaine (OVH, Gandi, Namecheap, etc.) :

1. **Créer un enregistrement A :**
   ```
   Type: A
   Name: @ (ou lilou-logistique.com)
   Value: 123.45.67.89 (votre IP VPS)
   TTL: 3600
   ```

2. **Créer un enregistrement A pour www (optionnel) :**
   ```
   Type: A
   Name: www
   Value: 123.45.67.89 (votre IP VPS)
   TTL: 3600
   ```

3. **Attendre la propagation DNS** (peut prendre de 5 minutes à 48 heures)

### Étape 2 : Vérifier la Propagation DNS

```bash
# Vérifier que le DNS pointe vers votre VPS
dig lilou-logistique.com +short
# Devrait afficher votre IP : 123.45.67.89

# OU utiliser nslookup
nslookup lilou-logistique.com
```

Vous pouvez aussi utiliser des outils en ligne :
- https://dnschecker.org
- https://www.whatsmydns.net

### Étape 3 : Configurer le Domaine dans Coolify

1. Dans votre application Coolify, allez dans l'onglet **Domains**
2. Cliquez sur **+ Add Domain**
3. Entrez votre domaine : `lilou-logistique.com`
4. Coolify va automatiquement :
   - Configurer un reverse proxy (Traefik)
   - Demander un certificat SSL Let's Encrypt
   - Configurer le renouvellement automatique

### Étape 4 : Activer HTTPS/SSL

Coolify utilise **Let's Encrypt** pour générer automatiquement des certificats SSL gratuits.

1. Dans l'onglet **Domains**, vérifiez que **SSL/TLS** est activé
2. Coolify va automatiquement :
   - Générer le certificat SSL
   - Le configurer dans Traefik
   - Rediriger HTTP vers HTTPS

**Temps de génération :** 1-2 minutes

### Étape 5 : Mettre à Jour NEXTAUTH_URL

Une fois le domaine configuré :

1. Retournez dans **Environment Variables**
2. Mettez à jour `NEXTAUTH_URL` :
   ```env
   NEXTAUTH_URL=https://lilou-logistique.com
   ```
3. **Redéployez l'application** pour que les changements prennent effet

### Étape 6 : Configuration HTTPS Forcé (Optionnel)

Pour forcer HTTPS sur tous les domaines :

```bash
# Dans les paramètres de l'application Coolify
# Activer "Force HTTPS Redirect"
```

### Étape 7 : Vérifier le Certificat SSL

```bash
# Vérifier le certificat SSL
openssl s_client -connect lilou-logistique.com:443 -servername lilou-logistique.com

# OU utiliser des outils en ligne
# https://www.ssllabs.com/ssltest/
```

---

## Sécurisation du Pare-feu

### Étape 1 : Installer et Configurer UFW (Uncomplicated Firewall)

```bash
# Installer UFW (si pas déjà installé)
apt install -y ufw

# Définir les règles par défaut
ufw default deny incoming
ufw default allow outgoing

# Autoriser SSH (IMPORTANT : à faire avant d'activer UFW !)
ufw allow 22/tcp
# OU si vous utilisez un port SSH personnalisé
# ufw allow 2222/tcp

# Autoriser HTTP
ufw allow 80/tcp

# Autoriser HTTPS
ufw allow 443/tcp

# Autoriser Coolify (interface web)
ufw allow 8000/tcp

# Afficher les règles avant activation
ufw show added

# Activer le pare-feu
ufw enable

# Vérifier le statut
ufw status verbose
```

### Étape 2 : Configuration Avancée du Pare-feu

```bash
# Limiter les tentatives de connexion SSH (protection contre brute force)
ufw limit 22/tcp

# Autoriser Docker (si nécessaire)
ufw allow 2376/tcp

# Autoriser des IPs spécifiques (pour administration)
ufw allow from 203.0.113.10 to any port 22

# Bloquer une IP spécifique
ufw deny from 198.51.100.50
```

### Étape 3 : Logs du Pare-feu

```bash
# Activer les logs
ufw logging on

# Voir les logs
tail -f /var/log/ufw.log

# Logs détaillés
ufw logging medium
```

### Étape 4 : Fail2Ban (Protection contre les Attaques par Force Brute)

```bash
# Installer Fail2Ban
apt install -y fail2ban

# Copier la configuration par défaut
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Éditer la configuration
nano /etc/fail2ban/jail.local
```

Configuration recommandée dans `jail.local` :

```ini
[DEFAULT]
# Bannir pour 10 minutes après 5 tentatives échouées en 10 minutes
bantime  = 600
findtime = 600
maxretry = 5

# Email de notification (optionnel)
destemail = admin@lilou-logistique.com
sendername = Fail2Ban-VPS
action = %(action_mwl)s

[sshd]
enabled = true
port = 22
logpath = /var/log/auth.log
maxretry = 3
```

```bash
# Démarrer Fail2Ban
systemctl enable fail2ban
systemctl start fail2ban

# Vérifier le statut
fail2ban-client status

# Vérifier les jails actives
fail2ban-client status sshd
```

### Étape 5 : Sécuriser SSH

Éditez la configuration SSH :

```bash
nano /etc/ssh/sshd_config
```

Modifiez ces paramètres :

```bash
# Désactiver la connexion root directe
PermitRootLogin no

# Utiliser uniquement les clés SSH (désactiver mot de passe)
PasswordAuthentication no
PubkeyAuthentication yes

# Désactiver les connexions vides
PermitEmptyPasswords no

# Limiter les utilisateurs autorisés
AllowUsers deploy

# Changer le port SSH (optionnel mais recommandé)
Port 2222

# Désactiver X11 forwarding
X11Forwarding no

# Timeout de session
ClientAliveInterval 300
ClientAliveCountMax 2
```

Redémarrer SSH :

```bash
systemctl restart sshd
```

⚠️ **ATTENTION** : Si vous changez le port SSH, n'oubliez pas de :
1. Autoriser le nouveau port dans UFW : `ufw allow 2222/tcp`
2. Supprimer l'ancien : `ufw delete allow 22/tcp`
3. Tester la nouvelle connexion AVANT de fermer votre session actuelle !

### Étape 6 : Mises à Jour Automatiques de Sécurité

```bash
# Installer les mises à jour automatiques
apt install -y unattended-upgrades

# Activer les mises à jour automatiques
dpkg-reconfigure -plow unattended-upgrades

# Éditer la configuration
nano /etc/apt/apt.conf.d/50unattended-upgrades
```

Configuration recommandée :

```bash
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
};

# Redémarrer automatiquement si nécessaire
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";

# Email de notification
Unattended-Upgrade::Mail "admin@lilou-logistique.com";
```

---

## Configuration de la Surveillance

### Étape 1 : Surveillance Intégrée Coolify

Coolify inclut une surveillance de base :

1. Dans le dashboard Coolify, allez dans **Server** → **Monitoring**
2. Vous verrez :
   - ✅ Utilisation CPU
   - ✅ Utilisation RAM
   - ✅ Utilisation disque
   - ✅ Trafic réseau

### Étape 2 : Logs de l'Application

Dans Coolify :

1. Allez dans votre application → **Logs**
2. Vous pouvez :
   - Voir les logs en temps réel
   - Filtrer par niveau (info, error, warning)
   - Télécharger les logs

### Étape 3 : Installer Netdata (Monitoring Avancé)

Netdata est un outil de monitoring en temps réel, open-source et gratuit.

```bash
# Installation en une commande
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# Netdata sera accessible sur http://votre-ip:19999
```

Configuration :

```bash
# Éditer la configuration
nano /etc/netdata/netdata.conf

# Configurer les alertes email
nano /etc/netdata/health_alarm_notify.conf
```

Ajouter au pare-feu (si vous voulez accéder à l'interface) :

```bash
# Autoriser uniquement depuis votre IP
ufw allow from votre-ip-publique to any port 19999

# OU créer un tunnel SSH
ssh -L 19999:localhost:19999 root@votre-vps-ip
# Puis accéder à http://localhost:19999 sur votre machine
```

### Étape 4 : Alertes par Email

Configurer les alertes Netdata :

```bash
nano /etc/netdata/health_alarm_notify.conf
```

```ini
# Configuration email
SEND_EMAIL="YES"
DEFAULT_RECIPIENT_EMAIL="admin@lilou-logistique.com"

# Configuration SMTP (exemple avec Gmail)
EMAIL_SENDER="netdata@lilou-logistique.com"
SMTP_SERVER="smtp.gmail.com:587"
SMTP_USERNAME="votre-email@gmail.com"
SMTP_PASSWORD="votre-mot-de-passe-application"

# OU utiliser sendmail
SEND_EMAIL="YES"
```

### Étape 5 : Uptime Monitoring Externe

Utilisez un service externe pour surveiller la disponibilité :

**Options gratuites :**

1. **UptimeRobot** (https://uptimerobot.com)
   - 50 monitors gratuits
   - Vérifications toutes les 5 minutes
   - Alertes email/SMS

2. **Better Uptime** (https://betteruptime.com)
   - Monitoring gratuit
   - Status page incluse
   - Intégration Slack/Discord

3. **Cronitor** (https://cronitor.io)
   - Monitoring de cron jobs
   - Alertes avancées

**Configuration exemple avec UptimeRobot :**

1. Créer un compte sur https://uptimerobot.com
2. Ajouter un nouveau monitor :
   - **Monitor Type** : HTTP(s)
   - **Friendly Name** : Lilou Logistique Production
   - **URL** : https://lilou-logistique.com
   - **Monitoring Interval** : 5 minutes
3. Configurer les alertes :
   - Email
   - Webhook (optionnel pour Slack/Discord)

### Étape 6 : Logs Centralisés avec Loki (Optionnel)

Pour une solution de logs avancée :

```bash
# Installer Loki et Promtail
docker run -d --name=loki -p 3100:3100 grafana/loki:latest

# Configuration pour envoyer les logs de Coolify à Loki
docker run -d --name=promtail \
  -v /var/log:/var/log \
  -v /var/lib/docker/containers:/var/lib/docker/containers \
  grafana/promtail:latest \
  -config.file=/etc/promtail/config.yml
```

### Étape 7 : Dashboard de Surveillance

Coolify fournit un dashboard intégré, mais vous pouvez également :

1. **Grafana** (visualisation avancée)
   ```bash
   docker run -d --name=grafana -p 3001:3000 grafana/grafana
   ```

2. **Accéder au dashboard**
   - Netdata : `http://votre-ip:19999`
   - Grafana : `http://votre-ip:3001`
   - Coolify : `http://votre-ip:8000`

### Étape 8 : Vérifications de Santé Automatiques

Dans Coolify, configurez les health checks :

1. Allez dans votre application → **Health Check**
2. Configurez :
   - **Path** : `/api/health` (ou créer un endpoint)
   - **Interval** : 30 secondes
   - **Timeout** : 5 secondes
   - **Retries** : 3

Créez un endpoint de santé dans votre application Next.js :

```typescript
// pages/api/health.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la connexion Supabase
  try {
    // Votre logique de vérification
    res.status(200).json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy',
      error: 'Service unavailable' 
    });
  }
}
```

---

## Dépannage

### Problème 1 : Coolify ne Démarre pas

**Symptôme :** Impossible d'accéder à l'interface Coolify.

**Solutions :**

```bash
# Vérifier les conteneurs Docker
docker ps -a | grep coolify

# Redémarrer Coolify
docker restart coolify

# Voir les logs
docker logs -f coolify

# Vérifier l'espace disque
df -h

# Nettoyer Docker si nécessaire
docker system prune -a
```

### Problème 2 : Erreur de Build

**Symptôme :** Le déploiement échoue lors du build.

**Solutions :**

1. **Vérifier les logs de build** dans Coolify
2. **Vérifier les variables d'environnement** (toutes les variables requises sont définies ?)
3. **Tester le build localement** :
   ```bash
   git clone https://github.com/Lilou2023/lilou-logistique.git
   cd lilou-logistique
   npm install
   npm run build
   ```

### Problème 3 : Certificat SSL non Généré

**Symptôme :** Le site est accessible en HTTP mais pas en HTTPS.

**Solutions :**

```bash
# Vérifier que le DNS pointe bien vers le VPS
dig lilou-logistique.com +short

# Vérifier les logs Traefik (reverse proxy de Coolify)
docker logs traefik

# Régénérer le certificat manuellement
# Dans Coolify → Domains → Regenerate SSL
```

### Problème 4 : Application ne Répond pas

**Symptôme :** Le site est inaccessible ou renvoie 502 Bad Gateway.

**Solutions :**

```bash
# Vérifier les logs de l'application
docker logs -f [nom-conteneur-application]

# Vérifier que le port 3000 est bien écouté
netstat -tlnp | grep 3000

# Redémarrer l'application dans Coolify
# Ou via Docker :
docker restart [nom-conteneur-application]

# Vérifier la mémoire disponible
free -h

# Vérifier les processus
htop
```

### Problème 5 : Variables d'Environnement non Prises en Compte

**Symptôme :** L'application ne se connecte pas à Supabase.

**Solutions :**

1. Vérifiez que les variables sont bien définies dans Coolify
2. **Redéployez l'application** après avoir modifié les variables
3. Vérifiez les logs pour voir les variables chargées :
   ```bash
   docker exec -it [conteneur] env | grep SUPABASE
   ```

### Problème 6 : Performance Lente

**Symptôme :** Le site est lent ou timeouts fréquents.

**Solutions :**

```bash
# Vérifier l'utilisation des ressources
htop

# Augmenter la RAM du VPS si nécessaire

# Activer le cache dans Next.js
# Vérifier next.config.js

# Optimiser les images
# Vérifier la configuration d'optimisation d'images Next.js
```

### Problème 7 : Webhook GitHub ne Fonctionne pas

**Symptôme :** Les pushs sur GitHub ne déclenchent pas de déploiement automatique.

**Solutions :**

1. Dans GitHub → Settings → Webhooks, vérifiez que le webhook Coolify existe
2. Vérifiez que l'URL du webhook est accessible : `https://votre-domaine.com/api/webhooks/[id]`
3. Regardez les logs du webhook dans GitHub
4. Régénérez le webhook dans Coolify si nécessaire

### Problème 8 : Impossible de Se Connecter en SSH

**Symptôme :** Connexion SSH refusée.

**Solutions :**

```bash
# Vérifier depuis un autre terminal (avant de fermer la session actuelle)
ssh -v deploy@votre-ip -p 2222

# Depuis la console du provider VPS (OVH, DigitalOcean, etc.)
# Vérifier le service SSH
systemctl status sshd

# Réinitialiser la config SSH si nécessaire
cp /etc/ssh/sshd_config.backup /etc/ssh/sshd_config
systemctl restart sshd
```

---

## Checklist Finale de Déploiement

### Avant le Déploiement

- [ ] VPS configuré avec Ubuntu 22.04 LTS
- [ ] Accès root SSH fonctionnel
- [ ] Nom de domaine acheté
- [ ] Compte GitHub avec accès au dépôt
- [ ] Projet Supabase configuré

### Installation et Configuration

- [ ] Coolify installé et accessible sur `:8000`
- [ ] Compte administrateur Coolify créé
- [ ] Source GitHub connectée à Coolify
- [ ] Application créée et configurée
- [ ] Variables d'environnement Supabase définies
- [ ] Variables NextAuth configurées
- [ ] Premier build réussi

### Domaine et SSL

- [ ] Enregistrements DNS configurés (A record)
- [ ] DNS propagé (vérification avec `dig`)
- [ ] Domaine ajouté dans Coolify
- [ ] Certificat SSL Let's Encrypt généré
- [ ] HTTPS fonctionnel et forcé
- [ ] `NEXTAUTH_URL` mis à jour avec le domaine

### Sécurité

- [ ] Pare-feu UFW configuré et activé
- [ ] Ports 22 (SSH), 80 (HTTP), 443 (HTTPS) autorisés
- [ ] Fail2Ban installé et configuré
- [ ] SSH sécurisé (clés uniquement, pas de root)
- [ ] Mises à jour automatiques activées

### Surveillance

- [ ] Monitoring Coolify configuré
- [ ] Netdata installé (optionnel)
- [ ] Uptime monitoring externe configuré
- [ ] Alertes email configurées
- [ ] Logs accessibles et vérifiés
- [ ] Health check endpoint créé

### Tests Finaux

- [ ] Site accessible via HTTPS : `https://lilou-logistique.com`
- [ ] Certificat SSL valide (vérification SSLLabs)
- [ ] Application fonctionne correctement
- [ ] Connexion Supabase opérationnelle
- [ ] Déploiement automatique via webhook GitHub fonctionne
- [ ] Surveillance et alertes opérationnelles

---

## Ressources et Documentation

### Documentation Officielle

- **Coolify** : https://coolify.io/docs
- **Next.js** : https://nextjs.org/docs
- **Supabase** : https://supabase.com/docs
- **Docker** : https://docs.docker.com
- **Let's Encrypt** : https://letsencrypt.org/docs

### Outils de Diagnostic

- **DNS Checker** : https://dnschecker.org
- **SSL Labs** : https://www.ssllabs.com/ssltest
- **Webhook Tester** : https://webhook.site
- **Speed Test** : https://pagespeed.web.dev

### Support et Communauté

- **Coolify Discord** : https://discord.gg/coolify
- **Coolify GitHub Issues** : https://github.com/coollabsio/coolify/issues
- **Supabase Discord** : https://discord.supabase.com

---

## Maintenance Continue

### Tâches Quotidiennes

- Vérifier les logs de l'application
- Surveiller les métriques (CPU, RAM, disque)
- Vérifier les alertes emails

### Tâches Hebdomadaires

- Vérifier les backups automatiques
- Analyser les logs d'erreurs
- Vérifier la validité du certificat SSL

### Tâches Mensuelles

- Mettre à jour les dépendances npm
- Vérifier les mises à jour Coolify
- Analyser les performances et optimiser si nécessaire
- Auditer les logs de sécurité

### Tâches Trimestrielles

- Réviser la configuration de sécurité
- Tester les procédures de restauration
- Mettre à jour la documentation
- Auditer les coûts d'infrastructure

---

## Conclusion

Félicitations ! 🎉 Vous avez maintenant déployé **Lilou Logistique** sur votre propre VPS avec Coolify. Votre application est :

- ✅ **Hébergée de manière indépendante** sur votre infrastructure
- ✅ **Sécurisée** avec pare-feu, SSL, et authentification
- ✅ **Surveillée** avec monitoring et alertes
- ✅ **Automatisée** avec déploiements continus depuis GitHub

### Prochaines Étapes

1. **Surveiller les performances** pendant les premiers jours
2. **Optimiser** selon les métriques collectées
3. **Configurer les backups automatiques** de la base de données Supabase
4. **Documenter** vos procédures spécifiques

### Besoin d'Aide ?

N'hésitez pas à consulter :
- La documentation officielle de Coolify
- La communauté Discord
- Les issues GitHub du projet

**Bon déploiement ! 🚀**
