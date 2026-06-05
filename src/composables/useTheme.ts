import { ref, watch } from 'vue'
import type { FlavorId } from '@/types'

const STORAGE_KEY = 'dreamdev:flavor'

const flavor = ref<FlavorId>('mocha')

function detectInitial(): FlavorId {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'mocha' || saved === 'latte') return saved
  }
  if (typeof matchMedia !== 'undefined') {
    return matchMedia('(prefers-color-scheme: light)').matches ? 'latte' : 'mocha'
  }
  return 'mocha'
}

function applyFlavor(value: FlavorId) {
  const html = document.documentElement
  html.classList.remove('mocha', 'latte', 'frappe', 'macchiato')
  html.classList.add(value)
}

let initialized = false
function ensureInit() {
  if (initialized) return
  initialized = true
  flavor.value = detectInitial()
  applyFlavor(flavor.value)
}

export function useTheme() {
  ensureInit()

  watch(flavor, (value) => {
    applyFlavor(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore quota errors */
    }
  })

  function toggle() {
    flavor.value = flavor.value === 'mocha' ? 'latte' : 'mocha'
  }

  function set(value: FlavorId) {
    flavor.value = value
  }

  return { flavor, toggle, set }
}
