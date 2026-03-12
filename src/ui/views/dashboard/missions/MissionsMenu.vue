<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import Target from '../../../components/icons/Target.vue';
import { useMissionsStore } from '../../../stores/missions';
import Trash from '../../../components/icons/Trash.vue';
import Check from '../../../components/icons/Check.vue';
import type { Mission } from '../../../../shared/types/mission';
import { toRaw } from 'vue';

const missionsStore = useMissionsStore();

const containerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariant = {
  initial: {
    opacity: 0,
    x: -5,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -5,
  },
};

const deleteSelectedMissions = async () => {
  for (const missionId of missionsStore.selectedMissions) {
    await window.electronApi.deleteMission(missionId);
  }

  missionsStore.selectedMissions.length = 0;
  missionsStore.loadMissions();
};

const markAllAsCompleted = async () => {
  for (const missionId of missionsStore.selectedMissions) {
    const mission = toRaw(missionsStore.missions.find((m) => m.id === missionId) as Mission);
    mission.status = 'completed';
    await window.electronApi.updateMission(mission);
  }

  missionsStore.selectedMissions.length = 0;
  missionsStore.loadMissions();
};
</script>

<template>
  <menu class="bg-surface-secondary flex items-center text-xs font-tomorrow px-4 gap-x-4">
    <AnimatePresence>
      <motion.div
        class="flex items-center gap-x-4 w-full"
        :variants="containerVariant"
        initial="initial"
        animate="animate"
        exit="exit"
        v-if="missionsStore.selectedMissions.length > 0"
      >
        <motion.div :variants="itemVariant" class="flex-1">
          <button class="menu-button" @click="missionsStore.selectedMissions.length = 0">
            <Target class="w-4 h-4 stroke-[1.5px]"></Target>
            <span class="uppercase">Unselect All ({{ missionsStore.selectedMissions.length }})</span>
          </button>
        </motion.div>
        <motion.div :variants="itemVariant">
          <button class="menu-button" @click="deleteSelectedMissions">
            <Trash class="w-4 h-4 stroke-[1.5px]"></Trash>
            <span class="uppercase">Delete all</span>
          </button>
        </motion.div>
        <motion.div :variants="itemVariant">
          <button class="menu-button" @click="markAllAsCompleted">
            <Check class="w-4 h-4 stroke-2"></Check>
            <span class="uppercase">Mark all as completed</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </menu>
</template>
