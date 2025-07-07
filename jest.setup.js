// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock des variables d'environnement pour les tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.NEXTAUTH_URL = 'http://localhost:3000'
process.env.NEXTAUTH_SECRET = 'test-secret-key-for-testing-only'

// Valeurs par defaut de l'application pour les tests
process.env.NEXT_PUBLIC_APP_NAME = 'Lilou Logistique DSP'
process.env.NEXT_PUBLIC_APP_VERSION = '1.0.0'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost'
