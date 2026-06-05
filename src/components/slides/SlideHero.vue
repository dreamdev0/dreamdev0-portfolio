<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, useTemplateRef } from 'vue'
import { profile } from '@/data/profile'
import { gsap } from 'gsap'
import GradientButton from '@/components/ui/GradientButton.vue'
import { useNavigation } from '@/composables/useNavigation'
import { useAmbientLoop } from '@/composables/useAmbientLoop'

const { t } = useI18n()

const props = defineProps<{ active: boolean }>()

const { jumpById } = useNavigation()

const orb1 = useTemplateRef<HTMLElement>('orb1')
const orb2 = useTemplateRef<HTMLElement>('orb2')

useAmbientLoop(
  computed(() => props.active),
  () => {
    if (!orb1.value || !orb2.value) return () => {}
    const tweens: gsap.core.Tween[] = []
    tweens.push(
      gsap.fromTo(
        orb1.value,
        { opacity: 0 },
        { opacity: 0.55, duration: 1.2, delay: 1.0, ease: 'power2.out' },
      ),
    )
    tweens.push(
      gsap.fromTo(
        orb2.value,
        { opacity: 0 },
        { opacity: 0.35, duration: 1.2, delay: 1.0, ease: 'power2.out' },
      ),
    )
    tweens.push(
      gsap.to(orb1.value, {
        x: 40,
        y: 30,
        duration: 14,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }),
    )
    tweens.push(
      gsap.to(orb2.value, {
        x: -30,
        y: -45,
        duration: 18,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }),
    )
    tweens.push(
      gsap.to(orb1.value, {
        opacity: 0.4,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }),
    )
    tweens.push(
      gsap.to(orb2.value, {
        opacity: 0.25,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }),
    )
    return () => {
      tweens.forEach((tw) => tw.kill())
      if (orb1.value) gsap.set(orb1.value, { clearProps: 'opacity,transform' })
      if (orb2.value) gsap.set(orb2.value, { clearProps: 'opacity,transform' })
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
      ref="orb1"
      class="bg-accent pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-0 blur-3xl"
      aria-hidden="true"
    />
    <div
      ref="orb2"
      class="bg-accent-strong pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full opacity-0 blur-3xl"
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
        class="text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
      >
        <span
          class="from-accent via-accent to-accent-strong bg-gradient-to-br bg-clip-text text-transparent"
        >
          {{ t('hero.greeting', { name: profile.displayName }) }}
        </span>
      </h1>

      <p data-slide-anim class="text-ctp-subtext1 max-w-3xl text-lg sm:text-xl md:text-2xl">
        {{ t('hero.tagline') }}
      </p>

      <div data-slide-anim class="flex flex-wrap items-center gap-3">
        <GradientButton variant="primary" size="lg" @click="jumpById('contact')">
          {{ t('hero.ctaContact') }}
        </GradientButton>
        <GradientButton variant="outline" size="lg" @click="jumpById('projects')">
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
