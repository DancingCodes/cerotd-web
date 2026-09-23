<template>
  <div class="home-page">
    <div class="hero">
      <div class="container hero-grid">
        <div class="hero-copy hero-rise">
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

        <div class="hero-panel hero-rise hero-rise-delay">
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

    <div v-motion-slide-visible-once-bottom class="section products">
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

    <div v-motion-slide-visible-once-bottom class="section services">
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

    <div v-motion-slide-visible-once-bottom class="section advantages">
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

    <div v-motion-slide-visible-once-bottom class="cta">
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

const productLinks = ['gas-5w30', 'diesel-15w40', 'atf-vi', 'gear-85w140', 'coolant-organic', 'hydraulic-aw46', 'grease-lithium']

const products = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6, 7].map((n) => ({
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

<style lang="scss" scoped>
.home-page {
  background: #ffffff;

  .hero {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 74px);
    display: flex;
    align-items: center;
    padding: 48px 0;
    background:
      radial-gradient(circle at 12% 18%, rgba(#5fd0dc, 0.2), transparent 30%),
      radial-gradient(circle at 88% 12%, rgba(#1aa6b8, 0.14), transparent 26%),
      linear-gradient(160deg, #0b1220 0%, #162033 48%, #0b1220 100%);
    color: #ffffff;

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 36px;
      align-items: center;
      width: 100%;

      @media (min-width: 980px) {
        grid-template-columns: 1.05fr 0.95fr;
        gap: 48px;
      }
    }

    .hero-copy {
      .hero-badge {
        display: inline-flex;
        margin-bottom: 24px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid rgba(#5fd0dc, 0.35);
        background: rgba(#1aa6b8, 0.12);
        color: #b7f3f8;
        font-size: 13px;
        font-weight: 600;
      }

      .hero-title {
        max-width: 18ch;
        margin-bottom: 20px;
        font-size: 52px;
        line-height: 1.08;
        font-weight: 700;
        letter-spacing: -0.03em;
      }

      .hero-subtitle {
        max-width: 42ch;
        margin-bottom: 32px;
        color: #c8ced6;
        font-size: 18px;
        line-height: 1.7;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-bottom: 36px;
      }

      .hero-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;

        @media (min-width: 720px) {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .hero-stats-item {
          padding: 16px 14px;
          border-radius: 18px;
          background: rgba(#ffffff, 0.04);
          border: 1px solid rgba(#ffffff, 0.08);

          .hero-stats-value {
            margin-bottom: 6px;
            color: #5fd0dc;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1;
          }

          .hero-stats-label {
            color: #9aa3af;
            font-size: 13px;
            line-height: 1.4;
          }
        }
      }
    }

    .hero-panel {
      position: relative;

      .hero-panel-glow {
        position: absolute;
        inset: 10% 8% auto;
        height: 55%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(#3dd6e0, 0.28), transparent 70%);
        filter: blur(18px);
        pointer-events: none;
      }

      .hero-panel-card {
        position: relative;
        padding: 28px;
        border-radius: 32px;
        background:
          linear-gradient(180deg, rgba(#ffffff, 0.08), rgba(#ffffff, 0.03));
        border: 1px solid rgba(#ffffff, 0.12);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(10px);

        .hero-panel-title {
          margin-bottom: 10px;
          font-size: 24px;
          letter-spacing: -0.02em;
        }

        .hero-panel-desc {
          margin-bottom: 18px;
          color: #c8ced6;
          font-size: 15px;
          line-height: 1.7;
        }

        .hero-panel-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;

          .hero-panel-tag {
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(#1aa6b8, 0.16);
            color: #b7f3f8;
            font-size: 12px;
            font-weight: 650;
          }
        }

        .hero-panel-list {
          display: grid;
          gap: 10px;

          .hero-panel-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 16px;
            border-radius: 16px;
            background: rgba(#0b1220, 0.45);
            border: 1px solid rgba(#ffffff, 0.06);

            .hero-panel-item-index {
              color: #5fd0dc;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 0.06em;
            }

            .hero-panel-item-name {
              color: #ffffff;
              font-size: 15px;
              font-weight: 600;
            }
          }
        }
      }
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

  .btn.btn-primary {
    background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
    color: #ffffff;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 30px rgba(#1aa6b8, 0.28);
    }
  }

  .btn.btn-secondary {
    border: 1px solid rgba(#ffffff, 0.18);
    background: rgba(#ffffff, 0.06);
    color: #ffffff;

    &:hover {
      background: rgba(#ffffff, 0.12);
    }
  }

  .btn.btn-light {
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
      font-size: 40px;
      line-height: 1.15;
      letter-spacing: -0.03em;
    }

    .section-subtitle {
      color: #4b5563;
      font-size: 18px;
      line-height: 1.7;
    }
  }

  .section-header.section-header-light {
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
        grid-template-columns: repeat(5, 1fr);
      }
    }

    .product-card {
      overflow: hidden;
      border-radius: 28px;
      background: #ffffff;
      border: 1px solid rgba(#e2e6eb, 0.9);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      text-decoration: none;
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

    .service-card {
      padding: 28px;
      border-radius: 28px;
      background: rgba(#ffffff, 0.04);
      border: 1px solid rgba(#ffffff, 0.08);
      transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        background: rgba(#ffffff, 0.06);
        border-color: rgba(#ffffff, 0.14);
      }

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

    .advantage-card {
      padding: 32px;
      border-radius: 28px;
      background: #f7f8fa;
      border: 1px solid #eef1f4;
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
      }

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
        font-size: 36px;
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
}
</style>
