const STORAGE_KEY = 'ADMIN_API_TOKEN'

export function useAdminAuth() {
  const token = useState('admin-api-token', () => '')

  if (import.meta.client && !token.value) {
    token.value = window.localStorage.getItem(STORAGE_KEY) || ''
  }

  function setToken(value: string) {
    token.value = value.trim()
    if (import.meta.client) {
      window.localStorage.setItem(STORAGE_KEY, token.value)
    }
  }

  function clearToken() {
    token.value = ''
    if (import.meta.client) {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  function authHeaders() {
    return {
      Authorization: `Bearer ${token.value}`
    }
  }

  return {
    token,
    setToken,
    clearToken,
    authHeaders,
    isReady: computed(() => Boolean(token.value))
  }
}
