<script setup lang="ts">
import { RouterView } from 'vue-router';
import { motion } from 'motion-v';

const shape = {
  strokeLinecap: 'round',
  fill: 'transparent',
};
</script>

<template>
  <RouterView />
  <div class="flex items-center justify-center w-full h-svh ">
    <div class="absolute top-0 w-full h-16 lg:h-20">
      <div class="absolute top-0 left-0 flex w-full px-10 py-6">
        <div class="w-1/2 -scale-x-100">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="4"
              fill="transparent"
              :transition="{ duration: 2, delay: 0.5, ease: 'easeInOut' }"
              :initial="{ pathLength: 1, pathOffset: 0 }"
              :animate="{ pathOffset: [1, -0.8] }"
              :style="shape"
              class="reverse-drop-shadow"
            />
          </motion.svg>
        </div>
        <div class="w-1/2">
          <motion.svg viewBox="0 0 704 64" preserveAspectRatio="xMidYMid meet" class="overflow-visible">
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="4"
              fill="transparent"
              :transition="{ duration: 2, delay: 0.5, ease: 'easeInOut' }"
              :initial="{ pathLength: 1, pathOffset: 0 }"
              :animate="{ pathOffset: [1, -0.8] }"
              :style="shape"
              class="reverse-drop-shadow"
            />
          </motion.svg>
        </div>
      </div>

      <div class="absolute top-0 left-0 flex w-full px-10 py-6">
        <div class="w-1/2 -scale-x-100">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :style="shape"
              :transition="{ duration: 1 }"
              :initial="{ pathLength: 1, opacity: 0 }"
              :animate="{ pathOffset: [1, -4], opacity: 0.5 }"
              class="reverse-drop-shadow"
            />
          </motion.svg>
        </div>
        <div class="w-1/2">
          <motion.svg viewBox="0 0 704 64" preserveAspectRatio="xMidYMid meet" class="overflow-visible">
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :style="shape"
              :transition="{ duration: 1 }"
              :initial="{ pathLength: 1, opacity: 0 }"
              :animate="{ pathOffset: [1, -4], opacity: 0.5 }"
              class="reverse-drop-shadow"
            />
          </motion.svg>
        </div>
      </div>

      <div class="absolute top-[15%] left-0 flex w-full py-6 px-10">
        <div class="w-1/2 -scale-x-100">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :transition="{ duration: 3, delay: 1, strokeWidth: { duration: 1, delay: 3.5 } }"
              :initial="{ pathLength: 0, strokeWidth: 2 }"
              :animate="{ pathLength: 0.5, strokeWidth: 4 }"
              :style="shape"
              class="reverse-drop-shadow"
            />
          </motion.svg>
        </div>
        <div class="w-1/2">
          <motion.svg
            viewBox="0 0 704 64"
            preserveAspectRatio="xMidYMid meet"
            :style="{ width: '100%', height: 'auto' }"
            class="overflow-visible"
          >
            <motion.path
              d="M703.5 2H553.5L443.5 52H0"
              stroke="#F7374F"
              stroke-width="2"
              fill="transparent"
              :transition="{ duration: 3, delay: 1, strokeWidth: { duration: 1, delay: 3.5 } }"
              :initial="{ pathLength: 0, strokeWidth: 2 }"
              :animate="{ pathLength: 0.5, strokeWidth: 4 }"
              :style="shape"
              class="reverse-drop-shadow"
            />
          </motion.svg>
        </div>
      </div>

      <motion.svg
        viewBox="0 0 524 28"
        preserveAspectRatio="xMidYMid meet"
        :style="{ width: '40%', height: 'auto' }"
        class="absolute pb-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <motion.path
          d="M0 14H524"
          stroke="#F7374F"
          stroke-width="1"
          :transition="{ duration: 2, delay: 1 }"
          :initial="{ pathLength: 0, pathOffset: 0.5 }"
          :animate="{ pathLength: 1, pathOffset: 0 }"
          fill="transparent"
          class="drop-shadow-sm drop-shadow-crimson"
        />
        <motion.path
          d="M262 28L262 0"
          stroke="#F7374F"
          stroke-width="1"
          :transition="{ duration: 2, delay: 1 }"
          :initial="{ pathLength: 0, pathOffset: 0.5 }"
          :animate="{ pathLength: 1, pathOffset: 0 }"
          fill="transparent"
          class="drop-shadow-sm drop-shadow-crimson"
        />
      </motion.svg>
    </div>

    <div class="absolute bottom-0 left-0 flex w-full px-10 py-6">
      <div class="w-1/2">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="4"
            fill="transparent"
            :transition="{ duration: 2, delay: 1, opacity: { duration: 0, delay: 1 } }"
            :initial="{ pathLength: 0, pathOffset: 0, opacity: 0 }"
            :animate="{ pathLength: 1, pathOffset: -1.8, opacity: 1 }"
            :style="shape"
            class="drop-shadow-xl drop-shadow-crimson"
          />
        </motion.svg>
      </div>
      <div class="w-1/2 -scale-x-100">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="4"
            fill="transparent"
            :transition="{ duration: 2, delay: 1, opacity: { duration: 0, delay: 1 } }"
            :initial="{ pathLength: 0, pathOffset: 0, opacity: 0 }"
            :animate="{ pathLength: 1, pathOffset: -1.8, opacity: 1 }"
            :style="shape"
            class="drop-shadow-xl drop-shadow-crimson"
          />
        </motion.svg>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 flex w-full px-10 py-6">
      <div class="w-1/2">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 2 }"
            :initial="{ pathLength: 0, pathOffset: -1, opacity: 0.5 }"
            :animate="{ pathLength: 1, pathOffset: 2 }"
            :style="shape"
            class="drop-shadow-xl drop-shadow-crimson"
          />
        </motion.svg>
      </div>
      <div class="w-1/2 -scale-x-100">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 2 }"
            :initial="{ pathLength: 0, pathOffset: -1, opacity: 0.5 }"
            :animate="{ pathLength: 1, pathOffset: 2 }"
            :style="shape"
            class="drop-shadow-xl drop-shadow-crimson"
          />
        </motion.svg>
      </div>
    </div>

    <div class="absolute left-0 flex w-full px-20 py-6 bottom-[2%]">
      <div class="w-1/2">
        <motion.svg viewBox="0 0 704 64" preserveAspectRatio="xMidYMid meet" :style="{ width: '100%', height: 'auto' }">
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 1.5, delay: 2.5, opacity: { duration: 0, delay: 2.5 } }"
            :initial="{ pathLength: 0, opacity: 0 }"
            :animate="{ pathLength: 0.2, opacity: 1 }"
            :style="shape"
            class="drop-shadow-xl drop-shadow-crimson"
          />
        </motion.svg>
      </div>
      <div class="w-1/2 -scale-x-100">
        <motion.svg
          viewBox="0 0 704 64"
          preserveAspectRatio="xMidYMid meet"
          :style="{ width: '100%', height: 'auto' }"
          class="overflow-visible"
        >
          <motion.path
            d="M703.5 52H582.625L541.75 2H260L150 52H0"
            stroke="#F7374F"
            stroke-width="2"
            fill="transparent"
            :transition="{ duration: 1.5, delay: 2.5, opacity: { duration: 0, delay: 2.5 } }"
            :initial="{ pathLength: 0, opacity: 0 }"
            :animate="{ pathLength: 0.2, opacity: 1 }"
            :style="shape"
            class="drop-shadow-xl drop-shadow-crimson"
          />
        </motion.svg>
      </div>
    </div>

    <motion.div
      class="w-[10%] relative"
      :transition="{ duration: 0.5, delay: 5.5 }"
      :initial="{ filter: 'blur(0px)' }"
      :animate="{ filter: 'blur(12px)' }"
    >
      <motion.svg viewBox="0 0 162 142" preserveAspectRatio="xMidYMid meet" class="w-full overflow-visible">
        <motion.path
          d="M81 19L15 133H147L81 19Z"
          stroke-width="4"
          stroke="#F7374F"
          :transition="{ duration: 2.5, delay: 1, filter: { duration: 1, delay: 4 } }"
          :initial="{ pathLength: 0, filter: 'drop-shadow(#F7374F 0px 0px 0px)' }"
          :animate="{ pathLength: 1, filter: 'drop-shadow(#F7374F 0px 0px 10px)' }"
        />
        <motion.path
          d="M81 2V79.6582"
          stroke-width="4"
          stroke="#F7374F"
          stroke-linecap="round"
          class="glow"
          :transition="{ duration: 1.5, delay: 3.5, ease: 'easeInOut', opacity: { duration: 0 } }"
          :initial="{ pathLength: 0, opacity: 0 }"
          :animate="{ pathLength: 1, opacity: 1 }"
        />
        <motion.path
          d="M160 140L92.4977 101.176"
          stroke-width="4"
          stroke="#F7374F"
          stroke-linecap="round"
          class="glow"
          :transition="{ duration: 1.5, delay: 3.6, ease: 'easeInOut', opacity: { duration: 0 } }"
          :initial="{ pathLength: 0, opacity: 0 }"
          :animate="{ pathLength: 1, opacity: 1 }"
        />
        <motion.path
          d="M2 140L69.5023 101.176"
          stroke-width="4"
          stroke="#F7374F"
          stroke-linecap="round"
          class="glow"
          :transition="{ duration: 1.5, delay: 3.7, ease: 'easeInOut', opacity: { duration: 0 } }"
          :initial="{ pathLength: 0, opacity: 0 }"
          :animate="{ pathLength: 1, opacity: 1 }"
        />
      </motion.svg>
    </motion.div>

    <motion.p
      class="absolute text-4xl text-center -translate-x-1/2 top-1/2 left-1/2 font-tomorrow text-crimson"
      :transition="{ duration: 1, delay: 5.8 }"
      :initial="{ opacity: 0, translateY: '0' }"
      :animate="{ opacity: 1, translateY: 'calc(calc(-1/3 * 100%)' }"
    >
      PRISM
    </motion.p>
  </div>
</template>
