<script setup lang="ts">
import type { Mission } from '../../../shared/types/mission';
import { type Component } from 'vue';

defineProps<{
  mission: Mission;
  getIdxFromPriority: (i: number | null) => {
    label: string;
    iconColorClass: string;
    containerColorClass: string;
    IconComponent: Component;
  };
}>();
</script>

<template>
  <tr class="cursor-pointer select-none hover:bg-surface-primary/50 duration-100 last:[&>td]:border-b-0">
    <td class="py-2.5 px-1.5 border-b border-surface-tertiary">
      <div class="w-3.5 h-3.5 cut-corners rounded-xs border border-surface-auxilary mx-auto"></div>
    </td>
    <td class="px-2 py-2.5 font-sans border-b border-l border-surface-tertiary w-80">
      <p class="line-clamp-1">
        {{ mission.title }}
      </p>
    </td>
    <td class="px-2 py-1.5 uppercase border-b border-l border-surface-tertiary">
      <div
        :class="`flex gap-x-1 border p-1 cut-corners rounded-sm max-w-max pr-2 ${getIdxFromPriority(mission.priority).containerColorClass}`"
      >
        <component
          :is="getIdxFromPriority(mission.priority).IconComponent"
          :class="getIdxFromPriority(mission.priority).iconColorClass"
        ></component>
        <span>{{ getIdxFromPriority(mission.priority).label }}</span>
      </div>
    </td>
    <td class="px-2 py-2.5 uppercase border-b border-l border-surface-tertiary">{{ mission.scale }}</td>
    <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ mission.estimatedMinutes || '---' }}</td>
    <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ mission.targetSessions || '---' }}</td>
  </tr>
</template>
