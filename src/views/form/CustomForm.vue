<template>
  <div class="custom-form">
    <div class="title-bar" style="text-align: center; margin-bottom: 40px"><b>基础表单</b></div>
    <schema-form class="center-form" ref="dynamicForm" :fields="fields" :form-schema="formSchema" :label-width="formSchema.labelWidth || '110px'" style="margin-right: 40px">
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
import { ref, getCurrentInstance } from "vue"
const formSchema = {
  formItem: [
    { type: "input", label: "用户名", prop: "username", span: 16 },
    { type: "input", label: "姓名", prop: "name", props: { disabled: true }, span: 16 },
  ],
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

<style></style>
