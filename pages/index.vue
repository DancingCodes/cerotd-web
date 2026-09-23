<template>
  <div class="home-page">
    <div class="hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <div class="hero-badge">{{ $t('home.badge') }}</div>
        <div class="hero-title">{{ $t('home.hero.title') }}</div>
        <div class="hero-subtitle">{{ $t('home.hero.subtitle') }}</div>
        <div class="hero-actions">
          <NuxtLink to="/products" class="btn btn-primary">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-secondary">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
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
          <div
            v-for="(item, index) in products"
            :key="item.name"
            class="product-card"
          >
            <div class="product-card-visual">
              <div class="product-card-index">0{{ index + 1 }}</div>
            </div>
            <div class="product-card-body">
              <div class="product-card-title">{{ item.name }}</div>
              <div class="product-card-desc">{{ item.desc }}</div>
              <NuxtLink to="/products" class="product-card-link">{{ $t('common.learnMore') }}</NuxtLink>
            </div>
          </div>
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
          <div
            v-for="(item, index) in services"
            :key="item.name"
            class="service-card"
          >
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
          <div
            v-for="item in advantages"
            :key="item.name"
            class="advantage-card"
          >
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

const products = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`home.products.items.item${n}.name`),
    desc: t(`home.products.items.item${n}.desc`)
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

<style lang="scss" scoped>
.home-page {
  background: #ffffff;
}

.hero {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 74px);
  display: flex;
  align-items: center;
  background:
    radial-gradient(circle at 20% 20%, rgba(#5fd0dc, 0.18), transparent 35%),
    radial-gradient(circle at 80% 10%, rgba(#1aa6b8, 0.12), transparent 28%),
    linear-gradient(160deg, #0b1220 0%, #162033 48%, #0b1220 100%);
  color: #ffffff;

  .hero-glow {
    position: absolute;
    inset: auto -10% -20% auto;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(#1aa6b8, 0.28), transparent 68%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
    max-width: 920px;
    padding-top: 72px;
    padding-bottom: 72px;
  }

  .hero-badge {
    display: inline-flex;
    margin-bottom: 28px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(#5fd0dc, 0.35);
    background: rgba(#1aa6b8, 0.12);
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
    color: #c8ced6;
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
  transition: all 0.25s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
  color: #ffffff;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 30px rgba(#1aa6b8, 0.28);
  }
}

.btn-secondary {
  border: 1px solid rgba(#ffffff, 0.18);
  background: rgba(#ffffff, 0.06);
  color: #ffffff;

  &:hover {
    background: rgba(#ffffff, 0.12);
  }
}

.btn-light {
  background: #ffffff;
  color: #0e7f8f;

  &:hover {
    transform: translateY(-1px);
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
  margin: 0 auto 64px;
  text-align: center;

  .section-title {
    margin-bottom: 16px;
    color: #111827;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  .section-subtitle {
    color: #4b5563;
    font-size: 18px;
    line-height: 1.7;
  }
}

.section-header-light {
  .section-title {
    color: #ffffff;
  }

  .section-subtitle {
    color: #c8ced6;
  }
}

.products {
  background: #f7f8fa;

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
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid rgba(#e2e6eb, 0.9);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16);
  }

  .product-card-visual {
    aspect-ratio: 1 / 0.85;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 24px;
    background:
      linear-gradient(160deg, rgba(#1aa6b8, 0.18), transparent 42%),
      linear-gradient(180deg, #203049 0%, #0f1728 100%);

    .product-card-index {
      color: rgba(#ffffff, 0.28);
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
      color: #111827;
      font-size: 20px;
      letter-spacing: -0.02em;
    }

    .product-card-desc {
      margin-bottom: 18px;
      color: #4b5563;
      font-size: 15px;
      line-height: 1.7;
      min-height: 76px;
    }

    .product-card-link {
      color: #0e7f8f;
      font-size: 14px;
      font-weight: 650;
    }
  }
}

.services {
  background: #0b1220;

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
  border-radius: 28px;
  background: rgba(#ffffff, 0.04);
  border: 1px solid rgba(#ffffff, 0.08);

  .service-card-index {
    margin-bottom: 28px;
    color: #5fd0dc;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .service-card-title {
    margin-bottom: 12px;
    color: #ffffff;
    font-size: 24px;
    letter-spacing: -0.02em;
  }

  .service-card-desc {
    color: #9aa3af;
    font-size: 15px;
    line-height: 1.7;
  }
}

.advantages {
  background: #ffffff;

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
  border-radius: 28px;
  background: #f7f8fa;
  border: 1px solid #eef1f4;

  .advantage-card-title {
    margin-bottom: 12px;
    color: #111827;
    font-size: 22px;
    letter-spacing: -0.02em;
  }

  .advantage-card-desc {
    color: #4b5563;
    font-size: 15px;
    line-height: 1.7;
  }
}

.cta {
  padding: 0 0 96px;
  background: #ffffff;

  .cta-panel {
    padding: 64px 28px;
    border-radius: 32px;
    text-align: center;
    background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
    color: #ffffff;

    .cta-title {
      margin-bottom: 14px;
      font-size: clamp(28px, 4vw, 42px);
      letter-spacing: -0.03em;
    }

    .cta-subtitle {
      max-width: 640px;
      margin: 0 auto 28px;
      color: rgba(#ffffff, 0.92);
      font-size: 17px;
      line-height: 1.7;
    }
  }
}
</style>
