<template>
  <div
    class="headbar"
    :style="{ background: themeColor }"
    :class="
      $store.state.app.collapse ? 'position-collapse-left' : 'position-left'
    "
  >
    <!-- 导航收缩 -->
    <span class="hamburg">
      <el-menu
        class="el-menu-demo"
        :background-color="themeColor"
        text-color="#A3AEC7"
        :active-text-color="themeColor"
        mode="horizontal"
      >
        <el-menu-item index="1" @click="onCollapse">
          <hamburger :isActive="collapse"></hamburger>
        </el-menu-item>
      </el-menu>
    </span>
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu
        class="el-menu-demo"
        :default-active="activeIndex"
        :background-color="themeColor"
        text-color="#A3AEC7"
        active-text-color="#ffd04b"
        mode="horizontal"
        @select="selectNavBar()"
      >
        <el-menu-item index="1" @click="$router.push('/')">
          <i class="fa fa-home fa-lg"></i>
        </el-menu-item>
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span
      class="toolbar"
      :background-color="themeColor"
      :text-color="themeColor"
      :active-text-color="themeColor"
      mode="horizontal"
    >
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :background-color="themeColor"
      >
        <el-menu-item index="1" @click="personPanelShow">
          <!-- 用户信息 -->
          <span class="user-info">
            <img :src="user.avatar" />{{ user.username
            }}<i class="el-icon-arrow-down"></i>
          </span>
          <el-popover
            popper-class="popUpdate"
            v-model="personShow"
            transition="el-zoom-in-top"
            ref="popover-personal"
            placement="bottom-end"
            :visible-arrow="false"
          >
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import mock from "@/mock/index";
import Hamburger from "@/components/Hamburger";
import PersonalPanel from "@/components/Core/PersonalPanel";
export default {
  components: {
    Hamburger,
    PersonalPanel,
  },
  data() {
    return {
      user: {
        avatar: require("@/assets/logo.png"),
        roleName: "超级管理员",
        username: "测试",
        phone: "13000001234",
        email: "13000001234@163.com",
        creatTime: "2020-10-01 12:00:00",
      },
      activeIndex: "1",
      langVisible: false,
      personShow: false,
    };
  },
  methods: {
    openWindow(url) {
      window.open(url);
    },
    selectNavBar(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 折叠导航栏
    onCollapse: function () {
      this.$store.commit("onCollapse");
    },
    async personPanelShow() {
      this.personShow = !this.personShow;
    },
  },
  mounted() {},
  computed: {
    ...mapState({
      themeColor: (state) => state.app.themeColor,
      collapse: (state) => state.app.collapse,
    }),
  },
};
</script>

<style scoped lang="scss">
.el-menu--horizontal > .el-menu-item {
  height: 50px;
  line-height: 50px;
}
.el-color-picker--small .el-color-picker__trigger {
  width: 28px;
  height: 28px;
}
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2000;
  height: 50px;
  line-height: 50px;
}
.hamburg,
.navbar {
  float: left;
}
.toolbar {
  float: right;
}
.user-info {
  font-size: 14px;
  color: #a3aec7;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    margin: 10px 10px 10px 10px;
  }
  i {
    color: #a3aec7;
    position: relative;
    top: -1px;
    margin-left: 5px;
  }
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>