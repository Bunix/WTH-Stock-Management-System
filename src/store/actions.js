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
  generateBarcodeProduct({commit}, payload) {
    commit('setBarcodeLists', payload)
    router.push('/barcodeproduct')
  },
  updateStock({commit}, payload) {
    
    let products = {}
    const ref = db.collection(orderDb)
    const refInstock = db.collection(inStockDb)
    
    payload.forEach(element => {

      // let skuLists = Object.keys(element.checkOutInformation)
      let itemLists = element.items
      // console.log(itemLists)
      let skuLists = itemLists.map((order) => {
        return [order.product_number, order.product_name, order.product_quantity, order.product_manufacturer]
      })

      // console.log(skuLists)

      skuLists.forEach((sku) => {
        // console.log(sku[3])
        if(products[sku[0]] === undefined) {
          
          products[sku[0]] = {
            name: sku[1],
            // point: element['checkOutInformation'][sku].point,
            // price: element['checkOutInformation'][sku].price,
            brand: sku[3],
            quantity: sku[2]
          }
        } else {
          products[0].quantity += sku[2]
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

    console.log(products)
    
    for(let key in products) {
      // console.log(key)

      let refInstockDoc = refInstock.doc(key)
      // console.log(products)
      
      refInstockDoc
        .get()
        .then(doc => {
          if(doc.exists) {
            console.log('Document data:', doc.data())
            refInstockDoc
            .update({
              quantity: parseInt(products[key].quantity) + parseInt(doc.data().quantity)
            })
          } else {
            refInstockDoc
            .set({
              name: products[key].name,
              // point: products[key].point,
              brand: products[key].brand,
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

  },
  setPaidDate({commit}, payload) {

    const ref = db.collection(orderDb)

    payload.forEach(element => {
      ref
        .doc(element.id)
        .update({
          paidDate: element.paidDate,
        })
        .then(() => {
          console.log('Document successfully updated!')
        })
        .catch(error => {
          console.error('Error update document: ', error)
          commit('setError', error.message)
        })
    })

  },
  setShelf({commit}, payload) {
    const refInstock = db.collection(inStockDb)
    let refInstockDoc = refInstock.doc(payload.id)

    refInstockDoc
    .set({
      name: payload.name,
      brand: payload.brand,
      quantity: payload.quantity,
      shelf: payload.shelf
    })
    .then(function() {
      console.log('Document successfully written!');
    })
    .catch(error => {
      console.error('Error writing document: ', error);
      commit('setError', error.message)
    })
  },
  setShelfLists({commit}, payload) {
    // const orderRef = db.collection('Order_Db')
    const stockRef = db.collection('In_Stock_Products')
    stockRef
      .get()
      .then(qerySnapshot => {
        const shelfLists = {}
        qerySnapshot.docs.forEach((doc) => {
          shelfLists[doc.id] = doc.data().shelf || '-'
        })
        // console.log(shelfLists)
        commit('setShelfLists', shelfLists)
      })

    //     payload.forEach((order) => {
    //       if(order.printStatus === true) {
    //         const shelfArr = []
    //         order.items.forEach(item => {
    //           console.log(item)
    //           // shelfArr.push(shelfLists[item.product_number])
    //           // if(item.shelf === undefined) {
    //           //   console.log('shelf not Founded')
    //           //   shelfArr.push(shelfLists[item.product_number])
    //           // }
    //         })
    //         // console.log(shelfArr)
    //         // orderRef
    //         //   .doc(order.id)
    //         //   .update({
    //         //     shelfLists: shelfArr,
    //         //   })
    //         //   .then(() => {
    //         //     console.log('Document successfully updated!')
    //         //   })
    //         //   .catch(error => {
    //         //     console.error('Error update document: ', error)
    //         //     commit('setError', error.message)
    //         //   })
    //       }
    //     })
    //   })
    // console.log(shelfLists)
    // payload.forEach((order) => {
    //   order.items.forEach(sku => {
    //     console.log(sku.product_number)
    //   })
    // })
  },
  setToHistoryOrder({commit}, payload) {
    console.log(payload)
  }
}