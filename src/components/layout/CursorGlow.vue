<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const root = useTemplateRef<HTMLElement>('root')
const isActive = ref(false)

const x = ref(0)
const y = ref(0)
let mx = 0
let my = 0
let rafId: number | null = null
const reducedMotion = useReducedMotion()

function onMove(e: MouseEvent): void {
  mx = e.clientX
  my = e.clientY
}

function tick(): void {
  x.value += (mx - x.value) * 0.1
  y.value += (my - y.value) * 0.1
  if (root.value) {
    root.value.style.setProperty('--cursor-x', `${x.value}px`)
    root.value.style.setProperty('--cursor-y', `${y.value}px`)
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (reducedMotion.value) return
  if (!window.matchMedia('(pointer: fine)').matches) return
  isActive.value = true
  x.value = window.innerWidth / 2
  y.value = window.innerHeight / 2
  mx = x.value
  my = y.value
  window.addEventListener('mousemove', onMove, { passive: true })
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', onMove)
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})
</script>

<template>
  <div
    v-show="isActive"
    ref="root"
    class="cursor-glow pointer-events-none fixed inset-0 z-0"
    aria-hidden="true"
  />
</template>

<style scoped>
.cursor-glow {
  background: radial-gradient(
    circle 320px at var(--cursor-x, 50%) var(--cursor-y, 50%),
    var(--accent),
    transparent 70%
  );
  opacity: 0.14;
  mix-blend-mode: screen;
}
</style>
