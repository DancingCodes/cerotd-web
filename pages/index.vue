<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-media" aria-hidden="true">
        <img class="hero-media-image" src="/images/factory/tank-farm.png" alt="" />
      </div>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="container hero-content hero-rise">
        <p class="hero-badge">{{ $t('home.badge') }}</p>
        <h1 class="hero-title">{{ $t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ $t('home.hero.subtitle') }}</p>
        <div class="hero-actions">
          <NuxtLink to="/products" class="btn btn-primary">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-secondary">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
        </div>
        <ul class="hero-trust">
          <li class="hero-trust-item">{{ $t('home.hero.trust1') }}</li>
          <li class="hero-trust-item">{{ $t('home.hero.trust2') }}</li>
          <li class="hero-trust-item">{{ $t('home.hero.trust3') }}</li>
        </ul>
      </div>
    </section>

    <section class="proof" aria-label="Company stats">
      <div class="container proof-grid">
        <div v-for="n in 4" :key="n" class="proof-item">
          <p class="proof-value">{{ $t(`home.stats.item${n}.value`) }}</p>
          <p class="proof-label">{{ $t(`home.stats.item${n}.label`) }}</p>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section products">
      <div class="container">
        <div class="section-top">
          <div class="section-copy">
            <h2 class="section-title">{{ $t('home.products.title') }}</h2>
            <p class="section-subtitle">{{ $t('home.products.subtitle') }}</p>
          </div>
          <NuxtLink to="/products" class="section-link">{{ $t('common.viewProducts') }}</NuxtLink>
        </div>
        <div class="products-grid">
          <NuxtLink v-for="item in featuredProducts" :key="item.slug" :to="`/products/${item.slug}`" class="product-card">
            <div class="product-card-media">
              <img
                class="product-card-image"
                :class="{ 'product-card-image-cover': !(item.coverUrl || item.images[0]) }"
                :src="item.coverUrl || item.images[0] || '/images/factory/plant.png'"
                :alt="lt(item.name)"
              />
            </div>
            <div class="product-card-body">
              <h3 class="product-card-title">{{ lt(item.name) }}</h3>
              <p class="product-card-desc">{{ lt(item.summary) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section factory">
      <div class="container factory-grid">
        <div class="factory-media">
          <img class="factory-media-image" src="/images/factory/plant.png" alt="Cerotd plant" />
        </div>
        <div class="factory-copy">
          <h2 class="section-title">{{ $t('home.factory.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.factory.subtitle') }}</p>
          <ul class="factory-points">
            <li v-for="n in 3" :key="n" class="factory-point">{{ $t(`home.factory.point${n}`) }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section services">
      <div class="container">
        <div class="section-copy section-copy-light">
          <h2 class="section-title">{{ $t('home.services.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.services.subtitle') }}</p>
        </div>
        <div class="services-list">
          <article v-for="(item, index) in services" :key="item.name" class="service-row">
            <p class="service-row-index">0{{ index + 1 }}</p>
            <h3 class="service-row-title">{{ item.name }}</h3>
            <p class="service-row-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section advantages">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.advantages.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.advantages.subtitle') }}</p>
        </div>
        <div class="advantages-grid">
          <article v-for="(item, index) in advantages" :key="item.name" class="advantage-card">
            <div class="advantage-media">
              <img class="advantage-media-image" :src="advantageImages[index]" :alt="item.name" />
            </div>
            <div class="advantage-card-body">
              <h3 class="advantage-card-title">{{ item.name }}</h3>
              <p class="advantage-card-desc">{{ item.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section partners">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.partners.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.partners.subtitle') }}</p>
        </div>
        <div class="partners-grid">
          <div v-for="logo in partnerLogos" :key="logo" class="partner-slot">
            <img class="partner-logo" :src="logo" alt="Partner logo" />
          </div>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="cta">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-copy">
            <h2 class="cta-title">{{ $t('home.cta.title') }}</h2>
            <p class="cta-subtitle">{{ $t('home.cta.subtitle') }}</p>
          </div>
          <NuxtLink to="/contact" class="btn btn-light">{{ $t('home.cta.button') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
const { t, locale } = useI18n()
const lt = useLocalized()

usePageSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  path: '/'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Cerotd',
        url: useSiteUrl(),
        logo: `${useSiteUrl()}/logo.png`
      })
    }
  ]
})

type Localized = { en: string; zh: string }
type ProductItem = {
  slug: string
  name: Localized
  summary: Localized
  coverUrl: string | null
  images: string[]
}

const { data: productsData } = await useFetch<{ items: ProductItem[] }>('/api/products', {
  key: 'home-products'
})
const featuredProducts = computed(() => (productsData.value?.items || []).slice(0, 3))

const partnerLogos = [
  '/images/partners/partner-1.png',
  '/images/partners/partner-2.png',
  '/images/partners/partner-3.png',
  '/images/partners/partner-4.png'
]

const advantageImages = [
  '/images/factory/tank-farm.png',
  '/images/factory/plant.png',
  '/images/factory/plant.png',
  '/images/factory/tank-farm.png'
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
    position: relative;
    min-height: 78vh;
    display: flex;
    align-items: flex-end;
    padding: 140px 0 72px;
    overflow: hidden;
    color: #ffffff;
    background: var(--color-ink);

    .hero-media {
      position: absolute;
      inset: 0;

      .hero-media-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 40%;
        transform: scale(1.04);
        filter: saturate(0.78) contrast(1.05);
      }
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(7, 11, 18, 0.88) 0%, rgba(7, 11, 18, 0.72) 42%, rgba(7, 11, 18, 0.34) 100%),
        linear-gradient(180deg, rgba(7, 11, 18, 0.28) 0%, rgba(7, 11, 18, 0.78) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 720px;
    }

    .hero-badge {
      margin-bottom: 20px;
      color: var(--color-metal);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .hero-title {
      margin-bottom: 18px;
      max-width: 11ch;
      font-size: 64px;
      font-weight: 600;
      line-height: 1.02;
      letter-spacing: -0.045em;
    }

    .hero-subtitle {
      max-width: 34ch;
      margin-bottom: 28px;
      color: rgba(#ffffff, 0.78);
      font-size: 18px;
      line-height: 1.7;
      font-weight: 400;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 28px;
    }

    .hero-trust {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .hero-trust-item {
        padding: 8px 12px;
        border: 1px solid rgba(#ffffff, 0.16);
        border-radius: 999px;
        background: rgba(#ffffff, 0.04);
        color: rgba(#ffffff, 0.82);
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.04em;
      }
    }
  }

  .hero-rise {
    .hero-badge,
    .hero-title,
    .hero-subtitle,
    .hero-actions,
    .hero-trust {
      opacity: 0;
      transform: translateY(16px);
      animation: hero-rise 0.7s ease forwards;
    }

    .hero-title { animation-delay: 0.06s; }
    .hero-subtitle { animation-delay: 0.12s; }
    .hero-actions { animation-delay: 0.18s; }
    .hero-trust { animation-delay: 0.24s; }
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
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.01em;
    text-decoration: none;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }

  .btn.btn-primary {
    background: #ffffff;
    color: var(--color-ink);

    &:hover { background: #e8eef3; }
  }

  .btn.btn-secondary {
    background: transparent;
    border: 1px solid rgba(#ffffff, 0.28);
    color: #ffffff;

    &:hover { border-color: rgba(#ffffff, 0.55); background: rgba(#ffffff, 0.04); }
  }

  .btn.btn-light {
    background: #ffffff;
    color: var(--color-ink);

    &:hover { background: #e8eef3; }
  }

  .proof {
    background: #ffffff;
    border-bottom: 1px solid var(--color-line);

    .proof-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .proof-item {
      padding: 28px 0;
      border-right: 1px solid var(--color-line);

      &:nth-child(2n) { padding-left: 24px; }

      @media (min-width: 900px) {
        padding: 34px 24px 34px 0;

        &:nth-child(2n) { padding-left: 24px; }
        &:not(:first-child) { padding-left: 24px; }
      }

      &:last-child { border-right: 0; }

      .proof-value {
        margin-bottom: 6px;
        color: var(--color-text);
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -0.03em;
      }

      .proof-label {
        color: var(--color-muted);
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.02em;
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
      color: var(--color-text);
      font-size: 40px;
      font-weight: 600;
      line-height: 1.12;
      letter-spacing: -0.035em;
    }

    .section-subtitle {
      color: var(--color-muted);
      font-size: 17px;
      line-height: 1.7;
    }
  }

  .section-copy.section-copy-light {
    margin-bottom: 40px;

    .section-title { color: #ffffff; }
    .section-subtitle { color: rgba(#ffffff, 0.62); }
  }

  .section-link {
    color: var(--color-accent);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.02em;
  }

  .products {
    background: var(--color-surface);

    .products-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
      @media (min-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
    }

    .product-card {
      overflow: hidden;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid #e1e4e8;
      text-decoration: none;
      transition: border-color 0.25s ease, transform 0.25s ease;

      &:hover {
        border-color: #c9cfd6;
        transform: translateY(-2px);
      }

      .product-card-media {
        aspect-ratio: 4 / 3;
        background: #eef0f3;
        overflow: hidden;

        .product-card-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: #eef0f3;
        }

        .product-card-image.product-card-image-cover {
          object-fit: cover;
          filter: saturate(0.8) contrast(1.05);
        }
      }

      .product-card-body {
        padding: 22px;

        .product-card-title {
          margin-bottom: 8px;
          color: var(--color-text);
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .product-card-desc {
          color: var(--color-muted);
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
      border-radius: 18px;
      background: #e8edf2;
      min-height: 320px;

      .factory-media-image {
        width: 100%;
        height: 100%;
        min-height: 320px;
        object-fit: cover;
        display: block;
        filter: saturate(0.82) contrast(1.04);
      }
    }

    .section-title {
      margin-bottom: 14px;
      color: var(--color-text);
      font-size: 40px;
      font-weight: 600;
      line-height: 1.12;
      letter-spacing: -0.035em;
    }

    .section-subtitle {
      color: var(--color-muted);
      font-size: 17px;
      line-height: 1.7;
    }

    .factory-points {
      margin-top: 28px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .factory-point {
      padding-top: 14px;
      border-top: 1px solid var(--color-line);
      color: #3d4654;
      font-size: 16px;
      line-height: 1.7;
    }
  }

  .services {
    background: var(--color-ink);

    .services-list { display: flex; flex-direction: column; }

    .service-row {
      display: grid;
      grid-template-columns: 48px 1fr;
      gap: 10px 18px;
      padding: 28px 0;
      border-top: 1px solid rgba(#ffffff, 0.1);

      @media (min-width: 800px) {
        grid-template-columns: 64px 0.85fr 1.15fr;
        gap: 40px;
        align-items: baseline;
      }

      &:last-child { border-bottom: 1px solid rgba(#ffffff, 0.1); }

      .service-row-index {
        color: var(--color-metal);
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.08em;
      }

      .service-row-title {
        color: #ffffff;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }

      .service-row-desc {
        grid-column: 2 / -1;
        color: rgba(#ffffff, 0.62);
        font-size: 16px;
        line-height: 1.7;

        @media (min-width: 800px) {
          grid-column: auto;
        }
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
      border-radius: 18px;
      background: var(--color-surface);
      border: 1px solid var(--color-line);

      .advantage-media {
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: #dfe3e8;

        .advantage-media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.8) contrast(1.05);
        }
      }

      .advantage-card-body {
        padding: 22px;
      }

      .advantage-card-title {
        margin-bottom: 8px;
        color: var(--color-text);
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }

      .advantage-card-desc {
        color: var(--color-muted);
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }

  .partners {
    background: var(--color-surface);

    .partners-grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;

      @media (min-width: 900px) { grid-template-columns: repeat(4, 1fr); }
    }

    .partner-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 92px;
      padding: 16px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid #e1e4e8;

      .partner-logo {
        max-width: 120px;
        max-height: 48px;
        object-fit: contain;
        display: block;
        filter: grayscale(1) contrast(1.05);
        opacity: 0.78;
      }
    }
  }

  .cta {
    padding: 0 0 96px;
    background: var(--color-surface);

    .cta-panel {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 40px 28px;
      border-radius: 18px;
      background: var(--color-ink);
      color: #ffffff;
      border: 1px solid rgba(#ffffff, 0.06);

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 48px 40px;
      }

      .cta-title {
        margin-bottom: 10px;
        font-size: 32px;
        font-weight: 600;
        letter-spacing: -0.03em;
      }

      .cta-subtitle {
        max-width: 560px;
        color: rgba(#ffffff, 0.62);
        font-size: 16px;
        line-height: 1.7;
      }
    }
  }

  @media (max-width: 767px) {
    .hero {
      min-height: 86vh;
      padding: 120px 0 56px;
      align-items: flex-end;

      .hero-title {
        max-width: none;
        font-size: 42px;
      }

      .hero-subtitle { font-size: 16px; }
    }

    .section-copy .section-title,
    .factory .section-title { font-size: 32px; }
  }
}
</style>
