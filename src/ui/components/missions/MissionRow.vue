<script setup lang="ts">
import { reactive, toRaw, watch } from 'vue';
import type { Mission, MissionDraft } from '../../../shared/types/mission';
import type { Component } from 'vue';

import PrioritySelect from './PrioritySelect.vue';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<{
  isDraft: boolean;
  mission: Mission | MissionDraft;
  getIdxFromPriority: (i: number | null) => {
    label: string;
    iconColorClass: string;
    containerColorClass: string;
    IconComponent: Component;
  };
}>();

const emit = defineEmits<{
  saveDraft: [mission: MissionDraft];
  discardDraft: [];
  refreshStore: [];
}>();

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
  async () => {
    if (props.isDraft) return;

    const mission = toRaw(localMission) as Mission;
    if (!isMissionValid(mission)) {
      console.log('XXX');
      localMission.title = props.mission.title;
      return emit('refreshStore');
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
</script>

<template>
  <tr
    class="cursor-pointer select-none hover:bg-surface-primary/50 duration-100 last:[&>td]:border-b-0"
    @focusout="handleDraftBlur"
  >
    <td class="py-2.5 px-1.5 border-b border-surface-tertiary">
      <div class="w-3.5 h-3.5 cut-corners rounded-xs border border-surface-auxilary mx-auto"></div>
    </td>

    <!-- TITLE -->
    <td class="font-sans border-b border-l border-surface-tertiary w-80">
      <input
        class="line-clamp-1 px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        v-model="localMission.title"
        v-focus="isDraft"
      />
    </td>

    <!-- PRIORITY -->
    <td class="uppercase border-b border-l border-surface-tertiary">
      <PrioritySelect
        v-model.lazy="localMission.priority"
        :options="[{ priority: 0 }, { priority: 1 }, { priority: 2 }]"
        :getIdxFromPriority="getIdxFromPriority"
      />
    </td>

    <!-- TYPE -->
    <td class="uppercase border-b border-l border-surface-tertiary">
      <CustomSelect
        v-model.lazy="localMission.scale"
        :options="[
          { label: 'Task', value: 'task' },
          { label: 'Operation', value: 'operation' },
        ]"
      />
    </td>

    <!-- EST MINUTES -->
    <td class="border-b border-l border-surface-tertiary">
      <input
        class="px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        inputmode="numeric"
        @keydown="ensureNumberInput"
        v-model.number.lazy="localMission.estimatedMinutes"
      />
    </td>

    <!-- TARGET SESSIONS -->
    <td class="border-b border-l border-surface-tertiary">
      <input
        class="px-2 py-2.5 w-full outline-0 focus:bg-surface-primary duration-100"
        inputmode="numeric"
        @keydown="ensureNumberInput"
        v-model.number.lazy="localMission.targetSessions"
      />
    </td>
  </tr>
</template>
