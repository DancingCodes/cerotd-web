<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_30%_10%,rgba(95,208,220,.14),transparent_28%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
      <UContainer class="max-w-295 px-6">
        <h1 class="mb-4.5 text-[56px] leading-[1.08] tracking-normal">{{ $t('contact.hero.title') }}</h1>
        <p class="max-w-[30ch] text-[20px] leading-[1.7] text-[#c8ced6]">{{ $t('contact.hero.subtitle') }}</p>
      </UContainer>
    </section>

    <section class="bg-[#f3f4f6] py-24 md:py-30">
      <UContainer class="max-w-295 grid grid-cols-1 gap-6 px-6 min-[980px]:grid-cols-[.85fr_1.15fr] min-[980px]:gap-7">
        <aside class="rounded-[14px] bg-[#070b12] px-7 py-8 text-white">
          <h2 class="mb-7 text-[28px] tracking-normal">{{ $t('contact.info.title') }}</h2>
          <ul class="grid gap-5.5">
            <li>
              <p class="mb-1.5 text-[13px] font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.addressLabel') }}</p>
              <p class="text-[16px] leading-[1.6] text-white">{{ $t('contact.info.addressValue') }}</p>
            </li>
            <li>
              <p class="mb-1.5 text-[13px] font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.phoneLabel') }}</p>
              <p class="text-[16px] leading-[1.6] text-white">{{ $t('contact.info.phoneValue') }}</p>
            </li>
            <li>
              <p class="mb-1.5 text-[13px] font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.whatsappLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://wa.me/8615263792384" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.whatsappValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-[13px] font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.telegramLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://t.me/cerotdshand" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.telegramValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-[13px] font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.facebookLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://www.facebook.com/profile.php?id=61575320303094&sk=reels_tab" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.facebookValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-[13px] font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.instagramLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://www.instagram.com/hanxiansheng889/reels/" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.instagramValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-[13px] font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.wechatLabel') }}</p>
              <p class="text-base leading-[1.6] text-white">{{ $t('contact.info.wechatValue') }}</p>
            </li>
          </ul>

          <div class="mt-7 border-t border-white/8 pt-6">
            <p class="mb-3.5 text-[13px] text-[#9aa3af]">{{ $t('contact.social.wechatTip') }}</p>
            <img src="/images/wechat.webp" :alt="$t('contact.info.wechatLabel')" class="size-30 rounded-3.5 bg-white object-cover" />
          </div>
        </aside>

        <div class="rounded-[14px] border border-[#e6e8ec] bg-white px-7 py-8 shadow-[0_10px_30px_rgba(15,23,42,.08)]">
          <h2 class="mb-4 text-[28px] tracking-normal text-[#111827]">{{ $t('contact.form.title') }}</h2>
          <p class="mb-6 rounded-[10px] border border-[#1aa6b8]/18 bg-[#1aa6b8]/8 px-4 py-3.5 text-[14px] leading-[1.7] text-[#0f4c56]">{{ $t('contact.form.notice') }}</p>
          <form class="grid grid-cols-1 gap-4 min-[720px]:grid-cols-2" @submit.prevent="onSubmit">
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-[13px] font-semibold text-[#374151] after:text-[#b42318] after:content-['_*']">{{ $t('contact.form.name') }}</span>
              <input v-model="form.name" class="w-full rounded-[14px] border border-[#e2e6eb] bg-[#f3f4f6] px-4 py-3.5 text-[#111827] outline-none transition focus:border-[#1aa6b8]/[.55] focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="text" name="name" autocomplete="name" required :placeholder="$t('contact.form.name')" />
            </label>
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-[13px] font-semibold text-[#374151] after:text-[#b42318] after:content-['_*']">{{ $t('contact.form.company') }}</span>
              <input v-model="form.company" class="w-full rounded-[14px] border border-[#e2e6eb] bg-[#f3f4f6] px-4 py-3.5 text-[#111827] outline-none transition focus:border-[#1aa6b8]/[.55] focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="text" name="company" autocomplete="organization" required :placeholder="$t('contact.form.company')" />
            </label>
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-[13px] font-semibold text-[#374151] after:text-[#b42318] after:content-['_*']">{{ $t('contact.form.email') }}</span>
              <input v-model="form.email" class="w-full rounded-[14px] border border-[#e2e6eb] bg-[#f3f4f6] px-4 py-3.5 text-[#111827] outline-none transition focus:border-[#1aa6b8]/[.55] focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="email" name="email" autocomplete="email" required :placeholder="$t('contact.form.email')" />
            </label>
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-[13px] font-semibold text-[#374151] after:text-[#b42318] after:content-['_*']">{{ $t('contact.form.phone') }}</span>
              <input v-model="form.phone" class="w-full rounded-[14px] border border-[#e2e6eb] bg-[#f3f4f6] px-4 py-3.5 text-[#111827] outline-none transition focus:border-[#1aa6b8]/[.55] focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="tel" name="phone" autocomplete="tel" required :placeholder="$t('contact.form.phone')" />
            </label>
            <label class="col-span-full flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-[13px] font-semibold text-[#374151]">{{ $t('contact.form.message') }}</span>
              <textarea v-model="form.message" class="min-h-35 w-full resize-y rounded-[14px] border border-[#e2e6eb] bg-[#f3f4f6] px-4 py-3.5 text-[#111827] outline-none transition focus:border-[#1aa6b8]/[.55] focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" name="message" rows="5" :placeholder="$t('contact.form.message')"></textarea>
            </label>
            <button type="submit" class="col-span-full mt-1 flex min-h-13 w-full cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#0f9aa8] to-[#3dd6e0] px-7 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_12px_28px_rgba(26,166,184,.24)] disabled:cursor-wait disabled:opacity-70" :disabled="submitting">
              {{ submitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}
            </button>
          </form>
          <p v-if="submitStatus === 'success'" class="mt-3.5 text-[13px] leading-[1.6] text-[#0f766e]">{{ $t('contact.form.success') }}</p>
          <p v-else-if="submitStatus === 'error'" class="mt-3.5 text-3.25 leading-[1.6] text-[#b42318]">{{ submitError || $t('contact.form.error') }}</p>
          <p v-else class="mt-3.5 text-[13px] leading-[1.6] text-[#6b7280]">{{ $t('contact.form.tip') }}</p>
        </div>
      </UContainer>
    </section>
  </div>
</template>


<script setup lang="ts">
const { locale, t: i18nT } = useI18n()

usePageSeo({
  title: i18nT('seo.contact.title'),
  description: i18nT('seo.contact.description'),
  path: '/contact'
})

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  message: ''
})

const submitting = ref(false)
const submitStatus = ref('idle')
const submitError = ref('')

function resetForm() {
  form.name = ''
  form.company = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}

async function onSubmit() {
  submitStatus.value = 'idle'
  submitError.value = ''

  if (!form.name.trim()) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.requiredName')
    return
  }
  if (!form.company.trim()) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.requiredCompany')
    return
  }
  if (!form.email.trim()) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.requiredEmail')
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.invalidEmail')
    return
  }
  if (!form.phone.trim()) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.requiredPhone')
    return
  }

  submitting.value = true
  try {
    await apiFetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.message,
        locale: locale.value
      }
    })
    submitStatus.value = 'success'
    resetForm()
  } catch {
    submitStatus.value = 'idle'
  } finally {
    submitting.value = false
  }
}
</script>
