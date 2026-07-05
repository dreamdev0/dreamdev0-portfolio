<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'

const { t } = useI18n()
const { locale, toggle } = useLocale()

const label = computed(() =>
  locale.value === 'es' ? t('header.locale.toEn') : t('header.locale.toEs'),
)
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="border-ctp-surface1 bg-ctp-surface0/80 text-ctp-text hover:border-accent focus-visible:border-accent group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border font-mono text-sm font-bold transition-all"
    @click="toggle"
  >
    <span class="text-ctp-text group-hover:text-accent transition-colors">
      {{ locale.toUpperCase() }}
    </span>
  </button>
</template>
