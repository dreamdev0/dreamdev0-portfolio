import { ref, watch } from 'vue'
import type { AccentId } from '@/types'
import { DEFAULT_ACCENT, isAccentId } from '@/data/accents'

const STORAGE_KEY = 'dreamdev:accent'

const accent = ref<AccentId>(DEFAULT_ACCENT)

function detectInitial(): AccentId {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isAccentId(saved)) return saved
  }
  return DEFAULT_ACCENT
}

function applyAccent(value: AccentId) {
  document.documentElement.style.setProperty('--accent', `var(--catppuccin-color-${value})`)
}

let initialized = false
function ensureInit() {
  if (initialized) return
  initialized = true
  accent.value = detectInitial()
  applyAccent(accent.value)
}

export function useAccent() {
  ensureInit()

  watch(accent, (value) => {
    applyAccent(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore quota errors */
    }
  })

  function set(value: AccentId) {
    accent.value = value
  }

  return { accent, set }
}
