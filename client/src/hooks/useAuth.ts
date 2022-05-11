import { useAuthStore } from '@/store/auth';
import { reactive, ref } from 'vue';

export const useAuth = () => {
  const authStore = useAuthStore();

  const onAuthCallbacks = reactive<(() => unknown)[]>([]);
  const hasExecuted = ref(false);

  const onAuth = (callback: () => unknown) => {
    onAuthCallbacks.push(callback);
    stateChecker(authStore.$state);
  };

  const stateChecker = async (state: typeof authStore.$state) => {
    if (state.profile && !hasExecuted.value) {
      hasExecuted.value = true;
      onAuthCallbacks.forEach((callback) => callback());
    }
  };

  authStore.$subscribe(async (_, state) => await stateChecker(state));

  return {
    onAuth,
  };
};
