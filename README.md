# Objectif : Configurer et déployer automatiquement le projet lilou-logistique sur GitHub avec intégration Hostinger

Créer un dépôt GitHub

Nom : lilou-logistique

Type : Public

Ne pas initialiser avec README

Ne pas sauvegarder les infos personnelles

Ajouter la clé SSH de Hostinger au dépôt

Accéder à Settings → Deploy keys dans le dépôt

Titre : Hostinger - lilou-logistique.com

Clé :

`[YOUR_HOSTINGER_SSH_KEY]`
Cochez Allow write access

Pousser le projet local avec init-github.sh

Depuis le dossier lilou-logistique, exécuter :

bash init-github.sh
Ce script initialise Git, configure les infos locales, fait le commit et push vers main

Configurer les secrets GitHub dans Settings → Secrets and variables → Actions :

Ajouter les clés suivantes :

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
OPENAI_API_KEY=your-openai-api-key
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
Configurer Git sur Hostinger

Aller dans le panneau d’administration → section GIT

Renseigner :

Dépôt : git@github.com:Lilou2023/lilou-logistique.git

Branche : hostinger-deploy

Répertoire : (laisser vide)

Cliquer sur Créer

Attendre le déploiement automatique

GitHub Actions va créer la branche hostinger-deploy

Hostinger va automatiquement déployer le site : https://lilou-logistique.com

Confirmer que tout est en ligne :

Aperçu live : https://f471e78f-f041-4565-87c5-6867ce01bf46.dev31.app-preview.com/

intègre ce guide dans le fichier README.md du projet
