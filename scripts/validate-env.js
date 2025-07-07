#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Variables d'environnement requises
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'OPENAI_API_KEY'
];

// Variables optionnelles mais recommandées
const optionalEnvVars = [
  'NEXTAUTH_URL',
  'NODE_ENV',
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_APP_VERSION'
];

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateEnv() {
  log('\n🔍 Validation des variables d\'environnement...', 'blue');
  
  // Vérifier si nous sommes dans un environnement CI/CD
  const isCI = process.env.CI || process.env.GITHUB_ACTIONS;
  
  if (!isCI) {
    // Environnement local - vérifier la présence du fichier .env.local
    const envLocalPath = path.join(process.cwd(), '.env.local');
    const envPath = path.join(process.cwd(), '.env');
    
    if (!fs.existsSync(envLocalPath)) {
      log('\n❌ Erreur: Le fichier .env.local n\'existe pas!', 'red');
      log('   Créez-le en copiant .env.example:', 'yellow');
      log('   cp .env.example .env.local\n', 'yellow');
      process.exit(1);
    }
    
    // Charger les variables d'environnement locales
    require('dotenv').config({ path: envLocalPath });
  } else {
    log('   🔧 Environnement CI/CD détecté - utilisation des variables d\'environnement système', 'blue');
  }
  
  let hasErrors = false;
  let hasWarnings = false;
  
  // Vérifier les variables requises
  log('\n📋 Variables requises:', 'blue');
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      log(`   ❌ ${varName} - MANQUANTE`, 'red');
      hasErrors = true;
    } else if (process.env[varName].includes('your-') || process.env[varName].includes('xxx')) {
      log(`   ⚠️  ${varName} - Valeur par défaut détectée`, 'yellow');
      hasWarnings = true;
    } else {
      log(`   ✅ ${varName} - OK`, 'green');
    }
  });
  
  // Vérifier les variables optionnelles
  log('\n📋 Variables optionnelles:', 'blue');
  optionalEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      log(`   ⚠️  ${varName} - Non définie (optionnelle)`, 'yellow');
    } else {
      log(`   ✅ ${varName} - OK`, 'green');
    }
  });
  
  // Validation spécifique
  log('\n🔧 Validations spécifiques:', 'blue');
  
  // Vérifier le format de l'URL Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL.includes('.supabase.co')) {
      log('   ⚠️  NEXT_PUBLIC_SUPABASE_URL ne semble pas être une URL Supabase valide', 'yellow');
      hasWarnings = true;
    } else {
      log('   ✅ URL Supabase valide', 'green');
    }
  }
  
  // Vérifier la clé OpenAI
  if (process.env.OPENAI_API_KEY) {
    if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
      log('   ⚠️  OPENAI_API_KEY ne semble pas être une clé OpenAI valide', 'yellow');
      hasWarnings = true;
    } else {
      log('   ✅ Clé OpenAI valide', 'green');
    }
  }
  
  // Résumé
  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    log('❌ Validation échouée: Des variables requises sont manquantes!', 'red');
    process.exit(1);
  } else if (hasWarnings) {
    log('⚠️  Validation réussie avec des avertissements', 'yellow');
    log('   Vérifiez les valeurs par défaut avant la production!', 'yellow');
  } else {
    log('✅ Validation réussie: Toutes les variables sont correctement configurées!', 'green');
  }
  console.log('='.repeat(50) + '\n');

  // Affichage des valeurs pour debug
  log('📊 Valeurs des variables d\'environnement:', 'blue');
  console.log('App:', process.env.NEXT_PUBLIC_APP_NAME || 'Non définie');
  console.log('Version:', process.env.NEXT_PUBLIC_APP_VERSION || 'Non définie');
  console.log('URL:', process.env.NEXT_PUBLIC_APP_URL || 'Non définie');
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configurée' : '❌ Manquante');
  console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configurée' : '❌ Manquante');
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? '✅ Configurée' : '❌ Manquante');
}

// Exécuter la validation
validateEnv();
