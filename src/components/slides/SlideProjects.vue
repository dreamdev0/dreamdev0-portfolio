<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TagChip from '@/components/ui/TagChip.vue'

const { t } = useI18n()

defineProps<{ active: boolean }>()
</script>

<template>
  <section id="projects" class="flex h-full w-full items-center" aria-label="Projects">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
      <div data-slide-anim>
        <SectionHeading>{{ t('projects.heading') }}</SectionHeading>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="p in projects"
          :key="p.slug"
          v-hover-gsap="{ y: -4 }"
          data-slide-anim
          class="group border-ctp-surface1 bg-ctp-mantle/40 hover:border-accent hover:shadow-accent-soft/30 flex flex-col gap-4 overflow-hidden rounded-2xl border transition-colors transition-shadow will-change-transform hover:shadow-xl"
        >
          <div class="bg-ctp-crust relative aspect-video w-full overflow-hidden">
            <img
              :src="p.cover"
              :alt="t(`projects.items.${p.slug}.title`)"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div class="flex flex-1 flex-col gap-3 px-5 pb-5">
            <h3 class="text-ctp-text text-xl font-semibold">
              {{ t(`projects.items.${p.slug}.title`) }}
            </h3>
            <p class="text-ctp-subtext1 text-sm">
              {{ t(`projects.items.${p.slug}.description`) }}
            </p>

            <div class="mt-auto flex flex-wrap gap-1.5">
              <TagChip v-for="tech in p.stack" :key="tech" :label="tech" />
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <a
                v-for="l in p.links"
                :key="l.href"
                :href="l.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:text-accent-strong inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                {{ t(`projects.${l.label}`) }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
