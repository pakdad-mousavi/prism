<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import FocusCell from './FocusCell.vue';
import { useFocusStreakStore } from '../../stores/focusStreak';
import { useFocusRunStore } from '../../stores/focusRuns';

const focusRunStore = useFocusRunStore();
const focusStreakStore = useFocusStreakStore();

onMounted(async () => {
  if (!focusStreakStore.loaded) {
    await focusStreakStore.syncWithMain();
    focusStreakStore.loaded = true;
  }
});

const statuses = computed(() => {
  const barsFilled = focusStreakStore.barsFilled;
  const stage = focusStreakStore.decayStage;

  const statuses = ['static', 'static', 'static', 'static', 'static', 'static'] as [
    'static' | 'dripping',
    'static' | 'dripping',
    'static' | 'dripping',
    'static' | 'dripping',
    'static' | 'dripping',
    'static' | 'dripping',
  ];

  switch (stage) {
    case 'idle':
      break;

    case 'multi':
      for (let i = 1; i < barsFilled; i++) {
        statuses[i] = 'dripping';
      }
      break;
    case 'final':
      statuses[0] = 'dripping';
      break;
  }

  return statuses;
});

const progressions = computed(() => {
  const barsFilled = focusStreakStore.barsFilled;
  const stage = focusStreakStore.decayStage;
  const decay = focusStreakStore.decayProgress;
  const runProgress = focusRunStore.progress;

  const arr = [0, 0, 0, 0, 0, 0] as number[];

  // IDLE / RUNNING STATE
  if (stage === 'idle') {
    for (let i = 0; i < barsFilled; i++) {
      arr[i] = 1;
    }

    if (barsFilled < arr.length) {
      arr[barsFilled] = runProgress;
    }

    return arr;
  }

  // DECAY STATE
  const safeDecay = decay ?? 0;

  // Are there multiple cells decaying?
  if (stage === 'multi') {
    for (let i = 1; i < barsFilled; i++) {
      arr[i] = safeDecay;
    }

    arr[0] = 1;
  }

  // Is it only one cell thats decaying?
  if (stage === 'final') {
    arr[0] = safeDecay;
  }

  return arr;
});
</script>

<template>
  <div class="aspect-3/1 p-px rounded-md bg-linear-to-r from-auxilary via-primary to-quaternary from-20% via-40% to-80%">
    <div class="flex gap-x-2 w-full h-full p-1.5 rounded-md bg-black relative">
      <!-- BLURS -->
      <div class="absolute w-1/3 h-full rounded-md top-0 bg-auxilary/80 blur-xl left-0"></div>
      <div class="absolute w-1/3 h-full rounded-md top-0 bg-primary/80 blur-xl left-1/3"></div>
      <div class="absolute w-1/3 h-full rounded-md top-0 bg-quaternary/80 blur-xl left-2/3"></div>

      <!-- BARS -->
      <FocusCell
        v-for="(p, i) in progressions"
        :key="i"
        :status="statuses[i]!"
        :progress="p"
        :colorClass="i < 2 ? 'bg-auxilary' : i < 4 ? 'bg-primary' : 'bg-quaternary'"
      />
    </div>
  </div>
</template>
