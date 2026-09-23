<template>
  <div class="products-page">
    <div class="page-hero page-hero-rise">
      <div class="container">
        <div class="page-hero-title">{{ $t('products.hero.title') }}</div>
        <div class="page-hero-subtitle">{{ $t('products.hero.subtitle') }}</div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section catalog">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('products.listTitle') }}</div>
          <div class="section-subtitle">{{ $t('products.listSubtitle') }}</div>
        </div>

        <div class="filter-list">
          <div
            class="filter-item"
            :class="{ 'filter-item-active': activeCategory === 'all' }"
            @click="activeCategory = 'all'"
          >
            {{ $t('products.listTitle') }}
          </div>
          <div
            v-for="category in availableCategories"
            :key="category"
            class="filter-item"
            :class="{ 'filter-item-active': activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ $t(`products.categoryNames.${category}`) }}
          </div>
        </div>

        <div class="product-grid">
          <NuxtLink
            v-for="item in filteredProducts"
            :key="item.slug"
            :to="`/products/${item.slug}`"
            class="product-card"
          >
            <div class="product-card-media">
              <img v-if="item.image" class="product-card-image" :src="item.image" :alt="$t(`products.catalog.${item.slug}.name`)" />
              <div v-else class="media-blank">
                <div class="media-blank-label">{{ $t('common.mediaBlank') }}</div>
              </div>
            </div>
            <div class="product-card-body">
              <div class="product-card-title">{{ $t(`products.catalog.${item.slug}.name`) }}</div>
              <div class="product-card-desc">{{ $t(`products.catalog.${item.slug}.summary`) }}</div>
              <div class="product-card-link">{{ $t('common.learnMore') }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section note">
      <div class="container">
        <div class="note-panel">
          <div class="note-title">{{ $t('products.note.title') }}</div>
          <div class="note-desc">{{ $t('products.note.desc') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productCategories, products, type ProductCategory } from '~/data/products'

const activeCategory = ref<'all' | ProductCategory>('all')

const availableCategories = computed(() =>
  productCategories.filter((category) => products.some((item) => item.category === category))
)

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products
  return products.filter((item) => item.category === activeCategory.value)
})
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

  .catalog {
    background: #f7f8fa;

    .filter-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 28px;

      .filter-item {
        padding: 10px 16px;
        border-radius: 999px;
        background: #ffffff;
        border: 1px solid #e2e6eb;
        color: #4b5563;
        font-size: 14px;
        font-weight: 650;
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover {
          color: #111827;
          border-color: #cfd6de;
        }
      }

      .filter-item.filter-item-active {
        background: #0b1220;
        border-color: #0b1220;
        color: #ffffff;
      }
    }

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
      box-shadow: none;
      text-decoration: none;
      transition: border-color 0.25s ease;

      &:hover {
        transform: none;
        border-color: #cfd8e3;
        box-shadow: none;
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
          font-size: 22px;
          letter-spacing: -0.02em;
          color: #111827;
        }

        .product-card-desc {
          margin-bottom: 18px;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.7;
          min-height: 52px;
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
    padding-top: 0;

    .note-panel {
      padding: 40px 28px;
      border-radius: 28px;
      background: #0b1220;
      color: #ffffff;

      .note-title {
        margin-bottom: 12px;
        font-size: 28px;
        letter-spacing: -0.02em;
      }

      .note-desc {
        max-width: 760px;
        color: #c8ced6;
        font-size: 16px;
        line-height: 1.8;
      }
    }
  }
}
</style>
