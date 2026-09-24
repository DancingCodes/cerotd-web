<template>
  <div v-if="article" class="news-detail-page">
    <section class="page-hero page-hero-rise">
      <div class="container">
        <NuxtLink to="/news" class="page-hero-back">{{ $t('news.backToList') }}</NuxtLink>
        <div class="page-hero-meta">
          <span>{{ $t(`news.categories.${article.category}`) }}</span>
          <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
        </div>
        <h1 class="page-hero-title">{{ t(article.title) }}</h1>
        <p class="page-hero-subtitle">{{ t(article.summary) }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section content">
      <div class="container content-wrap">
        <img
          v-if="article.coverUrl"
          class="cover-image"
          :src="article.coverUrl"
          :alt="t(article.title)"
          fetchpriority="high"
          decoding="async"
        />
        <article class="article-body" v-html="t(article.content)"></article>
        <div class="article-cta">
          <NuxtLink to="/contact" class="article-cta-link">{{ $t('news.detailCta') }}</NuxtLink>
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
  content: Localized
  coverUrl: string | null
  publishedAt: string
  updatedAt: string
}

const route = useRoute()
const t = useLocalized()
const { locale } = useI18n()
const slug = computed(() => String(route.params.slug || ''))

const { data: article, error } = await useFetch<NewsItem>(() => `/api/news/${slug.value}`, {
  key: () => `news-${slug.value}`
})

if (error.value || !article.value) {
  throw createError({ statusCode: 404, statusMessage: 'News not found' })
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
        url: `${siteUrl}/logo.png`
      }
    }
  }
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(articleJsonLd.value))
    }
  ]
})

function formatDate(value: string) {
  const date = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z')
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}
</script>

<style lang="scss" scoped>
.news-detail-page {
  .page-hero-rise {
    .page-hero-title,
    .page-hero-subtitle,
    .page-hero-meta,
    .page-hero-back {
      opacity: 0;
      transform: translateY(18px);
      animation: page-hero-rise 0.7s ease forwards;
    }

    .page-hero-meta {
      animation-delay: 0.05s;
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
    padding: 72px 0 64px;
    background:
      radial-gradient(circle at 80% 10%, rgba(#8b9aab, 0.14), transparent 26%),
      linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
    color: #ffffff;

    .page-hero-back {
      display: inline-block;
      margin-bottom: 18px;
      color: #c8ced6;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }

    .page-hero-meta {
      display: flex;
      gap: 14px;
      margin-bottom: 14px;
      color: #b7c0cb;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .page-hero-title {
      margin-bottom: 16px;
      max-width: 18ch;
      font-size: 48px;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .page-hero-subtitle {
      max-width: 48ch;
      color: #c8ced6;
      font-size: 18px;
      line-height: 1.7;
    }
  }

  .section {
    padding: 72px 0 96px;
  }

  .content {
    background: #ffffff;

    .content-wrap {
      max-width: 820px;
    }

    .cover-image {
      width: 100%;
      max-height: 460px;
      object-fit: cover;
      border-radius: 20px;
      margin-bottom: 28px;
      display: block;
    }

    .article-body {
      color: #1f2937;
      font-size: 17px;
      line-height: 1.8;

      :deep(p) {
        margin: 0 0 18px;
      }

      :deep(h2),
      :deep(h3) {
        margin: 28px 0 12px;
        color: #111827;
        letter-spacing: -0.02em;
      }

      :deep(ul),
      :deep(ol) {
        margin: 0 0 18px;
        padding-left: 22px;
      }

      :deep(li) {
        margin-bottom: 8px;
      }

      :deep(img) {
        display: block;
        width: 100%;
        height: auto;
        margin: 24px 0;
        border-radius: 16px;
      }

      :deep(a) {
        color: var(--color-accent);
      }
    }

    .article-cta {
      margin-top: 36px;

      .article-cta-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 46px;
        padding: 0 20px;
        border-radius: 999px;
        background: var(--color-ink);
        color: #ffffff;
        text-decoration: none;
        font-size: 14px;
        font-weight: 650;
      }
    }
  }
}
</style>
