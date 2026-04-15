<script lang="ts" setup>
import { animate, motion, type AnimationPlaybackControlsWithThen, type AnimationSequence } from 'motion-v';
import { onMounted, ref, watch } from 'vue';
import Bolt from '../icons/Bolt.vue';

const props = defineProps<{
  progress: number;
  status: 'static' | 'dripping';
  colorClass: string;
}>();

// CONSTANTS
const FILLED_TOP_PERCENTAGE = -20;
const EMPTY_TOP_PERCENTAGE = 100;

// DRIP ANIMATION ELEMENTS
const dropPrimary = ref<HTMLElement | null>(null);
const dropBodyPrimary = ref<HTMLElement | null>(null);
const dropSecondary = ref<HTMLElement | null>(null);
const dropBodySecondary = ref<HTMLElement | null>(null);

// ANIMATION CONTROLS
const controls = ref<AnimationPlaybackControlsWithThen | null>(null);

// CELL BODY ELEMENT
const innerCellContainer = ref<HTMLElement | null>(null);

// Calculate the top percentage based on focus run progress
const focusCellTop = (progress: number) => {
  return progress * (EMPTY_TOP_PERCENTAGE - FILLED_TOP_PERCENTAGE) + FILLED_TOP_PERCENTAGE;
};

// Begin drip animation
const startDripping = () => {
  if (!dropPrimary.value || !dropBodyPrimary.value || !dropSecondary.value || !dropBodySecondary.value) return;

  controls.value?.stop(); // stop previous animation

  const dripSequence: AnimationSequence = [
    [dropPrimary.value, { y: [0, 4, 30], scale: [1, 1, 0] }, { duration: 1.5, repeat: 1_000 }],
    [dropBodyPrimary.value, { bottom: [1, -4, -3, 5] }, { duration: 1.5, repeat: 1_000, at: 0 }],
    [dropSecondary.value, { y: [0, 4, 30], scale: [1, 1, 0] }, { duration: 1.25, repeat: 1_000, at: 0.5 }],
    [dropBodySecondary.value, { bottom: [1, -4, -3, 5] }, { duration: 1.25, repeat: 1_000, at: 0.5 }],
  ];

  controls.value = animate(dripSequence);
};

// Used to update drip on command
const updateDrip = (status: 'dripping' | 'static') => {
  if (status === 'dripping') {
    startDripping();
  } else {
    controls.value?.complete();
  }
};

onMounted(() => {
  if (!innerCellContainer.value) return;
  innerCellContainer.value.style.top = `${EMPTY_TOP_PERCENTAGE + FILLED_TOP_PERCENTAGE - focusCellTop(props.progress)}%`;

  updateDrip(props.status);
});

// Update progress when needed
watch(
  () => props.progress,
  (newProgress) => {
    if (!innerCellContainer.value) return;
    innerCellContainer.value.style.top = `${EMPTY_TOP_PERCENTAGE + FILLED_TOP_PERCENTAGE - focusCellTop(newProgress)}%`;
  },
);

// Update dripping animation when needed
watch(
  () => props.status,
  (newStatus) => updateDrip(newStatus),
);
</script>

<template>
  <div class="w-1/6 h-full relative">
    <div :class="`size-full ${colorClass} rounded-md flex-center relative overflow-hidden z-10`">
      <div class="absolute w-full h-full left-0 duration-300" ref="innerCellContainer">
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

    <!-- DRIP ANIMATION -->
    <div
      ref="dropPrimary"
      :class="`rounded-full h-1.5 w-1.5 absolute left-1/3 -translate-x-1/2 bottom-0 z-1 ${colorClass}`"
    ></div>
    <div
      ref="dropBodyPrimary"
      :class="`rounded-sm h-2.5 w-2.5 absolute left-1/3 -translate-x-1/2 bottom-1 rotate-45 z-1 ${colorClass}`"
    ></div>
    <div
      ref="dropSecondary"
      :class="`rounded-full h-1.5 w-1.5 absolute left-13/20 -translate-x-1/2 bottom-0 z-1 ${colorClass}`"
    ></div>
    <div
      ref="dropBodySecondary"
      :class="`rounded-sm h-2.5 w-2.5 absolute left-13/20 -translate-x-1/2 bottom-1 rotate-45 z-1 ${colorClass}`"
    ></div>
  </div>
</template>
