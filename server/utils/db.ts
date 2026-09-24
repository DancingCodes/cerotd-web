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

export type ProductRow = {
  id: number
  slug: string
  category_id: number
  name_en: string
  name_zh: string
  summary_en: string
  summary_zh: string
  description_en: string
  description_zh: string
  cover_url: string | null
  images_json: string
  specs_en_json: string
  specs_zh_json: string
  sort_order: number
  is_published: number
  created_at: string
  updated_at: string
  category_slug?: string
  category_name_en?: string
  category_name_zh?: string
}


export type NewsRow = {
  id: number
  slug: string
  category: string
  title_en: string
  title_zh: string
  summary_en: string
  summary_zh: string
  content_en: string
  content_zh: string
  cover_url: string | null
  is_published: number
  published_at: string
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

export function parseJsonArray(input: string | null | undefined) {
  if (!input) return [] as string[]
  try {
    const value = JSON.parse(input)
    return Array.isArray(value) ? value.map((item) => String(item)) : []
  } catch {
    return [] as string[]
  }
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

export function mapProduct(row: ProductRow) {
  const images = parseJsonArray(row.images_json)
  return {
    id: row.id,
    slug: row.slug,
    categoryId: row.category_id,
    category: row.category_slug
      ? {
          slug: row.category_slug,
          name: {
            en: row.category_name_en || '',
            zh: row.category_name_zh || ''
          }
        }
      : null,
    name: {
      en: row.name_en,
      zh: row.name_zh
    },
    summary: {
      en: row.summary_en,
      zh: row.summary_zh
    },
    description: {
      en: row.description_en,
      zh: row.description_zh
    },
    coverUrl: row.cover_url || images[0] || null,
    images,
    specs: {
      en: parseJsonArray(row.specs_en_json),
      zh: parseJsonArray(row.specs_zh_json)
    },
    sortOrder: row.sort_order,
    isPublished: row.is_published === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export const productSelectSql = `SELECT
  p.*,
  c.slug AS category_slug,
  c.name_en AS category_name_en,
  c.name_zh AS category_name_zh
FROM products p
JOIN products_categories c ON c.id = p.category_id`

export type NewsCategoryRow = {
  id: number
  slug: string
  name_en: string
  name_zh: string
  sort_order: number
  is_published: number
  created_at: string
  updated_at: string
}

export function mapNewsCategory(row: NewsCategoryRow) {
  return {
    id: row.id,
    slug: row.slug,
    name: {
      en: row.name_en,
      zh: row.name_zh
    },
    sortOrder: row.sort_order,
    isPublished: row.is_published === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export async function findNewsCategory(db: D1Database, slug: string, opts?: { publishedOnly?: boolean }) {
  const publishedOnly = opts?.publishedOnly === true
  const sql = publishedOnly
    ? 'SELECT * FROM news_categories WHERE slug = ? AND is_published = 1'
    : 'SELECT * FROM news_categories WHERE slug = ?'
  return db.prepare(sql).bind(slug).first<NewsCategoryRow>()
}

export function mapNews(row: NewsRow) {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: {
      en: row.title_en,
      zh: row.title_zh
    },
    summary: {
      en: row.summary_en,
      zh: row.summary_zh
    },
    content: {
      en: row.content_en,
      zh: row.content_zh
    },
    coverUrl: row.cover_url,
    isPublished: row.is_published === 1,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}
