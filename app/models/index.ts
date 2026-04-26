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
