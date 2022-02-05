<script setup lang="ts">
import { useWordoodleStore } from '@/store/wordoodle'
import { useWordoodle } from '@/hooks/useWordoodle'

const { check, deleteWord, addWord } = useWordoodleStore()
const { isReadyForCheck } = useWordoodle()
const keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''], ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']]

const onClickKey = (key: string) => {
  if (key === '')
    return
  if (key === 'enter') {
    if (isReadyForCheck.value)
      check()
    return
  }
  if (key === 'del') {
    deleteWord()
    return
  }

  addWord(key)
}
</script>

<template>
  <div class="flex flex-col p-2 gap-1">
    <div v-for="(line, i) in keys" :key="i" class="flex gap-1">
      <button
        v-for="key in line"
        :key="key"
        class="btn btn-primary h-14 flex flex-1 select-none p-0"
        :class="{ 'bg-transparent border-none btn-disabled': !key }"
        @click="onClickKey(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>
