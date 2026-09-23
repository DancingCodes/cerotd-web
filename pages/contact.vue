<template>
  <div class="contact-page">
    <div class="page-hero">
      <div class="container">
        <div class="page-hero-kicker">{{ $t('common.contact') }}</div>
        <div class="page-hero-title">{{ $t('contact.hero.title') }}</div>
        <div class="page-hero-subtitle">{{ $t('contact.hero.subtitle') }}</div>
      </div>
    </div>

    <div class="section content">
      <div class="container content-grid">
        <div class="info-panel">
          <div class="info-title">{{ $t('contact.info.title') }}</div>
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

        <div class="form-panel" @submit.prevent>
          <div class="form-title">{{ $t('contact.form.title') }}</div>
          <div class="form-grid">
            <div class="form-field">
              <div class="form-field-label">{{ $t('contact.form.name') }}</div>
              <input class="form-field-input" type="text" :placeholder="$t('contact.form.name')" />
            </div>
            <div class="form-field">
              <div class="form-field-label">{{ $t('contact.form.company') }}</div>
              <input class="form-field-input" type="text" :placeholder="$t('contact.form.company')" />
            </div>
            <div class="form-field">
              <div class="form-field-label">{{ $t('contact.form.email') }}</div>
              <input class="form-field-input" type="email" :placeholder="$t('contact.form.email')" />
            </div>
            <div class="form-field">
              <div class="form-field-label">{{ $t('contact.form.phone') }}</div>
              <input class="form-field-input" type="tel" :placeholder="$t('contact.form.phone')" />
            </div>
            <div class="form-field form-field-full">
              <div class="form-field-label">{{ $t('contact.form.message') }}</div>
              <textarea class="form-field-textarea" rows="5" :placeholder="$t('contact.form.message')"></textarea>
            </div>
          </div>
          <div type="submit" class="form-submit">{{ $t('contact.form.submit') }}</div>
          <div class="form-tip">{{ $t('contact.form.tip') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 30% 10%, rgba(#5fd0dc, 0.14), transparent 28%),
    linear-gradient(180deg, #0b1220 0%, #162033 100%);
  color: #ffffff;

  .page-hero-kicker {
    margin-bottom: 18px;
    color: #5fd0dc;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .page-hero-title {
    margin-bottom: 18px;
    font-size: 56px;
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .page-hero-subtitle {
    max-width: 30ch;
    color: #c8ced6;
    font-size: 20px;
    line-height: 1.7;
  }
}

.section {
  padding: 96px 0;

  @media (min-width: 768px) {
    padding: 120px 0;
  }
}

.content {
  background: #f7f8fa;

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
  background: #0b1220;
  color: #ffffff;

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
      color: #9aa3af;
      font-size: 13px;
      font-weight: 650;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .info-item-value {
      color: #ffffff;
      font-size: 16px;
      line-height: 1.6;
    }
  }
}

.form-panel {
  padding: 32px 28px;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid #eef1f4;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);

  .form-title {
    margin-bottom: 24px;
    font-size: 28px;
    letter-spacing: -0.02em;
    color: #111827;
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
      color: #374151;
      font-size: 13px;
      font-weight: 650;
    }

    .form-field-input,
    .form-field-textarea {
      width: 100%;
      border: 1px solid #e2e6eb;
      border-radius: 14px;
      background: #f7f8fa;
      color: #111827;
      font: inherit;
      padding: 14px 16px;
      outline: none;
      transition: all 0.25s ease;
    }

    .form-field-input:focus,
    .form-field-textarea:focus {
      border-color: rgba(#1aa6b8, 0.55);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(#1aa6b8, 0.12);
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
    background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
    color: #ffffff;
    font-size: 15px;
    font-weight: 650;
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 28px rgba(#1aa6b8, 0.24);
    }
  }

  .form-tip {
    margin-top: 14px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.6;
  }
}
</style>
