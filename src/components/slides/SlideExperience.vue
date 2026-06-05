<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { experience } from '@/data/experience'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useAmbientLoop } from '@/composables/useAmbientLoop'

const { t } = useI18n()

const props = defineProps<{ active: boolean }>()

const dots = useTemplateRef<HTMLElement>('dots')

useAmbientLoop(
  computed(() => props.active),
  () => {
    const tweens: gsap.core.Tween[] = []
    if (dots.value) {
      const items = dots.value.querySelectorAll<HTMLElement>('[data-timeline-dot]')
      items.forEach((dot, i) => {
        tweens.push(
          gsap.to(dot, {
            scale: 1.35,
            duration: 1.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.35,
          }),
        )
      })
    }
    return () => {
      tweens.forEach((tw) => tw.kill())
      if (dots.value) {
        const items = dots.value.querySelectorAll<HTMLElement>('[data-timeline-dot]')
        items.forEach((dot) => {
          gsap.set(dot, { clearProps: 'transform' })
        })
      }
    }
  },
)
</script>

<template>
  <section id="experience" class="flex h-full w-full items-center" aria-label="Experience">
    <div class="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 sm:px-6">
      <div data-slide-anim>
        <SectionHeading shimmer>{{ t('experience.heading') }}</SectionHeading>
      </div>

      <ol ref="dots" class="border-accent-soft relative ml-4 flex flex-col gap-8 border-l-2 pl-8">
        <li v-for="item in experience" :key="item.slug" data-slide-anim class="relative">
          <span
            data-timeline-dot
            class="bg-accent ring-accent-soft absolute top-1.5 -left-[41px] h-4 w-4 rounded-full ring-4"
            aria-hidden="true"
          />

          <div class="flex flex-col gap-1.5">
            <span class="text-accent text-xs font-semibold tracking-wider uppercase">
              {{ item.period }}
            </span>
            <h3 class="text-ctp-text text-xl font-semibold">
              {{ t(`experience.items.${item.slug}.role`) }}
            </h3>
            <p class="text-ctp-subtext0 text-sm font-medium">
              {{ t(`experience.items.${item.slug}.org`) }}
            </p>
            <p class="text-ctp-subtext1 mt-1 text-sm leading-relaxed">
              {{ t(`experience.items.${item.slug}.description`) }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
