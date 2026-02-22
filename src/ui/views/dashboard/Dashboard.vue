<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Dashboard, ConnectionSignal, ProgressBarRound, Help } from '@vicons/carbon';
import { CompassRegular } from '@vicons/fa';
import { Flag, Bolt } from '@vicons/tabler';
import { Cog } from '@vicons/ionicons5';

const year = new Date().getFullYear();
</script>

<template>
  <div class="flex w-full h-svh text-secondary relative">
    <div class="absolute w-60 h-72 rounded-full bg-primary/60 left-48 top-4 blur-3xl"></div>
    <aside class="h-full border-r w-72 border-tertiary bg-surface-primary/85 z-10">
      <div class="flex items-center h-16 gap-4 p-4 border-b border-tertiary">
        <div class="relative">
          <div class="absolute w-4 h-4 -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/3 bg-primary blur-md"></div>
          <img src="../../assets/images/logo.svg" alt="Prism Logo" class="w-6" />
        </div>
        <h1 class="text-xl uppercase font-tomorrow text-primary">Prism</h1>
      </div>

      <div class="flex flex-col h-[calc(100%-64px)]">
        <div class="flex flex-col flex-1 p-4 gap-y-2">
          <span class="text-primary text-xs ml-2.5 block font-medium font-tomorrow">MAIN</span>
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/command-center"
            >
              <Dashboard class="w-5 mr-2 text-secondary"></Dashboard>
              <span>COMMAND CENTER</span>
            </RouterLink>
          </div>

          <span class="text-primary text-xs ml-2.5 block font-medium font-tomorrow mt-6">FOCUS</span>
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/missions"
            >
              <CompassRegular class="w-5 mr-2 text-secondary"></CompassRegular>
              <span>MISSIONS</span>
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/campaigns"
            >
              <Flag class="w-5 mr-2 text-secondary"></Flag>
              <span>CAMPAIGNS</span>
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/focus-run"
            >
              <Bolt class="w-5 mr-2 text-secondary"></Bolt>
              <span>FOCUS RUN</span>
            </RouterLink>
          </div>

          <span class="text-primary text-xs ml-2.5 block font-medium font-tomorrow mt-6">RECONNAISSANCE</span>
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/signals"
            >
              <ConnectionSignal class="w-5 mr-2 text-secondary"></ConnectionSignal>
              <span>SIGNALS</span>
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/progress"
            >
              <ProgressBarRound class="w-5 mr-2 text-secondary"></ProgressBarRound>
              <span>PROGRESS</span>
            </RouterLink>
          </div>
        </div>

        <div class="p-4">
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/settings"
            >
              <Cog class="w-5 mr-2 text-secondary"></Cog>
              <span>SETTINGS</span>
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="flex cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm duration-200 bg-surface-primary/"
              to="/dashboard/help"
            >
              <Help class="w-5 mr-2 text-secondary"></Help>
              <span>HELP</span>
            </RouterLink>
          </div>

          <div class="w-full h-px mt-2 mb-4 bg-linear-to-r from-transparent via-surface-auxilary to-transparent"></div>

          <div class="flex font-tomorrow">
            <div
              class="flex items-center justify-center w-1/2 h-16 border cut-corners rounded-bl-3xl border-primary bg-surface-primary glow"
            >
              <p>SIGN IN</p>
            </div>
            <div
              class="flex items-center justify-center w-1/2 h-16 border cut-corners rounded-tr-3xl border-primary bg-surface-primary glow"
            >
              <p>SIGN UP</p>
            </div>
          </div>

          <div class="flex mt-4 text-stone-600 text-2xs font-tomorrow">
            <span class="flex-1">© {{ year }} PRISM, ALL RIGHTS RESERVED.</span>
            <span>V1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
    <main class="w-[calc(100%-288px)] h-full bg-surface-secondary/85 z-10">
      <menu class="w-full h-16 border-b border-tertiary"></menu>
      <RouterView></RouterView>
    </main>
  </div>
</template>
