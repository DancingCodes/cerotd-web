import type { H3Event } from 'h3'

export function assertAdmin(event: H3Event) {
  const fromRuntime = useRuntimeConfig(event).adminApiToken
  const fromCloudflare = event.context.cloudflare?.env?.ADMIN_API_TOKEN
  const token = fromCloudflare || fromRuntime

  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ADMIN_API_TOKEN is not configured'
    })
  }

  const header = getHeader(event, 'authorization') || ''
  if (header !== `Bearer ${token}`) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
