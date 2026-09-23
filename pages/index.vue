<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <div class="hero-badge">{{ $t('home.badge') }}</div>
        <h1 class="hero-title">{{ $t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ $t('home.hero.subtitle') }}</p>
        <div class="hero-actions">
          <NuxtLink to="/products" class="btn btn-primary">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-secondary">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section products">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.products.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.products.subtitle') }}</p>
        </div>
        <div class="products-grid">
          <article
            v-for="(item, index) in products"
            :key="item.name"
            class="product-card"
          >
            <div class="product-card-visual">
              <span class="product-card-index">0{{ index + 1 }}</span>
            </div>
            <div class="product-card-body">
              <h3 class="product-card-title">{{ item.name }}</h3>
              <p class="product-card-desc">{{ item.desc }}</p>
              <NuxtLink to="/products" class="product-card-link">{{ $t('common.learnMore') }}</NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section services">
      <div class="container">
        <div class="section-header section-header-light">
          <h2 class="section-title">{{ $t('home.services.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.services.subtitle') }}</p>
        </div>
        <div class="services-grid">
          <article
            v-for="(item, index) in services"
            :key="item.name"
            class="service-card"
          >
            <div class="service-card-index">0{{ index + 1 }}</div>
            <h3 class="service-card-title">{{ item.name }}</h3>
            <p class="service-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section advantages">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.advantages.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.advantages.subtitle') }}</p>
        </div>
        <div class="advantages-grid">
          <article
            v-for="item in advantages"
            :key="item.name"
            class="advantage-card"
          >
            <h3 class="advantage-card-title">{{ item.name }}</h3>
            <p class="advantage-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta-panel">
          <h2 class="cta-title">{{ $t('home.cta.title') }}</h2>
          <p class="cta-subtitle">{{ $t('home.cta.subtitle') }}</p>
          <NuxtLink to="/contact" class="btn btn-light">{{ $t('home.cta.button') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { tm } = useI18n()

const products = computed(() => tm('home.products.items') || [])
const services = computed(() => tm('home.services.items') || [])
const advantages = computed(() => tm('home.advantages.items') || [])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.home-page {
  background: $white;
}

.hero {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 74px);
  display: flex;
  align-items: center;
  background:
    radial-gradient(circle at 20% 20%, rgba($primary-light, 0.18), transparent 35%),
    radial-gradient(circle at 80% 10%, rgba($primary-color, 0.12), transparent 28%),
    linear-gradient(160deg, $dark-bg 0%, $dark-bg-light 48%, $dark-bg 100%);
  color: $white;

  .hero-glow {
    position: absolute;
    inset: auto -10% -20% auto;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($primary-color, 0.28), transparent 68%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    @include container;
    max-width: 920px;
    padding-top: 72px;
    padding-bottom: 72px;
  }

  .hero-badge {
    display: inline-flex;
    margin-bottom: 28px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba($primary-light, 0.35);
    background: rgba($primary-color, 0.12);
    color: #b7f3f8;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .hero-title {
    max-width: 16ch;
    margin-bottom: 24px;
    font-size: clamp(40px, 7vw, 72px);
    line-height: 1.08;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .hero-subtitle {
    max-width: 34ch;
    margin-bottom: 40px;
    color: $gray-300;
    font-size: clamp(18px, 2.2vw, 22px);
    line-height: 1.7;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 650;
  transition: $transition;
}

.btn-primary {
  background: $accent-gradient;
  color: $white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 30px rgba($primary-color, 0.28);
  }
}

.btn-secondary {
  border: 1px solid rgba($white, 0.18);
  background: rgba($white, 0.06);
  color: $white;

  &:hover {
    background: rgba($white, 0.12);
  }
}

.btn-light {
  background: $white;
  color: $primary-dark;

  &:hover {
    transform: translateY(-1px);
  }
}

.section {
  @include section-space;
}

.section-header {
  max-width: 720px;
  margin: 0 auto 64px;
  text-align: center;

  .section-title {
    margin-bottom: 16px;
    color: $gray-900;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  .section-subtitle {
    color: $gray-600;
    font-size: 18px;
    line-height: 1.7;
  }
}

.section-header-light {
  .section-title {
    color: $white;
  }

  .section-subtitle {
    color: $gray-300;
  }
}

.products {
  background: $gray-50;

  .products-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1100px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.product-card {
  overflow: hidden;
  border-radius: $border-radius-xl;
  background: $white;
  border: 1px solid rgba($gray-200, 0.9);
  box-shadow: $shadow-soft;
  @include hover-lift;

  .product-card-visual {
    aspect-ratio: 1 / 0.85;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 24px;
    background:
      linear-gradient(160deg, rgba($primary-color, 0.18), transparent 42%),
      linear-gradient(180deg, #203049 0%, #0f1728 100%);

    .product-card-index {
      color: rgba($white, 0.28);
      font-size: 56px;
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
    }
  }

  .product-card-body {
    padding: 24px;

    .product-card-title {
      margin-bottom: 10px;
      color: $gray-900;
      font-size: 20px;
      letter-spacing: -0.02em;
    }

    .product-card-desc {
      margin-bottom: 18px;
      color: $gray-600;
      font-size: 15px;
      line-height: 1.7;
      min-height: 76px;
    }

    .product-card-link {
      color: $primary-dark;
      font-size: 14px;
      font-weight: 650;
    }
  }
}

.services {
  background: $dark-bg;

  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.service-card {
  padding: 28px;
  border-radius: $border-radius-xl;
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.08);

  .service-card-index {
    margin-bottom: 28px;
    color: $primary-light;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .service-card-title {
    margin-bottom: 12px;
    color: $white;
    font-size: 24px;
    letter-spacing: -0.02em;
  }

  .service-card-desc {
    color: $gray-400;
    font-size: 15px;
    line-height: 1.7;
  }
}

.advantages {
  background: $white;

  .advantages-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.advantage-card {
  padding: 32px;
  border-radius: $border-radius-xl;
  background: $gray-50;
  border: 1px solid $gray-100;

  .advantage-card-title {
    margin-bottom: 12px;
    color: $gray-900;
    font-size: 22px;
    letter-spacing: -0.02em;
  }

  .advantage-card-desc {
    color: $gray-600;
    font-size: 15px;
    line-height: 1.7;
  }
}

.cta {
  padding: 0 0 96px;
  background: $white;

  .cta-panel {
    padding: 64px 28px;
    border-radius: 32px;
    text-align: center;
    background: $accent-gradient;
    color: $white;

    .cta-title {
      margin-bottom: 14px;
      font-size: clamp(28px, 4vw, 42px);
      letter-spacing: -0.03em;
    }

    .cta-subtitle {
      max-width: 640px;
      margin: 0 auto 28px;
      color: rgba($white, 0.92);
      font-size: 17px;
      line-height: 1.7;
    }
  }
}
</style>
