type ContactBody = {
  name?: string
  company?: string
  email?: string
  phone?: string
  country?: string
  im?: string
  bulk?: string
  product?: string
  message?: string
  locale?: string
}

function clean(value?: string) {
  return String(value || '').trim()
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)
  const name = clean(body.name)
  const company = clean(body.company)
  const email = clean(body.email)
  const phone = clean(body.phone)
  const country = clean(body.country)
  const im = clean(body.im)
  const bulk = clean(body.bulk).toLowerCase()
  const product = clean(body.product)
  const message = clean(body.message)
  const locale = clean(body.locale) === 'zh' ? 'zh' : 'en'

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'name is required' })
  }
  if (!email && !phone) {
    throw createError({ statusCode: 400, statusMessage: 'email or phone is required' })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'email is invalid' })
  }
  if (bulk && bulk !== 'yes' && bulk !== 'no') {
    throw createError({ statusCode: 400, statusMessage: 'bulk is invalid' })
  }
  if (
    name.length > 120 ||
    company.length > 160 ||
    email.length > 160 ||
    phone.length > 60 ||
    country.length > 120 ||
    im.length > 120 ||
    product.length > 120 ||
    message.length > 4000
  ) {
    throw createError({ statusCode: 400, statusMessage: 'field too long' })
  }

  const db = useDB(event)
  await db
    .prepare(
      `INSERT INTO inquiries (
        name, company, email, phone, country, im, bulk_intent, product_slug, message, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(name, company, email, phone, country, im, bulk, product, message, locale)
    .run()

  return { ok: true }
})
