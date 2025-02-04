import VueTheMask from 'vue-the-mask';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.use(VueTheMask);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
