<template>
  <div v-if="product" class="pb-[calc(70px+env(safe-area-inset-bottom))] md:pb-0">
    <section
      class="bg-[radial-gradient(circle_at_20%_20%,rgba(95,208,220,.16),transparent_28%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
      <UContainer class="max-w-295 px-6">
        <NuxtLink to="/products" class="mb-6 inline-block text-[14px] font-semibold text-[#5fd0dc] no-underline">{{
          $t('products.backToList') }}</NuxtLink>
        <h1 class="mb-4.5 text-[48px] leading-[1.1] tracking-normal">{{ t(product.name) }}</h1>
        <p class="max-w-[40ch] text-[18px] leading-[1.7] text-[#c8ced6]">{{ t(product.summary) }}</p>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-30">
      <UContainer class="max-w-295 grid grid-cols-1 gap-6 px-6 min-[960px]:grid-cols-[1.2fr_.8fr] min-[960px]:gap-8">
        <div class="min-w-0">
          <div class="mb-6">
            <button type="button"
              class="flex min-h-80 w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-xl bg-[#f3f5f7]"
              @click="openPreview(activeIndex)">
              <img v-if="product.images[activeIndex]" class="block max-h-105 w-full object-contain"
                :src="product.images[activeIndex]" :alt="t(product.name)" fetchpriority="high" decoding="async"
                loading="eager" />
              <span v-else
                class="flex min-h-80 size-full items-center justify-center bg-[#e8edf2] text-xs tracking-[.06em] text-[#98a2b3] uppercase">{{
                  $t('common.mediaBlank') }}</span>
            </button>
            <div v-if="product.images.length > 1" class="mt-3 grid grid-cols-4 gap-2.5">
              <button v-for="(img, index) in product.images" :key="img" type="button"
                class="aspect-square cursor-pointer overflow-hidden rounded-xl border border-[#e8edf2] bg-[#f3f5f7]"
                :class="{ 'border-primary': index === activeIndex }" @click="activeIndex = index">
                <img class="block size-full object-contain" :src="img" :alt="t(product.name)" loading="lazy"
                  decoding="async" />
              </button>
            </div>
          </div>
          <p class="text-[17px] leading-[1.8] text-[#4b5563]">{{ t(product.description) }}</p>
        </div>

        <aside class="min-w-0">
          <div class="rounded-xl bg-[#070b12] p-7 text-white">
            <h2 class="mb-5 text-[22px] tracking-normal">{{ $t('products.specsTitle') }}</h2>
            <ul class="mb-6 grid gap-3">
              <li v-if="product.category"
                class="rounded-[10px] bg-white/5 px-4 py-3.5 text-[14px] leading-[1.6] text-[#c8ced6]">{{
                  t(product.category.name) }}</li>
              <li v-for="(spec, index) in localizedSpecs" :key="`${spec}-${index}`" class="specs-item">
                {{ spec }}
              </li>
            </ul>
            <NuxtLink to="/contact"
              class="inline-flex min-h-12 items-center justify-center rounded-full bg-linear-to-br from-[#0f9aa8] to-[#3dd6e0] px-6 text-[14px] font-semibold text-white no-underline">
              {{ $t('products.detailCta') }}</NuxtLink>
          </div>
        </aside>
      </UContainer>
    </section>

    <section v-if="relatedProducts.length" class="bg-[#f3f4f6] py-24 md:py-30">
      <UContainer class="max-w-295 px-6">
        <h2 class="mb-6 text-[28px] tracking-normal text-[#111827]">{{ $t('products.relatedTitle') }}</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NuxtLink v-for="item in relatedProducts" :key="item.slug" :to="`/products/${item.slug}`"
            class="rounded-xl border border-[#e8edf2] bg-white p-5.5 no-underline">
            <h3 class="mb-2 text-[18px] font-semibold tracking-normal text-[#111827]">{{ t(item.name) }}</h3>
            <p class="text-[14px] leading-[1.6] text-[#4b5563]">{{ t(item.summary) }}</p>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <NuxtLink to="/contact"
      class="fixed inset-x-0 bottom-0 z-40 flex min-h-14.5 items-center justify-center border-t border-slate-900/10 bg-white/95 px-5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] text-3.75 font-bold text-[#0f4c56] no-underline backdrop-blur md:hidden">
      {{ $t('products.detailCta') }}</NuxtLink>

    <ImageLightbox v-model:open="previewOpen" v-model:index="previewIndex" :items="previewItems" />
  </div>
</template>


<script setup lang="ts">
type Localized = { en: string; zh: string }

type ProductItem = {
  slug: string
  category: { slug: string; name: Localized } | null
  name: Localized
  summary: Localized
  description: Localized
  images: string[]
  specs: { en: string[]; zh: string[] }
}

const route = useRoute()
const t = useLocalized()
const { locale, t: i18nT } = useI18n()
const slug = computed(() => String(route.params.slug || ''))

const { data: product, error } = await useApiFetch<ProductItem>(() => `/api/products/${slug.value}`, {
  key: () => `product-${slug.value}`
})

if (error.value || !product.value) {
  throw createError({ statusCode: 500, statusMessage: 'Product not found' })
}

usePageSeo({
  title: computed(() => `${t(product.value!.name)} | Cerotd`),
  description: computed(() => t(product.value!.summary) || t(product.value!.description)),
  path: `/products/${slug.value}`,
  image: computed(() => product.value?.images?.[0] || null)
})

const siteUrl = useSiteUrl()
const productJsonLd = computed(() => {
  if (!product.value) return null
  const images = (product.value.images || []).map((item) =>
    item.startsWith('http://') || item.startsWith('https://')
      ? item
      : `${siteUrl}${item.startsWith('/') ? item : `/${item}`}`
  )
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(product.value.name),
    description: t(product.value.summary) || t(product.value.description),
    image: images,
    sku: product.value.slug,
    brand: {
      '@type': 'Brand',
      name: 'Cerotd'
    },
    category: product.value.category ? t(product.value.category.name) : undefined,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${product.value.slug}`,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      itemCondition: 'https://schema.org/NewCondition'
    }
  }
})

const productBreadcrumbJsonLd = computed(() => {
  if (!product.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: i18nT('common.home'),
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: i18nT('common.products'),
        item: `${siteUrl}/products`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t(product.value.name),
        item: `${siteUrl}/products/${product.value.slug}`
      }
    ]
  }
})

useHead({
  script: computed(() => {
    const scripts = []
    if (productJsonLd.value) {
      scripts.push({
        type: 'application/ld+json' as 'application/json',
        innerHTML: JSON.stringify(productJsonLd.value)
      })
    }
    if (productBreadcrumbJsonLd.value) {
      scripts.push({
        type: 'application/ld+json' as 'application/json',
        innerHTML: JSON.stringify(productBreadcrumbJsonLd.value)
      })
    }
    return scripts
  })
})

const { data: listData } = await useApiFetch<{ items: ProductItem[] }>('/api/products', {
  key: 'products-list-related'
})

const relatedProducts = computed(() => {
  const categorySlug = product.value?.category?.slug
  if (!categorySlug) return []
  return (listData.value?.items || [])
    .filter((item) => item.slug !== product.value?.slug && item.category?.slug === categorySlug)
    .slice(0, 3)
})

const localizedSpecs = computed(() => {
  if (!product.value) return []
  return locale.value === 'zh' ? product.value.specs.zh : product.value.specs.en
})

const activeIndex = ref(0)
const previewOpen = ref(false)
const previewIndex = ref(0)
const previewItems = computed(() => product.value ? product.value.images.map((src) => ({ src, alt: t(product.value!.name) })) : [])

watch(
  () => product.value?.slug,
  () => {
    activeIndex.value = 0
    previewOpen.value = false
  }
)

function openPreview(index: number) {
  previewIndex.value = index
  previewOpen.value = true
}

</script>
