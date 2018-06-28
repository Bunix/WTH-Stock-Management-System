import { db } from '../main'

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setBarcodePrintLists(state, payload) {
    state.barcodePrintLists = payload
  },
  updateFirebaseData(payload) {
    db.collection('Finished_Order').doc(payload.id)
    .update({
      printStatus: payload.id
    })
  }
}