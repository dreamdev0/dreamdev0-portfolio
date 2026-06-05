import { watch, onMounted, onBeforeUnmount, type Ref, isRef } from 'vue'
import { useReducedMotion } from './useReducedMotion'

export function useAmbientLoop(isActive: Ref<boolean> | boolean, setup: () => () => void): void {
  const activeRef: Ref<boolean> = isRef(isActive) ? isActive : ({ value: isActive } as Ref<boolean>)

  const reducedMotion = useReducedMotion()
  let teardown: (() => void) | null = null

  const stop = (): void => {
    if (teardown) {
      teardown()
      teardown = null
    }
  }

  const start = (): void => {
    stop()
    if (reducedMotion.value) return
    teardown = setup()
  }

  watch(activeRef, (v) => {
    if (v) start()
    else stop()
  })

  onMounted(() => {
    if (activeRef.value) start()
  })

  watch(reducedMotion, (v) => {
    if (v) stop()
    else if (activeRef.value) start()
  })

  onBeforeUnmount(stop)
}
