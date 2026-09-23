export function useLocalized() {
  const { locale } = useI18n()

  return (value?: { en: string; zh: string } | null) => {
    if (!value) return ''
    return locale.value === 'zh' ? value.zh || value.en : value.en || value.zh
  }
}
