<template>
  <div>
    <items-table v-load-component="itemTable"
                 header="Valores"
                 v-bind:items.prop="shares.items"
                 v-on:itemClick="handleItemClick"
                 ref="itemstable">
    </items-table>
  </div>

</template>
<script>


export default {
  props: {
    shares: {
      type: Object
    }
  },
  components: {},
  methods: {
    handleItemClick(event) {
      console.log(event.detail);
    }
  },
  data() {
    return {
      itemTable: {
        url: '/uicomponents/items-table/v1/items-table.esm.js',
        isModule: true
      },
      showItems: false
    }
  },
  mounted() {
    //this.$refs.itemstable.items = this.shares.items;
  }

};
</script>
<style></style>
