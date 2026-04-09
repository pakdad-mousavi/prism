<script lang="ts" setup>
import FocusCell from './FocusCell.vue';
</script>

<template>
  <div class="aspect-3/1 p-px rounded-md bg-linear-to-r from-auxilary via-primary to-quaternary from-20% via-40% to-80%">
    <div class="flex gap-x-2 w-full h-full p-1.5 rounded-md bg-black relative">
      <!-- BLURS -->
      <div class="absolute w-1/3 h-full rounded-md top-0 bg-auxilary/80 blur-xl left-0"></div>
      <div class="absolute w-1/3 h-full rounded-md top-0 bg-primary/80 blur-xl left-1/3"></div>
      <div class="absolute w-1/3 h-full rounded-md top-0 bg-quaternary/80 blur-xl left-2/3"></div>

      <!-- BARS -->
      <FocusCell status="static" :initialProgress="0.5" :colorClass="'bg-auxilary'"></FocusCell>
      <FocusCell status="static" :initialProgress="0.5" :colorClass="'bg-auxilary'"></FocusCell>
      <FocusCell status="static" :initialProgress="0.5" :colorClass="'bg-primary'"></FocusCell>
      <FocusCell status="static" :initialProgress="0.5" :colorClass="'bg-primary'"></FocusCell>
      <FocusCell status="static" :initialProgress="0.5" :colorClass="'bg-quaternary'"></FocusCell>
      <FocusCell status="static" :initialProgress="0.5" :colorClass="'bg-quaternary'"></FocusCell>
    </div>
  </div>
</template>
