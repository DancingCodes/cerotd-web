<template>
  <div class="contact-page">
    <div class="page-hero page-hero-rise">
      <div class="container">
        <div class="page-hero-title">{{ $t('contact.hero.title') }}</div>
        <div class="page-hero-subtitle">{{ $t('contact.hero.subtitle') }}</div>
      </div>
    </div>

    <div v-motion-slide-visible-once-bottom class="section content">
      <div class="container content-grid">
        <div class="info-panel">
          <div class="info-title">{{ $t('contact.info.title') }}</div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.addressLabel') }}</div>
              <div class="info-item-value">{{ $t('contact.info.addressValue') }}</div>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.phoneLabel') }}</div>
              <div class="info-item-value">{{ $t('contact.info.phoneValue') }}</div>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.whatsappLabel') }}</div>
              <a class="info-item-link" href="https://api.whatsapp.com/send/?phone=8615263792384&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.whatsappValue') }}
              </a>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.telegramLabel') }}</div>
              <a class="info-item-link" href="https://t.me/cerotdshand" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.telegramValue') }}
              </a>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.facebookLabel') }}</div>
              <a class="info-item-link" href="https://www.facebook.com/people/Cerotd-Lubricating-Oil/61575320303094/?sk=reels_tab" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.facebookValue') }}
              </a>
            </div>
            <div class="info-item">
              <div class="info-item-label">{{ $t('contact.info.wechatLabel') }}</div>
              <div class="info-item-value">{{ $t('contact.info.wechatValue') }}</div>
            </div>
          </div>

          <div class="wechat-box">
            <div class="wechat-box-title">{{ $t('contact.social.wechatTip') }}</div>
            <img src="/wechat.png" :alt="$t('contact.info.wechatLabel')" class="wechat-box-image" />
          </div>
        </div>

        <div class="form-panel">
          <div class="form-title">{{ $t('contact.form.title') }}</div>
          <div class="form-notice">{{ $t('contact.form.notice') }}</div>
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
            <div class="form-field">
              <div class="form-field-label">{{ $t('contact.form.country') }}</div>
              <input class="form-field-input" type="text" :placeholder="$t('contact.form.country')" />
            </div>
            <div class="form-field">
              <div class="form-field-label">{{ $t('contact.form.im') }}</div>
              <input class="form-field-input" type="text" :placeholder="$t('contact.form.im')" />
            </div>
            <div class="form-field form-field-full">
              <div class="form-field-label">{{ $t('contact.form.bulk') }}</div>
              <div class="form-radio-list">
                <div class="form-radio-item">
                  <input type="radio" name="bulk" value="yes" />
                  <div>{{ $t('contact.form.bulkYes') }}</div>
                </div>
                <div class="form-radio-item">
                  <input type="radio" name="bulk" value="no" />
                  <div>{{ $t('contact.form.bulkNo') }}</div>
                </div>
              </div>
            </div>
            <div class="form-field form-field-full">
              <div class="form-field-label">{{ $t('contact.form.product') }}</div>
              <select class="form-field-input">
                <option value="">{{ $t('contact.form.productPlaceholder') }}</option>
                <option v-for="category in productOptions" :key="category.slug" :value="category.slug">
                  {{ t(category.name) }}
                </option>
              </select>
            </div>
            <div class="form-field form-field-full">
              <div class="form-field-label">{{ $t('contact.form.message') }}</div>
              <textarea class="form-field-textarea" rows="5" :placeholder="$t('contact.form.message')"></textarea>
            </div>
          </div>
          <div class="form-submit">{{ $t('contact.form.submit') }}</div>
          <div class="form-tip">{{ $t('contact.form.tip') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Localized = { en: string; zh: string }
type CategoryItem = { slug: string; name: Localized }

const t = useLocalized()
const { t: i18nT } = useI18n()

usePageSeo({
  title: i18nT('seo.contact.title'),
  description: i18nT('seo.contact.description'),
  path: '/contact'
})
const { data } = await useFetch<{ items: CategoryItem[] }>('/api/categories', {
  key: 'contact-categories'
})
const productOptions = computed(() => data.value?.items || [])
</script>

<style lang="scss" scoped>
.contact-page {
  .page-hero-rise {
    .page-hero-title,
    .page-hero-subtitle {
      opacity: 0;
      transform: translateY(18px);
      animation: page-hero-rise 0.7s ease forwards;
    }

    .page-hero-subtitle {
      animation-delay: 0.1s;
    }
  }

  @keyframes page-hero-rise {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .page-hero {
    padding: 88px 0 72px;
    background:
      radial-gradient(circle at 30% 10%, rgba(#5fd0dc, 0.14), transparent 28%),
      linear-gradient(180deg, #0b1220 0%, #162033 100%);
    color: #ffffff;


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

    .info-panel {
      padding: 32px 28px;
      border-radius: 28px;
      background: #0b1220;
      color: #ffffff;
      transition: transform 0.25s ease;

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

        .info-item-value,
        .info-item-link {
          color: #ffffff;
          font-size: 16px;
          line-height: 1.6;
          text-decoration: none;
        }

        .info-item-link:hover {
          color: #5fd0dc;
        }
      }

      .wechat-box {
        margin-top: 28px;
        padding-top: 24px;
        border-top: 1px solid rgba(#ffffff, 0.08);

        .wechat-box-title {
          margin-bottom: 14px;
          color: #9aa3af;
          font-size: 13px;
        }

        .wechat-box-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 14px;
          background: #ffffff;
        }
      }
    }

    .form-panel {
      padding: 32px 28px;
      border-radius: 28px;
      background: #ffffff;
      border: 1px solid #eef1f4;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      .form-title {
        margin-bottom: 16px;
        font-size: 28px;
        letter-spacing: -0.02em;
        color: #111827;
      }

      .form-notice {
        margin-bottom: 24px;
        padding: 14px 16px;
        border-radius: 16px;
        background: rgba(#1aa6b8, 0.08);
        border: 1px solid rgba(#1aa6b8, 0.18);
        color: #0f4c56;
        font-size: 14px;
        line-height: 1.7;
      }

      .form-radio-list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .form-radio-item {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 44px;
        padding: 0 14px;
        border-radius: 999px;
        background: #f7f8fa;
        border: 1px solid #e2e6eb;
        color: #111827;
        font-size: 14px;
        cursor: pointer;
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
        width: 100%;
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
        display: inline-flex;
        align-items: center;
        justify-content: center;

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
  }
}
</style>
