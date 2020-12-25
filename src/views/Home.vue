<template>
  <div class="container">
      <!-- 导航菜单栏 -->
      <nav-bar :navTitle="navTitle"></nav-bar>
      <!-- 头部区域 -->
      <head-bar></head-bar>
      <!-- 主内容区域 -->
      <main-content></main-content>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar/HeadBar"
import NavBar from "@/components/NavBar/NavBar"
import MainContent from "@/components/MainContent/MainContent"
export default {
  props: {
    navTitle: {
      type: String,
      default: '运营平台'
    }
  },
  components:{
    HeadBar,
    NavBar,
    MainContent
  }
};
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(224, 234, 235, 0.1);
  }
</style>  