# 📚 Guide des Bonnes Pratiques - Workflows GitHub Actions

## 🎯 Vue d'ensemble

Ce guide compile les bonnes pratiques essentielles pour développer et maintenir des workflows GitHub Actions robustes et sécurisés.

---

## 🔍 1. Vérification des Versions d'Actions

### ❌ Erreurs Courantes
```yaml
# MAUVAIS: Utiliser des versions supposées
- uses: actions/checkout@v5      # Peut ne pas exister
- uses: actions/setup-node@v6    # Version future non confirmée
```

### ✅ Bonnes Pratiques
```yaml
# BON: Vérifier la disponibilité avant utilisation
- uses: actions/checkout@v4      # Version stable confirmée
- uses: actions/setup-node@v4    # Version testée et disponible
```

### 🛠️ Comment Vérifier
1. **GitHub Marketplace** : https://github.com/marketplace/actions/
2. **Repository de l'action** : Vérifier les tags/releases
3. **Workflow automatisé** : Utiliser `action-version-check.yml`

```bash
# Vérification manuelle via API
curl -s "https://api.github.com/repos/actions/checkout/releases/latest"
```

---

## 📝 2. Validation YAML Automatisée

### 🛠️ Outils Recommandés

#### yamllint
```yaml
# Configuration .yamllint.yml
extends: default
rules:
  line-length:
    max: 120
  indentation:
    spaces: 2
  truthy:
    allowed-values: ['true', 'false', 'on', 'off']
```

#### actionlint
```bash
# Installation
bash <(curl https://raw.githubusercontent.com/rhymond/actionlint/main/scripts/download-actionlint.bash)

# Utilisation
actionlint .github/workflows/*.yml
```

### 🔄 Intégration Continue
```yaml
# Dans votre workflow de validation
- name: Validate YAML
  run: |
    yamllint .github/workflows/
    actionlint .github/workflows/*.yml
```

---

## 🧪 3. Tests de Workflows

### 📋 Stratégie de Test

#### A. Tests Locaux
```bash
# Validation syntaxe
yamllint .github/workflows/main.yml

# Test spécifique
actionlint .github/workflows/main.yml
```

#### B. Tests sur Branches
```yaml
# Déclencher sur toutes les branches pour test
on:
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main ]
```

#### C. Tests Manuels
```yaml
# workflow_dispatch pour tests à la demande
on:
  workflow_dispatch:
    inputs:
      test_mode:
        description: 'Mode de test'
        required: true
        default: 'dry-run'
        type: choice
        options:
        - dry-run
        - full-test
```

### 🔄 Workflow de Test Automatisé
Utiliser `workflow-testing.yml` pour :
- ✅ Validation syntaxe
- ✅ Vérification des versions d'actions
- ✅ Tests de sécurité
- ✅ Tests d'intégration

---

## 🔒 4. Sécurité des Workflows

### 🔐 Gestion des Secrets
```yaml
# BON: Utiliser les secrets GitHub
env:
  API_TOKEN: ${{ secrets.API_TOKEN }}

# MAUVAIS: Secrets hardcodés
env:
  API_TOKEN: "ghp_xxxxxxxxxxxx"  # ❌ JAMAIS FAIRE ÇA
```

### 🛡️ Permissions Minimales
```yaml
# Définir des permissions explicites
permissions:
  contents: read
  actions: read
  security-events: write
```

### 🔍 Actions Tierces
```yaml
# Vérifier les actions tierces
- uses: third-party/action@v1
  # ⚠️ Vérifier la sécurité et la maintenance
```

---

## 📏 5. Standards de Code

### 🎨 Formatage YAML
```yaml
# Indentation: 2 espaces (pas de tabulations)
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4
```

### 📝 Nommage
```yaml
# Noms descriptifs et cohérents
jobs:
  validate-code:           # ✅ Descriptif
    name: 🔍 Code Validation
  
  test:                    # ❌ Trop générique
    name: Run Tests
```

### 📐 Longueur des Lignes
```yaml
# Maximum 120 caractères
- name: Very long command that should be split
  run: |
    echo "Utiliser le style block scalar"
    echo "pour les commandes longues"
```

---

## ⚡ 6. Optimisation des Performances

### 🚀 Cache Intelligent
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'                    # ✅ Cache automatique
    cache-dependency-path: package-lock.json
```

### 🔄 Parallélisation
```yaml
# Jobs parallèles pour les tâches indépendantes
jobs:
  test:
    # Tests unitaires
  lint:
    # Linting
  security:
    # Scan sécurité
  
  deploy:
    needs: [test, lint, security]   # Attendre tous les précédents
```

### 📦 Artefacts Optimisés
```yaml
- name: Upload artifacts
  uses: actions/upload-artifact@v4
  with:
    name: build-${{ github.run_number }}  # ✅ Nom unique
    path: dist/
    retention-days: 7                     # ✅ Nettoyage automatique
```

---

## 🛠️ 7. Gestion d'Erreurs

### 🔄 Continue on Error
```yaml
# Utiliser avec parcimonie
- name: Optional step
  run: npm run optional-task
  continue-on-error: true           # ✅ Pour les étapes non critiques
```

### 🔧 Fallbacks
```yaml
- name: Build with fallback
  run: |
    if npm run build; then
      echo "✅ Build réussi"
    else
      echo "❌ Build échoué, création fallback"
      mkdir -p dist
      echo "<html>Fallback</html>" > dist/index.html
    fi
```

### 📊 Monitoring
```yaml
- name: Report status
  if: always()
  run: |
    echo "Job status: ${{ job.status }}"
    echo "Needs status: ${{ toJson(needs) }}"
```

---

## 📋 8. Checklist Pre-Commit

Avant chaque modification de workflow :

### ✅ Validation Technique
- [ ] Syntaxe YAML validée avec `yamllint`
- [ ] Workflow validé avec `actionlint`
- [ ] Versions d'actions vérifiées sur GitHub Marketplace
- [ ] Tests exécutés en mode `workflow_dispatch`

### ✅ Sécurité
- [ ] Aucun secret hardcodé
- [ ] Permissions minimales définies
- [ ] Actions tierces vérifiées

### ✅ Performance
- [ ] Cache configuré pour les dépendances
- [ ] Jobs parallélisés quand possible
- [ ] Artefacts avec rétention appropriée

### ✅ Maintenance
- [ ] Noms descriptifs et cohérents
- [ ] Documentation mise à jour
- [ ] Commentaires pour la logique complexe

---

## 🔧 9. Outils et Workflows Fournis

### 📦 Workflows Disponibles
1. **`action-version-check.yml`** - Vérification automatique des versions
2. **`yaml-validation.yml`** - Validation YAML et linting
3. **`workflow-testing.yml`** - Tests complets des workflows

### 🚀 Utilisation
```bash
# Déclencher manuellement
gh workflow run "Action Version Checker"
gh workflow run "YAML Validation & Linting"
gh workflow run "Workflow Testing & Validation"
```

### 📊 Rapports
Tous les workflows génèrent des rapports détaillés disponibles dans les artefacts.

---

## 💡 10. Ressources et Références

### 📚 Documentation Officielle
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Security Best Practices](https://docs.github.com/en/actions/security-guides)

### 🛠️ Outils Externes
- [yamllint](https://yamllint.readthedocs.io/)
- [actionlint](https://github.com/rhymond/actionlint)
- [GitHub CLI](https://cli.github.com/)

### 🌐 Communauté
- [GitHub Actions Marketplace](https://github.com/marketplace/actions/)
- [Awesome Actions](https://github.com/sdras/awesome-actions)

---

## 🎯 Conclusion

Ces bonnes pratiques garantissent :
- ✅ **Fiabilité** : Workflows stables et prévisibles
- ✅ **Sécurité** : Protection contre les vulnérabilités
- ✅ **Performance** : Exécution optimisée
- ✅ **Maintenabilité** : Code lisible et évolutif

**Rappel Important** : Toujours tester les modifications sur une branche avant le merge vers `main` !

---

*Guide maintenu par l'équipe DevOps - Dernière mise à jour : $(date -u +"%Y-%m-%d")*