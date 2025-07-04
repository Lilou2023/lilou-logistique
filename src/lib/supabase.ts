import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (!supabaseUrl.startsWith('http') || !supabaseAnonKey.startsWith('eyJ')) {
  console.warn(
    '⚠️ Variables d\'environnement Supabase manquantes.\n' +
    'Veuillez configurer REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY\n' +
    'dans votre fichier .env pour activer l\'authentification.'
  );
}

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configuration de l'authentification
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types pour les tables de base de données
export interface Driver {
  id: string;
  created_at: string;
  email: string;
  name: string;
  phone: string;
  license_number: string;
  status: 'active' | 'inactive' | 'suspended';
  vehicle_id?: string;
}

export interface Vehicle {
  id: string;
  created_at: string;
  registration: string;
  model: string;
  brand: string;
  year: number;
  status: 'available' | 'in_use' | 'maintenance';
  driver_id?: string;
}

export interface Delivery {
  id: string;
  created_at: string;
  pickup_address: string;
  delivery_address: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  driver_id?: string;
  vehicle_id?: string;
  scheduled_at: string;
  completed_at?: string;
}