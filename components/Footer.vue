<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-brand">
            <img src="/logo.png" alt="Cerotd" class="footer-brand-image" />
          </div>
          <div class="footer-desc">{{ $t('footer.tagline') }}</div>
        </div>

        <div class="footer-col">
          <div class="footer-title">{{ $t('footer.productsTitle') }}</div>
          <div class="footer-list">
            <div class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product1') }}</NuxtLink>
            </div>
            <div class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product2') }}</NuxtLink>
            </div>
            <div class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product3') }}</NuxtLink>
            </div>
            <div class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product4') }}</NuxtLink>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-title">{{ $t('footer.companyTitle') }}</div>
          <div class="footer-list">
            <div class="footer-item">
              <NuxtLink to="/about" class="footer-link">{{ $t('footer.aboutUs') }}</NuxtLink>
            </div>
            <div class="footer-item">
              <NuxtLink to="/services" class="footer-link">{{ $t('footer.ourServices') }}</NuxtLink>
            </div>
            <div class="footer-item">
              <NuxtLink to="/advantages" class="footer-link">{{ $t('footer.ourAdvantages') }}</NuxtLink>
            </div>
            <div class="footer-item">
              <NuxtLink to="/contact" class="footer-link">{{ $t('common.contact') }}</NuxtLink>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-title">{{ $t('footer.contactTitle') }}</div>
          <div class="footer-list">
            <div class="footer-item">{{ $t('footer.location') }}</div>
            <div class="footer-item">{{ $t('footer.email') }}</div>
            <div class="footer-item">{{ $t('footer.phone') }}</div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copyright">&copy; {{ year }} {{ $t('footer.copyright') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.footer {
  background: #0b1220;
  color: #ffffff;
  padding: 72px 0 36px;

  .footer-container {
    width: 100%;
    max-width: 1180px;
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
      color: #9aa3af;
      font-size: 14px;
      line-height: 1.7;
    }

    .footer-title {
      margin-bottom: 18px;
      color: #ffffff;
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
        color: #9aa3af;
        font-size: 14px;

        .footer-link {
          color: #9aa3af;
          text-decoration: none;
          transition: all 0.25s ease;

          &:hover {
            color: #ffffff;
          }
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(#ffffff, 0.08);
    padding-top: 24px;

    .footer-copyright {
      color: #6b7280;
      font-size: 13px;
      text-align: center;
    }
  }
}
</style>
