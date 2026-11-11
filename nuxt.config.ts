declare const process: { env: Record<string, string | undefined> }
const apiMode = process.env.CEROTD_BUILD_MODE === 'api'
const adminApiOrigin = 'https://cerotdadmin.dancingcodes.cn'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-23',
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  ui: { colorMode: false },
  fonts: { providers: { google: false, googleicons: false } },
  runtimeConfig: {
    adminApiOrigin,
    public: { adminApiOrigin, siteUrl: 'https://cerotd.dancingcodes.cn' }
  },
  routeRules: apiMode ? { '/api/**': { proxy: `${adminApiOrigin}/api/**` } } : {},
  nitro: {
    devProxy: { '/api': { target: `${adminApiOrigin}/api`, changeOrigin: true } },
    ...(apiMode ? {} : { prerender: { crawlLinks: true, routes: ['/'] } })
  },
  hooks: apiMode ? {} : {
    'prerender:routes': async ({ routes }) => {
      const origin = adminApiOrigin
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
