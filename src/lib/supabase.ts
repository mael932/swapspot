
import { createClient } from '@supabase/supabase-js';

// Safely handle the case when env vars might not be available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file and Supabase connection.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
