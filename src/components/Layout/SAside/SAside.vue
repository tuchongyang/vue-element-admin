<template>
  <el-aside class="a-aside" :width="isCollapse ? '64px' : '200px'">
    <SLogo />
    <SMenu />
  </el-aside>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import SMenu from "../SMenu"
import SLogo from "../SLogo"
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
</script>
<style scoped>
.a-aside {
  transition: width 0.3s;
}
</style>
