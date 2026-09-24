<template>
  <header class="header">
    <nav class="nav" aria-label="Primary">
      <div class="nav-container">
        <NuxtLink to="/" class="nav-logo">
          <img src="/logo.png" alt="Cerotd" class="nav-logo-image" />
        </NuxtLink>

        <div class="nav-desktop">
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link">
            {{ $t(item.label) }}
          </NuxtLink>

          <NuxtLink to="/contact" class="nav-cta">
            {{ $t('common.contact') }}
          </NuxtLink>

          <button type="button" class="nav-lang" @click="toggleLocale">
            {{ locale === 'en' ? '中文' : 'EN' }}
          </button>
        </div>

        <button
          type="button"
          class="nav-mobile-btn"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="nav-mobile-btn-line"></span>
          <span class="nav-mobile-btn-line"></span>
          <span class="nav-mobile-btn-line"></span>
        </button>
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
        <NuxtLink to="/contact" class="nav-mobile-cta" @click="mobileMenuOpen = false">
          {{ $t('common.contact') }}
        </NuxtLink>
        <button type="button" class="nav-mobile-lang" @click="toggleLocale">
          {{ locale === 'en' ? '中文' : 'EN' }}
        </button>
      </div>
    </nav>
  </header>
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
  { to: '/products', label: 'common.products' },
  { to: '/services', label: 'common.services' },
  { to: '/advantages', label: 'common.advantages' },
  { to: '/about', label: 'common.about' },
  { to: '/news', label: 'common.news' }
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
  background: rgba(#ffffff, 0.9);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(#d9dde3, 0.95);

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
      text-decoration: none;

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
        position: relative;
        color: #5b6572;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.01em;
        text-decoration: none;
        transition: color 0.25s ease;

        &:hover {
          color: var(--color-text);
        }
      }

      .nav-link.router-link-active {
        color: #0f4c56;
        font-weight: 650;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 2px;
          border-radius: 999px;
          background: #0f4c56;
        }
      }

      .nav-lang {
        margin-left: 4px;
        padding: 8px 14px;
        border-radius: 999px;
        background: var(--color-surface);
        color: #3d4654;
        font-size: 13px;
        font-weight: 650;
        transition: background-color 0.25s ease;
        cursor: pointer;

        &:hover {
          background: #e2e6eb;
        }
      }

      .nav-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 18px;
        border-radius: 999px;
        background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
        color: #ffffff;
        font-size: 14px;
        font-weight: 650;
        text-decoration: none;
        transition: opacity 0.2s ease, transform 0.2s ease;

        &:hover {
          opacity: 0.92;
        }
      }

      .nav-cta.router-link-active {
        box-shadow: 0 0 0 2px rgba(15, 76, 86, 0.18);
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
      background: var(--color-surface);
      cursor: pointer;

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
        color: #3d4654;
        font-weight: 500;
        text-decoration: none;
        border-bottom: 1px solid var(--color-line);
      }

      .nav-mobile-link.router-link-active {
        color: #0f4c56;
        font-weight: 700;
      }

      .nav-mobile-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        margin-top: 12px;
        border-radius: 12px;
        background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
        color: #ffffff;
        font-weight: 650;
        text-decoration: none;
      }

      .nav-mobile-lang {
        margin-top: 10px;
        padding: 12px 16px;
        border-radius: 12px;
        background: var(--color-surface);
        color: #3d4654;
        font-weight: 650;
        text-align: left;
        cursor: pointer;
      }
    }
  }
}
</style>