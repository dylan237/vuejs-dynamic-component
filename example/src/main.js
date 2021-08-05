import Vue from 'vue'
import App from './App.vue'
import VueDynamicComponent from "../../dist/index";
import components from './config'
Vue.use(new VueDynamicComponent(), components)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
