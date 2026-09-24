<template>
  <img
    v-bind="$attrs"
    :src="currentSrc"
    :alt="alt"
    @error="onError"
  />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    src?: string | null
    alt?: string
    fallback?: string
  }>(),
  {
    alt: '',
    fallback: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  }
)

const failed = ref(false)

const currentSrc = computed(() => {
  if (failed.value) return props.fallback
  const src = (props.src || '').trim()
  return src || props.fallback
})

watch(
  () => props.src,
  () => {
    failed.value = false
  }
)

function onError() {
  if (failed.value) return
  if (currentSrc.value === props.fallback) return
  failed.value = true
}
</script>
