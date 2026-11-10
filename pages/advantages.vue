<template>
  <div>
  <section
    class="bg-[radial-gradient(circle_at_70%_20%,rgba(139,154,171,.14),transparent_28%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
    <UContainer class="max-w-295 px-6">
      <h1 class="mb-4.5 text-[56px] leading-[1.08] tracking-normal">{{ $t('advantages.hero.title') }}</h1>
      <p class="max-w-[34ch] text-[20px] leading-[1.7] text-[#c8ced6]">{{ $t('advantages.hero.subtitle') }}</p>
    </UContainer>
  </section>

  <section class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('advantages.outcomes.title') }}</h2>
        <p class="max-w-[48ch] text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('advantages.outcomes.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
        <article v-for="item in outcomes" :key="item.name"
          class="rounded-xl border border-[#e6e8ec] bg-[#f3f4f6] px-6 py-6.5">
          <h3 class="mb-3 text-[20px] font-bold tracking-normal text-[#0f4c56]">{{ item.name }}</h3>
          <p class="text-[15px] leading-[1.7] text-[#4b5563]">{{ item.desc }}</p>
        </article>
      </div>
    </UContainer>
  </section>

  <section class="bg-[#f3f4f6] py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12 max-w-155">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('advantages.compare.title') }}</h2>
        <p class="text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('advantages.compare.subtitle') }}</p>
      </div>
      <div class="grid">
        <article v-for="item in compare" :key="item.name"
          class="grid grid-cols-1 gap-2.5 border-t border-[#e2e6eb] py-7 last:border-b min-[800px]:grid-cols-[.9fr_1.1fr] min-[800px]:gap-8">
          <h3 class="text-[22px] tracking-normal text-[#111827]">{{ item.name }}</h3>
          <p class="text-[16px] leading-[1.7] text-[#4b5563]">{{ item.desc }}</p>
        </article>
      </div>
    </UContainer>
  </section>

  <section class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12 max-w-155">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('advantages.pillars.title') }}</h2>
        <p class="text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('advantages.pillars.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-1 gap-4.5 min-[900px]:grid-cols-2">
        <article v-for="(item, index) in pillars" :key="item.name"
          class="rounded-xl border border-[#e6e8ec] bg-[#f3f4f6] p-7 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,.1)]">
          <p class="mb-6 text-[13px] font-bold tracking-[.08em] text-[#3f7f88]">0{{ index + 1 }}</p>
          <h3 class="mb-3 text-[24px] tracking-normal text-[#111827]">{{ item.name }}</h3>
          <p class="text-[15px] leading-[1.7] text-[#4b5563]">{{ item.desc }}</p>
        </article>
      </div>
    </UContainer>
  </section>

  <section class="bg-[#070b12] py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12 max-w-155">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-white">{{ $t('advantages.assurance.title') }}</h2>
        <p class="text-[17px] leading-[1.7] text-white/62">{{ $t('advantages.assurance.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-1 gap-3.5 min-[900px]:grid-cols-2">
        <article v-for="(item, index) in assurance" :key="item.name"
          class="rounded-xl border border-white/10 bg-white/4 px-5.5 py-6.5">
          <p class="mb-5.5 text-[13px] font-bold tracking-[.08em] text-[#5fd0dc]">0{{ index + 1 }}</p>
          <h3 class="mb-2.5 text-[22px] tracking-normal text-white">{{ item.name }}</h3>
          <p class="text-[14px] leading-[1.7] text-[#9aa3af]">{{ item.desc }}</p>
        </article>
      </div>
    </UContainer>
  </section>

  <section class="bg-white pt-7 pb-24 md:pt-5 md:pb-30">
    <UContainer class="max-w-295 px-6">
      <div
        class="flex flex-col gap-5.5 rounded-[14px] border border-white/8 bg-[radial-gradient(circle_at_100%_0%,rgba(95,208,220,.18),transparent_34%),linear-gradient(135deg,#102033_0%,#0b1522_100%)] px-7 py-8.5 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:px-11 min-[800px]:py-10">
        <div>
          <h2 class="mb-2.5 text-[30px] font-semibold tracking-normal text-white">{{ $t('advantages.cta.title') }}</h2>
          <p class="max-w-[46ch] text-[16px] leading-[1.7] text-white/70">{{ $t('advantages.cta.subtitle') }}</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <NuxtLink to="/contact"
            class="flex items-center justify-center rounded-full bg-white px-5.5 py-3.5 text-[15px] font-semibold whitespace-nowrap text-[#102033] no-underline">
            {{ $t('advantages.cta.button') }}</NuxtLink>
          <NuxtLink to="/products"
            class="flex items-center justify-center rounded-full border border-white/[.28] bg-transparent px-5.5 py-3.5 text-[15px] font-semibold whitespace-nowrap text-white no-underline">
            {{ $t('advantages.cta.secondary') }}</NuxtLink>
        </div>
      </div>
    </UContainer>
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

const outcomes = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.outcomes.items.item${n}.name`),
    desc: t(`advantages.outcomes.items.item${n}.desc`)
  }))
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

const assurance = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.assurance.items.item${n}.name`),
    desc: t(`advantages.assurance.items.item${n}.desc`)
  }))
})
</script>
