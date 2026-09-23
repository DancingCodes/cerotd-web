import type { H3Event } from 'h3'

export function getSiteUrl(event: H3Event) {
  const configured = String(useRuntimeConfig(event).public.siteUrl || '').replace(/\/$/, '')
  if (configured) return configured

  const host = getRequestHeader(event, 'host')
  if (!host) return 'https://cerotd-web.changyuezhang68-667.workers.dev'

  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  return `${proto}://${host}`
}

export function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
