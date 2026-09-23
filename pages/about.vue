<template>
  <div class="about-page">
    <div class="page-hero page-hero-rise">
      <div class="container">
        <div class="page-hero-title">{{ $t('about.hero.title') }}</div>
        <div class="page-hero-subtitle">{{ $t('about.hero.subtitle') }}</div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section intro">
      <div class="container intro-grid">
        <div class="intro-copy">
          <div class="intro-title">{{ $t('about.intro.title') }}</div>
          <div class="intro-desc">{{ $t('about.intro.p1') }}</div>
          <div class="intro-desc">{{ $t('about.intro.p2') }}</div>
          <div class="intro-desc">{{ $t('about.intro.p3') }}</div>
        </div>
        <div class="intro-panel">
          <video
            class="intro-panel-video"
            src="https://cdn.dancingcodes.cn/files/2026-09/0801a9d1-c139-49ca-92b8-16a1ce7514e8.mp4"
            autoplay
            muted
            loop
            playsinline
            controls
          ></video>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section stats">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('about.stats.title') }}</div>
        </div>
        <div class="stats-grid">
          <div v-for="n in 4" :key="n" class="stats-item">
            <div class="stats-item-value">{{ $t(`about.stats.item${n}.value`) }}</div>
            <div class="stats-item-label">{{ $t(`about.stats.item${n}.label`) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section values">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('about.values.title') }}</div>
        </div>
        <div class="values-grid">
          <div v-for="item in values" :key="item.name" class="value-card">
            <div class="value-card-title">{{ item.name }}</div>
            <div class="value-card-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section milestones">
      <div class="container">
        <div class="section-header">
          <div class="section-title">{{ $t('about.milestones.title') }}</div>
        </div>
        <div class="milestones-list">
          <div v-for="item in milestones" :key="item.year" class="milestone-item">
            <div class="milestone-item-year">{{ item.year }}</div>
            <div class="milestone-item-text">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const values = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`about.values.items.item${n}.name`),
    desc: t(`about.values.items.item${n}.desc`)
  }))
})

const milestones = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    year: t(`about.milestones.items.item${n}.year`),
    text: t(`about.milestones.items.item${n}.text`)
  }))
})
</script>

<style lang="scss" scoped>
.about-page {
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
      radial-gradient(circle at 15% 20%, rgba(#5fd0dc, 0.16), transparent 30%),
      linear-gradient(180deg, #0b1220 0%, #162033 100%);
    color: #ffffff;


    .page-hero-title {
      max-width: 12ch;
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.08;
      letter-spacing: -0.03em;
    }

    .page-hero-subtitle {
      max-width: 28ch;
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

  .intro {
    background: #ffffff;

    .intro-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      align-items: start;

      @media (min-width: 960px) {
        grid-template-columns: 1.1fr 0.9fr;
        gap: 48px;
      }
    }

    .intro-copy {
      .intro-title {
        margin-bottom: 20px;
        font-size: 36px;
        letter-spacing: -0.03em;
        color: #111827;
      }

      .intro-desc {
        color: #4b5563;
        font-size: 18px;
        line-height: 1.8;

        & + .intro-desc {
          margin-top: 16px;
        }
      }
    }

    .intro-panel {
      min-width: 0;
      overflow: hidden;
      border-radius: 28px;
      background: #0d1524;

      .intro-panel-video {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
      }
    }
  }

  .stats {
    background: #0b1220;

    .section-header {
      .section-title {
        color: #ffffff;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .stats-item {
      padding: 28px 24px;
      border-radius: 24px;
      background: rgba(#ffffff, 0.04);
      border: 1px solid rgba(#ffffff, 0.08);
      transition: transform 0.25s ease, background 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        background: rgba(#ffffff, 0.07);
      }

      .stats-item-value {
        margin-bottom: 10px;
        color: #5fd0dc;
        font-size: 40px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1;
      }

      .stats-item-label {
        color: #c8ced6;
        font-size: 15px;
        line-height: 1.5;
      }
    }
  }

  .values {
    background: #f7f8fa;

    .values-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .value-card {
      padding: 28px;
      border-radius: 28px;
      background: #ffffff;
      border: 1px solid #eef1f4;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
      }

      .value-card-title {
        margin-bottom: 12px;
        font-size: 22px;
        color: #111827;
      }

      .value-card-desc {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }

  .milestones {
    background: #ffffff;

    .milestones-list {
      display: grid;
      gap: 16px;
    }

    .milestone-item {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 20px;
      padding: 24px 0;
      border-top: 1px solid #e2e6eb;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .milestone-item-year {
        color: #0e7f8f;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .milestone-item-text {
        color: #374151;
        font-size: 17px;
        line-height: 1.7;
      }
    }
  }
}
</style>
