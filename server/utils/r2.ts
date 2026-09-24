import type { H3Event } from 'h3'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
const EXT_MAP: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif'
}

export function useMediaBucket(event: H3Event) {
  const bucket = event.context.cloudflare?.env?.MEDIA
  if (!bucket) {
    throw createError({
      statusCode: 500,
      statusMessage: 'R2 binding MEDIA is missing. Run with Cloudflare bindings (wrangler / nitro-cloudflare-dev).'
    })
  }
  return bucket
}

export function assertImageType(type: string) {
  if (!ALLOWED_TYPES.has(type)) {
    throw createError({ statusCode: 400, statusMessage: 'Only jpeg/png/webp/gif/avif images are allowed' })
  }
}

export function extensionForType(type: string) {
  return EXT_MAP[type] || 'bin'
}

export function buildObjectKey(folder: string, contentType: string) {
  const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, '').replace(/^/+|/+$/g, '') || 'uploads'
  const id = crypto.randomUUID()
  return `${safeFolder}/${id}.${extensionForType(contentType)}`
}

export function publicMediaUrl(event: H3Event, key: string) {
  const siteUrl = getSiteUrl(event)
  return `${siteUrl}/cdn/${key.split('/').map(encodeURIComponent).join('/')}`
}
