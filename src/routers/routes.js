import {createRouter,createWebHistory} from 'vue-router'
import Navber from '@/components/Navber.vue'
import home from '@/pages/home.vue'
import about from '@/pages/about.vue'
import products from '@/pages/products.vue'
import login from '@/pages/login.vue'
const router=createRouter({history:createWebHistory(),
    routes: [
        {
            path:'/',
            component:home
        },
        {
            path:'/about',
            component:about
        },
        {
            path:'/products',
            component:products
        },
        {
            path:'/login',
            component:login
        }

    ]
})
export default router