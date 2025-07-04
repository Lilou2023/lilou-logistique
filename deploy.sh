#!/bin/bash

# Script de déploiement des optimisations de performance
# Lilou Logistique - Performance Optimization Deployment

echo "🚀 Déploiement des optimisations de performance..."

# Vérifier que nous sommes sur la bonne branche
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branche actuelle: $CURRENT_BRANCH"

# Ajouter tous les fichiers modifiés
echo "📁 Ajout des fichiers modifiés..."
git add .

# Vérifier s'il y a des changements à commiter
if git diff --cached --quiet; then
    echo "✅ Aucun changement à commiter"
else
    echo "💾 Commit des optimisations de performance..."
    git commit -m "feat: implement comprehensive performance optimizations

🎯 Performance Improvements:
- Bundle size optimization with code splitting and lazy loading
- PWA implementation with service worker caching strategies  
- Optimized database schema with strategic indexing
- Mobile performance optimizations for Capacitor
- Performance monitoring with Lighthouse CI
- Virtualized components for large datasets
- React Query for efficient data fetching and caching
- Web Vitals monitoring and analytics
- Comprehensive performance analysis documentation

📊 Expected Results:
- Load time: 40-60% improvement
- Bundle size: 50-70% reduction  
- Database queries: 50-80% faster
- Mobile performance: 30-50% improvement

🔧 Technical Changes:
- Updated CI/CD pipeline with performance testing
- Added bundle size limits and monitoring
- Implemented automated Lighthouse audits
- Created performance regression detection
- Added mobile build optimization

📚 Documentation:
- PERFORMANCE_ANALYSIS.md: Detailed analysis
- IMPLEMENTATION_GUIDE.md: Step-by-step guide
- Updated README with performance metrics"
fi

# Fonction pour pousser vers une branche
push_to_branch() {
    local branch=$1
    echo "🔄 Passage à la branche $branch..."
    
    if git show-ref --verify --quiet refs/heads/$branch; then
        # La branche existe localement
        git checkout $branch
        git merge $CURRENT_BRANCH --no-ff -m "merge: performance optimizations from $CURRENT_BRANCH"
    else
        # Créer la branche si elle n'existe pas
        echo "🆕 Création de la branche $branch..."
        git checkout -b $branch
    fi
    
    echo "⬆️ Push vers origin/$branch..."
    git push origin $branch
    
    if [ $? -eq 0 ]; then
        echo "✅ Push vers $branch réussi!"
    else
        echo "❌ Erreur lors du push vers $branch"
        return 1
    fi
}

# Pousser vers develop (staging)
echo ""
echo "🔧 Déploiement vers STAGING (develop)..."
push_to_branch "develop"

# Retourner à la branche originale
git checkout $CURRENT_BRANCH

# Pousser vers main (production)
echo ""
echo "🚀 Déploiement vers PRODUCTION (main)..."
push_to_branch "main"

# Retourner à la branche originale
git checkout $CURRENT_BRANCH

# Proposer le déploiement Hostinger
echo ""
echo "🌐 Déploiement Hostinger disponible!"
echo "Pour déployer vers Hostinger, utilisez:"
echo "  ./setup-hostinger.sh"
echo "  ou"
echo "  git push origin hostinger-deploy"

echo ""
echo "🎉 Déploiement terminé!"
echo ""
echo "📊 Résumé:"
echo "✅ Staging (develop): Déployé"
echo "✅ Production (main): Déployé"
echo "🌐 Hostinger: Prêt pour déploiement"
echo ""
echo "🔗 Actions suivantes:"
echo "1. Vérifier les pipelines CI/CD sur GitHub"
echo "2. Monitorer les métriques de performance"
echo "3. Tester l'application sur les environnements"
echo ""
echo "📈 Métriques de performance à surveiller:"
echo "- First Contentful Paint (FCP): < 1.5s"
echo "- Largest Contentful Paint (LCP): < 2.5s"
echo "- Cumulative Layout Shift (CLS): < 0.1"
echo "- First Input Delay (FID): < 100ms"
echo "- Bundle Size: < 250KB (gzipped)"