import { ref } from 'vue'
import { useWordoodleStore } from '@/store/wordoodle'

export const useWordoodle = () => {
  const wordoodleStore = useWordoodleStore()
  const isReadyForCheck = ref(false)
  const indicator = ref(0)

  wordoodleStore.$subscribe((_, state) => {
    indicator.value = state.indicator
    isReadyForCheck.value = state.keysInput[state.indicator].length === 5
  })

  return {
    isReadyForCheck, indicator,
  }
}
