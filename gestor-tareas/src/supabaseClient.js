import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hoqfvfrymaxtlbyrmqqy.supabase.co';
const supabaseAnonKey = 'sb_publishable_oU8pK8j0chVUzNUTj4z65Q_2VuPqFOc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
