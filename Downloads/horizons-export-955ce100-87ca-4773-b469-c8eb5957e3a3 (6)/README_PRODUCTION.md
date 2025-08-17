# Lilou-GO IA - Guide de Déploiement sur Hostinger

Ce guide explique comment déployer l'application React "Lilou-GO IA" sur un plan d'hébergement Hostinger.

## Prérequis

1.  **Plan d'hébergement Hostinger** : Assurez-vous d'avoir un plan d'hébergement web Hostinger actif qui supporte Node.js.
2.  **Accès SSH** : L'accès SSH doit être activé pour votre compte d'hébergement. Vous pouvez le faire depuis votre hPanel.
3.  **Node.js et npm** : Assurez-vous que Node.js est configuré sur votre environnement d'hébergement Hostinger. Vous pouvez le configurer depuis la section "Configuration de Node.js" dans hPanel.

## Étape 1 : Préparation des Variables d'Environnement

Avant de déployer, vous devez configurer vos variables d'environnement Supabase.

1.  **Créez un fichier `.env.production`** à la racine de votre projet.
2.  **Ajoutez vos clés Supabase** dans ce fichier. Vous pouvez trouver ces clés dans votre tableau de bord Supabase sous `Project Settings > API`.

    ```
    VITE_SUPABASE_URL=VOTRE_URL_SUPABASE
    VITE_SUPABASE_ANON_KEY=VOTRE_CLE_ANON_SUPABASE
    VITE_OPENAI_API_KEY=VOTRE_CLE_API_OPENAI
    ```

    **IMPORTANT** : Ne partagez jamais ce fichier publiquement.

## Étape 2 : Build de l'Application

Avant de téléverser les fichiers, vous devez construire la version de production de votre application.

1.  **Ouvrez un terminal** à la racine de votre projet.
2.  **Installez les dépendances** :
    ```bash
    npm install
    ```
3.  **Lancez le build de production** :
    ```bash
    npm run build
    ```
    Cette commande va créer un dossier `dist` à la racine de votre projet. C'est ce dossier que nous allons déployer.

## Étape 3 : Déploiement sur Hostinger

Vous pouvez déployer vos fichiers de deux manières : via le Gestionnaire de Fichiers de Hostinger ou via SSH/Git.

### Méthode 1 : Gestionnaire de Fichiers (Plus simple)

1.  **Connectez-vous à votre hPanel** Hostinger.
2.  Allez dans **Fichiers > Gestionnaire de fichiers**.
3.  Naviguez jusqu'au dossier racine de votre site web (généralement `public_html`).
4.  **Supprimez les fichiers existants** (comme `default.php`) s'il y en a.
5.  **Compressez le contenu du dossier `dist`** de votre projet local en un fichier ZIP.
6.  **Téléversez ce fichier ZIP** dans `public_html` via le Gestionnaire de fichiers.
7.  **Extrayez le fichier ZIP** directement dans `public_html`.

### Méthode 2 : SSH et Git (Plus avancée)

1.  **Connectez-vous à votre serveur** via SSH.
2.  **Clonez votre projet** depuis votre dépôt Git (ex: GitHub).
    ```bash
    git clone VOTRE_URL_DE_DEPOT.git
    ```
3.  **Naviguez dans le dossier** du projet.
    ```bash
    cd nom-de-votre-projet
    ```
4.  **Installez les dépendances et lancez le build** (si Node.js est configuré sur le serveur).
    ```bash
    npm install
    npm run build
    ```
5.  **Configurez votre domaine** pour qu'il pointe vers le dossier `dist` de votre projet. Vous pouvez généralement le faire depuis la section "Domaines" de votre hPanel.

## Étape 4 : Configuration Finale

Après avoir téléversé les fichiers, il y a une dernière étape importante pour que le routage de React fonctionne correctement.

1.  **Créez un fichier `.htaccess`** dans le dossier `public_html` (ou le dossier où se trouve votre `index.html`).
2.  **Ajoutez les règles de réécriture suivantes** dans ce fichier `.htaccess`. Cela redirigera toutes les requêtes vers votre `index.html`, permettant à React Router de gérer la navigation.

    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /index.html [L]
    </IfModule>
    ```

Votre application Lilou-GO IA est maintenant déployée et devrait être accessible via votre nom de domaine. Félicitations ! 🚀