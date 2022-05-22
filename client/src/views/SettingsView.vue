<script setup lang="ts">
import { NButton } from 'naive-ui';
import SettingsEditor from '@/components/SettingsEditor.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

const login = async () => {
  await loginWithRedirect();
};

const endSession = async () => {
  await logout();
};
</script>
<template>
  <settings-editor v-if="isAuthenticated" />
  <n-button v-if="!isAuthenticated" type="info" @click="login">Login</n-button>
  <n-button v-else type="info" @click="endSession">Logout</n-button>
</template>
