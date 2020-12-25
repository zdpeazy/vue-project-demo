import Vue from 'vue'
import Router from 'vue-router'
import api from '@/http/api'
import store from '@/store'

Vue.use(Router)

// 解决同一个路由被添加的报错问题
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [{
      path: '/',
      name: '首页',
      component: () => import('@/views/Home/Index.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = localStorage.getItem('token');
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!token) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(to, from)
      next()
    }
  }
})

/**
 * addRoutes方法
 */
router.$addRoutes = (params) => {
  router.matcher = new Router({
    mode: 'history'
  }).matcher;
  router.addRoutes(params)
}

/**
 * 加载动态菜单和路由
 */
const addDynamicMenuAndRoutes = async () => {
  // 处理IFrame嵌套页面
  if (store.state.app.menuRouteLoaded) {
    // console.log('动态菜单和路由已经存在.')
    return
  }
  // 获取左侧菜单 匹配路由
  let res = await api.perms.findNavTree()
    .catch(function (error) {
      console.log(error)
    })
  // 将首页加载到第一项 添加动态路由
  res.data.unshift({
    ...router.options.routes[0].children[0],
    id: 0,
    icon: "el-icon-s-home",
    level: 0,
  })
  let dynamicRoutes = addDynamicRoutes(res.data);
  // 处理静态组件绑定路由
  handleStaticComponent(router, dynamicRoutes);
  // 注册的是时候添加404路由 防止刷新页面先显示404在显示目标页面
  let routes = router.options.routes
  routes.push({
    path: '*',
    name: 'notFound',
    component: () => import('@/views/Error/404.vue')
  })
  router.$addRoutes(routes);
  // 保存加载状态
  store.commit('menuRouteLoaded', true);
  // 保存菜单树 
  store.commit('setNavTree', res.data);
  // 获取用户权限
  let json = await api.perms.findPermissions()
    .catch(function (error) {
      console.log(error)
    })

  store.commit('setPerms', json.data)
}


/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
let handleStaticComponent = (router, dynamicRoutes) => {
  for (let j = 0; j < dynamicRoutes.length; j++) {
    if (dynamicRoutes[j].name == '代码生成') {
      dynamicRoutes[j].component = Generator
      break
    }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
class routeModel {
  constructor(menu) {
    this.path = menu.path
    this.component = null;
    this.name = menu.name;
    this.meta = {
      icon: menu.icon,
      index: menu.id
    }
  }
  setPath(url) {
    this.path = url;
  }
  setCompentForCommon(urlStr) {
    // 根据菜单URL动态加载vue组件，这里要求vue组件须按照path路径存储
    // 如path="demo/index"，则组件路径应是"@/views/Demo/Index.vue",否则组件加载不到
    let array = urlStr.split('/')
    let url = ''
    for (let i = 0; i < array.length; i++) {
      url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
    }
    url = url.substring(0, url.length - 1);
    this.component = resolve => require([`@/views/${url}`], resolve);
  }
}

let addDynamicRoutes = (menuList = [], routes = []) => {
  let temp = []
  for (let i = 0; i < menuList.length; i++) {
    let menu = menuList[i];
    if (menu.children && menu.children.length >= 1) {
      temp = temp.concat(menu.children)
    } else if (menu.path && /\S/.test(menu.path)) {
      let url = menu.path.replace(/^\//, '')
      // 创建路由配置
      let route = new routeModel(menu)
      try {
        route.setCompentForCommon(url)
      } catch (e) { }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  }
  return routes
}

export default router