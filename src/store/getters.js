export const getters = {
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
  getBarcodePrintLists(state) {
    // eslint-disable-next-line
    // console.log(state)
    return state.barcodePrintLists
  },
  getStockLists(state) {
    return state.inStockLists
  },
  getInStockProductLists(state) {
    /* eslint-disable */
    return state.inStockProductLists
  },
  getDbHome(state) {
    /* eslint-disable */
    return state.getDbHome
  },
  getDbStock(state) {
    /* eslint-disable */
    return state.getDbStock
  }
}