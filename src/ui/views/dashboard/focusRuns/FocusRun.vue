<script setup lang="ts">
import { animate, motion, type AnimationSequence } from 'motion-v';
import Star from '../../../components/icons/Star.vue';
import { onMounted, ref } from 'vue';
import { useMissionsStore } from '../../../stores/missions';
import HighPriority from '../../../components/icons/HighPriority.vue';
import Type from '../../../components/icons/Type.vue';
import Time from '../../../components/icons/Time.vue';
import Progress from '../../../components/icons/Progress.vue';
import Target from '../../../components/icons/Target.vue';
import { useFocusRunStore } from '../../../stores/stores';

const missionsStore = useMissionsStore();
const focusRunStore = useFocusRunStore();

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

const toggleSpin = async () => {
  if (!outerHud.value) return;
  if (isSpinning.value) {
    isSpinning.value = !isSpinning.value;

    // Redo spin animation
    await animate(
      outerHud.value,
      { rotate: -270 },
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

onMounted(async () => {
  if (focusRunStore.isActiveFocusRun || !focusRunStore.loaded) {
    if (!missionsStore.loaded) {
      missionsStore.load();
    }
    focusRunStore.updateFocusRun();
  }

  // Update isSpinning ref
  isSpinning.value = true;

  // Begin outer HUD animation
  const outerHudSequence: AnimationSequence = [
    [leftHudRing.value, { y: -80 }],
    [rightHudRing.value, { y: 80 }, { at: 0 }],
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
    [
      solidRing.value,
      { scale: 1, opacity: 0.4, rotate: -45 },
      { delay: 0.24, rotate: { duration: 5 }, ease: 'circInOut', at: 0, duration: 0.3 },
    ],
  ];

  animate(outerHudSequence);
  animate(innerHudSequence);
});
</script>

<template>
  <div class="flex flex-col flex-1 min-h-0 p-8 overflow-hidden">
    <div class="relative flex w-full items-center justify-center flex-1">
      <!-- LEFT MISSION DETAILS -->
      <div class="absolute w-1/4 left-4 top-4 flex flex-col gap-4 h-full pb-8">
        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-full cut-corners rounded-xl mb-auto cursor-pointer"
          v-if="!missionsStore.activeMission"
          @click="$router.push('/dashboard/missions')"
        >
          <div class="flex gap-x-2 justify-center items-center z-10 relative">
            <h3 class="font-tomorrow uppercase text-xs text-primary text-center">Choose An Active Mission</h3>
          </div>
        </div>
        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-full cut-corners rounded-xl mb-auto"
          v-if="missionsStore.activeMission"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <Star class="fill-primary w-3 h-3"></Star>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Mission Objective:</h3>
          </div>
          <p class="line-clamp-3 text-xs cursor-text z-10 relative">{{ missionsStore.activeMission.title }}</p>
        </div>

        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-4/5 cut-corners rounded-xl"
          v-if="missionsStore.activeMission"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <HighPriority class="fill-primary w-4 h-4"></HighPriority>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Priority:</h3>
          </div>
          <p class="line-clamp-3 text-xs cursor-text z-10 relative uppercase">
            {{ getPriority(missionsStore.activeMission.priority) }}
          </p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-4/5 cut-corners rounded-xl"
          v-if="missionsStore.activeMission"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <Type class="fill-primary w-4 h-4"></Type>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Scale:</h3>
          </div>
          <p class="line-clamp-3 text-xs cursor-text z-10 relative uppercase">
            {{ missionsStore.activeMission.scale }}
          </p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-4/5 cut-corners rounded-xl"
          v-if="missionsStore.activeMission"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <Time class="fill-primary w-4 h-4"></Time>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Estimated Minutes:</h3>
          </div>
          <p class="line-clamp-3 text-xs cursor-text z-10 relative uppercase">
            {{ missionsStore.activeMission.estimatedMinutes }}m
          </p>
        </div>
      </div>

      <!-- RIGHT MISSION DETAILS -->
      <div class="absolute w-1/4 right-4 top-4 flex flex-col items-end gap-4 h-full pb-8">
        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-full cut-corners rounded-xl mb-auto"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <Progress class="stroke-primary w-3 h-3"></Progress>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Progress: <span class="text-secondary">50%</span></h3>
          </div>
          <div
            class="relative h-2 w-full rounded-xs cut-corners border border-primary bg-[repeating-linear-gradient(315deg,var(--color-primary)_0,var(--color-primary)_1px,transparent_1px,transparent_50%)] bg-size-[10px_10px]"
          >
            <div class="absolute h-full bg-primary w-1/2"></div>
          </div>
        </div>

        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-4/5 cut-corners rounded-xl"
          v-if="missionsStore.activeMission"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <Target class="stroke-primary w-4 h-4"></Target>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Target Sessions:</h3>
          </div>
          <p class="line-clamp-3 text-xs cursor-text z-10 relative uppercase">
            {{ missionsStore.activeMission.targetSessions }} sessions
          </p>
        </div>
        <!-- <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-4/5 cut-corners rounded-xl"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <HighPriority class="fill-primary w-4 h-4"></HighPriority>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Scale:</h3>
          </div>
          <p class="line-clamp-3 text-xs cursor-text z-10 relative uppercase">
            {{ missionsStore.activeMission?.scale }}
          </p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-[2px] background-edge-spin p-4 border border-surface-tertiary w-4/5 cut-corners rounded-xl"
        >
          <div class="flex gap-x-2 items-center mb-2 z-10 relative">
            <HighPriority class="fill-primary w-4 h-4"></HighPriority>
            <h3 class="font-tomorrow uppercase text-xs text-primary">Estimated Minutes:</h3>
          </div>
          <p class="line-clamp-3 text-xs cursor-text z-10 relative uppercase">
            {{ missionsStore.activeMission?.estimatedMinutes }}m
          </p>
        </div> -->
      </div>

      <!-- OUTER HUD -->
      <div class="absolute-center rounded-full w-9/20 aspect-square" ref="outerHud">
        <div class="w-full h-full absolute -translate-y-20 opacity-0" ref="rightHudRing">
          <div class="absolute w-full h-full arc-sm-130 rounded-full"></div>
          <div class="absolute w-full h-full arc-lg-155 rounded-full"></div>
          <div class="absolute w-full h-full arc-sm-210 rounded-full"></div>
        </div>
        <div class="w-full h-full absolute translate-y-20 opacity-0" ref="leftHudRing">
          <div class="absolute w-full h-full arc-sm-310 rounded-full"></div>
          <div class="absolute w-full h-full arc-lg-335 rounded-full"></div>
          <div class="absolute w-full h-full arc-sm-30 rounded-full"></div>
        </div>
      </div>

      <motion.div
        class="absolute-center w-3/10 aspect-square rounded-full arc-md-225"
        :initial="{ rotate: 100 }"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 4 }"
      ></motion.div>
      <motion.div
        class="absolute-center w-3/10 aspect-square rounded-full arc-md-100"
        :initial="{ rotate: -100 }"
        :animate="{ rotate: -360 }"
        :transition="{ duration: 4 }"
      ></motion.div>

      <!-- INNER HUD -->
      <div class="absolute-center flex-center w-full">
        <div
          ref="dottedRingOuter"
          class="absolute-center w-[calc(1/4*100%+12px)] aspect-square border-2 border-primary/50 rounded-full border-dotted glow opacity-0"
          style="transform: scale(0.8)"
        ></div>
        <div
          ref="dottedRingMiddle"
          class="absolute-center w-[calc(1/4*100%+20px)] aspect-square rounded-full border-2 border-primary/50 border-dotted opacity-0"
          style="transform: scale(0.8)"
        ></div>
        <div
          ref="dottedRingInner"
          class="absolute-center w-[calc(1/4*100%+26px)] aspect-square rounded-full border-2 border-primary/50 border-dotted opacity-0"
          style="transform: scale(0.8)"
        ></div>
        <div
          ref="dottedRingDashed"
          class="absolute-center w-1/4 aspect-square rounded-full border-2 border-primary/75 border-dashed rotate-10 opacity-0"
          style="transform: scale(1.96)"
        ></div>
        <div
          class="absolute-center w-1/5 aspect-square rounded-full border border-primary"
          style="transform: scale(1.96)"
          ref="solidRing"
        ></div>
      </div>

      <!-- MAIN -->
      <div class="flex-center relative z-100 w-1/5 aspect-square">
        <motion.div
          :initial="{ y: 10, opacity: 0 }"
          :animate="{ y: 0, opacity: 1, transition: { duration: 1.4, delay: 1 } }"
          class="font-tomorrow uppercase text-primary glow cursor-pointer w-full aspect-square rounded-full text-lg text-center"
          @click="toggleSpin"
        >
          <div
            class="w-full h-full inset-shadow-[0px_0px_40px_10px] hover:inset-shadow-primary/10 inset-shadow-transparent duration-500 group active:inset-shadow-primary/5 rounded-full flex-center"
          >
            Start Focus Run
          </div>
        </motion.div>
      </div>
    </div>
  </div>
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
