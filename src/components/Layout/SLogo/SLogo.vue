<template>
  <div class="s-logo" :class="{ split: layout == 'split' }">
    <div class="logo"><img :src="logo" height="30" /></div>
    <div class="title">vue-element-admin</div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import logo from "@/assets/logo.png"
const store = useStore()
const layout = computed(() => store.state.layout.layout)
</script>
<style scoped lang="scss">
.s-logo {
  line-height: $header-height;
  text-align: center;
  overflow: hidden;
  height: 50px;
  .logo {
    display: inline-block;
    vertical-align: top;
    padding-top: 10px;
    line-height: 1;
    & + .title {
      margin-left: 10px;
    }
  }
  .title {
    display: inline-block;
    vertical-align: top;
  }
  &.split {
    .logo {
      width: var(--aside-width-close);
      float: left;
    }
    .title {
      background: #fff;
      margin-left: var(--aside-width-close);
      display: block;
      white-space: nowrap;
      color: var(--el-text-color-primary);
    }
  }
}
</style>
