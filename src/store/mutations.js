export const mutations = {/* eslint-disable */ 
  setUser(state, payload) {
    state.user = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setBarcodeLists(state, payload) {
    state.barcodeLists = payload
  },
  setInvoiceLists(state, payload) {
    state.invoiceLists = payload
  },
  setPaidDate(state, payload) {
    state.paidDate = payload
  },
  setStockLists(state, payload) {
    state.stockLists = payload
  },
  setShelfLists(state, payload) {
    state.shelfLists = payload
  }
}