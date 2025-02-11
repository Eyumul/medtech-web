// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon', '@vee-validate/nuxt', '@nuxtjs/supabase'
  ],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  devServer: {
    maxPayload: 50 * 1024 * 1024, // 50MB for local development
  },
  server: {
    maxPayload: 50 * 1024 * 1024, // 50MB for production (Nitro server)
  }
})
