export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const query = getQuery(event)
  const status = String(query.status || 'all').trim().toLowerCase()
  const range = String(query.range || 'all').trim().toLowerCase()

  const where: string[] = []
  if (status === 'unread') where.push('is_read = 0')
  if (status === 'read') where.push('is_read = 1')
  if (range === 'today') where.push(`date(created_at) = date('now')`)
  if (range === '7d') where.push(`created_at >= datetime('now', '-7 days')`)
  if (range === '30d') where.push(`created_at >= datetime('now', '-30 days')`)

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''

  const result = await db
    .prepare(
      `SELECT id, name, company, email, phone, country, im, bulk_intent, product_slug, message, locale, is_read, created_at
       FROM inquiries
       ${whereSql}
       ORDER BY created_at DESC, id DESC`
    )
    .all<{
      id: number
      name: string
      company: string
      email: string
      phone: string
      country: string
      im: string
      bulk_intent: string
      product_slug: string
      message: string
      locale: string
      is_read: number
      created_at: string
    }>()

  const unreadRow = await db
    .prepare('SELECT COUNT(*) AS count FROM inquiries WHERE is_read = 0')
    .first<{ count: number }>()

  return {
    unreadCount: Number(unreadRow?.count || 0),
    items: (result.results || []).map((row) => ({
      id: row.id,
      name: row.name,
      company: row.company,
      email: row.email,
      phone: row.phone,
      country: row.country,
      im: row.im,
      bulkIntent: row.bulk_intent,
      productSlug: row.product_slug,
      message: row.message,
      locale: row.locale,
      isRead: row.is_read === 1,
      createdAt: row.created_at
    }))
  }
})
