<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from '@/components/ui/LocaleSwitcher.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import AccentPicker from '@/components/ui/AccentPicker.vue'
import type { NavSection } from '@/types'
import { useTemplateRef } from 'vue'

const props = defineProps<{ active: string }>()
const emit = defineEmits<{ jump: [id: string] }>()

const { t } = useI18n()

const sections: NavSection[] = [
  { id: 'hero', key: 'hero' },
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'projects', key: 'projects' },
  { id: 'experience', key: 'experience' },
  { id: 'contact', key: 'contact' },
]

function go(id: string) {
  emit('jump', id)
}

void props

const root = useTemplateRef<HTMLElement>('root')
const items = useTemplateRef<HTMLElement>('items')

defineExpose({ root, items })
</script>

<template>
  <header
    ref="root"
    class="fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between gap-3 px-20"
  >
    <a
      data-entry-item
      href="#hero"
      class="group flex items-center gap-2 font-mono text-sm font-bold tracking-tight"
      @click.prevent="go('hero')"
    >
      <span
        class="from-accent to-accent-strong text-ctp-base flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br"
      >
        &lt;0&gt;
      </span>
    </a>

    <nav ref="items" class="hidden items-center gap-1 md:flex" :aria-label="t('nav.items.hero')">
      <button
        v-for="s in sections"
        :key="s.id"
        data-entry-item
        type="button"
        :aria-current="props.active === s.id ? 'true' : undefined"
        class="text-ctp-subtext1 hover:text-ctp-text rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
        :class="props.active === s.id ? 'text-accent' : ''"
        @click="go(s.id)"
      >
        {{ t(`nav.items.${s.key}`) }}
      </button>
    </nav>

    <div ref="items" class="flex items-center gap-2">
      <div data-entry-item>
        <LocaleSwitcher />
      </div>
      <div data-entry-item>
        <ThemeToggle />
      </div>
      <div data-entry-item>
        <AccentPicker />
      </div>
    </div>
  </header>
</template>
