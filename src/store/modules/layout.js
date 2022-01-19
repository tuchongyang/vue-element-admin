import { Storage } from "@/utils/Storage"
const layout = Storage.get("layout") || {}
export default {
  namespaced: true,
  state: {
    sideOpen: true, // 左侧菜单
    sideTheme: "dark",
    sideBg: "#191919",
    layout: "default",
    headerTheme: "light",
    headerBg: "#fff",
    tagViewType: "tab",
    screenlock: layout.screenlock || false,
  },
  mutations: {
    toggleSide(state) {
      state.sideOpen = !state.sideOpen
    },
    setSideTheme(state, preload) {
      state.sideTheme = preload
    },
    setHeaderTheme(state, preload) {
      state.headerTheme = preload
    },
    setSideBg(state, preload) {
      state.sideBg = preload
    },
    setHeaderBg(state, preload) {
      state.headerBg = preload
    },
    setLayout(state, preload) {
      state.layout = preload
    },
    setTagViewType(state, preload) {
      state.tagViewType = preload
    },
    setScreenlock(state, preload) {
      state.screenlock = preload
      Storage.set("layout", state)
    },
  },
}
