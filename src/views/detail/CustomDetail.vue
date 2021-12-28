<template>
  <PageHeader title="基础详情" desc="基础的详细信息展示" />
  <BaseInfo type="card">
    <BaseInfo title="退款信息" :data="data1"></BaseInfo>
    <el-divider></el-divider>
    <BaseInfo title="用户信息" :data="data2"></BaseInfo>
    <el-divider></el-divider>
    <BaseInfo title="退货商品">
      <CurdTable :data="tableData" :columns="columns" :option="option" />
    </BaseInfo>
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
const data2 = [
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
