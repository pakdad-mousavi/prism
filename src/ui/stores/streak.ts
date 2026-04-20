import { defineStore } from 'pinia';
import type { StreakDay } from '../../shared/types/streakDay';

export const useStreakStore = defineStore('streakDay', {
  state: () => ({
    streak: [] as StreakDay[],
    currentStreakCount: 0,
    longestStreakCount: 0,
    totalFocusRunsThisYear: 0,
  }),

  getters: {},

  actions: {
    async loadStreak(from: Date, to: Date) {
      this.streak = await this.getStreakDaysInDateRange(from, to);
      this.currentStreakCount = await this.getCurrentStreakCount();
      this.longestStreakCount = await this.getLongestStreakCountInDateRange(from, to);
      this.totalFocusRunsThisYear = await this.getTotalFocusRunsInDateRange(from, to);
    },

    async getCurrentStreakCount() {
      return await window.electronApi.getCurrentStreakCount();
    },

    async getLongestStreakCountInDateRange(from: Date, to: Date) {
      return await window.electronApi.getLongestStreakCountInDateRange(from, to);
    },

    async getStreakDaysInDateRange(from: Date, to: Date) {
      return await window.electronApi.getStreakDaysInDateRange(from, to);
    },

    async getTotalFocusRunsInDateRange(from: Date, to: Date) {
      return await window.electronApi.getTotalFocusRunsInDateRange(from, to);
    },
  },
});
