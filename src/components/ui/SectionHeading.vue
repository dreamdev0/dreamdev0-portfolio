<script setup lang="ts">
withDefaults(defineProps<{ eyebrow?: string; shimmer?: boolean }>(), {
  eyebrow: '',
  shimmer: false,
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-if="eyebrow" class="flex items-center gap-3">
      <span class="bg-accent h-[2px] w-12 rounded-full" />
      <span class="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
        {{ eyebrow }}
      </span>
    </div>
    <h2
      class="section-heading relative text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
      :class="{ 'section-heading--shimmer': shimmer }"
    >
      <slot />
    </h2>
  </div>
</template>

<style scoped>
.section-heading {
  color: var(--catppuccin-color-text);
}

.section-heading--shimmer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%);
  background-size: 50% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  opacity: 0.32;
  mix-blend-mode: overlay;
  pointer-events: none;
  animation: section-shimmer 6s linear infinite;
}

@keyframes section-shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
