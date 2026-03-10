<script setup lang="ts">
import { toRaw, watch } from 'vue';
import type { Mission } from '../../../shared/types/mission';
import { type Component } from 'vue';
import PrioritySelect from './PrioritySelect.vue';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<{
  mission: Mission;
  getIdxFromPriority: (i: number | null) => {
    label: string;
    iconColorClass: string;
    containerColorClass: string;
    IconComponent: Component;
  };
}>();

const ensureNumberInput = (e: KeyboardEvent) => {
  // Allow control keys (backspace, delete, arrows, etc.)
  if (e.ctrlKey || e.altKey || e.metaKey || e.key.length !== 1) {
    return;
  }

  // Check if the key is not a number
  if (isNaN(Number(e.key))) {
    e.preventDefault(); // Stop the character from being entered
  }
};

const onMissionChange = async (m: Mission) => {
  const plainMission = toRaw(m);
  await window.electronApi.updateMission(plainMission);
};

watch([() => props.mission.scale, () => props.mission.priority], () => onMissionChange(props.mission));
</script>

<template>
  <tr class="cursor-pointer select-none hover:bg-surface-primary/50 duration-100 last:[&>td]:border-b-0">
    <td class="py-2.5 px-1.5 border-b border-surface-tertiary">
      <div class="w-3.5 h-3.5 cut-corners rounded-xs border border-surface-auxilary mx-auto"></div>
    </td>
    <td class="font-sans border-b border-l border-surface-tertiary w-80">
      <input
        class="line-clamp-1 px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        v-model="mission.title"
        @change="onMissionChange(props.mission)"
      />
    </td>
    <td class="uppercase border-b border-l border-surface-tertiary">
      <PrioritySelect
        v-model="mission.priority"
        :options="[{ priority: 0 }, { priority: 1 }, { priority: 2 }]"
        :getIdxFromPriority="getIdxFromPriority"
      />
    </td>
    <td class="uppercase border-b border-l border-surface-tertiary">
      <CustomSelect
        :options="[
          { label: 'Task', value: 'task' },
          { label: 'Operation', value: 'operation' },
        ]"
        v-model="mission.scale"
      ></CustomSelect>
    </td>
    <td class="border-b border-l border-surface-tertiary">
      <input
        class="px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        inputmode="numeric"
        @keydown="ensureNumberInput"
        @change="onMissionChange(mission)"
        v-model.number="mission.estimatedMinutes"
      />
    </td>
    <td class="border-b border-l border-surface-tertiary">
      <input
        class="px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        inputmode="numeric"
        @keydown="ensureNumberInput"
        @change="onMissionChange(mission)"
        v-model.number="mission.targetSessions"
      />
    </td>
  </tr>
</template>
