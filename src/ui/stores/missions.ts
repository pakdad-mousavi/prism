import { defineStore } from 'pinia';
import type { Mission } from '../../shared/types/mission';

export const useMissionsStore = defineStore('missions', {
  state: () => ({
    missions: [] as Mission[],
    loaded: false,
  }),

  getters: {
    activeMissions: (state) => state.missions.filter((m) => m.status === 'active'),
    onHoldMissions: (state) => state.missions.filter((m) => m.status === 'on hold'),
    completedMissions: (state) => state.missions.filter((m) => m.status === 'completed'),
  },

  actions: {
    async loadMissions() {
      this.missions = await window.electronApi.getMissions();
      this.loaded = true;
    },
  },
});
