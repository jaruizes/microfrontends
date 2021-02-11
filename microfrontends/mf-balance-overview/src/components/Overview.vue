<style scoped>
    h3 {
        font-size: 4vw;
    }

    .main-title {
        font-size: 2.5vw;
        margin-bottom: 0.1em;
        color: var(--titleColor, black);
    }

    .subtitle {
        color: var(--titleColor, black);
    }

    .title {
        font-size: 1vw;
        margin-bottom: 0.1em;
        color: var(--titleColor, black) !important;
    }

    #overlay {
        background-color: #fafafa;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 999;
        opacity: 0.6;
    }

    #text{
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 50px;
        color: red;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
    }

    .card-body {
        background-color: var(--bgCardColor, white);
    }

    @media screen and (max-width: 1024px) {
        .main-title {
            font-size: 4vw;
        }

        .title {
            font-size: 2vw;
        }

        .subtitle {
            font-size: 2vw;
        }

        h3 {
            font-size: 4vw;
        }

        .header {
            line-height: 0.2em;
        }
    }
</style>

<template>
    <div>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css">

        <div id="overlay" v-bind:style="{ display: displayOverlay, height: overlayHeight + 'px', width: overlayWidth + 'px' }">
            <div id="text">Vue</div>
        </div>

        <a v-b-modal.modal-1 v-if="show">
            <div class="card text-center" ref="mainContent" >
                <div class="card-body">
                    <div class="header d-flex justify-content-md-start justify-content-lg-start justify-content-xl-center">
                        <h3 class="card-title main-title">{{ $t("summary") }}</h3>
                    </div>
                    <div class="header d-flex justify-content-md-start justify-content-lg-start justify-content-xl-center">
                        <h4 class="subtitle text-muted">({{ $t("detail") }})</h4>
                    </div>
                    <div style="padding: 0.3em">
                        <div class="d-flex justify-content-start">
                            <span class="text-muted font-italic title">{{ $t("incomes") }}</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" :aria-valuenow="this.incomes" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: incomesPercent + '%'}">{{this.incomes}} €</div>
                        </div>
                    </div>
                    <div style="padding: 0.3em">
                        <div class="d-flex justify-content-start">
                            <span class="text-muted font-italic title">{{ $t("expenses") }}</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-danger" role="progressbar" :aria-valuenow="this.expenses" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: expensesPercent + '%'}">{{this.expenses}} €</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>

        <!-- Modal -->
        <b-modal size="lg" id="modal-1" hide-header centered ok-only>
            <div style="height: 400px">
                <bar-chart style="height: 100%" :summaryData="summaryData"></bar-chart>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Vue from "vue"
    import VueI18n from "vue-i18n"
    import { BModal, VBModal } from "bootstrap-vue";
    import axios from "axios";
    import BarChart from '@/components/BarChart';


    Vue.use(VueI18n);
    export default {
        name: 'Overview',
        i18n: new VueI18n({
            locale: 'en',
            messages: {
                en: {
                    summary: "Summary",
                    incomes: "Incomes",
                    expenses: "Expenses",
                    detail: "Click to details"
                },
                es: {
                    summary: "Resumen",
                    incomes: "Ingresos",
                    expenses: "Gastos",
                    detail: "Pulsa para ver detalles"
                }
            }
        }),
        components: {
            BarChart,
            'b-modal': BModal,

        },
        directives: {
           'b-modal': VBModal
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
        watch: {
            customer: function(newVal, oldVal) {
                console.log('[mf-balance-overview] customer change: ' + newVal + ' / ' + oldVal);
                this.initData();
            }
        },
        mounted() {
            const el = document.createElement('link');
            el.setAttribute('rel', 'stylesheet');
            el.setAttribute('type', 'text/css');
            el.setAttribute('href', 'https://unpkg.com/bootstrap/dist/css/bootstrap.min.css');
            document.head.appendChild(el);

            const el2 = document.createElement('link');
            el2.setAttribute('rel', 'stylesheet');
            el2.setAttribute('type', 'text/css');
            el2.setAttribute('href', 'https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css');
            document.head.appendChild(el2);

            this.initAuth();

            console.log('[mf-balance-overview: mounted] Customer: ' + this.customer);
            if (this.customer) {
                this.initData();
            }

        },
        data() {
            return {
                summaryData: {},
                messages: {},
                incomes: 0,
                incomesPercent: 0,
                expenses: 0,
                expensesPercent: 0,
                show: false,
                displayOverlay: 'none',
                overlayHeight: 0,
                overlayWidth: 0
            };
        },
        created() {
            console.log('Customer: ' + this.customer);
            this.$i18n.locale = this.locale;
            console.log('Locale: ' + this.locale);

            const generalChannelObject = new BroadcastChannel('microfrontends');
            generalChannelObject.onmessage = (message) => {
                this.handleApplicationMessage(message.data);
            };
        },
        methods: {
            initAuth() {
                const accessToken = sessionStorage.getItem('access_token');
                if (accessToken) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                }
            },
            initData() {
                this.show = false;

                axios.get("/api/customers/" + this.customer).then((result) => {
                    console.log(result.data);
                    this.summaryData = result.data.summary;

                    this.summaryData['incomes'].forEach((income) => {
                        this.incomes += income;
                    });

                    this.summaryData['expenses'].forEach((expense) => {
                        this.expenses += expense;
                    });

                    this.show = true;
                    this.incomesPercent = (this.incomes * 100) / (this.incomes + this.expenses);
                    this.expensesPercent = (this.expenses * 100) / (this.incomes + this.expenses);
                });
            },
            handleApplicationMessage(message) {
                console.log('[mf-balance-overview] Received application message: ' + message.cmd);
                console.log(message);
                if (message.cmd === 'changeLocale') {
                    //this.locale = message.payload.locale;
                    this.$i18n.locale = message.payload.locale;
                }

                if (message.cmd === 'showMFDetail') {
                    this.overlayHeight = this.$refs.mainContent.clientHeight;
                    this.overlayWidth = this.$refs.mainContent.clientWidth;
                    this.displayOverlay = 'block';
                }

                if (message.cmd === 'hideMFDetail') {
                    this.displayOverlay = 'none';
                }
            }
        }
    }
</script>
