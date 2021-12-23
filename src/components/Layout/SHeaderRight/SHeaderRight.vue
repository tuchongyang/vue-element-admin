<template>
  <MessageCenter class="menu-item" />
  <el-dropdown trigger="click" class="menu-item item-avatar">
    <span class="toggle">
      <el-avatar class="avatar" :size="30" :src="circleUrl"></el-avatar><span class="name">管理员</span> <el-icon><arrow-down /></el-icon
    ></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Plus">个人中心</el-dropdown-item>
        <el-dropdown-item :icon="CircleCheck" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import MessageCenter from "./MessageCenter.vue"
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
</script>
<style scoped lang="scss">
.menu-item {
  vertical-align: top;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  color: $font-color;
  cursor: pointer;
  &:hover {
    background: var(--el-bg-color);
  }
}

.item-avatar {
  vertical-align: top;
  padding-top: 10px;
  .avatar {
    vertical-align: middle;
  }
  .toggle {
    cursor: pointer;
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
