<template>
  <div class="layout-default">
    <Header />
    <div class="layout-default-main">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .layout-default-main {
    flex: 1;
  }
}
</style>
