<template>
  <header class="sticky top-0 z-50 border-b border-[#d9dde3]/95 bg-white">
      <div class="mx-auto flex min-h-18.5 w-full max-w-295 items-center justify-between px-6">
        <NuxtLink to="/" class="flex items-center no-underline">
          <img src="/images/logo.webp" alt="Cerotd" class="h-9 w-auto" />
        </NuxtLink>

        <div class="hidden items-center gap-6.5 lg:flex">
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
            class="relative text-[15px] font-medium tracking-[.01em] text-[#5b6572] no-underline transition-colors hover:text-[#10141a] [&.router-link-active]:font-[650] [&.router-link-active]:text-[#0f4c56] [&.router-link-active]:after:absolute [&.router-link-active]:after:-bottom-2 [&.router-link-active]:after:left-0 [&.router-link-active]:after:right-0 [&.router-link-active]:after:h-0.5 [&.router-link-active]:after:rounded-full [&.router-link-active]:after:bg-[#0f4c56]">
            {{ $t(item.label) }}
          </NuxtLink>

          <NuxtLink to="/contact"
            class="flex min-h-10 items-center justify-center rounded-full bg-linear-to-br from-[#0f9aa8] to-[#3dd6e0] px-4.5 text-[14px] font-[650] text-white no-underline transition-opacity hover:opacity-90 [&.router-link-active]:ring-2 [&.router-link-active]:ring-[#0f4c56]/20">
            {{ $t('common.contact') }}
          </NuxtLink>

          <button type="button"
            class="min-h-10 cursor-pointer px-1 text-[14px] font-semibold text-[#66707c] transition-colors hover:text-[#0f4c56]"
            @click="toggleLocale">
            {{ locale === 'en' ? '中文' : 'EN' }}
          </button>
        </div>

        <button type="button"
          class="flex h-10.5 w-10.5 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-xl bg-[#f3f4f6] lg:hidden"
          :aria-label="$t(mobileMenuOpen ? 'common.closeMenu' : 'common.openMenu')"
          :aria-expanded="mobileMenuOpen" aria-controls="mobile-navigation"
          @click="mobileMenuOpen = !mobileMenuOpen">
          <span class="h-0.5 w-4.5 rounded-full bg-[#1f2937]"></span>
          <span class="h-0.5 w-4.5 rounded-full bg-[#1f2937]"></span>
          <span class="h-0.5 w-4.5 rounded-full bg-[#1f2937]"></span>
        </button>
      </div>

      <div v-if="mobileMenuOpen" id="mobile-navigation" class="mx-auto flex w-full max-w-295 flex-col gap-1 px-6 pb-4.5 lg:hidden">
        <NuxtLink v-for="item in navItems" :key="`mobile-${item.to}`" :to="item.to"
          class="border-b border-[#e6e8ec] py-3 text-[16px] font-medium text-[#7a8490] no-underline"
          :class="{ 'font-bold text-[#0f4c56]': isNavActive(item.to) }" @click="mobileMenuOpen = false">
          {{ $t(item.label) }}
        </NuxtLink>
        <NuxtLink to="/contact"
          class="mt-3 flex min-h-11 items-center justify-center rounded-xl bg-linear-to-br from-[#0f9aa8] to-[#3dd6e0] text-center text-[16px] font-[650] text-white no-underline"
          @click="mobileMenuOpen = false">
          {{ $t('common.contact') }}
        </NuxtLink>
        <button type="button"
          class="mt-1 flex min-h-11 self-end cursor-pointer items-center px-1 text-[14px] font-semibold text-[#66707c] transition-colors hover:text-[#0f4c56]"
          @click="toggleLocale">
          {{ locale === 'en' ? '中文' : 'EN' }}
        </button>
      </div>
  </header>
</template>

<script setup lang="ts">
type NavItem = {
  to: string
  label: string
}

const { locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)
const localeStorageKey = 'cerotd-locale'

const navItems: NavItem[] = [
  { to: '/', label: 'common.home' },
  { to: '/products', label: 'common.products' },
  { to: '/services', label: 'common.services' },
  { to: '/advantages', label: 'common.advantages' },
  { to: '/about', label: 'common.about' },
  { to: '/news', label: 'common.news' }
]

const route = useRoute()

function isNavActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

onMounted(() => {
  const savedLocale = window.localStorage.getItem(localeStorageKey)
  if (savedLocale === 'zh' || savedLocale === 'en') {
    void setLocale(savedLocale)
  }
})

const toggleLocale = async () => {
  const nextLocale = locale.value === 'en' ? 'zh' : 'en'
  await setLocale(nextLocale)
  window.localStorage.setItem(localeStorageKey, nextLocale)
}
</script>
