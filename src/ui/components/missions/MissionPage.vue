<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { type Mission as TMission } from '../../../shared/types/mission.ts';

defineProps<{
  mission: TMission;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleEscShortcut = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscShortcut);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscShortcut);
});
</script>

<template>
  <div class="bg-surface-primary w-full h-full p-4 border border-primary glow cut-corners rounded-2xl text-sm">
    <h1></h1>
    <input
      type="text"
      class="border w-full py-1.5 px-2 cut-corners rounded-md border-surface-auxilary outline-0 hover:bg-surface-auxilary/10 duration-100"
      v-model="mission.title"
    />
    <!-- <h1>{{ mission.id }}</h1> -->
  </div>
</template>
