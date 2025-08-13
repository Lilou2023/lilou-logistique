// Script de test pour vérifier la connexion Supabase
// avec les nouvelles credentials

const { createClient } = require('@supabase/supabase-js');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ocsxrxcphdknfzihejjd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk4MjEsImV4cCI6MjA2OTY0NTgyMX0.ZYvmJCUKcsQWrW2tFRfjcUJ29vca5abK7yg8QG3WkCk';

console.log('🔍 Test de connexion Supabase...\n');
console.log('📊 Configuration:');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Ref: ocsxrxcphdknfzihejjd`);
console.log('');

// Créer le client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        // Test 1: Vérifier la connexion de base
        console.log('✅ Client Supabase créé avec succès');
        
        // Test 2: Tester une requête simple
        console.log('\n🔄 Test de requête à la base de données...');
        const { data, error } = await supabase
            .from('_test_connection')
            .select('*')
            .limit(1);
        
        if (error && error.code !== 'PGRST116') {
            // PGRST116 = table n'existe pas, ce qui est normal pour un test
            throw error;
        }
        
        console.log('✅ Connexion à la base de données réussie');
        
        // Test 3: Vérifier l'authentification anonyme
        console.log('\n🔄 Test d\'authentification anonyme...');
        const { data: session, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
            throw authError;
        }
        
        console.log('✅ Authentification anonyme fonctionnelle');
        
        // Résumé
        console.log('\n🎉 SUCCÈS - Toutes les connexions fonctionnent correctement!');
        console.log('\n📋 Prochaines étapes:');
        console.log('   1. Mettre à jour les variables sur Vercel');
        console.log('   2. Migrer les données si nécessaire');
        console.log('   3. Tester l\'application complète');
        
    } catch (error) {
        console.error('\n❌ ERREUR:', error.message);
        console.error('\nDétails:', error);
        
        console.log('\n🔧 Solutions possibles:');
        console.log('   - Vérifier que les clés sont correctes');
        console.log('   - Vérifier les paramètres de sécurité Supabase');
        console.log('   - Vérifier la configuration réseau');
    }
}

// Exécuter le test
testConnection();