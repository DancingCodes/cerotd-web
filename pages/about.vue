<template>
  <div>
  <section
    class="bg-[radial-gradient(circle_at_15%_20%,rgba(95,208,220,.16),transparent_30%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
    <UContainer class="max-w-295 px-6">
      <h1 class="mb-4.5 max-w-[12ch] text-[56px] leading-[1.08] tracking-normal">{{ $t('about.hero.title') }}</h1>
      <p class="max-w-[28ch] text-[20px] leading-[1.7] text-[#c8ced6]">{{ $t('about.hero.subtitle') }}</p>
    </UContainer>
  </section>

  <section class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 grid grid-cols-1 gap-8 px-6 md:gap-10">
      <div class="min-w-0 overflow-hidden rounded-[14px] bg-[#0d1524]">
        <video class="block aspect-video w-full rounded-[14px] object-cover" src="/video/about.mp4" autoplay muted loop
          playsinline controls preload="metadata"></video>
      </div>
      <div>
        <h2 class="mb-5 text-[36px] tracking-normal text-[#111827]">{{ $t('about.intro.title') }}</h2>
        <p class="text-[18px] leading-[1.8] text-[#4b5563]">{{ $t('about.intro.p1') }}</p>
        <p class="mt-4 text-[18px] leading-[1.8] text-[#4b5563]">{{ $t('about.intro.p2') }}</p>
        <p class="mt-4 text-[18px] leading-[1.8] text-[#4b5563]">{{ $t('about.intro.p3') }}</p>
      </div>
    </UContainer>
  </section>

  <section class="bg-[#f3f4f6] py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('about.values.title') }}</h2>
      </div>
      <div class="grid grid-cols-1 gap-4.5 min-[900px]:grid-cols-3">
        <article v-for="item in values" :key="item.name"
          class="rounded-[14px] border border-[#e6e8ec] bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,.12)]">
          <h3 class="mb-3 text-[22px] tracking-normal text-[#111827]">{{ item.name }}</h3>
          <p class="text-[15px] leading-[1.7] text-[#4b5563]">{{ item.desc }}</p>
        </article>
      </div>
    </UContainer>
  </section>

  <section class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12 max-w-155">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('about.stats.title') }}</h2>
      </div>
      <div class="grid grid-cols-2 gap-3 min-[900px]:grid-cols-4 min-[900px]:gap-4.5">
        <div v-for="n in 4" :key="n"
          class="min-w-0 rounded-xl border border-[#e8edf2] bg-[#f3f4f6] px-3.5 py-5 transition hover:-translate-y-0.75 hover:bg-[#eef2f6] min-[900px]:px-6 min-[900px]:py-7">
          <p
            class="mb-2.5 wrap-break-word text-[26px] leading-[1.15] font-bold tracking-normal text-[#0f4c56] min-[900px]:text-[36px] min-[900px]:leading-none">
            {{ $t(`about.stats.item${n}.value`) }}</p>
          <p class="text-[13px] text-[#4b5563] min-[900px]:text-[15px]">{{ $t(`about.stats.item${n}.label`) }}</p>
        </div>
      </div>
    </UContainer>
  </section>

  <section class="bg-[#f3f4f6] py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12 max-w-155">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('about.trust.title') }}</h2>
        <p class="max-w-[52ch] text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('about.trust.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-2 gap-3.5 min-[900px]:grid-cols-3 min-[900px]:gap-4">
        <article v-for="item in trustItems" :key="item.name"
          class="rounded-xl border border-[#e8edf2] bg-white px-5 py-5.5 transition hover:-translate-y-0.75 hover:border-[#cfd8e3]">
          <p class="mb-2 text-[16px] font-bold tracking-normal text-[#0f4c56]">{{ item.name }}</p>
          <p class="text-[14px] leading-[1.6] text-[#4b5563]">{{ item.desc }}</p>
        </article>
      </div>
    </UContainer>
  </section>

  <section id="certificates" class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12 max-w-155">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('about.certificates.title') }}</h2>
        <p class="text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('about.certificates.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 min-[1100px]:grid-cols-4">
        <button v-for="(item, index) in certificateItems" :key="item.src" type="button"
          class="block w-full cursor-pointer rounded-xl border border-[#e8edf2] bg-[#f3f4f6] p-3.5 transition hover:-translate-y-0.75 hover:border-[#cfd8e3] hover:shadow-[0_12px_28px_rgba(15,23,42,.08)]"
          @click="openCertificate(index)">
          <img class="block aspect-3/4 w-full rounded-xl bg-white object-contain" :src="item.src" :alt="item.alt"
            loading="lazy" decoding="async" />
        </button>
      </div>
    </UContainer>
  </section>

  <ImageLightbox v-model:open="certificatePreviewOpen" v-model:index="certificatePreviewIndex"
    :items="certificateItems" />


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


const trustItems = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6].map((n) => ({
    name: t(`about.trust.items.item${n}.name`),
    desc: t(`about.trust.items.item${n}.desc`)
  }))
})

const certificateItems = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    src: `/images/certificate/${n}.webp`,
    alt: t('about.certificates.alt', { n })
  }))
})

const certificatePreviewOpen = ref(false)
const certificatePreviewIndex = ref(0)

function openCertificate(index: number) {
  certificatePreviewIndex.value = index
  certificatePreviewOpen.value = true
}


</script>
