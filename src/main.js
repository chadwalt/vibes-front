
import './../node_modules/bulma/css/bulma.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.css';

import * as bulma from 'bulma';

import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');