import {createRouter,createWebHistory} from 'vue-router'
import home from '@/pages/homePage.vue'
import login from '@/pages/login.vue'
import  store  from '@/store/index.js'
import PersonCenter from  '@/pages/User/PersonCenter.vue'
import sign from '@/pages/User/sign.vue'
import home_index  from '@/pages/Home/index.vue'

import createStash from '@/pages/stash/createStash.vue'
import showAllStash from '@/pages/stash/showAllStash.vue'
import updateStash from '@/pages/stash/updateStash.vue'
import outStash from '@/pages/stash/outStash.vue'

import createSuppliers from  '@/pages/suppliers/createSuppliers.vue'
import showAllSuppliers from '@/pages/suppliers/showAllSuppliers.vue'
import updateSuppliers from '@/pages/suppliers/updateSuppliers.vue'

import createProduct from '@/pages/Product/createProduct.vue'
import showAllProduct from '@/pages/Product/showAllProduct.vue'
import updateProduct from '@/pages/Product/updateProduct.vue'

import createInventory from '@/pages/inventory/createInventory.vue'
import showAllInventory from '@/pages/inventory/showAllInventory.vue'
import showAllInventoryLog from '@/pages/inventory/showAllInventoryLog.vue'
// import updateInventory from '@/pages/inventory/updateInventory.vue'
import showAllExamine from '@/pages/inventory/showAllExamine.vue'

import showAllUser from '@/pages/User/showAllUser.vue'
import CreateUser from '@/pages/User/CreateUser.vue'
import UpdateUser from '@/pages/User/UpdateUser.vue'

import  createTask from '@/pages/Task/createTask.vue'
import showAllTask from '@/pages/Task/showAllTask.vue'
import updateTask from '@/pages/Task/updateTask.vue'

const router=createRouter({history:createWebHistory(),
    routes: [
        {
            path:'/',
            name:'home',
            meta:{ requiresAuth: true },
            component: home,
            children: [
                {
                    path: '/',
                    component: home_index,
                },
                {
                    path:'/home_index',
                    component:home_index,
                },

                // 仓库管理
                {
                    path:'/createStash',
                    component:createStash
                },
                {
                    path:'/showALLStash',
                    component:showAllStash
                },
                {
                    path:'/updateStash/:id',
                    name:'updateStash',
                    component:updateStash
                },
                {
                  path:'/outStash',
                  name:'outStash',
                  component:outStash
                },

                // 供应商管理
                {
                    path:'/createSuppliers',
                    component:createSuppliers
                },
                {
                    path:'/showALLSuppliers',
                    component:showAllSuppliers
                },
                {
                    path:'/updateSuppliers/:id',
                    name:'updateSuppliers',
                    component:updateSuppliers
                },

                // 产品管理
                {
                    path:'/createProduct',
                    component:createProduct
                },
                {
                    path:'/showALLProduct',
                    component:showAllProduct
                },
                {
                    path:'/updateProduct/:id',
                    name:'updateProduct',
                    component:updateProduct
                },

                // 库存管理
                {
                    path:'/createInventory',
                    component:createInventory
                },
                {
                    path:'/showALLInventory',
                    component:showAllInventory
                },
                {
                    path:'/showAllExamine',
                    component:showAllExamine
                },
                {
                    path:'/showAllInventoryLog',
                    component:showAllInventoryLog
                },
                // {
                //     path:'/updateInventory/:id',
                //     name:'updateInventory',
                //     component:updateInventory
                // },


                {
                    path:'/PersonCenter',
                    component:PersonCenter
                },
                {
                    path:'/showAllUser',
                    component:showAllUser
                },
                {
                    path:'/CreateUser',
                    component:CreateUser
                },
                {
                    path:'/UpdateUser/:id',
                    name:'UpdateUser',
                    component:UpdateUser
                },


                // 任务管理
                {
                    path:'/createTask',
                    component:createTask
                },
                {
                    path:'/showAllTask',
                    component:showAllTask
                },
                {
                    path:'/updateTask/:id',
                    name:'updateTask',
                    component:updateTask
                },
            ]
        },
        {
            name: 'denglu',
            path:'/login',
            component:login,
            meta:{ requiresAuth: false }
        },
        {
            name: 'zhuce',
            path:'/sign',
            component:sign,
        }

    ]
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isLoggedIn = store.getters.isLoggedIn; // 从 Vuex store 获取登录状态

    if (requiresAuth && !isLoggedIn) {
      next('/login'); // 如果需要登录且未登录，则重定向到登录页面
    } else {
      next(); // 否则继续导航
    }
  });
export default router
