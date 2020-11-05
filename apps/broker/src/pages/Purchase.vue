<template>

  <div class="purchase">
    <div class="section">
      <div class="container">
        <!-- Share -->
        <div class="card">
          <div class="card-title text-center">
            <h3>{{share.name}}</h3>
          </div>
          <div class="card-body share-info">
            <div class="container-fluid">
              <div class="row ">
                <div class="col-7 ">
                  <h5 class="header">Value</h5>
                  <h4 class="value">{{share.value}} €</h4>

                </div>
                <div class="col-5 ">
                  <h5 class="header">Percent</h5>
                  <h4 class="value">{{share.percent}} %</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-center" v-if="!isAccountSelected">
            <b-button variant="primary" v-b-modal="'modal-1'" class="btn-lg buy-button">Comprar</b-button>
          </div>
        </div>

        <!-- Account selected -->
        <div class="card" v-if="isAccountSelected">
          <div class="card-body account-selected">
            <account-overview v-load-component="accountsOverviewURL"
                              locale="es"
                              :number="accountSelected.number"
                              :name="accountSelected.name"
                              :lastmovement="accountSelected.lastmovement"
                              :newmovements="accountSelected.newmovements"
                              :amount="accountSelected.amount">
            </account-overview>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-6 m-auto">
                  <b-form>
                    <b-form-group
                            id="input-group-1"
                            label="Número de títulos"
                            label-for="input-1"
                            description="Introduce el número de títulos que quiere comprar">
                      <b-form-input
                              size="lg"
                              id="input-1"
                              v-model="form.shares"
                              type="number"
                              required
                              placeholder="Número de títulos">
                      </b-form-input>
                    </b-form-group>
                  </b-form>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <b-button variant="primary" v-b-modal="'modal-2'" class="buy-button">Comprar</b-button>
            <b-button variant="secondary" v-on:click="cancelProcess" class="buy-button">Cancelar</b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <b-modal size="xl" id="modal-1" ref="modal-1" hide-header centered hide-footer class="buy-modal">
      <div class="card">
        <div class="card-body">
          <mf-accounts-summary v-load-component="accountsSummaryURL"
                               v-bind:channel="channel"
                               :locale="locale"
                               customer="0001">
          </mf-accounts-summary>
        </div>
      </div>
    </b-modal>

    <b-modal size="lg" id="modal-2" ref="modal-2" hide-header centered hide-footer>
      <div class="d-block text-center">
        <h3 class="title-modal2">Compra realizada correctamente</h3>
      </div>
      <b-button class="final-button" block @click="goToSharesHome">Ir a Home de Acciones</b-button>
    </b-modal>

  </div>
</template>
<script>

import axios from "axios";
import { BButton, BModal, VBModal, BForm, BFormGroup, BFormInput } from "bootstrap-vue";

export default {
  name: 'purchase',
  bodyClass: 'profile-page',
  components: {
    'b-modal': BModal,
    'b-button': BButton,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput
  },
  directives: {
    'b-modal': VBModal
  },
  props: ['short'],
  created() {
    console.log('Short: ' + this.$route.query.short);
    this.initData();

    const dedicatedChannelObject = new BroadcastChannel(this.channel);
    dedicatedChannelObject.onmessage = (message) => {
      this.handleAccountClick(message.data.payload.detail);
    };
  },
  methods: {
    initData() {
      this.showShares = false;
      axios.get('/api/shares/').then((result) => {
        this.share = result.data.filter(share => share.short === this.$route.query.short)[0];
        this.showShares = true;
      });
    },
    handleItemClick(event) {
      console.log(event.detail);
    },
    handleAccountClick(account) {
      this.accountSelected = account;
      this.isAccountSelected = true;
      this.$refs['modal-1'].hide()
    },
    cancelProcess() {
      this.isAccountSelected = false;
    },
    goToSharesHome() {
      this.$router.push({ name: 'shares'});
    },
    goToGlobalPosition() {
      window.location = 'http://elmundo.com';
    }
  },
  data() {
    return {
      showShares: false,
      share: {},
      channel: 'mf-purchase',
      accountsSummaryURL: {
        url: this.$appconfig.data['microfrontends']['accounts-summary']
      },
      accountsOverviewURL: {
        url: this.$appconfig.data['microfrontends']['accounts-overview'],
        isModule: true
      },
      accountSelected: {},
      isAccountSelected: false,
      form: {
        shares: 0
      },
      locale: 'es'
    };
  }
};
</script>
<style>
  .purchase {
    height: 100vh;
    background-color: black !important;
    padding-top: 5rem;
  }
  .section {
    background-color: black !important;
    color: white;
  }

  .card {
    background-color: #121212 !important;
    border-color: #121212;
  }

  .final-button {
    font-size: 2vw;
  }

  #modal-1 .modal-content {
    background-color: #121212 !important;
    border-color: #121212;
    --titleColor: white;
    --bgCardColor: #121212;
    --accountsBgColor: black;
    --accountsTitleColor: white;
    --accountsNumberColor: white;
    --accountsBalanceColor: white;
    --accountsNewMovementsColor: black;
    --accountsMovementsHeaderColor: black;
    --accountsBalanceHeaderColor: #121212;
    --accountsLastMovementsTextColor: black;
  }

  #modal-2 .modal-content {
    background-color: purple !important;
    border-color: #121212;
  }

  .account-selected {
    --accountBgColor: black;
    --accountTitleColor: white;
    --accountNumberColor: white;
    --accountBalanceColor: white;
    --accountNewMovementsColor: black;
    --accountMovementsHeaderColor: black;
    --accountBalanceHeaderColor: #121212;
    --accountLastMovementsTextColor: black;
  }

  .card-title h3 {
    font-size: 3vw;
    font-weight: 600;
    padding-top: 1rem;
  }

  .title-modal2 {
    color: white;
  }

  .header {
    color: white;
    font-size: 1vw;
    font-weight: 600;
  }

  .value {
    color: white;
    font-size: 2vw;
    font-weight: 600;
  }

  .share-info {
    width: 70%;
    margin: auto;
  }

  .buy-button {
    font-weight: 600 !important;
  }
</style>
