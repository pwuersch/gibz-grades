<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { NButton } from 'naive-ui';
import SettingsEditor from '@/components/SettingsEditor.vue';

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore);

const login = async () => {
  await authStore.login();
};

const logout = async () => {
  await authStore.logout();
};
</script>
<template>
  <settings-editor v-if="authenticated" />
  <n-button v-if="!authenticated" type="info" @click="login">Login</n-button>
  <n-button v-else type="info" @click="logout">Logout</n-button>
</template>
