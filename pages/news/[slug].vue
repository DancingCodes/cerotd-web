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
        <h1 class="mb-4 max-w-[18ch] text-[48px] leading-[1.1] tracking-normal">{{ t(article.title) }}</h1>
        <p class="max-w-[48ch] text-[18px] leading-[1.7] text-[#c8ced6]">{{ t(article.summary) }}</p>
      </UContainer>
    </section>

    <section class="bg-white py-18 pb-24">
      <UContainer class="max-w-205 px-6">
        <article ref="articleBody"
          class="news-body text-[17px] leading-[1.8] text-[#1f2937] [&_a]:text-[#3f7f88] [&_h2]:my-7 [&_h2]:mb-3 [&_h2]:text-[#111827] [&_h3]:my-7 [&_h3]:mb-3 [&_h3]:text-[#111827] [&_img]:my-6 [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:cursor-zoom-in [&_img]:rounded-[10px] [&_li]:mb-2 [&_ol]:mb-4.5 [&_ol]:list-decimal [&_ol]:pl-5.5 [&_p]:mb-4.5 [&_ul]:mb-4.5 [&_ul]:list-disc [&_ul]:pl-5.5"
          @click="onArticleClick" @keydown="onArticleKeydown" v-html="articleHtml"></article>
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
  summary: Localized
  content: Localized
  coverUrl: string | null
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

const articleBody = ref<HTMLElement | null>(null)
const articleHtml = computed(() => article.value ? t(article.value.content) : '')
const previewOpen = ref(false)
const previewIndex = ref(0)
const previewItems = ref<{ src: string; alt: string }[]>([])

function articleImages() {
  return Array.from(articleBody.value?.querySelectorAll('img') || [])
}

function updatePreviewItems() {
  previewItems.value = articleImages().map((image, index) => {
    image.tabIndex = 0
    image.setAttribute('role', 'button')
    image.setAttribute('aria-label', i18nT('news.previewImage', { n: index + 1 }))
    return { src: image.currentSrc || image.src, alt: image.alt || i18nT('news.imageAlt', { n: index + 1 }) }
  })
}

function openArticleImage(target: EventTarget | null) {
  if (!(target instanceof HTMLImageElement)) return false
  const index = articleImages().indexOf(target)
  if (index < 0) return false
  previewIndex.value = index
  previewOpen.value = true
  return true
}

function onArticleClick(event: MouseEvent) {
  openArticleImage(event.target)
}

function onArticleKeydown(event: KeyboardEvent) {
  if ((event.key === 'Enter' || event.key === ' ') && openArticleImage(event.target)) event.preventDefault()
}

onMounted(updatePreviewItems)
watch([articleHtml, locale], async () => {
  await nextTick()
  updatePreviewItems()
}, { flush: 'post' })

if (error.value || !article.value) {
  throw createError({ statusCode: 500, statusMessage: 'News not found' })
}

usePageSeo({
  title: computed(() => `${t(article.value!.title)} | Cerotd`),
  description: computed(() => t(article.value!.summary)),
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
    description: t(article.value.summary),
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

<style scoped>
.news-body :deep([data-news-image-pair]) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 24px 0;
}

.news-body :deep([data-news-image-pair] img) {
  width: 100%;
  height: 100%;
  margin: 0;
  aspect-ratio: 4 / 3;
  object-fit: contain;
}

@media (max-width: 640px) {
  .news-body :deep([data-news-image-pair]) {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
