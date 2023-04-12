import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./core/services/index";
import ApiService from "./core/services/api.service";
import mixin from "@/core/mixin/index";
Vue.config.productionTip = false;
// Global 3rd party plugins
import i18n from "./core/plugins/vue-i18n";
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// As a plugin
import VueMask from 'v-mask'
Vue.use(VueMask);

// API service init
ApiService.init();

Vue.config.devtools = true;

// set the current language for i18n.
let language = store.getters.language;
i18n.locale = 'tr' ;
Vue.mixin({
  ...mixin,
});
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");