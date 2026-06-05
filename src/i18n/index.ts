import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import type { MessageSchema, SupportedLocale } from './types'

export const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es },
})

export type { SupportedLocale }
