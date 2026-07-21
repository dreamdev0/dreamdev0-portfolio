<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import SocialIconLink from '@/components/ui/SocialIconLink.vue'
import { useAmbientLoop } from '@/composables/useAmbientLoop'

const { t } = useI18n()

const props = defineProps<{ active: boolean }>()

const ring = useTemplateRef<HTMLElement>('ring')

useAmbientLoop(
  computed(() => props.active),
  () => {
    const tweens: gsap.core.Tween[] = []
    if (ring.value) {
      tweens.push(
        gsap.fromTo(
          ring.value,
          { opacity: 0, scale: 0.9 },
          { opacity: 0.25, scale: 1, duration: 0.8, ease: 'power2.out' },
        ),
      )
      tweens.push(
        gsap.to(ring.value, {
          rotation: 360,
          transformOrigin: '50% 50%',
          duration: 25,
          ease: 'none',
          repeat: -1,
        }),
      )
    }
    return () => {
      tweens.forEach((tw) => tw.kill())
      if (ring.value) {
        gsap.to(ring.value, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(ring.value!, { clearProps: 'transform,opacity' })
          },
        })
      }
    }
  },
)
</script>

<template>
  <section
    id="contact"
    class="relative flex h-full w-full items-center overflow-hidden"
    aria-label="Contact"
  >
    <div
      ref="ring"
      class="pointer-events-none absolute top-1/2 left-1/2 h-[min(520px,calc(100vw-2rem))] w-[min(520px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl"
      style="
        background: conic-gradient(
          from 0deg,
          var(--accent),
          transparent 30%,
          var(--accent) 60%,
          transparent 90%,
          var(--accent)
        );
      "
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6"
    >
      <div data-slide-anim>
        <SectionHeading shimmer>
          {{ t('contact.heading') }}
        </SectionHeading>
      </div>

      <p
        data-slide-anim
        class="text-ctp-subtext1 max-w-2xl text-xl sm:text-2xl"
      >
        {{ t('contact.intro') }}
      </p>

      <a
        v-hover-gsap="{ scale: 1.05 }"
        data-slide-anim
        :href="`mailto:${profile.contact.email}`"
        class="group text-accent inline-flex items-center gap-2 text-xl font-bold break-all will-change-transform sm:text-2xl md:text-3xl"
      >
        <span class="from-accent to-accent-strong bg-gradient-to-r bg-clip-text text-transparent">
          {{ profile.contact.email }}
        </span>
      </a>

      <div
        data-slide-anim
        class="mt-4 flex flex-wrap justify-center gap-3"
      >
        <SocialIconLink />
      </div>
    </div>
  </section>
</template>
