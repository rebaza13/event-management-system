import type { Database } from '~/types/database.types'

// Keep your custom User wrapper if you are extending the Auth User, 
// or you could import `User` directly from '@supabase/supabase-js'
export interface User {
  id: string;
  email: string;
  full_name?: string; // Kept for backward compatibility with login.vue
  phone?: string | null;
  created_at?: string;
  updated_at?: string;
  raw_user_meta_data?: {
    email_verified?: boolean;
    [key: string]: any;
  };
}

// 🪄 MAGIC HAPPENS HERE: 
// We are literally pulling the EXACT types your database expects directly from your generated file!
export type Event = Database['public']['Tables']['events']['Row']
export type EventCreate = Database['public']['Tables']['events']['Insert']
export type EventUpdate = Database['public']['Tables']['events']['Update']
