import { computed, ref } from 'vue'
import { createWordoodleGenerator } from '@wordoodle/core'

export const useWordoodle = () => {
  const wordoodle = createWordoodleGenerator()
  const indicator = ref<number>(0)
  const resultSet = ref<Object[]>([])

  const shuffle = () => {
    wordoodle.shuffle()
  }

  const initializeKeys = () => {
    shuffle()
    return new Array(5)
      .fill('')
      .map(() => [],
      )
  }

  const keysInput = ref<string[][]>(initializeKeys())
  const isReadyForCheck = computed(() => keysInput.value[indicator.value].length === 5)

  const clear = () => {
    keysInput.value = initializeKeys()
    indicator.value = 0
  }

  const next = () => {
    wordoodle.next()
  }

  const check = () => {
    const i = indicator.value
    indicator.value += 1
    resultSet.value = [...resultSet.value, wordoodle.check(keysInput.value[i].join(''))]
  }

  const addWord = (word: string) => {
    const i = indicator.value
    if (keysInput.value[i].length === 5)
      return

    keysInput.value[i] = [...keysInput.value[i], word]
  }

  const deleteWord = () => {
    const i = indicator.value
    if (keysInput.value[i].length === 0)
      return
    keysInput.value[i] = keysInput.value[i].slice(0, -1)
  }

  return {
    wordoodle, keysInput, clear, check, shuffle, next, addWord, deleteWord, resultSet, isReadyForCheck,
  }
}
