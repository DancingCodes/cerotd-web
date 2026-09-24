<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-brand">
            <img src="/images/logo.png" alt="Cerotd" class="footer-brand-image" loading="lazy" decoding="async" />
          </div>
          <p class="footer-desc">{{ $t('footer.tagline') }}</p>
          <div class="footer-social">
            <a class="footer-social-link" href="https://www.facebook.com/profile.php?id=61575320303094&sk=reels_tab" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a class="footer-social-link" href="https://www.instagram.com/hanxiansheng889/reels/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a class="footer-social-link" href="https://wa.me/8615263792384" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a class="footer-social-link" href="https://t.me/cerotdshand" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">{{ $t('footer.productsTitle') }}</h2>
          <ul class="footer-list">
            <li v-for="item in productLinks" :key="item.to" class="footer-item">
              <NuxtLink :to="item.to" class="footer-link">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">{{ $t('footer.companyTitle') }}</h2>
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
              <NuxtLink to="/news" class="footer-link">{{ $t('common.news') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/contact" class="footer-link">{{ $t('common.contact') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">{{ $t('footer.contactTitle') }}</h2>
          <ul class="footer-list">
            <li class="footer-item">{{ $t('footer.location') }}</li>
            <li class="footer-item">{{ $t('footer.phone') }}</li>
            <li v-if="locale === 'zh'" class="footer-item">{{ $t('footer.wechatTitle') }}: {{ $t('footer.wechatId') }}</li>
          </ul>
          <div v-if="locale === 'zh'" class="footer-wechat">
            <img src="/images/wechat.png" :alt="$t('footer.wechatTitle')" class="footer-wechat-image" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">&copy; {{ year }} {{ $t('footer.copyright') }}</p>
        <a v-if="locale === 'zh'" class="footer-beian" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">鲁ICP备2026051999号-1</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
type Localized = { en: string; zh: string }
type CategoryItem = { slug: string; name: Localized }
type ProductItem = { slug: string; name: Localized; showOnHome?: boolean }

const { locale } = useI18n()
const lt = useLocalized()
const year = new Date().getFullYear()

const { data: categoriesData } = await useFetch<{ items: CategoryItem[] }>('/api/product-categories', {
  key: 'footer-product-categories'
})
const { data: homeProductsData } = await useFetch<{ items: ProductItem[] }>('/api/products?home=1', {
  key: 'footer-home-products'
})

const productLinks = computed(() => {
  const categories = categoriesData.value?.items || []
  if (categories.length) {
    return categories.slice(0, 8).map((item) => ({
      to: `/products?category=${encodeURIComponent(item.slug)}`,
      label: lt(item.name)
    }))
  }
  const products = homeProductsData.value?.items || []
  if (products.length) {
    return products.slice(0, 8).map((item) => ({
      to: `/products/${item.slug}`,
      label: lt(item.name)
    }))
  }
  return [{ to: '/products', label: lt({ en: 'Products', zh: '产品中心' }) }]
})
</script>

<style lang="scss" scoped>
.footer {
  background: var(--color-ink);
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
      color: rgba(#ffffff, 0.58);
      font-size: 14px;
      line-height: 1.7;
    }

    .footer-social {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;

      .footer-social-link {
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(#ffffff, 0.06);
        color: rgba(#ffffff, 0.72);
        font-size: 13px;
        text-decoration: none;
        cursor: pointer;
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
        color: rgba(#ffffff, 0.58);
        font-size: 14px;

        .footer-link {
          color: rgba(#ffffff, 0.58);
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
        color: rgba(#ffffff, 0.38);
      }
    }
  }
}
</style>
