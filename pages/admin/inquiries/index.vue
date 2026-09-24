<template>
  <div class="admin-page">
    <div class="admin-page-header">
      <div>
        <div class="admin-page-title">{{ $t('admin.inquiries.title') }}</div>
        <div class="admin-page-subtitle">{{ $t('admin.inquiries.subtitle') }}</div>
      </div>
      <div class="admin-page-btn admin-page-btn-muted" @click="load">{{ $t('admin.inquiries.refresh') }}</div>
    </div>

    <div class="admin-table-card">
      <div v-if="pending" class="admin-empty">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="admin-empty">{{ $t('admin.inquiries.empty') }}</div>
      <div v-else class="inquiry-list">
        <article v-for="item in items" :key="item.id" class="inquiry-card">
          <div class="inquiry-card-top">
            <div>
              <div class="admin-strong">{{ item.name }}</div>
              <div class="admin-muted">{{ item.company || $t('admin.inquiries.noCompany') }} · {{ formatDate(item.createdAt) }}</div>
            </div>
            <div class="admin-row-actions">
              <div class="admin-link" @click="toggle(item.id)">
                {{ openId === item.id ? $t('admin.inquiries.hide') : $t('admin.inquiries.view') }}
              </div>
              <div class="admin-link admin-link-danger" @click="remove(item)">{{ $t('admin.common.delete') }}</div>
            </div>
          </div>

          <div class="inquiry-card-grid">
            <div><span>{{ $t('admin.inquiries.email') }}</span>{{ item.email || '-' }}</div>
            <div><span>{{ $t('admin.inquiries.phone') }}</span>{{ item.phone || '-' }}</div>
            <div><span>{{ $t('admin.inquiries.country') }}</span>{{ item.country || '-' }}</div>
            <div><span>{{ $t('admin.inquiries.product') }}</span>{{ item.productSlug || '-' }}</div>
          </div>

          <div v-if="openId === item.id" class="inquiry-card-detail">
            <div class="inquiry-detail-row"><span>{{ $t('admin.inquiries.im') }}</span>{{ item.im || '-' }}</div>
            <div class="inquiry-detail-row"><span>{{ $t('admin.inquiries.bulk') }}</span>{{ formatBulk(item.bulkIntent) }}</div>
            <div class="inquiry-detail-row"><span>{{ $t('admin.inquiries.locale') }}</span>{{ item.locale }}</div>
            <div class="inquiry-message">
              <div class="inquiry-message-label">{{ $t('admin.inquiries.message') }}</div>
              <p>{{ item.message || $t('admin.inquiries.noMessage') }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

type InquiryItem = {
  id: number
  name: string
  company: string
  email: string
  phone: string
  country: string
  im: string
  bulkIntent: string
  productSlug: string
  message: string
  locale: string
  createdAt: string
}

const { t } = useI18n()
const { authHeaders } = useAdminAuth()

const items = ref<InquiryItem[]>([])
const pending = ref(true)
const openId = ref<number | null>(null)

function formatDate(value: string) {
  return value ? value.slice(0, 16).replace('T', ' ') : ''
}

function formatBulk(value: string) {
  if (value === 'yes') return t('admin.inquiries.bulkYes')
  if (value === 'no') return t('admin.inquiries.bulkNo')
  return '-'
}

function toggle(id: number) {
  openId.value = openId.value === id ? null : id
}

async function load() {
  pending.value = true
  try {
    const data = await $fetch<{ items: InquiryItem[] }>('/api/inquiries', {
      headers: authHeaders()
    })
    items.value = data.items
  } finally {
    pending.value = false
  }
}

async function remove(item: InquiryItem) {
  if (!window.confirm(t('admin.inquiries.deleteConfirm', { name: item.name }))) return
  try {
    await $fetch(`/api/inquiries/${item.id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    if (openId.value === item.id) openId.value = null
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

  .admin-table-card {
    margin-bottom: 18px;
    padding: 20px;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid #e5eaf0;
  }

  .admin-empty {
    color: #6b7280;
    font-size: 14px;
  }

  .inquiry-list {
    display: grid;
    gap: 14px;
  }

  .inquiry-card {
    padding: 16px;
    border-radius: 14px;
    border: 1px solid #eef1f4;
    background: #fbfcfd;
  }

  .inquiry-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .inquiry-card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    font-size: 13px;
    color: #374151;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    span {
      display: inline-block;
      min-width: 72px;
      color: #6b7280;
      font-weight: 600;
    }
  }

  .inquiry-card-detail {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #eef1f4;
  }

  .inquiry-detail-row {
    margin-bottom: 8px;
    font-size: 13px;
    color: #374151;

    span {
      display: inline-block;
      min-width: 72px;
      color: #6b7280;
      font-weight: 600;
    }
  }

  .inquiry-message {
    margin-top: 12px;
    padding: 12px;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid #e5eaf0;

    .inquiry-message-label {
      margin-bottom: 6px;
      color: #6b7280;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    p {
      color: #111827;
      font-size: 14px;
      line-height: 1.7;
      white-space: pre-wrap;
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
</style>
