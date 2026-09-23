export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin') return

  if (import.meta.server) return

  const token = window.localStorage.getItem('ADMIN_API_TOKEN')
  if (!token) {
    return navigateTo('/admin')
  }
})
