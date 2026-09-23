<template>
  <div class="home-page">
    <div class="hero">
      <div class="container hero-grid hero-rise">
        <div class="hero-copy">
          <div class="hero-badge">{{ $t('home.badge') }}</div>
          <div class="hero-title">{{ $t('home.hero.title') }}</div>
          <div class="hero-subtitle">{{ $t('home.hero.subtitle') }}</div>
          <div class="hero-actions">
            <NuxtLink to="/products" class="btn btn-primary">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
            <NuxtLink to="/contact" class="btn btn-secondary">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
          </div>
        </div>
        <div class="hero-visual">
          <img class="hero-visual-image" src="/images/factory/tank-farm.png" alt="Cerotd tank farm" />
        </div>
      </div>
    </div>

    <div class="proof">
      <div class="container proof-grid">
        <div v-for="n in 4" :key="n" class="proof-item">
          <div class="proof-value">{{ $t(`home.stats.item${n}.value`) }}</div>
          <div class="proof-label">{{ $t(`home.stats.item${n}.label`) }}</div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section products">
      <div class="container">
        <div class="section-top">
          <div class="section-copy">
            <div class="section-title">{{ $t('home.products.title') }}</div>
            <div class="section-subtitle">{{ $t('home.products.subtitle') }}</div>
          </div>
          <NuxtLink to="/products" class="section-link">{{ $t('common.viewProducts') }}</NuxtLink>
        </div>
        <div class="products-grid">
          <NuxtLink v-for="item in featuredProducts" :key="item.slug" :to="`/products/${item.slug}`" class="product-card">
            <div class="product-card-media">
              <img v-if="item.images[0]" class="product-card-image" :src="item.images[0]" :alt="$t(`products.catalog.${item.slug}.name`)" />
              <div v-else class="media-blank">
                <div class="media-blank-label">{{ $t('common.mediaBlank') }}</div>
              </div>
            </div>
            <div class="product-card-body">
              <div class="product-card-title">{{ $t(`products.catalog.${item.slug}.name`) }}</div>
              <div class="product-card-desc">{{ $t(`products.catalog.${item.slug}.summary`) }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section factory">
      <div class="container factory-grid">
        <div class="factory-media">
          <img class="factory-media-image" src="/images/factory/plant.png" alt="Cerotd plant" />
        </div>
        <div class="factory-copy">
          <div class="section-title">{{ $t('home.factory.title') }}</div>
          <div class="section-subtitle">{{ $t('home.factory.subtitle') }}</div>
          <div class="factory-points">
            <div v-for="n in 3" :key="n" class="factory-point">{{ $t(`home.factory.point${n}`) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section services">
      <div class="container">
        <div class="section-copy section-copy-light">
          <div class="section-title">{{ $t('home.services.title') }}</div>
          <div class="section-subtitle">{{ $t('home.services.subtitle') }}</div>
        </div>
        <div class="services-list">
          <div v-for="item in services" :key="item.name" class="service-row">
            <div class="service-row-title">{{ item.name }}</div>
            <div class="service-row-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section advantages">
      <div class="container">
        <div class="section-copy">
          <div class="section-title">{{ $t('home.advantages.title') }}</div>
          <div class="section-subtitle">{{ $t('home.advantages.subtitle') }}</div>
        </div>
        <div class="advantages-grid">
          <div v-for="item in advantages" :key="item.name" class="advantage-card">
            <div class="media-blank advantage-media">
              <div class="media-blank-label">{{ $t('common.mediaBlank') }}</div>
            </div>
            <div class="advantage-card-title">{{ item.name }}</div>
            <div class="advantage-card-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section partners">
      <div class="container">
        <div class="section-copy">
          <div class="section-title">{{ $t('home.partners.title') }}</div>
          <div class="section-subtitle">{{ $t('home.partners.subtitle') }}</div>
        </div>
        <div class="partners-grid">
          <div v-for="logo in partnerLogos" :key="logo" class="partner-slot">
            <img class="partner-logo" :src="logo" alt="Partner logo" />
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="cta">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-copy">
            <div class="cta-title">{{ $t('home.cta.title') }}</div>
            <div class="cta-subtitle">{{ $t('home.cta.subtitle') }}</div>
          </div>
          <NuxtLink to="/contact" class="btn btn-light">{{ $t('home.cta.button') }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

// 临时写死，后续接接口
const featuredProducts = [
  {
    slug: 'antifreeze-g11-green',
    images: ['/images/products/antifreeze-g11-green.png']
  }
]

const partnerLogos = [
  '/images/partners/partner-1.png',
  '/images/partners/partner-2.png',
  '/images/partners/partner-3.png',
  '/images/partners/partner-4.png'
]

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
  .hero {
    padding: 88px 0 72px;
    background: #0b1220;
    color: #ffffff;

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      align-items: center;

      @media (min-width: 960px) {
        grid-template-columns: 1.05fr 0.95fr;
        gap: 48px;
      }
    }

    .hero-visual {
      min-height: 320px;
      aspect-ratio: 4 / 3;
      border-radius: 20px;
      overflow: hidden;
      background: #162033;

      .hero-visual-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    .hero-badge {
      margin-bottom: 18px;
      color: #9fdbe3;
      font-size: 13px;
      font-weight: 650;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .hero-title {
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.05;
      letter-spacing: -0.04em;
    }

    .hero-subtitle {
      max-width: 34ch;
      margin-bottom: 28px;
      color: #d5dbe3;
      font-size: 18px;
      line-height: 1.7;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  }

  .hero-rise {
    .hero-copy,
    .hero-visual {
      opacity: 0;
      transform: translateY(16px);
      animation: hero-rise 0.7s ease forwards;
    }

    .hero-visual { animation-delay: 0.12s; }
  }

  @keyframes hero-rise {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 22px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 650;
    text-decoration: none;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }

  .btn.btn-primary {
    background: #ffffff;
    color: #0b1220;

    &:hover { background: #e8eef3; }
  }

  .btn.btn-secondary {
    background: transparent;
    border: 1px solid rgba(#ffffff, 0.35);
    color: #ffffff;

    &:hover { border-color: rgba(#ffffff, 0.7); }
  }

  .btn.btn-light {
    background: #ffffff;
    color: #0b1220;

    &:hover { background: #e8eef3; }
  }

  .proof {
    background: #ffffff;
    border-bottom: 1px solid #eef1f4;

    .proof-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .proof-item {
      padding: 28px 0;
      border-right: 1px solid #eef1f4;

      &:nth-child(2n) { padding-left: 24px; }

      @media (min-width: 900px) {
        padding: 34px 24px 34px 0;

        &:nth-child(2n) { padding-left: 24px; }
        &:not(:first-child) { padding-left: 24px; }
      }

      &:last-child { border-right: 0; }

      .proof-value {
        margin-bottom: 6px;
        color: #111827;
        font-size: 28px;
        letter-spacing: -0.03em;
      }

      .proof-label {
        color: #6b7280;
        font-size: 14px;
      }
    }
  }

  .section {
    padding: 96px 0;

    @media (min-width: 768px) { padding: 112px 0; }
  }

  .section-top {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  .section-copy {
    max-width: 620px;

    .section-title {
      margin-bottom: 14px;
      color: #111827;
      font-size: 40px;
      line-height: 1.12;
      letter-spacing: -0.03em;
    }

    .section-subtitle {
      color: #4b5563;
      font-size: 17px;
      line-height: 1.7;
    }
  }

  .section-copy.section-copy-light {
    margin-bottom: 40px;

    .section-title { color: #ffffff; }
    .section-subtitle { color: #9aa3af; }
  }

  .section-link {
    color: #0e7f8f;
    font-size: 15px;
    font-weight: 650;
    text-decoration: none;
  }

  .media-blank {
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

  .products {
    background: #f7f8fa;

    .products-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
      @media (min-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
    }

    .product-card {
      overflow: hidden;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid #e8edf2;
      text-decoration: none;
      transition: border-color 0.25s ease;

      &:hover { border-color: #cfd8e3; }

      .product-card-media {
        aspect-ratio: 4 / 3;
        background: #f3f5f7;
        border-bottom: 1px solid #eef1f4;
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
          border: 0;
        }
      }

      .product-card-body {
        padding: 22px;

        .product-card-title {
          margin-bottom: 8px;
          color: #111827;
          font-size: 20px;
          letter-spacing: -0.02em;
        }

        .product-card-desc {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.7;
        }
      }
    }
  }

  .factory {
    background: #ffffff;

    .factory-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      align-items: center;

      @media (min-width: 960px) {
        grid-template-columns: 1.15fr 0.85fr;
        gap: 48px;
      }
    }

    .factory-media {
      overflow: hidden;
      border-radius: 20px;
      background: #e8edf2;
      min-height: 280px;

      .factory-media-image {
        width: 100%;
        height: 100%;
        min-height: 280px;
        object-fit: cover;
        display: block;
      }
    }

    .factory-points {
      margin-top: 28px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .factory-point {
      padding-top: 14px;
      border-top: 1px solid #eef1f4;
      color: #374151;
      font-size: 16px;
      line-height: 1.7;
    }
  }

  .services {
    background: #0b1220;

    .services-list { display: flex; flex-direction: column; }

    .service-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 28px 0;
      border-top: 1px solid rgba(#ffffff, 0.1);

      @media (min-width: 800px) {
        grid-template-columns: 0.9fr 1.1fr;
        gap: 40px;
        align-items: baseline;
      }

      &:last-child { border-bottom: 1px solid rgba(#ffffff, 0.1); }

      .service-row-title {
        color: #ffffff;
        font-size: 24px;
        letter-spacing: -0.02em;
      }

      .service-row-desc {
        color: #9aa3af;
        font-size: 16px;
        line-height: 1.7;
      }
    }
  }

  .advantages {
    background: #ffffff;

    .advantages-grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
    }

    .advantage-card {
      overflow: hidden;
      border-radius: 20px;
      padding: 18px;
      background: #f7f8fa;
      border: 1px solid #eef1f4;

      .advantage-media {
        aspect-ratio: 16 / 9;
        margin-bottom: 18px;
        border-radius: 14px;
      }

      .advantage-card-title {
        margin-bottom: 8px;
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
  }

  .partners {
    background: #f7f8fa;

    .partners-grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;

      @media (min-width: 900px) { grid-template-columns: repeat(6, 1fr); }
    }

    .partner-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 88px;
      padding: 16px;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid #e8edf2;

      .partner-logo {
        max-width: 120px;
        max-height: 48px;
        object-fit: contain;
        display: block;
      }
    }
  }

  .cta {
    padding: 0 0 96px;
    background: #f7f8fa;

    .cta-panel {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 40px 28px;
      border-radius: 20px;
      background: #0b1220;
      color: #ffffff;

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 48px 40px;
      }

      .cta-title {
        margin-bottom: 10px;
        font-size: 32px;
        letter-spacing: -0.03em;
      }

      .cta-subtitle {
        max-width: 560px;
        color: #9aa3af;
        font-size: 16px;
        line-height: 1.7;
      }
    }
  }

  @media (max-width: 767px) {
    .hero {
      padding: 72px 0 56px;

      .hero-title { font-size: 40px; }
      .hero-visual { min-height: 240px; }
    }

    .section-copy .section-title { font-size: 32px; }
  }
}
</style>
