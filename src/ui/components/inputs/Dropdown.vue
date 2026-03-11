<script setup lang="ts" generic="T">
import { motion, AnimatePresence } from 'motion-v';
import { watch, ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps<{
  options: T[];
  modelValue: T;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void;
}>();

const open = ref(false);
const selectRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const placement = ref<'bottom' | 'top'>('bottom');

// Update placement based on whether there is enough space for the menu or not
const updatePlacement = () => {
  if (!selectRef.value || !menuRef.value) return;

  const rect = selectRef.value.getBoundingClientRect();
  const menuHeight = menuRef.value.offsetHeight;
  const spaceBelow = window.innerHeight - rect.bottom;

  placement.value = spaceBelow - menuHeight > 0 ? 'bottom' : 'top';
};

const toggleDropdown = async () => {
  open.value = !open.value;
};

watch(open, async (value) => {
  if (value) {
    await nextTick();
    updatePlacement();
  }
});

const selectOption = (option: T) => {
  emit('update:modelValue', option);
  open.value = false;
};

const selectedOption = computed(() => props.options.find((o) => o === props.modelValue));

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
      <template v-if="selectedOption !== undefined">
        <slot name="selected" :option="selectedOption" :open="open">
          {{ selectedOption }}
        </slot>
      </template>

      <span v-else class="text-zinc-400">Select option</span>
    </div>

    <!-- Dropdown -->
    <AnimatePresence>
      <motion.div
        :initial="{ opacity: 0, translateY: -10 }"
        :animate="{ opacity: 1, translateY: 0 }"
        :exit="{ opacity: 0, translateY: -10 }"
        :transition="{ duration: 0.1 }"
        v-if="open"
        class="absolute left-0 bg-surface-primary z-10"
        :class="placement === 'bottom' ? 'top-full' : 'bottom-full'"
      >
        <div
          class="mt-1 rounded-md border border-surface-auxilary cut-corners bg-surface-primary shadow-lg z-50 overflow-hidden"
          ref="menuRef"
        >
          <div
            v-for="(option, i) in options"
            :key="i"
            @click="selectOption(option)"
            class="px-2 py-1.5 cursor-pointer hover:bg-surface-tertiary/50 duration-100"
          >
            <slot name="option" :option="option">
              {{ option }}
            </slot>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
