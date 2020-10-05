<template>
  <div id="app">
    <Overview :locale="locale" customer="0001"/>
  </div>

</template>

<script>
  import Overview from "@/components/Overview";

  export default {
    name: 'app',
    components: {
      Overview
    },
    props: {
      locale: {
        type: String,
        default: 'en'
      },
      customer: {
        type: String
      }
    },
    data(){
      return {
        message: 'hola'
      }
    },
    computed: {},
    methods: {
    }
  }
</script>

<style scoped>
</style>
