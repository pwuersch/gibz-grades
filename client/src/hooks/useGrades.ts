import { useGradesStore } from '@/store/grades';
import { Grade } from '@/utils/types';
import { useLoadingBar } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useApi } from './useApi';

export const useGrades = () => {
  const api = useApi();
  const loadingBar = useLoadingBar();
  const gradesStore = useGradesStore();
  const { grades } = storeToRefs(gradesStore);

  const loadGrades = async () => {
    try {
      loadingBar.start();

      const { data } = await api.get<{ grades: Grade[] }>(`/grades`);
      gradesStore.setGrades(data.grades);

      loadingBar.finish();
    } catch {
      loadingBar.error();
    }
  };

  const forceRescrape = async () => {
    try {
      loadingBar.start();

      const { data } = await api.get<{ grades: Grade[] }>('/grades/manual');
      gradesStore.setGrades(data.grades);

      loadingBar.finish();
    } catch {
      loadingBar.error();
    }
  };

  return {
    grades,
    loadGrades,
    forceRescrape,
  };
};
