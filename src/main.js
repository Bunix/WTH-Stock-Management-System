import Vue from 'vue'

import App from './App'
import router from './router'
import { store } from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueFire from 'vuefire'
import 'firebase/firestore'
import firebase from 'firebase'
// import { firebaseConfig } from './config'
import VueBarcodeScanner from 'vue-barcode-scanner'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(VueBarcodeScanner)
Vue.use(VueAxios, axios)
// firebase.initializeApp(firebaseConfig)

// export const db = firebase.firestore()
// export const dbStock = 'sd'
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// db.settings(settings);
const firestore = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true}
firestore.settings(settings)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      } else {
        store.dispatch('returnLogin', firebaseUser)
      }
    })
  }
}).$mount('#app')

// Make Sign-ip/Sign-up https://coursetro.com/posts/code/139/Vue-Router-Tutorial---Using-Vue's-Router-Library
// https://medium.com/@Big.Wattanachai/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-single-page-application-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-vue-js-%E0%B9%81%E0%B8%A5%E0%B8%B0-firebase-authentication-1c8219aa77bd


