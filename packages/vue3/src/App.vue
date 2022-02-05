<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheBoard from '@/components/TheBoard.vue'
import TheKeyboards from '@/components/TheKeyboards.vue'
</script>

<template>
  <div class="max-w-lg mx-auto flex flex-col h-screen">
    <the-header />
    <the-board />
    <the-keyboards />
  </div>
</template>
