export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: {
      welcome: '欢迎',
      about: {
        title: '关于我们'
      }
    },
    en: {
      welcome: 'Welcome',
      about: {
        title: 'About Us'
      }
    }
  }
}))
