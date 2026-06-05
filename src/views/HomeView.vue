<script setup lang="ts">
import { computed, useTemplateRef, markRaw, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CursorGlow from '@/components/layout/CursorGlow.vue'
import SlideStage from '@/components/layout/SlideStage.vue'
import SlideHero from '@/components/slides/SlideHero.vue'
import SlideAbout from '@/components/slides/SlideAbout.vue'
import SlideSkills from '@/components/slides/SlideSkills.vue'
import SlideProjects from '@/components/slides/SlideProjects.vue'
import SlideExperience from '@/components/slides/SlideExperience.vue'
import SlideContact from '@/components/slides/SlideContact.vue'
import { useSlideNavigation } from '@/composables/useSlideNavigation'
import { useEntryTimeline } from '@/composables/useEntryTimeline'
import { provideNavigation } from '@/composables/useNavigation'

type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'

const { t } = useI18n()

const sections: ReadonlyArray<{ id: SectionId; key: SectionId }> = [
  { id: 'hero', key: 'hero' },
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'projects', key: 'projects' },
  { id: 'experience', key: 'experience' },
  { id: 'contact', key: 'contact' },
]

const slideComponents = [
  { id: 'hero' as SectionId, component: markRaw(SlideHero) },
  { id: 'about' as SectionId, component: markRaw(SlideAbout) },
  { id: 'skills' as SectionId, component: markRaw(SlideSkills) },
  { id: 'projects' as SectionId, component: markRaw(SlideProjects) },
  { id: 'experience' as SectionId, component: markRaw(SlideExperience) },
  { id: 'contact' as SectionId, component: markRaw(SlideContact) },
]

const headerRef = useTemplateRef<InstanceType<typeof AppHeader>>('headerRef')
const footerRef = useTemplateRef<InstanceType<typeof AppFooter>>('footerRef')

const headerEl = computed<HTMLElement | null>(() => headerRef.value?.root ?? null)
const headerItemsEl = computed<HTMLElement | null>(() => headerRef.value?.items ?? null)
const footerEl = computed<HTMLElement | null>(() => footerRef.value?.root ?? null)

const { enabled: navEnabled } = useEntryTimeline({
  header: headerEl,
  headerItems: headerItemsEl,
  footer: footerEl,
})

const nav = useSlideNavigation({
  count: sections.length,
  enabled: navEnabled,
  transitionDuration: 1.0,
  wheelSensitivity: 0.004,
  touchThreshold: 50,
})

const activeIndex = ref(0)
const activeId = computed<SectionId>(() => sections[activeIndex.value]?.id ?? 'hero')

const onStageRef = (el: HTMLElement | null) => {
  nav.stageRef(el)
}

const onNavigate = (id: string) => {
  const idx = sections.findIndex((s) => s.id === id)
  if (idx >= 0) activeIndex.value = idx
}

const jumpById = (id: string) => {
  const idx = sections.findIndex((s) => s.id === id)
  if (idx >= 0) {
    nav.goTo(idx)
  }
}

provideNavigation({ jumpById })

const skipTarget = computed(() => sections[1]?.id ?? 'about')
</script>

<template>
  <div class="flex h-full flex-col">
    <CursorGlow />

    <a
      :href="`#${skipTarget}`"
      class="focus:bg-ctp-mantle focus:text-ctp-text sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:text-sm"
      @click.prevent="jumpById(skipTarget)"
    >
      {{ t('nav.skipToContent') }}
    </a>

    <AppHeader ref="headerRef" :active="activeId" @jump="jumpById" />

    <main class="relative flex-1 overflow-hidden">
      <SlideStage
        :components="slideComponents"
        :index="activeIndex"
        :current="nav.current.value"
        :target="nav.target.value"
        :transition-duration="1.0"
        :active-id="activeId"
        :on-navigate="onNavigate"
        :on-stage-ref="onStageRef"
      />
    </main>

    <AppFooter
      ref="footerRef"
      :sections="sections"
      :active="activeId"
      :enabled="navEnabled"
      :progress="nav.progress.value"
      @jump="jumpById"
    />
  </div>
</template>
