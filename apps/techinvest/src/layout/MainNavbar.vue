<template>
  <div>
  <b-navbar toggleable="lg" type="dark" class="fixed-top main-nav-bar">
    <b-navbar-brand href="#" class="font-weight-bolder text-black">Technology Broker</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#">Disabled</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>


  </div>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavItem, BCollapse, BNavbarNav, VBToggle } from "bootstrap-vue";

export default {
  name: 'main-navbar',
  directives: {
    'v-b-toggle': VBToggle
  },
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    'b-navbar': BNavbar,
    'b-navbar-brand': BNavbarBrand,
    'b-nav-item': BNavItem,
    'b-collapse': BCollapse,
    'b-navbar-nav': BNavbarNav
  }
};
</script>

<style scoped>
  .main-nav-bar {
    background-color: black;
  }
</style>
