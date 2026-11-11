const adminApiOrigin = 'https://cerotdadmin.dancingcodes.cn'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-23',
  app: { pageTransition: { name: 'page', mode: 'out-in' } },
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  ui: { colorMode: false },
  fonts: { providers: { google: false, googleicons: false } },
  runtimeConfig: {
    adminApiOrigin,
    public: { adminApiOrigin, siteUrl: 'https://cerotd.dancingcodes.cn' }
  },
  routeRules: {
    '/api/**': {
      proxy: `${adminApiOrigin}/api/**`
    }
  },
  nitro: {
    devProxy: { '/api': { target: `${adminApiOrigin}/api`, changeOrigin: true } }
  },
  css: ['~/assets/css/main.css'],
  typescript: { strict: true },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' }
    ],
    defaultLocale: 'en', langDir: 'locales', strategy: 'no_prefix',
    detectBrowserLanguage: false, vueI18n: 'i18n.config.ts'
  }
})
