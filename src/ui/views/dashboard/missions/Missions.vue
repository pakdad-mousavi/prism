<script setup lang="ts">
import { onMounted } from 'vue';

// ICONS
import Compass from '../../../components/icons/Compass.vue';
import HighPriority from '../../../components/icons/HighPriority.vue';
import Type from '../../../components/icons/Type.vue';
import Time from '../../../components/icons/Time.vue';
import Target from '../../../components/icons/Target.vue';
import MissionRow from '../../../components/missions/MissionRow.vue';
import { type MissionDraft, type Mission as TMission } from '../../../../shared/types/mission.ts';
import { useMissionsStore } from '../../../stores/missions';

// ----------------
// MISSION HANDLING
// ----------------
const missionsStore = useMissionsStore();

const updateSelectedMission = (m: TMission | null) => {
  missionsStore.selectedMission = m;
};

const createDraftMission = (status: 'active' | 'on hold' | 'completed') => {
  missionsStore.missionDraft = {
    title: '',
    estimatedMinutes: null,
    targetSessions: null,
    status,
    priority: 2,
    scale: 'task',
    isAutoMission: false,
  };
};

const saveDraft = async (m: MissionDraft) => {
  console.log('XXX');
  await window.electronApi.createMission(m);
  missionsStore.missionDraft = null;
  missionsStore.loadMissions();
};

// Load mission store data
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
      <div class="flex gap-2 mb-2 text-xs">
        <div class="flex items-center gap-2 border rounded-md cut-corners border-primary py-1.5 px-4">
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span class="text-primary font-tomorrow">ACTIVE</span>
        </div>
        <div class="flex items-center justify-center py-1.5 px-2.5 border rounded-md cut-corners border-surface-tertiary">
          <span class="text-surface-auxilary font-tomorrow">3</span>
        </div>
      </div>

      <div class="w-full min-w-200 border rounded-md cut-corners border-surface-tertiary">
        <table class="w-full text-md text-left font-tomorrow">
          <thead>
            <tr>
              <th class="border-b border-surface-tertiary bg-surface-primary rounded-tl-md cut-corners"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary w-80 bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px" class="min-w-5"></Compass>
                  <span class="whitespace-nowrap">MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px" class="min-w-5 fill-secondary"></HighPriority>
                  <span class="whitespace-nowrap">PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px" class="min-w-5"></Type>
                  <span class="whitespace-nowrap">TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px" class="min-w-5"></Time>
                  <span class="whitespace-nowrap">EST. MINUTES</span>
                </div>
              </th>
              <th
                class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary bg-surface-primary rounded-tr-md cut-corners"
              >
                <div class="flex items-center gap-x-2">
                  <Target width="20px" class="min-w-5"></Target>
                  <span class="whitespace-nowrap">TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <MissionRow
              :isDraft="false"
              @click="updateSelectedMission(mission)"
              v-for="mission in missionsStore.activeMissions"
              :key="mission.id"
              :mission="mission"
              @refreshStore="missionsStore.loadMissions"
            ></MissionRow>
            <MissionRow
              :isDraft="true"
              v-if="missionsStore.missionDraft && missionsStore.missionDraft.status === 'active'"
              :mission="missionsStore.missionDraft"
              @saveDraft="saveDraft"
              @discardDraft="missionsStore.missionDraft = null"
            ></MissionRow>
            <tr>
              <td colspan="6" class="w-full text-center cursor-pointer" @click="createDraftMission('active')">
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
      <div class="flex gap-2 mb-2 text-xs">
        <div class="flex items-center gap-2 border rounded-md cut-corners border-auxilary py-1.5 px-4">
          <div class="w-2 h-2 rounded-full border border-auxilary animate-pulse"></div>
          <span class="text-auxilary font-tomorrow">ON HOLD</span>
        </div>
        <div class="flex items-center justify-center py-1.5 px-2.5 border rounded-md cut-corners border-surface-tertiary">
          <span class="text-surface-auxilary font-tomorrow">3</span>
        </div>
      </div>

      <div class="w-full min-w-200 border rounded-md cut-corners border-surface-tertiary">
        <table class="w-full text-md text-left font-tomorrow">
          <thead>
            <tr>
              <th class="border-b border-surface-tertiary bg-surface-primary rounded-tl-md cut-corners"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary w-80 bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px" class="min-w-5"></Compass>
                  <span class="whitespace-nowrap">MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px" class="min-w-5 fill-secondary"></HighPriority>
                  <span class="whitespace-nowrap">PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px" class="min-w-5"></Type>
                  <span class="whitespace-nowrap">TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px" class="min-w-5"></Time>
                  <span class="whitespace-nowrap">EST. MINUTES</span>
                </div>
              </th>
              <th
                class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary bg-surface-primary rounded-tr-md cut-corners"
              >
                <div class="flex items-center gap-x-2">
                  <Target width="20px" class="min-w-5"></Target>
                  <span class="whitespace-nowrap">TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <MissionRow
              :isDraft="false"
              @click="updateSelectedMission(mission)"
              v-for="mission in missionsStore.onHoldMissions"
              :key="mission.id"
              :mission="mission"
              @refreshStore="missionsStore.loadMissions"
            ></MissionRow>
            <MissionRow
              :isDraft="true"
              v-if="missionsStore.missionDraft && missionsStore.missionDraft.status === 'on hold'"
              :mission="missionsStore.missionDraft"
              @saveDraft="saveDraft"
              @discardDraft="missionsStore.missionDraft = null"
            ></MissionRow>
            <tr>
              <td colspan="6" class="w-full text-center cursor-pointer" @click="createDraftMission('on hold')">
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

    <!-- COMPLETED MISSIONS -->
    <section>
      <div class="flex gap-2 mb-2 text-xs">
        <div class="flex items-center border gap-2 rounded-md cut-corners border-surface-tertiary py-1.5 px-4">
          <div class="w-2 h-0.5 bg-surface-auxilary rounded-full animate-pulse"></div>
          <span class="text-surface-auxilary font-tomorrow">COMPLETED</span>
        </div>
        <div class="flex items-center justify-center py-1.5 px-2.5 border rounded-md cut-corners border-surface-tertiary">
          <span class="text-surface-auxilary font-tomorrow">3</span>
        </div>
      </div>

      <div class="w-full min-w-200 border rounded-md cut-corners border-surface-tertiary">
        <table class="w-full text-md text-left font-tomorrow">
          <thead>
            <tr>
              <th class="border-b border-surface-tertiary bg-surface-primary rounded-tl-md cut-corners"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary w-80 bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px" class="min-w-5"></Compass>
                  <span class="whitespace-nowrap">MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px" class="min-w-5 fill-secondary"></HighPriority>
                  <span class="whitespace-nowrap">PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px" class="min-w-5"></Type>
                  <span class="whitespace-nowrap">TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary bg-surface-primary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px" class="min-w-5"></Time>
                  <span class="whitespace-nowrap">EST. MINUTES</span>
                </div>
              </th>
              <th
                class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary bg-surface-primary rounded-tr-md cut-corners"
              >
                <div class="flex items-center gap-x-2">
                  <Target width="20px" class="min-w-5"></Target>
                  <span class="whitespace-nowrap">TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <MissionRow
              :isDraft="false"
              @click="updateSelectedMission(mission)"
              v-for="mission in missionsStore.completedMissions"
              :key="mission.id"
              :mission="mission"
              @refreshStore="missionsStore.loadMissions"
            ></MissionRow>
            <MissionRow
              :isDraft="true"
              v-if="missionsStore.missionDraft && missionsStore.missionDraft.status === 'completed'"
              :mission="missionsStore.missionDraft"
              @saveDraft="saveDraft"
              @discardDraft="missionsStore.missionDraft = null"
            ></MissionRow>
            <tr>
              <td colspan="6" class="w-full text-center cursor-pointer" @click="createDraftMission('completed')">
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
  </div>
</template>
