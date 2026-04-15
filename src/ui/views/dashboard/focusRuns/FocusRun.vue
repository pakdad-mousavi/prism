<script setup lang="ts">
import { animate, AnimatePresence, motion, type AnimationSequence } from 'motion-v';
import { computed, onMounted, ref, watch } from 'vue';

import { useMissionsStore } from '../../../stores/missions';
import { useFocusRunStore } from '../../../stores/focusRuns';

import ProgressBar from '../../../components/misc/ProgressBar.vue';
import HudBar from '../../../components/focusRuns/HudBar.vue';

import parseMilliseconds from 'parse-ms';
import { useFocusStreakStore } from '../../../stores/focusStreak';

const missionsStore = useMissionsStore();
const focusRunStore = useFocusRunStore();
const focusStreakStore = useFocusStreakStore();

// -------
// HELPERS
// -------

const getPriority = (p: number | undefined | null) => {
  switch (p) {
    case 0:
      return 'low';
    case 1:
      return 'medium';
    case 2:
      return 'high';
    default:
      return '---';
  }
};

const percentageFormatter = new Intl.NumberFormat(undefined, {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// ----------
// FOCUS RUNS
// ----------

const handleStartOrPause = async () => {
  toggleSpin();
  if (!focusRunStore.status) {
    await focusRunStore.startRun(missionsStore.activeMission?.id || null);
    return await focusStreakStore.syncWithMain();
  }

  switch (focusRunStore.status) {
    case 'running':
      return await focusRunStore.pauseRun();
    case 'paused':
      return await focusRunStore.resumeRun();
    default:
      return;
  }
};

const remainingMsParsed = computed(() => {
  const parsed = parseMilliseconds(focusRunStore.remainingMs);
  return `${parsed.minutes}m ${parsed.seconds}s`;
});

// ----------
// ANIMATIONS
// ----------

// Inner HUD
const dottedRingOuter = ref<HTMLElement | null>(null);
const dottedRingMiddle = ref<HTMLElement | null>(null);
const dottedRingInner = ref<HTMLElement | null>(null);
const dottedRingDashed = ref<HTMLElement | null>(null);
const solidRing = ref<HTMLElement | null>(null);

// Outer HUD
const isSpinning = ref(false);
const outerHud = ref<HTMLElement | null>(null);
const rightHudRing = ref<HTMLElement | null>(null);
const leftHudRing = ref<HTMLElement | null>(null);

let outerSpinAnimation: ReturnType<typeof animate> | null = null;

const toggleSpin = async (skipStarterSpin?: boolean) => {
  if (!outerHud.value) return;
  if (isSpinning.value) {
    isSpinning.value = !isSpinning.value;

    // Redo spin animation
    await animate(
      outerHud.value,
      { rotate: skipStarterSpin ? 0 : -270 },
      {
        duration: 1.5,
        ease: 'easeInOut',
      },
    );

    // Redo spin animation
    animate(
      dottedRingInner.value,
      { rotate: -270 },
      {
        duration: 1.5,
        ease: 'easeInOut',
      },
    );

    outerSpinAnimation = animate(
      outerHud.value,
      { rotate: 270 },
      {
        delay: 0.1,
        duration: 36,
        ease: 'linear',
        repeat: Infinity,
      },
    );
  } else {
    isSpinning.value = !isSpinning.value;
    outerSpinAnimation?.stop();
    await animate(outerHud.value, { rotate: 270 }, { duration: 1, ease: 'anticipate' });
  }
};

watch(
  () => focusRunStore.status,
  async (newStatus) => {
    if (!newStatus && !isSpinning.value) {
      await toggleSpin();
    }
  },
);

const shouldAnimateHudBar = async () => {
  if (!focusRunStore.loaded) {
    await focusRunStore.load();
  }

  return !focusRunStore.isActiveFocusRun;
};

onMounted(async () => {
  if (
    !dottedRingOuter.value ||
    !dottedRingMiddle.value ||
    !dottedRingInner.value ||
    !dottedRingDashed.value ||
    !solidRing.value ||
    !outerHud.value ||
    !leftHudRing.value ||
    !rightHudRing.value
  )
    return;

  if (!focusRunStore.loaded) {
    await focusRunStore.load();
  }

  if (!missionsStore.loaded) {
    await missionsStore.load();
  }

  // Update isSpinning ref
  isSpinning.value = true;

  // Begin outer HUD animation
  const outerHudSequence: AnimationSequence = [
    [leftHudRing.value, { y: 80 }, { duration: 0 }],
    [rightHudRing.value, { y: -80 }, { at: 0, duration: 0 }],
    [leftHudRing.value, { y: 0 }, { at: 0 }],
    [rightHudRing.value, { y: 0 }, { at: 0 }],
    [leftHudRing.value, { opacity: [1, 0, 1, 0, 1, 0, 1] }, { duration: 0.3, times: [0.1, 0.2, 0.4, 0.6, 0.8, 0.9, 1], at: 0 }],
    [rightHudRing.value, { opacity: [1, 0, 1, 0, 1, 0, 1] }, { duration: 0.3, times: [0.1, 0.2, 0.4, 0.6, 0.8, 0.9, 1], at: 0 }],
    [outerHud.value, { rotate: 210 }, { duration: 1, ease: 'anticipate' }],
    [outerHud.value, { rotate: -120 }, { duration: 1, ease: 'easeInOut' }],
    [outerHud.value, { rotate: 90 }, { duration: 3, ease: 'easeInOut' }],
  ];

  const innerHudSequence: AnimationSequence = [
    [
      dottedRingOuter.value,
      { scale: 1, opacity: 1, rotate: 90 },
      { delay: 0.08, rotate: { duration: 5 }, ease: 'circIn', at: 0, duration: 0.3 },
    ],
    [
      dottedRingMiddle.value,
      { scale: 1, opacity: 1, rotate: -90 },
      { delay: 0.16, rotate: { duration: 5 }, ease: 'circIn', at: 0, duration: 0.3 },
    ],
    [
      dottedRingInner.value,
      { scale: 1, opacity: 1, rotate: 90 },
      { delay: 0.24, rotate: { duration: 5 }, ease: 'circIn', at: 0, duration: 0.3 },
    ],
    [
      dottedRingDashed.value,
      { scale: 1, opacity: 1, rotate: -45 },
      { delay: 0.24, rotate: { duration: 5 }, ease: 'circInOut', at: 0, duration: 0.3 },
    ],
    [solidRing.value, { scale: 1, opacity: 0.4 }, { delay: 0.24, ease: 'circInOut', at: 0, duration: 0.3 }],
  ];

  if (focusRunStore.status === null) {
    animate(outerHudSequence);
    animate(innerHudSequence);
  } else {
    dottedRingOuter.value.style.transform = 'scale(1)';
    dottedRingMiddle.value.style.transform = 'scale(1)';
    dottedRingInner.value.style.transform = 'scale(1)';
    dottedRingDashed.value.style.transform = 'scale(1)';
    solidRing.value.style.transform = 'scale(1)';

    dottedRingOuter.value.style.opacity = '1';
    dottedRingMiddle.value.style.opacity = '1';
    dottedRingInner.value.style.opacity = '1';
    dottedRingDashed.value.style.opacity = '1';
    solidRing.value.style.opacity = '0.4';

    leftHudRing.value.style.opacity = '1';
    rightHudRing.value.style.opacity = '1';

    if (focusRunStore.status === 'running') {
      return await toggleSpin(true);
    } else {
      animate(outerHud.value, { rotate: 270 }, { duration: 2, ease: 'backInOut' });
    }
  }
});
</script>

<template>
  <div class="flex flex-col flex-1 min-h-0 p-4 overflow-hidden">
    <div class="relative flex w-full flex-1 flex-col gap-10">
      <!-- MAIN -->
      <div class="flex h-3/5 justify-center relative w-full mt-4">
        <div class="flex flex-col justify-center gap-y-10 w-60">
          <div class="font-tomorrow text-xs" v-if="missionsStore.activeMission">
            <h3 class="text-primary mb-2 uppercase">Mission Objective:</h3>
            <p class="line-clamp-4">{{ missionsStore.activeMission.title }}</p>
          </div>
          <div class="font-tomorrow text-xs">
            <h3 class="text-primary mb-2 uppercase">Mission Progress:</h3>
            <ProgressBar :progress="0.62"></ProgressBar>
            <h4 class="text-4xl mt-4 text-primary">62%</h4>
          </div>
          <div class="font-tomorrow text-xs">
            <h3 class="text-primary mb-2 uppercase">Mission Details:</h3>
            <div class="flex gap-1">
              <div class="w-2 bg-primary"></div>
              <div>
                <div class="border border-primary p-2 uppercase flex gap-10 items-center">
                  <h3 class="flex-1">Total Time Worked:</h3>
                  <h4>1h 20m</h4>
                </div>
                <div class="flex items-center uppercase mt-1">
                  <div>
                    <h3 class="text-3xs">Sessions Done:</h3>
                    <p>3</p>
                  </div>
                  <div class="h-4 mx-2 border-[0.5px] border-surface-auxilary"></div>
                  <div>
                    <h3 class="text-3xs">Sessions Left:</h3>
                    <p>4</p>
                  </div>
                  <div class="h-4 mx-2 border-[0.5px] border-surface-auxilary"></div>
                  <div>
                    <h3 class="text-3xs">Sessions DONE:</h3>
                    <p>3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <!-- OUTER HUD -->
        <div class="absolute-center rounded-full h-[110%] aspect-square" ref="outerHud">
          <svg viewBox="0 0 500 520" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
            <g>
              <g ref="leftHudRing">
                <path
                  d="M59.638 100.267C78.2524 78.0835 100.601 59.3242 125.675 44.836"
                  stroke-width="3"
                  class="stroke-primary"
                />
                <path
                  d="M374.25 44.7927C399.329 59.2721 421.684 78.0236 440.306 100.201"
                  stroke-width="3"
                  class="stroke-primary"
                />
                <path
                  d="M144.979 34.7825C177.654 19.5459 213.253 11.6016 249.306 11.501C285.359 11.4003 321.002 19.1457 353.761 34.1995"
                  class="stroke-primary"
                  stroke-width="3"
                />
              </g>
              <g ref="rightHudRing">
                <path
                  d="M59.638 419.733C78.2524 441.916 100.601 460.676 125.675 475.164"
                  stroke-width="3"
                  class="stroke-primary"
                />
                <path
                  d="M374.25 475.207C399.329 460.728 421.684 441.976 440.306 419.799"
                  stroke-width="3"
                  class="stroke-primary"
                />
                <path
                  d="M144.979 485.218C177.654 500.454 213.253 508.398 249.306 508.499C285.359 508.6 321.002 500.854 353.761 485.8"
                  class="stroke-primary"
                  stroke-width="3"
                />
              </g>
            </g>
          </svg>
        </div>

        <motion.div
          class="w-1/4 aspect-square rounded-full arc-md-225 absolute-center"
          :initial="{ rotate: 100 }"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 4 }"
        ></motion.div>
        <motion.div
          class="w-1/4 aspect-square rounded-full arc-md-100 absolute-center"
          :initial="{ rotate: -100 }"
          :animate="{ rotate: -360 }"
          :transition="{ duration: 4 }"
        ></motion.div>

        <!-- INNER HUD -->
        <div class="absolute-center w-full">
          <div
            ref="dottedRingOuter"
            class="absolute-center w-[calc(1/5*100%+12px)] aspect-square border-2 border-primary/50 rounded-full border-dotted glow opacity-0"
            style="transform: scale(0.8)"
          ></div>
          <div
            ref="dottedRingMiddle"
            class="absolute-center w-[calc(1/5*100%+20px)] aspect-square rounded-full border-2 border-primary/50 border-dotted opacity-0"
            style="transform: scale(0.8)"
          ></div>
          <div
            ref="dottedRingInner"
            class="absolute-center w-[calc(1/5*100%+26px)] aspect-square rounded-full border-2 border-primary/50 border-dotted opacity-0"
            style="transform: scale(0.8)"
          ></div>
          <div
            ref="dottedRingDashed"
            class="absolute-center w-1/5 aspect-square rounded-full border-2 border-primary/75 border-dashed rotate-10 opacity-0"
            style="transform: scale(1.96)"
          ></div>
          <div
            class="absolute-center w-1/6 aspect-square rounded-full border border-primary opacity-0"
            style="transform: scale(1.96)"
            ref="solidRing"
          ></div>
        </div>

        <!-- START, PAUSE, AND RESUME BUTTON -->
        <div class="z-100 w-1/6 aspect-square absolute-center">
          <motion.div
            class="font-tomorrow text-primary glow cursor-pointer w-full aspect-square rounded-full text-lg text-center"
            @click="handleStartOrPause"
          >
            <div
              class="w-full h-full inset-shadow-[0px_0px_40px_10px] hover:inset-shadow-primary/10 inset-shadow-transparent duration-500 group active:inset-shadow-primary/5 rounded-full flex-center p-4 gap-y-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  :initial="{ y: 20, opacity: 0 }"
                  :animate="{ y: 0, opacity: 1 }"
                  :exit="{ y: -20, opacity: 0 }"
                  v-if="!focusRunStore.status || ['completed', 'abandoned'].includes(focusRunStore.status)"
                >
                  <span class="uppercase">Start Focus Run </span>
                </motion.div>

                <motion.div
                  :initial="{ y: 20, opacity: 0 }"
                  :animate="{ y: 0, opacity: 1 }"
                  :exit="{ y: -20, opacity: 0 }"
                  v-if="['running', 'paused'].includes(focusRunStore.status as string)"
                  class="flex-center flex-col gap-y-2"
                >
                  <span> {{ remainingMsParsed }} REMAINING </span>
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        v-if="focusRunStore.status === 'running'"
                        class="uppercase text-xs"
                        :initial="{ x: -20, opacity: 0 }"
                        :animate="{ x: 0, opacity: 1 }"
                        :exit="{ x: 20, opacity: 0 }"
                        >Running</motion.div
                      >
                      <motion.div
                        v-if="focusRunStore.status === 'paused'"
                        class="uppercase text-xs"
                        :initial="{ x: -20, opacity: 0 }"
                        :animate="{ x: 0, opacity: 1 }"
                        :exit="{ x: 20, opacity: 0 }"
                        >Paused</motion.div
                      >
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div class="flex flex-col items-end justify-center ml-auto gap-y-4 min-w-60">
          <motion.div
            :initial="{ x: 20, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.3, delay: 0 }"
            class="bg-white/2 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary cut-corners rounded-xl font-tomorrow uppercase w-full"
          >
            <h3 class="text-4xl mb-4">3</h3>
            <h4 class="text-xs text-primary">Sessions Worked Today</h4>
          </motion.div>
          <motion.div
            :initial="{ x: 20, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.3, delay: 0.08 }"
            class="bg-white/2 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary cut-corners rounded-xl font-tomorrow uppercase w-full"
          >
            <h3 class="text-4xl mb-4">13</h3>
            <h4 class="text-xs text-primary">Mid-run Pauses Today</h4>
          </motion.div>
          <motion.div
            :initial="{ x: 20, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.3, delay: 0.16 }"
            class="bg-white/2 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary cut-corners rounded-xl font-tomorrow uppercase w-full"
          >
            <h3 class="text-4xl mb-4">3h 40m</h3>
            <h4 class="text-xs text-primary">In Focus Runs</h4>
          </motion.div>
        </div>
      </div>

      <div class="flex h-2/5 w-full">
        <div class="w-full h-full flex mx-auto">
          <HudBar class="w-full" :useInitialAnimation="shouldAnimateHudBar"></HudBar>
        </div>
      </div>
    </div>
  </div>
</template>
