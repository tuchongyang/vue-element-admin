<template>
  <el-menu :collapse="isCollapse" :default-active="defaultActive" :router="true" active-text-color="#ffd04b" background-color="#191919" class="s-menu" text-color="#fff">
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
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
const route = useRoute()
const router = useRouter()
const allroutes = router.getRoutes()
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
// console.log("router", routes)
</script>
<style scoped lang="scss">
.s-menu {
  border: 0;
}
</style>
