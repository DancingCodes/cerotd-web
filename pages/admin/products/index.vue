<template>
  <div class="admin-page">
    <div class="admin-page-header">
      <div>
        <div class="admin-page-title">{{ $t('admin.products.title') }}</div>
        <div class="admin-page-subtitle">
          {{ $t('admin.products.subtitle') }}
          <span v-if="!pending"> · {{ $t('admin.common.totalCount', { count: total }) }}</span>
        </div>
      </div>
      <div class="admin-page-header-actions">
        <div
          v-if="selectedSlugs.length"
          class="admin-page-btn admin-page-btn-danger"
          :class="{ 'is-disabled': batchDeleting }"
          @click="removeSelected"
        >
          {{ $t('admin.common.batchDelete') }} · {{ selectedSlugs.length }}
        </div>
        <div class="admin-page-btn" @click="startCreate">{{ $t('admin.products.new') }}</div>
      </div>
    </div>

    <div class="admin-filters">
      <div class="admin-filter-row">
        <input
          v-model="searchInput"
          class="admin-filter-input"
          type="search"
          :placeholder="$t('admin.common.searchPlaceholder')"
          @keyup.enter="applyFilters"
        />
        <select v-model="filterCategory" class="admin-filter-select" @change="applyFilters">
          <option value="">{{ $t('admin.common.allCategories') }}</option>
          <option v-for="category in categories" :key="category.slug" :value="category.slug">
            {{ lt(category.name) }}
          </option>
        </select>
        <select v-model="filterStatus" class="admin-filter-select" @change="applyFilters">
          <option value="all">{{ $t('admin.common.allStatuses') }}</option>
          <option value="published">{{ $t('admin.common.filterPublished') }}</option>
          <option value="draft">{{ $t('admin.common.filterDraft') }}</option>
        </select>
        <button type="button" class="admin-page-btn admin-page-btn-muted" @click="applyFilters">
          {{ $t('admin.common.search') }}
        </button>
      </div>
    </div>
    <div v-if="formOpen" class="admin-form-card">
      <div class="admin-form-title">
        {{ editingSlug ? $t('admin.products.editTitle') : $t('admin.products.createTitle') }}
      </div>
      <div class="admin-form-grid">
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.common.nameEn') }}</div>
          <input v-model="form.nameEn" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.common.nameZh') }}</div>
          <input v-model="form.nameZh" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.products.category') }}</div>
          <select v-model="form.categorySlug" class="admin-field-input">
            <option value="">{{ $t('admin.products.selectCategory') }}</option>
            <option v-for="category in categories" :key="category.slug" :value="category.slug">
              {{ lt(category.name) }}
            </option>
          </select>
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.sort') }}</div>
          <input v-model.number="form.sortOrder" class="admin-field-input" type="number" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="admin-field-input">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.products.showOnHome') }}</div>
          <select v-model="form.showOnHome" class="admin-field-input">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.summaryEn') }}</div>
          <textarea v-model="form.summaryEn" class="admin-field-textarea" rows="2" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.summaryZh') }}</div>
          <textarea v-model="form.summaryZh" class="admin-field-textarea" rows="2" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.descriptionEn') }}</div>
          <textarea v-model="form.descriptionEn" class="admin-field-textarea" rows="4" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.descriptionZh') }}</div>
          <textarea v-model="form.descriptionZh" class="admin-field-textarea" rows="4" />
        </label>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.common.coverUrl') }}</div>
          <AdminImageUpload v-model="form.coverUrl" folder="products" />
        </div>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.images') }}</div>
          <AdminImageListUpload v-model="form.images" folder="products" />
        </div>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.specsEn') }}</div>
          <textarea v-model="form.specsEnText" class="admin-field-textarea" rows="3" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.specsZh') }}</div>
          <textarea v-model="form.specsZhText" class="admin-field-textarea" rows="3" />
        </label>
      </div>
      <div v-if="formError" class="admin-error">{{ formError }}</div>
      <div class="admin-form-actions">
        <div class="admin-page-btn" @click="save">{{ $t('admin.common.save') }}</div>
        <div class="admin-page-btn admin-page-btn-muted" @click="closeForm">{{ $t('admin.common.cancel') }}</div>
      </div>
    </div>

    <div class="admin-table-card">
      <div v-if="pending" class="admin-empty">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="admin-empty">{{ $t('admin.products.empty') }}</div>
      <div v-else class="admin-table">
        <div class="admin-table-row admin-table-head">
          <div class="admin-table-check">
            <input
              type="checkbox"
              :checked="allSelected"
              :aria-label="$t('admin.common.batchDelete')"
              @change="onSelectAllChange($event)"
            />
          </div>
          <div>{{ $t('admin.common.name') }}</div>
          <div>{{ $t('admin.products.category') }}</div>
          <div>{{ $t('admin.common.sort') }}</div>
          <div>{{ $t('admin.common.status') }}</div>
          <div>{{ $t('admin.common.actions') }}</div>
        </div>
        <div v-for="item in items" :key="item.id" class="admin-table-row">
          <div class="admin-table-check">
            <input
              type="checkbox"
              :checked="selectedSlugs.includes(item.slug)"
              @change="onSelectChange(item.slug, $event)"
            />
          </div>
          <div>
            <div class="admin-strong">{{ lt(item.name) }}</div>
            <div class="admin-muted">{{ item.slug }}</div>
          </div>
          <div>{{ item.category ? lt(item.category.name) : '-' }}</div>
          <div>{{ item.sortOrder }}</div>
          <div>{{ item.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</div>
          <div class="admin-row-actions">
            <NuxtLink :to="`/products/${item.slug}`" class="admin-link" target="_blank">{{ $t('admin.common.view') }}</NuxtLink>
            <div class="admin-link" @click="startEdit(item)">{{ $t('admin.common.edit') }}</div>
            <div class="admin-link admin-link-danger" @click="remove(item)">{{ $t('admin.common.delete') }}</div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="admin-pagination">
        <button type="button" class="admin-pagination-btn" :disabled="page <= 1" @click="goPage(page - 1)">
          {{ $t('admin.common.prevPage') }}
        </button>
        <span class="admin-pagination-status">{{ $t('admin.common.pageStatus', { page, totalPages }) }}</span>
        <button type="button" class="admin-pagination-btn" :disabled="page >= totalPages" @click="goPage(page + 1)">
          {{ $t('admin.common.nextPage') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

type Localized = { en: string; zh: string }

type CategoryItem = {
  slug: string
  name: Localized
}

type ProductItem = {
  id: number
  slug: string
  category: { slug: string; name: Localized } | null
  name: Localized
  summary: Localized
  description: Localized
  coverUrl: string | null
  images: string[]
  specs: { en: string[]; zh: string[] }
  sortOrder: number
  isPublished: boolean
  showOnHome: boolean
}

const { t } = useI18n()
const lt = useLocalized()
const { authHeaders } = useAdminAuth()
const pending = ref(true)
const searchInput = ref('')
const search = ref('')
const filterCategory = ref('')
const filterStatus = ref<'all' | 'published' | 'draft'>('all')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const selectedSlugs = ref<string[]>([])
const batchDeleting = ref(false)
const allSelected = computed(() => items.value.length > 0 && items.value.every((item) => selectedSlugs.value.includes(item.slug)))
const items = ref<ProductItem[]>([])
const categories = ref<CategoryItem[]>([])
const formOpen = ref(false)
const editingSlug = ref('')
const formError = ref('')

const emptyForm = () => ({
  slug: '',
  categorySlug: '',
  nameEn: '',
  nameZh: '',
  summaryEn: '',
  summaryZh: '',
  descriptionEn: '',
  descriptionZh: '',
  coverUrl: '',
  images: [],
  specsEnText: '',
  specsZhText: '',
  sortOrder: 0,
  isPublished: true,
  showOnHome: false
})

const form = reactive(emptyForm())

function linesToArray(text: string) {
  return text
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function toggleSelect(slug: string, checked: boolean) {
  if (checked) {
    if (!selectedSlugs.value.includes(slug)) selectedSlugs.value = [...selectedSlugs.value, slug]
  } else {
    selectedSlugs.value = selectedSlugs.value.filter((item) => item !== slug)
  }
}

function toggleSelectAll(checked: boolean) {
  selectedSlugs.value = checked ? items.value.map((item) => item.slug) : []
}

function onSelectAllChange(event: Event) {
  toggleSelectAll((event.target as HTMLInputElement).checked)
}

function onSelectChange(slug: string, event: Event) {
  toggleSelect(slug, (event.target as HTMLInputElement).checked)
}

async function load() {
  pending.value = true
  try {
    const [productData, categoryData] = await Promise.all([
      $fetch<{ items: ProductItem[]; total?: number }>('/api/products', {
        headers: authHeaders(),
        query: {
          all: 1,
          page: page.value,
          pageSize: pageSize.value,
          q: search.value || undefined,
          category: filterCategory.value || undefined,
          status: filterStatus.value
        }
      }),
      $fetch<{ items: CategoryItem[] }>('/api/product-categories?all=1', { headers: authHeaders() })
    ])
    items.value = productData.items
    total.value = Number(productData.total || productData.items.length)
    categories.value = categoryData.items
    if (items.value.length === 0 && page.value > 1) {
      page.value -= 1
      await load()
      return
    }
  } finally {
    pending.value = false
  }
}

function applyFilters() {
  search.value = searchInput.value.trim()
  page.value = 1
  load()
}

function goPage(next: number) {
  page.value = Math.max(1, next)
  load()
}

function startCreate() {
  editingSlug.value = ''
  Object.assign(form, emptyForm())
  formError.value = ''
  formOpen.value = true
}

function startEdit(item: ProductItem) {
  editingSlug.value = item.slug
  Object.assign(form, {
    slug: item.slug,
    categorySlug: item.category?.slug || '',
    nameEn: item.name.en,
    nameZh: item.name.zh,
    summaryEn: item.summary.en,
    summaryZh: item.summary.zh,
    descriptionEn: item.description.en,
    descriptionZh: item.description.zh,
    coverUrl: item.coverUrl || '',
    images: [...item.images],
    specsEnText: item.specs.en.join('\n'),
    specsZhText: item.specs.zh.join('\n'),
    sortOrder: item.sortOrder,
    isPublished: item.isPublished,
    showOnHome: item.showOnHome
  })
  formError.value = ''
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  formError.value = ''
}

async function save() {
  formError.value = ''
  if (!form.nameEn.trim()) {
    formError.value = t('admin.common.requiredNameEn')
    return
  }
  if (!form.nameZh.trim()) {
    formError.value = t('admin.common.requiredNameZh')
    return
  }
  if (!form.categorySlug.trim()) {
    formError.value = t('admin.common.requiredCategory')
    return
  }

  const payload = {
    categorySlug: form.categorySlug,
    nameEn: form.nameEn,
    nameZh: form.nameZh,
    summaryEn: form.summaryEn,
    summaryZh: form.summaryZh,
    descriptionEn: form.descriptionEn,
    descriptionZh: form.descriptionZh,
    coverUrl: form.coverUrl || null,
    images: form.images,
    specsEn: linesToArray(form.specsEnText),
    specsZh: linesToArray(form.specsZhText),
    sortOrder: Number(form.sortOrder) || 0,
    isPublished: form.isPublished,
    showOnHome: form.showOnHome
  }

  try {
    if (editingSlug.value) {
      await $fetch(`/api/products/${editingSlug.value}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: payload
      })
    } else {
      await $fetch('/api/products', {
        method: 'POST',
        headers: authHeaders(),
        body: payload
      })
    }
    closeForm()
    await load()
  } catch (err: any) {
    formError.value = err?.data?.statusMessage || err?.statusMessage || t('admin.common.saveFailed')
  }
}

async function remove(item: ProductItem) {
  if (!window.confirm(t('admin.products.deleteConfirm', { name: lt(item.name) }))) return
  try {
    await $fetch(`/api/products/${item.slug}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    await load()
  } catch (err: any) {
    window.alert(err?.data?.statusMessage || err?.statusMessage || t('admin.common.deleteFailed'))
  }
}

async function removeSelected() {
  if (!selectedSlugs.value.length || batchDeleting.value) return
  if (!window.confirm(t('admin.common.batchDeleteConfirm', { count: selectedSlugs.value.length }))) return
  batchDeleting.value = true
  try {
    const slugs = [...selectedSlugs.value]
    for (const slug of slugs) {
      await $fetch(`/api/products/${slug}`, {
        method: 'DELETE',
        headers: authHeaders()
      })
    }
    selectedSlugs.value = []
    await load()
  } catch (err: any) {
    window.alert(err?.data?.statusMessage || err?.statusMessage || t('admin.common.deleteFailed'))
    await load()
  } finally {
    batchDeleting.value = false
  }
}


onMounted(load)
</script>

<style lang="scss" scoped>
.admin-page {
  .admin-page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;

    .admin-page-title {
      margin-bottom: 6px;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .admin-page-subtitle {
      color: #6b7280;
      font-size: 14px;
    }
  }

  .admin-page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 16px;
    border-radius: 12px;
    background: #0e7f8f;
    color: #ffffff;
    font-size: 14px;
    font-weight: 650;
    cursor: pointer;
    white-space: nowrap;
  }

    .admin-page-btn-muted {
    background: #eef1f4;
    color: #374151;
  }

  .admin-page-btn-danger {
    background: #b42318;
  }

  .admin-page-btn.is-disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .admin-page-header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .admin-table-check {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }

  .admin-form-card,
  .admin-table-card {
    margin-bottom: 18px;
    padding: 20px;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid #e5eaf0;
  }

  .admin-form-title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 700;
  }

  .admin-form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .admin-field {
    display: block;

    .admin-field-label {
      margin-bottom: 6px;
      color: #4b5563;
      font-size: 13px;
      font-weight: 600;
    }

    .admin-field-label.is-required::after {
      content: ' *';
      color: #b42318;
    }

    .admin-field-input,
    .admin-field-textarea {
      width: 100%;
      border: 1px solid #d7dee7;
      border-radius: 12px;
      background-color: #ffffff;
      outline: none;
    }

    .admin-field-input {
      height: 42px;
      padding: 0 12px;
    }

    select.admin-field-input {
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
      padding-right: 40px;
      background-color: #ffffff;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%236b7280' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px 16px;
    }


    .admin-field-textarea {
      padding: 10px 12px;
      resize: vertical;
    }
  }

  .admin-field-full {
    @media (min-width: 768px) {
      grid-column: 1 / -1;
    }
  }

  .admin-form-actions {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  .admin-error {
    margin-top: 12px;
    color: #b42318;
    font-size: 13px;
  }

  .admin-empty {
    color: #6b7280;
    font-size: 14px;
  }

  .admin-table {
    .admin-table-row {
      display: grid;
      grid-template-columns: 36px 1.5fr 1fr 0.5fr 0.7fr 1.1fr;
      gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #eef1f4;
      align-items: center;
      font-size: 14px;
    }

    .admin-table-head {
      color: #6b7280;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
  }

  .admin-strong {
    font-weight: 650;
  }

  .admin-muted {
    margin-top: 2px;
    color: #6b7280;
    font-size: 12px;
  }

  .admin-row-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .admin-link {
    color: #0e7f8f;
    font-weight: 650;
    cursor: pointer;
    text-decoration: none;
  }

  .admin-link-danger {
    color: #b42318;
  }
}

  .admin-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 16px;
  }

  .admin-pagination-btn {
    height: 34px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid #d7dee7;
    background: #ffffff;
    color: #374151;
    font-size: 13px;
    font-weight: 650;
    cursor: pointer;
  }

  .admin-pagination-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .admin-pagination-status {
    color: #6b7280;
    font-size: 13px;
  }


  .admin-filters {
    display: grid;
    gap: 10px;
    margin-bottom: 16px;
  }

  .admin-filter-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: 768px) {
      grid-template-columns: 1.4fr 1fr 1fr auto;
      align-items: center;
    }
  }

  .admin-filter-input,
  .admin-filter-select {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border-radius: 12px;
    border: 1px solid #d7dee7;
    background-color: #ffffff;
    outline: none;
    font: inherit;
  }

  select.admin-filter-select {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    padding-right: 40px;
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%236b7280' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px 16px;
  }


  .admin-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .admin-filter-chip {
    height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid #e5eaf0;
    background: #ffffff;
    color: #4b5563;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .admin-filter-chip-active {
    border-color: #0e7f8f;
    background: #e8f7f9;
    color: #0e7f8f;
  }

</style>
