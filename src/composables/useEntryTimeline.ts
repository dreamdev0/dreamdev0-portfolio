import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { gsap } from 'gsap'

export interface UseEntryTimelineOptions {
  hero?: Ref<HTMLElement | null>
  header?: Ref<HTMLElement | null>
  headerItems?: Ref<HTMLElement | null>
  footer?: Ref<HTMLElement | null>
  duration?: {
    hero?: number
    header?: number
    headerStagger?: number
    headerItemDuration?: number
    footer?: number
  }
  delays?: {
    hero?: number
    header?: number
    headerItems?: number
    footer?: number
    enableNav?: number
  }
}

export interface EntryTimelineApi {
  enabled: Readonly<Ref<boolean>>
  play: () => void
}

const DEFAULTS = {
  duration: {
    hero: 0.8,
    header: 0.6,
    headerStagger: 0.1,
    headerItemDuration: 0.4,
    footer: 0.5,
  },
  delays: {
    hero: 0,
    header: 1.0,
    headerItems: 1.2,
    footer: 1.8,
    enableNav: 2.3,
  },
}

export function useEntryTimeline(options: UseEntryTimelineOptions = {}): EntryTimelineApi {
  const enabled = ref(false)
  const d = { ...DEFAULTS.duration, ...(options.duration ?? {}) }
  const del = { ...DEFAULTS.delays, ...(options.delays ?? {}) }

  let tl: gsap.core.Timeline | null = null

  const play = (): void => {
    if (tl) tl.kill()

    tl = gsap.timeline({
      onComplete: () => {
        enabled.value = true
      },
    })

    const heroEl = options.hero?.value
    if (heroEl) {
      const heroChildren = heroEl.querySelectorAll<HTMLElement>('[data-entry]')
      tl.set(heroEl, { autoAlpha: 0 }, 0)
      if (heroChildren.length) {
        tl.set(heroChildren, { y: 30, opacity: 0 }, 0)
        tl.to(heroEl, { autoAlpha: 1, duration: d.hero * 0.5, ease: 'power2.out' }, del.hero)
        tl.to(
          heroChildren,
          {
            y: 0,
            opacity: 1,
            duration: d.hero,
            ease: 'power2.out',
            stagger: 0.08,
          },
          del.hero + 0.1,
        )
      } else {
        tl.to(heroEl, { autoAlpha: 1, duration: d.hero, ease: 'power2.out' }, del.hero)
      }
    }

    const headerEl = options.header?.value
    if (headerEl) {
      tl.fromTo(
        headerEl,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: d.header, ease: 'power2.out' },
        del.header,
      )

      const headerItemsEl = options.headerItems?.value
      if (headerItemsEl) {
        const items = headerItemsEl.querySelectorAll<HTMLElement>('[data-entry-item]')
        if (items.length) {
          tl.fromTo(
            items,
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: d.headerItemDuration,
              ease: 'power2.out',
              stagger: d.headerStagger,
            },
            del.headerItems,
          )
        }
      }
    }

    const footerEl = options.footer?.value
    if (footerEl) {
      tl.fromTo(
        footerEl,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: d.footer, ease: 'power2.out' },
        del.footer,
      )
    }

    tl.call(
      () => {
        enabled.value = true
      },
      [],
      del.enableNav,
    )
  }

  onMounted(() => {
    play()
  })

  onBeforeUnmount(() => {
    if (tl) tl.kill()
  })

  return { enabled, play }
}
