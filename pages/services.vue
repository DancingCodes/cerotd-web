<template>
  <div>
  <section
    class="bg-[radial-gradient(circle_at_20%_0%,rgba(95,208,220,.14),transparent_28%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
    <UContainer class="max-w-295 px-6">
      <h1 class="mb-4.5 text-[56px] leading-[1.08] tracking-normal">{{ $t('services.hero.title') }}</h1>
      <p class="max-w-[30ch] text-[20px] leading-[1.7] text-[#c8ced6]">{{ $t('services.hero.subtitle') }}</p>
    </UContainer>
  </section>

  <section class="bg-[#f3f4f6] py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('services.audience.title') }}</h2>
        <p class="max-w-[48ch] text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('services.audience.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-1 gap-4 min-[900px]:grid-cols-3">
        <article v-for="item in audience" :key="item.name"
          class="rounded-xl border border-[#e6e8ec] bg-white px-6 py-6.5">
          <h3 class="mb-3 text-[20px] font-bold tracking-normal text-[#0f4c56]">{{ item.name }}</h3>
          <p class="text-[15px] leading-[1.7] text-[#4b5563]">{{ item.desc }}</p>
        </article>
      </div>
    </UContainer>
  </section>

  <section class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('services.list.title') }}</h2>
      </div>
      <div class="grid grid-cols-1 gap-4.5 min-[900px]:grid-cols-2">
        <article v-for="(item, index) in list" :key="item.name"
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
      <div class="mb-12">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-white">{{ $t('services.process.title') }}</h2>
        <p class="max-w-[48ch] text-[17px] leading-[1.7] text-[#c8ced6]">{{ $t('services.process.subtitle') }}</p>
      </div>
      <ol class="grid grid-cols-1 gap-3.5 min-[960px]:grid-cols-4 min-[960px]:gap-4.5">
        <li v-for="(item, index) in processSteps" :key="item.step" class="relative flex flex-col">
          <div
            class="h-full rounded-xl border border-white/10 bg-white/4 px-5.5 py-6.5 transition hover:-translate-y-0.75 hover:bg-white/7">
            <p class="mb-7 text-[13px] font-bold tracking-[.08em] text-[#5fd0dc]">{{ item.step }}</p>
            <h3 class="mb-2.5 text-[22px] tracking-normal text-white">{{ item.name }}</h3>
            <p class="text-[14px] leading-[1.7] text-[#9aa3af]">{{ item.desc }}</p>
          </div>
          <span v-if="index < processSteps.length - 1"
            class="absolute top-9.5 -right-3.5 hidden h-0.5 w-7 bg-linear-to-r from-[#5fd0dc]/15 to-[#5fd0dc]/75 after:absolute after:-right-px after:top-1/2 after:size-1.5 after:-translate-y-1/2 after:rounded-full after:bg-[#5fd0dc] min-[960px]:block"
            aria-hidden="true"></span>
        </li>
      </ol>
    </UContainer>
  </section>

  <section class="bg-white py-24 md:py-30">
    <UContainer class="max-w-295 px-6">
      <div class="mb-12">
        <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('services.checklist.title') }}</h2>
        <p class="max-w-[48ch] text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('services.checklist.subtitle') }}</p>
      </div>
      <ol class="flex flex-col gap-3">
        <li v-for="(item, index) in checklist" :key="index"
          class="grid grid-cols-[42px_1fr] items-start gap-3.5 rounded-xl border border-[#e6e8ec] bg-[#f3f4f6] px-5 py-4.5">
          <span class="pt-0.5 text-[13px] font-bold tracking-[.08em] text-[#3f7f88]">0{{ index + 1 }}</span>
          <p class="text-[15px] leading-[1.7] text-[#1f2937]">{{ item }}</p>
        </li>
      </ol>
    </UContainer>
  </section>

  <section class="bg-white pt-7 pb-24 md:pt-5 md:pb-30">
    <UContainer class="max-w-295 px-6">
      <div
        class="flex flex-col gap-5.5 rounded-[14px] border border-white/8 bg-[radial-gradient(circle_at_100%_0%,rgba(95,208,220,.18),transparent_34%),linear-gradient(135deg,#102033_0%,#0b1522_100%)] px-7 py-8.5 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:px-11 min-[800px]:py-10">
        <div>
          <h2 class="mb-2.5 text-[30px] font-semibold tracking-normal text-white">{{ $t('services.cta.title') }}</h2>
          <p class="max-w-[42ch] text-[16px] leading-[1.7] text-white/70">{{ $t('services.cta.subtitle') }}</p>
        </div>
        <NuxtLink to="/contact"
          class="flex items-center justify-center rounded-full bg-white px-5.5 py-3.5 text-[15px] font-semibold whitespace-nowrap text-[#102033] no-underline">
          {{ $t('services.cta.button') }}</NuxtLink>
      </div>
    </UContainer>
  </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

usePageSeo({
  title: t('seo.services.title'),
  description: t('seo.services.description'),
  path: '/services'
})

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

const audience = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`services.audience.items.item${n}.name`),
    desc: t(`services.audience.items.item${n}.desc`)
  }))
})

const checklist = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5].map((n) => t(`services.checklist.items.item${n}`))
})
</script>
