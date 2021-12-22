<template>
  <el-button type="text" class="menu-item item-bell">
    <el-icon :size="20"><Bell /></el-icon>
  </el-button>
  <el-dropdown trigger="click" class="item-avatar">
    <span class="toggle">
      <el-avatar class="avatar" :size="35" :src="circleUrl"></el-avatar><span>管理员</span> <el-icon><arrow-down /></el-icon
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
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
</script>
<style scoped lang="scss">
.menu-item {
  vertical-align: top;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  color: $font-color;
}
.item-bell {
  font-size: 18px;
  padding-top: 15px;
}
.item-avatar {
  margin-top: 7px;
  vertical-align: top;
  .avatar {
    vertical-align: middle;
  }
  .toggle {
    cursor: pointer;
    span {
      vertical-align: middle;
      margin-left: 10px;
    }
    .el-icon {
      vertical-align: middle;
    }
  }
}
</style>
