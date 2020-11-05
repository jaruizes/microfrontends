import Vue from 'vue';
import axios from "axios";

export default {
    get() {
        return axios.get('/api/shares/').then((result) => {
            Vue.prototype.appconfig = result;
        });
    }
}
