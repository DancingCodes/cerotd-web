<template>
  <div v-if="product" class="product-detail-page">
    <div class="page-hero page-hero-rise">
      <div class="container">
        <NuxtLink to="/products" class="page-hero-back">{{ $t('products.backToList') }}</NuxtLink>
        <div class="page-hero-title">{{ $t(`products.catalog.${product.slug}.name`) }}</div>
        <div class="page-hero-subtitle">{{ $t(`products.catalog.${product.slug}.summary`) }}</div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section content">
      <div class="container content-grid">
        <div class="detail-main">
          <div class="detail-visual">
            <img v-if="product.image" class="detail-visual-image" :src="product.image" :alt="$t(`products.catalog.${product.slug}.name`)" />
          </div>
          <div class="detail-desc">{{ $t(`products.catalog.${product.slug}.description`) }}</div>
        </div>

        <div class="detail-side">
          <div class="specs-panel">
            <div class="specs-panel-title">{{ $t('products.specsTitle') }}</div>
            <div class="specs-list">
              <div v-for="n in 3" :key="n" class="specs-item">
                {{ $t(`products.catalog.${product.slug}.specs.s${n}`) }}
              </div>
            </div>
            <NuxtLink to="/contact" class="specs-cta">{{ $t('products.detailCta') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section related">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('products.relatedTitle') }}</div>
        </div>
        <div class="related-grid">
          <NuxtLink
            v-for="item in relatedProducts"
            :key="item.slug"
            :to="`/products/${item.slug}`"
            class="related-card"
          >
            <div class="related-card-title">{{ $t(`products.catalog.${item.slug}.name`) }}</div>
            <div class="related-card-desc">{{ $t(`products.catalog.${item.slug}.summary`) }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProduct, getProductsByCategory } from '~/data/products'

const route = useRoute()
const product = computed(() => getProduct(String(route.params.slug || '')))

watchEffect(() => {
  if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return getProductsByCategory(product.value.category)
    .filter((item) => item.slug !== product.value!.slug)
    .slice(0, 3)
})
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
      linear-gradient(180deg, #0b1220 0%, #162033 100%);
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

  .section-header {
    margin-bottom: 36px;

    .section-title {
      font-size: 32px;
      letter-spacing: -0.03em;
      color: #111827;
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
      .detail-visual {
        overflow: hidden;
        border-radius: 20px;
        background: #f3f5f7;
        min-height: 320px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        .detail-visual-image {
          width: 100%;
          max-height: 420px;
          object-fit: contain;
          display: block;
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
        background: #0b1220;
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

  .related {
    background: #f7f8fa;

    .related-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .related-card {
      padding: 24px;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid #eef1f4;
      text-decoration: none;
      transition: border-color 0.25s ease;

      &:hover {
        border-color: #cfd8e3;
      }

      .related-card-title {
        margin-bottom: 10px;
        color: #111827;
        font-size: 18px;
      }

      .related-card-desc {
        color: #4b5563;
        font-size: 14px;
        line-height: 1.7;
      }
    }
  }
}
</style>
