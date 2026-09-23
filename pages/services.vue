<template>
  <div class="services-page">
    <div class="page-hero page-hero-rise">
      <div class="container">
        <div class="page-hero-title">{{ $t('services.hero.title') }}</div>
        <div class="page-hero-subtitle">{{ $t('services.hero.subtitle') }}</div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section list">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('services.list.title') }}</div>
        </div>
        <div class="services-grid">
          <div v-for="(item, index) in list" :key="item.name" class="service-card">
            <div class="service-card-index">0{{ index + 1 }}</div>
            <div class="service-card-title">{{ item.name }}</div>
            <div class="service-card-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section process">
      <div class="container">
        <div class="section-header section-header-light">
          <div class="section-title">{{ $t('services.process.title') }}</div>
        </div>
        <div class="process-grid">
          <div v-for="item in processSteps" :key="item.step" class="process-card">
            <div class="process-card-step">{{ item.step }}</div>
            <div class="process-card-title">{{ item.name }}</div>
            <div class="process-card-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
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
.services-page {
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
      radial-gradient(circle at 20% 0%, rgba(#5fd0dc, 0.14), transparent 28%),
      linear-gradient(180deg, #0b1220 0%, #162033 100%);
    color: #ffffff;


    .page-hero-title {
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.08;
      letter-spacing: -0.03em;
    }

    .page-hero-subtitle {
      max-width: 30ch;
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

  .section-header.section-header-light {
    .section-title {
      color: #ffffff;
    }
  }

  .list {
    background: #ffffff;

    .services-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .service-card {
      padding: 28px;
      border-radius: 24px;
      background: #f7f8fa;
      border: 1px solid #eef1f4;
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
      }

      .service-card-index {
        margin-bottom: 24px;
        color: #0e7f8f;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      .service-card-title {
        margin-bottom: 12px;
        font-size: 24px;
        color: #111827;
        letter-spacing: -0.02em;
      }

      .service-card-desc {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }



  .process {
    background: #0b1220;

    .process-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .process-card {
      padding: 24px;
      border-radius: 20px;
      background: rgba(#ffffff, 0.04);
      border: 1px solid rgba(#ffffff, 0.08);
      transition: transform 0.25s ease, background 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        background: rgba(#ffffff, 0.07);
      }

      .process-card-step {
        margin-bottom: 28px;
        color: #5fd0dc;
        font-size: 14px;
        font-weight: 700;
      }

      .process-card-title {
        margin-bottom: 10px;
        color: #ffffff;
        font-size: 20px;
      }

      .process-card-desc {
        color: #9aa3af;
        font-size: 14px;
        line-height: 1.7;
      }
    }
  }


}
</style>
