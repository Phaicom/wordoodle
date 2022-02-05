import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Result } from '@wordoodle/core'
import { createWordoodleGenerator } from '@wordoodle/core'
import { reactive, ref } from 'vue'

export const useWordoodleStore = defineStore('wordoodle', () => {
  const wordoodle = createWordoodleGenerator()
  const indicator = ref<number>(0)
  const resultSet = reactive<Result[]>([])

  const shuffle = () => {
    wordoodle.shuffle()
  }

  const initializeKeys = () => {
    shuffle()
    return new Array(6)
      .fill('')
      .map(() => [],
      )
  }

  const keysInput = reactive<string[][]>(initializeKeys())

  const clear = () => {
    Object.assign(keysInput, initializeKeys())
    indicator.value = 0
  }

  const next = () => {
    wordoodle.next()
  }

  const check = () => {
    const i = indicator.value
    indicator.value += 1
    Object.assign(resultSet, [...resultSet, wordoodle.check(keysInput[i].join(''))])
  }

  const addWord = (word: string) => {
    const i = indicator.value
    if (keysInput[i].length === 5)
      return

    keysInput[i] = [...keysInput[i], word]
  }

  const deleteWord = () => {
    const i = indicator.value
    if (keysInput[i].length === 0)
      return
    keysInput[i] = keysInput[i].slice(0, -1)
  }

  return {
    wordoodle, keysInput, clear, check, shuffle, next, addWord, deleteWord, resultSet, indicator,
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useWordoodleStore, import.meta.hot))
