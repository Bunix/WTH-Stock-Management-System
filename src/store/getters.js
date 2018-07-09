export const getters = {/* eslint-disable */
  appTitle(state) {
    return state.appName
  },
  userEmail(state) {
    return state.user.email
  },
  getUser(state) {
    return state.user
  },
  getError(state) {
    return state.error
  },
  getLoading(state) {
    return state.loading
  },
  getBarcodeLists(state) {
    return state.barcodeLists
  },
  getInvoiceLists(state) {
    return state.invoiceLists
  },
  getPaidDate(state) {
    return state.paidDate
  }
}