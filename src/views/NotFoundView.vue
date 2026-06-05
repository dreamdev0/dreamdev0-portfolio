<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GradientButton from '@/components/ui/GradientButton.vue'

const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
    <h1
      class="from-accent to-accent-strong bg-gradient-to-br bg-clip-text text-9xl font-black text-transparent"
    >
      {{ t('notFound.title') }}
    </h1>
    <p class="text-ctp-subtext1 text-xl">{{ t('notFound.message') }}</p>
    <GradientButton to="/" variant="primary" size="lg">
      {{ t('notFound.back') }}
    </GradientButton>
  </div>
</template>
