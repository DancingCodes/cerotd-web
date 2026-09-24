<template>
  <div class="admin-page">
    <div class="admin-page-header">
      <div>
        <div class="admin-page-title">{{ $t('admin.news.title') }}</div>
        <div class="admin-page-subtitle">
          {{ $t('admin.news.subtitle') }}
          <span v-if="!pending"> · {{ $t('admin.common.totalCount', { count: total }) }}</span>
        </div>
      </div>
      <div class="admin-page-btn" @click="startCreate">{{ $t('admin.news.new') }}</div>
    </div>

    <div v-if="formOpen" class="admin-form-card">
      <div class="admin-form-title">
        {{ editingSlug ? $t('admin.news.editTitle') : $t('admin.news.createTitle') }}
      </div>
      <div class="admin-form-grid">
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.news.titleEn') }}</div>
          <input v-model="form.titleEn" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.news.titleZh') }}</div>
          <input v-model="form.titleZh" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.news.category') }}</div>
          <select v-model="form.category" class="admin-field-input">
            <option v-for="item in categories" :key="item.slug" :value="item.slug">
              {{ lt(item.name) }}
            </option>
          </select>
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.news.publishedAt') }}</div>
          <input v-model="form.publishedAt" class="admin-field-input" type="datetime-local" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="admin-field-input">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
        </label>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.common.coverUrl') }}</div>
          <AdminImageUpload v-model="form.coverUrl" folder="news" :placeholder="$t('admin.upload.placeholder')" />
        </div>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.summaryEn') }}</div>
          <textarea v-model="form.summaryEn" class="admin-field-textarea" rows="2" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.summaryZh') }}</div>
          <textarea v-model="form.summaryZh" class="admin-field-textarea" rows="2" />
        </label>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.contentEn') }}</div>
          <ClientOnly>
            <AdminRichEditor v-model="form.contentEn" folder="news" :hint="$t('admin.news.imageHint')" />
          </ClientOnly>
        </div>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.contentZh') }}</div>
          <ClientOnly>
            <AdminRichEditor v-model="form.contentZh" :hint="$t('admin.news.imageHint')" />
          </ClientOnly>
        </div>
      </div>
      <div v-if="formError" class="admin-error">{{ formError }}</div>
      <div class="admin-form-actions">
        <div class="admin-page-btn" @click="save">{{ $t('admin.common.save') }}</div>
        <div class="admin-page-btn admin-page-btn-muted" @click="closeForm">{{ $t('admin.common.cancel') }}</div>
      </div>
    </div>

    <div class="admin-table-card">
      <div v-if="pending" class="admin-empty">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="admin-empty">{{ $t('admin.news.empty') }}</div>
      <div v-else class="admin-table">
        <div class="admin-table-row admin-table-head">
          <div>{{ $t('admin.common.name') }}</div>
          <div>{{ $t('admin.news.category') }}</div>
          <div>{{ $t('admin.news.publishedAt') }}</div>
          <div>{{ $t('admin.common.status') }}</div>
          <div>{{ $t('admin.common.actions') }}</div>
        </div>
        <div v-for="item in items" :key="item.id" class="admin-table-row">
          <div>
            <div class="admin-strong">{{ lt(item.title) }}</div>
            <div class="admin-muted">{{ item.slug }}</div>
          </div>
          <div>{{ categoryLabel(item.category) }}</div>
          <div>{{ formatDate(item.publishedAt) }}</div>
          <div>{{ item.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</div>
          <div class="admin-row-actions">
            <NuxtLink :to="`/news/${item.slug}`" class="admin-link" target="_blank">{{ $t('admin.common.view') }}</NuxtLink>
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

type NewsItem = {
  id: number
  slug: string
  category: string
  title: Localized
  summary: Localized
  content: Localized
  coverUrl: string | null
  isPublished: boolean
  publishedAt: string
}

const { t } = useI18n()
const lt = useLocalized()
const { authHeaders } = useAdminAuth()

type CategoryItem = {
  slug: string
  name: Localized
}

const categories = ref<CategoryItem[]>([])
const items = ref<NewsItem[]>([])
const pending = ref(true)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const formOpen = ref(false)
const editingSlug = ref('')
const formError = ref('')

const form = reactive({
  titleEn: '',
  titleZh: '',
  slug: '',
  category: 'company',
  summaryEn: '',
  summaryZh: '',
  contentEn: '',
  contentZh: '',
  coverUrl: '',
  publishedAt: '',
  isPublished: false
})

function categoryLabel(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? lt(found.name) : slug
}

function toLocalInput(value: string) {
  if (!value) return ''
  return value.slice(0, 16).replace(' ', 'T')
}

function fromLocalInput(value: string) {
  if (!value) return ''
  return value.length === 16 ? `${value.replace('T', ' ')}:00` : value.replace('T', ' ')
}

function formatDate(value: string) {
  return value ? value.slice(0, 16).replace('T', ' ') : ''
}

function resetForm() {
  Object.assign(form, {
    titleEn: '',
    titleZh: '',
    slug: '',
    category: '',
    summaryEn: '',
    summaryZh: '',
    contentEn: '',
    contentZh: '',
    coverUrl: '',
    publishedAt: toLocalInput(new Date().toISOString()),
    isPublished: false
  })
}

async function load() {
  pending.value = true
  try {
    const [newsData, categoryData] = await Promise.all([
      $fetch<{ items: NewsItem[]; total?: number }>('/api/news', {
        headers: authHeaders(),
        query: { all: 1, page: page.value, pageSize: pageSize.value }
      }),
      $fetch<{ items: CategoryItem[] }>('/api/news-categories?all=1', { headers: authHeaders() })
    ])
    items.value = newsData.items
    total.value = Number(newsData.total || newsData.items.length)
    categories.value = categoryData.items
    if (!form.category && categories.value[0]) {
      form.category = categories.value[0].slug
    }
    if (items.value.length === 0 && page.value > 1) {
      page.value -= 1
      await load()
      return
    }
  } finally {
    pending.value = false
  }
}

function goPage(next: number) {
  page.value = Math.max(1, next)
  load()
}

function startCreate() {
  editingSlug.value = ''
  resetForm()
  formError.value = ''
  formOpen.value = true
}

function startEdit(item: NewsItem) {
  editingSlug.value = item.slug
  Object.assign(form, {
    titleEn: item.title.en,
    titleZh: item.title.zh,
    slug: item.slug,
    category: item.category,
    summaryEn: item.summary.en,
    summaryZh: item.summary.zh,
    contentEn: item.content.en,
    contentZh: item.content.zh,
    coverUrl: item.coverUrl || '',
    publishedAt: toLocalInput(item.publishedAt),
    isPublished: item.isPublished
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
  if (!form.titleEn.trim()) {
    formError.value = t('admin.news.requiredTitleEn')
    return
  }
  if (!form.titleZh.trim()) {
    formError.value = t('admin.news.requiredTitleZh')
    return
  }
  if (!form.category.trim()) {
    formError.value = t('admin.common.requiredCategory')
    return
  }

  const payload = {
    category: form.category,
    titleEn: form.titleEn,
    titleZh: form.titleZh,
    summaryEn: form.summaryEn,
    summaryZh: form.summaryZh,
    contentEn: form.contentEn,
    contentZh: form.contentZh,
    coverUrl: form.coverUrl || null,
    publishedAt: fromLocalInput(form.publishedAt),
    isPublished: form.isPublished
  }

  try {
    if (editingSlug.value) {
      await $fetch(`/api/news/${editingSlug.value}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: payload
      })
    } else {
      await $fetch('/api/news', {
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

async function remove(item: NewsItem) {
  if (!window.confirm(t('admin.news.deleteConfirm', { name: lt(item.title) }))) return
  try {
    await $fetch(`/api/news/${item.slug}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    await load()
  } catch (err: any) {
    window.alert(err?.data?.statusMessage || err?.statusMessage || t('admin.common.deleteFailed'))
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
      background: #ffffff;
      outline: none;
    }

    .admin-field-input {
      height: 42px;
      padding: 0 12px;
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
      grid-template-columns: 1.6fr 0.8fr 0.9fr 0.7fr 1.1fr;
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

</style>
