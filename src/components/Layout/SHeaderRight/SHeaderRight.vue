<template>
  <el-button type="text" class="menu-item" @click="toLock">
    <el-icon size="14px"><Lock /></el-icon>
  </el-button>
  <el-button type="text" class="menu-item" @click="toSet">
    <el-icon size="14px"><set-up /></el-icon>
  </el-button>
  <MessageCenter class="menu-item" />
  <el-dropdown trigger="click" class="menu-item item-avatar">
    <span class="toggle">
      <el-avatar class="avatar" :size="30" :src="circleUrl"></el-avatar><span class="name">管理员</span> <el-icon><arrow-down /></el-icon
    ></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { SetUp, Lock } from "@element-plus/icons-vue"
import MessageCenter from "./MessageCenter.vue"
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
const router = useRouter()
const toSet = () => {
  router.push("/setting")
}
const store = useStore()
const toLock = () => {
  store.commit("layout/setScreenlock", true)
}
</script>
<style scoped lang="scss">
.menu-item {
  display: inline-block;
  vertical-align: top;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0;
  height: 100%;
  color: inherit;
  cursor: pointer;
  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
  :deep(.el-icon) {
    font-size: 14px;
  }
  > i {
    vertical-align: top;
  }
}

.item-avatar {
  vertical-align: top;
  .avatar {
    vertical-align: middle;
  }
  .toggle {
    cursor: pointer;
    padding: 10px 0;
    display: block;
    span {
      vertical-align: middle;
    }
    .name {
      margin-left: 10px;
    }
    .el-icon {
      vertical-align: middle;
    }
  }
}
</style>
