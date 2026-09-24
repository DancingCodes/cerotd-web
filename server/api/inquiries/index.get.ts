export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const result = await db
    .prepare(
      `SELECT id, name, company, email, phone, country, im, bulk_intent, product_slug, message, locale, created_at
       FROM inquiries
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
      created_at: string
    }>()

  return {
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
      createdAt: row.created_at
    }))
  }
})
