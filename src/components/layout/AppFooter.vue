<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import { useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { useGsap } from '@/composables/useGsap'

type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'

const props = defineProps<{
  sections: ReadonlyArray<{ id: SectionId; key: SectionId }>
  active: SectionId
  enabled: boolean
  progress: number
}>()

const emit = defineEmits<{ jump: [id: string] }>()

const { t } = useI18n()
const year = new Date().getFullYear()

const root = useTemplateRef<HTMLElement>('root')
const dotsRef = useTemplateRef<HTMLElement>('dotsRef')

defineExpose({ root })

useGsap((ctx) => {
  ctx.add(() => {
    const dots = dotsRef.value?.querySelectorAll<HTMLElement>('[data-nav-dot]')
    if (!dots) return
    dots.forEach((dot) => {
      const id = dot.dataset.dotId
      gsap.set(dot, { scale: id === props.active ? 1.4 : 1 })
    })
  })
})

function label(key: string): string {
  return t(`nav.items.${key}`)
}

function onJump(id: string): void {
  emit('jump', id)
}
</script>

<template>
  <footer
    ref="root"
    class="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center px-4 sm:h-20 sm:px-6 md:px-12 lg:px-20"
    :aria-label="t('progress.aria')"
  >
    <div class="flex w-full items-center gap-3 sm:gap-6 md:gap-8">
      <p class="text-ctp-subtext0 shrink-0 text-[10px] sm:text-xs md:text-sm">
        {{ t('footer.copyright', { year, name: profile.displayName }) }}
      </p>

      <div class="bg-ctp-surface0/40 relative flex-1 overflow-hidden rounded-full md:hidden">
        <div
          class="from-accent to-accent-strong absolute inset-y-0 left-0 bg-gradient-to-r transition-[width] duration-150 ease-out"
          :style="{ width: `${progress * 100}%` }"
        />
      </div>

      <div ref="dotsRef" class="hidden flex-1 items-center gap-3 sm:gap-4 md:flex">
        <div class="bg-ctp-surface0/40 relative h-[3px] flex-1 overflow-hidden rounded-full">
          <div
            class="from-accent to-accent-strong absolute inset-y-0 left-0 bg-gradient-to-r transition-[width] duration-150 ease-out"
            :style="{ width: `${progress * 100}%` }"
          />
        </div>
        <div class="flex items-center gap-2.5">
          <button
            v-for="s in sections"
            :key="s.id"
            :data-nav-dot="''"
            :data-dot-id="s.id"
            type="button"
            :aria-label="t('progress.slide', { section: label(s.key) })"
            :aria-current="active === s.id ? 'true' : undefined"
            :title="label(s.key)"
            :disabled="!enabled"
            class="group h-2.5 w-2.5 rounded-full transition-colors disabled:opacity-40"
            :class="
              active === s.id
                ? 'bg-accent shadow-[0_0_0_3px_var(--accent-soft)]'
                : 'bg-ctp-surface2 hover:bg-ctp-subtext0'
            "
            @click="onJump(s.id)"
          />
        </div>
      </div>
    </div>
  </footer>
</template>
