import type { H3Event } from 'h3'

export type CategoryRow = {
  id: number
  slug: string
  name_en: string
  name_zh: string
  desc_en: string
  desc_zh: string
  cover_url: string | null
  sort_order: number
  is_published: number
  created_at: string
  updated_at: string
}

export function useDB(event: H3Event) {
  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'D1 binding DB is missing. Run with Cloudflare bindings (wrangler / nitro-cloudflare-dev).'
    })
  }
  return db as D1Database
}

export function mapCategory(row: CategoryRow) {
  return {
    id: row.id,
    slug: row.slug,
    name: {
      en: row.name_en,
      zh: row.name_zh
    },
    description: {
      en: row.desc_en,
      zh: row.desc_zh
    },
    coverUrl: row.cover_url,
    sortOrder: row.sort_order,
    isPublished: row.is_published === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}
