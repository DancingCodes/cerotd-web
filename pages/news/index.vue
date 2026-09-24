<template>
  <div class="news-page">
    <section class="page-hero page-hero-rise">
      <div class="container">
        <h1 class="page-hero-title">{{ $t('news.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('news.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section catalog">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('news.listTitle') }}</h2>
          <p class="section-subtitle">{{ $t('news.listSubtitle') }}</p>
        </div>

        <div class="filter-bar" role="tablist" :aria-label="$t('news.listTitle')">
          <button
            type="button"
            class="filter-chip"
            :class="{ 'filter-chip-active': !selectedCategory }"
            role="tab"
            :aria-selected="!selectedCategory"
            @click="setCategory('')"
          >
            {{ $t('news.filterAll') }}
          </button>
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="filter-chip"
            :class="{ 'filter-chip-active': selectedCategory === category }"
            role="tab"
            :aria-selected="selectedCategory === category"
            @click="setCategory(category)"
          >
            {{ $t(`news.categories.${category}`) }}
          </button>
        </div>

        <p v-if="pending" class="state-text">{{ $t('news.loading') }}</p>
        <p v-else-if="!newsList.length" class="state-text">{{ $t('news.empty') }}</p>
        <div v-else class="news-grid">
          <NuxtLink
            v-for="item in newsList"
            :key="item.slug"
            :to="`/news/${item.slug}`"
            class="news-card"
          >
            <div class="news-card-media">
              <img
                class="news-card-image"
                :src="item.coverUrl || '/images/factory/plant.webp'"
                :alt="t(item.title)"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="news-card-body">
              <div class="news-card-meta">
                <span class="news-card-category">{{ $t(`news.categories.${item.category}`) }}</span>
                <time class="news-card-date" :datetime="item.publishedAt">{{ formatDate(item.publishedAt) }}</time>
              </div>
              <h3 class="news-card-title">{{ t(item.title) }}</h3>
              <p class="news-card-desc">{{ t(item.summary) }}</p>
              <span class="news-card-link">{{ $t('common.learnMore') }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
type Localized = { en: string; zh: string }

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

const categories = ['company', 'product', 'industry', 'event']
const selectedCategory = computed(() => String(route.query.category || '').trim())

function setCategory(slug: string) {
  router.replace({
    path: '/news',
    query: slug ? { category: slug } : {}
  })
}

function formatDate(value: string) {
  const date = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z')
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const { data, pending } = await useFetch<{ items: NewsItem[] }>(
  () => {
    const category = selectedCategory.value
    return category ? `/api/news?category=${encodeURIComponent(category)}` : '/api/news'
  },
  {
    key: () => `news-list-${selectedCategory.value || 'all'}`,
    watch: [selectedCategory]
  }
)
const newsList = computed(() => data.value?.items || [])
</script>

<style lang="scss" scoped>
.news-page {
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
      max-width: 36ch;
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

    .news-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .news-card {
      overflow: hidden;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid #e8edf2;
      text-decoration: none;
      transition: border-color 0.25s ease;

      &:hover {
        border-color: #cfd8e3;
      }

      .news-card-media {
        aspect-ratio: 16 / 9;
        background: #f3f5f7;
        overflow: hidden;

        .news-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.86) contrast(1.04);
        }
      }

      .news-card-body {
        padding: 24px;

        .news-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .news-card-category {
          color: #0f4c56;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .news-card-date {
          color: #6b7280;
          font-size: 13px;
        }

        .news-card-title {
          margin-bottom: 10px;
          color: #111827;
          font-size: 22px;
          letter-spacing: -0.02em;
        }

        .news-card-desc {
          margin-bottom: 16px;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.7;
        }

        .news-card-link {
          color: var(--color-accent);
          font-size: 14px;
          font-weight: 650;
        }
      }
    }
  }
}
</style>
