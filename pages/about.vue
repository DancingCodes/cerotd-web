<template>
  <div class="about-page">
    <section class="page-hero page-hero-rise">
      <div class="container">
        <h1 class="page-hero-title">{{ $t('about.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section intro">
      <div class="container intro-stack">
        <div class="intro-panel">
          <video
            class="intro-panel-video"
            src="/cdn/videos/about-intro.mp4"
            autoplay
            muted
            loop
            playsinline
            controls
            preload="metadata"
          ></video>
        </div>
        <div class="intro-copy">
          <h2 class="intro-title">{{ $t('about.intro.title') }}</h2>
          <p class="intro-desc">{{ $t('about.intro.p1') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p2') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p3') }}</p>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section trust">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.trust.title') }}</h2>
          <p class="section-subtitle">{{ $t('about.trust.subtitle') }}</p>
        </div>
        <div class="trust-grid">
          <article v-for="item in trustItems" :key="item.name" class="trust-card">
            <p class="trust-card-name">{{ item.name }}</p>
            <p class="trust-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section gallery">
      <div class="container">
        <div class="section-header section-header-light">
          <h2 class="section-title">{{ $t('about.gallery.title') }}</h2>
          <p class="section-subtitle">{{ $t('about.gallery.subtitle') }}</p>
        </div>

        <div
          class="gallery-stage"
          @mouseenter="pauseGallery"
          @mouseleave="resumeGallery"
        >
          <div class="gallery-viewport">
            <div
              class="gallery-track"
              :style="{ transform: `translateX(-${galleryIndex * 100}%)` }"
            >
              <figure
                v-for="(slide, index) in gallerySlides"
                :key="`gallery-${index}`"
                class="gallery-slide"
              >
                <AppImage
                  v-if="slide.src"
                  class="gallery-slide-image"
                  :src="slide.src"
                  :alt="slide.title"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                  decoding="async"
                />
                <div v-else class="gallery-slide-blank">
                  <span>{{ $t('about.gallery.blank') }}</span>
                </div>
                <figcaption class="gallery-slide-caption">
                  <p class="gallery-slide-title">{{ slide.title }}</p>
                  <p class="gallery-slide-desc">{{ slide.desc }}</p>
                </figcaption>
              </figure>
            </div>
          </div>

          <button
            type="button"
            class="gallery-nav gallery-nav-prev"
            :aria-label="$t('common.prev')"
            @click="prevSlide"
          >
            ‹
          </button>
          <button
            type="button"
            class="gallery-nav gallery-nav-next"
            :aria-label="$t('common.next')"
            @click="nextSlide"
          >
            ›
          </button>

          <div class="gallery-dots" role="tablist" :aria-label="$t('about.gallery.title')">
            <button
              v-for="(slide, index) in gallerySlides"
              :key="`dot-${index}`"
              type="button"
              class="gallery-dot"
              :class="{ 'gallery-dot-active': index === galleryIndex }"
              :aria-label="slide.title"
              :aria-selected="index === galleryIndex"
              @click="goSlide(index)"
            />
          </div>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section stats">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.stats.title') }}</h2>
        </div>
        <div class="stats-grid">
          <div v-for="n in 4" :key="n" class="stats-item">
            <p class="stats-item-value">{{ $t(`about.stats.item${n}.value`) }}</p>
            <p class="stats-item-label">{{ $t(`about.stats.item${n}.label`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section values">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.values.title') }}</h2>
        </div>
        <div class="values-grid">
          <article v-for="item in values" :key="item.name" class="value-card">
            <h3 class="value-card-title">{{ item.name }}</h3>
            <p class="value-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section milestones">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.milestones.title') }}</h2>
        </div>
        <ol class="milestones-list">
          <li v-for="item in milestones" :key="item.year" class="milestone-item">
            <p class="milestone-item-year">{{ item.year }}</p>
            <p class="milestone-item-text">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  path: '/about'
})

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

const trustItems = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6].map((n) => ({
    name: t(`about.trust.items.item${n}.name`),
    desc: t(`about.trust.items.item${n}.desc`)
  }))
})

const gallerySlides = computed(() => {
  locale.value
  // Keep src empty for now; replace with real factory photos later.
  return [1, 2, 3, 4, 5, 6].map((n) => ({
    src: '',
    title: t(`about.gallery.items.item${n}.title`),
    desc: t(`about.gallery.items.item${n}.desc`)
  }))
})

const galleryIndex = ref(0)
let galleryTimer: ReturnType<typeof setInterval> | null = null

function goSlide(index: number) {
  const total = gallerySlides.value.length
  if (!total) return
  galleryIndex.value = (index + total) % total
}

function nextSlide() {
  goSlide(galleryIndex.value + 1)
}

function prevSlide() {
  goSlide(galleryIndex.value - 1)
}

function pauseGallery() {
  if (galleryTimer) {
    clearInterval(galleryTimer)
    galleryTimer = null
  }
}

function resumeGallery() {
  pauseGallery()
  if (gallerySlides.value.length < 2) return
  galleryTimer = setInterval(() => {
    nextSlide()
  }, 4500)
}

onMounted(() => {
  resumeGallery()
})

onBeforeUnmount(() => {
  pauseGallery()
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
      linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
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
      margin-bottom: 14px;
      font-size: 36px;
      letter-spacing: -0.03em;
      color: #111827;
    }

    .section-subtitle {
      max-width: 52ch;
      color: #4b5563;
      font-size: 17px;
      line-height: 1.7;
    }
  }

  .section-header.section-header-light {
    .section-title,
    .section-subtitle {
      color: #ffffff;
    }

    .section-subtitle {
      color: #c8ced6;
    }
  }

  .intro {
    background: #ffffff;

    .intro-stack {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;

      @media (min-width: 768px) {
        gap: 40px;
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

  .trust {
    background: var(--color-surface);

    .trust-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
    }

    .trust-card {
      padding: 22px 20px;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid #e8edf2;
      transition: transform 0.25s ease, border-color 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        border-color: #cfd8e3;
      }

      .trust-card-name {
        margin-bottom: 8px;
        color: #0f4c56;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }

      .trust-card-desc {
        color: #4b5563;
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }

  .gallery {
    background: var(--color-ink);

    .gallery-stage {
      position: relative;
    }

    .gallery-viewport {
      overflow: hidden;
      border-radius: 28px;
      border: 1px solid rgba(#ffffff, 0.08);
      background: #0d1524;
    }

    .gallery-track {
      display: flex;
      transition: transform 0.55s ease;
    }

    .gallery-slide {
      position: relative;
      flex: 0 0 100%;
      min-width: 100%;
      margin: 0;

      .gallery-slide-image {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
        filter: saturate(0.9) contrast(1.04);
      }

      .gallery-slide-blank {
        width: 100%;
        aspect-ratio: 16 / 9;
        display: flex;
        align-items: center;
        justify-content: center;
        background:
          linear-gradient(135deg, rgba(#8b9aab, 0.12), transparent 42%),
          #121a28;
        color: #8b95a5;
        font-size: 13px;
        font-weight: 650;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }


      .gallery-slide-caption {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 28px 24px 24px;
        background: linear-gradient(180deg, transparent 0%, rgba(7, 12, 20, 0.82) 100%);
      }

      .gallery-slide-title {
        margin-bottom: 6px;
        color: #ffffff;
        font-size: 22px;
        font-weight: 650;
        letter-spacing: -0.02em;
      }

      .gallery-slide-desc {
        color: #c8ced6;
        font-size: 14px;
        line-height: 1.6;
        max-width: 46ch;
      }
    }

    .gallery-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 42px;
      height: 42px;
      border-radius: 999px;
      background: rgba(#ffffff, 0.14);
      color: #ffffff;
      font-size: 28px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background: rgba(#ffffff, 0.22);
      }
    }

    .gallery-nav.gallery-nav-prev {
      left: 14px;
    }

    .gallery-nav.gallery-nav-next {
      right: 14px;
    }

    .gallery-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 18px;
    }

    .gallery-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: rgba(#ffffff, 0.28);
      cursor: pointer;
      transition: width 0.2s ease, background-color 0.2s ease;
    }

    .gallery-dot.gallery-dot-active {
      width: 22px;
      background: #5fd0dc;
    }
  }

  .stats {
    background: #ffffff;

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
      background: var(--color-surface);
      border: 1px solid #e8edf2;
      transition: transform 0.25s ease, background 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        background: #eef2f6;
      }

      .stats-item-value {
        margin-bottom: 10px;
        color: #0f4c56;
        font-size: 36px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1;
      }

      .stats-item-label {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.5;
      }
    }
  }

  .values {
    background: var(--color-surface);

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
      border: 1px solid var(--color-line);
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
        color: var(--color-accent);
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
