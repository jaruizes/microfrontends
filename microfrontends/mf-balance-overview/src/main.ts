import Vue from 'vue'
import App from './App.vue'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueI18n from 'vue-i18n';

Vue.config.productionTip = false;

// Install BootstrapVue
//Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin);

/*
Vue.use(VueI18n);

const messages = {
  en: {
    summary: "Summary",
    incomes: "Incomes",
    expenses: "Expenses",
    detail: "Click to details"
  },
  es: {
    summary: "Resumen",
    incomes: "Ingresos",
    expenses: "Gastos",
    detail: "Pulsa para ver detalles"
  }
};


const i18n = new VueI18n({
  locale: 'en',
  messages: messages
});*/

new Vue({
  render: h => h(App),
  //i18n
}).$mount('#app');
