#!/usr/bin/env node

/**
 * Script de test automatisé des fonctionnalités
 * Lilou Logistique v5.1
 */

const https = require('https');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const SITE_URL = 'https://www.lilou-logistique.com';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ocsxrxcphdknfzihejjd.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk4MjEsImV4cCI6MjA2OTY0NTgyMX0.ZYvmJCUKcsQWrW2tFRfjcUJ29vca5abK7yg8QG3WkCk';

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Utilitaires
const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  test: (msg) => console.log(`${colors.cyan}🧪 ${msg}${colors.reset}`)
};

// Tests
const tests = {
  // Test 1: Accessibilité du site
  async testSiteAccessibility() {
    log.test('Test d\'accessibilité du site...');
    
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      https.get(SITE_URL, (res) => {
        const responseTime = Date.now() - startTime;
        
        if (res.statusCode === 200) {
          log.success(`Site accessible (${res.statusCode})`);
          log.info(`Temps de réponse: ${responseTime}ms`);
          
          if (responseTime < 3000) {
            log.success('Performance acceptable (< 3s)');
          } else {
            log.warning('Performance lente (> 3s)');
          }
          
          resolve(true);
        } else {
          log.error(`Erreur HTTP: ${res.statusCode}`);
          resolve(false);
        }
      }).on('error', (err) => {
        log.error(`Erreur de connexion: ${err.message}`);
        resolve(false);
      });
    });
  },

  // Test 2: Certificat SSL
  async testSSLCertificate() {
    log.test('Test du certificat SSL...');
    
    return new Promise((resolve) => {
      https.get(SITE_URL, (res) => {
        const cert = res.socket.getPeerCertificate();
        
        if (cert && cert.subject) {
          log.success('Certificat SSL valide');
          log.info(`Émis pour: ${cert.subject.CN || cert.subject.O}`);
          log.info(`Valide jusqu\'au: ${cert.valid_to}`);
          resolve(true);
        } else {
          log.error('Certificat SSL non trouvé');
          resolve(false);
        }
      }).on('error', (err) => {
        log.error(`Erreur SSL: ${err.message}`);
        resolve(false);
      });
    });
  },

  // Test 3: Connexion Supabase
  async testSupabaseConnection() {
    log.test('Test de connexion Supabase...');
    
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      log.success('Client Supabase créé');
      
      // Test de requête simple
      const { error } = await supabase
        .from('_test')
        .select('*')
        .limit(1);
      
      if (!error || error.code === 'PGRST116') {
        log.success('Connexion à la base de données réussie');
        return true;
      } else {
        log.error(`Erreur Supabase: ${error.message}`);
        return false;
      }
    } catch (err) {
      log.error(`Erreur de connexion: ${err.message}`);
      return false;
    }
  },

  // Test 4: Vérification du contenu
  async testPageContent() {
    log.test('Test du contenu de la page...');
    
    return new Promise((resolve) => {
      https.get(SITE_URL, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const checks = [
            { text: 'Lilou Logistique', desc: 'Titre principal' },
            { text: '99.5%', desc: 'Perfect Handover Rate' },
            { text: '95%', desc: 'Précision IA' },
            { text: 'Intelligence Artificielle', desc: 'Section IA' },
            { text: 'Architecture Technique', desc: 'Section technique' }
          ];
          
          let allPassed = true;
          
          checks.forEach(check => {
            if (data.includes(check.text)) {
              log.success(`${check.desc} trouvé`);
            } else {
              log.error(`${check.desc} non trouvé`);
              allPassed = false;
            }
          });
          
          resolve(allPassed);
        });
      }).on('error', (err) => {
        log.error(`Erreur de lecture: ${err.message}`);
        resolve(false);
      });
    });
  },

  // Test 5: Headers de sécurité
  async testSecurityHeaders() {
    log.test('Test des headers de sécurité...');
    
    return new Promise((resolve) => {
      https.get(SITE_URL, (res) => {
        const headers = res.headers;
        
        // Headers de sécurité recommandés
        const securityHeaders = {
          'strict-transport-security': 'HSTS',
          'x-content-type-options': 'X-Content-Type-Options',
          'x-frame-options': 'X-Frame-Options',
          'content-security-policy': 'CSP'
        };
        
        let score = 0;
        const total = Object.keys(securityHeaders).length;
        
        for (const [header, name] of Object.entries(securityHeaders)) {
          if (headers[header]) {
            log.success(`${name} présent`);
            score++;
          } else {
            log.warning(`${name} manquant`);
          }
        }
        
        log.info(`Score de sécurité: ${score}/${total}`);
        resolve(score >= total / 2);
      }).on('error', (err) => {
        log.error(`Erreur: ${err.message}`);
        resolve(false);
      });
    });
  }
};

// Fonction principale
async function runTests() {
  console.log('');
  console.log('🚀 Lilou Logistique - Test des Fonctionnalités');
  console.log('='.repeat(50));
  console.log('');
  
  const results = {
    passed: 0,
    failed: 0,
    total: 0
  };
  
  // Exécuter tous les tests
  for (const [name, test] of Object.entries(tests)) {
    console.log('');
    const passed = await test();
    results.total++;
    
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pause entre les tests
  }
  
  // Résumé
  console.log('');
  console.log('='.repeat(50));
  console.log('📊 RÉSUMÉ DES TESTS');
  console.log('='.repeat(50));
  console.log(`Total: ${results.total}`);
  console.log(`${colors.green}Réussis: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}Échoués: ${results.failed}${colors.reset}`);
  console.log('');
  
  if (results.failed === 0) {
    log.success('🎉 Tous les tests sont passés avec succès!');
  } else {
    log.warning('⚠️  Certains tests ont échoué. Vérifiez les détails ci-dessus.');
  }
  
  console.log('');
  console.log('📝 Pour plus de détails, consultez:');
  console.log('   - TEST-FONCTIONNALITES-GUIDE.md');
  console.log('   - Les logs Vercel: https://vercel.com/lilou-lo/lilou-logistique/logs');
  console.log('');
}

// Exécuter les tests
runTests().catch(err => {
  log.error(`Erreur fatale: ${err.message}`);
  process.exit(1);
});