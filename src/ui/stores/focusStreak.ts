import { defineStore } from 'pinia';
import type { DECAY_DURATION_MS as TDECAY_DURATION_MS } from '../../shared/types/focusStreak';

const DECAY_DURATION_MS: TDECAY_DURATION_MS = 600_000;

export const useFocusStreakStore = defineStore('focus-streak', {
  state: () => ({
    loaded: false,
    barsFilled: 0,
    decayTimeLeftMs: null as number | null,
    decayIntervalId: null as number | null,
    decayStage: 'idle' as 'idle' | 'multi' | 'final',
  }),

  getters: {
    decayProgress(state) {
      if (state.decayTimeLeftMs === null) return null;

      return Math.max(0, Math.min(1, state.decayTimeLeftMs / DECAY_DURATION_MS));
    },
  },

  actions: {
    async syncWithMain() {
      this.startDecayWatcher();

      const details = await window.electronApi.getDecayDetails();
      // Handle false returns in case of errors
      if (!details) {
        this.barsFilled = 0;
        this.decayTimeLeftMs = null;
        this.decayStage = 'idle';
        return;
      }

      this.barsFilled = details.barsFilled;
      this.decayTimeLeftMs = details.decayTimeLeftMs;
      this.decayStage = details.decayStage;
    },

    startDecayWatcher() {
      if (this.decayIntervalId) return;

      this.decayIntervalId = window.setInterval(() => {
        this.syncWithMain();
      }, 1000);
    },

    async fillBarAndStartDecay() {
      const result = await window.electronApi.fillBarAndStartDecay();
      await this.syncWithMain();

      return result;
    },

    // async stopDecay() {
    //   const result = await window.electronApi.stopDecay();
    //   await this.syncWithMain();
    //   return result;
    // },
  },
});
