# 🚚 Lilou Logistique

[](https://github.com/Lilou2023/lilou-logistique/actions)
[](https://github.com/Lilou2023/lilou-logistique/actions)
[](https://nextjs.org/)
[](https://www.google.com/search?q=LICENSE)

Plateforme Next.js dédiée à la gestion logistique intelligente et connectée avec Supabase et OpenAI.

## 🚀 Fonctionnalités principales

  - **Authentification sécurisée** via NextAuth.js
  - **Base de données temps réel** avec Supabase
  - **Intégration OpenAI** (analyse, génération, automatisation)
  - **CI/CD complet** via GitHub Actions
  - **Tests unitaires** et audit de sécurité automatisés
  - **Chargement local** de la police **Inter**

-----

## 🔧 Installation et configuration locale

### 1. Prérequis

  - Node.js version 20+
  - npm version 10+
  - Git

### 2. Cloner le dépôt

```bash
git clone https://github.com/Lilou2023/lilou-logistique.git
cd lilou-logistique
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer les variables d'environnement

Créez votre fichier de configuration local à partir de l'exemple fourni.

```bash
cp .env.example .env.local
```

Ensuite, modifiez le fichier `.env.local` pour y ajouter vos propres clés secrètes. Pour plus de détails sur où trouver ces clés, consultez le guide `GITHUB_SECRETS_SETUP.md`.

**Variables requises :**

  * `NEXT_PUBLIC_SUPABASE_URL`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  * `OPENAI_API_KEY`
  * `JWT_SECRET`
  * `NEXTAUTH_SECRET`

-----

## ⚙️ Commandes de développement

  * **Lancer le serveur de développement :**

    ```bash
    npm run dev
    ```

  * **Lancer les tests unitaires :**

    ```bash
    npm run test
    ```

  * **Valider la configuration de l'environnement :**

    ```bash
    npm run validate-env
    ```

  * **Construire l'application pour la production :**

    ```bash
    npm run build
    ```

-----

## 🚀 Déploiement sur Hostinger

Le déploiement est automatisé grâce à un script et à GitHub Actions.

### Workflow de déploiement

1.  Tout le développement se fait sur la branche `main`.
2.  Le script `./tools/deploy.sh` automatise la création d'une version statique du site.
3.  Cette version est poussée sur la branche `hostinger-deploy`.
4.  Hostinger détecte les changements sur cette branche et met le site en ligne à jour automatiquement.

### Déployer manuellement (recommandé)

Pour lancer un nouveau déploiement, assurez-vous que tous vos changements sont sur la branche `main`, puis exécutez :

```bash
./tools/deploy.sh
```

-----

## 🔗 Liens utiles

  * **GitHub Actions** : [https://github.com/Lilou2023/lilou-logistique/actions](https://github.com/Lilou2023/lilou-logistique/actions)
  * **Site de production** : [https://lilou-logistique.com](https://lilou-logistique.com)
  * **Documentation détaillée** : Consultez le dossier `/docs` pour des guides plus spécifiques.

## 🧾 Licence

Ce projet est sous licence MIT.
