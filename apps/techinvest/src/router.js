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
      components: { default: Landing },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/shares',
      name: 'shares',
      components: { default: Shares, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/purchase',
      name: 'purchase',
      components: { default: Purchase, header: MainNavbar }
    }
  ]
});
