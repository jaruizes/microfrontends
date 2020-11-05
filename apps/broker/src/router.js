import Vue from 'vue';
import Router from 'vue-router';
import Landing from './pages/Landing.vue';
import Shares from './pages/Shares.vue';
import MainNavbar from './layout/MainNavbar.vue';
import Purchase from "./pages/Purchase";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Landing }
    },
    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing }
    },
    {
      path: '/shares',
      name: 'shares',
      components: { default: Shares, header: MainNavbar }
    },
    {
      path: '/purchase',
      name: 'purchase',
      components: { default: Purchase, header: MainNavbar }
    }
  ]
});
