<template>
  <div class="container">
    <PageHeader title="基础表格" desc="表格查询的复杂示例" />
    <div class="box-white">
      <STable :data="data" :columns="columns" :page-options="pageOptions" index selection click-row-to-view :fetch-data="fetchData" :fetch-create="fetchCreate" :fetch-edit="fetchEdit" :fetch-remove="fetchRemove" @selectionChange="selectionChange" />
    </div>
  </div>
</template>
<script>
import { getColumns } from "./columns"
import api from "@/api"
import PageHeader from "@/components/Layout/PageHeader"
export default {
  components: { PageHeader },
  data() {
    return {
      pageOptions: {
        total: 0,
        pageSize: 10,
      },
      data: [],
      columns: getColumns(),
    }
  },
  methods: {
    fetchData({ pageIndex, pageSize, sortColumn, sortType, search }) {
      return new Promise((resolve) => {
        const params = {
          pageIndex,
          pageSize,
          ...search,
        }

        if (sortColumn) {
          params.sortColumn = sortColumn
          params.sortType = sortType
        }
        console.log("params", params)
        api.user.list(params).then((res) => {
          this.data = res.data // 数据赋值
          this.pageOptions.total = res.total // 设置总页数
          resolve()
        })
      })
    },
    fetchCreate(params) {
      console.log("params", params)
      return new Promise((resolve, reject) => {
        Promise.resolve(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchEdit(editedParams, fullParams) {
      console.log("editedParams", editedParams)
      editedParams.id = fullParams.id
      return new Promise((resolve, reject) => {
        Promise.resolve(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchRemove(row) {
      //   const data = {
      //     id: row.id,
      //   }

      return new Promise((resolve, reject) => {
        Promise.resolve(() => {
          resolve(row)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    selectionChange(rows) {
      console.log("row", rows)
    },
  },
}
</script>
