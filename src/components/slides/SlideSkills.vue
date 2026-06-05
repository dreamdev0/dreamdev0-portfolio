<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { skillCategories } from '@/data/skills'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TagChip from '@/components/ui/TagChip.vue'
import { useAmbientLoop } from '@/composables/useAmbientLoop'

const { t } = useI18n()

const props = defineProps<{ active: boolean }>()

const node1 = useTemplateRef<HTMLElement>('node1')
const node2 = useTemplateRef<HTMLElement>('node2')
const node3 = useTemplateRef<HTMLElement>('node3')

useAmbientLoop(
  computed(() => props.active),
  () => {
    const tweens: gsap.core.Tween[] = []
    const configs: Array<{ el: HTMLElement | null; dx: number; dy: number; dur: number }> = [
      { el: node1.value, dx: 20, dy: -15, dur: 16 },
      { el: node2.value, dx: -15, dy: 20, dur: 19 },
      { el: node3.value, dx: 25, dy: 10, dur: 22 },
    ]
    for (const cfg of configs) {
      if (!cfg.el) continue
      tweens.push(
        gsap.to(cfg.el, {
          x: cfg.dx,
          y: cfg.dy,
          duration: cfg.dur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      )
    }
    return () => {
      tweens.forEach((tw) => tw.kill())
      for (const cfg of configs) {
        if (cfg.el) gsap.set(cfg.el, { clearProps: 'transform' })
      }
    }
  },
)
</script>

<template>
  <section
    id="skills"
    class="relative flex h-full w-full items-center overflow-hidden"
    aria-label="Skills"
  >
    <div
      ref="node1"
      class="border-ctp-surface1 pointer-events-none absolute top-[12%] left-[6%] h-24 w-24 rounded-full border opacity-[0.08]"
      aria-hidden="true"
    />
    <div
      ref="node2"
      class="border-ctp-surface2 pointer-events-none absolute right-[8%] bottom-[14%] h-32 w-32 rounded-full border opacity-[0.07]"
      aria-hidden="true"
    />
    <div
      ref="node3"
      class="border-ctp-surface1 pointer-events-none absolute top-[55%] left-[10%] h-16 w-16 rotate-45 rounded-md border opacity-[0.09]"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
      <div data-slide-anim>
        <SectionHeading shimmer>{{ t('skills.heading') }}</SectionHeading>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="cat in skillCategories"
          :key="cat.id"
          data-slide-anim
          class="border-ctp-surface1 bg-ctp-mantle/40 hover:border-accent hover:shadow-accent-soft/40 flex flex-col gap-4 rounded-2xl border p-6 transition-colors transition-shadow hover:shadow-lg"
        >
          <h3 class="text-ctp-text flex items-center gap-2 text-lg font-semibold">
            <span class="bg-accent block h-1.5 w-1.5 rounded-full" />
            {{ t(`skills.categories.${cat.id}`) }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <TagChip v-for="item in cat.items" :key="item" :label="item" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
