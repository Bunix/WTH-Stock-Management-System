import firebase from 'firebase'
import router from '@/router'
import { db } from '../main'

const dbName = 'Finished_Order'
const stockDb = 'In_Stock_Products'

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
  printBarcode({commit}, payload) {
    commit('setBarcodePrintLists', payload)
    router.push('/print')
  },
  printAndUpdateStock({commit}, payload) {
    
    let products = {}
    
    payload.forEach(element => {
      /* eslint-disable */
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

      db.collection(dbName).doc(element.id)
      .update({
        printStatus: true,
        inStock: true
      }).then(() => {
        console.log('Update finised')
      }).catch(function(error) {
        console.error('Error writing document: ', error);
      })
    })

    for(let key in products) {
      console.log(key)
      let docRef = db.collection('In_Stock_Products').doc(key)
      docRef.get().then(function(doc) {
        if(doc.exists) {
          console.log('Document data:', doc.data())
          db.collection('In_Stock_Products').doc(key)
          .update({
            quantity: products[key].quantity + doc.data().quantity
          })
        } else {
          db.collection('In_Stock_Products').doc(key).set({
            name: products[key].name,
            point: products[key].point,
            price: products[key].price,
            quantity: products[key].quantity
          })
          .then(function() {
            console.log('Document successfully written!');
          })
          .catch(function(error) {
            console.error('Error writing document: ', error);
            commit('setError', error.message)
          })
        }
      })
    }

    // Set instock product to state.
    router.push('/')
  },
  deleteOrder({commit}, payload) {
    payload.forEach(element => {
      db.collection(dbName).doc(element.id).delete()
      .then(function() {
        // eslint-disable-next-line
        console.log('Document successfully deleted!')
      }).catch(function(error) {
        // eslint-disable-next-line
        console.error('Error removing document: ', error)
      })
    })
    // commit('setBarcodePrintLists', payload)
  },
  deleteProducts({commit}, payload) {
    payload.forEach(element => {
      db.collection(stockDb).doc(element.sku).delete()
      .then(function() {
        // eslint-disable-next-line
        console.log('Document successfully deleted!')
      }).catch(function(error) {
        // eslint-disable-next-line
        console.error('Error removing document: ', error)
      })
    })
    // commit('setBarcodePrintLists', payload)
    // commit('setProductToStock', payload)
  },
  togglePrintStatus({commit}, payload) {
    payload.forEach(element => {
      /* eslint-disable */
      // console.log(commit)

      db.collection(dbName).doc(element.id)
      .update({
        printStatus: !element.printStatus,
      })
    })
    // commit()
  },
  inStockProduct({commit}) {
    const stockDb = db.collection('In_Stock_Products')
    let inStockProducts = []
    stockDb.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        inStockProducts.push({
          sku: doc.id,
          detail: doc.data()
        })
      })
      console.log('setProductToStock')
      // console.log(inStockProducts)
      commit('setProductToStock', inStockProducts)
    })
  }
}