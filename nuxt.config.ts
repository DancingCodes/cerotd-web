export default defineNuxtConfig({
  compatibilityDate: '2026-09-23',
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  ui: { colorMode: false },
  fonts: { providers: { google: false, googleicons: false } },
  runtimeConfig: {
    adminApiOrigin: 'http://127.0.0.1:3001',
    public: { adminApiOrigin: 'http://127.0.0.1:3001', siteUrl: 'https://dcodes.top' }
  },
  nitro: {
    devProxy: { '/api': { target: 'http://127.0.0.1:3001/api', changeOrigin: true } },
    prerender: { crawlLinks: true, routes: ['/'] }
  },
  hooks: {
    'prerender:routes': async ({ routes }) => {
      const origin = 'http://127.0.0.1:3001'
      for (const section of ['products', 'news']) {
        const response = await fetch(`${origin}/api/${section}`)
        if (!response.ok) throw new Error(`Cannot read ${section} from admin: HTTP ${response.status}`)
        const result = await response.json()
        if (result.code !== 200 || !Array.isArray(result.data?.items)) {
          throw new Error(`Cannot read ${section} from admin: ${result.msg || result.code}`)
        }
        routes.add(`/${section}`)
        for (const item of result.data.items) routes.add(`/${section}/${item.slug}`)
      }
    }
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
