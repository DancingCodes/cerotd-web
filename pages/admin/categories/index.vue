<template>
  <div class="admin-page">
    <div class="admin-page-header">
      <div>
        <div class="admin-page-title">{{ $t('admin.categories.title') }}</div>
        <div class="admin-page-subtitle">{{ $t('admin.categories.subtitle') }}</div>
      </div>
      <div class="admin-page-btn" @click="startCreate">{{ $t('admin.categories.new') }}</div>
    </div>

    <div v-if="formOpen" class="admin-form-card">
      <div class="admin-form-title">
        {{ editingSlug ? $t('admin.categories.editTitle') : $t('admin.categories.createTitle') }}
      </div>
      <div class="admin-form-grid">
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.nameEn') }}</div>
          <input v-model="form.nameEn" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.nameZh') }}</div>
          <input v-model="form.nameZh" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.slug') }}</div>
          <input v-model="form.slug" class="admin-field-input" :placeholder="$t('admin.common.autoSlug')" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.sort') }}</div>
          <input v-model.number="form.sortOrder" class="admin-field-input" type="number" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.categories.descEn') }}</div>
          <textarea v-model="form.descEn" class="admin-field-textarea" rows="3" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.categories.descZh') }}</div>
          <textarea v-model="form.descZh" class="admin-field-textarea" rows="3" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.common.coverUrl') }}</div>
          <input v-model="form.coverUrl" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="admin-field-input">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
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
      <div v-else-if="!items.length" class="admin-empty">{{ $t('admin.categories.empty') }}</div>
      <div v-else class="admin-table">
        <div class="admin-table-row admin-table-head">
          <div>{{ $t('admin.common.name') }}</div>
          <div>{{ $t('admin.common.slug') }}</div>
          <div>{{ $t('admin.common.sort') }}</div>
          <div>{{ $t('admin.common.status') }}</div>
          <div>{{ $t('admin.common.actions') }}</div>
        </div>
        <div v-for="item in items" :key="item.id" class="admin-table-row">
          <div>
            <div class="admin-strong">{{ lt(item.name) }}</div>
            <div class="admin-muted">{{ secondaryName(item.name) }}</div>
          </div>
          <div>{{ item.slug }}</div>
          <div>{{ item.sortOrder }}</div>
          <div>{{ item.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</div>
          <div class="admin-row-actions">
            <div class="admin-link" @click="startEdit(item)">{{ $t('admin.common.edit') }}</div>
            <div class="admin-link admin-link-danger" @click="remove(item)">{{ $t('admin.common.delete') }}</div>
          </div>
        </div>
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
  id: number
  slug: string
  name: Localized
  description: Localized
  coverUrl: string | null
  sortOrder: number
  isPublished: boolean
}

const { t, locale } = useI18n()
const lt = useLocalized()
const { authHeaders } = useAdminAuth()
const pending = ref(true)
const items = ref<CategoryItem[]>([])
const formOpen = ref(false)
const editingSlug = ref('')
const formError = ref('')

const emptyForm = () => ({
  slug: '',
  nameEn: '',
  nameZh: '',
  descEn: '',
  descZh: '',
  coverUrl: '',
  sortOrder: 0,
  isPublished: true
})

const form = reactive(emptyForm())

function secondaryName(name: Localized) {
  return locale.value === 'zh' ? name.en : name.zh
}

async function load() {
  pending.value = true
  try {
    const data = await $fetch<{ items: CategoryItem[] }>('/api/categories?all=1', {
      headers: authHeaders()
    })
    items.value = data.items
  } finally {
    pending.value = false
  }
}

function startCreate() {
  editingSlug.value = ''
  Object.assign(form, emptyForm())
  formError.value = ''
  formOpen.value = true
}

function startEdit(item: CategoryItem) {
  editingSlug.value = item.slug
  Object.assign(form, {
    slug: item.slug,
    nameEn: item.name.en,
    nameZh: item.name.zh,
    descEn: item.description.en,
    descZh: item.description.zh,
    coverUrl: item.coverUrl || '',
    sortOrder: item.sortOrder,
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
  const payload = {
    slug: form.slug || undefined,
    nameEn: form.nameEn,
    nameZh: form.nameZh,
    descEn: form.descEn,
    descZh: form.descZh,
    coverUrl: form.coverUrl || null,
    sortOrder: Number(form.sortOrder) || 0,
    isPublished: form.isPublished
  }

  try {
    if (editingSlug.value) {
      await $fetch(`/api/categories/${editingSlug.value}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: payload
      })
    } else {
      await $fetch('/api/categories', {
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

async function remove(item: CategoryItem) {
  if (!window.confirm(t('admin.categories.deleteConfirm', { name: lt(item.name) }))) return
  try {
    await $fetch(`/api/categories/${item.slug}`, {
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
      grid-template-columns: 1.4fr 1fr 0.5fr 0.7fr 0.9fr;
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
  }

  .admin-link {
    color: #0e7f8f;
    font-weight: 650;
    cursor: pointer;
  }

  .admin-link-danger {
    color: #b42318;
  }
}
</style>
