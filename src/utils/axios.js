import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = 'http://127.0.0.1:8080'

Vue.use(VueAxios,axios);