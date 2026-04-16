<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { motion } from 'motion-v';

import Dashboard from '../../components/icons/Dashboard.vue';
import Compass from '../../components/icons/Compass.vue';
import Flag from '../../components/icons/Flag.vue';
import Bolt from '../../components/icons/Bolt.vue';
import Signal from '../../components/icons/Signal.vue';
import Progress from '../../components/icons/Progress.vue';
import Cog from '../../components/icons/Cog.vue';
import Help from '../../components/icons/Help.vue';

import { ref } from 'vue';

const year = new Date().getFullYear();

const enableScroll = ref(true);
</script>

<template>
  <div class="text-secondary flex flex-col w-full h-svh overflow-hidden">
    <header
      class="h-8 w-full border-surface-tertiary bg-linear-to-t from-surface-primary/85 to-surface-primary border-b flex items-center justify-center title-bar"
    >
      <motion.h1
        class="text-xs uppercase font-tomorrow"
        :initial="{ color: 'var(--color-primary)', y: 10, opacity: 0 }"
        :animate="{ color: 'var(--color-surface-auxilary)', y: 0, opacity: 1 }"
        :transition="{ duration: 1, type: 'spring', mass: 1, color: { delay: 1, duration: 0.5 } }"
      >
        Prism - Focus, Refracted
      </motion.h1>
    </header>
    <div class="relative flex w-full h-svh overflow-hidden">
      <div class="absolute rounded-full w-60 h-72 bg-primary/60 left-48 top-4 blur-3xl"></div>
      <div class="absolute rounded-full w-60 h-72 bg-primary/60 -right-4 -bottom-4 blur-3xl"></div>

      <aside class="z-10 h-full border-r w-64 border-surface-tertiary bg-surface-primary/85">
        <div class="flex items-center h-16 gap-4 p-4 border-b border-surface-tertiary">
          <div class="relative">
            <div class="absolute w-4 h-4 -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/3 bg-primary blur-md"></div>
            <img src="../../assets/images/logo.svg" alt="Prism Logo" class="w-6" />
          </div>
          <h1 class="text-xl uppercase font-tomorrow text-primary">Prism</h1>
        </div>

        <div class="flex flex-col h-[calc(100%-96px)]">
          <div class="flex flex-col flex-1 p-4 gap-y-2">
            <motion.span
              class="text-primary text-xs ml-2.5 block font-medium font-tomorrow"
              :initial="{ x: -10, opacity: 0 }"
              :animate="{ x: 0, opacity: 1 }"
              >MAIN</motion.span
            >
            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.08 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/command-center"
              >
                <Dashboard class="w-5 h-5 mr-2 text-secondary"></Dashboard>
                <span>COMMAND CENTER</span>
              </RouterLink>
            </motion.div>

            <motion.span
              class="text-primary text-xs ml-2.5 block font-medium font-tomorrow mt-6"
              :initial="{ x: -10, opacity: 0 }"
              :animate="{ x: 0, opacity: 1 }"
              :transition="{ delay: 0.16 }"
              >FOCUS</motion.span
            >
            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.24 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/missions"
              >
                <Compass class="w-5 h-5 mr-2 text-secondary"></Compass>
                <span>MISSIONS</span>
              </RouterLink>
            </motion.div>

            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.32 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/focus-run"
              >
                <Bolt class="w-5 h-5 mr-2 text-secondary"></Bolt>
                <span>FOCUS RUN</span>
              </RouterLink>
            </motion.div>

            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.4 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/campaigns"
              >
                <Flag class="w-5 h-5 mr-2 text-secondary"></Flag>
                <span>CAMPAIGNS</span>
              </RouterLink>
            </motion.div>

            <motion.span
              class="text-primary text-xs ml-2.5 block font-medium font-tomorrow mt-6"
              :initial="{ x: -10, opacity: 0 }"
              :animate="{ x: 0, opacity: 1 }"
              :transition="{ delay: 0.48 }"
              >RECONNAISSANCE</motion.span
            >
            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.56 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/signals"
              >
                <Signal class="w-5 h-5 mr-2 text-secondary"></Signal>
                <span>SIGNALS</span>
              </RouterLink>
            </motion.div>
            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.64 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/progress"
              >
                <Progress class="w-5 h-5 mr-2 text-secondary"></Progress>
                <span>PROGRESS</span>
              </RouterLink>
            </motion.div>
          </div>

          <div class="p-4">
            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.72 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/settings"
              >
                <Cog class="w-5 h-5 mr-2 text-secondary"></Cog>
                <span>SETTINGS</span>
              </RouterLink>
            </motion.div>
            <motion.div :initial="{ x: -10, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" :transition="{ delay: 0.8 }">
              <RouterLink
                class="flex items-center cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
                to="/dashboard/help"
              >
                <Help class="w-5 h-5 mr-2 text-secondary"></Help>
                <span>HELP</span>
              </RouterLink>
            </motion.div>

            <motion.div
              class="h-px mt-2 mb-4 mx-auto bg-linear-to-r from-transparent via-surface-auxilary to-transparent"
              :initial="{ width: 0 }"
              :animate="{ width: '100%' }"
              :transition="{ delay: 0.84 }"
            ></motion.div>

            <div class="flex font-tomorrow">
              <motion.div
                :initial="{ y: -10, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ delay: 0.88 }"
                class="flex items-center justify-center w-1/2 h-16 border cut-corners rounded-bl-3xl border-primary bg-surface-primary glow"
              >
                <p>SIGN IN</p>
              </motion.div>
              <motion.div
                :initial="{ y: 10, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ delay: 0.88 }"
                class="flex items-center justify-center w-1/2 h-16 border cut-corners rounded-tr-3xl border-primary bg-surface-primary glow"
              >
                <p>SIGN UP</p>
              </motion.div>
            </div>

            <motion.div
              class="flex mt-4 text-stone-600 text-2xs font-tomorrow"
              :initial="{ y: 10, opacity: 0 }"
              :animate="{ y: 0, opacity: 1 }"
              :transition="{ delay: 0.96 }"
            >
              <span class="flex-1">© {{ year }} PRISM, ALL RIGHTS RESERVED.</span>
              <span>V1.0.0</span>
            </motion.div>
          </div>
        </div>
      </aside>
      <main
        class="w-[calc(100%-256px)] h-full bg-surface-secondary/85 z-10 flex flex-col"
        :class="enableScroll ? 'overflow-y-scroll' : 'overflow-hidden'"
      >
        <RouterView name="menu" class="absolute w-[calc(100%-256px)] h-16 border-b border-surface-tertiary z-10000"></RouterView>
        <main
          class="mt-16 relative flex flex-col flex-1 min-h-0 w-full bg-[repeating-radial-gradient(var(--color-surface-primary)_0,var(--color-surface-primary)_1px,transparent_1px,transparent_100%)] bg-size-[20px_20px]"
        >
          <RouterView name="main" @toggleScroll="enableScroll = !enableScroll"></RouterView>
        </main>
      </main>
    </div>
  </div>
</template>
