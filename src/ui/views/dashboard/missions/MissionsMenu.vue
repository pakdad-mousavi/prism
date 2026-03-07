<script setup lang="ts">
import Plus from '../../../components/icons/Plus.vue';
import Target from '../../../components/icons/Target.vue';
</script>

<template>
  <menu class="bg-surface-secondary flex items-center text-xs font-tomorrow px-4 gap-x-4">
    <div class="flex-1"></div>
    <button
      class="cut-corners border border-primary px-4 py-1.5 bg-surface-tertiary/50 rounded-sm cursor-pointer hover:bg-surface-primary duration-100 flex gap-x-2"
    >
      <Target class="w-4 h-4 stroke-[1.5px]"></Target>
      <span> SELECT MISSION </span>
    </button>
    <button
      class="cut-corners border border-primary px-4 py-1.5 bg-surface-tertiary/50 rounded-sm cursor-pointer hover:bg-surface-primary duration-100 flex gap-x-2"
    >
      <Plus class="w-4 h-4"></Plus>
      <span> CREATE MISSION </span>
    </button>
  </menu>
</template>
