export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/' && to.path !== '/register') {
      return navigateTo('/')
    }
  }
})