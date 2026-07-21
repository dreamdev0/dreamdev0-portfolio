<script setup lang="ts">
import { onMounted } from 'vue'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import HomeView from '@/views/HomeView.vue'
import CustomCursor from '@/components/ui/CustomCursor.vue'

onMounted(() => {
  inject()
  injectSpeedInsights()
})
</script>

<template>
  <HomeView />
  <CustomCursor />
</template>
