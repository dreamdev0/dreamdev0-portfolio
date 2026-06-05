<script setup lang="ts">
interface Props {
  label: string
  variant?: 'default' | 'accent'
}

withDefaults(defineProps<Props>(), { variant: 'default' })
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors"
    :class="
      variant === 'accent'
        ? 'border-accent text-accent'
        : 'border-ctp-surface2 bg-ctp-surface0/60 text-ctp-subtext1 hover:border-accent hover:text-accent'
    "
  >
    {{ label }}
  </span>
</template>
