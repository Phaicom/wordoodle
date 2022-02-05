<script setup lang="ts">
import { reactive, ref } from 'vue'
import { KeyTypeEnum } from '@wordoodle/core'
import type { KeyList } from '@wordoodle/core'
import { useWordoodleStore } from '@/store/wordoodle'
import { useWordoodle } from '@/hooks/useWordoodle'

const { check, deleteWord, addWord, wordoodle } = useWordoodleStore()
const { isReadyForCheck } = useWordoodle()
const keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''], ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']]
const keyList = reactive<KeyList[]>([])
// TODO: find a way to refactor this
const tempIsCheck = ref(false)

const onClickKey = (key: string) => {
  if (key === '')
    return
  if (key === 'enter') {
    if (isReadyForCheck.value) {
      check()
      Object.assign(keyList, wordoodle.keyList)
      tempIsCheck.value = !tempIsCheck.value
    }
    return
  }
  if (key === 'del') {
    deleteWord()
    return
  }

  addWord(key)
}

const getKeyClass = (key: string) => {
  const word = keyList.find(w => w.word === key)

  if (word) {
    switch (word.type) {
      case KeyTypeEnum.CORRECT:
        return 'btn-success'
      case KeyTypeEnum.INCORRECT:
        return 'btn-disabled'
      case KeyTypeEnum.WRONG_LOCATION:
        return 'btn-warning'
    }
  }

  return 'btn-primary'
}
</script>

<template>
  <div :key="tempIsCheck + ''" class="flex flex-col p-2 gap-1">
    <div v-for="(line, i) in keys" :key="i" class="flex gap-1">
      <button
        v-for="key in line"
        :key="key"
        class="btn h-14 flex flex-1 select-none p-0"
        :class="[!key ? 'bg-transparent border-none btn-disabled' : null, getKeyClass(key)]"
        @click="onClickKey(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>
