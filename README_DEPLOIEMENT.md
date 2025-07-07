# 📦 README Déploiement

Ce guide rapide explique comment déployer le projet **Lilou Logistique** en local ou sur un serveur. 

## 🚧 Prérequis

Assurez‑vous d'avoir les outils suivants installés sur votre machine :

- **Node.js** (version 20 ou supérieure)
- **npm** (généralement installé avec Node)
- **git**

## ▶️ Exécuter `tools/deploy.sh`

1. **Cloner ce repository**
   ```bash
   git clone https://github.com/Lilou2023/lilou-logistique.git
   ```
2. **Accéder au dossier**
   ```bash
   cd lilou-logistique
   ```
3. **Lancer le script de déploiement**
   ```bash
   bash tools/deploy.sh
   ```

Le script installe les dépendances, construit le projet puis démarre l'application.

## 🌐 Déploiement Hostinger

Dès que vous poussez des modifications sur la branche `hostinger-deploy`, Hostinger déclenche automatiquement un nouveau déploiement.
