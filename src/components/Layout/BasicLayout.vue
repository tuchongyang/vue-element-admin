<template>
  <el-container class="a-container">
    <s-aside v-if="layout !== 'top'" />
    <el-container class="right-container" :class="layout" direction="vertical">
      <SHeader />
      <TagsView />
      <el-main class="center-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <screen-lock />
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import SAside from "./SAside"
import TagsView from "./TagsView"
import SHeader from "./SHeader"
import ScreenLock from "./ScreenLock"
const store = useStore()
const layout = computed(() => store.state.layout.layout)
</script>
<style scoped lang="scss">
.center-main {
  background: $body-background;
  padding: $body-padding;
}
.right-container {
  height: 100vh;
  position: relative;
}
</style>
