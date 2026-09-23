<template>
  <div class="products-page">
    <section class="page-hero">
      <div class="container">
        <p class="page-hero-kicker">{{ $t('common.products') }}</p>
        <h1 class="page-hero-title">{{ $t('products.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('products.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section categories">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('products.categories.title') }}</h2>
          <p class="section-subtitle">{{ $t('products.categories.subtitle') }}</p>
        </div>

        <div class="categories-list">
          <article
            v-for="(item, index) in categories"
            :key="item.name"
            class="category-card"
          >
            <div class="category-card-visual">
              <span class="category-card-index">0{{ index + 1 }}</span>
            </div>
            <div class="category-card-content">
              <h3 class="category-card-title">{{ item.name }}</h3>
              <p class="category-card-desc">{{ item.desc }}</p>
              <ul class="category-card-points">
                <li
                  v-for="point in item.points"
                  :key="point"
                  class="category-card-point"
                >
                  {{ point }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section note">
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
const { tm } = useI18n()
const categories = computed(() => tm('products.categories.items') || [])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.page-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 80% 10%, rgba($primary-color, 0.16), transparent 26%),
    linear-gradient(180deg, $dark-bg 0%, $dark-bg-light 100%);
  color: $white;

  .page-hero-kicker {
    margin-bottom: 18px;
    color: $primary-light;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .page-hero-title {
    margin-bottom: 18px;
    font-size: clamp(40px, 6vw, 64px);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .page-hero-subtitle {
    max-width: 34ch;
    color: $gray-300;
    font-size: 20px;
    line-height: 1.7;
  }
}

.section {
  @include section-space;
}

.section-header {
  max-width: 720px;
  margin-bottom: 48px;

  .section-title {
    margin-bottom: 14px;
    font-size: clamp(28px, 4vw, 40px);
    letter-spacing: -0.03em;
    color: $gray-900;
  }

  .section-subtitle {
    color: $gray-600;
    font-size: 17px;
    line-height: 1.7;
  }
}

.categories {
  background: $gray-50;

  .categories-list {
    display: grid;
    gap: 20px;
  }
}

.category-card {
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  border-radius: 28px;
  background: $white;
  border: 1px solid $gray-100;
  box-shadow: $shadow-soft;

  @media (min-width: 900px) {
    grid-template-columns: 280px 1fr;
  }

  .category-card-visual {
    min-height: 220px;
    display: flex;
    align-items: flex-end;
    padding: 24px;
    background:
      linear-gradient(160deg, rgba($primary-color, 0.2), transparent 40%),
      linear-gradient(180deg, #22324d 0%, #101827 100%);

    .category-card-index {
      color: rgba($white, 0.3);
      font-size: 64px;
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
    }
  }

  .category-card-content {
    padding: 28px;

    .category-card-title {
      margin-bottom: 12px;
      font-size: 28px;
      letter-spacing: -0.02em;
      color: $gray-900;
    }

    .category-card-desc {
      margin-bottom: 20px;
      color: $gray-600;
      font-size: 16px;
      line-height: 1.7;
    }

    .category-card-points {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .category-card-point {
        padding: 8px 12px;
        border-radius: 999px;
        background: $gray-100;
        color: $gray-700;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
}

.note {
  background: $white;
  padding-top: 0;

  .note-panel {
    padding: 40px 28px;
    border-radius: 28px;
    background: $dark-bg;
    color: $white;

    .note-title {
      margin-bottom: 12px;
      font-size: 28px;
      letter-spacing: -0.02em;
    }

    .note-desc {
      max-width: 760px;
      color: $gray-300;
      font-size: 16px;
      line-height: 1.8;
    }
  }
}
</style>
