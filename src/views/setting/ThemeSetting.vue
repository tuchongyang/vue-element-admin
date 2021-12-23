<template>
  <PageHeader title="皮肤" desc="设置侧边栏、顶部以及全局主色调" />
  <div class="box-white">
    <schema-form ref="dynamicForm" :fields="fields" :form-schema="formSchema" style="margin-right: 40px">
      <template v-slot:operate-button>
        <div style="text-align: center">
          <el-button type="primary" @click="submit">提 交</el-button>
          <el-button type="default" @click="clear">清 空</el-button>
        </div>
      </template>
    </schema-form>
  </div>
</template>
<script setup>
import PageHeader from "@/components/Layout/PageHeader"
const formSchema = {
  formItem: [
    {
      prop: "sidebg",
      label: "侧边栏背景",
      type: "radio",
      options: [
        { label: "深色", value: "dark" },
        { label: "深色", value: "light" },
      ],
      value: "dark",
    },
    {
      prop: "headerbg",
      label: "头部栏背景",
      type: "radio",
      options: [
        { label: "深色", value: "dark" },
        { label: "深色", value: "light" },
      ],
      value: "light",
    },
  ],
}
</script>
