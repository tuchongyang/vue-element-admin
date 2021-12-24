<template>
  <div class="custom-form">
    <PageHeader title="基础表单" />
    <BaseInfo type="card">
      <el-steps :active="step" align-center finish-status="success" style="margin-bottom: 40px">
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <template v-if="step == 1">
        <schema-form class="center-form" ref="dynamicForm" :fields="fields" :form-schema="formSchema" :label-width="formSchema.labelWidth || '110px'">
          <template v-slot:operate-button>
            <div>
              <el-button type="primary" @click="next">下一步</el-button>
            </div>
          </template>
        </schema-form>
        <el-divider></el-divider>
        <el-alert :closable="false">
          <p><b>说明</b></p>
          <p><b>转账到微信</b></p>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
          <p><br /></p>
          <p><b>转账到支付宝</b></p>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
        </el-alert>
      </template>
      <template v-if="step == 2">
        <div class="center-form">
          <el-alert class="margin-bottom" type="warning"> 确认转账后，资金将直接打入对方账户，无法退回。 </el-alert>
          <schema-form ref="dynamicForm1" :form-schema="formSchema1" :label-width="formSchema1.labelWidth || '110px'">
            <template v-slot:operate-button>
              <div>
                <el-button type="primary" @click="submit" v-if="!loading">提交</el-button>
                <el-button type="primary" disabled v-else>
                  <el-icon class="is-loading"><Loading /></el-icon>
                  提交中
                </el-button>
                <el-button type="default" @click="prev" :disabled="loading">上一步</el-button>
              </div>
            </template>
          </schema-form>
        </div>
      </template>
      <template v-if="step == 3">
        <el-result icon="success" title="操作成功" sub-title="预计两小时内到账">
          <template #extra>
            <el-button type="primary" @click="back">返回</el-button>
          </template>
        </el-result>
      </template>
    </BaseInfo>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
import PageHeader from "@/components/Layout/PageHeader"
import { Loading } from "@element-plus/icons-vue"
const formSchema = {
  formItem: [
    { type: "select", label: "付款账号", prop: "account", span: 24, options: [{ label: "admin@admin.com", value: "admin@admin.com" }], value: "admin@admin.com" },
    { type: "input", label: "收款账户", prop: "reciver", span: 24 },
    { type: "input", label: "收款人姓名", prop: "name", span: 24 },
    { type: "input-number", label: "转账金额", prop: "amount", span: 24, props: { controlsPosition: "right" } },
  ],
}
const fields = {}
const formSchema1 = {
  formItem: [
    { type: "value", label: "付款账号", prop: "account", span: 24, value: "admin@admin.com" },
    { type: "value", label: "收款账户", prop: "reciver", span: 24, value: "test@test.com" },
    { type: "value", label: "收款人姓名", prop: "name", span: 24, value: "张三" },
    { type: "value", label: "转账金额", prop: "amount", span: 24, value: "3000" },
    { type: "input-password", label: "密码", prop: "password", span: 24 },
  ],
  rules: {
    password: [{ required: true, message: "请输入密码", trigger: "blue" }],
  },
}
const dynamicForm = ref()
const dynamicForm1 = ref()
const instance = getCurrentInstance()
const loading = ref(false)
const submit = () => {
  dynamicForm1.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        instance.appContext.config.globalProperties.$message({
          type: "success",
          message: "提交成功",
        })
        step.value++
      }, 1000)
    }
  })
}
const step = ref(1)
const prev = () => {
  step.value--
}
const next = () => {
  dynamicForm.value.validate((valid) => {
    if (valid) {
      step.value++
    }
  })
}
const router = useRouter()
const back = () => {
  router.back()
}
</script>

<style></style>
