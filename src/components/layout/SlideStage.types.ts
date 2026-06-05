import type { Component } from 'vue'

export interface SlideConfig {
  id: string
  component: Component
}

export interface SlideStageProps {
  components: ReadonlyArray<SlideConfig>
  index: number
  current: number
  target: number
  transitionDuration?: number
  activeId: string
  onNavigate?: (id: string) => void
  onStageRef?: (el: HTMLElement | null) => void
}
