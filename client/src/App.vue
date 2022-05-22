<script setup lang="ts">
import { h, Component, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import {
  NConfigProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  NMenu,
  NIcon,
  NGlobalStyle,
  NPageHeader,
  darkTheme,
  lightTheme,
} from 'naive-ui';
import { MenuMixedOption } from 'naive-ui/lib/menu/src/interface';
import { useThemeStore } from '@/store/theme';
import { storeToRefs } from 'pinia';
import {
  HomeOutline as HomeIcon,
  SettingsOutline as SettingsIcon,
} from '@vicons/ionicons5';
import GlobalLoader from './components/GlobalLoader.vue';

const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore);
const theme = computed(() => (darkMode.value ? darkTheme : lightTheme));

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const menuOptions: MenuMixedOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Home' }),
    key: 'home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(RouterLink, { to: '/settings' }, { default: () => 'Settings' }),
    key: 'settings',
    icon: renderIcon(SettingsIcon),
  },
];
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-loading-bar-provider>
      <n-notification-provider>
        <global-loader />
        <n-page-header />
        <n-menu mode="horizontal" :options="menuOptions" />
        <br />
        <router-view />
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
