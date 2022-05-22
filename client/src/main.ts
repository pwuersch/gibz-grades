import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createAuth0 } from '@auth0/auth0-vue';

import App from '@/App.vue';
import { createRouter } from '@/utils/router';

const app = createApp(App);

app.use(createPinia());
app.use(createRouter(app));
app.use(
  createAuth0({
    domain: 'wuersch-org.eu.auth0.com',
    client_id: 'b7P5BcmURWMzKu7G84vz9JicoJgHvqgP',
    redirect_uri: window.location.origin,
    cacheLocation: 'localstorage',
  })
);

app.mount('#app');
