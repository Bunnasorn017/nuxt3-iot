export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon'],

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

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET
  },

  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Adjust the port if your backend server is running on a different port
    },
    router: {
      base: '/api' 
    },
  },

  router: {
    middleware: ['auth']
  },

  compatibilityDate: '2024-10-12',

  icon: {
    componentName: 'NuxtIcon'
  }
})