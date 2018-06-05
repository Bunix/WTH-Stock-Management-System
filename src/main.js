import Vue from 'vue'

import App from './App.vue'
import router from './router'
import { store } from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'
import { firebaseConfig } from './config'

Vue.use(Vuetify)
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    })
  }
}).$mount('#app')

// Make Sign-ip/Sign-up https://coursetro.com/posts/code/139/Vue-Router-Tutorial---Using-Vue's-Router-Library
// https://medium.com/@Big.Wattanachai/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-single-page-application-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-vue-js-%E0%B9%81%E0%B8%A5%E0%B8%B0-firebase-authentication-1c8219aa77bd


