import { ref, onBeforeUnmount, readonly, type Ref } from 'vue'

export function useReducedMotion(): Readonly<Ref<boolean>> {
  const reduced = ref(false)
  if (typeof window === 'undefined') return readonly(reduced)
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  const handler = (e: MediaQueryListEvent): void => {
    reduced.value = e.matches
  }
  mq.addEventListener('change', handler)
  onBeforeUnmount(() => {
    mq.removeEventListener('change', handler)
  })
  return readonly(reduced)
}
