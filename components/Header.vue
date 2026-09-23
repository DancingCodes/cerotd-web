<template>
  <div class="header">
    <div class="nav">
      <div class="nav-container">
        <NuxtLink to="/" class="nav-logo">
          <img src="/logo.png" alt="Cerotd" class="nav-logo-image" />
        </NuxtLink>

        <div class="nav-desktop">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-link"
          >
            {{ $t(item.label) }}
          </NuxtLink>

          <div class="nav-lang" @click="toggleLocale">
            {{ locale === 'en' ? '中文' : 'EN' }}
          </div>
        </div>

        <div
          class="nav-mobile-btn"
          :aria-expanded="mobileMenuOpen"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <div class="nav-mobile-btn-line"></div>
          <div class="nav-mobile-btn-line"></div>
          <div class="nav-mobile-btn-line"></div>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="nav-mobile">
        <NuxtLink
          v-for="item in navItems"
          :key="`mobile-${item.to}`"
          :to="item.to"
          class="nav-mobile-link"
          @click="mobileMenuOpen = false"
        >
          {{ $t(item.label) }}
        </NuxtLink>
        <div class="nav-mobile-lang" @click="toggleLocale">
          {{ locale === 'en' ? '中文' : 'EN' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type NavItem = {
  to: string
  label: string
}

const { locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)

const navItems: NavItem[] = [
  { to: '/', label: 'common.home' },
  { to: '/about', label: 'common.about' },
  { to: '/products', label: 'common.products' },
  { to: '/services', label: 'common.services' },
  { to: '/advantages', label: 'common.advantages' },
  { to: '/contact', label: 'common.contact' }
]

const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(#ffffff, 0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(#e2e6eb, 0.95);
}

.nav {
  .nav-container {
    width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
    min-height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    display: inline-flex;
    align-items: center;

    .nav-logo-image {
      height: 36px;
      width: auto;
    }
  }

  .nav-desktop {
    display: none;
    align-items: center;
    gap: 26px;

    @media (min-width: 1024px) {
      display: flex;
    }

    .nav-link {
      color: #4b5563;
      font-size: 15px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        color: #111827;
      }
    }

    .nav-link.router-link-active {
      color: #0e7f8f;
    }

    .nav-lang {
      margin-left: 4px;
      padding: 8px 14px;
      border-radius: 999px;
      background: #eef1f4;
      color: #374151;
      font-size: 13px;
      font-weight: 650;
      transition: all 0.25s ease;
      cursor: pointer;

      &:hover {
        background: #e2e6eb;
      }
    }
  }

  .nav-mobile-btn {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: #eef1f4;

    @media (min-width: 1024px) {
      display: none;
    }

    .nav-mobile-btn-line {
      width: 18px;
      height: 2px;
      border-radius: 999px;
      background: #1f2937;
    }
  }

  .nav-mobile {
    width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 18px;

    @media (min-width: 1024px) {
      display: none;
    }

    .nav-mobile-link {
      padding: 12px 0;
      color: #374151;
      font-weight: 500;
      border-bottom: 1px solid #eef1f4;
    }

    .nav-mobile-link.router-link-active {
      color: #0e7f8f;
    }

    .nav-mobile-lang {
      margin-top: 10px;
      padding: 12px 16px;
      border-radius: 12px;
      background: #eef1f4;
      color: #374151;
      font-weight: 650;
      text-align: left;
      cursor: pointer;
    }
  }
}
</style>
