<template>
  <div class="container">
    <STable :data="data" :columns="columns" :page-options="pageOptions" index selection click-row-to-view :fetch-data="fetchData" :fetch-create="fetchCreate" :fetch-edit="fetchEdit" :fetch-remove="fetchRemove" @selectionChange="selectionChange" />
  </div>
</template>
<script>
import { getColumns } from "./columns"
import api from "@/api"
export default {
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
