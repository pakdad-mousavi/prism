<script setup lang="ts">
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear();
</script>

<template>
  <div class="flex w-full h-svh bg-surface-primary text-secondary">
    <aside class="h-full border-r w-72 bg-aside-area/70 border-tertiary">
      <div class="flex items-center h-16 gap-4 p-4 border-b border-tertiary">
        <div class="relative">
          <div class="absolute w-4 h-4 -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/3 bg-primary blur-md"></div>
          <img src="../assets/images/logo.svg" alt="Prism Logo" class="w-6" />
        </div>
        <h1 class="text-xl uppercase font-tomorrow text-primary">Prism</h1>
      </div>

      <div class="flex flex-col h-[calc(100%-64px)]">
        <div class="flex flex-col flex-1 p-4 gap-y-2">
          <span class="text-primary text-xs ml-2.5 block font-medium font-tomorrow">MAIN</span>
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-primary bg-surface-tertiary px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              COMMAND CENTER
            </RouterLink>
          </div>

          <span class="text-primary text-xs ml-2.5 block font-medium font-tomorrow mt-6">FOCUS</span>
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              MISSIONS
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              CAMPAIGNS
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              FOCUS RUN
            </RouterLink>
          </div>

          <span class="text-primary text-xs ml-2.5 block font-medium font-tomorrow mt-6">RECONNAISSANCE</span>
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              SIGNALS
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              PROGRESS
            </RouterLink>
          </div>
        </div>

        <div class="p-4">
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              SETTINGS
            </RouterLink>
          </div>
          <div>
            <RouterLink
              class="block cut-corners rounded-md border border-transparent px-2.5 py-2 font-tomorrow font-light text-sm"
              to="/dashboard/command-center"
            >
              HELP
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
    <main class="w-[calc(100%-288px)] h-full bg-surface-secondary">
      <menu class="w-full h-16 border-b border-tertiary"></menu>
    </main>
  </div>
</template>
