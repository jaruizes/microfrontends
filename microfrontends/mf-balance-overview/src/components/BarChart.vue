<script>
    import { Bar } from 'vue-chartjs'

    export default {
        extends: Bar,
        props: {
            summaryData: {
                type: Object
            }
        },
        data() {
            return {
                chartData: {
                    labels: this.summaryData.dates,
                    datasets: [
                        {
                            label: this.$i18n.t('incomes'),
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            data: this.summaryData.incomes
                        },
                        {
                            label: this.$i18n.t('expenses'),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 0.2)',
                            data: this.summaryData.expenses
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: false,
                            categoryPercentage: 0.5,
                            barPercentage: 1
                        }],
                        yAxes: [{
                            stacked: false
                        }]
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            console.log(this.chartData);
            this.renderChart(this.chartData, this.options)
        }
    }
</script>
