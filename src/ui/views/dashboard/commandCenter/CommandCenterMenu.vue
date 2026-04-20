<script lang="ts" setup>
import { motion } from 'motion-v';
import Bolt from '../../../components/icons/Bolt.vue';
import Compass from '../../../components/icons/Compass.vue';
</script>

<template>
  <menu class="bg-surface-secondary flex items-center text-xs font-tomorrow px-4 gap-x-4">
    <motion.div class="flex gap-x-4 items-center w-full">
      <motion.div
        :initial="{ opacity: 0, x: -5 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: -5 }"
        :transition="{ delay: 0 }"
      >
        <button class="menu-button" @click="$router.push('/dashboard/focus-run')">
          <Bolt class="w-4 h-4 stroke-[1.5px] stroke-secondary"></Bolt>
          <span class="uppercase">Start a Focus Run</span>
        </button>
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, x: -5 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: -5 }"
        :transition="{ delay: 0.08 }"
      >
        <button class="menu-button" @click="$router.push('/dashboard/missions')">
          <Compass class="w-4 h-4 stroke-[1.5px] stroke-secondary"></Compass>
          <span class="uppercase">Manage Missions</span>
        </button>
      </motion.div>
    </motion.div>
  </menu>
</template>
