import { Settings } from '@/utils/types';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null as Settings | null,
  }),
  getters: {
    hasSettings: (state) => {
      return !!state.settings;
    },
  },
  actions: {
    setSettings(settings: Settings) {
      this.settings = settings;
    },
  },
});
