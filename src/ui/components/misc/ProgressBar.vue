<script lang="ts" setup>
import { motion } from 'motion-v';
import { computed } from 'vue';

const props = defineProps<{
  progress: number;
}>();

const bars = 20;
const highlightLimit = computed(() => Math.floor(props.progress * bars));
</script>

<template>
  <div class="flex -skew-x-20 gap-x-1">
    <motion.div
      v-for="(_, idx) in bars"
      class="w-2 h-6 bg-primary duration-100"
      :initial="{ opacity: 0, x: -10 }"
      :animate="{ opacity: idx >= highlightLimit ? 0.25 : 1, x: 0 }"
      :transition="{ delay: 0.02 * idx }"
    ></motion.div>
  </div>
</template>
