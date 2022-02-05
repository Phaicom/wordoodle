<script setup lang="ts">
import { useWordoodleStore } from '@/store/wordoodle'
import { useWordoodle } from '@/hooks/useWordoodle'

const { keysInput, resultSet } = useWordoodleStore()
const { indicator } = useWordoodle()

const getTileClass = (i: number, j: number) => {
  if (resultSet[i]?.location.correct.includes(j))
    return 'border-success bg-success'
  if (resultSet[i]?.location.incorrect.includes(j))
    return 'border-warning bg-warning'

  if (i < indicator.value)
    return 'bg-base-300'
}
</script>

<template>
  <div class="flex justify-center items-center grow overflow-hidden">
    <!-- board -->
    <div class="grid grid-rows-6 gap-2 p-3 box-border">
      <!-- row -->
      <div v-for="(line, i) in keysInput" :key="i" class="flex gap-2">
        <!-- tile -->
        <div
          v-for="j in 5"
          :key="j"
          class="w-14 h-14 border-2 border-base-300 border-solid select-none flex justify-center items-center text-4xl font-semibold"
          :class="getTileClass(i, j - 1)"
        >
          <template v-if="keysInput[i][j - 1]">
            {{ keysInput[i][j - 1]?.toUpperCase() }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
