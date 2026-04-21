<script setup lang="ts">
import { reactive, toRaw, watch } from 'vue';
import type { Mission, MissionDraft } from '../../../shared/types/mission';

import LowPriority from '../icons/LowPriority.vue';
import MediumPriority from '../icons/MediumPriority.vue';
import HighPriority from '../icons/HighPriority.vue';
import DottedCircle from '../icons/DottedCircle.vue';
import Dropdown from '../inputs/Dropdown.vue';
import Check from '../icons/Check.vue';
import { motion } from 'motion-v';
import { useMissionsStore } from '../../stores/missions';

const props = defineProps<{
  isDraft: boolean;
  mission: Mission | MissionDraft;
  isSelected: boolean;
  isActive: boolean;
}>();

const emit = defineEmits<{
  saveDraft: [mission: MissionDraft];
  discardDraft: [];
  refreshStore: [];
  onToggleSelect: [];
}>();

const missionsStore = useMissionsStore();

/*
|----------------
| Focus Directive
|----------------
*/

const vFocus = {
  mounted(el: HTMLInputElement, binding: { value: boolean }) {
    if (binding.value) {
      el.focus();
    }
  },
};

/*
|---------------------
| Local editable state
|---------------------
*/
const localMission = reactive({ ...props.mission });

/*
|---------------
| Draft handling
|---------------
*/
const isDraftValid = () => {
  return localMission.title?.trim() !== '';
};

const handleDraftBlur = () => {
  if (!props.isDraft) return;

  const draft = toRaw(localMission) as MissionDraft;

  if (isDraftValid()) {
    emit('saveDraft', draft);
  } else {
    emit('discardDraft');
  }
};

/*
|---------------------------
| Updating existing missions
|---------------------------
*/
const isMissionValid = (m: Mission) => {
  return m.title.trim().length > 0;
};

watch(
  localMission,
  async (newMission) => {
    if (props.isDraft) return;

    const mission = toRaw(localMission) as Mission;
    if (!isMissionValid(mission)) {
      localMission.title = props.mission.title;
      return emit('refreshStore');
    }

    if (newMission.status === 'archived' || newMission.status === 'completed') {
      await missionsStore.setActiveMissionId(null);
    }
    await window.electronApi.updateMission(mission);
    return emit('refreshStore');
  },
  { deep: true },
);

/*
|--------------
| Input helpers
|--------------
*/
const ensureNumberInput = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.key.length !== 1) return;
  if (isNaN(Number(e.key))) e.preventDefault();
};

// -----------
// UI HANDLING
// -----------
const getStatusStyleFromStatus = (status: string) => {
  switch (status) {
    case 'active':
      return {
        indicator: 'border-primary! bg-primary',
        label: 'text-primary!',
      };
    case 'on hold':
      return {
        indicator: 'border-auxilary!',
        label: 'text-auxilary!',
      };
    case 'completed':
      return {
        indicator: 'border-surface-auxilary! w-2! h-0.5!',
        label: 'text-surface-auxilary!',
      };
  }
};

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

const getPriorityComponent = (p: number | null) => {
  if (p === null) {
    return priorities[3] as (typeof priorities)[number];
  }
  return priorities[p] as (typeof priorities)[number];
};
</script>

<template>
  <motion.tr
    :initial="{ opacity: 0, translateX: '-10px' }"
    :animate="{ opacity: 1, translateX: '0' }"
    :exit="{ opacity: 0, translateX: '-10px' }"
    class="cursor-pointer select-none hover:bg-surface-primary/50 duration-100 last:[&>td]:border-b-0"
    :class="{
      'bg-surface-primary/70 hover:bg-surface-primary/70! translate-x-1 ease-[cubic-bezier(0.1,1,0,1)] duration-300': isSelected,
      'active-mission': isActive,
    }"
    @focusout="handleDraftBlur"
  >
    <!-- STATUS -->
    <td class="border-b border-surface-tertiary">
      <div class="flex items-center gap-x-2">
        <div
          class="w-4 h-4 border-surface-tertiary rounded-xs cut-corners border ml-2 relative duration-100"
          @click="emit('onToggleSelect')"
          :class="{ 'selected-mission': isSelected, 'pointer-events-none': missionsStore.isSelectActiveMissionMode }"
        >
          <Check
            class="absolute w-3 h-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-surface-auxilary stroke-2"
            v-if="isSelected"
          ></Check>
        </div>
        <Dropdown
          :options="['active', 'on hold', 'completed', 'archived']"
          v-model="localMission.status"
          :class="{ 'pointer-events-none': missionsStore.isSelectActiveMissionMode }"
        >
          <template #selected="{ option }">
            <div class="flex items-center justify-center w-full h-full py-2.5 rounded-none">
              <div
                class="w-2 h-2 rounded-full border mx-auto animate-pulse"
                :class="getStatusStyleFromStatus(option)?.indicator"
              ></div>
            </div>
          </template>

          <template #option="{ option }">
            <div class="flex items-center gap-x-2 px-1 py-1 justify-start">
              <div
                class="w-2 h-2 rounded-full border animate-pulse border-secondary"
                :class="getStatusStyleFromStatus(option)?.indicator"
              ></div>
              <span
                class="text-sm font-tomorrow uppercase text-secondary font-light"
                :class="getStatusStyleFromStatus(option)?.label"
                >{{ option }}</span
              >
            </div>
          </template>
        </Dropdown>
      </div>
    </td>

    <!-- TITLE -->
    <td class="font-sans border-b border-l border-surface-tertiary w-80">
      <input
        class="line-clamp-1 px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        :class="{ 'pointer-events-none': missionsStore.isSelectActiveMissionMode }"
        v-model="localMission.title"
        v-focus="isDraft"
      />
    </td>

    <!-- PRIORITY -->
    <td class="uppercase border-b border-l border-surface-tertiary">
      <Dropdown
        v-model.lazy="localMission.priority"
        :options="[0, 1, 2]"
        :class="{ 'pointer-events-none': missionsStore.isSelectActiveMissionMode }"
      >
        <template #selected="{ option }">
          <div :class="['flex gap-x-1 border p-1 cut-corners rounded-sm pr-2', getPriorityComponent(option).containerColorClass]">
            <component :is="getPriorityComponent(option).IconComponent" :class="getPriorityComponent(option).iconColorClass" />
            <span>
              {{ getPriorityComponent(option).label }}
            </span>
          </div>
        </template>

        <template #option="{ option }">
          <div
            :class="[
              'flex gap-x-1 border p-1 cut-corners rounded-sm pr-2 uppercase text-sm font-light font-tomorrow',
              getPriorityComponent(option).containerColorClass,
            ]"
          >
            <component :is="getPriorityComponent(option).IconComponent" :class="getPriorityComponent(option).iconColorClass" />
            <span>
              {{ getPriorityComponent(option).label }}
            </span>
          </div>
        </template>
      </Dropdown>
    </td>

    <!-- TYPE -->
    <td class="uppercase border-b border-l border-surface-tertiary">
      <Dropdown
        :options="['task', 'operation']"
        v-model="localMission.scale"
        :class="{ 'pointer-events-none': missionsStore.isSelectActiveMissionMode }"
      >
        <template #selected="{ option }">
          <div class="py-1 text-secondary text-sm font-tomorrow uppercase font-light">{{ option }}</div>
        </template>

        <template #option="{ option }">
          <div class="py-1 text-sm font-tomorrow uppercase text-secondary font-light">{{ option }}</div>
        </template>
      </Dropdown>
    </td>

    <!-- EST MINUTES -->
    <td class="border-b border-l border-surface-tertiary">
      <input
        class="px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        :class="{ 'pointer-events-none': missionsStore.isSelectActiveMissionMode }"
        inputmode="numeric"
        @keydown="ensureNumberInput"
        v-model.number.lazy="localMission.estimatedMinutes"
      />
    </td>

    <!-- TARGET SESSIONS -->
    <td class="border-b border-l border-surface-tertiary">
      <input
        :class="{ 'pointer-events-none': missionsStore.isSelectActiveMissionMode }"
        class="px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        inputmode="numeric"
        @keydown="ensureNumberInput"
        v-model.number.lazy="localMission.targetSessions"
      />
    </td>
  </motion.tr>
</template>
