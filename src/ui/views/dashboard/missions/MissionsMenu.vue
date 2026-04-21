<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { useMissionsStore } from '../../../stores/missions';
import type { Mission } from '../../../../shared/types/mission';
import { onMounted, toRaw } from 'vue';

import Target from '../../../components/icons/Target.vue';
import Trash from '../../../components/icons/Trash.vue';
import Check from '../../../components/icons/Check.vue';
import Bolt from '../../../components/icons/Bolt.vue';
import Exit from '../../../components/icons/Exit.vue';
import { useFocusRunStore } from '../../../stores/focusRuns';

const missionsStore = useMissionsStore();
const focusRunStore = useFocusRunStore();

const deleteSelectedMissions = async () => {
  const missionIds: (number | undefined)[] = [];
  for (const missionId of missionsStore.selectedMissions) {
    await window.electronApi.deleteMission(missionId);
    missionIds.push(missionId);
  }

  if (missionIds.includes(missionsStore.activeMission?.id)) {
    missionsStore.setActiveMissionId(null);
  }

  missionsStore.selectedMissions.length = 0;
  missionsStore.loadMissions();
};

const markAllAsCompleted = async () => {
  for (const missionId of missionsStore.selectedMissions) {
    const mission = toRaw(missionsStore.missions.find((m) => m.id === missionId) as Mission);
    mission.status = 'completed';
    await window.electronApi.updateMission(mission);

    if (missionsStore.activeMission?.id === missionId) {
      missionsStore.setActiveMissionId(null);
    }
  }

  missionsStore.selectedMissions.length = 0;
  missionsStore.loadMissions();
};

onMounted(async () => {
  if (!focusRunStore.loaded) {
    focusRunStore.load();
  }
});
</script>

<template>
  <menu class="bg-surface-secondary flex items-center text-xs font-tomorrow px-4 gap-x-4">
    <AnimatePresence mode="wait">
      <motion.div class="flex items-center gap-x-4 w-full" v-if="missionsStore.selectedMissions.length > 0">
        <motion.div
          :initial="{ opacity: 0, x: -5 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -5 }"
          :transition="{ delay: 0 }"
          class="flex-1"
        >
          <button class="menu-button" @click="missionsStore.selectedMissions.length = 0">
            <Target class="w-4 h-4 stroke-[1.5px] stroke-secondary"></Target>
            <span class="uppercase">Unselect All ({{ missionsStore.selectedMissions.length }})</span>
          </button>
        </motion.div>
        <motion.div
          :initial="{ opacity: 0, x: -5 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -5 }"
          :transition="{ delay: 0.08 }"
        >
          <button class="menu-button" @click="deleteSelectedMissions">
            <Trash class="w-4 h-4 stroke-[1.5px]"></Trash>
            <span class="uppercase">Delete all</span>
          </button>
        </motion.div>
        <motion.div
          :initial="{ opacity: 0, x: -5 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -5 }"
          :transition="{ delay: 0.16 }"
        >
          <button class="menu-button" @click="markAllAsCompleted">
            <Check class="w-4 h-4 stroke-2"></Check>
            <span class="uppercase">Mark all as completed</span>
          </button>
        </motion.div>
      </motion.div>
      <motion.div class="flex items-center gap-x-4 w-full" v-else>
        <motion.div
          :initial="{ opacity: 0, x: -5 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -5 }"
          :transition="{ delay: 0 }"
          :title="focusRunStore.isActiveFocusRun ? 'Unavailable During Focus Run' : ''"
        >
          <button
            class="menu-button"
            @click="missionsStore.isSelectActiveMissionMode = !missionsStore.isSelectActiveMissionMode"
            v-if="missionsStore.isSelectActiveMissionMode"
          >
            <Exit class="w-4 h-4 stroke-2 stroke-secondary -scale-x-100"></Exit>
            <span class="uppercase">Exit Select Mode</span>
          </button>
          <button
            class="menu-button"
            :class="{ 'opacity-50 pointer-events-none': focusRunStore.isActiveFocusRun }"
            @click="missionsStore.isSelectActiveMissionMode = !missionsStore.isSelectActiveMissionMode"
            v-else
          >
            <Bolt class="w-4 h-4 stroke-[1.5px] stroke-secondary"></Bolt>
            <span class="uppercase">Select Focus Run Mission</span>
          </button>
        </motion.div>
        <motion.div
          :initial="{ opacity: 0, x: -5 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -5 }"
          :transition="{ delay: 0.08 }"
          v-if="missionsStore.activeMission"
          :title="focusRunStore.isActiveFocusRun ? 'Unavailable During Focus Run' : ''"
        >
          <button
            class="menu-button"
            @click="missionsStore.setActiveMissionId(null)"
            :class="{ 'opacity-50 pointer-events-none': focusRunStore.isActiveFocusRun }"
          >
            <Trash class="w-4 h-4 stroke-[1.5px] stroke-secondary"></Trash>
            <span class="uppercase">Unselect Focus Run Mission</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </menu>
</template>
