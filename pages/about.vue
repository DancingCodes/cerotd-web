<template>
  <div class="about-page">
    <section class="page-hero">
      <div class="container">
        <p class="page-hero-kicker">{{ $t('common.about') }}</p>
        <h1 class="page-hero-title">{{ $t('about.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section intro">
      <div class="container intro-grid">
        <div class="intro-copy">
          <h2 class="intro-title">{{ $t('about.intro.title') }}</h2>
          <p class="intro-desc">{{ $t('about.intro.desc') }}</p>
        </div>
        <div class="intro-panel">
          <div class="intro-panel-glow"></div>
          <p class="intro-panel-note">{{ $t('common.placeholderNote') }}</p>
        </div>
      </div>
    </section>

    <section class="section values">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.values.title') }}</h2>
        </div>
        <div class="values-grid">
          <article v-for="item in values" :key="item.name" class="value-card">
            <h3 class="value-card-title">{{ item.name }}</h3>
            <p class="value-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section milestones">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.milestones.title') }}</h2>
        </div>
        <div class="milestones-list">
          <article v-for="item in milestones" :key="item.year" class="milestone-item">
            <div class="milestone-item-year">{{ item.year }}</div>
            <p class="milestone-item-text">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const values = useLocaleItems<{ name: string; desc: string }>('about.values.items', ['name', 'desc'])
const milestones = useLocaleItems<{ year: string; text: string }>('about.milestones.items', ['year', 'text'])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.page-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 15% 20%, rgba($primary-light, 0.16), transparent 30%),
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
    max-width: 12ch;
    margin-bottom: 18px;
    font-size: clamp(40px, 6vw, 64px);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .page-hero-subtitle {
    max-width: 28ch;
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

.intro {
  background: $white;

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: stretch;

    @media (min-width: 960px) {
      grid-template-columns: 1.1fr 0.9fr;
      gap: 48px;
    }
  }

  .intro-copy {
    .intro-title {
      margin-bottom: 20px;
      font-size: clamp(28px, 4vw, 40px);
      letter-spacing: -0.03em;
      color: $gray-900;
    }

    .intro-desc {
      color: $gray-600;
      font-size: 18px;
      line-height: 1.8;
    }
  }

  .intro-panel {
    position: relative;
    overflow: hidden;
    min-height: 280px;
    border-radius: 28px;
    background: linear-gradient(160deg, #1b2a44 0%, #0d1524 100%);
    display: flex;
    align-items: flex-end;
    padding: 28px;

    .intro-panel-glow {
      position: absolute;
      inset: -20% auto auto 20%;
      width: 240px;
      height: 240px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba($primary-color, 0.35), transparent 70%);
    }

    .intro-panel-note {
      position: relative;
      z-index: 1;
      color: $gray-300;
      font-size: 14px;
      line-height: 1.7;
    }
  }
}

.values {
  background: $gray-50;

  .values-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.value-card {
  padding: 28px;
  border-radius: $border-radius-xl;
  background: $white;
  border: 1px solid $gray-100;
  box-shadow: $shadow-soft;

  .value-card-title {
    margin-bottom: 12px;
    font-size: 22px;
    color: $gray-900;
  }

  .value-card-desc {
    color: $gray-600;
    font-size: 15px;
    line-height: 1.7;
  }
}

.milestones {
  background: $white;

  .milestones-list {
    display: grid;
    gap: 16px;
  }
}

.milestone-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid $gray-200;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .milestone-item-year {
    color: $primary-dark;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .milestone-item-text {
    color: $gray-700;
    font-size: 17px;
    line-height: 1.7;
  }
}
</style>
