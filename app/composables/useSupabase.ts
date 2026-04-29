import type { Database } from '~/types/database.types'

export const useSupabase = () => {
  // 1. Initialize the client with strict typing
  const client = useSupabaseClient<Database>()

  // 2. Get the current user (reactive)
  const user = useSupabaseUser()

  // 3. Helper for common tables to get strict autocomplete
  const table = <T extends keyof Database['public']['Tables']>(name: T) => {
    return client.from(name)
  }

  return {
    client,
    user,
    table,
    auth: client.auth
  }
}
