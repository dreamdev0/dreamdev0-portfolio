import type { AccentId } from '@/types'

interface AccentMeta {
  id: AccentId
  /** Hex value of the accent in Mocha (500 shade). Used for the swatch preview chip. */
  mochaHex: string
  /** Hex value of the accent in Latte (500 shade). */
  latteHex: string
}

export const accents: readonly AccentMeta[] = [
  { id: 'rosewater', mochaHex: '#f5e0dc', latteHex: '#dc8a78' },
  { id: 'flamingo', mochaHex: '#f2cdcd', latteHex: '#dd7878' },
  { id: 'pink', mochaHex: '#f5c2e7', latteHex: '#ea76cb' },
  { id: 'mauve', mochaHex: '#cba6f7', latteHex: '#8839ef' },
  { id: 'red', mochaHex: '#f38ba8', latteHex: '#d20f39' },
  { id: 'maroon', mochaHex: '#eba0ac', latteHex: '#e64553' },
  { id: 'peach', mochaHex: '#fab387', latteHex: '#fe640b' },
  { id: 'yellow', mochaHex: '#f9e2af', latteHex: '#df8e1d' },
  { id: 'green', mochaHex: '#a6e3a1', latteHex: '#40a02b' },
  { id: 'teal', mochaHex: '#94e2d5', latteHex: '#179299' },
  { id: 'sky', mochaHex: '#89dceb', latteHex: '#04a5e5' },
  { id: 'sapphire', mochaHex: '#74c7ec', latteHex: '#209fb5' },
  { id: 'blue', mochaHex: '#89b4fa', latteHex: '#1e66f5' },
  { id: 'lavender', mochaHex: '#b4befe', latteHex: '#7287fd' },
] as const

export const DEFAULT_ACCENT: AccentId = 'mauve'

export function isAccentId(v: unknown): v is AccentId {
  return typeof v === 'string' && accents.some((a) => a.id === v)
}
