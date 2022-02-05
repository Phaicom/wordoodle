<template>
  <div class="flex justify-center items-center grow overflow-hidden">
    <!-- board -->
    <div class="grid grid-rows-6 gap-2 p-3 box-border">
      <!-- row -->
      <div v-for="i in 6" :key="i" class="flex gap-2">
        <!-- tile -->
        <div v-for="j in 5" :key="j" class="w-14 h-14 border-2 border-base-300 border-solid select-none flex justify-center items-center text-4xl font-semibold">
          {{ j }}
        </div>
      </div>
    </div>
  </div>
</template>
