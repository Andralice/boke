import {createRouter,createWebHistory} from 'vue-router'
import home from '@/pages/home.vue'
import login from '@/pages/login.vue'
import  store  from '@/store/index.js'
import PersonCenter from  '@/pages/User/PersonCenter.vue'
import sign from '@/pages/User/sign.vue'
import home_index  from '@/pages/Home/index.vue'
import addStore from '@/pages/Store/addStore.vue'
import showStore from '@/pages/Store/showStore.vue'
import reports from '@/pages/Store/reports.vue'
import CreateWarehouse from '@/pages/Store/CreateWarehouse.vue'
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
                {
                    path:'/addStore',
                    component:addStore
                },
                {
                    path:'/showStore',
                    component:showStore
                },
                {
                    path:'/reports',
                    component:reports
                },
                {
                    path:'/CreateWarehouse',
                    component:CreateWarehouse
                },
                {
                    path:'/PersonCenter',
                    component:PersonCenter
                }
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