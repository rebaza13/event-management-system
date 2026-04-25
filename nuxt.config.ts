// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  css: ['~/assets/scss/main.scss'],
  app: {
    pageTransition: { name: 'fade-slide', mode: 'out-in' },
    layoutTransition: { name: 'fade-slide', mode: 'out-in' }
  },
  srcDir: 'app',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
})
