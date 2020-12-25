<template>
  <div id="app">
    <router-view :navTitle="navTitle" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navTitle: "后台管理",
    };
  },
  created() {
    /* 在页面加载时读取sessionStorage里的状态信息 */
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    /* 在页面刷新时将vuex里的信息保存到sessionStorage里 */
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  async mounted() {},
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #484a4d;
}
.menuTopFormItem .el-form-item__content {
  margin-left: 0 !important;
  .el-tabs {
    padding: 0 15px !important;
  }
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-button.underLine {
  text-decoration: underline;
}
.popUpdate {
  position: absolute;
  right: 10px;
}
.el-menu {
  border-right: none !important;
}
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
</style>
