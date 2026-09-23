<template>
  <div class="layout">
    <Header />
    <div class="main">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
  }
}
</style>
