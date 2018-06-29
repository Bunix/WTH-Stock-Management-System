import firebase from 'firebase'
import router from '@/router'
import { db } from '../main'


export const actions = {
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', firebaseUser)
        commit('setLoading', false)
        router.push('/')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  userSignIn({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', firebaseUser)
        commit('setLoading', false)
        commit('setError', null)
        router.push('/finished')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  autoSignIn({commit}, payload) {
    commit('setUser', payload)
  },
  userSignOut({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/login')
  },
  returnLogin() {
    router.push('/login')
  },
  returnHome() {
    router.push('/finished')
  },
  printBarcode({commit}, payload) {
    commit('setBarcodePrintLists', payload)
    router.push('/print')
  },
  updatePrintStatus({commit}, payload) {
    payload.forEach(element => {
      db.collection('Finished_Order').doc(element.id)
      .update({
        printStatus: true
      })
    })
    commit('setProductInStock', payload)
    router.push('/finished')
  }
}