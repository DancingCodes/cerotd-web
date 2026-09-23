<template>
  <div class="advantages-page">
    <section class="page-hero">
      <div class="container">
        <p class="page-hero-kicker">{{ $t('common.advantages') }}</p>
        <h1 class="page-hero-title">{{ $t('advantages.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('advantages.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section pillars">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('advantages.pillars.title') }}</h2>
        </div>
        <div class="pillars-grid">
          <article v-for="(item, index) in pillars" :key="item.name" class="pillar-card">
            <div class="pillar-card-index">0{{ index + 1 }}</div>
            <h3 class="pillar-card-title">{{ item.name }}</h3>
            <p class="pillar-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section compare">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('advantages.compare.title') }}</h2>
        </div>
        <div class="compare-list">
          <article v-for="item in compare" :key="item.name" class="compare-item">
            <h3 class="compare-item-title">{{ item.name }}</h3>
            <p class="compare-item-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { tm } = useI18n()
const pillars = computed(() => tm('advantages.pillars.items') || [])
const compare = computed(() => tm('advantages.compare.items') || [])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.page-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 70% 20%, rgba($primary-color, 0.16), transparent 28%),
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
    max-width: 32ch;
    color: $gray-300;
    font-size: 20px;
    line-height: 1.7;
  }
}

.section {
  @include section-space;
}

.section-header {
  margin-bottom: 48px;

  .section-title {
    font-size: clamp(28px, 4vw, 40px);
    letter-spacing: -0.03em;
    color: $gray-900;
  }
}

.pillars {
  background: $gray-50;

  .pillars-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    @media (min-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.pillar-card {
  padding: 28px;
  border-radius: 24px;
  background: $white;
  border: 1px solid $gray-100;
  box-shadow: $shadow-soft;

  .pillar-card-index {
    margin-bottom: 24px;
    color: $primary-dark;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .pillar-card-title {
    margin-bottom: 12px;
    font-size: 24px;
    color: $gray-900;
  }

  .pillar-card-desc {
    color: $gray-600;
    font-size: 15px;
    line-height: 1.7;
  }
}

.compare {
  background: $white;

  .compare-list {
    display: grid;
    gap: 0;
  }
}

.compare-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 28px 0;
  border-top: 1px solid $gray-200;

  @media (min-width: 800px) {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 32px;
    align-items: start;
  }

  .compare-item-title {
    font-size: 22px;
    color: $gray-900;
    letter-spacing: -0.02em;
  }

  .compare-item-desc {
    color: $gray-600;
    font-size: 16px;
    line-height: 1.7;
  }
}
</style>
