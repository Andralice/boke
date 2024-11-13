import {createRouter,createWebHistory} from 'vue-router'
import Navber from '@/components/Navber.vue'
import home from '@/pages/home.vue'
import about from '@/pages/about.vue'
import products from '@/pages/products.vue'
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

    ]
})
export default router