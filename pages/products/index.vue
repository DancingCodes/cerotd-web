<template>
  <div>
  <section
    class="bg-[radial-gradient(circle_at_80%_10%,rgba(139,154,171,.14),transparent_26%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
    <UContainer class="max-w-295 px-6">
      <h1 class="mb-4.5 text-[56px] leading-[1.08] tracking-normal">{{ $t('products.hero.title') }}</h1>
      <p class="max-w-[34ch] text-[20px] leading-[1.7] text-[#c8ced6]">{{ $t('products.hero.subtitle') }}</p>
    </UContainer>
  </section>

  <section class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-9 max-w-180">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('products.listTitle') }}</h2>
        <p class="text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('products.listSubtitle') }}</p>
      </div>

      <div class="mb-7 flex flex-wrap gap-2.5" role="tablist">
        <button type="button"
          class="min-h-10 cursor-pointer rounded-full border px-4 text-[14px] font-medium transition"
          :class="!selectedCategory ? 'border-[#0f4c56] bg-[#0f4c56] text-white' : 'border-[#d7dde5] bg-white text-[#4b5563] hover:border-[#b8c2cf] hover:text-[#111827]'" role="tab"
          :aria-selected="!selectedCategory" @click="setCategory('')">
          {{ $t('products.filterAll') }}
        </button>
        <button v-for="category in categoryList" :key="category.slug" type="button"
          class="min-h-10 cursor-pointer rounded-full border px-4 text-[14px] font-medium transition"
          :class="selectedCategory === category.slug ? 'border-[#0f4c56] bg-[#0f4c56] text-white' : 'border-[#d7dde5] bg-white text-[#4b5563] hover:border-[#b8c2cf] hover:text-[#111827]'"
          role="tab" :aria-selected="selectedCategory === category.slug" @click="setCategory(category.slug)">
          {{ t(category.name) }}
        </button>
      </div>

      <p v-if="pending" class="text-[15px] text-[#6b7280]">{{ $t('products.loading') }}</p>
      <p v-else-if="!productList.length" class="text-[15px] text-[#6b7280]">{{ $t('products.empty') }}</p>
      <template v-else>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 min-[1100px]:grid-cols-3">
          <NuxtLink v-for="item in productList" :key="item.slug" :to="`/products/${item.slug}`"
            class="overflow-hidden rounded-xl border border-[#e8edf2] bg-white no-underline transition-colors hover:border-[#cfd8e3]">
            <div class="aspect-4/3 overflow-hidden bg-[#f3f5f7]">
              <img class="block size-full bg-[#f3f5f7] object-contain"
                :class="{ 'object-cover saturate-[.8] contrast-[1.05]': !(item.coverUrl || item.images[0]) }"
                :src="item.coverUrl || item.images[0]" :alt="t(item.name)" loading="lazy" decoding="async" />
            </div>
            <div class="p-6">
              <h3 class="mb-2.5 text-[20px] tracking-normal text-[#111827]">{{ t(item.name) }}</h3>
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
type CategoryItem = { slug: string; name: Localized }

type ProductItem = {
  slug: string
  category: { slug: string; name: Localized } | null
  name: Localized
  summary: Localized
  coverUrl: string | null
  images: string[]
}

const t = useLocalized()
const { t: i18nT } = useI18n()
const route = useRoute()
const router = useRouter()

usePageSeo({
  title: computed(() => i18nT('seo.products.title')),
  description: computed(() => i18nT('seo.products.description')),
  path: '/products'
})

const selectedCategory = computed(() => String(route.query.category || '').trim())

function setCategory(slug: string) {
  router.replace({
    path: '/products',
    query: slug ? { category: slug } : {}
  })
}

const { data: categoriesData } = await useApiFetch<{ items: CategoryItem[] }>('/api/product-categories')
const categoryList = computed(() => categoriesData.value?.items || [])

const pageSize = 6
type ProductListResponse = {
  items: ProductItem[]
  total?: number
  page?: number
  pageSize?: number
}

const visibleCount = ref(pageSize)

const { data, pending } = await useApiFetch<ProductListResponse>('/api/products')
const filteredProducts = computed(() => (data.value?.items || []).filter(
  (item) => !selectedCategory.value || item.category?.slug === selectedCategory.value
))
const productList = computed(() => filteredProducts.value.slice(0, visibleCount.value))
const hasMore = computed(() => productList.value.length < filteredProducts.value.length)

watch(selectedCategory, () => { visibleCount.value = pageSize })

function loadMore() { visibleCount.value += pageSize }
</script>
