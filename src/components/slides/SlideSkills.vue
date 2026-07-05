<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skillCategories } from '@/data/skills'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TagChip from '@/components/ui/TagChip.vue'

const { t } = useI18n()
</script>

<template>
  <section
    id="skills"
    class="relative flex h-full w-full items-center overflow-hidden"
    aria-label="Skills"
  >
    <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-10 sm:px-6">
      <div data-slide-anim>
        <SectionHeading shimmer>{{ t('skills.heading') }}</SectionHeading>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 sm:gap-6">
        <div
          v-for="cat in skillCategories"
          :key="cat.id"
          data-slide-anim
          class="border-ctp-surface1 bg-ctp-mantle/40 hover:border-accent hover:shadow-accent-soft/40 flex flex-col gap-2.5 rounded-2xl border p-4 transition-colors transition-shadow hover:shadow-lg sm:gap-4 sm:p-6"
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
