<template>
  <div>
  <section
    class="bg-[radial-gradient(circle_at_80%_10%,rgba(139,154,171,.14),transparent_26%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
    <UContainer class="max-w-295 px-6">
      <h1 class="mb-4.5 text-[56px] leading-[1.08] tracking-normal">{{ $t('news.hero.title') }}</h1>
      <p class="max-w-[36ch] text-[20px] leading-[1.7] text-[#c8ced6]">{{ $t('news.hero.subtitle') }}</p>
    </UContainer>
  </section>

  <section class="bg-[#f3f4f6] py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-9 max-w-180">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('news.listTitle') }}</h2>
        <p class="text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('news.listSubtitle') }}</p>
      </div>

      <div class="mb-7 flex flex-wrap gap-2.5" role="tablist">
        <button type="button"
          class="min-h-10 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-4 text-[14px] font-medium text-[#4b5563] transition hover:border-[#b8c2cf] hover:text-[#111827]"
          :class="{ 'border-[#3f7f88]/45 bg-[#3f7f88]/10 text-[#0f4c56]': !selectedCategory }" role="tab"
          :aria-selected="!selectedCategory" @click="setCategory('')">
          {{ $t('news.filterAll') }}
        </button>
        <button v-for="category in categories" :key="category.slug" type="button"
          class="min-h-10 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-4 text-[14px] font-medium text-[#4b5563] transition hover:border-[#b8c2cf] hover:text-[#111827]"
          :class="{ 'border-[#3f7f88]/45 bg-[#3f7f88]/10 text-[#0f4c56]': selectedCategory === category.slug }"
          role="tab" :aria-selected="selectedCategory === category.slug" @click="setCategory(category.slug)">
          {{ t(category.name) }}
        </button>
      </div>

      <p v-if="pending" class="text-[15px] text-[#6b7280]">{{ $t('news.loading') }}</p>
      <p v-else-if="!newsList.length" class="text-[15px] text-[#6b7280]">{{ $t('news.empty') }}</p>
      <template v-else>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <NuxtLink v-for="item in newsList" :key="item.slug" :to="`/news/${item.slug}`"
            class="overflow-hidden rounded-xl border border-[#e8edf2] bg-white no-underline transition-colors hover:border-[#cfd8e3]">
            <div class="aspect-video overflow-hidden bg-[#f3f5f7]">
              <img class="block size-full object-cover saturate-[.86] contrast-[1.04]" :src="item.coverUrl || undefined"
                :alt="t(item.title)" loading="lazy" decoding="async" />
            </div>
            <div class="p-6">
              <div class="mb-3 flex items-center justify-between gap-3">
                <span class="text-[12px] font-bold tracking-[.04em] text-[#0f4c56] uppercase">{{
                  categoryLabel(item.category) }}</span>
                <time class="text-[13px] text-[#6b7280]" :datetime="item.publishedAt">{{
                  formatLocalizedDate(item.publishedAt, locale) }}</time>
              </div>
              <h3 class="mb-2.5 text-[22px] tracking-normal text-[#111827]">{{ t(item.title) }}</h3>
              <p class="mb-4 text-[14px] leading-[1.7] text-[#4b5563]">{{ t(item.summary) }}</p>
              <span class="text-[14px] font-semibold text-[#3f7f88]">{{ $t('common.learnMore') }}</span>
            </div>
          </NuxtLink>
        </div>
        <div v-if="hasMore" class="mt-8 flex justify-center">
          <button type="button"
            class="min-h-11 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-5.5 text-[14px] font-semibold text-[#0f4c56] transition hover:border-[#3f7f88]/45 hover:bg-[#3f7f88]/8 disabled:cursor-wait disabled:opacity-65"
            @click="loadMore">
            {{ $t('common.showMore') }}
          </button>
        </div>
      </template>
    </UContainer>
  </section>
  </div>
</template>

<script setup lang="ts">
type Localized = { en: string; zh: string }

type CategoryItem = {
  slug: string
  name: Localized
}

type NewsItem = {
  slug: string
  category: string
  title: Localized
  summary: Localized
  coverUrl: string | null
  publishedAt: string
}

const t = useLocalized()
const { t: i18nT, locale } = useI18n()
const route = useRoute()
const router = useRouter()

usePageSeo({
  title: i18nT('seo.news.title'),
  description: i18nT('seo.news.description'),
  path: '/news'
})

const { data: categoriesData } = await useApiFetch<{ items: CategoryItem[] }>('/api/news-categories', {
  key: 'news-categories'
})
const categories = computed(() => categoriesData.value?.items || [])
const selectedCategory = computed(() => String(route.query.category || '').trim())

function categoryLabel(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? t(found.name) : slug
}

function setCategory(slug: string) {
  router.replace({
    path: '/news',
    query: slug ? { category: slug } : {}
  })
}


const pageSize = 6
type NewsListResponse = {
  items: NewsItem[]
  total?: number
  page?: number
  pageSize?: number
}

const visibleCount = ref(pageSize)

const { data, pending } = await useApiFetch<NewsListResponse>('/api/news')
const filteredNews = computed(() => (data.value?.items || []).filter(
  (item) => !selectedCategory.value || item.category === selectedCategory.value
))
const newsList = computed(() => filteredNews.value.slice(0, visibleCount.value))
const hasMore = computed(() => newsList.value.length < filteredNews.value.length)

watch(selectedCategory, () => { visibleCount.value = pageSize })

function loadMore() { visibleCount.value += pageSize }
</script>
