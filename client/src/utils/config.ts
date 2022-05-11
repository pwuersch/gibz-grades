export const config = {
  apiUrl: String(import.meta.env.VITE_API_URL || ''),
  keycloak: {
    clientId: String(import.meta.env.VITE_KC_CLIENT_ID),
    realm: String(import.meta.env.VITE_KC_REALM),
    url: String(import.meta.env.VITE_KC_URL),
  },
};
