<template>
  <el-submenu
    v-if="menu.children && menu.children.length >= 1"
    :index="'' + menu.id"
  >
    <template slot="title">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.name }}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item">
    </MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleRoute(menu) {
      if (menu.name == "退出登录") {
        this.logout();
        return;
      }
      if (!menu.path && menu.name !== "首页") {
        this.$message({
          message: "请检查链接是否正确",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      this.$router.push(`${menu.path}`);
    },
    // 退出登录
    logout: function () {
      localStorage.removeItem("user");
      // this.deleteToken("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="scss">
i.fa {
  vertical-align: middle;
  margin-right: 8px;
  margin-left: 5px;
  text-align: center;
  font-size: 15px;
}
</style>