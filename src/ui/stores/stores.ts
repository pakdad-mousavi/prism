import { defineStore } from 'pinia';

export const useFocusRunStore = defineStore('focus-runs', {
  state: () => ({
    isActiveFocusRun: false,
    loaded: false,
  }),

  actions: {
    async updateFocusRun() {
      console.log('XXX');
    },
  },
});