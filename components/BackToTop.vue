<template>
  <button
    v-show="visible"
    type="button"
    class="back-to-top"
    :aria-label="label"
    @click="scrollTop"
  >
    <span class="back-to-top-icon" aria-hidden="true">↑</span>
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()

const visible = ref(false)
const label = computed(() => t('common.backToTop'))

function onScroll() {
  visible.value = window.scrollY > 640
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 60;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid #d7dde5;
  background: rgba(#ffffff, 0.96);
  color: #0f4c56;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #ffffff;
    border-color: rgba(63, 127, 136, 0.45);
    transform: translateY(-2px);
  }

  .back-to-top-icon {
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
  }

  @media (min-width: 768px) {
    right: 28px;
    bottom: 32px;
  }
}
</style>
