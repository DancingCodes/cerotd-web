type SeoValue = string | null | undefined

function resolveValue(value: SeoValue | Ref<SeoValue> | ComputedRef<SeoValue>) {
  return computed(() => {
    const raw = unref(value)
    return (raw || '').trim()
  })
}

export function useSiteUrl() {
  const config = useRuntimeConfig()
  const requestUrl = useRequestURL()
  const configured = String(config.public.siteUrl || '').replace(/\/$/, '')
  if (configured) return configured
  return `${requestUrl.protocol}//${requestUrl.host}`
}

export function usePageSeo(options: {
  title: SeoValue | Ref<SeoValue> | ComputedRef<SeoValue>
  description: SeoValue | Ref<SeoValue> | ComputedRef<SeoValue>
  path?: string
  image?: SeoValue | Ref<SeoValue> | ComputedRef<SeoValue>
  noindex?: boolean
}) {
  const siteUrl = useSiteUrl()
  const route = useRoute()
  const title = resolveValue(options.title)
  const description = resolveValue(options.description)
  const image = resolveValue(options.image)
  const path = options.path || route.path
  const canonical = computed(() => `${siteUrl}${path === '/' ? '' : path}`)
  const absoluteImage = computed(() => {
    const value = image.value
    if (!value) return `${siteUrl}/logo.png`
    if (value.startsWith('http://') || value.startsWith('https://')) return value
    return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
  })

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogType: 'website',
    ogUrl: () => canonical.value,
    ogImage: () => absoluteImage.value,
    twitterCard: 'summary_large_image',
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterImage: () => absoluteImage.value,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow'
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: () => canonical.value
      }
    ]
  })
}
