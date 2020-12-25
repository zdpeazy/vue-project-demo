<template>
  <div
    id="main-container"
    class="main-container"
    :class="
      $store.state.app.collapse ? 'position-collapse-left' : 'position-left'
    "
  >
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
    // 清除cookie
    clearCookies() {},
  },
};
</script>

<style scoped lang="scss">
.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: 55px;
  left: 1px;
  right: 1px;
  bottom: 0px;
  // background: rgba(56, 5, 114, 0.5);
  .tabs {
    position: fixed;
    top: 50px;
    right: 50px;
    padding-left: 0px;
    padding-right: 2px;
    z-index: 1020;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: rgb(255, 253, 255);
    border-color: rgba(200, 206, 206, 0.5);
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .tabs-tools {
    position: fixed;
    top: 50px;
    right: 0;
    z-index: 1020;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
    border-color: rgba(200, 206, 206, 0.5);
    border-left-width: 1px;
    border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    background: rgba(255, 255, 255, 1);
    text-align: center;
  }
  .tabs-tools:hover {
    background: rgba(200, 206, 206, 1);
  }
  .main-content {
    position: absolute;
    top: 0;
    left: 5px;
    right: 5px;
    bottom: 5px;
    padding: 5px;
  }
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>