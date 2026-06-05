import { onScopeDispose, getCurrentScope } from 'vue'
import { gsap } from 'gsap'

export type GsapCallback = (ctx: gsap.Context) => void

export function useGsap(callback: GsapCallback, scope?: Element | string | null): void {
  if (!getCurrentScope()) {
    callback(gsap.context(callback, scope ?? undefined))
    return
  }

  const ctx = gsap.context(callback, scope ?? undefined)
  onScopeDispose(() => {
    ctx.revert()
  })
}

export function createGsapContext(
  callback: GsapCallback,
  scope?: Element | string | null,
): gsap.Context {
  return gsap.context(callback, scope ?? undefined)
}

export { gsap }
