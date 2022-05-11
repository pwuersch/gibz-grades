import { useSettingsStore } from '@/store/settings';
import { Settings } from '@/utils/types';
import { useLoadingBar, useNotification } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useApi } from './useApi';

export const useSettings = () => {
  const router = useRouter();
  const loadingBar = useLoadingBar();
  const notification = useNotification();
  const settingsStore = useSettingsStore();
  const { settings, hasSettings } = storeToRefs(settingsStore);
  const api = useApi();

  const loadSettings = async () => {
    try {
      loadingBar.start();
      if (settings.value) {
        return loadingBar.finish();
      }

      const { data } = await api.get<Settings>('/credentials');

      settings.value = data;
      loadingBar.finish();
    } catch (err) {
      notification.warning({
        title: 'Unset Settings',
        content: 'Please set your settings credentials first',
        duration: 5 * 1000,
      });
      router.push('/settings');

      loadingBar.error();
    }
  };

  const changeSettings = async (newSettings: Settings) => {
    try {
      loadingBar.start();

      await api.post('/credentials', newSettings);

      settings.value = newSettings;
      loadingBar.finish();
    } catch (err) {
      loadingBar.error();
    }
  };

  return { settings, hasSettings, changeSettings, loadSettings };
};
