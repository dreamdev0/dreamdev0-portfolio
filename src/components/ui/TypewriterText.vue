<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  text: string
}

defineProps<Props>()

const cursorVisible = ref(true)
let cursorTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  cursorTimer = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 530)
})

onBeforeUnmount(() => {
  if (cursorTimer) {
    clearInterval(cursorTimer)
    cursorTimer = null
  }
})
</script>

<template>
  <span class="text-accent inline font-mono">
    {{ text }}<span :class="cursorVisible ? 'opacity-100' : 'opacity-0'">|</span>
  </span>
</template>
