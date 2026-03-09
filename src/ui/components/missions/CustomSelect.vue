<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import { ref, computed, onMounted, onUnmounted } from 'vue';

type Option = {
  label: string;
  value: string | number | null;
};

const props = defineProps<{
  options: Option[];
  modelValue: string | number | null;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
}>();

const open = ref(false);
const selectRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  open.value = !open.value;
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  open.value = false;
};

const selectedOption = computed(() => props.options.find((o) => o.value === props.modelValue));

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
  <div ref="selectRef" class="relative select-none w-full">
    <!-- Selected -->
    <div
      @click="toggleDropdown"
      class="flex items-center cursor-pointer rounded-md w-full px-2 py-2"
      :class="{ 'bg-surface-primary': open }"
    >
      <span v-if="selectedOption">
        {{ selectedOption.label }}
      </span>

      <span v-else class="text-zinc-400">
        {{ placeholder ?? 'Select option' }}
      </span>
    </div>

    <!-- Dropdown -->
    <AnimatePresence>
      <motion.div
        v-if="open"
        :initial="{ opacity: 0, translateY: -10 }"
        :animate="{ opacity: 1, translateY: 0 }"
        :exit="{ opacity: 0, translateY: -10 }"
        :transition="{ duration: 0.1 }"
        class="absolute left-0 mt-1 rounded-md border border-surface-auxilary cut-corners bg-surface-primary shadow-lg z-50 overflow-hidden min-w-full"
      >
        <div
          v-for="(option, i) in options"
          :key="i"
          @click="selectOption(option)"
          class="px-2 py-1.5 cursor-pointer hover:bg-surface-tertiary/50 duration-100"
        >
          {{ option.label }}
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
