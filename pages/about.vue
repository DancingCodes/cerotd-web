<template>
  <div class="about-page">
    <div class="about-container">
      <h1 class="about-title">
        {{ $t('about.title') }}
      </h1>
      <p class="about-description">
        {{ $t('about.description') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.about-page {
  padding: 64px 16px;

  .about-container {
    max-width: 768px;
    margin: 0 auto;

    .about-title {
      font-size: 36px;
      font-weight: 700;
      color: $gray-900;
      margin-bottom: 24px;
    }

    .about-description {
      font-size: 18px;
      line-height: 1.8;
      color: $gray-700;
    }
  }
}
</style>
