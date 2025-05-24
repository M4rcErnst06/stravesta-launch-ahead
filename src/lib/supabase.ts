
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dgdrllvplplypfvzdcjx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZHJsbHZwbHBseXBmdnpkY2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3Njg0MzcsImV4cCI6MjA2MzM0NDQzN30.1UCRX9Wikro-aAC0PD7bdxCEvwxEsfXVl_zMZ2YXlg8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
