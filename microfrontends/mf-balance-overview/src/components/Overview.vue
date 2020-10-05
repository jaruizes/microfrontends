<style scoped>

</style>

<template>
    <div>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css">

        <a v-b-modal.modal-1 v-if="show">
            <div class="card text-center" >
                <div class="card-body">
                    <h5 class="card-title">{{ $t("summary") }}
                        <span class="text-black-50 font-italic">({{ $t("detail") }})</span>
                    </h5>
                    <div style="padding: 0.3em">
                        <div class="d-flex justify-content-start">
                            <span class="text-muted font-italic">{{ $t("incomes") }}</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" :aria-valuenow="this.incomes" aria-valuemin="0" aria-valuemax="100" style="width: 60%">{{this.incomes}} €</div>
                        </div>
                    </div>
                    <div style="padding: 0.3em">
                        <div class="d-flex justify-content-start">
                            <span class="text-muted font-italic">{{ $t("expenses") }}</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-danger" role="progressbar" :aria-valuenow="this.expenses" aria-valuemin="0" aria-valuemax="100" style="width: 40%">{{this.expenses}} €</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>

        <!-- Modal -->
        <b-modal size="lg" id="modal-1" hide-header centered cancel-disabled>
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
        },
        data() {
            return {
                summaryData: {},
                messages: {},
                incomes: 0,
                expenses: 0,
                show: false
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
                });
            },
            handleApplicationMessage(message) {
                console.log('[mf-balance-overview] Received application message: ' + message.cmd);
                console.log(message);
                if (message.cmd === 'changeLocale') {
                    //this.locale = message.payload.locale;
                    this.$i18n.locale = message.payload.locale;
                }
            }
        }
    }
</script>
