/* 
 * 菜单管理模块
 */

// 获取导航菜单树
export function findNavTree() {
    const navTreeData = {
      "code": 0,
      "msg": null,
      "data": [{
          "id": 1,
          "name": "测试菜单",
          "path": '/demo/index1',
          "icon": "el-icon-s-cooperation",
          "level": 0,
        },
        {
          "id": 2,
          "name": "测试菜单组",
          "path": null,
          "icon": "el-icon-s-platform",
          "level": 0,
          "children": [{
            "id": 21,
            "name": "子菜单一",
            "path": '/demo/index2',
            "icon": "el-icon-s-goods",
            "level": 1,
            "children": []
          },{
            "id": 22,
            "name": "子菜单二",
            "path": '/demo/index3',
            "icon": "el-icon-s-tools",
            "level": 1,
            "children": []
          }]
        }
      ]
    }
    return {
      url: 'perms/findNavTree',
      type: 'get',
      data: navTreeData
    }
  }
  
  // 获取权限
  export function findPermissions() {
    const permissions = {
      "code": 0,
      "msg": null,
      "data": ['btn:test1']
    }
    return {
      url: 'perms/findPermissions',
      type: 'get',
      data: permissions
    }
  }
  