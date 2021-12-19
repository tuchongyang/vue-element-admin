<template>
  <div class="table-container">
    <el-table border :data="list">
      <template v-for="item in props.columns" :key="item.label">
        <el-table-column v-bind="item">
          <template #default="scope">
            <template v-if="item.children && item.children.length">
              <el-table-column v-for="sub in item.children" :key="sub.prop" v-bind="sub"></el-table-column>
            </template>
            {{ scope.row[item.prop] }}
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue"
const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
  columns: {
    type: Array,
    default() {
      return []
    },
  },
  fetchData: {
    type: Function,
    default: null,
  },
})

const list = computed(() => {
  var getOptionValue = (val, options) => {
    const cur = options.find((a) => a.value == val)
    return (cur && cur.label) || val
  }
  var optionColumns = props.columns.filter((a) => a.options)
  const result = props.data.map((item) => {
    for (let i = 0; i < optionColumns.length; i++) {
      const val = item[optionColumns[i].prop]
      item[optionColumns[i].prop] = getOptionValue(val, optionColumns[i].options)
    }
    return item
  })

  return result
})

if (props.fetchData) {
  props.fetchData({ search: {} })
}
</script>
<style lang="scss">
.table-container {
  .el-table {
    --el-table-header-bg-color: #f8f8f9;
    --el-table-header-text-color: #555;
    .el-table__cell {
      padding: 8px 0;
    }
  }
}
</style>
