import Vue from 'vue'
import App from './App.vue'
import '../src/assets/font/fontawesome-5.15.1/css/all.min.css'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'



Vue.config.productionTip = false

import './styles/components/checkbox.css'
import './styles/components/radio_button.css'
import './styles/components/table.css'
import './styles/components/button.css'
import './styles/components/color.css'



Vue.use(Vuelidate)
Vue.use(VueRouter)

import EmployeeList from './components/view/employee/employeeList.vue'
import GeneralTest from './components/view/general/generalTest.vue'

const routes =[
  {path:  '/employee', component: EmployeeList},
  {path: '/generaltest', component: GeneralTest},
]

const router = new VueRouter({
  routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
