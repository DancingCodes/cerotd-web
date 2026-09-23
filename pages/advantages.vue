<template>
  <div class="advantages-page">
    <section class="page-hero page-hero-rise">
      <div class="container">
        <h1 class="page-hero-title">{{ $t('advantages.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('advantages.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section pillars">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('advantages.pillars.title') }}</h2>
        </div>
        <div class="pillars-grid">
          <article v-for="(item, index) in pillars" :key="item.name" class="pillar-card">
            <p class="pillar-card-index">0{{ index + 1 }}</p>
            <h3 class="pillar-card-title">{{ item.name }}</h3>
            <p class="pillar-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section compare">
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
const { t, locale } = useI18n()

usePageSeo({
  title: t('seo.advantages.title'),
  description: t('seo.advantages.description'),
  path: '/advantages'
})

const pillars = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.pillars.items.item${n}.name`),
    desc: t(`advantages.pillars.items.item${n}.desc`)
  }))
})

const compare = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`advantages.compare.items.item${n}.name`),
    desc: t(`advantages.compare.items.item${n}.desc`)
  }))
})
</script>

<style lang="scss" scoped>
.advantages-page {
  .page-hero-rise {
    .page-hero-title,
    .page-hero-subtitle {
      opacity: 0;
      transform: translateY(18px);
      animation: page-hero-rise 0.7s ease forwards;
    }

    .page-hero-subtitle {
      animation-delay: 0.1s;
    }
  }

  @keyframes page-hero-rise {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .page-hero {
    padding: 88px 0 72px;
    background:
      radial-gradient(circle at 70% 20%, rgba(#1aa6b8, 0.16), transparent 28%),
      linear-gradient(180deg, #0b1220 0%, #162033 100%);
    color: #ffffff;


    .page-hero-title {
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.08;
      letter-spacing: -0.03em;
    }

    .page-hero-subtitle {
      max-width: 32ch;
      color: #c8ced6;
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
      font-size: 36px;
      letter-spacing: -0.03em;
      color: #111827;
    }
  }

  .pillars {
    background: #f7f8fa;

    .pillars-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .pillar-card {
      padding: 28px;
      border-radius: 24px;
      background: #ffffff;
      border: 1px solid #eef1f4;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
      }

      .pillar-card-index {
        margin-bottom: 24px;
        color: #0e7f8f;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      .pillar-card-title {
        margin-bottom: 12px;
        font-size: 24px;
        color: #111827;
      }

      .pillar-card-desc {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }



  .compare {
    background: #ffffff;

    .compare-list {
      display: grid;
      gap: 0;
    }

    .compare-item {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 28px 0;
      border-top: 1px solid #e2e6eb;

      @media (min-width: 800px) {
        grid-template-columns: 0.9fr 1.1fr;
        gap: 32px;
        align-items: start;
      }

      .compare-item-title {
        font-size: 22px;
        color: #111827;
        letter-spacing: -0.02em;
      }

      .compare-item-desc {
        color: #4b5563;
        font-size: 16px;
        line-height: 1.7;
      }
    }
  }


}
</style>
