<template>
  <div class="products-page">
    <section class="page-hero page-hero-rise">
      <div class="container">
        <h1 class="page-hero-title">{{ $t('products.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('products.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section catalog">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('products.listTitle') }}</h2>
          <p class="section-subtitle">{{ $t('products.listSubtitle') }}</p>
        </div>

        <div class="filter-bar" role="tablist" :aria-label="$t('products.listTitle')">
          <button
            type="button"
            class="filter-chip"
            :class="{ 'filter-chip-active': !selectedCategory }"
            role="tab"
            :aria-selected="!selectedCategory"
            @click="setCategory('')"
          >
            {{ $t('products.filterAll') }}
          </button>
          <button
            v-for="category in categoryList"
            :key="category.slug"
            type="button"
            class="filter-chip"
            :class="{ 'filter-chip-active': selectedCategory === category.slug }"
            role="tab"
            :aria-selected="selectedCategory === category.slug"
            @click="setCategory(category.slug)"
          >
            {{ t(category.name) }}
          </button>
        </div>

        <p v-if="pending" class="state-text">{{ $t('products.loading') }}</p>
        <p v-else-if="!productList.length" class="state-text">{{ $t('products.empty') }}</p>
        <div v-else class="product-grid">
          <NuxtLink
            v-for="item in productList"
            :key="item.slug"
            :to="`/products/${item.slug}`"
            class="product-card"
          >
            <div class="product-card-media">
              <img
                class="product-card-image"
                :class="{ 'product-card-image-cover': !(item.coverUrl || item.images[0]) }"
                :src="item.coverUrl || item.images[0] || '/images/factory/plant.webp'"
                :alt="t(item.name)"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="product-card-body">
              <h3 class="product-card-title">{{ t(item.name) }}</h3>
              <p class="product-card-desc">{{ t(item.summary) }}</p>
              <span class="product-card-link">{{ $t('common.learnMore') }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section note">
      <div class="container">
        <div class="note-panel">
          <h2 class="note-title">{{ $t('products.note.title') }}</h2>
          <p class="note-desc">{{ $t('products.note.desc') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
type Localized = { en: string; zh: string }

type ProductItem = {
  slug: string
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
  title: i18nT('seo.products.title'),
  description: i18nT('seo.products.description'),
  path: '/products'
})

type CategoryItem = {
  slug: string
  name: Localized
}

const selectedCategory = computed(() => String(route.query.category || '').trim())

function setCategory(slug: string) {
  router.replace({
    path: '/products',
    query: slug ? { category: slug } : {}
  })
}

const { data: categoriesData } = await useFetch<{ items: CategoryItem[] }>('/api/product-categories', {
  key: 'products-categories'
})
const categoryList = computed(() => categoriesData.value?.items || [])

const { data, pending } = await useFetch<{ items: ProductItem[] }>(
  () => {
    const category = selectedCategory.value
    return category ? `/api/products?category=${encodeURIComponent(category)}` : '/api/products'
  },
  {
    key: () => `products-list-${selectedCategory.value || 'all'}`,
    watch: [selectedCategory]
  }
)
const productList = computed(() => data.value?.items || [])
</script>

<style lang="scss" scoped>

.products-page {
  .page-hero-rise {
    .page-hero-title,
    .page-hero-subtitle {
      opacity: 0;
      transform: translateY(18px);
      animation: page-hero-rise 0.7s ease forwards;
    }

    .page-hero-subtitle {
      animation-delay: 0.1s;
    }
  }

  @keyframes page-hero-rise {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .page-hero {
    padding: 88px 0 72px;
    background:
      radial-gradient(circle at 80% 10%, rgba(#8b9aab, 0.14), transparent 26%),
      linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
    color: #ffffff;

    .page-hero-title {
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.08;
      letter-spacing: -0.03em;
    }

    .page-hero-subtitle {
      max-width: 34ch;
      color: #c8ced6;
      font-size: 20px;
      line-height: 1.7;
    }
  }

  .section {
    padding: 96px 0;

    @media (min-width: 768px) {
      padding: 120px 0;
    }
  }

  .section-header {
    max-width: 720px;
    margin-bottom: 36px;

    .section-title {
      margin-bottom: 14px;
      font-size: 36px;
      letter-spacing: -0.03em;
      color: #111827;
    }

    .section-subtitle {
      color: #4b5563;
      font-size: 17px;
      line-height: 1.7;
    }
  }

  .state-text {
    color: #6b7280;
    font-size: 15px;
  }

  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 28px;
  }

  .filter-chip {
    min-height: 40px;
    padding: 0 16px;
    border-radius: 999px;
    border: 1px solid #d7dde5;
    background: #ffffff;
    color: #4b5563;
    font-size: 14px;
    font-weight: 550;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  }

  .filter-chip:hover {
    border-color: #b8c2cf;
    color: #111827;
  }

  .filter-chip.filter-chip-active {
    border-color: rgba(63, 127, 136, 0.45);
    background: rgba(63, 127, 136, 0.1);
    color: #0f4c56;
  }

  .catalog {
    background: var(--color-surface);

    .product-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .product-card {
      overflow: hidden;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid #e8edf2;
      text-decoration: none;
      transition: border-color 0.25s ease;

      &:hover {
        border-color: #cfd8e3;
      }

      .product-card-media {
        aspect-ratio: 4 / 3;
        background: #f3f5f7;
        overflow: hidden;

        .product-card-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: #f3f5f7;
        }

        .product-card-image.product-card-image-cover {
          object-fit: cover;
          filter: saturate(0.8) contrast(1.05);
        }

        .media-blank {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e8edf2;

          .media-blank-label {
            color: #98a2b3;
            font-size: 12px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }
        }
      }

      .product-card-body {
        padding: 24px;

        .product-card-title {
          margin-bottom: 10px;
          color: #111827;
          font-size: 20px;
        }

        .product-card-desc {
          margin-bottom: 16px;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.7;
        }

        .product-card-link {
          color: var(--color-accent);
          font-size: 14px;
          font-weight: 650;
        }
      }
    }
  }

  .note {
    background: #ffffff;

    .note-panel {
      padding: 28px;
      border-radius: 20px;
      background: var(--color-surface);
      border: 1px solid var(--color-line);

      .note-title {
        margin-bottom: 10px;
        color: #111827;
        font-size: 20px;
      }

      .note-desc {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }
}
</style>
