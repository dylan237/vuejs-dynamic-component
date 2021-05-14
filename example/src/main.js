import Vue from 'vue'
import App from './App.vue'
import { createPopup } from "./dynamic-components.js";

Vue.prototype.$popup = createPopup;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
