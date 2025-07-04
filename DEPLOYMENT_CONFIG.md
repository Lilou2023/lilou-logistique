# 🚀 Configuration de Déploiement - Lilou Logistique

## 📋 Vue d'ensemble

Ce document décrit la configuration de déploiement pour Lilou Logistique, supportant plusieurs plateformes de déploiement.

## 🌐 Plateformes de Déploiement

### 1. Vercel (Production principale)
- **Branche**: `main`
- **Configuration**: `vercel.json`
- **Build**: Automatique via Vite
- **URL**: Configurée dans Vercel dashboard

### 2. Hostinger (Hébergement alternatif)
- **Branche**: `hostinger-deploy`
- **Repository**: `git@github.com:Lilou2023/lilou-logistique.git`
- **Répertoire source**: `dist/`
- **Répertoire cible**: `public_html/`
- **Script**: `deploy-hostinger.sh`

### 3. Staging (Développement)
- **Branche**: `develop`
- **Configuration**: Identique à la production
- **Déploiement**: Via GitHub Actions

## 🔧 Configurations

### Vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Next.config.js (Compatibilité)
```javascript
module.exports = {
  output: 'export',
  images: { unoptimized: true }
}
```

### Scripts de Déploiement
```bash
npm run deploy          # Déploiement complet (tous les environnements)
npm run deploy:vercel    # Déploiement Vercel uniquement
npm run deploy:hostinger # Déploiement Hostinger uniquement
npm run deploy:staging   # Déploiement staging uniquement
```

## 🔑 Étapes de Configuration

### Vercel
1. Connecter le repository GitHub
2. Configurer la branche `main` comme branche de production
3. Vérifier que `vercel.json` est détecté
4. Configurer les variables d'environnement si nécessaire

### Hostinger
1. **Ajouter la clé SSH** dans GitHub → Settings → Deploy Keys
   - Nom: `Hostinger Deploy Key`
   - Clé: (fournie par Hostinger)
   - ✅ Cocher "Allow write access"

2. **Configurer le dépôt sur Hostinger**:
   - Repository: `git@github.com:Lilou2023/lilou-logistique.git`
   - Branche: `hostinger-deploy`
   - Répertoire source: `dist/`
   - Répertoire cible: `public_html/`

3. **Pousser la branche hostinger-deploy**:
   ```bash
   git push origin hostinger-deploy
   ```

## 🏗️ Processus de Build

### Vite Build
- **Commande**: `npm run build`
- **Sortie**: `dist/`
- **Optimisations**: Code splitting, minification, tree shaking

### Fichiers générés
- `dist/index.html` - Page principale
- `dist/assets/` - CSS, JS, images optimisés
- `dist/logo.png` - Logo de l'application
- `dist/manifest.json` - Configuration PWA

## 🔍 Résolution des Problèmes

### Erreurs Vercel communes
1. **Build failed**: Vérifier `vercel.json` et `package.json`
2. **Routes non trouvées**: Vérifier la configuration des rewrites
3. **Assets manquants**: Vérifier le répertoire `outputDirectory`

### Erreurs Hostinger communes
1. **Authentication failed**: Vérifier la clé SSH
2. **Branch not found**: Pousser la branche `hostinger-deploy`
3. **Build failed**: Vérifier la commande de build

## 📊 Monitoring

### Métriques à surveiller
- **Build time**: < 2 minutes
- **Deploy time**: < 1 minute
- **Bundle size**: < 250KB gzipped
- **Performance score**: > 90/100

### Outils de monitoring
- Vercel Analytics
- Lighthouse CI
- Bundle Analyzer
- Performance API

## 🚨 Rollback

En cas de problème:
1. **Vercel**: Utiliser le rollback depuis le dashboard
2. **Hostinger**: Redéployer depuis une version précédente
3. **Emergency**: Pousser un hotfix sur la branche concernée

## 📞 Support

Pour des questions sur la configuration de déploiement:
1. Vérifier ce document
2. Consulter les logs de déploiement
3. Tester localement avec `npm run build`
4. Contacter l'équipe DevOps si nécessaire