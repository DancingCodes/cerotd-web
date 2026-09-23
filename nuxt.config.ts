export default defineNuxtConfig({
  compatibilityDate: '2026-09-23',
  modules: ['@nuxtjs/i18n', '@vueuse/motion/nuxt', 'nitro-cloudflare-dev'],
  runtimeConfig: {
    adminApiToken: ''
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
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
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
    detectBrowserLanguage: false,
    vueI18n: 'i18n.config.ts'
  }
})
