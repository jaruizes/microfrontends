/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import Keycloak from "keycloak-js";
import { BootstrapVue } from 'bootstrap-vue'
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

let initOptions = {
  url: 'http://localhost:8100/auth',
  realm: 'microfrontends',
  clientId: 'broker-app'
};

const keycloak = Keycloak(initOptions);
keycloak.init().then((auth) => {
  if (auth) {
    console.log("Authenticated");
    router.push({ name: 'shares'});
  }
});
Vue.prototype.$keycloak = keycloak;

Vue.use(NowUiKit);
Vue.use(BootstrapVue);


Vue.config.ignoredElements = [
  'items-table',
  'mf-accounts-summary',
  'account-overview'
];

/*router.beforeEach((to, from, next) => {
  if (to.path === '/shares' || to.path === '/purchase') {
    if (Vue.prototype.$keycloak.authenticated) {
      next();
    } else {
      next('/');
    }

    return;
  } else {
    next();
  }
});*/

function initApp() {
  return new Promise(resolve => {
    axios.get('/api/config/broker-app-config').then((result) => {
      Vue.prototype.$appconfig = result;
      resolve();
    });
  })
}

function createApp() {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
}

initApp().then(createApp);
