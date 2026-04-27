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

export interface Event {
  id: number;
  title: string;
  created_at?: string;
  description?: string;
  location?: string;
  start_at?: string;
  end_at?: string;
  status?: string;
  organizer_id?: string | number;
  category?: string;
  capacity?: number;
}

export interface EventCreate extends Omit<Event, 'id' | 'created_at'> {}
