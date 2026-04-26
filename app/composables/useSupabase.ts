import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { useRuntimeConfig, useRequestEvent } from '#app'
import { parseCookies, setCookie } from 'h3'

export function useSupabase() {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const key = config.public.supabaseKey as string

  // Browser Client
  if (import.meta.client) {
    return createBrowserClient(url, key)
  }

  // Server Client
  const event = useRequestEvent()
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        if (!event) return []
        const storedCookies = parseCookies(event)
        return Object.entries(storedCookies).map(([name, value]) => ({ name, value }))
      },
      setAll(cookiesToSet) {
        if (!event) return
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(event, name, value, options)
        })
      }
    }
  })
}
