import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constRoutes = [
  {
    path: '/upload',
    component: Layout,
    redirect: '/upload/index',
    hidden: true,
    children: [
      {
        path: '/upload/index',
        name: 'upload',
        component: () => import('@/views/Upload')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
      title: '首页',
      icon: 'shouye'
    },
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard',
        component: () => import('@/views/Dashboard'),
        meta: {
          title: '分析页'
        }
      }
    ]
  },
  {
    path: '/list',
    component: Layout,
    redirect: '/list/content',
    meta: {
      title: '内容',
      icon: 'neirongguanli'
    },
    children: [
      {
        path: '/list/content',
        name: 'content',
        component: () => import('@/views/ContentList'),
        meta: {
          title: '内容列表'
        }
      },
      {
        path: '/list/detail/:id',
        name: 'detail',
        hidden: true,
        component: () => import('@/views/Detail')
      }
    ]
  },
  {
    path: '/match',
    component: Layout,
    redirect: '/match/person',
    meta: {
      title: '关注信息',
      icon: 'neirongguanli'
    },
    children: [
      {
        path: '/match/person',
        name: 'match-person',
        component: () => import('@/views/MatchInfo/MatchPerson'),
        meta: {
          title: '关注人列表'
        }
      },
      {
        path: '/match/car',
        name: 'match-car',
        hidden: true,
        component: () => import('@/views/MatchInfo/MatchCar'),
        meta: {
          title: '关注车牌列表'
        }
      }
    ]
  },
  {
    path: '/sample',
    component: Layout,
    redirect: '/sample/library',
    meta: {
      title: '辅助功能',
      icon: 'shouye'
    },
    children: [
      {
        path: '/sample/library',
        name: 'sample-library',
        component: () => import('@/views/SampleComponents/SampleLibrary'),
        meta: {
          title: '样本库'
        }
      },
      {
        path: '/sample/face-picture-list',
        name: 'face-picture-list',
        component: () => import('@/views/SampleComponents/FacePictureList'),
        meta: {
          title: '人脸检测'
        }
      },
      {
        path: '/sample/face-picture',
        name: 'face-picture',
        component: () => import('@/views/SampleComponents/FacePicture'),
        meta: {
          title: '人脸比对'
        }
      },
      {
        path: '/sample/search-picture',
        name: 'search-picture',
        component: () => import('@/views/SampleComponents/SearchPicture'),
        meta: {
          title: '相似图片'
        }
      },
      {
        path: '/sample/text-key-ocr',
        name: 'text-key-ocr',
        component: () => import('@/views/SampleComponents/TextKeyOcr'),
        meta: {
          title: '维文识别'
        }
      },
      {
        path: '/sample/text-ocr',
        name: 'text-ocr',
        component: () => import('@/views/SampleComponents/TextOcr'),
        meta: {
          title: 'OCR识别'
        }
      },
      {
        path: '/sample/plant-ocr',
        name: 'plate-ocr',
        component: () => import('@/views/SampleComponents/PlantOcr'),
        meta: {
          title: '车牌检索'
        }
      }
    ]
  }
]

// {
//   alwaysShow: true, // will always show the root menu
//   meta: {
//     title: 'Permission',
//     icon: 'lock',
//     roles: ['admin', 'editor'] // you can set roles in root nav
//   },
//   children: [
//     {
//       path: 'role',
//       component: () => import('@/views/permission/role'),
//       name: 'RolePermission',
//       meta: {
//         title: 'Role Permission',
//         roles: ['admin']
//       }
//     }
//   ]
// },

// export const asyncRoutes = [
//   {
//     path: '/excel',
//     name: 'excel',
//     component: Layout,
//     redirect: '/excel/excel-export',
//     meta: {
//       title: 'Excel',
//       roles: ['admin', 'editor']
//     },
//     children: [
//       {
//         path: '/excel/excel-export',
//         name: 'excel-export',
//         component: () => import('@/views/ExcelPage/ExcelExport'),
//         meta: {
//           title: '导出Excel',
//           roles: ['admin', 'editor']
//         }
//       },
//       {
//         path: '/excel/excel-selected',
//         name: 'excel-selected',
//         component: () => import('@/views/ExcelPage/ExcelSelected'),
//         meta: {
//           title: '导出已选Excel',
//           roles: ['admin']
//         }
//       }
//     ]
//   },
//   {
//     path: '/input',
//     component: Layout,
//     meta: {
//       title: '表单',
//       roles: ['admin', 'editor']
//     },
//     children: [
//       {
//         path: '/input/index',
//         name: 'input',
//         component: () => import('@/views/InputPage/index'),
//         meta: {
//           title: '表单',
//           roles: ['admin', 'editor']
//         }
//       }
//     ]
//   },

//   {
//     path: '/permission',
//     component: Layout,
//     meta: {
//       title: '权限',
//       roles: ['admin']
//     },
//     children: [
//       {
//         path: '/permission/index',
//         name: 'permission',
//         component: () => import('@/views/Permission/index'),
//         meta: {
//           title: '权限',
//           roles: ['admin']
//         }
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]

// {
//   path: '/tab',
//   component: Layout,
//   children: [
//     {
//       path: 'index',
//       component: () => import('@/views/tab/index'),
//       name: 'Tab',
//       meta: { title: 'Tab', icon: 'tab' }
//     }
//   ]
// },

// 解决重复点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new Router({
  routes: constRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
