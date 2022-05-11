import { Grade } from '@/utils/types';
import { defineStore } from 'pinia';

export const useGradesStore = defineStore('grades', {
  state: () => ({
    grades: [] as Grade[],
  }),
  actions: {
    setGrades(grades: Grade[]) {
      this.grades = grades;
    },
  },
});
