export default defineNuxtPlugin({
  name: 'locale-preference',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    const locale = useCookie('cerotd_locale').value
    if (locale === 'zh') {
      await nuxtApp.$i18n.setLocale('zh')
    }
  }
})
