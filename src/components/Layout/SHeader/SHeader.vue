<template>
  <el-header class="a-header" :class="[headerTheme]" :style="headerStyle">
    <div class="header-left">
      <SLogo class="header-left-item header-left-logo" v-if="layout == 'top'" />
      <SAsideToggle class="header-left-item" v-if="layout !== 'top'" />
      <Breadcrumb class="header-left-item" v-if="layout !== 'top'" />
      <SMenu class="header-left-item header-left-menu" mode="horizontal" v-if="layout == 'top'" />
    </div>
    <div class="header-right"><SHeaderRight /></div>
  </el-header>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import SAsideToggle from "../SAsideToggle"
import Breadcrumb from "../Breadcrumb"
import SHeaderRight from "../SHeaderRight"
import SMenu from "../SMenu"
import SLogo from "../SLogo"
const store = useStore()
const headerTheme = computed(() => store.state.layout.headerTheme)
const layout = computed(() => store.state.layout.layout)
const headerStyle = computed(() => {
  return {
    backgroundColor: store.state.layout.headerBg,
  }
})
</script>
<style scoped lang="scss">
.a-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: $header-height;
  line-height: $header-height;
  display: flex;
  justify-content: space-between;
  &.dark {
    background: $aside-bg;
    color: rgba(255, 255, 255, 0.5);
    :deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
      color: #fff;
      font-weight: normal;
      opacity: 0.4;
    }
    :deep(.app-breadcrumb.el-breadcrumb .no-redirect) {
      color: #fff;
      opacity: 0.3;
    }
  }
  .header-left-item {
    float: left;
  }
  .header-left-logo {
    margin-right: 40px;
  }
  .header-left-menu {
    margin-left: 20px;
    // background: none;
    :deep(.el-menu-item) {
      height: $header-height;
    }
    :deep(.el-sub-menu .el-sub-menu__title) {
      height: $header-height;
      line-height: $header-height;
      // background: none !important;
    }
  }
}
</style>
