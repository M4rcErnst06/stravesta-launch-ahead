
import { createClient } from '@supabase/supabase-js';

// Supabase setup with public environment variables
// These are safe to expose in the client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
