export function navigateTo(page: string) {
  let parentPath = ''
  if (page === 'login' || page === 'signup' || page === 'reset') {
    parentPath = '/verification'
  }
  const path = page === 'login' ? '/' : `/${page}`
  const finalPath = parentPath ? `${parentPath}${path}` : path
  window.history.pushState({}, '', finalPath)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
