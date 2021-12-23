<template>
  <div class="advanced-form">
    <PageHeader title="高级表单" />
    <el-card shadow="never" style="margin-bottom: 20px">
      <template #header> 用户信息 </template>
      <schema-form ref="dynamicForm" :fields="fields" :form-schema="formSchema" :label-width="formSchema.labelWidth || '110px'" style="margin-right: 40px">
        <template v-slot:operate-button>
          <div style="text-align: center">
            <el-button type="primary" @click="submit">提 交</el-button>
            <el-button type="default" @click="clear">清 空</el-button>
          </div>
        </template>
      </schema-form>
    </el-card>
    <el-card shadow="never" style="margin-bottom: 20px">
      <template #header> 用户信息 </template>
      <schema-form ref="dynamicForm" :fields="fields" :form-schema="formSchema" :label-width="formSchema.labelWidth || '110px'" style="margin-right: 40px">
        <template v-slot:operate-button>
          <div style="text-align: center">
            <el-button type="primary" @click="submit">提 交</el-button>
            <el-button type="default" @click="clear">清 空</el-button>
          </div>
        </template>
      </schema-form>
    </el-card>
    <el-card shadow="never" style="margin-bottom: 20px">
      <template #header> 用户信息 </template>
      <schema-form ref="dynamicForm" :fields="fields" :form-schema="formSchema" :label-width="formSchema.labelWidth || '110px'" style="margin-right: 40px">
        <template v-slot:operate-button>
          <div style="text-align: center">
            <el-button type="primary" @click="submit">提 交</el-button>
            <el-button type="default" @click="clear">清 空</el-button>
          </div>
        </template>
      </schema-form>
    </el-card>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue"
import PageHeader from "@/components/Layout/PageHeader"
import api from "@/api"
const formSchema = {
  formItem: [
    { type: "input", label: "用户名", prop: "username", span: 8 },
    { type: "input", label: "姓名", prop: "name", props: { disabled: true }, span: 8 },
    { type: "input-password", label: "密码", prop: "password", span: 8 },
    {
      type: "select",
      label: "角色",
      prop: "role",
      options: [
        { label: "超级管理员", value: 1 },
        { label: "普通管理员", value: 2 },
      ],
      span: 8,
    },
    {
      type: "radio",
      label: "性别",
      prop: "sex",
      options: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
      span: 8,
      value: 1,
    },
    {
      type: "input-number",
      label: "年龄",
      prop: "age",
      value: 1,
      props: {
        controlsPosition: "right",
      },
      span: 8,
    },
    {
      type: "select",
      label: "分类",
      prop: "type",
      span: 24,
      asyncOptions: async () => {
        return await api.user.types().then((res) => {
          return res.data.map((a) => ({ value: a.id, label: a.name }))
        })
      },
    },
    {
      type: "date-picker",
      label: "日期",
      prop: "date",
      span: 8,
    },
    {
      type: "date-picker",
      label: "日期范围",
      prop: "daterange",
      span: 8,
      props: {
        type: "daterange",
      },
      value: [],
    },
    {
      type: "date-picker",
      label: "日期时间",
      prop: "datetime",
      props: {
        type: "datetime",
        format: "YYYY-MM-DD hh:mm:ss",
        valueFormat: "YYYY-MM-DD hh:mm:ss",
      },
      span: 8,
    },
    {
      type: "input",
      label: "地址",
      prop: "address",
      props: {
        type: "textarea",
      },
    },
  ],
  rules: {
    username: [{ required: true, message: "用户名不能为空", tigger: "blur" }],
  },
}
const fields = {}
const dynamicForm = ref()
const instance = getCurrentInstance()
const submit = () => {
  dynamicForm.value.validate((valid) => {
    if (valid) {
      instance.appContext.config.globalProperties.$message({
        type: "success",
        message: "提交成功",
      })
    }
  })
}
const clear = () => {
  dynamicForm.value.schemaFormRef.resetFields()
}
</script>
