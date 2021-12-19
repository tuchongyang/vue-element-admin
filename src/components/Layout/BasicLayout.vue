<template>
  <el-container class="a-container">
    <s-aside />
    <el-container>
      <el-header class="a-header">
        <SAsideToggle />
        <div class="header-right"></div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
<script setup>
import SAside from "./SAside"
import SAsideToggle from "./SAsideToggle"
</script>
<style scoped lang="scss">
.a-aside {
  min-height: 100vh;
  background: $aside-bg;
}
.a-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 64px;
  line-height: 64px;
}
</style>
