<template>
  <div class="container">
    普通 表格
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
    fetchData({ currentPage, pageSize, sortColumn, sortType, search }) {
      return new Promise((resolve) => {
        const params = {
          page: {
            current: currentPage,
            size: pageSize,
          },
          search: [],
        }

        Object.keys(search).forEach((key) => {
          params.search.push({
            key: key,
            value: search[key],
          })
        })

        if (sortColumn) {
          params.sortColumn = sortColumn
          params.sortType = sortType
        }
        console.log("params", params)
        setTimeout(() => {
          const res = {
            data: [
              {
                name: "张三",
                account: "ttt",
                phone: "13555555555",
                email: "admin@admin.com",
                role: 1,
                status: 1,
              },
              {
                name: "张三1",
                role: 2,
                status: 2,
              },
            ],
            total: 1,
          }
          this.data = res.data // 数据赋值
          console.log("this.data", this.data)
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
        Promise.then(() => {
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
