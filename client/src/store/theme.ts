import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: true,
  }),
  actions: {
    switch() {
      this.darkMode = !this.darkMode;
    },
  },
});
