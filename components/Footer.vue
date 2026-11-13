<template>
  <footer class="bg-[#070b12] pt-18 pb-9 text-white">
    <div class="mx-auto w-full max-w-295 px-6">
      <div class="mb-10 grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
        <div>
          <div class="mb-4">
            <img src="/images/logo.webp" alt="Cerotd" class="h-8.5 w-auto" loading="lazy" decoding="async" />
          </div>
          <p class="max-w-70 text-[14px] leading-[1.7] text-white/[.58]">{{ $t('footer.tagline') }}</p>
          <div class="mt-4.5 flex flex-wrap gap-2.5">
            <a class="rounded-full bg-white/6 px-3 py-2 text-[13px] text-white/72 transition-colors hover:bg-white/12 hover:text-white"
              href="https://www.facebook.com/profile.php?id=61575320303094&sk=reels_tab" target="_blank"
              rel="noopener noreferrer">Facebook</a>
            <a class="rounded-full bg-white/6 px-3 py-2 text-[13px] text-white/72 transition-colors hover:bg-white/12 hover:text-white"
              href="https://www.instagram.com/hanxiansheng889/reels/" target="_blank"
              rel="noopener noreferrer">Instagram</a>
            <a class="rounded-full bg-white/6 px-3 py-2 text-[13px] text-white/72 transition-colors hover:bg-white/12 hover:text-white"
              href="https://wa.me/8615263792384" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a class="rounded-full bg-white/6 px-3 py-2 text-[13px] text-white/72 transition-colors hover:bg-white/12 hover:text-white"
              href="https://t.me/cerotdshand" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>

        <div>
          <h2 class="mb-4.5 text-[13px] font-[650] tracking-[.06em] text-white uppercase">
            {{ $t('footer.trustTitle') }}
          </h2>
          <ul class="flex flex-col gap-2.5">
            <li v-for="n in 4" :key="n" class="text-[14px] text-white/[.58]">
              {{ $t(`footer.trustItems.item${n}`) }}
            </li>
            <li class="text-[14px] text-white/[.58]">
              <NuxtLink to="/about#certificates" class="text-white/[.58] transition-colors hover:text-white">
                {{ $t('footer.trustLink') }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4.5 text-[13px] font-[650] tracking-[.06em] text-white uppercase">
            {{ $t('footer.companyTitle') }}
          </h2>
          <ul class="flex flex-col gap-2.5">
            <li class="text-sm text-white/60">
              <NuxtLink to="/about" class="text-white/60 transition-colors hover:text-white">
                {{ $t('footer.aboutUs') }}
              </NuxtLink>
            </li>
            <li class="text-sm text-white/60">
              <NuxtLink to="/services" class="text-white/60 transition-colors hover:text-white">
                {{ $t('footer.ourServices') }}
              </NuxtLink>
            </li>
            <li class="text-sm text-white/60">
              <NuxtLink to="/advantages" class="text-white/60 transition-colors hover:text-white">
                {{ $t('footer.ourAdvantages') }}
              </NuxtLink>
            </li>
            <li class="text-sm text-white/60">
              <NuxtLink to="/news" class="text-white/60 transition-colors hover:text-white">
                {{ $t('common.news') }}
              </NuxtLink>
            </li>
            <li class="text-sm text-white/60">
              <NuxtLink to="/contact" class="text-white/60 transition-colors hover:text-white">
                {{ $t('common.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4.5 text-[13px] font-[650] tracking-[.06em] text-white uppercase">
            {{ $t('footer.contactTitle') }}
          </h2>
          <ul class="flex flex-col gap-2.5">
            <li class="text-sm text-white/60">{{ $t('footer.location') }}</li>
            <li class="text-sm text-white/60">{{ $t('footer.phone') }}</li>
            <li class="text-sm text-white/60">
              {{ $t('footer.wechatTitle') }}: {{ $t('footer.wechatId') }}
            </li>
          </ul>
          <div class="mt-4">
            <img src="/images/contact/wechat.webp" :alt="$t('footer.wechatTitle')"
              class="h-24 w-24 rounded-xl bg-white object-cover" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div class="border-t border-white/8 pt-6">
        <p class="text-center text-[13px] text-[#aab3bf]">&copy; {{ year }} {{ $t('footer.copyright') }}
        </p>
        <a
          class="mt-2 block text-center text-[13px] text-[#aab3bf] transition-colors hover:text-white"
          href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">鲁ICP备2026051999号-1</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
