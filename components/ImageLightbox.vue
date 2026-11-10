<template>
  <UModal v-model:open="open" :close="false"
    :ui="{ overlay: 'bg-[#070b12]/92 backdrop-blur-sm', content: 'w-auto max-w-none bg-[#070b12] shadow-none ring-0', body: 'p-0' }">
    <template #body>
      <div v-if="currentItem" class="relative w-[min(94vw,1320px)] pt-12 pb-4">
        <UButton icon="i-lucide-x" :aria-label="$t('common.close')" color="neutral" variant="ghost" size="xl"
          class="absolute top-0 right-0 z-20 cursor-pointer text-white hover:bg-white/10 hover:text-white" @click="open = false" />
        <div class="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3 sm:grid-cols-[52px_minmax(0,1fr)_52px] sm:gap-5">
          <div class="flex justify-center">
            <UButton v-if="items.length > 1" icon="i-lucide-chevron-left" :aria-label="$t('common.prev')" color="primary" variant="solid" size="xl" class="cursor-pointer rounded-full bg-[#0f4c56] text-white hover:bg-[#0b3a42]" @click="previous" />
          </div>
          <div class="flex min-w-0 justify-center">
            <img class="max-h-[80vh] max-w-full rounded-xl bg-white object-contain shadow-[0_24px_64px_rgba(0,0,0,.45)]" :src="currentItem.src" :alt="currentItem.alt" loading="eager" decoding="async" />
          </div>
          <div class="flex justify-center">
            <UButton v-if="items.length > 1" icon="i-lucide-chevron-right" :aria-label="$t('common.next')" color="primary" variant="solid" size="xl" class="cursor-pointer rounded-full bg-[#0f4c56] text-white hover:bg-[#0b3a42]" @click="next" />
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
type ImageLightboxItem = {
  src: string
  alt: string
}

const props = defineProps<{
  items: ImageLightboxItem[]
}>()

const open = defineModel<boolean>('open', { default: false })
const index = defineModel<number>('index', { default: 0 })
const currentItem = computed(() => props.items[index.value] || null)

function previous() {
  index.value = (index.value - 1 + props.items.length) % props.items.length
}

function next() {
  index.value = (index.value + 1) % props.items.length
}
</script>
