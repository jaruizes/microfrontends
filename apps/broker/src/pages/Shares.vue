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
    console.log(this.$keycloak);
    this.initData();
  },
  methods: {
    initData() {
      this.showShares = false;
      this.getShares().then(() => {
        this.showShares = true;
      });
    },
    handleItemClick(event) {
      this.$router.push({ path: 'purchase', query: { short: event.detail.id } })
    },
    getShares() {
      return new Promise((resolve) => {
        const apiGoogleSheets = 'https://sheets.googleapis.com/v4/spreadsheets/1o_XQkHbCVIxVdvXAydPP6fce0S_mkuVrwfMMYzLaYlw/values/Sheet1?alt=json&key=AIzaSyCMtJZHXtAZTVkvTz2TEbOAiBFBbbYO3Tc';
        axios.get(apiGoogleSheets).then((result) => {
          const entries = result.data['values'];
          entries.forEach((entry) => {
            const item = {
              id: entry['gsx$_cn6ca']['$t'],
              header: 'CONTINUO',
              title1: entry['gsx$_cokwr']['$t'],
              subtitle1: entry['gsx$_chk2m']['$t'] + ' %',
              title2: entry['gsx$_cpzh4']['$t'] + ' €'
            };

            this.shares.items.push(item);
          });

          resolve();
        });
      });
    }
  },
  data() {
    return {
      showShares: false,
      shares: {
        items: []
      },
      itemTable: {
        url: this.$appconfig.data['uicomponents']['items-table'],
        isModule: true
      }
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.getShares();
    }, 5000);
  }
};
</script>
<style>
  .shares {
    padding-top: 5rem;
  }
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

  @media screen and (max-width: 767px) {
    .main-title {
      font-size: 4.5vw;
    }

    .shares {
      padding-top: 1.2rem;
    }

    .card-body {
      padding-top: 0px;
    }
  }


</style>
