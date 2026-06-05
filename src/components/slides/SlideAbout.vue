<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useAmbientLoop } from '@/composables/useAmbientLoop'

const { tm, t } = useI18n()

const paragraphs = tm('about.bio') as string[]

const props = withDefaults(defineProps<{ active: boolean }>(), {})

const halo = useTemplateRef<HTMLElement>('halo')

useAmbientLoop(
  computed(() => props.active),
  () => {
    const tweens: gsap.core.Tween[] = []
    if (halo.value) {
      tweens.push(
        gsap.to(halo.value, {
          scale: 1.06,
          opacity: 0.65,
          duration: 4.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      )
    }
    return () => {
      tweens.forEach((tw) => tw.kill())
      if (halo.value) gsap.set(halo.value, { clearProps: 'transform,opacity' })
    }
  },
)
</script>

<template>
  <section id="about" class="flex h-full w-full items-center" aria-label="About">
    <div
      class="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]"
    >
      <div class="flex flex-col gap-6">
        <div data-slide-anim>
          <SectionHeading shimmer>{{ t('about.heading') }}</SectionHeading>
        </div>

        <div class="text-ctp-subtext1 flex flex-col gap-4 text-base leading-relaxed sm:text-lg">
          <p v-for="(p, i) in paragraphs" :key="i" data-slide-anim>
            {{ p }}
          </p>
        </div>
      </div>

      <div data-slide-anim class="relative mx-auto aspect-square w-full max-w-sm">
        <div
          ref="halo"
          class="from-accent to-accent-strong absolute inset-0 -rotate-6 rounded-2xl bg-gradient-to-br opacity-50 blur-2xl"
          aria-hidden="true"
        />
        <div
          class="border-accent bg-ctp-mantle/60 absolute -inset-2 rounded-2xl border-2"
          aria-hidden="true"
        />
        <div class="relative m-2 aspect-square overflow-hidden rounded-2xl">
          <img
            v-if="profile.avatar"
            :src="profile.avatar"
            alt=""
            class="relative z-10 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
