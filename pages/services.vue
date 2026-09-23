<template>
  <div class="services-page">
    <section class="page-hero">
      <div class="container">
        <p class="page-hero-kicker">{{ $t('common.services') }}</p>
        <h1 class="page-hero-title">{{ $t('services.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('services.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section list">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('services.list.title') }}</h2>
        </div>
        <div class="services-grid">
          <article v-for="(item, index) in list" :key="item.name" class="service-card">
            <div class="service-card-index">0{{ index + 1 }}</div>
            <h3 class="service-card-title">{{ item.name }}</h3>
            <p class="service-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section process">
      <div class="container">
        <div class="section-header section-header-light">
          <h2 class="section-title">{{ $t('services.process.title') }}</h2>
        </div>
        <div class="process-grid">
          <article v-for="item in processSteps" :key="item.step" class="process-card">
            <div class="process-card-step">{{ item.step }}</div>
            <h3 class="process-card-title">{{ item.name }}</h3>
            <p class="process-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const list = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`services.list.items.item${n}.name`),
    desc: t(`services.list.items.item${n}.desc`)
  }))
})

const processSteps = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    step: t(`services.process.items.item${n}.step`),
    name: t(`services.process.items.item${n}.name`),
    desc: t(`services.process.items.item${n}.desc`)
  }))
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.page-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 20% 0%, rgba($primary-light, 0.14), transparent 28%),
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
    max-width: 30ch;
    color: $gray-300;
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
  margin-bottom: 48px;

  .section-title {
    font-size: clamp(28px, 4vw, 40px);
    letter-spacing: -0.03em;
    color: $gray-900;
  }
}

.section-header-light {
  .section-title {
    color: $white;
  }
}

.list {
  background: $white;

  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    @media (min-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.service-card {
  padding: 28px;
  border-radius: 24px;
  background: $gray-50;
  border: 1px solid $gray-100;

  .service-card-index {
    margin-bottom: 24px;
    color: $primary-dark;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .service-card-title {
    margin-bottom: 12px;
    font-size: 24px;
    color: $gray-900;
    letter-spacing: -0.02em;
  }

  .service-card-desc {
    color: $gray-600;
    font-size: 15px;
    line-height: 1.7;
  }
}

.process {
  background: $dark-bg;

  .process-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 900px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.process-card {
  padding: 24px;
  border-radius: 20px;
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.08);

  .process-card-step {
    margin-bottom: 28px;
    color: $primary-light;
    font-size: 14px;
    font-weight: 700;
  }

  .process-card-title {
    margin-bottom: 10px;
    color: $white;
    font-size: 20px;
  }

  .process-card-desc {
    color: $gray-400;
    font-size: 14px;
    line-height: 1.7;
  }
}
</style>
