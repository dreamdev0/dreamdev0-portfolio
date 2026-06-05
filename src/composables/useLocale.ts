import { ref, watch, type WritableComputedRef } from 'vue'
import { i18n } from '@/i18n'
import type { SupportedLocale } from '@/i18n/types'
import { SUPPORTED_LOCALES } from '@/i18n/types'

const STORAGE_KEY = 'dreamdev:locale'

const locale = ref<SupportedLocale>('en')

function detectInitial(): SupportedLocale {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && (SUPPORTED_LOCALES as readonly string[]).includes(saved)) {
      return saved as SupportedLocale
    }
  }
  if (typeof navigator !== 'undefined') {
    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
  }
  return 'en'
}

let initialized = false
function ensureInit() {
  if (initialized) return
  initialized = true
  locale.value = detectInitial()
}

/**
 * vue-i18n v11 narrows `i18n.global.locale` to the literal type passed in
 * `createI18n({ locale: 'en' })`. We widen it back to the SupportedLocale
 * union so we can assign 'en' | 'es' safely.
 */
const globalLocale = i18n.global.locale as unknown as WritableComputedRef<SupportedLocale>

export function useLocale() {
  ensureInit()

  function apply(value: SupportedLocale) {
    globalLocale.value = value
    document.documentElement.lang = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
  }

  function refreshDocumentMeta() {
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', i18n.global.t('site.description'))
    document.title = i18n.global.t('site.title')
  }

  watch(
    locale,
    (value) => {
      apply(value)
      refreshDocumentMeta()
    },
    { immediate: true },
  )

  function set(value: SupportedLocale) {
    locale.value = value
  }

  function toggle() {
    locale.value = locale.value === 'es' ? 'en' : 'es'
  }

  return { locale, set, toggle }
}
