<script setup lang="ts">
import Compass from '../../components/icons/Compass.vue';
import LowPriority from '../../components/icons/LowPriority.vue';
import MediumPriority from '../../components/icons/MediumPriority.vue';
import HighPriority from '../../components/icons/HighPriority.vue';
import SixDots from '../../components/icons/SixDots.vue';
import { Reorder, useDragControls } from 'motion-v';
import { ref } from 'vue';
import Type from '../../components/icons/Type.vue';
import Time from '../../components/icons/Time.vue';
import Target from '../../components/icons/Target.vue';

const controls = useDragControls();
const draggingId = ref<number | null>(null);

const values = ref([
  {
    id: 1,
    mission: 'Architect and Implement Full Offline-First Sync Engine with Conflict Resolution',
    priority: 3,
    scale: 'operation',
    estimatedMinutes: 480, // 8 hours total
    targetSessions: 12,
  },
  {
    id: 2,
    mission: 'Design and Ship Complete PRISM Focus Momentum System with Visual States and Reward Scaling',
    priority: 2,
    scale: 'operation',
    estimatedMinutes: 360, // 6 hours total
    targetSessions: 8,
  },
  {
    id: 3,
    mission: 'Refactor Mission Table UI Styling',
    priority: 1,
    scale: 'task',
    estimatedMinutes: 45,
    targetSessions: 1,
  },
]);

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
];

const getIdxFromPriority = (p: number) => {
  return priorities[p - 1] as (typeof priorities)[number];
};
</script>

<template>
  <div class="p-4 space-y-10">
    <!-- ACTIVE MISSIONS -->
    <section>
      <div class="flex gap-2 mb-2">
        <div class="flex items-center gap-4 border rounded-md cut-corners border-primary py-1.5 px-4">
          <div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
          <span class="text-sm text-primary font-tomorrow">ACTIVE</span>
        </div>
        <div class="flex items-center justify-center py-1.5 px-3 border rounded-md cut-corners border-primary">
          <span class="text-sm text-primary font-tomorrow">3</span>
        </div>
      </div>

      <div class="w-full overflow-hidden border-t border-x rounded-md cut-corners border-surface-tertiary">
        <Reorder.Group as="table" v-model:values="values" class="w-full text-md text-left font-tomorrow">
          <thead class="bg-surface-primary">
            <tr>
              <th class="border-b border-surface-tertiary"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary max-w-80">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px"></Compass>
                  <span>MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px"></HighPriority>
                  <span>PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px"></Type>
                  <span>TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px"></Time>
                  <span>EST. MINUTES</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary">
                <div class="flex items-center gap-x-2">
                  <Target width="20px"></Target>
                  <span>TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <Reorder.Item
              v-for="item in values"
              :key="item.id"
              :value="item"
              as="tr"
              class="cursor-pointer select-none"
              :transition="{ opacity: { duration: 1000 } }"
              @drag-start="() => (draggingId = item.id)"
              @drag-end="() => (draggingId = null)"
              :style="{ opacity: draggingId === item.id ? 0.5 : 1 }"
              :dragControls="controls"
              :dragListener="false"
            >
              <td
                class="py-2.5 border-b border-surface-tertiary hover:cursor-grab active:cursor-grabbing"
                @pointerdown="(e) => controls.start(e)"
              >
                <SixDots class="mx-auto"></SixDots>
              </td>
              <td class="px-2 py-2.5 font-sans border-b border-l border-surface-tertiary max-w-80">
                <p class="line-clamp-1">
                  {{ item.mission }}
                </p>
              </td>
              <td class="px-2 py-1.5 uppercase border-b border-l border-surface-tertiary">
                <div
                  :class="`flex gap-x-1 border p-1 cut-corners rounded-sm max-w-max pr-2 ${getIdxFromPriority(item.priority).containerColorClass}`"
                >
                  <component
                    :is="getIdxFromPriority(item.priority).IconComponent"
                    :class="getIdxFromPriority(item.priority).iconColorClass"
                  ></component>
                  <span>{{ getIdxFromPriority(item.priority).label }}</span>
                </div>
              </td>
              <td class="px-2 py-2.5 uppercase border-b border-l border-surface-tertiary">{{ item.scale }}</td>
              <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ item.estimatedMinutes }}</td>
              <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ item.targetSessions }}</td>
            </Reorder.Item>
          </tbody>
        </Reorder.Group>
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

      <div class="w-full overflow-hidden border-t border-x rounded-md cut-corners border-surface-tertiary">
        <Reorder.Group as="table" v-model:values="values" class="w-full text-md text-left font-tomorrow">
          <thead class="bg-surface-primary">
            <tr>
              <th class="border-b border-surface-tertiary"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary max-w-80">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px"></Compass>
                  <span>MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px"></HighPriority>
                  <span>PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px"></Type>
                  <span>TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px"></Time>
                  <span>EST. MINUTES</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary">
                <div class="flex items-center gap-x-2">
                  <Target width="20px"></Target>
                  <span>TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <Reorder.Item
              v-for="item in values"
              :key="item.id"
              :value="item"
              as="tr"
              class="cursor-pointer select-none"
              :transition="{ opacity: { duration: 1000 } }"
              @drag-start="() => (draggingId = item.id)"
              @drag-end="() => (draggingId = null)"
              :style="{ opacity: draggingId === item.id ? 0.5 : 1 }"
              :dragControls="controls"
              :dragListener="false"
            >
              <td
                class="py-2.5 border-b border-surface-tertiary hover:cursor-grab active:cursor-grabbing"
                @pointerdown="(e) => controls.start(e)"
              >
                <SixDots class="mx-auto"></SixDots>
              </td>
              <td class="px-2 py-2.5 font-sans border-b border-l border-surface-tertiary max-w-80">
                <p class="line-clamp-1">
                  {{ item.mission }}
                </p>
              </td>
              <td class="px-2 py-1.5 uppercase border-b border-l border-surface-tertiary">
                <div
                  :class="`flex gap-x-1 border p-1 cut-corners rounded-sm max-w-max pr-2 ${getIdxFromPriority(item.priority).containerColorClass}`"
                >
                  <component
                    :is="getIdxFromPriority(item.priority).IconComponent"
                    :class="getIdxFromPriority(item.priority).iconColorClass"
                  ></component>
                  <span>{{ getIdxFromPriority(item.priority).label }}</span>
                </div>
              </td>
              <td class="px-2 py-2.5 uppercase border-b border-l border-surface-tertiary">{{ item.scale }}</td>
              <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ item.estimatedMinutes }}</td>
              <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ item.targetSessions }}</td>
            </Reorder.Item>
          </tbody>
        </Reorder.Group>
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

      <div class="w-full overflow-hidden border-t border-x rounded-md cut-corners border-surface-tertiary">
        <Reorder.Group as="table" v-model:values="values" class="w-full text-md text-left font-tomorrow">
          <thead class="bg-surface-primary">
            <tr>
              <th class="border-b border-surface-tertiary"></th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary max-w-80">
                <div class="flex items-center gap-x-2">
                  <Compass width="20px"></Compass>
                  <span>MISSION</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <HighPriority width="20px"></HighPriority>
                  <span>PRIORITY</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Type width="20px"></Type>
                  <span>TYPE</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary">
                <div class="flex items-center gap-x-2">
                  <Time width="20px"></Time>
                  <span>EST. MINUTES</span>
                </div>
              </th>
              <th class="px-2 py-1 font-light border-b border-l border-surface-tertiary fill-auxilary">
                <div class="flex items-center gap-x-2">
                  <Target width="20px"></Target>
                  <span>TARGET SESSIONS</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="font-light">
            <Reorder.Item
              v-for="item in values"
              :key="item.id"
              :value="item"
              as="tr"
              class="cursor-pointer select-none"
              :transition="{ opacity: { duration: 1000 } }"
              @drag-start="() => (draggingId = item.id)"
              @drag-end="() => (draggingId = null)"
              :style="{ opacity: draggingId === item.id ? 0.5 : 1 }"
              :dragControls="controls"
              :dragListener="false"
            >
              <td
                class="py-2.5 border-b border-surface-tertiary hover:cursor-grab active:cursor-grabbing"
                @pointerdown="(e) => controls.start(e)"
              >
                <SixDots class="mx-auto"></SixDots>
              </td>
              <td class="px-2 py-2.5 font-sans border-b border-l border-surface-tertiary max-w-80">
                <p class="line-clamp-1">
                  {{ item.mission }}
                </p>
              </td>
              <td class="px-2 py-1.5 uppercase border-b border-l border-surface-tertiary">
                <div
                  :class="`flex gap-x-1 border p-1 cut-corners rounded-sm max-w-max pr-2 ${getIdxFromPriority(item.priority).containerColorClass}`"
                >
                  <component
                    :is="getIdxFromPriority(item.priority).IconComponent"
                    :class="getIdxFromPriority(item.priority).iconColorClass"
                  ></component>
                  <span>{{ getIdxFromPriority(item.priority).label }}</span>
                </div>
              </td>
              <td class="px-2 py-2.5 uppercase border-b border-l border-surface-tertiary">{{ item.scale }}</td>
              <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ item.estimatedMinutes }}</td>
              <td class="px-2 py-2.5 border-b border-l border-surface-tertiary">{{ item.targetSessions }}</td>
            </Reorder.Item>
          </tbody>
        </Reorder.Group>
      </div>
    </section>
  </div>
</template>
