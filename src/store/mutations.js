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
  setBarcodeLists(state, payload) {
    state.barcodeLists = payload
  },
  setInvoiceLists(state, payload) {
    state.invoiceLists = payload
  }
}