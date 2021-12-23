<template>
  <div class="base-info">
    <div class="head">
      <div class="title" v-if="props.title">{{ props.title }}</div>
      <slot name="title"></slot>
    </div>
    <div class="body">
      <el-row v-if="data && data.length">
        <el-col v-for="(item, i) in props.data" :key="i" :span="item.span || 8">
          <div class="base-info-item">
            <span class="label">{{ item.label }}：</span>
            <span class="det" v-html="item.value"></span>
          </div>
        </el-col>
      </el-row>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue"
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
  },
})
</script>
<style scoped lang="scss">
.base-info {
  .head {
    margin-bottom: 15px;
  }
  .title {
    font-weight: bold;
    border-left: 3px solid var(--el-text-color-regular);
    padding-left: 10px;
    line-height: 1;
  }
  .base-info-item {
    margin-bottom: 10px;
    .label {
      color: var(--el-text-color-regular);
    }
  }
}
</style>
