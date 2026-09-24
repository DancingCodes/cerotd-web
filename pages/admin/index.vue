<template>
  <div class="admin-login">
    <div class="admin-login-card">
      <div class="admin-login-title">{{ $t('admin.login.title') }}</div>
      <div class="admin-login-desc">{{ $t('admin.login.desc') }}</div>
      <input
        v-model="input"
        class="admin-login-input"
        type="password"
        :placeholder="$t('admin.login.placeholder')"
        @keyup.enter="login"
      />
      <div v-if="error" class="admin-login-error">{{ error }}</div>
      <div class="admin-login-actions">
        <div class="admin-login-btn" @click="login">{{ $t('admin.login.enter') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { t } = useI18n()
const { token, setToken, clearToken, authHeaders } = useAdminAuth()
const input = ref(token.value)
const error = ref('')

onMounted(() => {
  if (token.value) {
    navigateTo('/admin/product-categories')
  }
})

async function login() {
  error.value = ''
  const value = input.value.trim()
  if (!value) {
    error.value = t('admin.login.tokenRequired')
    return
  }

  setToken(value)

  try {
    await $fetch('/api/product-categories?all=1', {
      headers: authHeaders()
    })
    navigateTo('/admin/product-categories')
  } catch (err: any) {
    clearToken()
    error.value = err?.statusCode === 401 ? t('admin.login.invalidToken') : t('admin.login.failed')
  }
}
</script>

<style lang="scss" scoped>
.admin-login {
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;

  .admin-login-card {
    width: 100%;
    max-width: 420px;
    padding: 28px;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid #e5eaf0;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);

    .admin-login-title {
      margin-bottom: 8px;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .admin-login-desc {
      margin-bottom: 20px;
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
    }

    .admin-login-input {
      width: 100%;
      height: 44px;
      padding: 0 14px;
      border-radius: 12px;
      border: 1px solid #d7dee7;
      background: #ffffff;
      outline: none;
    }

    .admin-login-error {
      margin-top: 10px;
      color: #b42318;
      font-size: 13px;
    }

    .admin-login-actions {
      margin-top: 16px;

      .admin-login-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 120px;
        height: 42px;
        padding: 0 18px;
        border-radius: 12px;
        background: #0e7f8f;
        color: #ffffff;
        font-weight: 650;
        cursor: pointer;
      }
    }
  }
}
</style>
