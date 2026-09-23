export type ProductCategory = 'gasoline' | 'diesel' | 'transmission' | 'gear' | 'antifreeze' | 'hydraulic' | 'grease'

export type ProductItem = {
  slug: string
  category: ProductCategory
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
  { slug: 'gas-5w30', category: 'gasoline' },
  { slug: 'gas-10w40', category: 'gasoline' },
  { slug: 'diesel-15w40', category: 'diesel' },
  { slug: 'diesel-ci4', category: 'diesel' },
  { slug: 'atf-vi', category: 'transmission' },
  { slug: 'cvt-fluid', category: 'transmission' },
  { slug: 'gear-85w140', category: 'gear' },
  { slug: 'gear-gl5', category: 'gear' },
  { slug: 'coolant-organic', category: 'antifreeze' },
  { slug: 'coolant-longlife', category: 'antifreeze' },
  { slug: 'hydraulic-aw46', category: 'hydraulic' },
  { slug: 'hydraulic-aw68', category: 'hydraulic' },
  { slug: 'grease-lithium', category: 'grease' },
  { slug: 'grease-ep', category: 'grease' }
]

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug)
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((item) => item.category === category)
}
