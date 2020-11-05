<template>
  <div>
    <div class="page-header page-header-small" style="background-image: url('img/shares.jpg')">
      <div
        class="page-header-image"
        style="background-image: url('img/shares.jpg')"
      >
      </div>
      <div class="content-center">
        <div class="container">
          <h1 class="title">Technology Broker</h1>
          <div class="text-center">
            <b-button variant="danger" size="lg" @click="login" class="login-button">Login</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">Invest in Technology</h2>
            <h5 class="description">
              Technology stocks offer investors a lot of opportunities. In fact, the sector offered the highest returns of all ranked market sectors at 34.28% in 2017.
              Those strong returns, however, do not mean the technology sector is without risks. Technology changes quickly, and one-time leaders can quickly fall behind, or even go out of business. In addition, promising emerging companies may make a huge splash, only to fade out quickly.
              Technology is an exciting space that includes trends from artificial intelligence (AI), to smartphones, blockchain, self-driving technologies, the ongoing to trend to software-as-a-service (SaaS), the Internet of Things (IoT), streaming media services, and more. It's an area full of opportunity, but also some risk.
            </h5>
          </div>
        </div>
        <div class="separator separator-primary"></div>
      </div>
    </div>
    <div class="section section-team text-center">
      <div class="container">
        <h2 class="title">Here is our team</h2>
        <div class="team">
          <div class="row">
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="img/captain.png"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"
                />
                <h4 class="title">CAPTAIN AMERICA</h4>
                <p class="description">
                  Recipient of the Super-Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world’s mightiest heroes and the leader of the Avengers.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="img/ironman.png"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"/>
                <h4 class="title">IRONMAN</h4>
                <p class="description">
                  Inventor Tony Stark applies his genius for high-tech solutions to problems as Iron Man, the armored Avenger.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="img/thanos.png"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"
                />
                <h4 class="title">Thanos</h4>
                <p class="description">
                  Using the power of the Infinity Stones, Thanos believes he can ultimately save the universe by wiping out half of its population.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { BButton } from "bootstrap-vue";

export default {
  name: 'landing',
  bodyClass: 'landing-page',
  components: {
    'b-button': BButton,
  },
  data() {
    return {
      form: {
        firstName: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    login() {
      console.log('--------------');
      this.$keycloak.login({
        redirectUri: window.location.origin + '/profile'
      });

      //VueKeycloakJs.login()
    }
  }
};
</script>
<style>
  .description {
    color: white !important;
    font-weight: 900;
  }

  .login-button {
    font-weight: 900;
  }
</style>
