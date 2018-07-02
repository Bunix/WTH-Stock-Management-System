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
  setProductToStock(state, payload) {
    // state.barcodePrintLists = payload
    /* eslint-disable */
    console.log(payload)
    state.inStockLists = payload
  }
}