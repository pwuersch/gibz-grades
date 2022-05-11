import { defineStore } from 'pinia';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { config } from '@/utils/config';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    profile: null as KeycloakProfile | null,
    keycloak: Keycloak({
      clientId: config.keycloak.clientId,
      realm: config.keycloak.realm,
      url: config.keycloak.url,
    }),
  }),
  getters: {
    authenticated: (state) => !!state.profile,
  },
  actions: {
    async init() {
      await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      });

      if (this.keycloak.authenticated) {
        this.profile = await this.keycloak.loadUserProfile();
        return true;
      } else {
        return false;
      }
    },
    async login() {
      await this.keycloak?.login();
    },
    async logout() {
      await this.keycloak.logout();
    },
  },
});
