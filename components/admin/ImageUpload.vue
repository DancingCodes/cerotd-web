<template>
  <div class="image-upload">
    <div class="image-upload-row">
      <label class="image-upload-btn">
        {{ uploading ? $t('admin.upload.uploading') : inner ? $t('admin.upload.replace') : $t('admin.upload.button') }}
        <input
          class="image-upload-file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          :disabled="uploading"
          @change="onFile"
        />
      </label>
      <button
        v-if="inner"
        type="button"
        class="image-upload-clear"
        :disabled="uploading"
        @click="clearImage"
      >
        {{ $t('admin.common.delete') }}
      </button>
    </div>
    <p v-if="error" class="image-upload-error">{{ error }}</p>
    <img v-if="inner" class="image-upload-preview" :src="inner" alt="" />
    <p v-else class="image-upload-empty">{{ $t('admin.upload.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    folder?: string
  }>(),
  {
    modelValue: '',
    folder: 'uploads'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { t } = useI18n()
const { authHeaders } = useAdminAuth()

const inner = ref(props.modelValue || '')
const uploading = ref(false)
const error = ref('')

watch(
  () => props.modelValue,
  (value) => {
    inner.value = value || ''
  }
)

function emitUrl(value = inner.value.trim()) {
  emit('update:modelValue', value)
}

function clearImage() {
  inner.value = ''
  error.value = ''
  emitUrl('')
}

async function onFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  uploading.value = true
  error.value = ''
  try {
    const body = new FormData()
    body.append('file', file)
    body.append('folder', props.folder)
    const result = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      headers: authHeaders(),
      body
    })
    inner.value = result.url
    emitUrl()
  } catch (err: any) {
    error.value = err?.data?.statusMessage || err?.statusMessage || t('admin.upload.failed')
  } finally {
    uploading.value = false
  }
}
</script>

<style lang="scss" scoped>
.image-upload {
  .image-upload-row {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .image-upload-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    padding: 0 14px;
    border-radius: 12px;
    background: #e8f7f9;
    color: #0e7f8f;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }

  .image-upload-clear {
    height: 42px;
    padding: 0 14px;
    border-radius: 12px;
    border: 1px solid #f0d0cc;
    background: #fff5f4;
    color: #b42318;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }

  .image-upload-file {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .image-upload-error {
    margin-top: 8px;
    color: #b42318;
    font-size: 12px;
  }

  .image-upload-empty {
    margin-top: 10px;
    color: #6b7280;
    font-size: 13px;
  }

  .image-upload-preview {
    display: block;
    margin-top: 10px;
    max-width: 220px;
    max-height: 140px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid #e5eaf0;
  }
}
</style>
