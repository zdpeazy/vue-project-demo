# vue-project-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 项目说明
1. src/views 页面demo组件 Demo可删 直接在其他页面开发<br/>
2. src/components 页面组件包含头部导航、侧导航等组件、core中包含一些封装的按钮、表格等组件其中按钮的权限验证已经开发完成 直接可用，具体使用方法看views/Home/Index.vue<br/>
3. src/http 封装的axios以及接口逻辑模块 并挂载在 Vue 原型的 $api 对象上 直接在moudules创建对应的文件并开发即可<br/>
            在接口定义的时候，接口返回的数据，尤其是菜单、权限数据格式必须和mock中保持一致，否则要修改router中的逻辑，比较麻烦<br/>
4. src/mock 在开发中可以通过mock数据来模拟接口行为，将index.js中的openMock设置为true即可，注意：mock中的接口设置必须和http中的完全一致包括请求方法，type等<br/>
4. src/store vuex数据管理逻辑，目前包含三个逻辑：后台配置、菜单栏、用户权限<br/>
5. src/permission 遍历设置用户按钮权限控制逻辑<br/>
6. src/router 路由逻辑控制，目前除了首页、登录、404，其他页面均动态注册，逻辑中包含请求左侧菜单接口和用户按钮权限接口，具体根据接口调整即可<br/>
7. utils 工具类文件，其中有后台请求的地址和正则验证模块，其他工具类模块在此文件夹添加即可<br/>
注：在开发过程中新建的views中的文件夹和.vue文件首字母都要大写<br/>