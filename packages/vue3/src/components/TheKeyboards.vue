<script setup lang="ts">
const keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''], ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']]
</script>

<template>
  <div class="flex flex-col p-2 gap-2">
    <div v-for="(line,i) in keys" :key="i" class="flex gap-1">
      <button v-for="key in line" :key="key" class="btn flex flex-1 select-none p-0" :class="{'bg-transparent border-none':!key}">
        {{ key }}
      </button>
    </div>
  </div>
</template>
