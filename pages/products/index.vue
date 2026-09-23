<template>
  <div class="products-page">
    <div class="page-hero">
      <div class="container">
        <div class="page-hero-title">{{ $t('products.hero.title') }}</div>
        <div class="page-hero-subtitle">{{ $t('products.hero.subtitle') }}</div>
      </div>
    </div>

    <div class="section catalog">
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
            v-for="category in productCategories"
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
            <div class="product-card-visual">
              <div class="product-card-category">{{ $t(`products.categoryNames.${item.category}`) }}</div>
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

    <div class="section note">
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

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products
  return products.filter((item) => item.category === activeCategory.value)
})
</script>

<style lang="scss" scoped>
.products-page {
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
      border-radius: 28px;
      background: #ffffff;
      border: 1px solid #eef1f4;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.14);
      }

      .product-card-visual {
        min-height: 180px;
        display: flex;
        align-items: flex-end;
        padding: 24px;
        background:
          linear-gradient(160deg, rgba(#1aa6b8, 0.2), transparent 40%),
          linear-gradient(180deg, #22324d 0%, #101827 100%);

        .product-card-category {
          color: #5fd0dc;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
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
