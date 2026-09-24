<template>
  <div class="image-list-upload">
    <div class="image-list-upload-actions">
      <label class="image-list-upload-btn">
        {{ uploading ? $t('admin.upload.uploading') : $t('admin.upload.addImage') }}
        <input
          class="image-list-upload-file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          :disabled="uploading"
          multiple
          @change="onFiles"
        />
      </label>
    </div>
    <p v-if="error" class="image-list-upload-error">{{ error }}</p>
    <div v-if="images.length" class="image-list-upload-grid">
      <div v-for="(url, index) in images" :key="url + '-' + index" class="image-list-upload-item">
        <img :src="url" alt="" class="image-list-upload-preview" />
        <button type="button" class="image-list-upload-remove" @click="removeAt(index)">
          {{ $t('admin.common.delete') }}
        </button>
      </div>
    </div>
    <p v-else class="image-list-upload-empty">{{ $t('admin.upload.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    folder?: string
    placeholder?: string
  }>(),
  {
    modelValue: () => [],
    folder: 'products',
    placeholder: ''
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const { t } = useI18n()
const { authHeaders } = useAdminAuth()
const images = ref<string[]>([...(props.modelValue || [])])
const uploading = ref(false)
const error = ref('')

watch(
  () => props.modelValue,
  (value) => {
    images.value = [...(value || [])]
  }
)

function emitImages() {
  emit('update:modelValue', [...images.value])
}

function removeAt(index: number) {
  images.value.splice(index, 1)
  emitImages()
}

async function onFiles(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  if (!files.length) return

  uploading.value = true
  error.value = ''
  try {
    for (const file of files) {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', props.folder)
      const result = await $fetch<{ url: string }>('/api/upload', {
        method: 'POST',
        headers: authHeaders(),
        body
      })
      if (result.url) images.value.push(result.url)
    }
    emitImages()
  } catch (err: any) {
    error.value = err?.data?.statusMessage || err?.statusMessage || t('admin.upload.failed')
  } finally {
    uploading.value = false
  }
}
</script>

<style lang="scss" scoped>
.image-list-upload {
  .image-list-upload-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .image-list-upload-btn {
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
  }

  .image-list-upload-file {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .image-list-upload-error {
    margin-top: 8px;
    color: #b42318;
    font-size: 12px;
  }

  .image-list-upload-empty {
    margin-top: 10px;
    color: #6b7280;
    font-size: 13px;
  }

  .image-list-upload-grid {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .image-list-upload-item {
    border: 1px solid #e5eaf0;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  }

  .image-list-upload-preview {
    display: block;
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  .image-list-upload-remove {
    width: 100%;
    height: 34px;
    border: none;
    background: #f8fafc;
    color: #b42318;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
