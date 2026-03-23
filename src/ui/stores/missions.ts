import { defineStore } from 'pinia';
import type { Mission, MissionDraft } from '../../shared/types/mission';

export const useMissionsStore = defineStore('missions', {
  state: () => ({
    missions: [] as Mission[],
    activeMission: null as Mission | null,
    missionDraft: null as MissionDraft | null,
    loaded: false,
    selectedMissions: [] as number[],
    isSelectActiveMissionMode: false as Boolean,
  }),

  getters: {
    activeMissions: (state) => state.missions.filter((m) => m.status === 'active'),
    onHoldMissions: (state) => state.missions.filter((m) => m.status === 'on hold'),
    completedMissions: (state) => state.missions.filter((m) => m.status === 'completed'),
  },

  actions: {
    async load() {
      await this.loadMissions();
      await this.loadActiveMission();
    },
    async loadMissions() {
      const res = await window.electronApi.getMissions();
      if (res) {
        this.missions = res;
        this.loaded = true;
      }
    },
    addSelectedMission(id: number) {
      // Only add the mission id if not already added
      if (!this.selectedMissions.includes(id)) {
        this.selectedMissions.push(id);
      }
    },
    removeSelectedMission(id: number) {
      const index = this.selectedMissions.findIndex((mid) => mid === id);
      if (index > -1) {
        this.selectedMissions.splice(index, 1);
      }
    },
    async loadActiveMission() {
      const activeMissionId = await window.electronApi.getActiveMissionId();
      this.activeMission = this.missions.find((m) => m.id === activeMissionId) || null;
    },
    async setActiveMissionId(id: number | null) {
      await window.electronApi.setActiveMissionId(id);
      this.activeMission = this.missions.find((m) => m.id === id) || null;
    },
  },
});
