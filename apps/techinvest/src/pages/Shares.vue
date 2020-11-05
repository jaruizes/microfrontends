<template>

  <div class="shares">
    <div class="section">
      <div class="container">
        <div class="card text-center">
          <div class="card-body" v-if="showShares">
            <items-table v-load-component="itemTable"
                         header="IBEX 35"
                         v-bind:items.prop="shares.items"
                         v-on:itemClick="handleItemClick"
                         ref="itemstable">
            </items-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import axios from "axios";

export default {
  name: 'shares',
  bodyClass: 'profile-page',
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.showShares = false;
      axios.get('/api/shares/').then((result) => {
        console.log(result.data);
        result.data.forEach((share) => {
          const item = {
            id: share.short,
            header: share.market,
            title1: share.name,
            subtitle1: share.percent + '%',
            title2: share.value + ' €'
          };

          this.shares.items.push(item);
        });

        this.showShares = true;
      });
    },
    handleItemClick(event) {
      this.$router.push({ path: 'purchase', query: { short: event.detail.id } })
    }
  },
  data() {
    return {
      showShares: false,
      shares: {
        items: []
      },
      itemTable: {
        url: '/uicomponents/items-table/v1/items-table.esm.js',
        isModule: true
      }
    };
  },
  mounted() {

  }
};
</script>
<style>
  .section {
    background-color: black !important;
  }
  .card-body {
    background-color: #121212;
    border-color: #121212;
    --maintitleColor: white;
    --headerColor: white;
    --title1Color: white;
    --title2Color: white;
    --borderColor: white;
    --subtitle1Color: white;
    --subtitle2Color: white;
    --bgColor: #121212.;
    --borderColor: #2d2d2d;
    --hoverItemColor: black;
  }


</style>
