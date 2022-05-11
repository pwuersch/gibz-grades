import { ref, Ref, UnwrapRef, watch } from 'vue';

interface Props<T> {
  key: string;
  initialValue: T;
}

export const useCachedRef = <T>({
  initialValue,
  key,
}: Props<T>): Ref<UnwrapRef<T>> => {
  const cachedValue = localStorage.getItem(key);
  if (cachedValue) {
    initialValue = JSON.parse(cachedValue);
  }

  const r = ref<T>(initialValue);

  watch(r, () => {
    localStorage.setItem(key, JSON.stringify(r.value));
  });

  return r;
};
