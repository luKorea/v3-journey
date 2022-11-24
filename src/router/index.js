import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: 'home' */'@/views/home/home.vue'),
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/favor',
            name: 'favor',
            component: () => import(/* webpackChunkName: 'favor' */'@/views/favor/favor.vue')
        },
        {
            path: '/message',
            name: 'message',
            component: () => import(/* webpackChunkName: 'message' */'@/views/message/message.vue')
        },
        {
            path: '/order',
            name: 'order',
            component: () => import(/* webpackChunkName: 'order' */'@/views/order/order.vue')
        },
        {
            path: '/city',
            name: 'city',
            component: () => import(/* webpackChunkName: 'city' */'@/views/city/city.vue'),
            meta: {
                hiddenTabBar: true
            }
        },
        {
            path: '/search',
            name: 'search',
            component: () => import(/* webpackChunkName: 'search' */'@/views/search/search.vue'),
            meta: {
                hiddenTabBar: true
            }
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: () => import(/* webpackChunkName: 'detail' */'@/views/detail/detail.vue'),
            meta: {
                hiddenTabBar: true
            }
        }
    ]
})

export default router