<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// import type { Mission as TMission } from '../../../../shared/types/mission';

// ICONS
import Compass from '../../../components/icons/Compass.vue';
import LowPriority from '../../../components/icons/LowPriority.vue';
import MediumPriority from '../../../components/icons/MediumPriority.vue';
import HighPriority from '../../../components/icons/HighPriority.vue';
import Type from '../../../components/icons/Type.vue';
import Time from '../../../components/icons/Time.vue';
import Target from '../../../components/icons/Target.vue';
import DottedCircle from '../../../components/icons/DottedCircle.vue';
import Mission from '../../../components/missions/Mission.vue';
import { useMissionsStore } from '../../../stores/missions';

const missionsStore = useMissionsStore();

const draggingId = ref<number | null>(null);

watch(missionsStore.activeMissions, (newMissions) => {
  console.log(newMissions.map((m) => m.id));
});

watch(missionsStore.onHoldMissions, (newMissions) => {
  console.log(newMissions);
});

watch(missionsStore.completedMissions, (newMissions) => {
  console.log(newMissions);
});

watch(draggingId, (id) => {
  console.log(id);
});

const priorities = [
  {
    label: 'low',
    iconColorClass: 'fill-surface-auxilary',
    containerColorClass: 'border-surface-auxilary text-surface-auxilary',
    IconComponent: LowPriority,
  },
  {
    label: 'medium',
    iconColorClass: 'fill-auxilary',
    containerColorClass: 'border-auxilary text-auxilary',
    IconComponent: MediumPriority,
  },
  {
    label: 'high',
    iconColorClass: 'fill-primary',
    containerColorClass: 'border-primary text-primary',
    IconComponent: HighPriority,
  },
  {
    label: 'no priority',
    iconColorClass: 'fill-surface-auxilary',
    containerColorClass: 'border-surface-auxilary text-surface-auxilary',
    IconComponent: DottedCircle,
  },
];

const getIdxFromPriority = (p: number | null) => {
  if (p === null) {
    return priorities[3] as (typeof priorities)[number];
  }
  return priorities[p] as (typeof priorities)[number];
};

onMounted(async () => {
  if (!missionsStore.loaded) {
    await missionsStore.loadMissions();
  }
});
</script>

<template>
  <div class="p-4 space-y-10">
    <!-- ACTIVE MISSIONS -->
    <section>
      <div class="flex gap-2 mb-2">
        <div class="flex items-center gap-4 border rounded-md cut-corners border-primary py-1.5 px-4">
          <div class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
          <span class="text-sm text-primary font-tomorrow">ACTIVE</span>
        </div>
        <div class="flex items-center justify-center py-1.5 px-3 border rounded-md cut-corners border-primary">
          <span class="text-sm text-primary font-tomorrow">3</span>
        </div>
      </div>

      <div class="w-full min-w-200 border rounded-md cut-corners border-surface-tertiary overflow-hidden">
        <table class="w-full text-md text-left font-tomorrow">
          <thead class="bg-surface-primary">
            <tr>
              <th class="border-b border-surface-tertiary"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary w-80">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px" class="min-w-5"></Compass>
                  <span class="whitespace-nowrap">MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px" class="min-w-5 fill-secondary"></HighPriority>
                  <span class="whitespace-nowrap">PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px" class="min-w-5"></Type>
                  <span class="whitespace-nowrap">TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px" class="min-w-5"></Time>
                  <span class="whitespace-nowrap">EST. MINUTES</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary">
                <div class="flex items-center gap-x-2">
                  <Target width="20px" class="min-w-5"></Target>
                  <span class="whitespace-nowrap">TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <Mission
              v-for="mission in missionsStore.activeMissions"
              :key="mission.id"
              :mission="mission"
              :getIdxFromPriority="getIdxFromPriority"
            ></Mission>
            <tr>
              <td colspan="6" class="w-full text-center cursor-pointer">
                <div
                  class="border border-surface-auxilary border-dashed cut-corners rounded-b-md w-full text-surface-auxilary duration-200 hover:bg-surface-primary"
                >
                  +
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ON HOLD MISSIONS -->
    <section>
      <div class="flex gap-2 mb-2">
        <div class="flex items-center gap-4 border rounded-md cut-corners border-auxilary py-1.5 px-4">
          <div class="w-2.5 h-2.5 rounded-full border border-auxilary"></div>
          <span class="text-sm text-auxilary font-tomorrow">ON HOLD</span>
        </div>
        <div class="flex items-center justify-center py-1.5 px-3 border rounded-md cut-corners border-auxilary">
          <span class="text-sm text-auxilary font-tomorrow">3</span>
        </div>
      </div>

      <div class="w-full min-w-200 border rounded-md cut-corners border-surface-tertiary overflow-hidden">
        <table class="w-full text-md text-left font-tomorrow">
          <thead class="bg-surface-primary">
            <tr>
              <th class="border-b border-surface-tertiary"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary w-80">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px" class="min-w-5"></Compass>
                  <span class="whitespace-nowrap">MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px" class="min-w-5 fill-secondary"></HighPriority>
                  <span class="whitespace-nowrap">PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px" class="min-w-5"></Type>
                  <span class="whitespace-nowrap">TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px" class="min-w-5"></Time>
                  <span class="whitespace-nowrap">EST. MINUTES</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary">
                <div class="flex items-center gap-x-2">
                  <Target width="20px" class="min-w-5"></Target>
                  <span class="whitespace-nowrap">TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <Mission
              v-for="mission in missionsStore.onHoldMissions"
              :key="mission.id"
              :mission="mission"
              :getIdxFromPriority="getIdxFromPriority"
            ></Mission>
            <tr>
              <td colspan="6" class="w-full text-center cursor-pointer">
                <div
                  class="border border-surface-auxilary border-dashed cut-corners rounded-b-md w-full text-surface-auxilary duration-100 hover:bg-surface-primary"
                >
                  +
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- COMPLETED MISSIONS -->
    <section>
      <div class="flex gap-2 mb-2">
        <div class="flex items-center gap-4 border rounded-md cut-corners border-surface-auxilary py-1.5 px-4">
          <div class="w-2.5 h-0.5 bg-surface-auxilary"></div>
          <span class="text-sm text-surface-auxilary font-tomorrow">COMPLETED</span>
        </div>
        <div class="flex items-center justify-center py-1.5 px-3 border rounded-md cut-corners border-surface-auxilary">
          <span class="text-sm text-surface-auxilary font-tomorrow">3</span>
        </div>
      </div>

      <div class="w-full min-w-200 border rounded-md cut-corners border-surface-tertiary overflow-hidden">
        <table class="w-full text-md text-left font-tomorrow">
          <thead class="bg-surface-primary">
            <tr>
              <th class="border-b border-surface-tertiary"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary w-80">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px" class="min-w-5"></Compass>
                  <span class="whitespace-nowrap">MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px" class="min-w-5 fill-secondary"></HighPriority>
                  <span class="whitespace-nowrap">PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px" class="min-w-5"></Type>
                  <span class="whitespace-nowrap">TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px" class="min-w-5"></Time>
                  <span class="whitespace-nowrap">EST. MINUTES</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary">
                <div class="flex items-center gap-x-2">
                  <Target width="20px" class="min-w-5"></Target>
                  <span class="whitespace-nowrap">TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <Mission
              v-for="mission in missionsStore.completedMissions"
              :key="mission.id"
              :mission="mission"
              :getIdxFromPriority="getIdxFromPriority"
            ></Mission>
            <tr>
              <td colspan="6" class="w-full text-center cursor-pointer">
                <div
                  class="border border-surface-auxilary border-dashed cut-corners rounded-b-md w-full text-surface-auxilary duration-100 hover:bg-surface-primary"
                >
                  +
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
