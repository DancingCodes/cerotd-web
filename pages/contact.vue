<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <p class="page-hero-kicker">{{ $t('common.contact') }}</p>
        <h1 class="page-hero-title">{{ $t('contact.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('contact.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="section content">
      <div class="container content-grid">
        <div class="info-panel">
          <h2 class="info-title">{{ $t('contact.info.title') }}</h2>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.addressLabel') }}</div>
              <div class="info-item-value">{{ $t('contact.info.addressValue') }}</div>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.emailLabel') }}</div>
              <div class="info-item-value">{{ $t('contact.info.emailValue') }}</div>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.phoneLabel') }}</div>
              <div class="info-item-value">{{ $t('contact.info.phoneValue') }}</div>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.hoursLabel') }}</div>
              <div class="info-item-value">{{ $t('contact.info.hoursValue') }}</div>
            </div>
          </div>
        </div>

        <form class="form-panel" @submit.prevent>
          <h2 class="form-title">{{ $t('contact.form.title') }}</h2>
          <div class="form-grid">
            <label class="form-field">
              <span class="form-field-label">{{ $t('contact.form.name') }}</span>
              <input class="form-field-input" type="text" :placeholder="$t('contact.form.name')" />
            </label>
            <label class="form-field">
              <span class="form-field-label">{{ $t('contact.form.company') }}</span>
              <input class="form-field-input" type="text" :placeholder="$t('contact.form.company')" />
            </label>
            <label class="form-field">
              <span class="form-field-label">{{ $t('contact.form.email') }}</span>
              <input class="form-field-input" type="email" :placeholder="$t('contact.form.email')" />
            </label>
            <label class="form-field">
              <span class="form-field-label">{{ $t('contact.form.phone') }}</span>
              <input class="form-field-input" type="tel" :placeholder="$t('contact.form.phone')" />
            </label>
            <label class="form-field form-field-full">
              <span class="form-field-label">{{ $t('contact.form.message') }}</span>
              <textarea class="form-field-textarea" rows="5" :placeholder="$t('contact.form.message')"></textarea>
            </label>
          </div>
          <button type="submit" class="form-submit">{{ $t('contact.form.submit') }}</button>
          <p class="form-tip">{{ $t('contact.form.tip') }}</p>
        </form>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.page-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 30% 10%, rgba($primary-light, 0.14), transparent 28%),
    linear-gradient(180deg, $dark-bg 0%, $dark-bg-light 100%);
  color: $white;

  .page-hero-kicker {
    margin-bottom: 18px;
    color: $primary-light;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .page-hero-title {
    margin-bottom: 18px;
    font-size: clamp(40px, 6vw, 64px);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .page-hero-subtitle {
    max-width: 30ch;
    color: $gray-300;
    font-size: 20px;
    line-height: 1.7;
  }
}

.section {
  @include section-space;
}

.content {
  background: $gray-50;

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    @media (min-width: 980px) {
      grid-template-columns: 0.85fr 1.15fr;
      gap: 28px;
    }
  }
}

.info-panel {
  padding: 32px 28px;
  border-radius: 28px;
  background: $dark-bg;
  color: $white;

  .info-title {
    margin-bottom: 28px;
    font-size: 28px;
    letter-spacing: -0.02em;
  }

  .info-list {
    display: grid;
    gap: 22px;
  }

  .info-item {
    .info-item-label {
      margin-bottom: 6px;
      color: $gray-400;
      font-size: 13px;
      font-weight: 650;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .info-item-value {
      color: $white;
      font-size: 16px;
      line-height: 1.6;
    }
  }
}

.form-panel {
  padding: 32px 28px;
  border-radius: 28px;
  background: $white;
  border: 1px solid $gray-100;
  box-shadow: $shadow-soft;

  .form-title {
    margin-bottom: 24px;
    font-size: 28px;
    letter-spacing: -0.02em;
    color: $gray-900;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 720px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form-field-label {
      color: $gray-700;
      font-size: 13px;
      font-weight: 650;
    }

    .form-field-input,
    .form-field-textarea {
      width: 100%;
      border: 1px solid $gray-200;
      border-radius: 14px;
      background: $gray-50;
      color: $gray-900;
      font: inherit;
      padding: 14px 16px;
      outline: none;
      transition: $transition;
    }

    .form-field-input:focus,
    .form-field-textarea:focus {
      border-color: rgba($primary-color, 0.55);
      background: $white;
      box-shadow: 0 0 0 4px rgba($primary-color, 0.12);
    }

    .form-field-textarea {
      resize: vertical;
      min-height: 140px;
    }
  }

  .form-field-full {
    @media (min-width: 720px) {
      grid-column: 1 / -1;
    }
  }

  .form-submit {
    margin-top: 20px;
    min-height: 52px;
    padding: 0 28px;
    border-radius: 999px;
    background: $accent-gradient;
    color: $white;
    font-size: 15px;
    font-weight: 650;
    transition: $transition;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 28px rgba($primary-color, 0.24);
    }
  }

  .form-tip {
    margin-top: 14px;
    color: $gray-500;
    font-size: 13px;
    line-height: 1.6;
  }
}
</style>
