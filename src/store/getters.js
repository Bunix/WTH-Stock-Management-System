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
  }
}