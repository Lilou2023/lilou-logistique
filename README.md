# Objectif : Configurer et déployer automatiquement le projet lilou-logistique sur GitHub avec intégration Hostinger

## Environment variables

Le fichier `.env.example` contient des valeurs factices (comme `YOUR_SUPABASE_URL`).
Remplacez-les par vos clés réelles avant d'exécuter le projet.

Créer un dépôt GitHub

Nom : lilou-logistique

Type : Public

Ne pas initialiser avec README

Ne pas sauvegarder les infos personnelles

Ajouter la clé SSH de Hostinger au dépôt

Accéder à Settings → Deploy keys dans le dépôt

Titre : Hostinger - lilou-logistique.com

Clé :

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDULDMx2iSXlJ5mo9cPIm1LJ5OFGB5atXuLFkR53Mqy6Lla3vAZKbP0Np2LhgXOxCxjku1p66NRND+A3CqGVOpDGMoiAEFWKrjHkJPFgokB956MDFopvHJ4zQkbX4ubMe/6j6dkht4Web9QxzPFWcUeCFihkmydAdEEFvDyfYiqS5X1JRVgRYjp5ISddws7Wl9T2ivP2hAM40Fz5e1nPGX8vJ/yzy7GHYD0g01NVdndZHnfu+UwDHhL7+4mpJdkCFNWpDlUZIyrbiE0kAfYaisOrewChq0b5ZMmhK0TiuCvVoTRmmTsp92TVwr7cApyxyWq0gGtq44tUtJqESSrAq1BL/SIo+X0d6fcKd7qffxnz2rhL28UoVLQr+1HikJwEh1Wbdbh4g3vGuj1XQLzMG4LG6ezIfluEnDRB8uvRq6NIJi/4j/TLpTPbKZ5jzN6hHOe9u76FmmeSAHzKQUnc49LVQaG2D/E0/hS5+C6EeHL/l9sQf6D/xUV/STUOQ2arek= u240832595@fr-int-web1588.main-hosting.eu
Cochez Allow write access

Pousser le projet local avec init-github.sh

Depuis le dossier lilou-logistique, exécuter :

bash init-github.sh
Ce script initialise Git, configure les infos locales, fait le commit et push vers main

Configurer les secrets GitHub dans Settings → Secrets and variables → Actions :

Ajouter les clés suivantes :

NEXT_PUBLIC_SUPABASE_URL=https://mvhogfelpbufnrklxpxq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjQ0MDksImV4cCI6MjA2NDMwMDQwOX0.FrVdKelHzLgJFGFwnYfA23XsbzgrK6PCsSV01a1qM5I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcyNDQwOSwiZXhwIjoyMDY0MzAwNDA5fQ.keTkB1muKnhNK3TkDrOcdG6vjQJKA_OYDIUSIUPDfSM
OPENAI_API_KEY=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
JWT_SECRET=UiuSVGy6+Tzn93GwXa/dcyPBeD+Y9q7f18fwUPL/D1cdYmQQI5K8OjMZh/RlbCErVbgCSL9NqNAPAYVVxzAzPA==
NEXTAUTH_SECRET=ytvqKJNF+DHMZXHeipda6n+DGVOKYWz2+5MoUiN/I6ED7v65kwboamNyN1Q=
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
