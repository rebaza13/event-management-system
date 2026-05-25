import type { Database } from '~/types/database.types'
import { createClient } from '@supabase/supabase-js'

let anonClientInstance: any = null

export const useSupabase = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  if (!anonClientInstance) {
    const config = useRuntimeConfig().public.supabase as { url: string, key: string }
    anonClientInstance = createClient<Database>(
      config.url,
      config.key,
      { 
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
        global: {
          headers: {
            Authorization: `Bearer ${config.key}`
          }
        }
      }
    )
  }

  const table = <T extends keyof Database['public']['Tables']>(name: T) => {
    return client.from(name)
  }

  return {
    client,
    anonClient: anonClientInstance,
    user,
    table,
    auth: client.auth
  }
}
