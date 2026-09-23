<template>
  <div class="products-page">
    <div class="page-hero">
      <div class="container">
        <div class="page-hero-kicker">{{ $t('common.products') }}</div>
        <div class="page-hero-title">{{ $t('products.hero.title') }}</div>
        <div class="page-hero-subtitle">{{ $t('products.hero.subtitle') }}</div>
      </div>
    </div>

    <div class="section categories">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('products.categories.title') }}</div>
          <div class="section-subtitle">{{ $t('products.categories.subtitle') }}</div>
        </div>

        <div class="categories-list">
          <div v-for="(item, index) in categories" :key="item.name" class="category-card">
            <div class="category-card-visual">
              <div class="category-card-index">0{{ index + 1 }}</div>
            </div>
            <div class="category-card-content">
              <div class="category-card-title">{{ item.name }}</div>
              <div class="category-card-desc">{{ item.desc }}</div>
              <div class="category-card-points">
                <div v-for="point in item.points" :key="point" class="category-card-point">
                  {{ point }}
                </div>
              </div>
            </div>
          </div>
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
const { t, locale } = useI18n()

const categories = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`products.categories.items.item${n}.name`),
    desc: t(`products.categories.items.item${n}.desc`),
    points: [1, 2, 3].map((p) => t(`products.categories.items.item${n}.points.p${p}`))
  }))
})
</script>

<style lang="scss" scoped>
.page-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 80% 10%, rgba(#1aa6b8, 0.16), transparent 26%),
    linear-gradient(180deg, #0b1220 0%, #162033 100%);
  color: #ffffff;

  .page-hero-kicker {
    margin-bottom: 18px;
    color: #5fd0dc;
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
  margin-bottom: 48px;

  .section-title {
    margin-bottom: 14px;
    font-size: clamp(28px, 4vw, 40px);
    letter-spacing: -0.03em;
    color: #111827;
  }

  .section-subtitle {
    color: #4b5563;
    font-size: 17px;
    line-height: 1.7;
  }
}

.categories {
  background: #f7f8fa;

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
  background: #ffffff;
  border: 1px solid #eef1f4;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);

  @media (min-width: 900px) {
    grid-template-columns: 280px 1fr;
  }

  .category-card-visual {
    min-height: 220px;
    display: flex;
    align-items: flex-end;
    padding: 24px;
    background:
      linear-gradient(160deg, rgba(#1aa6b8, 0.2), transparent 40%),
      linear-gradient(180deg, #22324d 0%, #101827 100%);

    .category-card-index {
      color: rgba(#ffffff, 0.3);
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
      color: #111827;
    }

    .category-card-desc {
      margin-bottom: 20px;
      color: #4b5563;
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
        background: #eef1f4;
        color: #374151;
        font-size: 13px;
        font-weight: 600;
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
</style>
