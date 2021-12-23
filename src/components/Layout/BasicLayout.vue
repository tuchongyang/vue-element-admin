<template>
  <el-container class="a-container">
    <s-aside />
    <el-container style="position: relative">
      <el-header class="a-header">
        <div class="header-left">
          <SAsideToggle />
          <Breadcrumb />
        </div>
        <div class="header-right"><SHeaderRight /></div>
      </el-header>
      <TagsView />
      <el-main class="center-main">
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
<script setup>
import SAside from "./SAside"
import SAsideToggle from "./SAsideToggle"
import Breadcrumb from "./Breadcrumb"
import TagsView from "./TagsView"
import SHeaderRight from "./SHeaderRight"
</script>
<style scoped lang="scss">
.a-aside {
  min-height: 100vh;
  background: $aside-bg;
}
.a-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: $header-height;
  line-height: $header-height;
  display: flex;
  justify-content: space-between;
}
.center-main {
  background: $body-background;
  padding: $body-padding;
}
</style>
