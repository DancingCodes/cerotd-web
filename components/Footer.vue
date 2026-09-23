<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-brand">
            <img src="/logo.png" alt="Cerotd" class="footer-brand-image" />
          </div>
          <div class="footer-desc">{{ $t('footer.tagline') }}</div>
          <div class="footer-social">
            <NuxtLink class="footer-social-link" to="https://www.facebook.com/people/Cerotd-Lubricating-Oil/61575320303094/?sk=reels_tab" target="_blank" external>Facebook</NuxtLink>
            <NuxtLink class="footer-social-link" to="https://api.whatsapp.com/send/?phone=8615263792384&text&type=phone_number&app_absent=0" target="_blank" external>WhatsApp</NuxtLink>
            <NuxtLink class="footer-social-link" to="https://t.me/cerotdshand" target="_blank" external>Telegram</NuxtLink>
          </div>
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
            <div class="footer-item">
              <NuxtLink to="/products" class="footer-link">{{ $t('footer.product5') }}</NuxtLink>
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
            <div class="footer-item">{{ $t('footer.phone') }}</div>
            <div class="footer-item">{{ $t('footer.wechatTitle') }}: {{ $t('footer.wechatId') }}</div>
          </div>
          <div class="footer-wechat">
            <img src="/wechat.png" :alt="$t('footer.wechatTitle')" class="footer-wechat-image" />
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copyright">&copy; {{ year }} {{ $t('footer.copyright') }}</div>
        <NuxtLink class="footer-beian" to="https://beian.miit.gov.cn/" target="_blank" external>鲁ICP备2026051999号-1</NuxtLink>
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

    .footer-social {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;

      .footer-social-link {
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(#ffffff, 0.06);
        color: #c8ced6;
        font-size: 13px;
        text-decoration: none;
        transition: all 0.25s ease;

        &:hover {
          color: #ffffff;
          background: rgba(#ffffff, 0.12);
        }
      }
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

    .footer-wechat {
      margin-top: 16px;

      .footer-wechat-image {
        width: 96px;
        height: 96px;
        object-fit: cover;
        border-radius: 12px;
        background: #ffffff;
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

    .footer-beian {
      display: block;
      margin-top: 8px;
      color: #6b7280;
      font-size: 13px;
      text-align: center;
      text-decoration: none;

      &:hover {
        color: #ffffff;
      }
    }
  }
}
</style>
