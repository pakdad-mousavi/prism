<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import { ref, computed, onMounted, onUnmounted, type Component } from 'vue';

type Option = {
  priority: number | null;
};

const props = defineProps<{
  options: Option[];
  modelValue: number | null;
  getIdxFromPriority: (i: number | null) => {
    label: string;
    iconColorClass: string;
    containerColorClass: string;
    IconComponent: Component;
  };
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void;
}>();

const open = ref(false);
const selectRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  open.value = !open.value;
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.priority);
  open.value = false;
};

const selectedOption = computed(() => props.options.find((o) => o.priority === props.modelValue));

const priorityMeta = (priority: number | null) => props.getIdxFromPriority(priority);

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (selectRef.value && !selectRef.value.contains(target)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="selectRef" class="relative select-none">
    <!-- Selected value -->
    <div
      @click="toggleDropdown"
      class="flex items-center cursor-pointer rounded-md w-full px-2 py-1"
      :class="{ 'bg-surface-primary': open }"
    >
      <template v-if="selectedOption">
        <div
          :class="[
            'flex gap-x-1 border p-1 cut-corners rounded-sm pr-2',
            priorityMeta(selectedOption.priority).containerColorClass,
          ]"
        >
          <component
            :is="priorityMeta(selectedOption.priority).IconComponent"
            :class="priorityMeta(selectedOption.priority).iconColorClass"
          />

          <span>
            {{ priorityMeta(selectedOption.priority).label }}
          </span>
        </div>
      </template>

      <span v-else class="text-zinc-400">Select priority</span>
    </div>

    <!-- Dropdown -->
    <AnimatePresence>
      <motion.div
        :initial="{ opacity: 0, translateY: -10 }"
        :animate="{ opacity: 1, translateY: 0 }"
        :exit="{ opacity: 0, translateY: -10 }"
        :transition="{ duration: 0.1 }"
        v-if="open"
        class="absolute left-0 mt-1 rounded-md border border-surface-auxilary cut-corners bg-surface-primary shadow-lg z-50 overflow-hidden"
      >
        <div
          v-for="(option, i) in options"
          :key="i"
          @click="selectOption(option)"
          class="px-2 py-1.5 cursor-pointer hover:bg-surface-tertiary/50 duration-100"
        >
          <div
            :class="['flex gap-x-1 border p-1 cut-corners rounded-sm pr-2', priorityMeta(option.priority).containerColorClass]"
          >
            <component :is="priorityMeta(option.priority).IconComponent" :class="priorityMeta(option.priority).iconColorClass" />

            <span>
              {{ priorityMeta(option.priority).label }}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
