import { watch, type Ref, isRef } from 'vue'
import { gsap } from 'gsap'
import { useGsap } from './useGsap'

export interface RevealVars {
  opacity?: number
  x?: number | string
  y?: number | string
  scale?: number
  rotate?: number
  rotateX?: number
  rotateY?: number
  duration?: number
  ease?: string
  delay?: number
  stagger?: number
}

export type RevealTrigger = 'mount' | 'visible' | 'active'

export interface UseGsapRevealOptions {
  initial?: RevealVars
  enter?: RevealVars
  leave?: RevealVars
  when?: RevealTrigger
  active?: Ref<boolean> | boolean
  staggerSelector?: string
}

const DEFAULTS: Required<Omit<UseGsapRevealOptions, 'active' | 'staggerSelector'>> = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0, stagger: 0 },
  leave: { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', delay: 0, stagger: 0 },
  when: 'mount',
}

function resolveActive(active: Ref<boolean> | boolean | undefined): Ref<boolean> {
  if (active === undefined) {
    return { value: true } as Ref<boolean>
  }
  if (isRef(active)) {
    return active
  }
  return { value: active } as Ref<boolean>
}

export function useGsapReveal(
  target: Ref<HTMLElement | null | undefined>,
  options: UseGsapRevealOptions = {},
): void {
  const initial = { ...DEFAULTS.initial, ...(options.initial ?? {}) }
  const enter = { ...DEFAULTS.enter, ...(options.enter ?? {}) }
  const leave = { ...DEFAULTS.leave, ...(options.leave ?? {}) }
  const when: RevealTrigger = options.when ?? DEFAULTS.when
  const active = resolveActive(options.active)
  const staggerSelector = options.staggerSelector

  useGsap((ctx) => {
    const applyInitial = (): void => {
      const el = target.value
      if (!el) return
      const vars: gsap.TweenVars = { ...initial }
      if (staggerSelector) {
        const children = el.querySelectorAll<HTMLElement>(staggerSelector)
        if (children.length) {
          ctx.add(() => gsap.set(children, vars))
          return
        }
      }
      ctx.add(() => gsap.set(el, vars))
    }

    const playEnter = (): gsap.core.Tween | gsap.core.Timeline | undefined => {
      const el = target.value
      if (!el) return undefined
      const vars: gsap.TweenVars = {
        ...enter,
        overwrite: 'auto',
      }
      if (staggerSelector) {
        const children = el.querySelectorAll<HTMLElement>(staggerSelector)
        if (children.length) {
          return ctx.add(() => gsap.to(children, vars))
        }
      }
      return ctx.add(() => gsap.to(el, vars))
    }

    const playLeave = (): gsap.core.Tween | gsap.core.Timeline | undefined => {
      const el = target.value
      if (!el) return undefined
      const vars: gsap.TweenVars = {
        ...leave,
        overwrite: 'auto',
      }
      if (staggerSelector) {
        const children = el.querySelectorAll<HTMLElement>(staggerSelector)
        if (children.length) {
          return ctx.add(() => gsap.to(children, vars))
        }
      }
      return ctx.add(() => gsap.to(el, vars))
    }

    const start = (): void => {
      applyInitial()
      if (when === 'mount') {
        playEnter()
      } else if (when === 'visible') {
        const el = target.value
        if (!el) return
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                playEnter()
                observer.disconnect()
                break
              }
            }
          },
          { threshold: 0.15 },
        )
        observer.observe(el)
        ctx.add(() => observer.disconnect())
      } else if (when === 'active') {
        if (active.value) {
          playEnter()
        }
        watch(
          active,
          (isActive) => {
            if (isActive) {
              playEnter()
            } else {
              playLeave()
            }
          },
          { flush: 'post' },
        )
      }
    }

    if (target.value) {
      start()
    } else {
      const stopWatch = watch(
        target,
        (el) => {
          if (el) {
            stopWatch()
            start()
          }
        },
        { flush: 'post' },
      )
    }
  })
}
