<template>
  <PageHeader title="高级详情" desc="高级的详细信息展示" />
  <BaseInfo title="审核流程" type="card">
    <el-steps :active="1" align-center finish-status="success">
      <el-step title="申请" description="申请人：Aresn"></el-step>
      <el-step title="Leader 审批" description="审批人：张三"></el-step>
      <el-step title="财务审批" description="审批人：Echo"></el-step>
    </el-steps>
  </BaseInfo>
  <BaseInfo title="基本信息" :data="data1" type="card"></BaseInfo>
  <BaseInfo title="行程信息" :data="data1" type="card"></BaseInfo>
  <BaseInfo title="退货商品" type="card">
    <CurdTable :data="tableData" :columns="columns" :option="option" />
  </BaseInfo>
</template>
<script setup>
import PageHeader from "@/components/Layout/PageHeader"
const data1 = [
  { label: "取货单号", value: "10000000", span: 8 },
  { label: "状态", value: "已取货", span: 8 },
  { label: "销售号", value: "10000000", span: 8 },
  { label: "子订单", value: "23123123", span: 8 },
]
const tableData = [
  { no: "123123", name: "矿泉水 550ml", code: "12313123123123", price: 2, count: 1, amount: 2 },
  { no: "123123", name: "矿泉水 550ml", code: "12313123123123", price: 2, count: 1, amount: 2 },
  { no: "123123", name: "矿泉水 550ml", code: "12313123123123", price: 2, count: 1, amount: 2 },
  { no: "123123", name: "矿泉水 550ml", code: "12313123123123", price: 2, count: 1, amount: 2 },
]
const columns = [
  { prop: "no", label: "商品编号" },
  { prop: "name", label: "商品名称" },
  { prop: "code", label: "商品条码" },
  { prop: "price", label: "单价" },
  { prop: "count", label: "数量（件）" },
  { prop: "amount", label: "金额" },
]
const option = {
  hideMenu: true,
  hideOperation: true,
  hideBtnAdd: true,
  pageHide: true,
}
</script>
