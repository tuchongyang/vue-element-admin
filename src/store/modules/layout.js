export default {
  namespaced: true,
  state: {
    sideOpen: true,
  },
  mutations: {
    toggleSide(state) {
      state.sideOpen = !state.sideOpen
    },
  },
}
