<template>
	<div :class="collapse?'menu-bar-container menu-bar-collapse-width':'menu-bar-container menu-bar-width'">
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
      @click="$router.push('/')">
        <img class="m_logo" v-if="collapse" :src="logoStr"/>
        <div class="c_logo_txt" v-else>
          <img class="c_logo" :src="logoStr"/>
          <span class="txt" v-if="navTitle">{{navTitle}}</span>
        </div>
    </div>
    <!-- 导航菜单 -->
    <div class="menu_content">
      <vue-scroll :ops="ops">
        <el-menu 
          ref="navmenu" 
          default-active="0" 
          :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
          :collapse="collapse"
          :collapse-transition="false"
          :unique-opened="true"
          background-color="#2A3446"
          text-color="#A3AEC7"
          active-text-color="#579CEB"
          @open="handleopen" 
          @close="handleclose"
          @select="handleselect">
            <!-- 导航菜单树组件，动态加载菜单 -->
            <menu-tree
              v-for="item in navTree"
              :key="item.id" 
              :menu="item">
            </menu-tree>
      </el-menu>
    </vue-scroll>
    </div>
    
	</div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from "@/components/MenuTree"
import vueScroll from 'vuescroll'


export default {
  components:{
    MenuTree,
    vueScroll
  },
  props: {
    navTitle: {
      type: String,
      default: '运营平台'
    }
  },
  data(){
    return {
      ops: {},
      logoStr: require('@/assets/logo.png'),
      platformTitle: ""
    }
  },
  computed: {
    ...mapState({
      appName: state=>state.app.appName,
      themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse,
      navTree: state=>state.menu.navTree
    }),
  },
  watch: {},
  created () {},
  methods: {
    handleopen() {
      // console.log('handleopen')
    },
    handleclose() {
      // console.log('handleclose')
    },
    handleselect(a, b) {
      // console.log('handleselect')
    },
  }
}
</script>

<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  height: 100%;
  z-index: 2000;
  background: #2A3446;
  .menu_content{
    width: 100%;
    position:absolute;
    top: 50px;
    bottom: 0px;
  }
  .el-menu {
    text-align: left;
    z-index: 999;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center; 
    z-index: 1000;
    img.m_logo {
      width: 25px;
      height: 25px;
    }
    img.c_logo{
      // width: 100px;
      // height: 27px;
      width: 25px;
      height: 25px;
    }
    .c_logo_txt{
      width: auto;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      .txt{
        font-size: 14px;
        color: white;
        text-align: left;
        padding-left: 10px;
      }
    }
  }
}
.menu-bar-width {
  width: 200px;
}
.menu-bar-collapse-width {
  width: 65px;
}

</style>