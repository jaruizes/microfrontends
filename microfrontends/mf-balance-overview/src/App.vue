<template>
  <div id="app">
    <Overview :locale="locale"/>
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
