import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { store } from './store/store'
import axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'LoginPage' && !store.getters.loggedIn) next({ name: 'LoginPage' })
  else next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
