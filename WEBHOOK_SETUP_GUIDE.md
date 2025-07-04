# 🎯 Guide de Configuration du Webhook GitHub

## 📋 Étapes de Configuration

### 1. Configuration GitHub (Optionnel)
Le webhook est déjà configuré automatiquement dans le code, mais vous pouvez également l'ajouter manuellement dans les paramètres GitHub :

#### URL de Configuration
```
https://github.com/Lilou2023/lilou-logistique/settings/hooks/new
```

#### Paramètres du Webhook
- **Payload URL** : `https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936`
- **Content Type** : `application/json`
- **Secret** : Laisser vide (pas nécessaire pour Hostinger)
- **Events** : Sélectionner "Just the push event"
- **Active** : ✅ Coché

### 2. Configuration Automatique (Recommandée)
Le webhook est automatiquement appelé par GitHub Actions quand :
- ✅ Un push est effectué sur la branche `main`
- ✅ Un merge est effectué vers `main`
- ✅ Le script `deploy.sh` est exécuté

### 3. Test de la Configuration

#### Test via Script
```bash
./test-webhook.sh
```

#### Test via Déploiement
```bash
./deploy.sh
```

#### Test via Git
```bash
git push origin main
```

### 4. Vérification du Déploiement

#### Vérifier les Logs GitHub Actions
1. Aller sur : https://github.com/Lilou2023/lilou-logistique/actions
2. Sélectionner le workflow "CI/CD Pipeline with Performance Optimization"
3. Vérifier l'étape "Trigger Hostinger deployment webhook"

#### Vérifier le Déploiement Hostinger
1. Se connecter au panneau de contrôle Hostinger
2. Aller dans la section "Webhooks" ou "Déploiements"
3. Vérifier que le déploiement a été déclenché

### 5. Dépannage

#### Webhook ne répond pas
```bash
# Tester la connectivité
curl -I https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936
```

#### Logs GitHub Actions
- Vérifier les logs dans l'onglet "Actions"
- Rechercher les messages d'erreur dans "Trigger Hostinger deployment webhook"

#### Support
- **Documentation** : [WEBHOOK_DEPLOYMENT_CONFIG.md](./WEBHOOK_DEPLOYMENT_CONFIG.md)
- **Support GitHub** : Issues du repository
- **Support Hostinger** : Panneau de contrôle Hostinger

## 🎉 Résultat Final

Une fois configuré, le déploiement automatique fonctionnera ainsi :

```
Code Push → GitHub Actions → Build → Tests → Webhook Hostinger → Déploiement Automatique
```

### Flux de Déploiement
1. **Développement** : Code sur branche `feature`
2. **Staging** : Merge vers `develop` → Déploiement staging
3. **Production** : Merge vers `main` → Déploiement production + Webhook Hostinger

### Notifications
- ✅ Logs GitHub Actions
- ✅ Notifications de déploiement
- ✅ Rapports de performance
- ✅ Statut des webhooks

---

*Configuration terminée ! Le déploiement automatique est maintenant opérationnel.*