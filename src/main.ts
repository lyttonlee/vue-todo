import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'animate.css';
import 'normalize.css';
import './registerServiceWorker';

import Notify from './components/notify/Notify.js'

Vue.prototype.$notify = Notify
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
