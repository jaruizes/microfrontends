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

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

let initOptions = {
  url: 'http://localhost:8100/auth',
  realm: 'microfrontends',
  clientId: 'customers-app'
};

const keycloak = Keycloak(initOptions);
keycloak.init();
Vue.prototype.$keycloak = keycloak;

Vue.use(NowUiKit);
Vue.use(BootstrapVue);


Vue.config.ignoredElements = [
  'items-table',
  'mf-accounts-summary',
  'account-overview'
];

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
