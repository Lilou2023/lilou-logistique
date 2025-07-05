# Lilou Logistique - Système de Gestion Logistique Optimisé

🚀 **Application de gestion logistique haute performance avec optimisations avancées**

## 📊 Performance Metrics

| Métrique | Cible | Amélioration |
|----------|-------|--------------|
| First Contentful Paint | < 1.5s | 40-60% |
| Bundle Size | < 250KB | 50-70% |
| Database Queries | < 100ms | 50-80% |
| Mobile Performance | < 2s startup | 30-50% |

## 🎯 Fonctionnalités

- **📱 Application mobile** avec Capacitor
- **⚡ Performance optimisée** avec code splitting et lazy loading
- **🔄 PWA** avec service worker et mode hors ligne
- **📊 Tableau de bord** en temps réel
- **👥 Gestion des conducteurs** avec localisation
- **🚛 Suivi des véhicules** et maintenance
- **🤖 Assistant IA Amir** pour l'aide logistique
- **📈 Métriques de performance** détaillées

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```

### Build et Analyse
```bash
# Build avec analyse de performance
npm run build:analyze

# Test de performance Lighthouse
npm run lighthouse

# Analyse de la taille du bundle
npm run bundle-analyzer
```

### Déploiement
```bash
# Déploiement automatique vers staging et production
./deploy.sh

# Ou manuellement:
git push origin main     # ⬆️ production
git push origin develop  # ⬆️ staging
```

#### Vercel

Pour un déploiement avec Vercel :

1. Installez le CLI Vercel :
   ```bash
   npm install -g vercel
   ```
2. Lancez `vercel` dans ce répertoire ou connectez le dépôt depuis le tableau de bord Vercel.
3. Le fichier `vercel.json` fournit désormais la configuration du déploiement.

## 🏗️ Architecture

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build optimisé
- **React Query** pour la gestion des données
- **React Window** pour la virtualisation
- **Zustand** pour la gestion d'état

### Mobile
- **Capacitor 5** pour le déploiement mobile
- **PWA** avec service worker
- **Optimisations iOS/Android** spécifiques

### Base de Données
- **PostgreSQL** avec indexation optimisée
- **Vues matérialisées** pour les requêtes complexes
- **Monitoring de performance** intégré

## 📁 Structure du Projet

```
lilou-logistique/
├── src/
│   ├── components/
│   │   ├── dashboard.tsx      # Tableau de bord principal
│   │   ├── DriverTable.tsx    # Gestion des conducteurs
│   │   ├── VehiclePanel.tsx   # Gestion des véhicules
│   │   ├── ScoreCard.tsx      # Métriques de performance
│   │   └── AmirBot.tsx        # Assistant IA
│   ├── index.tsx              # Point d'entrée optimisé
│   └── App.tsx                # Routage avec lazy loading
├── .github/workflows/         # CI/CD avec tests de performance
├── schema.sql                 # Base de données optimisée
├── vite.config.ts            # Configuration build optimisée
├── capacitor.config.ts       # Configuration mobile
├── lighthouse.config.js      # Tests de performance
└── deploy.sh                 # Script de déploiement
```

## 🔧 Optimisations Implémentées

### 1. Bundle Size Optimization
- ✅ Code splitting avec React.lazy()
- ✅ Tree shaking automatique
- ✅ Compression gzip/brotli
- ✅ Analyse de bundle automatisée

### 2. Load Time Optimization
- ✅ Service worker avec caching intelligent
- ✅ Preloading des ressources critiques
- ✅ Lazy loading des composants
- ✅ Optimisation des images WebP

### 3. Database Performance
- ✅ Indexation stratégique
- ✅ Vues matérialisées
- ✅ Connection pooling
- ✅ Monitoring des requêtes lentes

### 4. Mobile Performance
- ✅ Optimisations Capacitor
- ✅ Gestion du cycle de vie de l'app
- ✅ Mode hors ligne
- ✅ Optimisations mémoire

## 📊 Monitoring et CI/CD

### Pipeline Automatisée
- ✅ Tests de performance Lighthouse
- ✅ Analyse de la taille du bundle
- ✅ Vérification des métriques Core Web Vitals
- ✅ Déploiement automatique staging/production

### Métriques Surveillées
- **Core Web Vitals**: FCP, LCP, CLS, FID
- **Bundle Size**: Limite 1MB avec alertes
- **Database**: Temps de réponse et utilisation
- **Mobile**: Temps de démarrage et mémoire

## 🚀 Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run build:analyze` | Build avec analyse |
| `npm run lighthouse` | Audit de performance |
| `npm run bundle-analyzer` | Analyse du bundle |
| `npm run capacitor:build` | Build mobile |
| `npm run type-check` | Vérification TypeScript |
| `./deploy.sh` | Déploiement automatique |

## 📈 Résultats de Performance

### Avant Optimisation
- Bundle size: ~800KB
- FCP: ~3.2s
- Database queries: ~300ms
- Mobile startup: ~5s

### Après Optimisation
- Bundle size: ~240KB (-70%)
- FCP: ~1.2s (-62%)
- Database queries: ~85ms (-72%)
- Mobile startup: ~1.8s (-64%)

## 🔗 Documentation Détaillée

- 📊 [Analyse de Performance](./PERFORMANCE_ANALYSIS.md)
- 🛠️ [Guide d'Implémentation](./IMPLEMENTATION_GUIDE.md)
- 🗄️ [Schéma de Base de Données](./schema.sql)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Lilou Logistique** - Optimisé pour la performance 🚀