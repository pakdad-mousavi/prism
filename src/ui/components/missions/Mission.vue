<script setup lang="ts">
import { Reorder, useDragControls } from 'motion-v';
import type { Mission } from '../../../shared/types/mission';
import { ref, type Component } from 'vue';
import SixDots from '../icons/SixDots.vue';

defineProps<{
  mission: Mission;
  getIdxFromPriority: (i: number | null) => {
    label: string;
    iconColorClass: string;
    containerColorClass: string;
    IconComponent: Component;
  };
  constraintsRef: HTMLElement;
}>();

const draggingId = ref<number | null>(null);
const controls = useDragControls();
</script>

<template>
  <Reorder.Item
    :value="mission"
    as="tr"
    class="cursor-pointer select-none"
    @drag-start="draggingId = mission.id"
    @drag-end="draggingId = null"
    :style="{ opacity: draggingId === mission.id ? 0.5 : 1 }"
    :dragControls="controls"
    :dragListener="false"
    :dragConstraints="constraintsRef"
    :dragElastic="0.1"
  >
    <td class="py-2.5 border-b border-surface-tertiary hover:cursor-grab active:cursor-grabbing" @pointerdown="controls.start">
      <SixDots class="mx-auto"></SixDots>
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
  </Reorder.Item>
</template>
