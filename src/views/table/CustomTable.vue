<template>
  <div class="container">
    <STable
      :data="data"
      :columns="columns"
      :page-options="pageOptions"
      :handle-row="handleRowOptions"
      :view-form-options="viewFormOptions"
      selection-row
      click-row-to-view
      :fetch-data="fetchData"
      :fetch-create="fetchCreate"
      :fetch-edit="fetchEdit"
      :fetch-remove="fetchRemove"
      :fetch-batch-remove="fetchBatchRemove"
    />
  </div>
</template>
<script>
import { getColumns } from "./columns"
import api from "@/api"
export default {
  data() {
    return {
      handleRowOptions: {
        fixed: "right",
      },
      pageOptions: {
        total: 0,
        pageSize: 10,
      },
      viewFormOptions: {
        type: "Drawer",
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
    fetchBatchRemove(selectedData) {
      const data = {
        ids: selectedData.map((item) => item.id),
      }

      return new Promise((resolve, reject) => {
        Promise.then(() => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
  },
}
</script>
