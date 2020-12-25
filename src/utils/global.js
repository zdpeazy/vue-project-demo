/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
let baseUrl = location.origin;

if(baseUrl.includes('localhost')){
    baseUrl = 'http://localhost:8081/';
}

export default {
    baseUrl
}