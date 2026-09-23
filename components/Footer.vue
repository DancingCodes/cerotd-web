<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-brand">
            <img src="/logo.png" alt="Cerotd" class="footer-brand-image" />
          </div>
          <p class="footer-desc">{{ $t('footer.tagline') }}</p>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">{{ $t('footer.productsTitle') }}</h4>
          <ul class="footer-list">
            <li class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product1') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product2') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product3') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product4') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">{{ $t('footer.companyTitle') }}</h4>
          <ul class="footer-list">
            <li class="footer-item">
              <NuxtLink to="/about" class="footer-link">{{ $t('footer.aboutUs') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/services" class="footer-link">{{ $t('footer.ourServices') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/advantages" class="footer-link">{{ $t('footer.ourAdvantages') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/contact" class="footer-link">{{ $t('common.contact') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">{{ $t('footer.contactTitle') }}</h4>
          <ul class="footer-list">
            <li class="footer-item">{{ $t('footer.location') }}</li>
            <li class="footer-item">{{ $t('footer.email') }}</li>
            <li class="footer-item">{{ $t('footer.phone') }}</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">&copy; {{ year }} {{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.footer {
  background: $dark-bg;
  color: $white;
  padding: 72px 0 36px;

  .footer-container {
    width: 100%;
  max-width: $container-width;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 36px;
    margin-bottom: 40px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1.35fr repeat(3, 1fr);
    }
  }

  .footer-col {
    .footer-brand {
      margin-bottom: 16px;

      .footer-brand-image {
        height: 34px;
        width: auto;
      }
    }

    .footer-desc {
      max-width: 280px;
      color: $gray-400;
      font-size: 14px;
      line-height: 1.7;
    }

    .footer-title {
      margin-bottom: 18px;
      color: $white;
      font-size: 13px;
      font-weight: 650;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .footer-list {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .footer-item {
        color: $gray-400;
        font-size: 14px;

        .footer-link {
          color: $gray-400;
          transition: $transition;

          &:hover {
            color: $white;
          }
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba($white, 0.08);
    padding-top: 24px;

    .footer-copyright {
      color: $gray-500;
      font-size: 13px;
      text-align: center;
    }
  }
}
</style>
