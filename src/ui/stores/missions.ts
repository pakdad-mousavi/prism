import { defineStore } from 'pinia';
import type { Mission, MissionDraft } from '../../shared/types/mission';

export const useMissionsStore = defineStore('missions', {
  state: () => ({
    missions: [] as Mission[],
    selectedMission: null as Mission | null,
    missionDraft: null as MissionDraft | null,
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
    async createDraftMission() {},
  },
});
