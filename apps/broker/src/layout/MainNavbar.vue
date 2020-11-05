<template>
  <div>
  <b-navbar toggleable="lg" type="dark" class="fixed-top main-nav-bar">
    <b-navbar-brand href="#" class="font-weight-bolder text-black"><h1 class="main-title">Technology Broker</h1></b-navbar-brand>

  </b-navbar>


  </div>
</template>

<script>
import { BNavbar, BNavbarBrand} from "bootstrap-vue";

export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    'b-navbar': BNavbar,
    'b-navbar-brand': BNavbarBrand
  }
};
</script>

<style scoped>
  .main-nav-bar {
    background-color: black;
  }
</style>
