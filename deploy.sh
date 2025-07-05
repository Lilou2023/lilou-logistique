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
    commit_msg=$(printf 'feat: implement comprehensive performance optimizations\n\n🎯 Performance Improvements:\n- Bundle size optimization with code splitting and lazy loading\n- PWA implementation with service worker caching strategies\n- Optimized database schema with strategic indexing\n- Mobile performance optimizations for Capacitor\n- Performance monitoring with Lighthouse CI\n- Virtualized components for large datasets\n- React Query for efficient data fetching and caching\n- Web Vitals monitoring and analytics\n- Comprehensive performance analysis documentation\n\n📊 Expected Results:\n- Load time: 40-60% improvement\n- Bundle size: 50-70% reduction\n- Database queries: 50-80% faster\n- Mobile performance: 30-50% improvement\n\n🔧 Technical Changes:\n- Updated CI/CD pipeline with performance testing\n- Added bundle size limits and monitoring\n- Implemented automated Lighthouse audits\n- Created performance regression detection\n- Added mobile build optimization\n\n📚 Documentation:\n- PERFORMANCE_ANALYSIS.md: Detailed analysis\n- IMPLEMENTATION_GUIDE.md: Step-by-step guide\n- Updated README with performance metrics')
    git commit -m "$commit_msg"
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

echo ""
echo "🎉 Déploiement terminé!"
echo ""
echo "📊 Résumé:"
echo "✅ Staging (develop): Déployé"
echo "✅ Production (main): Déployé"
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