<script lang="ts" setup>
import { motion } from 'motion-v';
import Bolt from '../icons/Bolt.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  initialProgress: number;
  status: 'static' | 'filling' | 'dripping';
  colorClass: string;
}>();

const FILLED_TOP_PERCENTAGE = -20;
const EMPTY_TOP_PERCENTAGE = 100;

const focusCell = ref<HTMLElement | null>(null);

const focusCellTop = (progress: number) => {
  return progress * (EMPTY_TOP_PERCENTAGE - FILLED_TOP_PERCENTAGE) + FILLED_TOP_PERCENTAGE;
};

onMounted(() => {
  if (!focusCell.value) return;
  focusCell.value.style.top = `${EMPTY_TOP_PERCENTAGE + FILLED_TOP_PERCENTAGE - focusCellTop(props.initialProgress)}%`;
});
</script>

<template>
  <div :class="`w-1/6 h-full ${colorClass} rounded-md flex-center relative overflow-hidden`">
    <!-- from top 100% to top -20% -->
    <div class="absolute w-full h-full left-0 duration-300" ref="focusCell">
      <div class="absolute bottom-full w-full h-full left-0 bg-surface-tertiary"></div>

      <motion.div
        class="w-[200%] h-full bg-surface-tertiary rounded-2xl absolute -top-9/10 -left-1/2"
        :animate="{ rotate: 360, y: [0, 2, 0] }"
        :transition="{
          duration: 9,
          repeat: Infinity,
          ease: 'linear',
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }"
      >
      </motion.div>
      <motion.div
        class="w-[200%] h-full bg-black/20 rounded-2xl absolute -top-17/20 -left-1/2"
        :animate="{ rotate: 360, y: [0, 2, 0] }"
        :transition="{
          duration: 9,
          repeat: Infinity,
          ease: 'linear',
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }"
      >
      </motion.div>
    </div>
    <Bolt class="fill-surface-primary stroke-surface-primary w-5/6 z-10"></Bolt>
  </div>
</template>
