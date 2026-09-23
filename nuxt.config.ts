export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxtjs/i18n'],
  css: ['modern-normalize/modern-normalize.css', '~/assets/styles/main.scss', '~/assets/styles/common.scss'],
  typescript: {
    typeCheck: false,
    strict: true
  },
  app: {
    head: {
      title: '赛罗特 Cerotd',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '赛罗特（山东）润滑科技有限公司' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  },
  i18n: {
    locales: [
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'zh',
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  }
})
