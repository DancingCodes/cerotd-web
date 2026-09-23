<template>
  <div class="home-page">
    <div class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="hero-badge">{{ $t('home.badge') }}</div>
          <div class="hero-title">{{ $t('home.hero.title') }}</div>
          <div class="hero-subtitle">{{ $t('home.hero.subtitle') }}</div>
          <div class="hero-actions">
            <NuxtLink to="/products" class="btn btn-primary">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
            <NuxtLink to="/contact" class="btn btn-secondary">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
          </div>
          <div class="hero-stats">
            <div v-for="n in 4" :key="n" class="hero-stats-item">
              <div class="hero-stats-value">{{ $t(`home.stats.item${n}.value`) }}</div>
              <div class="hero-stats-label">{{ $t(`home.stats.item${n}.label`) }}</div>
            </div>
          </div>
        </div>

        <div class="hero-panel">
          <div class="hero-panel-glow"></div>
          <div class="hero-panel-card">
            <div class="hero-panel-title">{{ $t('home.hero.panelTitle') }}</div>
            <div class="hero-panel-desc">{{ $t('home.hero.panelDesc') }}</div>
            <div class="hero-panel-tags">
              <div class="hero-panel-tag">{{ $t('home.hero.panelTag1') }}</div>
              <div class="hero-panel-tag">{{ $t('home.hero.panelTag2') }}</div>
              <div class="hero-panel-tag">{{ $t('home.hero.panelTag3') }}</div>
            </div>
            <div class="hero-panel-list">
              <div v-for="(item, index) in products" :key="item.name" class="hero-panel-item">
                <div class="hero-panel-item-index">0{{ index + 1 }}</div>
                <div class="hero-panel-item-name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section products">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('home.products.title') }}</div>
          <div class="section-subtitle">{{ $t('home.products.subtitle') }}</div>
        </div>
        <div class="products-grid">
          <NuxtLink v-for="(item, index) in products" :key="item.name" :to="item.to" class="product-card">
            <div class="product-card-visual">
              <div class="product-card-index">0{{ index + 1 }}</div>
            </div>
            <div class="product-card-body">
              <div class="product-card-title">{{ item.name }}</div>
              <div class="product-card-desc">{{ item.desc }}</div>
              <div class="product-card-link">{{ $t('common.learnMore') }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="section services">
      <div class="container">
        <div class="section-header section-header-light">
          <div class="section-title">{{ $t('home.services.title') }}</div>
          <div class="section-subtitle">{{ $t('home.services.subtitle') }}</div>
        </div>
        <div class="services-grid">
          <div v-for="(item, index) in services" :key="item.name" class="service-card">
            <div class="service-card-index">0{{ index + 1 }}</div>
            <div class="service-card-title">{{ item.name }}</div>
            <div class="service-card-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section advantages">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('home.advantages.title') }}</div>
          <div class="section-subtitle">{{ $t('home.advantages.subtitle') }}</div>
        </div>
        <div class="advantages-grid">
          <div v-for="item in advantages" :key="item.name" class="advantage-card">
            <div class="advantage-card-title">{{ item.name }}</div>
            <div class="advantage-card-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="cta">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-title">{{ $t('home.cta.title') }}</div>
          <div class="cta-subtitle">{{ $t('home.cta.subtitle') }}</div>
          <NuxtLink to="/contact" class="btn btn-light">{{ $t('home.cta.button') }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const productLinks = ['gas-5w30', 'diesel-15w40', 'atf-vi', 'gear-85w140', 'coolant-organic']

const products = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5].map((n) => ({
    name: t(`home.products.items.item${n}.name`),
    desc: t(`home.products.items.item${n}.desc`),
    to: `/products/${productLinks[n - 1]}`
  }))
})

const services = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`home.services.items.item${n}.name`),
    desc: t(`home.services.items.item${n}.desc`)
  }))
})

const advantages = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`home.advantages.items.item${n}.name`),
    desc: t(`home.advantages.items.item${n}.desc`)
  }))
})
</script>

