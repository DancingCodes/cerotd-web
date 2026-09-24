<template>
  <div v-if="product" class="product-detail-page">
    <section class="page-hero page-hero-rise">
      <div class="container">
        <NuxtLink to="/products" class="page-hero-back">{{ $t('products.backToList') }}</NuxtLink>
        <h1 class="page-hero-title">{{ t(product.name) }}</h1>
        <p class="page-hero-subtitle">{{ t(product.summary) }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section content">
      <div class="container content-grid">
        <div class="detail-main">
          <div class="gallery">
            <button type="button" class="gallery-main" @click="openPreview(activeIndex)">
              <AppImage
                v-if="product.images[activeIndex]"
                class="gallery-main-image"
                :src="product.images[activeIndex]"
                :alt="t(product.name)"
                fetchpriority="high"
                decoding="async"
                loading="eager"
              />
              <span v-else class="gallery-blank">{{ $t('common.mediaBlank') }}</span>
            </button>
            <div v-if="product.images.length > 1" class="gallery-thumbs">
              <button
                v-for="(img, index) in product.images"
                :key="img"
                type="button"
                class="gallery-thumb"
                :class="{ 'gallery-thumb-active': index === activeIndex }"
                @click="activeIndex = index"
              >
                <AppImage class="gallery-thumb-image" :src="img" :alt="t(product.name)" loading="lazy" decoding="async" />
              </button>
            </div>
          </div>
          <p class="detail-desc">{{ t(product.description) }}</p>
        </div>

        <aside class="detail-side">
          <div class="specs-panel">
            <h2 class="specs-panel-title">{{ $t('products.specsTitle') }}</h2>
            <ul class="specs-list">
              <li v-if="product.category" class="specs-item">{{ t(product.category.name) }}</li>
              <li v-for="(spec, index) in localizedSpecs" :key="`${spec}-${index}`" class="specs-item">
                {{ spec }}
              </li>
            </ul>
            <NuxtLink to="/contact" class="specs-cta">{{ $t('products.detailCta') }}</NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="relatedProducts.length" v-motion-slide-visible-once-bottom class="section related">
      <div class="container">
        <h2 class="related-title">{{ $t('products.relatedTitle') }}</h2>
        <div class="related-grid">
          <NuxtLink
            v-for="item in relatedProducts"
            :key="item.slug"
            :to="`/products/${item.slug}`"
            class="related-card"
          >
            <h3 class="related-card-title">{{ t(item.name) }}</h3>
            <p class="related-card-desc">{{ t(item.summary) }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <div v-if="previewOpen" class="preview" @click.self="closePreview">
      <div class="preview-inner">
        <button type="button" class="preview-close" aria-label="Close preview" @click="closePreview">×</button>
        <button
          v-if="product.images.length > 1"
          type="button"
          class="preview-nav preview-nav-prev"
          aria-label="Previous image"
          @click="prevImage"
        >
          ‹
        </button>
        <AppImage class="preview-image" :src="product.images[previewIndex]" :alt="t(product.name)" loading="eager" decoding="async" />
        <button
          v-if="product.images.length > 1"
          type="button"
          class="preview-nav preview-nav-next"
          aria-label="Next image"
          @click="nextImage"
        >
          ›
        </button>
      </div>
    </div>
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

const { data: product, error } = await useFetch<ProductItem>(() => `/api/products/${slug.value}`, {
  key: () => `product-${slug.value}`
})

if (error.value || !product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
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
        type: 'application/ld+json',
        children: JSON.stringify(productJsonLd.value)
      })
    }
    if (productBreadcrumbJsonLd.value) {
      scripts.push({
        type: 'application/ld+json',
        children: JSON.stringify(productBreadcrumbJsonLd.value)
      })
    }
    return scripts
  })
})

const { data: listData } = await useFetch<{ items: ProductItem[] }>('/api/products', {
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

watch(
  () => product.value?.slug,
  () => {
    activeIndex.value = 0
    closePreview()
  }
)

function openPreview(index: number) {
  previewIndex.value = index
  previewOpen.value = true
}

function closePreview() {
  previewOpen.value = false
}

function prevImage() {
  if (!product.value) return
  previewIndex.value = (previewIndex.value - 1 + product.value.images.length) % product.value.images.length
}

function nextImage() {
  if (!product.value) return
  previewIndex.value = (previewIndex.value + 1) % product.value.images.length
}
</script>

<style lang="scss" scoped>

.product-detail-page {
  .page-hero-rise {
    .page-hero-back,
    .page-hero-title,
    .page-hero-subtitle {
      opacity: 0;
      transform: translateY(18px);
      animation: page-hero-rise 0.7s ease forwards;
    }

    .page-hero-title {
      animation-delay: 0.08s;
    }

    .page-hero-subtitle {
      animation-delay: 0.16s;
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
      radial-gradient(circle at 20% 20%, rgba(#5fd0dc, 0.16), transparent 28%),
      linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
    color: #ffffff;

    .page-hero-back {
      display: inline-flex;
      margin-bottom: 24px;
      color: #5fd0dc;
      font-size: 14px;
      font-weight: 650;
      text-decoration: none;
    }

    .page-hero-title {
      margin-bottom: 18px;
      font-size: 48px;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .page-hero-subtitle {
      max-width: 40ch;
      color: #c8ced6;
      font-size: 18px;
      line-height: 1.7;
    }
  }

  .section {
    padding: 96px 0;

    @media (min-width: 768px) {
      padding: 120px 0;
    }
  }

  .content {
    background: #ffffff;

    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;

      @media (min-width: 960px) {
        grid-template-columns: 1.2fr 0.8fr;
        gap: 32px;
      }
    }

    .detail-main {
      .gallery {
        margin-bottom: 24px;

        .gallery-main {
          width: 100%;
          overflow: hidden;
          border-radius: 20px;
          background: #f3f5f7;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-in;

          .gallery-main-image {
            width: 100%;
            max-height: 420px;
            object-fit: contain;
            display: block;
          }
        }

        .gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 12px;

          .gallery-thumb {
          padding: 0;
          overflow: hidden;
            border-radius: 12px;
            border: 1px solid #e8edf2;
            background: #f3f5f7;
            aspect-ratio: 1 / 1;
            cursor: pointer;

            .gallery-thumb-image {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
            }
          }

          .gallery-thumb.gallery-thumb-active {
            border-color: var(--color-accent);
          }
        }
      }

      .detail-desc {
        color: #4b5563;
        font-size: 17px;
        line-height: 1.8;
      }
    }

    .detail-side {
      .specs-panel {
        padding: 28px;
        border-radius: 20px;
        background: var(--color-ink);
        color: #ffffff;

        .specs-panel-title {
          margin-bottom: 20px;
          font-size: 22px;
          letter-spacing: -0.02em;
        }

        .specs-list {
          display: grid;
          gap: 12px;
          margin-bottom: 24px;

          .specs-item {
            padding: 14px 16px;
            border-radius: 16px;
            background: rgba(#ffffff, 0.05);
            color: #c8ced6;
            font-size: 14px;
            line-height: 1.6;
          }
        }

        .specs-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
          color: #ffffff;
          font-size: 14px;
          font-weight: 650;
          text-decoration: none;
        }
      }
    }
  }

  .preview {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(var(--color-ink), 0.84);

    .preview-inner {
      position: relative;
      width: min(960px, 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-image {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 12px;
        background: #ffffff;
      }

      .preview-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: #ffffff;
        font-size: 32px;
        line-height: 1;
        cursor: pointer;
      }

      .preview-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: rgba(#ffffff, 0.16);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        cursor: pointer;
        user-select: none;
      }

      .preview-nav.preview-nav-prev {
        left: -8px;
      }

      .preview-nav.preview-nav-next {
        right: -8px;
      }
    }
  }

  .gallery-blank {
    width: 100%;
    height: 100%;
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8edf2;
    color: #98a2b3;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .related {
    background: var(--color-surface);
    padding: 96px 0;

    @media (min-width: 768px) {
      padding: 120px 0;
    }

    .related-title {
      margin-bottom: 24px;
      font-size: 28px;
      letter-spacing: -0.03em;
      color: #111827;
    }

    .related-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;

      @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .related-card {
      padding: 22px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid #e8edf2;
      text-decoration: none;

      .related-card-title {
        margin-bottom: 8px;
        color: #111827;
        font-size: 18px;
        font-weight: 650;
      }

      .related-card-desc {
        color: #4b5563;
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }

}
</style>
