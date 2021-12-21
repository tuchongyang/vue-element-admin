<template>
  <div class="table-container">
    <STableFilter :schema="filterSchema" @search="onSearch" v-show="filterVisible" />
    <div class="table-control">
      <div class="btn-control">
        <el-button type="primary" size="mini" @click="create()">
          <el-icon><plus /></el-icon>
          添加
        </el-button>
      </div>
      <div class="min-control"><STableMenu :filterVisible="filterVisible" @operation="onMenuOption" /></div>
    </div>
    <el-table border :data="list" v-loading="loading" v-bind="tableAttrs">
      <template v-for="item in columns" :key="item.label">
        <el-table-column v-bind="getColumnAttrs(item)" v-if="!item.hidden">
          <template #default="scope">
            <template v-if="item.children && item.children.length">
              <template v-for="sub in item.children" :key="sub.prop">
                <el-table-column v-bind="getColumnAttrs(sub)" v-if="!sub.hidden"></el-table-column>
              </template>
            </template>
            <STableItem :scope="scope" :schema="item" />
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" fixed="right" :width="option.optionWidth || '180'">
        <template #default="scope">
          <el-button type="text" @click="create(scope.row)">
            <el-icon><edit /></el-icon> 编辑
          </el-button>
          <el-button type="text">
            <el-icon><document /></el-icon> 详情
          </el-button>
          <el-popover v-model:visible="removeVisibleMap[scope.$index]" placement="left" :width="160" :tabindex="scope.$index">
            <p style="margin-bottom: 10px">确认删除这条数据吗?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="removeCancel(scope)">取消</el-button>
              <el-button type="primary" size="mini" @click="removeConfirm(scope)">确 定</el-button>
            </div>
            <template #reference>
              <el-button type="text" style="color: #ff0000" @click.stop="startremove(scope)">
                <el-icon><delete /></el-icon> 删除
              </el-button>
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="total, sizes, prev, pager, next, jumper" :total="props.pageOptions.total" v-model:current-page="listQuery.pageIndex" v-model:page-size="listQuery.pageSize" @current-change="fetchData" @size-change="fetchData"> </el-pagination>
  </div>
</template>
<script setup>
import { defineProps, computed, ref, reactive, provide } from "vue"
import STableItem from "./STableItem.vue"
import STableFilter from "./STableFilter.vue"
import STableMenu from "./STableMenu.vue"
import { useFormModal } from "@/components/FormModal"
import { deepClone } from "@/utils/common"
const props = defineProps({
  // 表格的数据
  data: {
    type: Array,
    default() {
      return []
    },
  },
  // 表格列模型
  columns: {
    type: Array,
    default() {
      return []
    },
  },
  pageOptions: {
    type: Object,
    default() {
      return {
        pageIndex: 1,
        pageSize: 10,
      }
    },
  },
  // 调用接口获取数据
  fetchData: {
    type: Function,
    default: null,
  },
  // 自定义创建函数
  fetchCreate: {
    type: Function,
    default: null,
  },
  // 自定义编辑函数
  fetchEdit: {
    type: Function,
    default: null,
  },
  // 自定义删除函数
  fetchRemove: {
    type: Function,
    default: null,
  },
  // 专门配置一些公共的参数
  option: {
    type: Object,
    default() {
      return {
        optionWidth: 180,
      }
    },
  },
})

const list = computed(() => {
  const result = props.data.map((item) => {
    return item
  })

  return result
})
const tableAttrs = ref({})
const listQuery = reactive({
  pageIndex: 1,
  pageSize: 10,
})
const search = reactive({})
const filterVisible = ref(true)
const loading = ref(false)
const fetchData = () => {
  if (props.fetchData) {
    loading.value = true
    props.fetchData({ ...listQuery, search }).finally(() => {
      loading.value = false
    })
  }
}
// 组装过滤器模型
const filterSchema = computed(() => {
  const result = []
  const getFilter = (columns) => {
    for (const i in columns) {
      const a = columns[i]
      if (a.children && a.children.length) {
        getFilter(a.children)
        continue
      }
      if (a.filter) {
        const options = a.options || []
        options.unshift({ label: "全部", value: "" })
        result.push({
          type: a.filter.component || "input",
          label: a.label,
          prop: a.prop,
          options: options,
        })
      }
    }
  }
  getFilter(props.columns)
  return {
    formItem: result,
  }
})
// 搜索
const onSearch = (params) => {
  for (let i in params) {
    search[i] = params[i]
  }
  console.log("search", search)

  fetchData()
}
fetchData()
// 组装columns
const columns = ref([])
const cs = deepClone(props.columns)
// cs.map((a) => {
//   if (a.children) {
//     a.children = a.children.filter((b) => !b.hidden)
//   }
// })
columns.value = cs //.filter((a) => !a.hidden)
provide("columns", columns)

// 菜单点击事件
const onMenuOption = (option, val) => {
  switch (option) {
    case "refresh":
      fetchData()
      break
    case "searchToggle":
      filterVisible.value = !filterVisible.value
      break
    case "size": {
      if (val) {
        tableAttrs.value.size = val
      }
      break
    }
  }
}

// 添加/编辑
const create = (row) => {
  const formSchema = {
    formItem: [],
    rules: {},
  }
  const setItem = (a) => {
    const item = {
      type: (a.form && a.form.component) || "input",
      label: a.label,
      prop: a.prop,
      options: a.options,
      props: a.form && a.form.props,
      value: a.form && a.form.value,
      hidden: a.form && a.form.hidden,
    }
    formSchema.formItem.push(item)
    if (a.form && a.form.rules) {
      formSchema.rules[a.prop] = a.form.rules
    }
  }
  columns.value.map((a) => {
    if (a.children && a.children.length) {
      for (let i in a.children) {
        setItem(a.children[i])
      }
    } else {
      setItem(a)
    }
  })

  useFormModal({
    title: row ? "编辑" : "添加",
    formSchema: formSchema,
    fields: row,
    handleOk: async (modelRef) => {
      const fun = row ? "fetchCreate" : "fetchEdit"
      return await (props[fun] && props[fun](modelRef, row))
    },
  })
}
const removeVisibleMap = reactive({})
const startremove = (scope) => {
  setTimeout(() => {
    removeVisibleMap[scope.$index] = true
  }, 500)
}
const removeCancel = (scope) => {
  removeVisibleMap[scope.$index] = false
}
const removeConfirm = async (scope) => {
  await (props.fetchRemove && props.fetchRemove(scope.row))
  removeVisibleMap[scope.$index] = false
}
const getColumnAttrs = (column) => {
  const { children, ...args } = column
  return args || children
}
</script>
<style lang="scss">
.table-container {
  .el-table {
    --el-table-header-bg-color: #f8f8f9;
    --el-table-header-text-color: #555;
  }
  .pagination {
    margin: 15px 0;
    text-align: right;
    font-weight: normal;
  }
  .table-control {
    display: flex;
    justify-content: space-between;
  }
}
</style>
