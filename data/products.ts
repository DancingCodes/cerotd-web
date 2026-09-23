export type ProductCategory = 'gasoline' | 'diesel' | 'transmission' | 'gear' | 'antifreeze' | 'hydraulic' | 'grease'

export type ProductItem = {
  slug: string
  category: ProductCategory
  image?: string
}

export const productCategories: ProductCategory[] = [
  'gasoline',
  'diesel',
  'transmission',
  'gear',
  'antifreeze',
  'hydraulic',
  'grease'
]

export const products: ProductItem[] = [
  { slug: 'cf4-15w40', category: 'diesel', image: '/images/products/cf4-15w40.jpg' },
  { slug: 'cf4-20w50', category: 'diesel', image: '/images/products/cf4-20w50.jpg' },
  { slug: 'ch4-15w40', category: 'diesel', image: '/images/products/ch4-15w40.jpg' },
  { slug: 'ch4-20w50', category: 'diesel', image: '/images/products/ch4-20w50.jpg' },
  { slug: 'ci4-15w40', category: 'diesel', image: '/images/products/ci4-15w40.jpg' },
  { slug: 'atf6', category: 'transmission', image: '/images/products/atf6.jpg' },
  { slug: 'atf9', category: 'transmission', image: '/images/products/atf9.jpg' },
  { slug: 'atf10', category: 'transmission', image: '/images/products/atf10.jpg' },
  { slug: 'antifreeze-g11-green', category: 'antifreeze', image: '/images/products/antifreeze-g11-green.png' },
  { slug: 'antifreeze-g11-red', category: 'antifreeze', image: '/images/products/antifreeze-g11-red.png' }
]

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug)
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((item) => item.category === category)
}
