<script setup lang="ts">
import { useGrades } from '@/hooks/useGrades';
import { useSettings } from '@/hooks/useSettings';
import { useAuth0 } from '@auth0/auth0-vue';
import { onMounted } from 'vue';

const { loadGrades } = useGrades();
const { loadSettings } = useSettings();
const { isAuthenticated } = useAuth0();

onMounted(async () => {
  if (isAuthenticated.value) {
    loadGrades();
    loadSettings();
  }
});
</script>
