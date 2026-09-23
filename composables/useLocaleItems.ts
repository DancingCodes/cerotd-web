export function useLocaleItems<T extends Record<string, unknown> = Record<string, unknown>>(
  path: string,
  fields: string[]
) {
  const { t, tm, locale } = useI18n()

  return computed(() => {
    locale.value
    const raw = tm(path)
    const keys = raw && typeof raw === 'object' && !Array.isArray(raw)
      ? Object.keys(raw as Record<string, unknown>)
      : []

    return keys.map((key) => {
      const item: Record<string, unknown> = {}
      for (const field of fields) {
        const fieldPath = `${path}.${key}.${field}`
        const fieldRaw = tm(fieldPath)

        if (Array.isArray(fieldRaw) || (fieldRaw && typeof fieldRaw === 'object' && !('type' in (fieldRaw as object)))) {
          const child = fieldRaw as Record<string, unknown> | unknown[]
          if (Array.isArray(child)) {
            item[field] = child.map((_, index) => t(`${fieldPath}.${index}`))
          } else {
            item[field] = Object.keys(child).map((childKey) => t(`${fieldPath}.${childKey}`))
          }
        } else {
          item[field] = t(fieldPath)
        }
      }
      return item as T
    })
  })
}
