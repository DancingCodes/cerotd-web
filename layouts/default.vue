<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <div class="nav-container">
          <NuxtLink to="/" class="nav-logo">
            <div class="nav-logo-icon">
              <span>C</span>
            </div>
            <span class="nav-logo-text">Cerotd</span>
          </NuxtLink>

          <div class="nav-desktop">
            <NuxtLink to="/" class="nav-link">
              {{ $t('common.home') }}
            </NuxtLink>
            <NuxtLink to="/products" class="nav-link">
              {{ $t('common.products') }}
            </NuxtLink>
            <NuxtLink to="/about" class="nav-link">
              {{ $t('common.about') }}
            </NuxtLink>
            <NuxtLink to="/contact" class="nav-link">
              {{ $t('common.contact') }}
            </NuxtLink>

            <button @click="toggleLocale" class="nav-lang">
              {{ locale === 'en' ? '中文' : 'EN' }}
            </button>
          </div>

          <button @click="mobileMenuOpen = !mobileMenuOpen" class="nav-mobile-btn">
            <svg class="nav-mobile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div v-if="mobileMenuOpen" class="nav-mobile">
          <NuxtLink to="/" class="nav-mobile-link" @click="mobileMenuOpen = false">
            {{ $t('common.home') }}
          </NuxtLink>
          <NuxtLink to="/products" class="nav-mobile-link" @click="mobileMenuOpen = false">
            {{ $t('common.products') }}
          </NuxtLink>
          <NuxtLink to="/about" class="nav-mobile-link" @click="mobileMenuOpen = false">
            {{ $t('common.about') }}
          </NuxtLink>
          <NuxtLink to="/contact" class="nav-mobile-link" @click="mobileMenuOpen = false">
            {{ $t('common.contact') }}
          </NuxtLink>
          <button @click="toggleLocale" class="nav-mobile-lang">
            {{ locale === 'en' ? '中文' : 'EN' }}
          </button>
        </div>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-brand">
              <div class="footer-brand-icon">
                <span>C</span>
              </div>
              <span class="footer-brand-text">Cerotd</span>
            </div>
            <p class="footer-desc">
              Professional lubrication technology solutions
            </p>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">Products</h4>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-link">Industrial Lubricants</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-link">Automotive Oils</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-link">Specialty Greases</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-link">Metalworking Fluids</a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">Company</h4>
            <ul class="footer-list">
              <li class="footer-item">
                <NuxtLink to="/about" class="footer-link">About Us</NuxtLink>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-link">R&D</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-link">Quality</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-link">News</a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">Contact</h4>
            <ul class="footer-list">
              <li class="footer-item">Shandong, China</li>
              <li class="footer-item">info@cerotd.com</li>
              <li class="footer-item">+86 xxx xxxx xxxx</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">
            &copy; {{ new Date().getFullYear() }} Cerotd (Shandong) Lubrication Technology Co., Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)

const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba($white, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $gray-200;
}

.nav {
  .nav-container {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;

    .nav-logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
      border-radius: $border-radius-lg;
      @include flex-center;

      span {
        color: $white;
        font-weight: 700;
        font-size: 20px;
      }
    }

    .nav-logo-text {
      font-size: 20px;
      font-weight: 700;
      color: $gray-900;
    }
  }

  .nav-desktop {
    display: none;
    align-items: center;
    gap: 32px;

    @media (min-width: 768px) {
      display: flex;
    }

    .nav-link {
      color: $gray-700;
      font-weight: 500;
      transition: $transition;
      text-decoration: none;

      &:hover {
        color: $primary-color;
      }

      &.router-link-active {
        color: $primary-color;
      }
    }

    .nav-lang {
      padding: 8px 16px;
      border-radius: $border-radius-lg;
      background: $gray-100;
      color: $gray-700;
      font-weight: 500;
      transition: $transition;

      &:hover {
        background: $gray-200;
      }
    }
  }

  .nav-mobile-btn {
    display: block;
    padding: 8px;
    color: $gray-700;

    @media (min-width: 768px) {
      display: none;
    }

    .nav-mobile-icon {
      width: 24px;
      height: 24px;
    }
  }

  .nav-mobile {
    @include container;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px solid $gray-200;

    @media (min-width: 768px) {
      display: none;
    }

    .nav-mobile-link {
      color: $gray-700;
      font-weight: 500;
      text-decoration: none;

      &:hover {
        color: $primary-color;
      }

      &.router-link-active {
        color: $primary-color;
      }
    }

    .nav-mobile-lang {
      width: 100%;
      text-align: left;
      padding: 8px 16px;
      border-radius: $border-radius-lg;
      background: $gray-100;
      color: $gray-700;
      font-weight: 500;

      &:hover {
        background: $gray-200;
      }
    }
  }
}

.main {
  flex: 1;
}

.footer {
  background: $dark-bg;
  color: $white;
  padding: 48px 0;

  .footer-container {
    @include container;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 32px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .footer-col {
    display: flex;
    flex-direction: column;

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;

      .footer-brand-icon {
        width: 32px;
        height: 32px;
        background: $primary-color;
        border-radius: $border-radius-lg;
        @include flex-center;

        span {
          color: $white;
          font-weight: 700;
        }
      }

      .footer-brand-text {
        font-size: 18px;
        font-weight: 700;
      }
    }

    .footer-desc {
      color: $gray-400;
      font-size: 14px;
      line-height: 1.6;
    }

    .footer-title {
      font-weight: 600;
      margin-bottom: 16px;
    }

    .footer-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .footer-item {
        font-size: 14px;
        color: $gray-400;

        .footer-link {
          color: $gray-400;
          text-decoration: none;
          transition: $transition;

          &:hover {
            color: $white;
          }
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid $gray-800;
    padding-top: 32px;
    text-align: center;

    .footer-copyright {
      font-size: 14px;
      color: $gray-400;
    }
  }
}
</style>
