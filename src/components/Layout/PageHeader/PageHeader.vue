<template>
  <div class="layout-page-header">
    <div class="title">{{ props.title }}</div>
    <div class="desc">{{ props.desc }}</div>
  </div>
</template>
<script setup>
import { defineProps } from "vue"
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
})
</script>
<style scoped lang="scss">
.layout-page-header {
  margin: -$body-padding;
  padding: $body-padding;
  margin-bottom: $body-padding;
  background: #fff;
  .title {
    font-size: $font-size + 2;
  }
  .desc {
    font-size: $font-size - 2;
    color: #999;
  }
}
</style>
