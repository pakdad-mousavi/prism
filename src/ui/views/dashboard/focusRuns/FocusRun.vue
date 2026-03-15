<script setup lang="ts">
import { motion } from 'motion-v';
import Star from '../../../components/icons/Star.vue';
</script>

<template>
  <!-- OUTER HUD -->
  <div class="absolute-center w-74 h-74 rounded-full arc-md-225"></div>
  <div class="absolute-center w-74 h-74 rounded-full arc-md-100"></div>
  <motion.div
    class="absolute-center rounded-full arc-sm-40 w-110 h-110"
    :initial="{ rotate: -90, translateY: '100px' }"
    :animate="{ rotate: [null, 210, 0], translateY: '0' }"
    :transition="{ rotate: { delay: 0.1, duration: 3, times: [0, 0.4, 1], ease: ['anticipate', 'circInOut'] } }"
  ></motion.div>
  <motion.div
    class="absolute-center rounded-full arc-lg-65 w-110 h-110"
    :initial="{ rotate: -90, translateY: '100px' }"
    :animate="{ rotate: [null, 210, 0], translateY: '0' }"
    :transition="{ rotate: { delay: 0.1, duration: 3, times: [0, 0.4, 1], ease: ['anticipate', 'circInOut'] } }"
  ></motion.div>
  <motion.div
    class="absolute-center rounded-full arc-sm-120 w-110 h-110"
    :initial="{ rotate: -90, translateY: '100px' }"
    :animate="{ rotate: [null, 210, 0], translateY: '0' }"
    :transition="{ rotate: { delay: 0.1, duration: 3, times: [0, 0.4, 1], ease: ['anticipate', 'circInOut'] } }"
  ></motion.div>
  <motion.div
    class="absolute-center rounded-full arc-sm-220 w-110 h-110"
    :initial="{ rotate: -90, translateY: '-100px' }"
    :animate="{ rotate: [null, 210, 0], translateY: '0' }"
    :transition="{ rotate: { delay: 0.1, duration: 3, times: [0, 0.4, 1], ease: ['anticipate', 'circInOut'] } }"
  ></motion.div>
  <motion.div
    class="absolute-center rounded-full arc-lg-245 w-110 h-110"
    :initial="{ rotate: -90, translateY: '-100px' }"
    :animate="{ rotate: [null, 210, 0], translateY: '0' }"
    :transition="{ rotate: { delay: 0.1, duration: 3, times: [0, 0.4, 1], ease: ['anticipate', 'circInOut'] } }"
  ></motion.div>
  <motion.div
    class="absolute-center rounded-full arc-sm-300 w-110 h-110"
    :initial="{ rotate: -90, translateY: '-100px' }"
    :animate="{ rotate: [null, 210, 0], translateY: '0' }"
    :transition="{ rotate: { delay: 0.1, duration: 3, times: [0, 0.4, 1], ease: ['anticipate', 'circInOut'] } }"
  ></motion.div>
  <div class="absolute-center w-110 h-110 rounded-full glow border border-primary/10"></div>

  <!-- OUTER HUD -->
  <div class="absolute-center flex-center w-76 h-76 rounded-full border-dotted">
    <div class="flex-center w-69 h-69 border-2 border-primary/50 rounded-full border-dotted glow">
      <div class="flex-center w-65 h-65 rounded-full border-2 border-primary/50 border-dotted">
        <div class="flex-center w-61 h-61 rounded-full border-2 border-primary/50 border-dotted">
          <div class="flex-center w-60 h-60 rounded-full border-2 border-primary/75 border-dashed rotate-10">
            <div class="flex-center w-50 h-50 rounded-full border border-primary/25"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MAIN -->
  <div class="p-12 h-[calc(100vh-64px)] flex-center"></div>

  <!-- OUTER BORDER -->
  <Star class="absolute top-8 left-8 fill-surface-tertiary w-5 h-5 -translate-x-1/2 -translate-y-1/2"></Star>
  <Star class="absolute top-8 right-8 fill-surface-tertiary w-5 h-5 translate-x-1/2 -translate-y-1/2"></Star>
  <Star class="absolute bottom-8 left-8 fill-surface-tertiary w-5 h-5 -translate-x-1/2 translate-y-1/2"></Star>
  <Star class="absolute bottom-8 right-8 fill-surface-tertiary w-5 h-5 translate-x-1/2 translate-y-1/2"></Star>
  <div class="absolute w-px bg-surface-tertiary left-8 top-0 h-full -translate-x-1/2"></div>
  <div class="absolute w-px bg-surface-tertiary right-8 top-0 h-full translate-x-1/2"></div>
  <div class="absolute w-full bg-surface-tertiary left-0 bottom-8 h-px translate-y-1/2"></div>
  <div class="absolute w-full bg-surface-tertiary left-0 top-8 h-px -translate-y-1/2"></div>
</template>
