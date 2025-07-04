# 🚀 Configuration du Déploiement Automatique - Webhook Hostinger

## 📋 Vue d'ensemble

Ce document décrit la configuration du déploiement automatique avec le webhook Hostinger pour le projet Lilou Logistique.

## 🔧 Configuration du Webhook

### URL du Webhook
```
https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936
```

### Configuration GitHub
Le webhook est configuré automatiquement via GitHub Actions et peut être déclenché manuellement via le script `deploy.sh`.

## 📡 Intégration GitHub Actions

### Déclenchement Automatique
Le webhook est appelé automatiquement dans les cas suivants :
- ✅ **Push sur `main`** : Déploiement en production
- ✅ **Merge vers `main`** : Déploiement automatique
- ✅ **Exécution manuelle** : Via le script `deploy.sh`

### Payload du Webhook
```json
{
  "repository": "Lilou2023/lilou-logistique",
  "ref": "refs/heads/main",
  "commit": "sha_du_commit",
  "branch": "main",
  "workflow": "CI/CD Pipeline with Performance Optimization",
  "run_id": "id_execution",
  "run_number": "numero_execution",
  "timestamp": "2024-01-01T12:00:00Z",
  "bundle_size": "245760",
  "source": "github-actions"
}
```

## 🔄 Workflow de Déploiement

### 1. Développement → Staging
```
develop branch → GitHub Actions → Staging Environment
```

### 2. Staging → Production
```
main branch → GitHub Actions → Production + Webhook Hostinger
```

## 🛠️ Commandes Disponibles

### Déploiement Automatique
```bash
# Déploiement complet (staging + production)
./deploy.sh

# Déploiement via GitHub Actions
git push origin main
```

### Test du Webhook
```bash
# Test manuel du webhook
curl -X POST \
  -H "Content-Type: application/json" \
  -H "User-Agent: Test-Lilou-Logistique" \
  -d '{"test": true, "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' \
  https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936
```

## 📊 Monitoring et Logs

### Vérification des Déploiements
1. **GitHub Actions** : Vérifier les logs dans l'onglet "Actions"
2. **Hostinger** : Vérifier les logs de déploiement dans le panneau de contrôle
3. **Application** : Vérifier que l'application fonctionne correctement

### Codes de Réponse du Webhook
- **200/201/204** : ✅ Déploiement déclenché avec succès
- **400** : ⚠️ Erreur de payload
- **401** : ❌ Erreur d'authentification
- **500** : ❌ Erreur serveur Hostinger

## 🔍 Dépannage

### Problèmes Courants

#### Webhook ne répond pas
```bash
# Vérifier la connectivité
curl -I https://webhooks.hostinger.com/deploy/9d76a543372e447af66b2fcc79675936
```

#### Déploiement bloqué
1. Vérifier les logs GitHub Actions
2. Vérifier l'état du serveur Hostinger
3. Contacter le support Hostinger si nécessaire

#### Erreurs d'authentification
- Vérifier que l'URL du webhook est correcte
- Vérifier les permissions du compte Hostinger

## 🔐 Sécurité

### Bonnes Pratiques
- ✅ URL du webhook stockée dans le code (pas sensible)
- ✅ Headers d'authentification appropriés
- ✅ Validation des réponses HTTP
- ✅ Logs des tentatives de déploiement

### Recommandations
- Surveiller les logs de déploiement
- Alerter en cas d'échec de déploiement
- Maintenir la documentation à jour

## 📞 Support

### Contacts
- **Équipe Dev** : Pour les problèmes de GitHub Actions
- **Support Hostinger** : Pour les problèmes de webhook/serveur
- **Documentation** : Ce fichier et `README.md`

### Ressources
- [Documentation Hostinger Webhooks](https://support.hostinger.com/en/articles/1583279-how-to-use-webhooks)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Configuration Repository](./webhook.config.js)

---

*Dernière mise à jour : $(date)*
*Version : 1.0*