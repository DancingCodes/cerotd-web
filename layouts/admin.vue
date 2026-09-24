<template>
  <div class="admin-layout">
    <div class="admin-top">
      <div class="admin-top-inner">
        <NuxtLink to="/admin" class="admin-brand">{{ $t('admin.brand') }}</NuxtLink>
        <div class="admin-nav">
          <template v-if="isReady">
            <NuxtLink to="/admin/categories" class="admin-nav-link">{{ $t('admin.nav.categories') }}</NuxtLink>
            <NuxtLink to="/admin/products" class="admin-nav-link">{{ $t('admin.nav.products') }}</NuxtLink>
            <NuxtLink to="/admin/news-categories" class="admin-nav-link">{{ $t('admin.nav.newsCategories') }}</NuxtLink>
            <NuxtLink to="/admin/news" class="admin-nav-link">{{ $t('admin.nav.news') }}</NuxtLink>
            <NuxtLink to="/admin/inquiries" class="admin-nav-link">{{ $t('admin.nav.inquiries') }}</NuxtLink>
            <NuxtLink to="/" class="admin-nav-link" target="_blank">{{ $t('admin.nav.viewSite') }}</NuxtLink>
            <div class="admin-nav-link admin-nav-logout" @click="logout">{{ $t('admin.nav.logout') }}</div>
          </template>
          <div class="admin-nav-link admin-nav-lang" @click="toggleLocale">
            {{ locale === 'en' ? '中文' : 'EN' }}
          </div>
        </div>
      </div>
    </div>
    <div class="admin-main">
      <div class="admin-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { clearToken, isReady } = useAdminAuth()

useSeoMeta({
  title: 'Cerotd Admin',
  robots: 'noindex, nofollow'
})

function logout() {
  clearToken()
  navigateTo('/admin')
}

function toggleLocale() {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
  background: #f5f7fa;
  color: #111827;

  .admin-top {
    background: #ffffff;
    border-bottom: 1px solid #e5eaf0;

    .admin-top-inner {
      width: 100%;
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .admin-brand {
      font-size: 16px;
      font-weight: 700;
      color: #0e7f8f;
      text-decoration: none;
    }

    .admin-nav {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;

      .admin-nav-link {
        padding: 8px 12px;
        border-radius: 10px;
        color: #4b5563;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
      }

      .admin-nav-link.router-link-active {
        background: #e8f7f9;
        color: #0e7f8f;
      }

      .admin-nav-logout,
      .admin-nav-lang {
        background: #eef1f4;
      }
    }
  }

  .admin-main {
    padding: 28px 0 48px;

    .admin-container {
      width: 100%;
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
    }
  }
}
</style>
