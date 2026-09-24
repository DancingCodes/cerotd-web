<template>
  <div class="rich-editor">
    <div v-if="editor" class="rich-editor-toolbar">
      <button type="button" class="rich-editor-btn" :class="{ 'rich-editor-btn-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">B</button>
      <button type="button" class="rich-editor-btn" :class="{ 'rich-editor-btn-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">I</button>
      <button type="button" class="rich-editor-btn" :class="{ 'rich-editor-btn-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
      <button type="button" class="rich-editor-btn" :class="{ 'rich-editor-btn-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">H3</button>
      <button type="button" class="rich-editor-btn" :class="{ 'rich-editor-btn-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">List</button>
      <button type="button" class="rich-editor-btn" :class="{ 'rich-editor-btn-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">1.</button>
      <button type="button" class="rich-editor-btn" @click="addImage">Image</button>
      <button type="button" class="rich-editor-btn" @click="editor.chain().focus().unsetAllMarks().clearNodes().run()">Clear</button>
    </div>
    <EditorContent :editor="editor" class="rich-editor-content" />
    <p class="rich-editor-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

const props = defineProps<{
  modelValue: string
  hint?: string
  folder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { authHeaders } = useAdminAuth()
const { t } = useI18n()

const editor = shallowRef<Editor | null>(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false
      }),
      Link.configure({
        openOnClick: false,
        autolink: true
      })
    ],
    content: props.modelValue || '',
    onUpdate: ({ editor: current }) => {
      emit('update:modelValue', current.getHTML())
    }
  })
})

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return
    const current = editor.value.getHTML()
    if (value !== current) {
      editor.value.commands.setContent(value || '', { emitUpdate: false })
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
  editor.value = null
})

async function addImage() {
  if (!editor.value) return
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/jpeg,image/png,image/webp,image/gif,image/avif'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', props.folder || 'news')
      const result = await $fetch<{ url: string }>('/api/upload', {
        method: 'POST',
        headers: authHeaders(),
        body
      })
      editor.value?.chain().focus().setImage({ src: result.url }).run()
    } catch (err: any) {
      window.alert(err?.data?.statusMessage || err?.statusMessage || t('admin.upload.failed'))
    }
  }
  input.click()
}
</script>

<style lang="scss" scoped>
.rich-editor {
  border: 1px solid #d7dee7;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;

  .rich-editor-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
    border-bottom: 1px solid #eef1f4;
    background: #f8fafc;
  }

  .rich-editor-btn {
    min-width: 36px;
    height: 32px;
    padding: 0 10px;
    border-radius: 8px;
    background: #ffffff;
    border: 1px solid #d7dee7;
    color: #374151;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .rich-editor-btn.rich-editor-btn-active {
    background: #e8f7f9;
    border-color: #9fd3da;
    color: #0e7f8f;
  }

  .rich-editor-content {
    min-height: 220px;
    padding: 14px 16px;
  }

  .rich-editor-hint {
    padding: 0 16px 12px;
    color: #6b7280;
    font-size: 12px;
  }
}

:deep(.ProseMirror) {
  min-height: 190px;
  outline: none;
  color: #111827;
  font-size: 14px;
  line-height: 1.7;

  p {
    margin: 0 0 12px;
  }

  h2,
  h3 {
    margin: 16px 0 10px;
    font-weight: 700;
  }

  ul,
  ol {
    margin: 0 0 12px;
    padding-left: 20px;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 14px 0;
    border-radius: 12px;
  }

  a {
    color: #0e7f8f;
  }
}
</style>
