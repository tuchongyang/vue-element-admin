<template>
  <el-aside class="a-aside" :class="[sideTheme]" :style="sideStyle" :width="!isCollapse ? 'var(--aside-width-open)' : 'var(--aside-width-close)'">
    <el-scrollbar>
      <SLogo />
      <STabMenu v-if="layout == 'split'" />
      <SMenu v-else />
    </el-scrollbar>
  </el-aside>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import SMenu from "../SMenu"
import SLogo from "../SLogo"
import STabMenu from "./STabMenu.vue"
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
const sideTheme = computed(() => store.state.layout.sideTheme)

const layout = computed(() => store.state.layout.layout)
const sideStyle = computed(() => {
  return {
    backgroundColor: store.state.layout.sideBg,
  }
})
</script>
<style scoped lang="scss">
.a-aside {
  height: 100vh;
  background: $aside-bg;
  transition: width 0.3s;
  z-index: 50;
  border-right: var(--el-border-base);
  &.light {
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
  }
  &.dark {
    color: #eee;
  }
}
</style>
