import { createClient } from '@supabase/supabase-js';

// Nouvelles clés Supabase (mises à jour le 17/08/2025)
const supabaseUrl = 'https://ocsxrxcphdknfzihejjd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc3hyeGNwaGRrbmZ6aWhlampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk4MjEsImV4cCI6MjA2OTY0NTgyMX0.ZYvmJCUKcsQWrW2tFRfjcUJ29vca5abK7yg8QG3WkCk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);