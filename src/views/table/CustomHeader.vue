<template>
  <BaseInfo type="card">
    <CurdTable :data="data" :columns="columns" :option="option" height="200px">
      <template #nameHeader="scope">
        <el-tag>{{ scope }}</el-tag>
      </template>
      <template #name="scope"> 名：{{ scope.row.name }} </template>
    </CurdTable>
  </BaseInfo>
</template>
<script setup>
const data = [
  {
    name: "张三",
    sex: "男",
  },
  {
    name: "李四",
    sex: "女",
  },
  {
    name: "王五",
    sex: "女",
  },
  {
    name: "赵六",
    sex: "男",
  },
]
const columns = [
  { prop: "name", label: "姓名", "show-overflow-tooltip": true },
  { prop: "sex", label: "性别", "show-overflow-tooltip": true },
]
const option = {
  menuWidth: 200,
  menuBtnTitle: "自定义名称",
}
</script>
