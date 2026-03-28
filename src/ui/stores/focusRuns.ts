import { defineStore } from 'pinia';

export const useFocusRunStore = defineStore('focus-runs', {
  state: () => ({
    // From main process
    runId: null as number | null,
    plannedMs: 0,
    serverFocusedMs: 0,
    serverPausedMs: 0,
    status: null as 'running' | 'paused' | 'abandoned' | 'completed' | null,

    // Local animation
    displayFocusedMs: 0,

    // Timing
    lastSyncTime: 0,

    // general
    isActiveFocusRun: false,
    loaded: false,

    pollInterval: null as number | null,
    tickInterval: null as number | null,
  }),

  getters: {
    remainingMs: (state) => {
      return Math.max(0, state.plannedMs - state.displayFocusedMs);
    },
    progress: (state) => {
      if (!state.plannedMs) return 0;
      return state.displayFocusedMs / state.plannedMs;
    },
  },

  actions: {
    // MAIN FOCUS RUN ACTIONS
    async startRun(runId: number | null) {
      await window.electronApi.startRun(runId);
    },

    async pauseRun() {
      await window.electronApi.pauseRun();
    },

    async resumeRun() {
      await window.electronApi.resumeRun();
    },

    async finishRun() {
      await window.electronApi.finishRun();
    },

    async abandonRun() {
      await window.electronApi.abandonRun();
    },

    // STORE HANDLERS
    async load() {
      await this.syncWithMain();
      this.startPolling();
      this.startTicking();
      this.loaded = true;
    },

    async syncWithMain() {
      const res = await window.electronApi.getActiveRunState();
      if (!res) {
        this.isActiveFocusRun = false;
        return;
      }

      this.runId = res.runId;
      this.plannedMs = res.plannedMs;
      this.serverFocusedMs = res.focusedMs;
      this.serverPausedMs = res.pausedMs;
      this.status = res.status;

      this.lastSyncTime = Date.now();
      this.displayFocusedMs = res.focusedMs;
      this.isActiveFocusRun = true;
    },

    startPolling() {
      if (this.pollInterval) return;

      this.pollInterval = window.setInterval(() => {
        this.syncWithMain();
      }, 5000);
    },

    startTicking() {
      if (this.tickInterval) return;

      this.tickInterval = window.setInterval(() => {
        if (!this.isActiveFocusRun) return;
        if (this.status !== 'running') return;

        const delta = Date.now() - this.lastSyncTime;
        this.displayFocusedMs = this.serverFocusedMs + delta;
      }, 1000);
    },

    stop() {
      if (this.pollInterval) clearInterval(this.pollInterval);
      if (this.tickInterval) clearInterval(this.tickInterval);
    },
  },
});
