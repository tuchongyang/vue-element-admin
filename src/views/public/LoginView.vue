<template>
  <div class="login-box">
    <div class="login-logo">
      <svg-icon icon-class="logo" />
      <!--      <img src="~@/assets/images/logo.png" alt="">-->
      <h1>万博智云官网后台</h1>
    </div>
    <el-form layout="horizontal" :model="state.formInline" @submit.prevent="handleSubmit">
      <el-form-item>
        <el-input v-model:value="state.formInline.username" placeholder="请输入用户名/邮箱" :prefix-icon="User"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model:value="state.formInline.password" type="password" placeholder="请输入密码" autocomplete="new-password" :prefix-icon="Lock"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-login" type="primary" :loading="state.loading" block> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { ElMessage } from "element-plus"
import { User, Lock } from "@element-plus/icons-vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"

const state = reactive({
  loading: false,
  formInline: {
    username: "",
    password: "",
  },
})

const store = useStore()
const router = useRouter()
const route = useRoute()

const handleSubmit = async () => {
  const { username, password } = state.formInline
  if (username.trim() == "" || password.trim() == "") {
    return ElMessage.warning("用户名或密码不能为空！")
  }
  ElMessage.loading("登录中...", 0)
  state.loading = true
  console.log(state.formInline)
  const params = {
    name: username,
    password,
  }
  // params.password = md5(password)
  await store.dispatch("user/login", params).finally(() => {
    state.loading = false
  })
  const toPath = decodeURIComponent(route.query.redirect || "/")
  ElMessage.success("登录成功！")
  router.replace(toPath).then(() => {
    if (route.name == "login") {
      router.replace("/")
    }
  })
}
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
  background: url("~@/assets/login.svg");
  background-size: 100%;
  flex-direction: column;
  align-items: center;

  .login-logo {
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    .svg-icon {
      font-size: 48px;
    }

    img {
      height: 48px;
    }

    h1 {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }

  :deep(.el-form) {
    width: 300px;
  }
  .btn-login {
    display: block;
    width: 100%;
  }
}
</style>
