import Vue from 'vue'
import App from './App.vue'
import '../src/assets/font/fontawesome-5.15.1/css/all.min.css'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

// import vuetify from './plugins/vuetify' // path to vuetify export


Vue.config.productionTip = false

import './styles/components/checkbox.css'
import './styles/components/radio_button.css'
import './styles/components/table.css'
import './styles/components/button.css'
import './styles/components/color.css'


Vue.use(Vuelidate)
Vue.use(VueRouter)

import TeacherList from './components/view/teacher/teacherList.vue'
import GeneralTest from './components/view/general/generalTest.vue'

const routes =[
  {path:  '/teacher', component: TeacherList},
  {path: '/generaltest', component: GeneralTest},
]

const router = new VueRouter({
  routes
})


new Vue({
  // vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
