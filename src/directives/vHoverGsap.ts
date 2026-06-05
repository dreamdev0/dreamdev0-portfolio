import type { Directive } from 'vue'
import { gsap } from 'gsap'

export interface HoverGsapValue {
  y?: number
  scale?: number
  duration?: number
  ease?: string
}

interface HoverGsapElement extends HTMLElement {
  __hoverGsapEnter?: () => void
  __hoverGsapLeave?: () => void
}

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const vHoverGsap: Directive<HTMLElement, HoverGsapValue> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return
    const { y = 0, scale = 1, duration = 0.3, ease = 'power2.out' } = binding.value ?? {}
    const target = el as HoverGsapElement
    const onEnter = (): void => {
      gsap.to(target, { y, scale, duration, ease, overwrite: 'auto' })
    }
    const onLeave = (): void => {
      gsap.to(target, { y: 0, scale: 1, duration, ease, overwrite: 'auto' })
    }
    target.__hoverGsapEnter = onEnter
    target.__hoverGsapLeave = onLeave
    target.addEventListener('mouseenter', onEnter)
    target.addEventListener('mouseleave', onLeave)
  },
  unmounted(el) {
    const target = el as HoverGsapElement
    if (target.__hoverGsapEnter) {
      target.removeEventListener('mouseenter', target.__hoverGsapEnter)
      delete target.__hoverGsapEnter
    }
    if (target.__hoverGsapLeave) {
      target.removeEventListener('mouseleave', target.__hoverGsapLeave)
      delete target.__hoverGsapLeave
    }
    gsap.killTweensOf(target)
  },
}
