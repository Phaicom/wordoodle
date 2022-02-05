<script setup lang="ts">
import { useWordoodle } from '@/hooks/useWordoodle'

const { check, deleteWord, addWord, keysInput, resultSet, isReadyForCheck } = useWordoodle()
const keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''], ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']]

const onInput = (word: string) => {
  if (word === '')
    return
  if (word === 'enter') {
    if (isReadyForCheck.value)
      check()
    return
  }
  if (word === 'del') {
    deleteWord()
    return
  }

  addWord(word)
}
</script>

<template>
  <div class="flex flex-col p-2 gap-1">
    {{ keysInput }}
    {{ resultSet }}
    <div v-for="(line, i) in keys" :key="i" class="flex gap-1">
      <button
        v-for="key in line"
        :key="key"
        class="btn btn-primary h-14 flex flex-1 select-none p-0"
        :class="{ 'bg-transparent border-none btn-disabled': !key }"
        @click="onInput(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>
