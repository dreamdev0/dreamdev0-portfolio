import en from './locales/en.json'
import es from './locales/es.json'

export type SupportedLocale = 'en' | 'es'

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['en', 'es']

export type MessageSchema = typeof en
export type MessageSchemaEs = typeof es
