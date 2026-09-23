<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="hero-badge">
          <span>{{ $t('home.badge') }}</span>
        </div>

        <h1 class="hero-title">
          {{ $t('home.hero.title') }}
        </h1>

        <p class="hero-subtitle">
          {{ $t('home.hero.subtitle') }}
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary">
            {{ $t('home.hero.cta_primary') }}
          </button>
          <button class="btn btn-secondary">
            {{ $t('home.hero.cta_secondary') }}
          </button>
        </div>
      </div>

      <div class="hero-scroll">
        <svg class="hero-scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.products.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.products.subtitle') }}</p>
        </div>

        <div class="products-grid">
          <div v-for="i in 4" :key="i" class="product-card">
            <div class="product-image">
              <span class="product-number">0{{ i }}</span>
            </div>
            <div class="product-content">
              <h3 class="product-title">{{ $t(`home.products.product${i}.name`) }}</h3>
              <p class="product-desc">{{ $t(`home.products.product${i}.desc`) }}</p>
              <a href="#" class="product-link">
                <span>{{ $t('home.products.learn_more') }}</span>
                <svg class="product-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="technology">
      <div class="container">
        <div class="technology-grid">
          <div class="technology-content">
            <h2 class="technology-title">{{ $t('home.technology.title') }}</h2>
            <p class="technology-subtitle">{{ $t('home.technology.subtitle') }}</p>

            <div class="technology-features">
              <div v-for="i in 3" :key="i" class="tech-feature">
                <div class="tech-feature-number">0{{ i }}</div>
                <div class="tech-feature-content">
                  <h4 class="tech-feature-title">{{ $t(`home.technology.feature${i}.title`) }}</h4>
                  <p class="tech-feature-desc">{{ $t(`home.technology.feature${i}.desc`) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="technology-visual">
            <div class="technology-visual-box"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Applications Section -->
    <section class="applications">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.applications.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.applications.subtitle') }}</p>
        </div>

        <div class="applications-grid">
          <div v-for="i in 6" :key="i" class="app-card">
            <div class="app-icon">
              <svg class="app-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="app-title">{{ $t(`home.applications.app${i}.name`) }}</h3>
            <p class="app-desc">{{ $t(`home.applications.app${i}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="partners">
      <div class="container">
        <h2 class="partners-title">{{ $t('home.partners.title') }}</h2>
        <div class="partners-grid">
          <div v-for="i in 6" :key="i" class="partner-logo">
            <span>LOGO</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">{{ $t('home.cta.title') }}</h2>
          <p class="cta-subtitle">{{ $t('home.cta.subtitle') }}</p>
          <button class="btn btn-white">
            {{ $t('home.cta.button') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.home-page {
  min-height: 100vh;
  background: $gray-50;
}

// Hero Section
.hero {
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, $dark-bg 0%, $dark-bg-light 50%, $dark-bg 100%);
  color: $white;
  overflow: hidden;
  @include flex-center;

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .hero-content {
    position: relative;
    @include container;
    max-width: 48rem;
    z-index: 10;
  }

  .hero-badge {
    display: inline-block;
    background: rgba($primary-color, 0.2);
    backdrop-filter: blur(8px);
    border: 1px solid rgba($primary-color, 0.3);
    border-radius: 32px;
    padding: 8px 16px;
    margin-bottom: 24px;

    span {
      font-size: 14px;
      font-weight: 500;
      color: #93c5fd;
    }
  }

  .hero-title {
    font-size: 60px;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 24px;

    @media (min-width: 768px) {
      font-size: 72px;
    }
  }

  .hero-subtitle {
    font-size: 20px;
    line-height: 1.75;
    color: $gray-300;
    margin-bottom: 40px;

    @media (min-width: 768px) {
      font-size: 24px;
    }
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-scroll {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;

    .hero-scroll-icon {
      width: 24px;
      height: 24px;
      color: rgba($white, 0.6);
    }
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

// Buttons
.btn {
  padding: 16px 32px;
  border-radius: $border-radius-lg;
  font-weight: 600;
  font-size: 16px;
  transition: $transition;

  &.btn-primary {
    background: $primary-color;
    color: $white;

    &:hover {
      background: $primary-dark;
      transform: scale(1.05);
    }
  }

  &.btn-secondary {
    background: rgba($white, 0.1);
    backdrop-filter: blur(8px);
    color: $white;
    border: 1px solid rgba($white, 0.2);

    &:hover {
      background: rgba($white, 0.2);
    }
  }

  &.btn-white {
    background: $white;
    color: $primary-color;
    font-size: 18px;
    padding: 16px 40px;

    &:hover {
      background: $gray-100;
      transform: scale(1.05);
    }
  }
}

// Section Header
.section-header {
  text-align: center;
  margin-bottom: 64px;

  .section-title {
    font-size: 40px;
    color: $gray-900;
    margin-bottom: 16px;

    @media (min-width: 768px) {
      font-size: 48px;
    }
  }

  .section-subtitle {
    font-size: 20px;
    color: $gray-600;
    max-width: 672px;
    margin: 0 auto;
  }
}

// Products Section
.products {
  padding: 96px 0;
  background: $white;

  .products-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.product-card {
  background: $gray-50;
  border-radius: $border-radius-lg;
  overflow: hidden;
  @include hover-lift;

  .product-image {
    aspect-ratio: 1 / 1;
    background: linear-gradient(135deg, #334155 0%, $dark-bg 100%);
    @include flex-center;

    .product-number {
      font-size: 64px;
      font-weight: 700;
      color: rgba($white, 0.2);
    }
  }

  .product-content {
    padding: 24px;

    .product-title {
      font-size: 20px;
      color: $gray-900;
      margin-bottom: 8px;
    }

    .product-desc {
      color: $gray-600;
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .product-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: $primary-color;
      font-weight: 600;
      transition: gap 0.3s ease;

      &:hover {
        gap: 12px;
      }

      .product-link-icon {
        width: 16px;
        height: 16px;
      }
    }
  }
}

// Technology Section
.technology {
  padding: 96px 0;
  background: $dark-bg;
  color: $white;

  .technology-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
    align-items: center;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .technology-content {
    .technology-title {
      font-size: 40px;
      margin-bottom: 24px;

      @media (min-width: 768px) {
        font-size: 48px;
      }
    }

    .technology-subtitle {
      font-size: 20px;
      color: $gray-300;
      margin-bottom: 32px;
    }

    .technology-features {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }

  .technology-visual {
    .technology-visual-box {
      aspect-ratio: 1 / 1;
      background: linear-gradient(135deg, rgba($primary-color, 0.5) 0%, rgba($dark-bg, 0.5) 100%);
      border-radius: $border-radius-lg;
      border: 1px solid rgba($primary-color, 0.2);
    }
  }
}

.tech-feature {
  display: flex;
  gap: 16px;

  .tech-feature-number {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: $primary-color;
    border-radius: $border-radius-lg;
    @include flex-center;
    font-size: 20px;
    font-weight: 700;
  }

  .tech-feature-content {
    .tech-feature-title {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .tech-feature-desc {
      color: $gray-400;
      line-height: 1.6;
    }
  }
}

// Applications Section
.applications {
  padding: 96px 0;
  background: $gray-50;

  .applications-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.app-card {
  background: $white;
  border-radius: $border-radius-lg;
  padding: 32px;
  transition: $transition;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .app-icon {
    width: 64px;
    height: 64px;
    background: #dbeafe;
    border-radius: $border-radius-lg;
    @include flex-center;
    margin-bottom: 16px;

    .app-icon-svg {
      width: 32px;
      height: 32px;
      color: $primary-color;
    }
  }

  .app-title {
    font-size: 20px;
    color: $gray-900;
    margin-bottom: 8px;
  }

  .app-desc {
    color: $gray-600;
    line-height: 1.6;
  }
}

// Partners Section
.partners {
  padding: 96px 0;
  background: $white;
  text-align: center;

  .partners-title {
    font-size: 30px;
    font-weight: 700;
    color: $gray-900;
    margin-bottom: 48px;
  }

  .partners-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
}

.partner-logo {
  height: 64px;
  background: $gray-200;
  border-radius: $border-radius-lg;
  @include flex-center;
  opacity: 0.6;

  span {
    color: $gray-400;
    font-weight: 600;
  }
}

// CTA Section
.cta {
  padding: 96px 0;
  background: $primary-color;
  color: $white;

  .cta-content {
    text-align: center;

    .cta-title {
      font-size: 40px;
      margin-bottom: 24px;

      @media (min-width: 768px) {
        font-size: 48px;
      }
    }

    .cta-subtitle {
      font-size: 20px;
      margin-bottom: 40px;
      max-width: 672px;
      margin-left: auto;
      margin-right: auto;
      opacity: 0.9;
    }
  }
}
</style>
