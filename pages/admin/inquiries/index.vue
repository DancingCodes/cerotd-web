<template>
  <div class="admin-page">
    <div class="admin-page-header">
      <div>
        <div class="admin-page-title">{{ $t('admin.inquiries.title') }}</div>
        <div class="admin-page-subtitle">
          {{ $t('admin.inquiries.subtitle') }}
          <span v-if="unreadCount"> · {{ $t('admin.inquiries.unreadCount', { count: unreadCount }) }}</span>
        </div>
      </div>
      <div class="admin-page-btn admin-page-btn-muted" @click="load">{{ $t('admin.inquiries.refresh') }}</div>
    </div>

    <div class="admin-filters">
      <div class="admin-filter-group" role="tablist" :aria-label="$t('admin.inquiries.filterStatus')">
        <button
          v-for="item in statusFilters"
          :key="item.value"
          type="button"
          class="admin-filter-chip"
          :class="{ 'admin-filter-chip-active': status === item.value }"
          @click="setStatus(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="admin-filter-group" role="tablist" :aria-label="$t('admin.inquiries.filterRange')">
        <button
          v-for="item in rangeFilters"
          :key="item.value"
          type="button"
          class="admin-filter-chip"
          :class="{ 'admin-filter-chip-active': range === item.value }"
          @click="setRange(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div class="admin-table-card">
      <div v-if="pending" class="admin-empty">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="admin-empty">{{ $t('admin.inquiries.empty') }}</div>
      <div v-else class="inquiry-list">
        <article
          v-for="item in items"
          :key="item.id"
          class="inquiry-card"
          :class="{ 'inquiry-card-unread': !item.isRead }"
        >
          <div class="inquiry-card-top">
            <div>
              <div class="admin-strong">
                <span v-if="!item.isRead" class="inquiry-dot" aria-hidden="true"></span>
                {{ item.name }}
                <span class="inquiry-status">{{ item.isRead ? $t('admin.inquiries.read') : $t('admin.inquiries.unread') }}</span>
              </div>
              <div class="admin-muted">{{ item.company || $t('admin.inquiries.noCompany') }} · {{ formatDate(item.createdAt) }}</div>
            </div>
            <div class="admin-row-actions">
              <div class="admin-link" @click="toggle(item)">
                {{ openId === item.id ? $t('admin.inquiries.hide') : $t('admin.inquiries.view') }}
              </div>
              <div class="admin-link" @click="setRead(item, !item.isRead)">
                {{ item.isRead ? $t('admin.inquiries.markUnread') : $t('admin.inquiries.markRead') }}
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
  isRead: boolean
  createdAt: string
}

type StatusFilter = 'all' | 'unread' | 'read'
type RangeFilter = 'all' | 'today' | '7d' | '30d'

const { t } = useI18n()
const { authHeaders } = useAdminAuth()

const items = ref<InquiryItem[]>([])
const unreadCount = ref(0)
const pending = ref(true)
const openId = ref<number | null>(null)
const status = ref<StatusFilter>('all')
const range = ref<RangeFilter>('all')

const statusFilters = computed(() => [
  { value: 'all' as const, label: t('admin.inquiries.filterAll') },
  { value: 'unread' as const, label: t('admin.inquiries.filterUnread') },
  { value: 'read' as const, label: t('admin.inquiries.filterRead') }
])

const rangeFilters = computed(() => [
  { value: 'all' as const, label: t('admin.inquiries.rangeAll') },
  { value: 'today' as const, label: t('admin.inquiries.rangeToday') },
  { value: '7d' as const, label: t('admin.inquiries.range7d') },
  { value: '30d' as const, label: t('admin.inquiries.range30d') }
])

function formatDate(value: string) {
  return value ? value.slice(0, 16).replace('T', ' ') : ''
}

function formatBulk(value: string) {
  if (value === 'yes') return t('admin.inquiries.bulkYes')
  if (value === 'no') return t('admin.inquiries.bulkNo')
  return '-'
}

function setStatus(value: StatusFilter) {
  status.value = value
  load()
}

function setRange(value: RangeFilter) {
  range.value = value
  load()
}

async function toggle(item: InquiryItem) {
  openId.value = openId.value === item.id ? null : item.id
  if (openId.value === item.id && !item.isRead) {
    await setRead(item, true, false)
  }
}

async function load() {
  pending.value = true
  try {
    const data = await $fetch<{ items: InquiryItem[]; unreadCount: number }>('/api/inquiries', {
      headers: authHeaders(),
      query: {
        status: status.value,
        range: range.value
      }
    })
    items.value = data.items
    unreadCount.value = data.unreadCount || 0
  } finally {
    pending.value = false
  }
}

async function setRead(item: InquiryItem, isRead: boolean, reload = true) {
  try {
    await $fetch('/api/inquiries/' + item.id, {
      method: 'PATCH',
      headers: authHeaders(),
      body: { isRead }
    })
    item.isRead = isRead
    if (isRead) unreadCount.value = Math.max(0, unreadCount.value - 1)
    else unreadCount.value += 1
    if (reload && (status.value === 'unread' || status.value === 'read')) {
      await load()
    }
  } catch (err: any) {
    window.alert(err?.data?.statusMessage || err?.statusMessage || t('admin.common.saveFailed'))
  }
}

async function remove(item: InquiryItem) {
  if (!window.confirm(t('admin.inquiries.deleteConfirm', { name: item.name }))) return
  try {
    await $fetch('/api/inquiries/' + item.id, {
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
    margin-bottom: 18px;
  }

  .admin-page-title {
    font-size: 28px;
    font-weight: 650;
  }

  .admin-page-subtitle {
    margin-top: 6px;
    color: #6b7280;
    font-size: 14px;
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

  .admin-filters {
    display: grid;
    gap: 10px;
    margin-bottom: 16px;
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

  .inquiry-card-unread {
    border-color: #cfeef2;
    background: #f3fbfd;
  }

  .inquiry-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .inquiry-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 50%;
    background: #0e7f8f;
    vertical-align: middle;
  }

  .inquiry-status {
    margin-left: 8px;
    padding: 2px 8px;
    border-radius: 999px;
    background: #eef1f4;
    color: #6b7280;
    font-size: 11px;
    font-weight: 700;
    vertical-align: middle;
  }

  .inquiry-card-unread .inquiry-status {
    background: #d8f3f7;
    color: #0e7f8f;
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
