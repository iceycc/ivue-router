import Vue from 'vue'
import VueRouter from '@/vue-router'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter, {})

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'a',
                name: 'a',
                component: {
                    render(h) { // js + html
                        return <h1>aaa</h1>
                    }
                }
            },
            {
                path: 'b',
                name: 'b',
                component: {
                    render(h) { // js + html
                        return <h1>bbbbb</h1>
                    }
                }
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    setTimeout(()=>{
        console.log('权限1')
         next()
    },1000)
})

router.beforeEach((to, from, next) => {
    setTimeout(()=>{
        console.log('权限2')
        next()
    },1000)
})

export default router
