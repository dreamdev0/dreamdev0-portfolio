import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import { useTheme } from './composables/useTheme'
import { useAccent } from './composables/useAccent'
import { useLocale } from './composables/useLocale'
import { vHoverGsap } from './directives/vHoverGsap'
import { Analytics } from '@vercel/analytics/vue'

import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.directive('hover-gsap', vHoverGsap)
app.component('Analytics', Analytics)

// Initialize global state BEFORE mount to avoid FOUC and ensure the first
// paint already shows the correct theme/accent/locale.
useTheme()
useAccent()
useLocale()

app.mount('#app')
