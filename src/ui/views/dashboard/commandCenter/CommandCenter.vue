<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMissionsStore } from '../../../stores/missions';
import ProgressBar from '../../../components/misc/ProgressBar.vue';
import FocusBar from '../../../components/focusRuns/FocusBar.vue';
import Heatmap from '../../../components/misc/Heatmap.vue';
import { useStreakStore } from '../../../stores/streak';
import { useFocusRunStore } from '../../../stores/focusRuns';
import parseMilliseconds from 'parse-ms';

const missionsStore = useMissionsStore();
const focusRunStore = useFocusRunStore();
const streakStore = useStreakStore();
const heatmapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!heatmapContainer.value) return;
  missionsStore.load();

  const heatmap = heatmapContainer.value.children[0]!;
  heatmapContainer.value.scrollLeft = heatmap.scrollWidth - heatmapContainer.value.clientWidth;
});

const percentageFormatter = new Intl.NumberFormat(undefined, {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const getMissionProgress = computed(() => {
  if (!missionsStore.activeMission?.targetSessions) return null;

  const prog = missionsStore.activeMission.completedSessions / missionsStore.activeMission.targetSessions;

  return {
    raw: prog > 1 ? 1 : prog,
    formatted: percentageFormatter.format(prog > 1 ? 1 : prog),
  };
});

const getTimeFromSeconds = (seconds: number) => {
  const parsed = parseMilliseconds(seconds * 1000);
  return `${parsed.hours}h ${parsed.minutes}m`;
};
</script>

<template>
  <main class="p-4 grid grid-cols-12 grid-rows-2 size-full gap-4 text-sm">
    <div class="col-span-6 p-2 size-full flex-center">
      <div class="border border-surface-tertiary size-full rounded-3xl cut-corners flex flex-col">
        <div class="w-3/5 h-10 bg-surface-tertiary/35 mx-auto trapezoid-clip flex-center">
          <h1 class="font-tomorrow uppercase text-primary text-base text-center">Active Mission</h1>
        </div>

        <div class="w-full bg-linear-to-r from-transparent via-surface-auxilary to-transparent h-px mt-4"></div>
        <div v-if="missionsStore.activeMission" class="mt-4">
          <p class="line-clamp-2 px-10 text-center">{{ missionsStore.activeMission.title }}</p>

          <div class="flex gap-x-4 mt-8 px-10 text-xs text-left">
            <div class="w-1/3" v-if="missionsStore.activeMission.targetSessions">
              <h2 class="font-tomorrow uppercase text-primary">Target Sessions:</h2>
              <p class="text-sm mt-1">
                {{ missionsStore.activeMission.targetSessions }}
              </p>
            </div>
            <div class="w-1/3">
              <h2 class="font-tomorrow uppercase text-primary">Sessions Done:</h2>
              <p class="text-sm mt-1">{{ missionsStore.activeMission.completedSessions }}</p>
            </div>
            <div class="w-1/3" v-if="missionsStore.activeMission.targetSessions">
              <h2 class="font-tomorrow uppercase text-primary">Sessions Left:</h2>
              <p class="text-sm mt-1">
                {{
                  missionsStore.activeMission.targetSessions - missionsStore.activeMission.completedSessions < 0
                    ? 0
                    : missionsStore.activeMission.targetSessions - missionsStore.activeMission.completedSessions
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-auto px-10 mb-6 flex gap-x-4 items-end">
          <div class="w-3/5">
            <h2 class="mb-2 font-tomorrow uppercase text-primary text-sm flex gap-x-2">
              <span>Mission Progress: </span
              ><span class="text-secondary">{{ getMissionProgress ? getMissionProgress.formatted : 'N/A' }}</span>
            </h2>
            <ProgressBar :progress="getMissionProgress ? getMissionProgress.raw : 1"></ProgressBar>
          </div>
          <div
            class="w-2/5 bg-surface-primary border border-primary rounded-md cut-corners px-4 py-1.5 text-center hover:bg-surface-secondary duration-150 cursor-pointer"
            @click="$router.push('/dashboard/focus-run')"
          >
            <span class="font-tomorrow uppercase text-xs">Start Run</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-6 p-2 size-full flex-center">
      <div class="size-full grid grid-cols-2 gap-4">
        <div
          class="background-edge-spin relative border cut-corners rounded-xl border-surface-tertiary bg-white/2 backdrop-blur-[2px] hover:scale-102 duration-150"
        >
          <div class="uppercase font-tomorrow p-4 flex flex-col h-full">
            <h2 class="text-2xl flex-1">{{ focusRunStore.totalRunsCompletedToday }}</h2>
            <p class="text-primary text-xs">Focus Runs Today</p>
          </div>
        </div>
        <div
          class="background-edge-spin relative border cut-corners rounded-xl border-surface-tertiary bg-white/2 backdrop-blur-[2px] hover:scale-102 duration-150"
        >
          <div class="uppercase font-tomorrow p-4 flex flex-col h-full">
            <h2 class="text-2xl flex-1">{{ focusRunStore.totalMidRunPausesToday }}</h2>
            <p class="text-primary text-xs">Mid-Run Pauses Today</p>
          </div>
        </div>
        <div
          class="col-span-2 background-edge-spin relative border cut-corners rounded-xl border-surface-tertiary bg-white/2 backdrop-blur-[2px] hover:scale-102 duration-150"
        >
          <div class="uppercase font-tomorrow p-4 text-center flex flex-col h-full">
            <h2 class="text-2xl flex-1">{{ getTimeFromSeconds(focusRunStore.totalSecondsWorkedToday) }}</h2>
            <p class="text-primary text-xs">Worked Today</p>
          </div>
        </div>
        <div
          class="col-span-2 background-edge-spin relative border cut-corners rounded-xl border-surface-tertiary bg-white/2 backdrop-blur-[2px] hover:scale-102 duration-150"
        >
          <div class="uppercase font-tomorrow p-4 text-center flex flex-col h-full">
            <h2 class="text-2xl flex-1">0h 0m</h2>
            <p class="text-primary text-xs">Paused Today</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-4 p-2 size-full flex-center">
      <div class="border border-surface-tertiary size-full rounded-3xl cut-corners flex flex-col relative">
        <div class="w-3/5 min-h-10 bg-surface-tertiary/35 mx-auto trapezoid-clip flex-center">
          <h1 class="font-tomorrow uppercase text-primary text-base text-center">Focus Bar</h1>
        </div>

        <div class="w-full bg-linear-to-r from-transparent via-surface-auxilary to-transparent h-px mt-4"></div>

        <div class="w-3/5 absolute-center mb-4">
          <FocusBar></FocusBar>
        </div>
        <h2 class="font-tomorrow uppercase text-primary px-10 text-center mt-auto mb-6">Status: Functional</h2>
        <!-- <div class="mt-auto flex gap-x-10 px-10 mb-6 font-tomorrow uppercase text-xs">
          <div class="w-1/2">
            <h2 class="text-primary">Status:</h2>
            <p class="mt-1">Empty</p>
          </div>
          <div class="w-1/2">
            <h2 class="text-primary">Leakage Time:</h2>
            <p class="mt-1">28m</p>
          </div>
        </div> -->
      </div>
    </div>
    <div class="col-span-8 p-2 size-full flex-center">
      <div class="border border-surface-tertiary size-full rounded-3xl cut-corners flex flex-col h-full">
        <div class="w-3/5 min-h-10 bg-surface-tertiary/35 mx-auto trapezoid-clip flex-center">
          <h1 class="font-tomorrow uppercase text-primary text-base text-center">Your Streak</h1>
        </div>
        <div class="w-full bg-linear-to-r from-transparent via-surface-auxilary to-transparent h-px my-4"></div>

        <div class="flex gap-4 w-full px-10">
          <div class="w-1/2">
            <h2 class="text-primary font-tomorrow uppercase text-xs">Total Focus Runs In The Last Year:</h2>
            <p class="mt-1">{{ streakStore.totalFocusRunsThisYear }}</p>
          </div>
          <div class="w-1/4">
            <h2 class="text-primary font-tomorrow uppercase text-xs">Longest Streak:</h2>
            <p class="mt-1">{{ streakStore.longestStreakCount }}</p>
          </div>
          <div class="w-1/4">
            <h2 class="text-primary font-tomorrow uppercase text-xs">Current Streak:</h2>
            <p class="mt-1">{{ streakStore.currentStreakCount }}</p>
          </div>
        </div>
        <div class="mt-4 px-6 relative">
          <div class="absolute left-4 top-0 h-full w-4 bg-linear-to-r from-surface-secondary to-transparent z-1000"></div>
          <div class="overflow-x-scroll h-min overflow-y-hidden" ref="heatmapContainer">
            <Heatmap class="mx-auto"></Heatmap>
          </div>
        </div>
        <div class="flex px-10 mt-2 xxl:mt-4 items-center">
          <div class="flex-1 flex items-end">
            <h2 class="text-primary underline underline-offset-2 decoration-dotted font-tomorrow uppercase text-xs">
              See Color Thresholds
            </h2>
            <span class="ml-2 uppercase text-2xs font-tomorrow text-surface-auxilary">(Coming Soon)</span>
          </div>
          <div class="flex items-center gap-x-2 uppercase font-tomorrow text-xs">
            <span>Less</span>
            <div class="flex items-center gap-x-0.5">
              <div class="w-3 h-3 bg-surface-tertiary cut-corners rounded-xs"></div>
              <div class="w-3 h-3 bg-primary/20 cut-corners rounded-xs"></div>
              <div class="w-3 h-3 bg-primary/50 cut-corners rounded-xs"></div>
              <div class="w-3 h-3 bg-primary cut-corners rounded-xs"></div>
              <div class="w-3 h-3 bg-auxilary cut-corners rounded-xs"></div>
              <div class="w-3 h-3 bg-tertiary cut-corners rounded-xs"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
