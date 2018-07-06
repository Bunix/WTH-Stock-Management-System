import firebase from 'firebase'
import router from '@/router'
import db from '../firebaseInit'
// import { db } from '../main'

// Set database collection name
const orderDb = 'Order_Db'
const inStockDb = 'In_Stock_Products'

export const actions = {/* eslint-disable */
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
        router.push('/')
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
    router.push('/')
  },
  generateBarcode({commit}, payload) {
    commit('setBarcodeLists', payload)
    router.push('/barcode')
  },
  updateStock({commit}, payload) {
    
    let products = {}
    const ref = db.collection(orderDb)
    const refInstock = db.collection(inStockDb)
    
    payload.forEach(element => {

      let skuLists = Object.keys(element.checkOutInformation)

      skuLists.forEach((sku) => {
        if(products[sku] === undefined) {
          products[sku] = {
            name: element['checkOutInformation'][sku].name,
            point: element['checkOutInformation'][sku].point,
            price: element['checkOutInformation'][sku].price,
            quantity: element['checkOutInformation'][sku].quantity
          }
        } else {
          products[sku].quantity += element['checkOutInformation'][sku].quantity
        }
      })

      ref
      .doc(element.id)
      .update({
        printStatus: true,
        inStock: true
      }).then(() => {
        console.log('Update finised')
      }).catch(error => {
        console.error('Error writing document: ', error);
      })
    })

    
    for(let key in products) {

      let refInstockDoc = refInstock.doc(key)
      
      refInstockDoc
      .get()
      .then(doc => {
        if(doc.exists) {
          console.log('Document data:', doc.data())
          refInstockDoc
          .update({
            quantity: products[key].quantity + doc.data().quantity
          })
        } else {
          refInstockDoc
          .set({
            name: products[key].name,
            point: products[key].point,
            price: products[key].price,
            quantity: products[key].quantity
          })
          .then(function() {
            console.log('Document successfully written!');
          })
          .catch(error => {
            console.error('Error writing document: ', error);
            commit('setError', error.message)
          })
        }
      })
    }
    router.push('/')
  },
  generateInvoice({commit}, payload) {
    // console.log(payload)
    let invoiceLists = []
    payload.forEach( order => {
      invoiceLists.push(order)
    })
    // console.log(invoiceLists)
    commit('setInvoiceLists', invoiceLists)
    router.push('/invoice')
  },
  printInvoice() {
    return
  },
  deleteOrder({commit}, payload) {

    const ref = db.collection(orderDb)

    payload.forEach(element => {
      ref
      .doc(element.id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!')
      }).catch(error => {
        console.error('Error removing document: ', error)
        commit('setError', error.message)
      })
    })
  },
  deleteProducts({commit}, payload) {

    const ref = db.collection(inStockDb)

    payload.forEach(element => {
      ref
      .doc(element.id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
      }).catch(error => {
        console.error('Error removing document: ', error)
        commit('setError', error.message)
      })
    })

  },
  setPrintStatus({commit}, payload) {

    const ref = db.collection(orderDb)

    payload.forEach(element => {
      ref
      .doc(element.id)
      .update({
        printStatus: !element.printStatus,
      })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch(error => {
        console.error('Error update document: ', error)
        commit('setError', error.message)
      })
    })

  }
}