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

        <p v-if="pending" class="state-text">Loading...</p>
        <p v-else-if="!productList.length" class="state-text">No products yet.</p>
        <div v-else class="product-grid">
          <NuxtLink
            v-for="item in productList"
            :key="item.slug"
            :to="`/products/${item.slug}`"
            class="product-card"
          >
            <div class="product-card-media">
              <img
                v-if="item.coverUrl || item.images[0]"
                class="product-card-image"
                :src="item.coverUrl || item.images[0]"
                :alt="t(item.name)"
              />
              <div v-else class="media-blank">
                <span class="media-blank-label">{{ $t('common.mediaBlank') }}</span>
              </div>
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

usePageSeo({
  title: i18nT('seo.products.title'),
  description: i18nT('seo.products.description'),
  path: '/products'
})
const { data, pending } = await useFetch<{ items: ProductItem[] }>('/api/products', {
  key: 'products-list'
})
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
      radial-gradient(circle at 80% 10%, rgba(#1aa6b8, 0.16), transparent 26%),
      linear-gradient(180deg, #0b1220 0%, #162033 100%);
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

  .catalog {
    background: #f7f8fa;

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
          color: #0e7f8f;
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
      background: #f7f8fa;
      border: 1px solid #eef1f4;

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
