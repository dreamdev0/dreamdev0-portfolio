import { provide, inject, type InjectionKey } from 'vue'

export interface NavigationContext {
  jumpById: (id: string) => void
}

const NAV_KEY: InjectionKey<NavigationContext> = Symbol('portfolio-navigation')

export function provideNavigation(api: NavigationContext): NavigationContext {
  provide(NAV_KEY, api)
  return api
}

export function useNavigation(): NavigationContext {
  const ctx = inject(NAV_KEY, null)
  if (!ctx) {
    return { jumpById: () => {} }
  }
  return ctx
}
