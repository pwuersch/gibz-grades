import { createAuthGuard } from '@auth0/auth0-vue';
import { App } from 'vue';
import { createRouter as createVueRouter, createWebHistory } from 'vue-router';

export const createRouter = (app: App) =>
  createVueRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/settings',
        component: () => import('@/views/SettingsView.vue'),
      },
      {
        path: '/useless',
        component: () => import('@/views/UselessView.vue'),
        beforeEnter: createAuthGuard(app),
      },
      {
        path: '/:catchAll(.*)',
        redirect: '/',
      },
    ],
  });
