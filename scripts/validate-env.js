#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Variables d'environnement requises
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
  'JWT_SECRET',
  'NEXTAUTH_SECRET'
];

// Variables optionnelles mais recommandées
const optionalEnvVars = [
  'NEXTAUTH_URL',
  'NODE_ENV',
  'PORT'
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
  
  // Vérifier la présence du fichier .env.local
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envLocalPath)) {
    log('\n❌ Erreur: Le fichier .env.local n\'existe pas!', 'red');
    log('   Créez-le en copiant .env.example:', 'yellow');
    log('   cp .env.example .env.local\n', 'yellow');
    process.exit(1);
  }
  
  // Vérifier qu'il n'y a pas de fichier .env (sécurité)
  if (fs.existsSync(envPath)) {
    log('\n⚠️  Attention: Un fichier .env existe!', 'yellow');
    log('   Pour des raisons de sécurité, utilisez .env.local à la place.', 'yellow');
    log('   Le fichier .env ne doit pas être commité.\n', 'yellow');
  }
  
  // Charger les variables d'environnement
  require('dotenv').config({ path: envLocalPath });
  
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
  
  // Vérifier la longueur des secrets
  ['JWT_SECRET', 'NEXTAUTH_SECRET'].forEach(secret => {
    if (process.env[secret] && process.env[secret].length < 32) {
      log(`   ⚠️  ${secret} devrait contenir au moins 32 caractères`, 'yellow');
      hasWarnings = true;
    } else if (process.env[secret]) {
      log(`   ✅ ${secret} a une longueur suffisante`, 'green');
    }
  });
  
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
}

// Exécuter la validation
validateEnv();
