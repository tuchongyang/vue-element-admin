<template>
  <el-menu :collapse="isCollapse" :default-active="defaultActive" :router="true" v-bind="{ ...themeColor, ...$attrs }" class="s-menu">
    <template v-for="(item, i) in routes" :key="i">
      <SMenuItem :menu="item" />
    </template>
  </el-menu>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import SMenuItem from "./SMenuItem.vue"
import { deepClone } from "@/utils/common"
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
const route = useRoute()
const router = useRouter()
const allroutes = deepClone(router.getRoutes())
const rootRoute = allroutes.find((a) => a.path == "/" && a.children.length)
const getChildren = (childrens, parentPath) => {
  const result = []
  for (let i in childrens) {
    const child = childrens[i]
    if (child.children && child.children.length) {
      child.children = getChildren(child.children, child.path)
    }
    const { path, name, children, meta = {} } = child
    if (child.name) {
      const prefix = !/^\//.test(path) ? "/" : ""
      result.push({ path: parentPath + prefix + path, name, children, meta })
    }
  }
  return result
}
const routes = getChildren(rootRoute.children, "")
const defaultActive = computed(() => route.path)

const themeColor = computed(() => {
  const sideBg = store.state.layout.sideBg
  let colorObj = {
    "active-text-color": "var(--el-color-primary: #409eff)",
    "background-color": sideBg,
    "text-color": "rgba(255,255,255,.7)",
  }
  if (store.state.layout.sideTheme == "light") {
    colorObj = {
      "active-text-color": "var(--el-color-primary: #409eff)",
      "background-color": sideBg,
      "text-color": "#666",
    }
  }
  return colorObj
})
// console.log("router", routes)
</script>
<style scoped lang="scss">
.s-menu {
  border: 0;
  :deep(.el-menu-item:hover) {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--el-color-primary);
  }
  :deep(.el-menu-item.is-active) {
    background-color: rgba(255, 255, 255, 0.1);
  }
  :deep(.el-sub-menu .el-menu) {
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
