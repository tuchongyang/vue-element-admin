<template>
  <el-drawer v-model="visible" title="详情" size="40%">
    <el-row class="table-detail">
      <el-col :span="item.span" v-for="(item, i) in list" :key="i">
        <div class="item-col">
          <div class="label">{{ item.label }}：</div>
          <div class="det">
            <template v-if="!item.options">{{ item.value }}</template>
            <ConstantStatus :value="item.value" :options="item.options" />
          </div>
        </div>
      </el-col>
    </el-row>
  </el-drawer>
</template>
<script setup>
import { ref, defineExpose } from "vue"
// const props = defineProps({
//   visible: {
//     type: Boolean,
//     default: false,
//   },
// })
const visible = ref(false)
const list = ref([])
const open = (option) => {
  list.value = []
  option.columns.forEach((item) => {
    if (item.childrem && item.children.length) {
      for (let i in item.children) {
        const a = item.children[i]
        list.value.push({
          prop: a.prop,
          label: a.label,
          value: option.data[a.prop],
          span: (a.form && a.form.span) || 12,
          options: a.options,
        })
      }
    } else {
      list.value.push({
        prop: item.prop,
        label: item.label,
        value: option.data[item.prop],
        span: (item.form && item.form.span) || 12,
        options: item.options,
      })
    }
  })
  visible.value = true
}
defineExpose({ open })
</script>
<style scoped lang="scss">
.table-detail {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  .el-col {
    padding: 0 !important;
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
  }
  .item-col {
    background: #fafafa;
    line-height: 32px;
    border: 1px solid #fff;
    .label {
      padding: 2px 10px;
      color: #909399;
      box-sizing: border-box;
      text-align: right;
      vertical-align: middle;
      float: left;
      width: 90px;
    }
    .det {
      border-left: 1px solid #ebeef5;
      padding: 2px 10px;
      box-sizing: border-box;
      background-color: #fff;
      margin-left: 90px;
      min-height: 36px;
    }
  }
}
</style>
