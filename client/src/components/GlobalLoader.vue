<script setup lang="ts">
import { useGrades } from '@/hooks/useGrades';
import { useSettings } from '@/hooks/useSettings';
import { useAuthStore } from '@/store/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { loadGrades } = useGrades();
const { loadSettings } = useSettings();
onMounted(async () => {
  const loggedIn = await authStore.init();
  if (loggedIn) {
    loadGrades();
    loadSettings();
  }
});
</script>
