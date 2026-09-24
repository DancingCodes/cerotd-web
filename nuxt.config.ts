export default defineNuxtConfig({
  compatibilityDate: '2026-09-23',
  modules: ['@nuxtjs/i18n', '@vueuse/motion/nuxt', 'nitro-cloudflare-dev'],
  runtimeConfig: {
    adminApiToken: '',
    public: {
      // Leave empty to auto-detect from request host.
      // Later set NUXT_PUBLIC_SITE_URL=https://your-domain.com
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || ''
    }
  },
  routeRules: {
    '/admin/**': { ssr: false }
  },
  css: ['modern-normalize/modern-normalize.css', '~/assets/styles/main.scss', '~/assets/styles/common.scss'],
  typescript: {
    typeCheck: false,
    strict: true
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Cerotd | Shandong Lubrication Technology',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Cerotd (Shandong) Lubrication Technology Co., Ltd. — lubricants and greases manufacturer' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'cerotd_locale',
      redirectOn: 'all',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
    vueI18n: 'i18n.config.ts'
  }
})
