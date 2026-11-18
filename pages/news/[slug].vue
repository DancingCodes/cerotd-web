<template>
  <div v-if="article">
    <section
      class="bg-[radial-gradient(circle_at_80%_10%,rgba(139,154,171,.14),transparent_26%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-16 text-white md:py-18">
      <UContainer class="max-w-295 px-6">
        <NuxtLink to="/news" class="mb-4.5 inline-block text-[14px] font-semibold text-[#c8ced6] no-underline">
          {{ $t('news.backToList') }}</NuxtLink>
        <div class="mb-3.5 flex gap-3.5 text-[13px] font-semibold tracking-[.04em] text-[#b7c0cb] uppercase">
          <span>{{ t(article.category.name) }}</span>
          <time :datetime="article.publishedAt">{{ formatLocalizedDate(article.publishedAt, locale) }}</time>
        </div>
        <h1 class="mb-4 max-w-4xl text-[48px] leading-[1.1] tracking-normal">{{ t(article.title) }}</h1>
      </UContainer>
    </section>

    <section class="bg-white py-18 pb-24">
      <UContainer :class="article.images.length ? 'max-w-295' : 'max-w-205'" class="px-6">
        <div :class="article.images.length ? 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12' : ''">
          <article class="min-w-0 break-words whitespace-pre-wrap text-[17px] leading-[1.8] text-[#1f2937]">{{ t(article.body) }}</article>
          <div v-if="article.images.length" class="grid grid-cols-2 content-start gap-3">
            <button v-for="(src, index) in article.images" :key="`${src}-${index}`" type="button"
              :class="article.images.length === 1 ? 'col-span-2' : ''"
              class="aspect-[4/3] cursor-zoom-in overflow-hidden rounded-sm bg-[#f3f4f6]"
              :aria-label="i18nT('news.previewImage', { n: index + 1 })" @click="openGalleryImage(index)">
              <img :src="src" :alt="i18nT('news.imageAlt', { n: index + 1 })"
                class="size-full object-contain" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>
      </UContainer>
    </section>
    <ImageLightbox v-model:open="previewOpen" v-model:index="previewIndex" :items="previewItems" />
  </div>
</template>

<script setup lang="ts">
type Localized = { en: string; zh: string }

type NewsItem = {
  slug: string
  category: { slug: string; name: Localized }
  title: Localized
  body: Localized
  coverUrl: string | null
  images: string[]
  publishedAt: string
  updatedAt: string
}

const route = useRoute()
const t = useLocalized()
const { locale, t: i18nT } = useI18n()
const slug = computed(() => String(route.params.slug || ''))

const { data: article, error } = await useApiFetch<NewsItem>(() => `/api/news/${slug.value}`, {
  key: () => `news-${slug.value}`
})

const previewOpen = ref(false)
const previewIndex = ref(0)
const previewItems = computed(() => (article.value?.images || []).map((src, index) => ({
  src,
  alt: i18nT('news.imageAlt', { n: index + 1 })
})))

function openGalleryImage(index: number) {
  previewIndex.value = index
  previewOpen.value = true
}

if (error.value || !article.value) {
  throw createError({ statusCode: 500, statusMessage: 'News not found' })
}

usePageSeo({
  title: computed(() => `${t(article.value!.title)} | Cerotd`),
  description: computed(() => t(article.value!.body).slice(0, 160)),
  path: `/news/${slug.value}`,
  image: computed(() => article.value?.coverUrl || null)
})

const siteUrl = useSiteUrl()

const articleJsonLd = computed(() => {
  if (!article.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(article.value.title),
    description: t(article.value.body).slice(0, 160),
    image: article.value.coverUrl
      ? [`${siteUrl}${article.value.coverUrl.startsWith('/') ? article.value.coverUrl : '/' + article.value.coverUrl}`]
      : undefined,
    datePublished: article.value.publishedAt,
    dateModified: article.value.updatedAt || article.value.publishedAt,
    mainEntityOfPage: `${siteUrl}/news/${article.value.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Cerotd'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerotd',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.webp`
      }
    }
  }
})

const newsBreadcrumbJsonLd = computed(() => {
  if (!article.value) return null
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
        name: i18nT('common.news'),
        item: `${siteUrl}/news`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t(article.value.title),
        item: `${siteUrl}/news/${article.value.slug}`
      }
    ]
  }
})

useHead({
  script: computed(() => {
    const scripts = []
    if (articleJsonLd.value) {
      scripts.push({
        type: 'application/ld+json' as 'application/json',
        innerHTML: JSON.stringify(articleJsonLd.value)
      })
    }
    if (newsBreadcrumbJsonLd.value) {
      scripts.push({
        type: 'application/ld+json' as 'application/json',
        innerHTML: JSON.stringify(newsBreadcrumbJsonLd.value)
      })
    }
    return scripts
  })
})

</script>
