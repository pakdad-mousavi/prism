<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v';
import Target from '../../../components/icons/Target.vue';
import { useFocusRunStore } from '../../../stores/focusRuns';

const focusRunStore = useFocusRunStore();
</script>

<template>
  <menu class="bg-surface-secondary flex items-center text-xs font-tomorrow px-4 gap-x-4">
    <AnimatePresence mode="wait">
      <motion.div class="flex gap-x-4 items-center w-full" v-if="focusRunStore.isActiveFocusRun">
        <motion.div
          :initial="{ opacity: 0, x: -5 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -5 }"
          :transition="{ delay: 0 }"
          class="ml-auto"
        >
          <button class="menu-button" @click="focusRunStore.finishRun">
            <Target class="w-4 h-4 stroke-[1.5px] stroke-secondary"></Target>
            <span class="uppercase">Finish Focus Run</span>
          </button>
        </motion.div>
        <motion.div
          :initial="{ opacity: 0, x: -5 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -5 }"
          :transition="{ delay: 0.08 }"
          class=""
        >
          <button class="menu-button" @click="focusRunStore.abandonRun">
            <Target class="w-4 h-4 stroke-[1.5px] stroke-secondary"></Target>
            <span class="uppercase">Abandon Focus Run</span>
          </button>
        </motion.div>
      </motion.div>
      <motion.div class="flex gap-x-4 items-center w-full" v-else> </motion.div>
    </AnimatePresence>
  </menu>
</template>
