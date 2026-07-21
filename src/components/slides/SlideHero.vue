<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, useTemplateRef, watch } from 'vue'
import { useMediaQuery, useDeviceOrientation } from '@vueuse/core'
import { profile } from '@/data/profile'
import { gsap } from 'gsap'
import GradientButton from '@/components/ui/GradientButton.vue'
import { useNavigation } from '@/composables/useNavigation'
import { useAmbientLoop } from '@/composables/useAmbientLoop'

const { t } = useI18n()

const props = defineProps<{ active: boolean }>()

const { jumpById } = useNavigation()

const blob1 = useTemplateRef<HTMLElement>('blob1')
const blob2 = useTemplateRef<HTMLElement>('blob2')
const blob3 = useTemplateRef<HTMLElement>('blob3')
const blob4 = useTemplateRef<HTMLElement>('blob4')

const isMobile = useMediaQuery('(max-width: 640px)')
const { beta, gamma, isSupported: orientationSupported } = useDeviceOrientation()

useAmbientLoop(
  computed(() => props.active),
  () => {
    const blobs = [blob1.value, blob2.value, blob3.value, blob4.value]
    if (blobs.some((b) => !b)) return () => {}
    const [b1, b2, b3, b4] = [blob1.value!, blob2.value!, blob3.value!, blob4.value!]
    const tweens: gsap.core.Tween[] = []
    const mobile = isMobile.value

    // Config de capas según viewport
    const entryCfg = mobile
      ? [
          { el: b1, to: { opacity: 0.12, scale: 1 }, from: { opacity: 0, scale: 0.8 } },
          { el: b2, to: { opacity: 0.1, scale: 1 }, from: { opacity: 0, scale: 0.8 } },
        ]
      : [
          { el: b1, to: { opacity: 0.2, scale: 1 }, from: { opacity: 0, scale: 0.8 } },
          { el: b2, to: { opacity: 0.15, scale: 1 }, from: { opacity: 0, scale: 0.8 } },
          { el: b3, to: { opacity: 0.12, scale: 1 }, from: { opacity: 0, scale: 0.85 } },
          { el: b4, to: { opacity: 0.12, scale: 1 }, from: { opacity: 0, scale: 0.9 } },
        ]

    const ambientLayers = mobile ? [b1, b2] : [b1, b2, b3, b4]

    // Entry — fade-in + scale simultáneos
    const entryDelay = 0.6
    entryCfg.forEach(({ el, from, to }) => {
      tweens.push(
        gsap.fromTo(el, from, { ...to, duration: 1.0, delay: entryDelay, ease: 'power2.out' }),
      )
    })

    // Ambient — Lissajous drift
    tweens.push(gsap.to(b1, { x: 60, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
    tweens.push(gsap.to(b1, { y: 40, duration: 22, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
    tweens.push(gsap.to(b2, { x: -45, duration: 15, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
    tweens.push(gsap.to(b2, { y: 50, duration: 20, ease: 'sine.inOut', yoyo: true, repeat: -1 }))

    if (!mobile) {
      tweens.push(gsap.to(b3, { x: 35, duration: 12, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
      tweens.push(gsap.to(b3, { y: -35, duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
      tweens.push(
        gsap.to(b3, {
          rotation: 360,
          transformOrigin: '50% 50%',
          duration: 30,
          ease: 'none',
          repeat: -1,
        }),
      )
      tweens.push(gsap.to(b4, { x: -25, duration: 10, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
      tweens.push(gsap.to(b4, { y: 25, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
      tweens.push(
        gsap.to(b4, {
          rotation: -360,
          transformOrigin: '50% 50%',
          duration: 25,
          ease: 'none',
          repeat: -1,
        }),
      )
    }

    // Ambient — pulse de opacidad
    const ambientDelay = 3
    tweens.push(
      gsap.to(b1, {
        opacity: 0.08,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: ambientDelay,
      }),
    )
    tweens.push(
      gsap.to(b2, {
        opacity: 0.06,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: ambientDelay,
      }),
    )

    if (!mobile) {
      tweens.push(
        gsap.to(b3, {
          opacity: 0.05,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: ambientDelay,
        }),
      )
      tweens.push(
        gsap.to(b4, {
          opacity: 0.08,
          duration: 5.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: ambientDelay,
        }),
      )
    }

    // Parallax updater
    function updateParallax(cx: number, cy: number) {
      const layers = mobile
        ? [
            { el: b1, intensity: 16 },
            { el: b2, intensity: 24 },
          ]
        : [
            { el: b1, intensity: 16 },
            { el: b2, intensity: 24 },
            { el: b3, intensity: 32 },
            { el: b4, intensity: 48 },
          ]
      layers.forEach(({ el, intensity }) => {
        gsap.to(el, {
          rotationX: cy * intensity,
          rotationY: cx * -intensity,
          transformPerspective: 600,
          duration: 1.5,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      })
    }

    let cleanupParallax: () => void = () => {}

    if (!mobile) {
      const handler = (e: MouseEvent) => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2
        const cy = (e.clientY / window.innerHeight - 0.5) * 2
        updateParallax(cx, cy)
      }
      window.addEventListener('mousemove', handler, { passive: true })
      cleanupParallax = () => window.removeEventListener('mousemove', handler)
    } else if (orientationSupported.value) {
      const stopWatch = watch([beta, gamma], ([b, g]) => {
        if (b == null || g == null) return
        const cx = Math.max(-1, Math.min(1, (g ?? 0) / 30))
        const cy = Math.max(-1, Math.min(1, (b ?? 0) / 45))
        updateParallax(cx, cy)
      })
      cleanupParallax = stopWatch
    }

    return () => {
      tweens.forEach((tw) => tw.kill())
      cleanupParallax()
      gsap.to(ambientLayers.filter(Boolean), {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          ambientLayers.forEach((el) => {
            if (el) gsap.set(el, { clearProps: 'opacity,transform' })
          })
        },
      })
    }
  },
)
</script>

<template>
  <section
    id="hero"
    class="relative flex h-full w-full items-center overflow-hidden"
    aria-label="Hero"
  >
    <div
      ref="blob1"
      class="b1 bg-accent pointer-events-none absolute bottom-0 h-96 w-96 rounded-full opacity-0 blur-3xl max-sm:h-48 max-sm:w-48"
      style="left: 12.5%; transform: translate(-50%, 0)"
      aria-hidden="true"
    />
    <div
      ref="blob2"
      class="b2 bg-accent pointer-events-none absolute top-0 h-96 w-96 rounded-full opacity-0 blur-3xl max-sm:h-48 max-sm:w-48"
      style="left: 37.5%; transform: translate(-50%, 0)"
      aria-hidden="true"
    />
    <div
      ref="blob3"
      class="b3 bg-accent pointer-events-none absolute bottom-0 h-96 w-96 rounded-full opacity-0 blur-3xl max-sm:hidden"
      style="left: 62.5%; transform: translate(-50%, 0)"
      aria-hidden="true"
    />
    <div
      ref="blob4"
      class="b4 bg-accent pointer-events-none absolute top-0 h-96 w-96 rounded-full opacity-0 blur-3xl max-sm:hidden"
      style="left: 87.5%; transform: translate(-50%, 0)"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <span
        data-slide-anim
        class="border-ctp-surface1 bg-ctp-surface0/60 text-ctp-subtext1 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
      >
        <span class="bg-accent block h-2 w-2 animate-pulse rounded-full" />
        {{ profile.location }}
      </span>

      <h1
        data-slide-anim
        class="text-4xl leading-[1.05] font-extrabold tracking-tight break-words sm:text-5xl md:text-7xl lg:text-8xl"
      >
        <span
          class="from-accent via-accent to-accent-strong bg-gradient-to-br bg-clip-text text-transparent"
        >
          {{ t('hero.greeting', { name: profile.displayName }) }}
        </span>
      </h1>

      <p
        data-slide-anim
        class="text-ctp-subtext1 max-w-3xl text-lg sm:text-xl md:text-2xl"
      >
        {{ t('hero.tagline') }}
      </p>

      <div
        data-slide-anim
        class="flex flex-wrap items-center gap-3"
      >
        <GradientButton
          variant="primary"
          size="lg"
          @click="jumpById('contact')"
        >
          {{ t('hero.ctaContact') }}
        </GradientButton>
        <GradientButton
          variant="outline"
          size="lg"
          @click="jumpById('projects')"
        >
          {{ t('nav.items.projects') }}
        </GradientButton>
      </div>

      <div
        data-slide-anim
        class="text-accent mt-6 flex items-center gap-2 self-center text-xs tracking-[0.3em] uppercase sm:self-start"
        :aria-label="t('hero.scroll')"
      >
        <span>{{ t('hero.scroll') }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="nudge-right"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nudge-right {
  animation: nudge-right 1.4s ease-in-out infinite;
}

@keyframes nudge-right {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}
</style>
